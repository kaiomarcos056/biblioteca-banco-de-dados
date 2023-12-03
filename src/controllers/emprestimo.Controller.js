const Emprestimo = require('../models/EmprestimoModel');
const Livro = require('../models/LivroModel');
const Leitor = require('../models/LeitorModel');
const Administrador = require('../models/AdministradorModel');

exports.indexEmprestimo = async (req,res) => {
    try{
        const emprestimo = new Emprestimo(req.body);
        await emprestimo.criarTabelaEmprestimo();
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
        const listaEmprestimo = await emprestimo.listarEmprestimo(req.params.id);
        res.render('emprestimo/alterarEmprestimo', { listaEmprestimo })
    }catch(e) {
        console.log(e);
    }
}

exports.alterarEmprestimo = async(req, res) =>{
    try{
        const emprestimo = new Emprestimo(req.body);
        await emprestimo.alterarEmprestimo(req.params.id);
        return res.redirect('/emprestimo')
    }catch(e) {
        console.log(e);
    }
};

exports.devolverLivro = async(req, res) =>{
    try{
        const emprestimo = new Emprestimo(req.body);
        await emprestimo.alterarStatusEmprestimo(req.params.id);
        return res.redirect('/emprestimo')
    }catch(e) {
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
        const listaEmprestimo = await emprestimo.listarHistorico();
        res.render('emprestimo/historicoEmprestimo', {listaEmprestimo});
    }catch(e){
        console.log(e);
    }
};