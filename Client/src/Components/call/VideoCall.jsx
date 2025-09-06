import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../../Socket"; // Your socket client
import useCallStore from "../../Store/useCallStore";

const VideoCall = () => {
  const { roomId } = useParams();
  const { User } = useCallStore();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const [localStream, setLocalStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);

  useEffect(() => {
    // 1️⃣ Get user media
    const startLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream; // ✅ Set once
        }
      } catch (err) {
        console.error("Error accessing media devices.", err);
      }
    };

    startLocalStream();
  }, []);

  useEffect(() => {
    if (!localStream) return; // Wait until local stream is ready

    // 2️⃣ Create PeerConnection
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    setPeerConnection(pc);

    // 3️⃣ Add local tracks to connection
    localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));

    // 4️⃣ Listen for remote stream
    pc.ontrack = (event) => {
      if (remoteVideoRef.current && remoteVideoRef.current.srcObject !== event.streams[0]) {
        remoteVideoRef.current.srcObject = event.streams[0]; // ✅ Only once
      }
    };

    // 5️⃣ ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", { roomId, candidate: event.candidate });
      }
    };

    // 6️⃣ Join room
    socket.emit("join-room", roomId);

    socket.on("user-joined", async (peerId) => {
      // Create offer if second user joins
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit("offer", { roomId, sdp: offer });
    });

    // 7️⃣ Receive offer
    socket.on("offer", async ({ sdp }) => {
      await pc.setRemoteDescription(new RTCSessionDescription(sdp));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit("answer", { roomId, sdp: answer });
    });

    // 8️⃣ Receive answer
    socket.on("answer", async ({ sdp }) => {
      await pc.setRemoteDescription(new RTCSessionDescription(sdp));
    });

    // 9️⃣ Receive ICE candidate
    socket.on("ice-candidate", async ({ candidate }) => {
      if (candidate) {
        try {
          await pc.addIceCandidate(candidate);
        } catch (err) {
          console.error("Error adding received ICE candidate", err);
        }
      }
    });

    // Cleanup on unmount
    return () => {
      socket.emit("leave-room", { roomId });
      pc.close();
      socket.off("user-joined");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
    };
  }, [localStream]);

  return (
    <div className="w-screen h-screen bg-gray-900 flex justify-center items-center gap-4 p-4">
      {/* Local Video */}
      <video
        ref={localVideoRef}
        autoPlay
        muted
        playsInline
        className="w-1/2 h-auto bg-black rounded-xl"
      />

      {/* Remote Video */}
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className="w-1/2 h-auto bg-black rounded-xl"
      />
    </div>
  );
};

export default VideoCall;