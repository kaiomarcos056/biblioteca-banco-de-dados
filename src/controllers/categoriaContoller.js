const Categoria = require('../models/CategoriaModel');

exports.indexCategoria = async (req,res) => {
    try{
        const categoria = new Categoria(req.body);
        await categoria.criarTabelaCategoria();
        const listaDeCategoria = await categoria.listarCategorias();
        res.render('categoria/listarCategoria', {listaDeCategoria});
    }catch(e){
        console.log(e);
    }
};

exports.indexCadastraCategoria = async (req,res) => {
    try{
        res.render('categoria/cadastrarCategoria')
    }catch(e) {
        console.log(e);
    }
}

exports.cadastrarCategoria = async function(req,res){
    const categoria = new Categoria(req.body);
    await categoria.inserirCategoria();
    
    return res.redirect('/categoria')
}

exports.indexAlterarCategoria = async function(req, res){
    try{
        const categoria = new Categoria(req.body);
        const listarCategoria = await categoria.listarCategoria(req.params.id)
    
        res.render('categoria/alterarCategoria', { listarCategoria })
    }
    catch(e) { console.log(e); }
}

exports.alterarCategoria = async function(req, res){
    try{   
        const categoria = new Categoria(req.body);
        const alterarCategoria = await categoria.alterarCategoria(req.params.id);
        res.redirect('/categoria')
    }catch(e) {
        console.log(e);
    }
}

exports.deletarCategoria = async function(req, res){
    try{
        const categoria = new Categoria(req.body);
        const deletarCategoria = await categoria.deletarCategoria(req.params.id);
        res.redirect('/categoria')
    }catch(e){
        console.log(e);
    }
}

exports.buscarCategoria = async function(req, res){
    const categoria = new Categoria(req.body);
    const listaDeCategoria = await categoria.listarCategoriaNome();
    res.render('categoria/listarCategoria', {listaDeCategoria});
}