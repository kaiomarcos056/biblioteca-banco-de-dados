const Leitor = require('../models/LeitorModel');

exports.indexLeitor = async (req,res) => {
    try{
        const leitor = new Leitor(req.body);
        await leitor.criarTabelaUsuario();
        await leitor.criarTabelaLeitor();
        const listaLeitor = await leitor.listarLeitores();
        res.render('leitor/listarLeitor', {listaLeitor});
    }catch(e){
        console.log(e);
    }
};

exports.indexCadastraLeitor = async (req,res) => {
    try{
        res.render('leitor/cadastrarLeitor')
    }catch(e) {
        console.log(e);
    }
}

exports.cadastrarLeitor = async function(req,res){
    const leitor = new Leitor(req.body);
    const id = await leitor.inserirLogin();
    await leitor.inserirLeitor(id);
    return res.redirect('/leitor')
}

exports.indexAlterarLeitor = async function(req, res){
    try{
        const leitor = new Leitor(req.body);
        const listarLeitor = await leitor.listarLeitor(req.params.id)
    
        res.render('leitor/alterarLeitor', { listarLeitor })
    }
    catch(e) { console.log(e); }
}

exports.alterarLeitor = async function(req, res){
    try{   
        const leitor = new Leitor(req.body);
        await leitor.alterarUsuario(req.body.usuario);
        await leitor.alterarLeitor(req.params.id);
        res.redirect('/leitor')
    }catch(e) {
        console.log(e);
    }
}

exports.deletarLeitor = async function(req, res){
    try{
        const leitor = new Leitor(req.body);
        const listaLeitor = await leitor.listarLeitor(req.params.id);
        await leitor.deletarUsuario(listaLeitor[0].id_usuario);
        await leitor.deletarLeitor(req.params.id);
        res.redirect('/leitor')
    }catch(e){
        console.log(e);
    }
}