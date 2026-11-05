const express = require("express")
const cors = require("cors")
const mysql = require("mysql2/promise")

const app = express()

app.use(cors())
app.use(express.json())

const banco = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_retrogames"
})

app.get("/jogos", async (req, res) => {
    try {
        const [jogos] = await banco.query("SELECT * FROM jogos ORDER BY id DESC")
        res.json(jogos)
    } catch (erro) {
        console.log("ERRO AO BUSCAR JOGOS:", erro)
        res.status(500).json({ mensagem: "Erro ao buscar jogos" })
    }
})

app.post("/jogos", async (req, res) => {
    try {
        const { titulo, plataforma, desenvolvedora, imagem_url, preco } = req.body

        const sql = `
            INSERT INTO jogos (titulo, plataforma, desenvolvedora, imagem_url, preco)
            VALUES (?, ?, ?, ?, ?)
        `

        const [resultado] = await banco.query(sql, [
            titulo,
            plataforma,
            desenvolvedora,
            imagem_url,
            preco
        ])

        res.status(201).json({
            mensagem: "Jogo cadastrado com sucesso!",
            id: resultado.insertId
        })

    } catch (erro) {
        console.log("ERRO AO CADASTRAR JOGO:", erro)
        res.status(500).json({ mensagem: "Erro ao cadastrar jogo" })
    }
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})