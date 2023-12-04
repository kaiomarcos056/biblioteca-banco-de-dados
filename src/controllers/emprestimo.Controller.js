const Emprestimo = require('../models/EmprestimoModel');
const Livro = require('../models/LivroModel');
const Leitor = require('../models/LeitorModel');
const Administrador = require('../models/AdministradorModel');

exports.indexEmprestimo = async (req,res) => {
    try{
        const emprestimo = new Emprestimo(req.body);
        await emprestimo.criarTabelaEmprestimo();
        await emprestimo.criarTabelaHistorico();
        const listaEmprestimo = await emprestimo.listarEmprestimos();
        res.render('emprestimo/listarEmprestimo', {listaEmprestimo});
    }catch(e){
        console.log(e);
    }
};

exports.indexAlugarLivro = async(req, res) => {
    try{
        const livro = new Livro(req.body);
        const listaLivro = await livro.listarLivros();
        res.render('emprestimo/listarLivro', {listaLivro});
    }catch(e){
        console.log(e);
    }
};

exports.alugarLivro = async(req, res) => {
    try{
        const livro = new Livro(req.body);
        const listaLivro = await livro.listarLivro(req.params.id);
        const leitor = new Leitor(req.body);
        const listaLeitor = await leitor.listarLeitores();
        const administrador = new Administrador(req.body);
        const listaAdministrador = await administrador.listarAdministradores();

        res.render('emprestimo/emprestarLivro', {listaLivro, listaLeitor, listaAdministrador});
    }catch(e){
        console.log(e);
    }
};

exports.cadastraAlugaLivro = async(req, res) => {
    try{
        const emprestimo = new Emprestimo(req.body);
        await emprestimo.inserirEmprestimo();
        return res.redirect('/emprestimo')
    }catch(e) {
        console.log(e);
    }
}

exports.indexAlterarEmprestimo = async(req, res) =>{
    try{
        const emprestimo = new Emprestimo(req.body);

        const idLivro = req.params.idLivro;
        const idLeitor = req.params.idLeitor;

        const listaEmprestimo = await emprestimo.listarEmprestimo(idLivro, idLeitor);
        res.render('emprestimo/alterarEmprestimo', { listaEmprestimo })
    }catch(e) {
        console.log(e);
    }
}

exports.alterarEmprestimo = async(req, res) =>{
    try{
        const emprestimo = new Emprestimo(req.body);

        const idLivro = req.params.idLivro;
        const idLeitor = req.params.idLeitor;

        await emprestimo.alterarEmprestimo(idLivro, idLeitor);
        return res.redirect('/emprestimo')
    }catch(e) {
        console.log(e);
    }
};

exports.devolverLivro = async(req, res) =>{
    try{
        const emprestimo = new Emprestimo(req.body);

        const idLivro = req.params.idLivro;
        const idLeitor = req.params.idLeitor;
        
        const listaEmprestimo = await emprestimo.listarEmprestimo(idLivro,idLeitor);
        await emprestimo.inserirHistorico(listaEmprestimo[0]);
        await emprestimo.deletarEmprestimo(idLivro, idLeitor);
       
        return res.redirect('/listarEmprestimo')
    }catch(e) {
        console.log(e);
    }
};

exports.listEmprestimo = async (req,res) => {
    try{
        const emprestimo = new Emprestimo(req.body);
        const listaEmprestimo = await emprestimo.listarEmprestimos();
        res.render('emprestimo/listarEmprestimo', {listaEmprestimo});
    }catch(e){
        console.log(e);
    }
};

exports.buscarLivro = async(req, res) =>{
    try{
        const livro = new Livro(req.body);
        const listaLivro = await livro.listarLivroNome();
        res.render('emprestimo/listarLivro', {listaLivro});
    }catch(e) {
        console.log(e);
    }
};

exports.indexHistorico = async(req, res) =>{
    try{
        const emprestimo = new Emprestimo(req.body);
        const listaEmprestimo = await emprestimo.listarHistoricos();
        res.render('emprestimo/historicoEmprestimo', {listaEmprestimo});
    }catch(e){
        console.log(e);
    }
};

exports.buscarHistorico = async(req, res) => {
    try{
        const emprestimo = new Emprestimo(req.body);
        const listaEmprestimo = await emprestimo.listarHistorico();
        res.render('emprestimo/historicoEmprestimo', {listaEmprestimo});
    }catch{
        res.send(e)
    }
}