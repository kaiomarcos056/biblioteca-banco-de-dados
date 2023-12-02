const {openDb} = require('../DB/configDB');

class Livro {
    constructor(body){
        this.body = body;
    }  

    async criarTabelaLivro(){
        openDb().then(db => {
            db.exec(`CREATE TABLE IF NOT EXISTS livro (
                        id_livro INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                        id_categoria INTEGER,
                        id_autor INTEGER,
                        id_editora INTEGER,
                        nome_livro VARCHAR(255),
                        capa VARCHAR(255),
                        data_lancamento DATE,
                        quantidade INTEGER,
                        FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria),
                        FOREIGN KEY (id_autor) REFERENCES autor(id_autor),
                        FOREIGN KEY (id_editora) REFERENCES editora(id_editora)
                    ) `) 
        })
    }

    async inserirLivro(){
        openDb().then(db => {
            db.run('INSERT INTO livro(nome_livro,capa,data_lancamento,quantidade,id_categoria,id_autor,id_editora) VALUES(?,?,?,?,?,?,?)', 
                    [this.body.nome, this.body.capa, this.body.data,this.body.quantidade,this.body.categoria, this.body.autor, this.body.editora]
                    )
        });
    }

    async alterarLivro(id){
        openDb().then(db => {
            db.run(`UPDATE livro 
                    SET nome_livro = ?,
                        capa = ?, 
                        data_lancamento = ?, 
                        quantidade = ?, 
                        id_categoria = ?, 
                        id_autor = ?, 
                        id_editora = ? 
                    WHERE id_livro = ?`, [this.body.nome, this.body.capa, this.body.data,this.body.quantidade,this.body.categoria, this.body.autor, this.body.editora,id])
        });
    }

    async deletarLivro(id){
        openDb().then(db => {
            db.run('DELETE FROM livro WHERE id_livro = ?', [id])
        });
    }

    async listarLivros(){
        return openDb().then(db => {
            return db.all(`SELECT * FROM livro
                            INNER JOIN autor ON autor.id_autor = livro.id_autor
                            INNER JOIN categoria ON categoria.id_categoria = livro.id_categoria
                            INNER JOIN editora ON editora.id_editora = livro.id_editora`, [], (err, rows) => {
               if (err) return console.error('Erro ao listar livro: ',err.message);
           })
       })
    }

    async listarLivro(id){
        return openDb().then(db => {
            return db.all(`SELECT * FROM livro
                           INNER JOIN autor ON autor.id_autor = livro.id_autor
                           INNER JOIN categoria ON categoria.id_categoria = livro.id_categoria
                           INNER JOIN editora ON editora.id_editora = livro.id_editora 
                           WHERE id_livro = ?`, [id], (err, rows) => {
               if (err) return console.error('Erro ao listar livro: ',err.message);
           })
       })
    }

    async listarLivroNome(){
        return openDb().then(db => {
            return db.all(`SELECT * FROM livro 
                           INNER JOIN autor ON autor.id_autor = livro.id_autor
                           INNER JOIN categoria ON categoria.id_categoria = livro.id_categoria
                           INNER JOIN editora ON editora.id_editora = livro.id_editora 
                           WHERE UPPER(nome_livro) LIKE ?`, ['%'+this.body.nome+'%'], (err, rows) => {
                if (err) return console.error('Erro ao listar editoras: ',err.message);
                rows.forEach(row => {
                    return console.log(row);
                });
           })
       })
    }

}

module.exports = Livro;