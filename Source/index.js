var express        = require("express");
var bodyParser     = require("body-parser");
var parser         = bodyParser.urlencoded({extended: false});
var jwt            = require('jsonwebtoken');
var app            = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.listen(3000, () => console.log('Server started on port 3000'))

//connect to database
var pg = require('pg');
var config = {
  user: 'postgres', //env var: PGUSER
  database: 'kidlearning_db', //env var: PGDATABASE
  password: '1234', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
var pool = new pg.Pool(config);

//route
app.get('/', (req, res) => res.render('home1'));
app.post('/', parser, function(req,res){
	// var username = req.body.txtusername;
	// 	var password = req.body.txtpassword;
	// 	console.log(username);
	// 	console.log(password);
	// 	res.send(password);
	pool.connect(function(err, client, done) {
		if(err) {
	    return console.error('error fetching client from pool', err);
		}
		var username = req.body.txtusername;
		var password = req.body.txtpassword;
	  	client.query('select * from "USER" where "HOTEN"='+"'"+username+"'"+'and "PASSWORD"='+"'"+password+"'", function(err, result) {
	    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
	    done(err);

	    if(err) {
	      return console.error('error running query', err);
	    }
	    console.log(result.rowCount)
	    if(result.rowCount==0)
	    	res.redirect("/");
	   	if(result.rowCount==1)
	   	{
   			var token = jwt.sign({username: username, password: password}, 'secret');
   			// res.json({
	     //      success: true,
	     //      message: 'Enjoy your token!',
	     //      token: token
	     //    });

   // 			var decoded = jwt.verify(token, 'secret');
			// console.log(decoded.username) // bar
   // 			res.send(decoded.username)
   			//res.send(token); 	
	        res.redirect('trangchu');
   		}
	  });
	});
});

app.get("/trangchu", function(req,res){
	// // check header or url parameters or post parameters for token
	// var token = req.body.token || req.query.token || req.headers['token'];
	// console.log(token);
	// if (token) {

	//     // verifies secret and checks exp
	//     jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
	//       if (err) {
	//         return res.json({ success: false, message: 'Failed to authenticate token.' });    
	//       } else {
	//         // if everything is good, save to request for use in other routes
	//         req.decoded = decoded;    
	//         next();
	//       }
	//     });

	// } else {

	//     // if there is no token
	//     // return an error
	//     return res.status(403).send({ 
	//         success: false, 
	//         message: 'No token provided.' 
	//     });
	    
	// }
	res.render("home1");
});

app.post("/Lichsu_lop6_baihoc", function(req,res){
	var id = req.params.id;
	pool.connect(function(err, client, done) {
	  if(err) {
	    return console.error('error fetching client from pool', err);
	  }
	  client.query('select * from "BAIHOC"', function(err, result) {
	    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
	    done(err);

	    if(err) {
	      return console.error('error running query', err);
	    }
	    var name = result.rows;
	    //console.log(result.rows);
	    // //output: 1
	    // //res.render("trangchu",{name:result.rows[0].name})
	    // var name = result.rows[0].HOTEN;
	   	res.send(name);
	   	res.end();
	  });
	});
});