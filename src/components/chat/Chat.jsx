import React, { useEffect, useRef, useState } from "react";


export default function Chat({ socket }) {
  const messageRef = useRef(null);
  const messagesListRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    const info = JSON.parse(localStorage.getItem("userAndChat"));
    const message = messageRef.current.value;
    socket.emit(
      "chat message",
      JSON.stringify({
        chatId: info.idChat,
        senderId: info.idUser,
        content: message,
      })
    );
    messageRef.current.value = "";
  }

  socket.emit("get messages", JSON.parse(localStorage.getItem("userAndChat"))?.idChat)

  socket.on("get messages", (messages) => {
    messages?.forEach((msg, i) => {
      const item = `<li key={${msg.username} + "-${i}"}><span>${msg.username}: </span>${msg.content}</li>`;
      messagesListRef.current?.insertAdjacentHTML("beforeend", item);
    })
  });

  socket.on("chat message", (content, user) => {

    const msg = JSON.parse(content);
    const item = `<li><span>${user}: </span>${msg.content}</li>`;
    messagesListRef.current?.insertAdjacentHTML("beforeend", item);
  });



  return (
    <section id="chat">
      <ul id="messages" ref={messagesListRef}></ul>
      <form id="form" action="" onSubmit={handleSubmit}>
        <input
          ref={messageRef}
          type="text"
          name="message"
          id="input-message"
          placeholder="Type a message"
          autoComplete="off"
        />
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}
