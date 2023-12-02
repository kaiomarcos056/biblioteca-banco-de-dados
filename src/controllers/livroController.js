const Categoria = require('../models/CategoriaModel');
const Autor = require('../models/AutorModel');
const Editora = require('../models/EditoraModel');
const Livro = require('../models/LivroModel');

exports.indexLivro = async (req,res) => {
    try{
        const livro = new Livro(req.body);
        await livro.criarTabelaLivro();
        const listaLivro = await livro.listarLivros();
        res.render('livro/listarLivro', {listaLivro});
    }catch(e){
        console.log(e);
    }
};

exports.indexCadastraLivro = async (req,res) => {
    try{
        const categoria = new Categoria(req.body);
        const listaCategoria = await categoria.listarCategorias()
        const autor = new Autor(req.body);
        const listaAutor = await autor.listarAutores()
        const editora = new Editora(req.body);
        const listaEditora = await editora.listarEditoras()
        res.render('livro/cadastrarLivro', {listaCategoria , listaAutor, listaEditora})
    }catch(e) {
        console.log(e);
    }
}

exports.cadastrarLivro = async function(req,res){
    const livro = new Livro(req.body);
    await livro.inserirLivro();
    return res.redirect('/livro')
}

exports.indexAlterarLivro = async function(req, res){
    try{
        const livro = new Livro(req.body);
        const listarLivro = await livro.listarLivro(req.params.id)
        const categoria = new Categoria(req.body);
        const listaCategoria = await categoria.listarCategorias()
        const autor = new Autor(req.body);
        const listaAutor = await autor.listarAutores()
        const editora = new Editora(req.body);
        const listaEditora = await editora.listarEditoras()

        res.render('livro/alterarLivro', { listarLivro, listaCategoria, listaAutor, listaEditora})
    }
    catch(e) { console.log(e); }
}

exports.alterarLivro = async function(req, res){
    try{   
        const livro = new Livro(req.body);
        const alterarLivro = await livro.alterarLivro(req.params.id);
        res.redirect('/livro')
    }catch(e) {
        console.log(e);
    }
}

exports.deletarLivro = async function(req, res){
    try{
        const livro = new Livro(req.body);
        const deletarLivro = await livro.deletarLivro(req.params.id);
        res.redirect('/livro')
    }catch(e){
        console.log(e);
    }
}

exports.buscarLivro = async function(req, res){
    const livro = new Livro(req.body);
    const listaLivro = await livro.listarLivroNome();
    res.render('livro/listarLivro', {listaLivro});
}