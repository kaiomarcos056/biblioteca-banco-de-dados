const {openDb} = require('../DB/configDB');

class Emprestimo {
    constructor(body){
        this.body = body;
    }  

    async criarTabelaEmprestimo(){
        openDb().then(db => {
            db.exec(`CREATE TABLE
                     IF NOT EXISTS emprestimo (
                         id_livro INTEGER NOT NULL,
                         id_leitor INTEGER NOT NULL,
                         id_administrador INTEGER NOT NULL,
                         data_emprestimo DATE NOT NULL,
                         data_devolucao DATE NOT NULL,
                         PRIMARY KEY (id_livro, id_leitor),
                         FOREIGN KEY (id_livro) REFERENCES livro(id_livro),
                         FOREIGN KEY (id_leitor) REFERENCES leitor(id_leitor),
                         FOREIGN KEY (id_administrador) REFERENCES administrador(id_administrador)
                     )`) 
        })
    }

    async criarTabelaHistorico(){
        openDb().then(db => {
            db.exec(`CREATE TABLE
                     IF NOT EXISTS historico (
                         id_historico INTEGER NOT NULL,
                         id_livro INTEGER NOT NULL,
                         id_leitor INTEGER NOT NULL,
                         id_administrador INTEGER NOT NULL,
                         data_emprestimo DATE NOT NULL,
                         data_devolucao DATE NOT NULL,
                         PRIMARY KEY (id_historico),
                         FOREIGN KEY (id_livro) REFERENCES livro(id_livro),
                         FOREIGN KEY (id_leitor) REFERENCES leitor(id_leitor),
                         FOREIGN KEY (id_administrador) REFERENCES administrador(id_administrador)
                     )`) 
        })
    }

    async listarEmprestimos(){
        return openDb().then(db => {
            return db.all(`SELECT 
                                * 
                            FROM emprestimo
                            INNER JOIN livro 
                            ON livro.id_livro = emprestimo.id_livro
                            INNER JOIN leitor 
                            ON leitor.id_leitor = emprestimo.id_leitor
                            INNER JOIN administrador 
                            ON administrador.id_administrador = emprestimo.id_administrador`
                            , [], (err, rows) => {
               if (err) return console.error('Erro ao listar emprestimos: ',err.message);
           })
       })
    }

    async listarHistoricos(){
        return openDb().then(db => {
            return db.all(`SELECT 
                                * 
                            FROM historico
                            INNER JOIN livro 
                            ON livro.id_livro = historico.id_livro
                            INNER JOIN leitor 
                            ON leitor.id_leitor = historico.id_leitor
                            INNER JOIN administrador 
                            ON administrador.id_administrador = historico.id_administrador`
                            , [], (err, rows) => {
               if (err) return console.error('Erro ao listar historico: ',err.message);
           })
       })
    }

    async listarHistorico(){
        return openDb().then(db => {
            return db.all(`SELECT 
                                * 
                            FROM historico
                            INNER JOIN livro 
                            ON livro.id_livro = historico.id_livro
                            INNER JOIN leitor 
                            ON leitor.id_leitor = historico.id_leitor
                            INNER JOIN administrador 
                            ON administrador.id_administrador = historico.id_administrador
                            WHERE UPPER(leitor.nome_leitor) LIKE ?`
                            , ['%'+this.body.nome+'%'], (err, rows) => {
               if (err) return console.error('Erro ao listar historico: ',err.message);
           })
       })
    }

    async listarEmprestimo(idLivro,idLeitor){
        return openDb().then(db => {
            return db.all(`SELECT 
                                * 
                            FROM emprestimo
                            INNER JOIN livro 
                            ON livro.id_livro = emprestimo.id_livro
                            INNER JOIN autor 
                            ON livro.id_autor = autor.id_autor
                            INNER JOIN categoria 
                            ON livro.id_categoria = categoria.id_categoria
                            INNER JOIN editora 
                            ON livro.id_editora = editora.id_editora
                            INNER JOIN leitor 
                            ON leitor.id_leitor = emprestimo.id_leitor
                            INNER JOIN administrador 
                            ON administrador.id_administrador = emprestimo.id_administrador 
                            WHERE emprestimo.id_livro = ?
                            AND emprestimo.id_leitor = ?`
                            , [idLivro, idLeitor], (err, rows) => {
               if (err) return console.error('Erro ao listar emprestimos: ',err.message);
           })
       })
    }

    async inserirEmprestimo(){
        openDb().then(db => {
            db.run(`INSERT INTO emprestimo(id_livro,
                                           id_leitor,
                                           id_administrador,
                                           data_emprestimo,
                                           data_devolucao) 
                    VALUES(?,?,?,?,?)`, [this.body.livro,this.body.leitor,this.body.administrador,this.body.dataEmp,this.body.dataDev])
        });
    }

    async inserirHistorico(historico){
        openDb().then(db => {
            db.run(`INSERT INTO historico(id_livro,
                                           id_leitor,
                                           id_administrador,
                                           data_emprestimo,
                                           data_devolucao) 
                    VALUES(?,?,?,?,?)`, [historico.id_livro,historico.id_leitor,historico.id_administrador,historico.data_emprestimo,historico.data_devolucao])
        });
    }

    async alterarEmprestimo(idLivro,idLeitor){
        openDb().then(db => {
            db.run('UPDATE emprestimo SET data_devolucao = ? WHERE id_livro = ? AND id_leitor = ?', [this.body.dataDev,idLivro,idLeitor])
        });
    }

    async deletarEmprestimo(idLivro, idLeitor){
        openDb().then(db => {
            db.run(`DELETE FROM emprestimo WHERE id_livro = ? AND id_leitor = ?`, [idLivro, idLeitor])
        });
    }
}

module.exports = Emprestimo;