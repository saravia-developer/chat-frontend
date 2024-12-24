import React, { useRef, useState } from "react";
import { Fetching } from "../../lib/useFetch";
import { environments } from "../../environments/environments.js";

export default function JoinChat() {
  const nameRef = useRef(null);
  const chatRef = useRef(null);
  const [ statusConnect, setStatusConnect ] = useState("loading")

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameRef.current.value,
        chatJoin: chatRef.current.value,
      }),
    };

    const { status, response } = await Fetching(
      `${environments.BASE_URL}/users/user-in-chat`,
      options
    );
      
    setStatusConnect(status);
    localStorage.setItem(
      "userAndChat",
      JSON.stringify(response?.success?.data)
    );

    nameRef.current.value = "";
    chatRef.current.value = "";
  };

  if (statusConnect !== "success")
    return (
      <section id="join-chat">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Nombre</label>
            <input type="text" ref={nameRef} />
          </div>

          <div>
            <label htmlFor="">Nombre del chat</label>
            <input type="text" ref={chatRef} />
          </div>

          <button type="submit">Enviar</button>
        </form>
        {/* {localStorage.getItem("status") === "error" && <p>Ocurrio un error inesperado</p>} */}
      </section>
    );
}
