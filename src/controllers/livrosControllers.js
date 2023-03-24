import livros from "../models/Livro.js";

class LivroController {

  static listarLivroPorId = (req, res) => {
    const id = req.params.id;

    livros.findById(id)
      .then(livro => {
        res.status(200).json(livro)
      })
      .catch(err => {
        res.status(400).send({message: `${err.message} - ID do livro não localizado`})
      })
  }

  static listarLivros = async (req, res) => {
    try {
      const livrosResultado = await livros.find();
      res.status(200).json(livrosResultado)
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static cadastrarLivro = (req, res) => {
    let livro = new livros(req.body);
    livro.save()
      .then(() => {
        res.status(201).send(livro.toJSON())
      })
      .catch(err => {
        res.status(500).send({message: `${err} - Falha ao cadastar livro.`})
      })
  }

  static atualizarLivro = (req, res) => {
    const id = req.params.id;

    livros.findByIdAndUpdate(id, {$set: req.body})
    .then(() => {
      res.status(200).send({message: 'Livro atualizado com sucesso!'})
    })
    .catch(err => {
      res.status(500).send({message: err.message})
    })
  }

}

export default LivroController;