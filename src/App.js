import React from 'react';
import { renderToString } from 'react-dom/server'
import './App.css';
import $ from "jquery"

function App() {

  return (
    <div className="App">
      <ChatRoom/>
    </div>
  );
}

//Componente del chat
function ChatRoom(){

  function formatearFecha(fecha){
    const hora = '0' + fecha.getHours()
    const minutos = '0' + fecha.getMinutes()

    return `${hora.slice(-2)}:${minutos.slice(-2)}`
  }

  // Funcion para agregar el mensaje al chat
  function appendMessage(mensaje, lado, nombre) {
    const main = document.querySelector('.principal')
    const msg = renderToString(<ChatMessage text={mensaje} side={lado} time={formatearFecha(new Date())} name={nombre}/>)

    main.insertAdjacentHTML('beforeend', msg)
    main.scrollTop += 500
  }

  // Funcion para mandar un mensaje al bot y recivir una respuesta
  const receiveMessage = async (e) => {
    e.preventDefault()

    const resUsuario = document.querySelector('.input').value

    if (!resUsuario) return

    appendMessage(resUsuario, 'right', 'Usuario')
    document.querySelector('.input').value = ''

    await $.get("/prueba", {msg: resUsuario}).done(data => {
      if(!data) return
      console.log(data)
      setTimeout(() => appendMessage(data, 'left', 'WindowsBot'), 1000)
    })
  }
  
  return(
    <section className="wrapper">
    <header>
      <h1>
        🤖 Windows Bot 🤖
      </h1>
    </header>
      <main className="principal"> 
        <ChatMessage text="Que tal, que problema tienes con tu computadora?, si no resuelvo tu problema escribe: Necesito ayuda" side="left" time={formatearFecha(new Date())} name="WindowsBot"/>
      </main>
      <form onSubmit={receiveMessage}>
        <input className="input" placeholder="Preguntale algo al asistente..."/>
        <button type="submit"><img src="/flecha.svg"/></button>
      </form>
    </section>
  )
}


// Componente del mensaje
function ChatMessage({ text, side, time, name }){
  return(
    <div className={`message ${ side }`}>
      <img src='/logo192.png'/>
      <div className="burbuja">
        <div className="infoMensaje">
          <div className="infoNombre">{ name }</div>
          <div className="infoHora">{ time }</div>
        </div>
        <div className="textoMensaje">{ text }</div>
      </div>
    </div>
  )
}


export default App;
