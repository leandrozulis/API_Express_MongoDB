import mongoose from "mongoose";
import autores from "../models/Autor.js";

class AutorController {

  static listarAutorPorId = async (req, res) => {

    try {
      const id = req.params.id;
      const listaAutor = await autores.findById(id);

      if (listaAutor !== null) {
        res.status(200).json(listaAutor);
      } else {
        res.status(404).send({ message: "ID do Autor não localizado" });
      }

    } catch (err) {
      if (err instanceof mongoose.Error.CastError){
        res.status(400).send({message: "Um ou mais dados fornecidos estão incorretos."});
      } else {
        res.status(500).send({message: "Erro interno de servidor"});
      }

    }

  };

  static listarAutores = async (req, res) => {
    try {
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  static cadastrarAutor = (req, res) => {
    let autor = new autores(req.body);
    autor.save()
      .then(() => {
        res.status(201).send(autor.toJSON());
      })
      .catch(err => {
        res.status(500).send({ message: `${err} - Falha ao cadastar Autor.` });
      });
  };

  static atualizarAutor = async (req, res) => {

    try {
      const id = req.params.id;
      await autores.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Autor atualizado com sucesso!" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }

  };

  static excluirAutor = async (req, res) => {

    try {
      const id = req.params.id;
      await autores.findByIdAndDelete(id);
      res.status(200).send({ message: "Autor excluído" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }

  };

}

export default AutorController;