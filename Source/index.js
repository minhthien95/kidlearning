var express        = require("express");
var jwt            = require('jsonwebtoken');
var bodyParser     = require("body-parser");
var cookieParser   = require('cookie-parser')
var expressSession = require('express-session');

var server         = require('http').Server(app);
var io             = require('socket.io')(server);

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
		var decodedPW = jwt.sign(password, 'thiendeptrai');
		if(err) {
	    return console.error('error fetching client from pool', err);
		}
		// var username = req.body.txtusername;
		// var password = req.body.txtpassword;
	  	client.query('select * from "USER" where "USERNAME"='+"'"+username+"'"+'and "PASSWORD"='+"'"+decodedPW+"'", function(err, result) {
		    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
		    donedb(err);
		    
		    if(err) {
		      return console.error('error running query', err);
		    }
		    number=result.rowCount;
		    if(number==0)
		    	done(null,null);
		   	if(number==1)
		   	{
				done(null,{username: username, password: password, lop: result.rows[0].LOP, type: result.rows[0].LOAINGUOIDUNG, id: result.rows[0].ID});
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
	var id;
	var maxid;
	var username="'"+JSON.parse(JSON.stringify(req.body.username))+"'";
	var fullname="'"+JSON.parse(JSON.stringify(req.body.fullname))+"'";
	var birthday="'"+JSON.parse(JSON.stringify(req.body.birthday))+"'";
	var password="'"+JSON.parse(JSON.stringify(req.body.password))+"'";
	var email="'"+JSON.parse(JSON.stringify(req.body.email))+"'";
	var type="'"+JSON.parse(JSON.stringify(req.body.type))+"'";
	var truong="'"+JSON.parse(JSON.stringify(req.body.truong))+"'";
	var lop="'"+JSON.parse(JSON.stringify(req.body.lop))+"'";
	// console.log(id);

	var tokenPW = "'"+ jwt.sign(JSON.parse(JSON.stringify(req.body.password)), 'thiendeptrai') +"'";

	pool.connect(function(err, client, donedb) {
		if(err) {
	    	return console.error('error fetching client from pool', err);
		}	
	  	client.query('SELECT * FROM "USER" order by cast("ID" as int) desc limit 1',
	  		function(err, result) {
	  			donedb(err);
			    if(err) {
			      return console.error('error running query', err);
			    }

			    maxid=parseInt(result.rows[0].ID);
			    id=maxid+1;

			    maxid="'"+id+"'";
		    	pool.connect(function(err, client, donedb) {
					if(err) {
				    	return console.error('error fetching client from pool', err);
					}	
				  	client.query('INSERT INTO "USER" VALUES ('+maxid+','+
				  												fullname+','+
				  												birthday+','+
				  												type+','+
				  												lop+','+
				  												username+','+	
				  												email+','+
				  												truong+','+
				  												tokenPW+')',
				  		function(err, result) {
				  			donedb(err);
						    if(err) {
						      return console.error('error running query', err);
						    }
						    else{
						    	console.log("them xong");
						    	// console.log(result);
						    	//res.setHeader("Content-Type", "text/html");
						    	res.redirect('/');
						    	//res.send(result);
						    	return;
						    }
				  });
				});
	  		}
	  	);
	});

	// res.redirect('/dangnhap');
});
app.post('/checkLoginUsername', function(req, res){
	pool.connect(function(err, client, donedb) {
		if(err) {
	    return console.error('error fetching client from pool', err);
		}
	  	client.query('select * from "USER" where "USERNAME"='+"'"+JSON.parse(JSON.stringify(req.body.username))+"'", function(err, result) {
		    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
		    donedb(err);
		    
		    if(err) {
		      return console.error('error running query', err);
		    }
		    var number=result.rowCount;
		    if(number==0)
		    	res.send(true);
		   	else{
		   		if(JSON.parse(JSON.stringify(req.body.id))==result.rows[0].ID)
		    		res.send(true);
		    	else
			   		res.send(false);
		   	}
	  });
	});
});
app.post('/checkLoginEmail', function(req, res){
	pool.connect(function(err, client, donedb) {
		if(err) {
	    return console.error('error fetching client from pool', err);
		}
	  	client.query('select * from "USER" where "EMAIL"='+"'"+JSON.parse(JSON.stringify(req.body.email))+"'", function(err, result) {
		    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
		    donedb(err);
		    
		    if(err) {
		      return console.error('error running query', err);
		    }
		    var number=result.rowCount;
		    if(number==0)
		    	res.send(true);
		   	else{
			   	if(JSON.parse(JSON.stringify(req.body.id))==result.rows[0].ID)
		    		res.send(true);
		    	else
			   		res.send(false);
		   	}
	  });
	});
});
app.post('/checkPassword', function(req, res){
	pool.connect(function(err, client, donedb) {
		if(err) {
	    return console.error('error fetching client from pool', err);
		}
	  	client.query('select "PASSWORD" from "USER" where "ID"='+"'"+JSON.parse(JSON.stringify(req.body.id))+"'", function(err, result) {
		    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
		    donedb(err);
		    
		    if(err) {
		      return console.error('error running query', err);
		    }
		    var password=result.rows[0].PASSWORD;
		    var password1 = jwt.sign(JSON.parse(JSON.stringify(req.body.password)), 'thiendeptrai');

		    if(password==password1)
		    	res.send(true);
		   	else
			   	res.send(false);
	  });
	});
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

//sua thong tin
app.get('/getUserInfo/:id', function(req, res){

	var tempDate="'"+"YYYY-MM-DD"+"'";
	pool.connect(function(err, client, donedb) {
		if(err) {
	    	return console.error('error fetching client from pool', err);
		}	
	  	client.query('select *,to_char("NGAYSINH",'+ tempDate+') from "USER" where "ID"='+"'"+req.params.id+"'",
	  		function(err, result) {
	  			donedb(err);
			    if(err) {
			      return console.error('error running query', err);
			    }
			    else{
			    	console.log("lay thong tin xong");
			    	res.send(result.rows[0]);
			    }
	  	});
	});	
});

app.post('/updateUserInfo', function(req, res){	
	var id="'"+JSON.parse(JSON.stringify(req.body.id))+"'";
	var username="'"+JSON.parse(JSON.stringify(req.body.username))+"'";
	var fullname="'"+JSON.parse(JSON.stringify(req.body.fullname))+"'";
	var birthday="'"+JSON.parse(JSON.stringify(req.body.birthday))+"'";
	var password="'"+JSON.parse(JSON.stringify(req.body.password))+"'";
	var email="'"+JSON.parse(JSON.stringify(req.body.email))+"'";
	var type="'"+JSON.parse(JSON.stringify(req.body.type))+"'";
	var truong="'"+JSON.parse(JSON.stringify(req.body.truong))+"'";
	var lop="'"+JSON.parse(JSON.stringify(req.body.lop))+"'";

	var tokenPW = "'"+ jwt.sign(JSON.parse(JSON.stringify(req.body.password)), 'thiendeptrai') +"'";

	pool.connect(function(err, client, donedb) {
		if(err) {
	    	return console.error('error fetching client from pool', err);
		}	
	  	client.query('UPDATE "USER" set "ID"='+id+', "HOTEN"='+
  												fullname+', "NGAYSINH"='+
  												birthday+',"LOP"='+
  												lop+',"USERNAME"='+
  												username+', "EMAIL"='+	
  												email+',"TRUONG"='+
  												truong+',"PASSWORD"='+
  												tokenPW+' WHERE "ID"='+id,
	  		function(err, result) {	
	  			donedb(err);
			    if(err) {
			      return console.error('error running query', err);
			    }
			    else{
			    	console.log("sua thong tin xong");
			    	// res.setHeader("Content-Type", "text/html");
			    	res.redirect('/');
			    	return;
			    }
	  });
	});	

	//res.redirect('/dangnhap');
});
//sua thong tin

app.post("/Lichsu_baihoc/lop:id", function(req,res){
	var id ="'"+ req.params.id+"'";
	pool.connect(function(err, client, done) {
		if(err) {
		    return console.error('error fetching client from pool', err);
		}
		client.on('notification', function(msg) {
		    console.log(msg);
		});
		client.query('select * from "BAIHOC" where "PHANLOP"='+id, function(err, result) {
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
		 })
		
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

app.get("/Lichsu_lop6_sachgiaokhoa", function(req,res){
	res.render("ls_6/index");
});

// app.post("/Lichsu_cauhoi/:id", function(req,res){
// 	pool.connect(function(err, client, done) {
// 	  if(err) {
// 	    return console.error('error fetching client from pool', err);
// 	  }
// 	  client.query('select * from "CAUHOI" where "PHANLOP"='+"'"+req.params.id+"'", function(err, result) {
// 	    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
// 	    done(err);

// 	    if(err) {
// 	      return console.error('error running query', err);
// 	    }
// 	    var data = result.rows;
// 	   	res.send(data);
// 	   	res.end();
// 	  });
// 	});
// });
app.post("/Hoidap_lichsu/lop:lop/id:id", function(req,res){

	var tempDate="'"+"YYYY-MM-DD"+"'";
	var lop=req.params.lop;
	var id=req.params.id;
	var query="select *,to_char("+'"'+"THOIGIAN"+'"'+","+ tempDate+") from "+'"'+"CAUHOI"+'"'+","+'"'+"USER"+'"'+
	 " where "+'"'+"CAUHOI"+'"'+'.'+'"'+"ID_TACGIA"+'"'+" = "+'"'+"USER"+'"'+'.'+'"'+"ID"+'"';
	if(lop!="all")
		query+=" and "+'"'+"PHANLOP"+'"'+"= '"+lop+"' ";
	if(id!="all")
		query+=" and "+'"'+"CAUHOI"+'"'+'.'+'"'+"ID"+'"'+"= '"+id+"' ";
	query+=" order by "+'"'+"THOIGIAN"+'"'+" desc ";
	pool.connect(function(err, client, done) {
	  if(err) {
	    return console.error('error fetching client from pool', err);
	  }
	  client.query(query, function(err, result) {
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

app.post("/Binhluan/id:id", function(req,res){
	var id = "'"+req.params.id+"'";
	pool.connect(function(err, client, done) {
	  if(err) {
	    return console.error('error fetching client from pool', err);
	  }
	  client.query('select * from "BINHLUAN","USER" where "BINHLUAN"."ID_NGUOITRALOI"="USER"."ID" and "ID_CAUHOI"='+id, function(err, result) {
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