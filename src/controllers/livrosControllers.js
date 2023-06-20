import { livros } from "../models/index.js";

class LivroController {

  static listarLivroPorId = async (req, res, next) => {

    try {
      const id = req.params.id;
      const localizarLivro = await livros.findById(id).populate("autor", "nome");
      res.status(200).json(localizarLivro);
    } catch (err) {
      next(err);
    }

  };

  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await livros.find().populate("autor");
      res.status(200).json(livrosResultado);
    } catch (err) {
      next(err);
    }
  };

  static cadastrarLivro = (req, res, next) => {
    let livro = new livros(req.body);
    livro.save()
      .then(() => {
        res.status(201).send(livro.toJSON());
      })
      .catch(err => {
        next(err);
      });
  };

  static atualizarLivro = async (req, res, next) => {

    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({message: "Livro atualizado com sucesso!" });
    } catch(err) {
      next(err);
    }

  };

  static excluirLivro = async (req, res, next) => {

    try {
      const id = req.params.id;
      await livros.findOneAndDelete(id);
      res.status(200).send({ message: "Livro excluído" });
    } catch(err) {
      next(err);
    }

  };

  static listarLivroPorEditora = async (req, res, next) => {
    
    try {
      const editora = req.query.editora;
      const edit = await livros.find({ "editora": editora }, {});
      res.status(200).send(edit);
    } catch (err) {
      next(err);
    }

  };

}

export default LivroController;