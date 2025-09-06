import { useNavigate } from "react-router-dom";
import socket from "../socket";

export default function Home() {
  const navigate = useNavigate();

  const findPartner = () => {
    // backend ko event bhejna
    socket.emit("find-partner");

    socket.on("partner-found", ({ roomId, initiator }) => {
      // jab partner mil jaye to /call/:roomId pe redirect
      navigate(`/call/${roomId}`, { state: { initiator } });
    });

    socket.on("waiting", () => {
      alert("Waiting for a partner...");
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Omegle Clone 🎥</h1>
      <button onClick={findPartner}>Find Random Partner</button>
    </div>
  );
}
