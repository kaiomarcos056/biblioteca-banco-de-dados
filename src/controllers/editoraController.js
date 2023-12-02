const Editora = require('../models/EditoraModel');

exports.indexEditora = async (req,res) => {
    try{
        const editora = new Editora(req.body);
        await editora.criarTabelaEditora();
        const listaEditora = await editora.listarEditoras();
        res.render('editora/listarEditora', { listaEditora });
    }catch(e){
        console.log(e);
    }
};

exports.indexCadastraEditora = async (req,res) => {
    try{
        res.render('editora/cadastrarEditora')
    }catch(e) {
        console.log(e);
    }
}

exports.cadastrarEditora = async function(req,res){
    const editora = new Editora(req.body);
    await editora.inserirEditora();
    
    return res.redirect('/editora')
}

exports.indexAlterarEditora = async function(req, res){
    try{
        const editora = new Editora(req.body);
        const listarEditora = await editora.listarEditora(req.params.id)
    
        res.render('editora/alterarEditora', { listarEditora })
    }
    catch(e) { console.log(e); }
}

exports.alterarEditora = async function(req, res){
    try{   
        const editora = new Editora(req.body);
        const alterarEditora = await editora.alterarEditora(req.params.id);
        res.redirect('/editora')
    }catch(e) {
        console.log(e);
    }
}

exports.deletarEditora = async function(req, res){
    try{
        const editora = new Editora(req.body);
        const deletarEditora = await editora.deletarEditora(req.params.id);
        res.redirect('/editora')
    }catch(e){
        console.log(e);
    }
}

exports.buscarEditora = async function(req, res){
    const editora = new Editora(req.body);
    const listaEditora = await editora.listarEditoraNome();
    res.render('editora/listarEditora', {listaEditora});
}