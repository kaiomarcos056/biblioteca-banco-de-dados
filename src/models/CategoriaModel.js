const {openDb} = require('../DB/configDB');

class Categoria {
    constructor(body){
        this.body = body;
    }  

    async criarTabelaCategoria(){
        openDb().then(db => {
            db.exec('CREATE TABLE IF NOT EXISTS categoria(id_categoria INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,nome_categoria VARCHAR(255) NOT NULL)') 
        })
    }

    async inserirCategoria(){
        openDb().then(db => {
            db.run('INSERT INTO categoria(nome_categoria) VALUES(?)', [this.body.nome])
        });
    }

    async alterarCategoria(id){
        openDb().then(db => {
            db.run('UPDATE categoria SET nome_categoria = ? WHERE id_categoria = ?', [this.body.nome,id])
        });
    }

    async deletarCategoria(id){
        openDb().then(db => {
            db.run('DELETE FROM categoria WHERE id_categoria = ?', [id])
        });
    }

    async listarCategorias(){
        return openDb().then(db => {
            return db.all('SELECT * FROM categoria', [], (err, rows) => {
               if (err) return console.error('Erro ao listar categorias: ',err.message);
           })
       })
    }

    async listarCategoria(id){
        return openDb().then(db => {
            return db.all('SELECT * FROM categoria WHERE id_categoria = ?', [id], (err, rows) => {
               if (err) return console.error('Erro ao listar categorias: ',err.message);
           })
       })
    }

    async listarCategoriaNome(){
        return openDb().then(db => {
            return db.all('SELECT * FROM categoria WHERE UPPER(nome_categoria) LIKE ?', ['%'+this.body.nome+'%'], (err, rows) => {
                if (err) return console.error('Erro ao listar categorias: ',err.message);
                rows.forEach(row => {
                    return console.log(row);
                });
           })
       })
    }

}

module.exports = Categoria;