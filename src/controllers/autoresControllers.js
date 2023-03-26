import autores from "../models/Autor.js";

class AutorController {

  static listarAutorPorId = (req, res) => {
    const id = req.params.id;

    autores.findById(id)
      .then(autor => {
        res.status(200).json(autor)
      })
      .catch(err => {
        res.status(400).send({ message: `${err.message} - ID do Autor não localizado` })
      })
  }

  static listarAutores = async (req, res) => {
    try {
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado)
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static cadastrarAutor = (req, res) => {
    let autor = new autores(req.body);
    autor.save()
      .then(() => {
        res.status(201).send(autor.toJSON())
      })
      .catch(err => {
        res.status(500).send({ message: `${err} - Falha ao cadastar Autor.` })
      })
  }

  static atualizarAutor = (req, res) => {
    const id = req.params.id;

    autores.findByIdAndUpdate(id, { $set: req.body })
      .then(() => {
        res.status(200).send({ message: 'Autor atualizado com sucesso!' })
      })
      .catch(err => {
        res.status(500).send({ message: err.message })
      })
  }

  static excluirAutor = (req, res) => {
    const id = req.params.id;

    autores.findByIdAndDelete(id)
      .then(() => {
        res.status(200).send({ message: 'Autor excluído' })
      })
      .catch(err => {
        res.status(500).send({ message: err.message })
      })
  }

}

export default AutorController;