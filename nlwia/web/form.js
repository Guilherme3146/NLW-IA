//servidor

import { server } from "./server.js"

//seletor de consulta para o form document é o mesmo que a estrutura do html

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")

  const videoURL = input.value

  if (!videoURL.includes("shorts")) {
    //mudar a frase referente ao content
    return (content.textContent = "Esse video não parace ser um short.")
  }

  //separa o que vem antes e depois
  const [pos1, params] = videoURL.split("/shorts/")
  const [videoID] = params.split("?si")

  content.textContent = "Obtendo o texto do áudio..."
  const transcription = await server.get("/summary/" + videoID)

  content.textContent = "Realizando o resumo..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})
