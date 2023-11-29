const express = require('express');
const app = express();
const routes = require('./routes'); // CHAMANDO AS ROTDAS
const path = require('path'); // PEGANDO CAMINHO ABSOLUTO

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname,'public'))); // SETANDO PASTA PARA ARQUIVOS ESTATICOS
app.set('views', path.resolve(__dirname, 'src', 'views')); // SETANDO A PASTA VIEW COMO LOCAL DAS VIEWS
app.set('view engine', 'ejs'); // SETANDO A LINGUAM DAS VIEWS

app.use(routes); // USANDO AS ROTAS


app.listen(3000, () => {
    console.log('Acessar: http://localhost:3000')
});