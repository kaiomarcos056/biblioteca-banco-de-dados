const {openDb} = require('../DB/configDB');

class Editora {
    constructor(body){
        this.body = body;
    }  

    async criarTabelaEditora(){
        openDb().then(db => {
            db.exec('CREATE TABLE IF NOT EXISTS editora(id_editora INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,nome_editora VARCHAR(255) NOT NULL)') 
        })
    }

    async inserirEditora(){
        openDb().then(db => {
            db.run('INSERT INTO editora(nome_editora) VALUES(?)', [this.body.nome])
        });
    }

    async alterarEditora(id){
        openDb().then(db => {
            db.run('UPDATE editora SET nome_editora = ? WHERE id_editora = ?', [this.body.nome,id])
        });
    }

    async deletarEditora(id){
        openDb().then(db => {
            db.run('DELETE FROM editora WHERE id_editora = ?', [id])
        });
    }

    async listarEditoras(){
        return openDb().then(db => {
            return db.all('SELECT * FROM editora', [], (err, rows) => {
               if (err) return console.error('Erro ao listar editoras: ',err.message);
           })
       })
    }

    async listarEditora(id){
        return openDb().then(db => {
            return db.all('SELECT * FROM editora WHERE id_editora = ?', [id], (err, rows) => {
               if (err) return console.error('Erro ao listar editoras: ',err.message);
           })
       })
    }

    async listarEditoraNome(){
        return openDb().then(db => {
            return db.all('SELECT * FROM editora WHERE UPPER(nome_editora) LIKE ?', ['%'+this.body.nome+'%'], (err, rows) => {
                if (err) return console.error('Erro ao listar editoras: ',err.message);
                rows.forEach(row => {
                    return console.log(row);
                });
           })
       })
    }

}

module.exports = Editora;