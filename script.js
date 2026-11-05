const btnCadastrar = document.getElementById('btnCadastrar')
const btnCancelar = document.getElementById("btnCancelar")
const modalCadastrar = document.getElementById("modalCadastro")
const form = document.getElementById("formDisco")
const lista = document.getElementById("listarDiscos")
const mensagemVazia = document.getElementById("mensagemVazia")

btnCadastrar.addEventListener("click", () => {
    modalCadastrar.showModal()
})

btnCancelar.addEventListener("click", () => {
    modalCadastrar.close()
})

form.addEventListener("submit", async (evento) => {
    evento.preventDefault()

    const titulo = document.getElementById("disco").value.trim()
    const desenvolvedora = document.getElementById("Artista").value.trim()
    const plataforma = document.getElementById("genero").value.trim()
    const imagem_url = document.getElementById("imagem").value.trim()
    const preco = Number(document.getElementById("preco").value)

    try {
        const resposta = await fetch("http://localhost:3000/jogos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titulo,
                plataforma,
                desenvolvedora,
                imagem_url,
                preco
            })
        })

        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar jogo")
        }

        alert("Jogo cadastrado com sucesso!")

        form.reset()
        modalCadastrar.close()

        carregarJogos()

    } catch (erro) {
        alert("Não foi possível cadastrar o jogo. Verifique se o servidor está funcionando.")
    }
})

async function carregarJogos() {
    try {
        const resposta = await fetch("http://localhost:3000/jogos")

        if (!resposta.ok) {
            throw new Error("Erro ao buscar jogos")
        }

        const jogos = await resposta.json()

        lista.querySelectorAll(".card-disco").forEach(card => card.remove())

        mensagemVazia.hidden = jogos.length > 0

        jogos.forEach(jogo => {
            criarCard(jogo)
        })

    } catch (erro) {
        console.log("Erro ao carregar jogos:", erro)
        alert("Não foi possível carregar os jogos.")
    }
}

function criarCard(jogo) {
    const card = document.createElement("article")
    card.classList.add("card-disco")

    const capa = document.createElement("div")
    capa.classList.add("capa")

    const imagemCapa = document.createElement("img")
    imagemCapa.src = jogo.imagem_url
    imagemCapa.alt = "Capa do jogo " + jogo.titulo

    capa.appendChild(imagemCapa)

    const info = document.createElement("div")
    info.classList.add("info-disco")

    const titulo = document.createElement("h3")
    titulo.textContent = jogo.titulo

    const nomeDesenvolvedora = document.createElement("p")
    nomeDesenvolvedora.textContent = "Desenvolvedora: " + jogo.desenvolvedora

    const nomePlataforma = document.createElement("p")
    nomePlataforma.textContent = "Plataforma: " + jogo.plataforma

    const valor = document.createElement("strong")
    valor.classList.add("preco")

    valor.textContent = Number(jogo.preco).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    info.append(titulo, nomeDesenvolvedora, nomePlataforma, valor)
    card.append(capa, info)

    lista.appendChild(card)
}

carregarJogos()