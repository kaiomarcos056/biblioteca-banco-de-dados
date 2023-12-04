const {openDb} = require('../DB/configDB');

class Leitor {
    constructor(body){
        this.body = body;
    }  

    async criarTabelaUsuario(){
        openDb().then(db => {
            db.exec(`CREATE TABLE IF NOT EXISTS usuario (
                        id_usuario INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                        user VARCHAR(255),
                        senha VARCHAR(255),
                        nivel VARCHAR(255)
                    ) `) 
        })
    }

    async criarTabelaLeitor(){
        openDb().then(db => {
            db.exec(`CREATE TABLE IF NOT EXISTS leitor (
                        id_leitor INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                        id_usuario INTEGER,
                        nome_leitor VARCHAR(255),
                        data_nascimento DATE,
                        email VARCHAR(255),
                        telefone VARCHAR(255),
                        cpf VARCHAR(255),
                        FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
                    ) `) 
        })
    }

    async inserirLogin() {
        const db = await openDb();
        const result = await db.run(
            `INSERT INTO usuario(user, senha, nivel) VALUES (?, ?, 'L')`,
            [this.body.email, this.body.senha]
        );
        return result.lastID;
    }

    async inserirLeitor(id){
        openDb().then(db => {
            db.run(`INSERT INTO leitor(nome_leitor,data_nascimento,email,telefone,cpf,id_usuario) VALUES(?,?,?,?,?,?)`, 
                    [this.body.nome,this.body.data,this.body.email,this.body.telefone,this.body.cpf,id]
                    )
        });
    }

    async alterarLeitor(id){
        openDb().then(db => {
            db.run(`UPDATE leitor 
                    SET nome_leitor = ?, 
                        data_nascimento = ?, 
                        email = ?, 
                        telefone = ?, 
                        cpf = ?
                    WHERE id_leitor = ?`, [this.body.nome, this.body.data, this.body.email,this.body.telefone,this.body.cpf,id])
        });
    }

    async alterarUsuario(id){
        openDb().then(db => {
            db.run(`UPDATE usuario 
                    SET user = ?, 
                        senha = ?
                    WHERE id_usuario = ?`, [this.body.email, this.body.senha,id])
        });
    }

    async deletarLeitor(id){
        openDb().then(db => {
            db.run('DELETE FROM leitor WHERE id_leitor = ?', [id])
        });
    }

    async deletarUsuario(id){
        openDb().then(db => {
            db.run('DELETE FROM usuario WHERE id_usuario = ?', [id])
        });
    }

    async listarLeitores(){
        return openDb().then(db => {
            return db.all(`SELECT * FROM leitor`, [], (err, rows) => {
               if (err) return console.error('Erro ao listar leitores: ',err.message);
           })
       })
    }

    async listarLeitor(id){
        return openDb().then(db => {
            return db.all(`SELECT * FROM leitor
                           INNER JOIN usuario ON usuario.id_usuario = leitor.id_usuario
                           WHERE leitor.id_leitor = ?`, [id], (err, rows) => {
               if (err) return console.error('Erro ao listar usuario: ',err.message);
           })
       })
    }

    async listarLeitorNome(){
        return openDb().then(db => {
            return db.all(`SELECT * FROM leitor 
                           INNER JOIN usuario ON usuario.id_usuario = leitor.id_usuario
                           WHERE UPPER(nome_leitor) LIKE ?`, ['%'+this.body.nome+'%'], (err, rows) => {
                if (err) return console.error('Erro ao listar leitores: ',err.message);
                rows.forEach(row => {
                    return console.log(row);
                });
           })
       })
    }


    async deleteLeitor(id){
        try{
            const listaLeitor = await this.listarLeitor(id);
            await this.deletarUsuario(listaLeitor[0].id_usuario);
            await this.deletarLeitor(id);
        }catch(e){
            console.log(e)
        }
    }
}

module.exports = Leitor;