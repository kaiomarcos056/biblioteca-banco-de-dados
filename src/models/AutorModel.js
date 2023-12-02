const {openDb} = require('../DB/configDB');

class Autor {
    constructor(body){
        this.body = body;
    }  

    async criarTabelaAutor(){
        openDb().then(db => {
            db.exec('CREATE TABLE IF NOT EXISTS autor(id_autor INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,nome_autor VARCHAR(255) NOT NULL)') 
        })
    }

    async inserirAutor(){
        openDb().then(db => {
            db.run('INSERT INTO autor(nome_autor) VALUES(?)', [this.body.nome])
        });
    }

    async alterarAutor(id){
        openDb().then(db => {
            db.run('UPDATE autor SET nome_autor = ? WHERE id_autor = ?', [this.body.nome,id])
        });
    }

    async deletarAutor(id){
        openDb().then(db => {
            db.run('DELETE FROM autor WHERE id_autor = ?', [id])
        });
    }

    async listarAutores(){
        return openDb().then(db => {
            return db.all('SELECT * FROM autor', [], (err, rows) => {
               if (err) return console.error('Erro ao listar autores: ',err.message);
           })
       })
    }

    async listarAutor(id){
        return openDb().then(db => {
            return db.all('SELECT * FROM autor WHERE id_autor = ?', [id], (err, rows) => {
               if (err) return console.error('Erro ao listar autor: ',err.message);
           })
       })
    }

    async listarAutorNome(){
        return openDb().then(db => {
            return db.all('SELECT * FROM autor WHERE UPPER(nome_autor) LIKE ?', ['%'+this.body.nome+'%'], (err, rows) => {
                if (err) return console.error('Erro ao listar categorias: ',err.message);
                rows.forEach(row => {
                    return console.log(row);
                });
           })
       })
    }

}

module.exports = Autor;