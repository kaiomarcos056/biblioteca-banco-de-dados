const Administrador = require('../models/AdministradorModel');

exports.indexAdministrador = async (req,res) => {
    try{
        const administrador = new Administrador(req.body);
        await administrador.criarTabelaUsuario();
        await administrador.criarTabelaAdministrador();
        const listaAdministrador = await administrador.listarAdministradores();
        res.render('administrador/listarAdministrador', {listaAdministrador});
    }catch(e){
        console.log(e);
    }
};

exports.indexCadastraAdministrador = async (req,res) => {
    try{
        res.render('administrador/cadastrarAdministrador')
    }catch(e) {
        console.log(e);
    }
}

exports.cadastrarAdministrador = async function(req,res){
    const administrador = new Administrador(req.body);
    const id = await administrador.inserirLogin();
    await administrador.inserirAdministrador(id);
    return res.redirect('/administrador')
}

exports.indexAlterarAdministrador = async function(req, res){
    try{
        const administrador = new Administrador(req.body);
        const listarAdministrador = await administrador.listarAdministrador(req.params.id)
    
        res.render('administrador/alterarAdministrador', { listarAdministrador })
    }
    catch(e) { console.log(e); }
}

exports.alterarAdministrador = async function(req, res){
    try{   
        const administrador = new Administrador(req.body);
        await administrador.alterarUsuario(req.body.usuario);
        await administrador.alterarAdministrador(req.params.id);
        res.redirect('/administrador')
    }catch(e) {
        console.log(e);
    }
}

exports.deletarAdministrador = async function(req, res){
    try{
        const administrador = new Administrador(req.body);
        const del = await administrador.deleteAdministrador(req.params.id)
        const listaAdministrador = await administrador.listarAdministradores();
        return res.redirect('/buscarAdministrador');
    }catch(e){
        console.log(e);
    }
}

exports.buscarAdministradorGET = async function(req, res){
    const administrador = new Administrador(req.body);
    const listaAdministrador = await administrador.listarAdministradores();
    res.render('administrador/listarAdministrador', {listaAdministrador});
}

exports.buscarAdministrador = async function(req, res){
    const administrador = new Administrador(req.body);
    const listaAdministrador = await administrador.listarAdministradorNome();
    res.render('administrador/listarAdministrador', {listaAdministrador});
}