const {openDb} = require('../DB/configDB');

class Administrador {
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

    async criarTabelaAdministrador(){
        openDb().then(db => {
            db.exec(`CREATE TABLE IF NOT EXISTS administrador (
                        id_administrador INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                        id_usuario INTEGER,
                        nome_administrador VARCHAR(255),
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
            `INSERT INTO usuario(user, senha, nivel) VALUES (?, ?, 'A')`,
            [this.body.email, this.body.senha]
        );
        return result.lastID;
    }

    async inserirAdministrador(id){
        openDb().then(db => {
            db.run(`INSERT INTO administrador(nome_administrador,data_nascimento,email,telefone,cpf,id_usuario) VALUES(?,?,?,?,?,?)`, 
                    [this.body.nome,this.body.data,this.body.email,this.body.telefone,this.body.cpf,id]
                    )
        });
    }

    async alterarAdministrador(id){
        openDb().then(db => {
            db.run(`UPDATE administrador
                    SET nome_administrador = ?, 
                        data_nascimento = ?, 
                        email = ?, 
                        telefone = ?, 
                        cpf = ?
                    WHERE id_administrador = ?`, [this.body.nome, this.body.data, this.body.email,this.body.telefone,this.body.cpf,id])
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

    async deletarAdministrador(id){
        openDb().then(db => {
            db.run('DELETE FROM administrador WHERE id_administrador = ?', [id])
        });
    }

    async deletarUsuario(id){
        openDb().then(db => {
            db.run('DELETE FROM usuario WHERE id_usuario = ?', [id])
        });
    }

    async listarAdministradores(){
        return openDb().then(db => {
            return db.all(`SELECT * FROM administrador`, [], (err, rows) => {
               if (err) return console.error('Erro ao listar administrador: ',err.message);
           })
       })
    }

    async listarAdministrador(id){
        return openDb().then(db => {
            return db.all(`SELECT * FROM administrador
                           INNER JOIN usuario ON usuario.id_usuario = administrador.id_usuario
                           WHERE administrador.id_administrador = ?`, [id], (err, rows) => {
               if (err) return console.error('Erro ao listar administradores: ',err.message);
           })
       })
    }

    async listarAdministradorNome(){
        return openDb().then(db => {
            return db.all(`SELECT * FROM administrador 
                           INNER JOIN usuario ON usuario.id_usuario = administrador.id_usuario
                           WHERE UPPER(nome_administrador) LIKE ?`, ['%'+this.body.nome+'%'], (err, rows) => {
                if (err) return console.error('Erro ao listar administrador: ',err.message);
                rows.forEach(row => {
                    return console.log(row);
                });
           })
       })
    }

}

module.exports = Administrador;