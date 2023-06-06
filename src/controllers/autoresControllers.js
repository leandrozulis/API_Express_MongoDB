import autores from "../models/Autor.js";

class AutorController {

  static listarAutorPorId = async (req, res, next) => {

    try {
      const id = req.params.id;
      const listaAutor = await autores.findById(id);

      if (listaAutor !== null) {
        res.status(200).json(listaAutor);
      } else {
        res.status(404).send({ message: "ID do Autor não localizado" });
      }

    } catch (err) {
      next(err);
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

  static cadastrarAutor = (req, res, next) => {
    let autor = new autores(req.body);
    autor.save()
      .then(() => {
        res.status(201).send(autor.toJSON());
      })
      .catch(err => {
        next(err);
      });
  };

  static atualizarAutor = async (req, res, next) => {

    try {
      const id = req.params.id;
      await autores.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Autor atualizado com sucesso!" });
    } catch (err) {
      next(err);
    }

  };

  static excluirAutor = async (req, res, next) => {

    try {
      const id = req.params.id;
      await autores.findByIdAndDelete(id);
      res.status(200).send({ message: "Autor excluído" });
    } catch (err) {
      next(err);
    }

  };

}

export default AutorController;