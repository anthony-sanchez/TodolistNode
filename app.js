var express = require('express');
var app = express();


/* include middlewares */
app.use(express.cookieParser())
.use(express.session({secret: 'todotopsecret'}))
.use(express.bodyParser())

/* session */
.use(function(req, res, next){
	if(typeof(req.session.todolist) == 'undefined'){
		req.session.todolist = [];
	}
	//chainage vers la fonction suivante
	next();
});

/* routes */
app.get('/todo', function(req, res){
	res.render('todo.ejs', {todolist: req.session.todolist});
})

.post('/todo/ajouter/', function(req, res){
	if(req.body.newtodo != ''){
		req.session.todolist.push(req.body.newtodo);
	}
	res.redirect('/todo');
})

.get('/todo/supprimer/:id', function(req,res){
	if(req.params.id != ''){
		req.session.todolist.splice(req.params.id, 1);
	}
	res.redirect('/todo');
})

.use(function(res, res, next){
	res.redirect('/todo');
});

app.listen(8080);