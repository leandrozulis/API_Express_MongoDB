import express from "express";
import db from "./config/dbConnect.js";
import livros from "./models/Livro.js";

db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
    console.log('Conexão com o banco feita com sucesso');
});

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Curso de Node');
})

app.get('/livros', async (req, res) => {
    try {
        const livrosResultado = await livros.find();
        res.status(200).json(livrosResultado)
    } catch (err) {
        res.status(500).json(err);
    }
})

app.get('/livros/:id', (req, res) => {
    let index = buscaLivro(req.params.id);
    res.status(200).json(livros[index])
})

app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).send('Livro foi cadastrado com sucesso')
})

app.put('/livros/:id', (req, res) => {
    let index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(200).json(livros)
})

app.delete('/livros/:id', (req, res) => {
    let {id} = req.params;
    let index = buscaLivro(id);
    livros.splice(index, 1);
    res.status(200).send(`Livro ${id} removido com sucesso`)
})

function buscaLivro(id) {
    return livros.findIndex(livro => livro.id == id);
}

export default app;