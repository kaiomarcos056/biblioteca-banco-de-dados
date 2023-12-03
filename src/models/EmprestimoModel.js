const {openDb} = require('../DB/configDB');

class Emprestimo {
    constructor(body){
        this.body = body;
    }  

    async criarTabelaEmprestimo(){
        openDb().then(db => {
            db.exec(`CREATE TABLE IF NOT EXISTS emprestimo(
                            id_emprestimo INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                            id_livro INTEGER NOT NULL,
                            id_leitor INTEGER NOT NULL,
                            id_administrador INTEGER NOT NULL,
                            data_emprestimo DATE NOT NULL,
                            data_devolucao DATE NOT NULL,
                            status VARCHAR(2) NOT NULL,
                            FOREIGN KEY (id_livro) REFERENCES livro(id_livro),
                            FOREIGN KEY (id_leitor) REFERENCES autor(id_leitor),
                            FOREIGN KEY (id_administrador) REFERENCES administrador(id_administrador)
                    )`) 
        })
    }

    async listarEmprestimos(){
        return openDb().then(db => {
            return db.all(`SELECT 
                                * 
                            FROM emprestimo
                            INNER JOIN livro ON livro.id_livro = emprestimo.id_livro
                            INNER JOIN leitor ON leitor.id_leitor = emprestimo.id_leitor
                            INNER JOIN administrador ON administrador.id_administrador = emprestimo.id_administrador 
                            WHERE emprestimo.status = 'A' `
                            , [], (err, rows) => {
               if (err) return console.error('Erro ao listar emprestimos: ',err.message);
           })
       })
    }

    async listarHistorico(){
        return openDb().then(db => {
            return db.all(`SELECT 
                                * 
                            FROM emprestimo
                            INNER JOIN livro ON livro.id_livro = emprestimo.id_livro
                            INNER JOIN leitor ON leitor.id_leitor = emprestimo.id_leitor
                            INNER JOIN administrador ON administrador.id_administrador = emprestimo.id_administrador 
                            WHERE emprestimo.status = 'D' `
                            , [], (err, rows) => {
               if (err) return console.error('Erro ao listar emprestimos: ',err.message);
           })
       })
    }

    async listarEmprestimo(id){
        return openDb().then(db => {
            return db.all(`SELECT 
                                * 
                            FROM emprestimo
                            INNER JOIN livro ON livro.id_livro = emprestimo.id_livro
                            INNER JOIN autor ON livro.id_autor = autor.id_autor
                            INNER JOIN categoria ON livro.id_categoria = categoria.id_categoria
                            INNER JOIN editora ON livro.id_editora = editora.id_editora
                            INNER JOIN leitor ON leitor.id_leitor = emprestimo.id_leitor
                            INNER JOIN administrador ON administrador.id_administrador = emprestimo.id_administrador 
                            WHERE emprestimo.status = 'A' 
                            AND id_emprestimo = ?`
                            , [id], (err, rows) => {
               if (err) return console.error('Erro ao listar emprestimos: ',err.message);
           })
       })
    }

    async inserirEmprestimo(){
        openDb().then(db => {
            db.run(`INSERT INTO emprestimo(id_livro,id_leitor,id_administrador,data_emprestimo,data_devolucao,status) 
                    VALUES(?,?,?,?,?, 'A')`, [this.body.livro,this.body.leitor,this.body.administrador,this.body.dataEmp,this.body.dataDev])
        });
    }

    async alterarEmprestimo(id){
        openDb().then(db => {
            db.run('UPDATE emprestimo SET data_devolucao = ? WHERE id_emprestimo = ?', [this.body.dataDev,id])
        });
    }

    async alterarStatusEmprestimo(id){
        openDb().then(db => {
            db.run(`UPDATE emprestimo SET status = 'D' WHERE id_emprestimo = ?`, [id])
        });
    }
}

module.exports = Emprestimo;