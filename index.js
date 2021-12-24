const restify = require('restify');
const errs=require('restify-errors');

const server = restify.createServer({
    name: 'myapp',
    version: '1.0.0'
});

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : 'localhost',
        user : 'flavio',
        password : '1234',
        database : 'express'
    }
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());



server.listen(5555, function () {
    console.log('%s listening at %s', server.name, server.url);
});

server.get('/', function (req, res, next) {
    knex('cofee').then((dados)=>{
        res.send(dados); 
    },next)
    
    
});

server.post('/create', function (req, res, next) {
    knex('cofee')
    .insert(req.body).then((dados)=>{
        if(!dados)return res.send(new errs.BadRequestError('nada foi encontrado'))
        res.send('dados criados com sucesso'); 
    },next)
    
    
});


server.get('/show/:id', function (req, res, next) {
    const {id}=req.params;
    knex('cofee')
    .where('id',id)
    .first()
    .then((dados)=>{
        if(!dados)return res.send(new errs.BadRequestError('nada foi encontrado'))
        res.send(dados); 
    },next)
    
    
});

server.put('/update/:id', function (req, res, next) {
    const {id}=req.params;
    knex('cofee')
    .where('id',id)
    .update(req.body)
    .then((dados)=>{
        if(!dados)return res.send(new errs.BadRequestError('nada foi encontrado'))
        res.send('dados alterados'); 
    },next)
    
    
});

server.del('/delete/:id', function (req, res, next) {
    const {id}=req.params;
    knex('cofee')
    .where('id',id)
    .delete()
    .then((dados)=>{
        if(!dados)return res.send(new errs.BadRequestError('nada foi encontrado'))
        res.send('dados deletados'); 
    },next)
    
    
});