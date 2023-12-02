const Autor = require('../models/AutorModel');

exports.indexAutor = async (req,res) => {
    try{
        const autor = new Autor(req.body);
        await autor.criarTabelaAutor();
        const listaDeAutores = await autor.listarAutores();
        res.render('autor/listarAutor', {listaDeAutores});
    }catch(e){
        console.log(e);
    }
};

exports.indexCadastraAutor = async (req,res) => {
    try{
        res.render('autor/cadastrarAutor')
    }catch(e) {
        console.log(e);
    }
}

exports.cadastrarAutor = async function(req,res){
    const autor = new Autor(req.body);
    await autor.inserirAutor();
    
    return res.redirect('/autor')
}

exports.indexAlterarAutor = async function(req, res){
    try{
        const autor = new Autor(req.body);
        const listarAutor = await autor.listarAutor(req.params.id)
    
        res.render('autor/alterarAutor', { listarAutor })
    }
    catch(e) { console.log(e); }
}

exports.alterarAutor = async function(req, res){
    try{   
        const autor = new Autor(req.body);
        const alterarCategoria = await autor.alterarAutor(req.params.id);
        res.redirect('/autor')
    }catch(e) {
        console.log(e);
    }
}

exports.deletarAutor = async function(req, res){
    try{
        const autor = new Autor(req.body);
        const deletarAutor = await autor.deletarAutor(req.params.id);
        res.redirect('/autor')
    }catch(e){
        console.log(e);
    }
}

exports.buscarAutor = async function(req, res){
    const autor = new Autor(req.body);
    const listaDeAutores = await autor.listarAutorNome();
    res.render('autor/listarAutor', {listaDeAutores});
}