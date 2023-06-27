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

  static listarLivroPorFiltro = async (req, res, next) => {
    
    try {
      const busca = processaBusca(req.query);

      const edit = await livros.find(busca);

      res.status(200).send(edit);
    } catch (err) {
      next(err);
    }

  };

}

function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas } = parametros;

  //const regex = new RegExp(titulo, "i");

  const busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) busca.numeroPaginas = {};

  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  return busca;
}

export default LivroController;