const express = require('express'); // CONEXAO
const route = express.Router(); // TRATA AS ROTAS

// CHAMANDO OS CONTROLADORES
const homeController = require('./src/controllers/homeController'); // CHAMANDO O CONTROLADOR DA HOME
const categoriaController = require('./src/controllers/categoriaContoller');
const autorController = require('./src/controllers/autorController');
const editoraController = require('./src/controllers/editoraController');
const livroController = require('./src/controllers/livroController');
const leitorController = require('./src/controllers/leitorController');
const administradorController = require('./src/controllers/administradorController');
const emprestimoController = require('./src/controllers/emprestimo.Controller');

// ROTA HOME
route.get('/', homeController.home);

// ROTAS CATEGORIA
route.get('/categoria', categoriaController.indexCategoria);
route.get('/cadastrarCategoria', categoriaController.indexCadastraCategoria);
route.post('/cadastrarCategoria', categoriaController.cadastrarCategoria);
route.get('/alterarCategoria/:id', categoriaController.indexAlterarCategoria);
route.post('/alterarCategoria/:id', categoriaController.alterarCategoria);
route.get('/deletarCategoria/:id', categoriaController.deletarCategoria);
route.post('/buscarCategoria', categoriaController.buscarCategoria);

// ROTAS AUTOR
route.get('/autor', autorController.indexAutor);
route.get('/cadastrarAutor', autorController.indexCadastraAutor);
route.post('/cadastrarAutor', autorController.cadastrarAutor);
route.get('/alterarAutor/:id', autorController.indexAlterarAutor);
route.post('/alterarAutor/:id', autorController.alterarAutor);
route.get('/deletarAutor/:id', autorController.deletarAutor);
route.post('/buscarAutor', autorController.buscarAutor);

// ROTA EDITORA
route.get('/editora', editoraController.indexEditora);
route.get('/cadastrarEditora', editoraController.indexCadastraEditora);
route.post('/cadastrarEditora', editoraController.cadastrarEditora);
route.get('/alterarEditora/:id', editoraController.indexAlterarEditora);
route.post('/alterarEditora/:id', editoraController.alterarEditora);
route.get('/deletarEditora/:id', editoraController.deletarEditora);
route.post('/buscarEditora', editoraController.buscarEditora);

// ROTA LIVRO
route.get('/livro', livroController.indexLivro);
route.get('/cadastrarLivro', livroController.indexCadastraLivro);
route.post('/cadastrarLivro', livroController.cadastrarLivro);
route.get('/alterarLivro/:id', livroController.indexAlterarLivro);
route.post('/alterarLivro/:id', livroController.alterarLivro);
route.get('/deletarLivro/:id', livroController.deletarLivro);
route.post('/buscarLivro', livroController.buscarLivro);

// ROTA LEITOR
route.get('/leitor', leitorController.indexLeitor);
route.get('/cadastrarLeitor', leitorController.indexCadastraLeitor);
route.post('/cadastrarLeitor', leitorController.cadastrarLeitor);
route.get('/alterarLeitor/:id', leitorController.indexAlterarLeitor);
route.post('/alterarLeitor/:id', leitorController.alterarLeitor);
route.get('/deletarLeitor/:id', leitorController.deletarLeitor);
route.get('/buscarLeitor', leitorController.buscarLeitorGET);
route.post('/buscarLeitor', leitorController.buscarLeitor);

// ROTA ADMINISTRADOR
route.get('/administrador', administradorController.indexAdministrador);
route.get('/cadastrarAdministrador', administradorController.indexCadastraAdministrador);
route.post('/cadastrarAdministrador', administradorController.cadastrarAdministrador);
route.get('/alterarAdministrador/:id', administradorController.indexAlterarAdministrador);
route.post('/alterarAdministrador/:id', administradorController.alterarAdministrador);
route.get('/deletarAdministrador/:id', administradorController.deletarAdministrador);
route.get('/buscarAdministrador', administradorController.buscarAdministradorGET);
route.post('/buscarAdministrador', administradorController.buscarAdministrador);

// ROTA ADMINISTRADOR
route.get('/emprestimo', emprestimoController.indexEmprestimo);
route.get('/alugarLivro', emprestimoController.indexAlugarLivro);
route.get('/alugarLivro/:id', emprestimoController.alugarLivro);
route.post('/alugarLivro/:id', emprestimoController.cadastraAlugaLivro);
route.get('/alterarEmprestimo/:id', emprestimoController.indexAlterarEmprestimo)
route.post('/alterarEmprestimo/:id', emprestimoController.alterarEmprestimo)
route.get('/devolverLivro/:id', emprestimoController.devolverLivro);
route.post('/buscarLivroEmprestimo', emprestimoController.buscarLivro);
route.get('/historicoEmprestimo', emprestimoController.indexHistorico);

module.exports = route; // EXPORTANDO O ROUTES