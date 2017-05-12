var express        = require("express");
var jwt            = require('jsonwebtoken');
var bodyParser     = require("body-parser");
var cookieParser   = require('cookie-parser')
var expressSession = require('express-session');

var passport 	   = require('passport');
var passportLocal  = require('passport-local');
var passportHttp   = require('passport-http');

var parser         = bodyParser.urlencoded({extended: false});

var app            = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressSession({
	secret: process.env.SESSION_SECRET || 'secret',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

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

//kiem tra dap nhap tu db
function verifyCredentials(username, password, done) {
	pool.connect(function(err, client, donedb) {
		console.log("so sanh db");
		console.log(username);
		console.log(password);

		if(err) {
	    return console.error('error fetching client from pool', err);
		}
		// var username = req.body.txtusername;
		// var password = req.body.txtpassword;
	  	client.query('select * from "USER" where "USERNAME"='+"'"+username+"'"+'and "PASSWORD"='+"'"+password+"'", function(err, result) {
		    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
		    donedb(err);
		    
		    if(err) {
		      return console.error('error running query', err);
		    }
		    console.log(result)
		    number=result.rowCount;
		    if(number==0)
		    	done(null,null);
		   	if(number==1)
		   	{
				done(null,{username: username, password: password, lop: result.rows[0].LOP});
			};
	  });
	});
	// console.log(number);
	// if(number==0)
 //    	done(null,null);
 //   	if(number==1)
 //   	{
	// 	done(null,{username: username, password: password});
	// 	console.log("xong cuoi");
	// 	return;
	// };
};
function ensureAuthenticated(req,res,next){
    if (req.isAuthenticated()){
        next();
    }else{
        res.redirect('/dangnhap');
    }
};

passport.use(new passportLocal.Strategy(verifyCredentials));
passport.use(new passportHttp.BasicStrategy(verifyCredentials));

passport.serializeUser(function(user, done) {
        done(null, user);
    });

passport.deserializeUser(function(user, done) {
   	done(null,user); 
});

//route
//dang nhap
app.get('/dangnhap',parser, function (req, res) {
    res.render('trangdangnhap');
});

app.post('/dangnhap',passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/dangnhap' }), function(req,res){
	//res.redirect('/');
});
//dang nhap

//dang xuat
app.get('/dangxuat', function (req, res) {
    req.logout();
    res.redirect('/');
});
//dang xuat

//dang ky
app.get('/dangky', function (req, res) {
    res.render('trangdangky');
});

app.post('/dangky', function(req, res){
	console.log('xyz: ' + req);
	console.log('abc: ' + req.body);
	console.log('body: ' + JSON.stringify(req.body));
	res.send(req.body);
});
//dang ky

//trang chu
app.get('/',ensureAuthenticated, function(req,res){
	res.render('trangchu',{
		isAuthenticated: req.isAuthenticated(),	
		user: req.user
	});
});

app.post('/', parser, function(req,res){
	// var username = req.body.txtusername;
	// 	var password = req.body.txtpassword;
	// 	console.log(username);
	// 	console.log(password);
	// 	res.send(password);
	// pool.connect(function(err, client, done) {
	// 	if(err) {
	//     return console.error('error fetching client from pool', err);
	// 	}
	// 	var username = req.body.txtusername;
	// 	var password = req.body.txtpassword;
	//   	client.query('select * from "USER" where "HOTEN"='+"'"+username+"'"+'and "PASSWORD"='+"'"+password+"'", function(err, result) {
	//     //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
	//     done(err);

	//     if(err) {
	//       return console.error('error running query', err);
	//     }
	//     console.log(result.rowCount)
	//     if(result.rowCount==0)
	//     	res.redirect("/");
	//    	if(result.rowCount==1)
	//    	{
 //   			var token = jwt.sign({username: username, password: password}, 'secret');
 //   			// res.json({
	//      //      success: true,
	//      //      message: 'Enjoy your token!',
	//      //      token: token
	//      //    });

 //   // 			var decoded = jwt.verify(token, 'secret');
	// 		// console.log(decoded.username) // bar
 //   // 			res.send(decoded.username)
 //   			//res.send(token); 	
	//         res.redirect('trangchu');
 //   		}
	//   });
	// });
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
	res.render("trangchu");
});
//trang chu


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
	    var data = result.rows;
	    //console.log(result.rows);
	    // //output: 1
	    // //res.render("trangchu",{name:result.rows[0].name})
	    // var name = result.rows[0].HOTEN;
	   	res.send(data);
	   	res.end();
	  });
	});
});

app.post("/Lichsu_lop6_video", function(req,res){
	var id = req.params.id;
	pool.connect(function(err, client, done) {
	  if(err) {
	    return console.error('error fetching client from pool', err);
	  }
	  client.query('select * from "BAIHOC","VIDEO" where "BAIHOC"."ID"="VIDEO"."ID"', function(err, result) {
	    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
	    done(err);

	    if(err) {
	      return console.error('error running query', err);
	    }
	    var data = result.rows;
	   	res.send(data);
	   	res.end();
	  });
	});
});

// app.get("/Lichsu_lop6_sachgiaokhoa", function(req,res){
// 	res.render("ls_6/index");
// });
