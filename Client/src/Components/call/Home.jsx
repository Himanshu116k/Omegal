import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../socket";

export default function Home() {
  const navigate = useNavigate();
  const [waiting, setWaiting] = useState(false);

  const findPartner = () => {
    socket.emit("find-partner"); // ask backend for a random partner

    socket.on("waiting", () => {
      setWaiting(true); // show waiting screen
    });

    socket.on("partner-found", ({ roomId, initiator }) => {
      navigate(`/call/${roomId}`, { state: { initiator } });
    });
  };

  useEffect(() => {
    return () => {
      // Clean up listeners
      socket.off("waiting");
      socket.off("partner-found");
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Omegle Clone 🎥</h1>
      {waiting ? (
        <h2>Waiting for a partner...</h2>
      ) : (
        <button onClick={findPartner}>Find Random Partner</button>
      )}
    </div>
  );
}
