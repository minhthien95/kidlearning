var express        = require("express");
var jwt            = require('jsonwebtoken');
var bodyParser     = require("body-parser");
var cookieParser   = require('cookie-parser')
var expressSession = require('express-session');

var passport 	   = require('passport');
var passportLocal  = require('passport-local');
var passportHttp   = require('passport-http');
var passportFacebook = require('passport-facebook');
var passportTwitter = require('passport-twitter');
var passportGoogle = require('passport-google-oauth');

var parser         = bodyParser.urlencoded({extended: false});

var upload = require('express-fileupload');
var zip = require('machinepack-zip');
var nodemailer = require('nodemailer');

var app            = express();
var server         = require('http').Server(app);
var io             = require('socket.io')(server);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(upload()); // configure middleware
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

server.listen(process.env.PORT || 3000, () => console.log('Server started on port 3000'))

///
//var urlcallback='http://localhost:3000';
var urlcallback='http://kid-learning.herokuapp.com';
//connect to database
var pg = require('pg');
var config = {
  user: 'postgres', //env var: PGUSER
  database: 'kidlearning_db', //env var: PGDATABASE
  password: '1234', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  // max: 10, // max number of clients in the pool
  // idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
// var config = {
//   user: 'avcmrazelrvvjs', //env var: PGUSER
//   database: 'd9q456o7ql21ai', //env var: PGDATABASE
//   password: '5c08b03aae2e27e8a31984e0708fb572e36d20dc4c551d7f2fb2bd26db9dee69', //env var: PGPASSWORD
//   host: 'ec2-50-19-219-69.compute-1.amazonaws.com', // Server hosting the postgres database
//   port: 5432 //env var: PGPORT
// };
var pool = new pg.Pool(config);

///

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
passport.use(new passportFacebook.Strategy({
    clientID: '1886755184926243',
    clientSecret: 'dfccf327a61c08ea9935109abc1b73e4',
    callbackURL: urlcallback+'/auth/fb/callback'
	},
	function(accessToken, refreshToken, profile, done) {
		var id;
		var maxid;
		var username="'"+profile.id+"'";
		var fullname="'"+profile.displayName+"'";
		var password="'"+"0000"+"'";
		var type="'"+"hocsinh"+"'";
		var id_login="'"+profile.id+"'";
		var tokenPW = "'"+ jwt.sign(JSON.parse(JSON.stringify('0000')), 'thiendeptrai') +"'";
	    pool.connect(function(err, client, donedb) {
			if(err) {
		    	return console.error('error fetching client from pool', err);
			}
			// var username = req.body.txtusername;
			// var password = req.body.txtpassword;
		  	client.query('select * from "USER" where "ID_LOGIN"='+"'"+profile.id+"'", function(err, result) {
			    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
			    donedb(err);
			    
			    if(err) {
			      return console.error('error running query', err);
			    }
			    number=result.rowCount;
			    if(number==0){
				  	client.query('SELECT * FROM "USER" order by cast("ID" as int) desc limit 1',
				  		function(err, result) {
				  			donedb(err);
						    if(err) {
						      return console.error('error running query', err);
						    }
						    if(result.rowCount==0)
						    	id=1;
						    else{
						    	maxid=parseInt(result.rows[0].ID);
						    	id=maxid+1;
							}

						    maxid="'"+id+"'";
					    	pool.connect(function(err, client, donedb) {
								if(err) {
							    	return console.error('error fetching client from pool', err);
								}	
							  	client.query('INSERT INTO "USER" VALUES ('+maxid+','+
							  												fullname+','+
							  												null+','+
							  												type+','+
							  												6+','+
							  												username+','+	
							  												null+','+
							  												null+','+
							  												tokenPW+','+
							  												0+','+
							  												'1'+','+
							  												'1'+','+
							  												id_login+')',
							  		function(err, result) {
							  			donedb(err);
									    if(err) {
									      return console.error('error running query', err);
									    }
									    else{
									    	console.log("them xong");
									    	done(null, {username: profile.id, password: tokenPW, lop: "6", type: "hocsinh", id: id});
									    	return;
									    }
							  });
							});
				  		}
				  	);
			    }
			   	if(number==1)
			   	{
					 done(null, {username: result.rows[0].USERNAME, password: result.rows[0].PASSWORD, lop: result.rows[0].LOP, type: result.rows[0].LOAINGUOIDUNG, id: result.rows[0].ID});
				};
		  });
		});
	    // console.log("accessToken " + accessToken);
	    // console.log(refreshToken);
	    // console.log(profile);

	    // return done(null, {username: "username", password: "password", lop: "result.rows[0].LOP", type: "result.rows[0].LOAINGUOIDUNG", id: "result.rows[0].ID"});
	})
);
passport.use(new passportTwitter.Strategy({
    consumerKey: '5aKlUudDXXkTbLqb9R3hTSNVg',
    consumerSecret: '9dscXlTSfPlZKeS4wxQeUOoyvC93VfpyjKgi6ePx1qxmlGNyv1',
    callbackURL: urlcallback+'/auth/tw/callback'
	},
	function(accessToken, refreshToken, profile, done) {
		var id;
		var maxid;
		var username="'"+profile.id+"'";
		var fullname="'"+profile.displayName+"'";
		var password="'"+"0000"+"'";
		var type="'"+"hocsinh"+"'";
		var id_login="'"+profile.id+"'";
		var tokenPW = "'"+ jwt.sign(JSON.parse(JSON.stringify('0000')), 'thiendeptrai') +"'";
	    pool.connect(function(err, client, donedb) {
			if(err) {
		    	return console.error('error fetching client from pool', err);
			}
			// var username = req.body.txtusername;
			// var password = req.body.txtpassword;
		  	client.query('select * from "USER" where "ID_LOGIN"='+"'"+profile.id+"'", function(err, result) {
			    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
			    donedb(err);
			    
			    if(err) {
			      return console.error('error running query', err);
			    }
			    number=result.rowCount;
			    if(number==0){
				  	client.query('SELECT * FROM "USER" order by cast("ID" as int) desc limit 1',
				  		function(err, result) {
				  			donedb(err);
						    if(err) {
						      return console.error('error running query', err);
						    }
						    if(result.rowCount==0)
						    	id=1;
						    else{
						    	maxid=parseInt(result.rows[0].ID);
						    	id=maxid+1;
							}

						    maxid="'"+id+"'";
					    	pool.connect(function(err, client, donedb) {
								if(err) {
							    	return console.error('error fetching client from pool', err);
								}	
							  	client.query('INSERT INTO "USER" VALUES ('+maxid+','+
							  												fullname+','+
							  												null+','+
							  												type+','+
							  												6+','+
							  												username+','+	
							  												null+','+
							  												null+','+
							  												tokenPW+','+
							  												0+','+
							  												'1'+','+
							  												'1'+','+
							  												id_login+')',
							  		function(err, result) {
							  			donedb(err);
									    if(err) {
									      return console.error('error running query', err);
									    }
									    else{
									    	console.log("them xong");
									    	done(null, {username: profile.id, password: tokenPW, lop: "6", type: "hocsinh", id: id});
									    	return;
									    }
							  });
							});
				  		}
				  	);
			    }
			   	if(number==1)
			   	{
					 done(null, {username: result.rows[0].USERNAME, password: result.rows[0].PASSWORD, lop: result.rows[0].LOP, type: result.rows[0].LOAINGUOIDUNG, id: result.rows[0].ID});
				};
		  });
		});
	})
);
passport.use(new passportGoogle.OAuth2Strategy({
    clientID: '690165654268-1p9ks52ih5g3q9193o76ssg6lbcde3ao.apps.googleusercontent.com',
    clientSecret: 'jez0paaM5MzAt9cID726MRT9',
    callbackURL: urlcallback+'/auth/gg/callback'
	},
	function(accessToken, refreshToken, profile, done) {
		var id;
		var maxid;
		var username="'"+profile.id+"'";
		var fullname="'"+profile.displayName+"'";
		var password="'"+"0000"+"'";
		var email="'"+profile.emails[0].value+"'";
		var type="'"+"hocsinh"+"'";
		var id_login="'"+profile.id+"'";
		var tokenPW = "'"+ jwt.sign(JSON.parse(JSON.stringify('0000')), 'thiendeptrai') +"'";
	    pool.connect(function(err, client, donedb) {
			if(err) {
		    	return console.error('error fetching client from pool', err);
			}
			// var username = req.body.txtusername;
			// var password = req.body.txtpassword;
		  	client.query('select * from "USER" where "ID_LOGIN"='+"'"+profile.id+"'", function(err, result) {
			    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
			    donedb(err);
			    
			    if(err) {
			      return console.error('error running query', err);
			    }
			    number=result.rowCount;
			    if(number==0){
				  	client.query('SELECT * FROM "USER" order by cast("ID" as int) desc limit 1',
				  		function(err, result) {
				  			donedb(err);
						    if(err) {
						      return console.error('error running query', err);
						    }
						    if(result.rowCount==0)
						    	id=1;
						    else{
						    	maxid=parseInt(result.rows[0].ID);
						    	id=maxid+1;
							}

						    maxid="'"+id+"'";
					    	pool.connect(function(err, client, donedb) {
								if(err) {
							    	return console.error('error fetching client from pool', err);
								}	
							  	client.query('INSERT INTO "USER" VALUES ('+maxid+','+
							  												fullname+','+
							  												null+','+
							  												type+','+
							  												6+','+
							  												username+','+	
							  												email+','+
							  												null+','+
							  												tokenPW+','+
							  												0+','+
							  												'1'+','+
							  												'1'+','+
							  												id_login+')',
							  		function(err, result) {
							  			donedb(err);
									    if(err) {
									      return console.error('error running query', err);
									    }
									    else{
									    	console.log("them xong");
									    	done(null, {username: profile.id, password: tokenPW, lop: "6", type: "hocsinh", id: id});
									    	return;
									    }
							  });
							});
				  		}
				  	);
			    }
			   	if(number==1)
			   	{
					 done(null, {username: result.rows[0].USERNAME, password: result.rows[0].PASSWORD, lop: result.rows[0].LOP, type: result.rows[0].LOAINGUOIDUNG, id: result.rows[0].ID});
				};
		  });
		});
	})
);
passport.serializeUser(function(user, done) {
	console.log("serializeUser");
	console.log(user);
        done(null, user);
});

passport.deserializeUser(function(user, done) {
   	done(null,user); 
});
///dang nhap fb
app.get('/auth/fb',
  passport.authenticate('facebook'), function(){
  	console.log(" vao /auth/fb");
});

app.get('/auth/fb/callback', 
  passport.authenticate('facebook', { successRedirect: '/',
                                   failureRedirect: '/dangnhap' }),
  function(req, res) {
  	console.log(" vao /auth/fb/callback");
    //res.redirect('/');
});

///dang nhap twitter
app.get('/auth/tw',
  passport.authenticate('twitter'), function(){
  	console.log(" vao /auth/tw");
});

app.get('/auth/tw/callback', 
  passport.authenticate('twitter', { successRedirect: '/',
                                   failureRedirect: '/dangnhap' }),
  function(req, res) {
  	console.log(" vao /auth/tw/callback");
    //res.redirect('/');
});
///dang nhap google+
app.get('/auth/gg',
  passport.authenticate('google',{ scope : ['profile', 'email'] }), function(){
  	console.log(" vao /auth/gg");
});

app.get('/auth/gg/callback', 
  passport.authenticate('google', { successRedirect: '/',
                                   failureRedirect: '/dangnhap' }),
  function(req, res) {
  	console.log(" vao /auth/gg/callback");
    //res.redirect('/');
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

//quen mat khau
app.get('/quenmatkhau', function (req, res) {
    res.render('quenmatkhau');
});
app.post('/laymatkhau', function (req, res) {
    var username="'"+JSON.parse(JSON.stringify(req.body.username))+"'";
	var email="'"+JSON.parse(JSON.stringify(req.body.email))+"'";
	pool.connect(function(err, client, donedb) {
		if(err) {
	    return console.error('error fetching client from pool', err);
		}
	  	client.query('select * from "USER" where "USERNAME"='+username+' and "EMAIL"='+email, function(err, result) {
		    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
		    donedb(err);
		    
		    if(err) {
		      return console.error('error running query', err);
		    }
		    var number=result.rowCount;
		    if(number==0)
		    	res.send(false);
		   	else{
		   		var decoded = jwt.verify(result.rows[0].PASSWORD, 'thiendeptrai');
		   		var transporter = nodemailer.createTransport({
					  service: 'gmail',
					  auth: {
					    user: 'kidlearning.hcmus@gmail.com',
					    pass: 'leminhthien'
					  }
				});

				var mailOptions = {
					  from: 'kidlearning.hcmus@gmail.com',
					  to: JSON.parse(JSON.stringify(req.body.email)),
					  subject: '[Kid Learning] Lấy lại mật khẩu ',
					  text: 'Mật khẩu tài khoản của bạn là: '+decoded+'. \nVui lòng đăng nhập lại tại: http://kid-learning.herokuapp.com.\nNếu bạn không phải là chủ nhân tại khoản này vui lòng bỏ qua tin nhắn này.'
				};

				transporter.sendMail(mailOptions, function(error, info){
					  if (error) {
					    console.log(error);
					  } else {
					    console.log('Email sent: ' + info.response +email);
					  }
					  res.end();
				});
		    	
		   	}
	  });
	});
});
//quen mat khau

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
			    if(result.rowCount==0)
			    	id=1;
			    else{
			    	maxid=parseInt(result.rows[0].ID);
			    	id=maxid+1;
				}

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
				  												tokenPW+','+
				  												0+','+
				  												'1'+','+
				  												'1'+')',
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
////
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
});

app.get("/trangchu", function(req,res){
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
	  	client.query('select *,cast("BAI_LICHSU" as int),cast("BAI_DIALI" as int), to_char("NGAYSINH",'+ tempDate+') from "USER" where "ID"='+"'"+req.params.id+"'",
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


app.get("/sachgiaokhoa/:mon/:lop", function(req,res){
	var path="sgk/"+req.params.mon+req.params.lop+"/index";
	res.render(path);
});


//----------------------------realtime code-----------------------------------
io.sockets.on('connection', function(socket){
	console.log("io connection");
	//show lists answers
	socket.on('c2s_Thaoluan', function(data){// param{mon,lop,id_cauhoi}
	    console.log("Thaoluan");
    	var tempDate="'"+"HH24:MI DD-MM-YYYY"+"'";
    	var mon=data.mon;
		var lop=data.lop;
		var id=data.id;
		var id_user=data.id_user;
		var key=data.key;
		console.log("key "+key);
		var query="select *,"+'"'+"CAUHOI"+'"'+'.'+'"'+"ID"+'" as '+'"'+"ID_CAUHOI"+'"'+",to_char("+'"'+"THOIGIAN"+'"'+","+ tempDate+") from "+'"'+"CAUHOI"+'"'+","+'"'+"USER"+'"'+
		 " where "+'"'+"CAUHOI"+'"'+'.'+'"'+"ID_TACGIA"+'"'+" = "+'"'+"USER"+'"'+'.'+'"'+"ID"+'"';
		if(mon!="all")
			query+=" and "+'"'+"MON"+'"'+"= '"+mon+"' ";
		if(lop!="all")
			query+=" and "+'"'+"PHANLOP"+'"'+"= '"+lop+"' ";
		if(id!="all")
			query+=" and "+'"'+"CAUHOI"+'"'+'.'+'"'+"ID"+'"'+"= '"+id+"' ";
		if(id_user!="all")
			query+=" and "+'"'+"CAUHOI"+'"'+'.'+'"'+"ID_TACGIA"+'"'+"= '"+id_user+"' ";
		if(key!=undefined)
			query+=" and "+'"'+"CAUHOI"+'"'+'.'+'"'+"NOIDUNG"+'"'+"~* '"+key+"' ";
		query+=" order by "+'"'+"THOIGIAN"+'"'+" desc ";

		pool.connect(function(err, client, done) {
			if(err) {
			    return console.error('error fetching client from pool', err);
			}

			client.query("LISTEN realtimecauhoi");

			client.on('notification', function(msg) {
		        console.log("realtime cauhoi");
				client.query(query, function(err, result) {
				    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
				    done(err);

				    if(err) {
				      return console.error('error running query', err);
				    }
				    var data1 = result.rows;
				    socket.emit('s2c_Thaoluan',data1);
				   	//console.log(data1);
				});
		    });
			client.query(query, function(err, result) {
			    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
			    done(err);

			    if(err) {
			      return console.error('error running query', err);
			    }
			    var data1 = result.rows;
			    socket.emit('s2c_Thaoluan',data1);
			   	//console.log(data1);
			});
		});

	});
	///show lists comments
	socket.on('c2s_Binhluan', function(data){// param{mon,lop,id_cauhoi}
		console.log("Binhluan");
		var id = "'"+data.id+"'";
		var tempDate="'"+"HH24:MI DD-MM-YYYY"+"'";
		pool.connect(function(err, client, done) {
		  	if(err) {
		    	return console.error('error fetching client from pool', err);
		  	}
		  	client.query("LISTEN realtimebinhluan");

			client.on('notification', function(msg) {
		        console.log("realtime binhluan "+id);
		        //console.log(id);
				client.query('select *,to_char("THOIGIAN",'+ tempDate +'),"BINHLUAN"."ID" as "ID_BINHLUAN" from "BINHLUAN","USER" where "BINHLUAN"."ID_NGUOITRALOI"="USER"."ID" and "ID_CAUHOI"='+id+'order by "BINHLUAN"."THOIGIAN" asc', function(err, result) {
				    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
				    done(err);

				    if(err) {
				      return console.error('error running query', err);
				    }
				    var data1 = result.rows;
				    socket.emit('s2c_Binhluan',data1);
				   	//console.log(data1);
				});
		    });
		  	client.query('select *,to_char("THOIGIAN",'+ tempDate +'),"BINHLUAN"."ID" as "ID_BINHLUAN" from "BINHLUAN","USER" where "BINHLUAN"."ID_NGUOITRALOI"="USER"."ID" and "ID_CAUHOI"='+id+'order by "BINHLUAN"."THOIGIAN" asc', function(err, result) {
		    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
		    	done(err);

			    if(err) {
			      return console.error('error running query', err);
			    }
			    var data1 = result.rows;
			   	socket.emit('s2c_Binhluan',data1);
		  	});
		});
	});
	//show lists bai viet
	socket.on('c2s_Baiviet', function(data){// param{mon,lop,id_cauhoi}
	    console.log("Bai viet");
    	var tempDate="'"+"HH24:MI DD-MM-YYYY"+"'";
    	var mon=data.mon;
		var lop=data.lop;
		var id=data.id;
		var id_user=data.id_user;

		var query="select *,"+'"'+"BAIVIET"+'"'+'.'+'"'+"ID"+'" as '+'"'+"ID_BAIVIET"+'"'+",to_char("+'"'+"THOIGIAN"+'"'+","+ tempDate+") from "+'"'+"BAIVIET"+'"'+","+'"'+"USER"+'"'+
		 " where "+'"'+"BAIVIET"+'"'+'.'+'"'+"ID_TACGIA"+'"'+" = "+'"'+"USER"+'"'+'.'+'"'+"ID"+'"';
		if(mon!="all")
			query+=" and "+'"'+"MON"+'"'+"= '"+mon+"' ";
		if(lop!="all")
			query+=" and "+'"'+"PHANLOP"+'"'+"= '"+lop+"' ";
		if(id!="all")
			query+=" and "+'"'+"BAIVIET"+'"'+'.'+'"'+"ID"+'"'+"= '"+id+"' ";
		if(id_user!="all")
			query+=" and "+'"'+"BAIVIET"+'"'+'.'+'"'+"ID_TACGIA"+'"'+"= '"+id_user+"' ";
		query+=" order by "+'"'+"THOIGIAN"+'"'+" desc ";

		pool.connect(function(err, client, done) {
			if(err) {
			    return console.error('error fetching client from pool', err);
			}

			client.query("LISTEN realtimebaiviet");

			client.on('notification', function(msg) {
		        console.log("realtime baiviet");
				client.query(query, function(err, result) {
				    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
				    done(err);

				    if(err) {
				      return console.error('error running query', err);
				    }
				    var data1 = result.rows;
				    socket.emit('s2c_Thaoluan',data1);
				   	//console.log(data1);
				});
		    });
			client.query(query, function(err, result) {
			    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
			    done(err);

			    if(err) {
			      return console.error('error running query', err);
			    }
			    var data1 = result.rows;
			    socket.emit('s2c_Baiviet',data1);
			   	//console.log(data1);
			});
		});

	});
	//show lists bai hoc
	socket.on('c2s_Baihoc', function(data){// param{mon,lop,id_cauhoi}
	    console.log("Baihoc");
    	var tempDate="'"+"HH24:MI DD-MM-YYYY"+"'";
    	var mon=data.mon;
		var lop=data.lop;
		var id=data.id;
		var id_user=data.id_user;

		var query="select *,cast("+'"'+"BAI"+'"'+"as int), "+'"'+"BAIHOC"+'"'+'.'+'"'+"ID"+'" as '+'"'+"ID_BAIHOC"+'"'+",to_char("+'"'+"THOIGIAN"+'"'+","+ tempDate+") from "+'"'+"BAIHOC"+'"'+","+'"'+"USER"+'"'+
		 " where "+'"'+"BAIHOC"+'"'+'.'+'"'+"ID_TACGIA"+'"'+" = "+'"'+"USER"+'"'+'.'+'"'+"ID"+'"';
		if(mon!="all")
			query+=" and "+'"'+"MON"+'"'+"= '"+mon+"' ";
		if(lop!="all")
			query+=" and "+'"'+"PHANLOP"+'"'+"= '"+lop+"' ";
		if(id!="all")
			query+=" and "+'"'+"BAIHOC"+'"'+'.'+'"'+"BAI"+'"'+"= '"+id+"' ";
		if(id_user!="all")
			query+=" and "+'"'+"BAIHOC"+'"'+'.'+'"'+"ID_TACGIA"+'"'+"= '"+id_user+"' ";
		query+=" order by cast("+'"'+"BAI"+'"'+"as int) asc ";

		pool.connect(function(err, client, done) {
			if(err) {
			    return console.error('error fetching client from pool', err);
			}

			client.query("LISTEN realtimebaihoc");

			client.on('notification', function(msg) {
		        console.log("realtime baihoc");
				client.query(query, function(err, result) {
				    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
				    done(err);

				    if(err) {
				      return console.error('error running query', err);
				    }
				    var data1 = result.rows;
				    socket.emit('s2c_Baihoc',data1);
				   	//console.log(data1);
				});
		    });
			client.query(query, function(err, result) {
			    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
			    done(err);

			    if(err) {
			      return console.error('error running query', err);
			    }
			    var data1 = result.rows;
			    socket.emit('s2c_Baihoc',data1);
			   	//console.log(data1);
			});
		});

	});
	///show lists thong bao
	socket.on('c2s_Thongbao', function(data){// param{mon,lop,id_cauhoi}
		console.log("Thong bao");
		var id = "'"+data.id+"'";
		var tempDate="'"+"HH24:MI DD-MM-YYYY"+"'";
		pool.connect(function(err, client, done) {
		  	if(err) {
		    	return console.error('error fetching client from pool', err);
		  	}
		  	client.query("LISTEN realtimethongbao");

			client.on('notification', function(msg) {
		        console.log("realtime thongbao ");
				client.query('select *,to_char("THOIGIAN",'+ tempDate +'),"THONGBAO"."ID" as "ID_THONGBAO","THONGBAO"."LOP" as "LOP_CAUHOI" from "THONGBAO","USER" where "THONGBAO"."ID_KHACH"="USER"."ID" and "ID_USER"='+id+'order by "THONGBAO"."THOIGIAN" desc', function(err, result) {
				    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
				    done(err);

				    if(err) {
				      return console.error('error running query', err);
				    }
				    var data1 = result.rows;
				    socket.emit('s2c_Thongbao',data1);
				   	//console.log(data1);
				});
		    });
		  	client.query('select *,to_char("THOIGIAN",'+ tempDate +'),"THONGBAO"."ID" as "ID_THONGBAO","THONGBAO"."LOP" as "LOP_CAUHOI" from "THONGBAO","USER" where "THONGBAO"."ID_KHACH"="USER"."ID" and "ID_USER"='+id+'order by "THONGBAO"."THOIGIAN" desc', function(err, result) {
		    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
		    	done(err);

			    if(err) {
			      return console.error('error running query', err);
			    }
			    var data1 = result.rows;
			   	socket.emit('s2c_Thongbao',data1);
		  	});
		});
	});

});
app.post('/themBinhluan', function(req, res){	

	var id_cauhoi ="'"+JSON.parse(JSON.stringify(req.body.id_cauhoi))+"'";
	var maxid;
	var maxid2;
	var id_user="'"+JSON.parse(JSON.stringify(req.body.id))+"'";
	var noidung="'"+JSON.parse(JSON.stringify(req.body.noidung))+"'";
	var thoigian="'"+JSON.parse(JSON.stringify(req.body.thoigian))+"'";

	pool.connect(function(err, client, donedb) {
		if(err) {
	    	return console.error('error fetching client from pool', err);
		}	
	  	client.query('SELECT * FROM "BINHLUAN" order by cast("ID" as int) desc limit 1',
	  		function(err, result) {
	  			donedb(err);
			    if(err) {
			      return console.error('error running query', err);
			    }

			    if(result.rowCount==0)
			    	id=1;
			    else{
			    	maxid=parseInt(result.rows[0].ID);
			    	id=maxid+1;
				}

			    maxid="'"+id+"'";
		    	pool.connect(function(err, client, donedb) {
					if(err) {
				    	return console.error('error fetching client from pool', err);
					}	
				  	client.query('INSERT INTO "BINHLUAN" VALUES ('+maxid+','+
				  												id_cauhoi+','+
				  												id_user+','+
				  												noidung+','+
				  												0+','+
				  												thoigian+')',
				  		function(err, result) {
				  			donedb(err);
						    if(err) {
						      return console.error('error running query', err);
						    }
						    else{
						    	console.log("them xong");
						    	client.query('UPDATE "CAUHOI" SET "SOTRALOI" = ((Select "SOTRALOI" FROM "CAUHOI" where "ID"='+id_cauhoi+')+1) WHERE "ID" = '+id_cauhoi,
							  		function(err, result) {
							  			donedb(err);
									    if(err) {
									      return console.error('error running query', err);
									    }
									    else{
									    	client.query('SELECT * FROM "THONGBAO" order by cast("ID" as int) desc limit 1',
										  		function(err, result) {
										  			donedb(err);
												    if(err) {
												      return console.error('error running query', err);
												    }

												    if(result.rowCount==0)
												    	id2=1;
												    else{
												    	maxid2=parseInt(result.rows[0].ID);
												    	id2=maxid2+1;
													}

												    maxid2="'"+id2+"'";
											    	pool.connect(function(err, client, donedb) {
														if(err) {
													    	return console.error('error fetching client from pool', err);
														}
														client.query('select "ID_TACGIA" from "CAUHOI" where "ID"='+id_cauhoi,
													  		function(err, resulttg) {
													  			donedb(err);
															    if(err) {
															      return console.error('error running query', err);
															    }
															    else{
															    	console.log(resulttg.rows[0].ID_TACGIA)
															    	if(resulttg.rows[0].ID_TACGIA==JSON.parse(JSON.stringify(req.body.id))){
															    		res.end();
															    		return;
															    	}
															    	else{
	    															  	client.query('INSERT INTO "THONGBAO" VALUES ('+maxid2+','+
													  												'(select "ID_TACGIA" from "CAUHOI" where "ID"='+id_cauhoi+') ,'+
													  												thoigian+','+
													  												id_user+','+
													  												'(select "TIEUDE" from "CAUHOI" where "ID"='+id_cauhoi+') ,'+
													  												id_cauhoi+','+
													  												'(select "MON" from "CAUHOI" where "ID"='+id_cauhoi+') ,'+
													  												'(select "PHANLOP" from "CAUHOI" where "ID"='+id_cauhoi+') '+
													  												')',
																	  		function(err, result) {
																	  			donedb(err);
																			    if(err) {
																			      return console.error('error running query', err);
																			    }
																			    else{
																			    	res.end();
																			    	return;

																			    }
																  		});
															    	}

															    }
												  		});

												});
									  		});

									    }
							  	});

						    }
				  	});
				});
	  		});
	});

});
app.post('/themCauhoi', function(req, res){	

	var maxid;
	var id_user="'"+JSON.parse(JSON.stringify(req.body.id))+"'";
	var tieude="'"+JSON.parse(JSON.stringify(req.body.tieude))+"'";
	var noidung="'"+JSON.parse(JSON.stringify(req.body.noidung))+"'";
	var lop="'"+JSON.parse(JSON.stringify(req.body.lop))+"'";
	var thoigian="'"+JSON.parse(JSON.stringify(req.body.thoigian))+"'";
	var mon="'"+JSON.parse(JSON.stringify(req.body.mon))+"'";

	pool.connect(function(err, client, donedb) {
		if(err) {
	    	return console.error('error fetching client from pool', err);
		}	
	  	client.query('SELECT * FROM "CAUHOI" WHERE "MON" IS NOT NULL order by cast("ID" as int) desc limit 1',
	  		function(err, result) {
	  			donedb(err);
			    if(err) {
			      return console.error('error running query', err);
			    }
			    console.log("row count them cau hoi "+result.rowCount);
			    if(result.rowCount==0)
			    	id=1;
			    else{
			    	maxid=parseInt(result.rows[0].ID);
			    	id=maxid+1;
				}

			    maxid="'"+id+"'";
			  	client.query('INSERT INTO "CAUHOI" VALUES ('+maxid+','+
			  												tieude+','+
			  												id_user+','+
			  												lop+','+
			  												noidung+','+
			  												0+','+
			  												0+','+
			  												thoigian+','+
			  												mon+')',
			  		function(err, result) {
			  			donedb(err);
					    if(err) {
					      return console.error('error running query', err);
					    }
					    else{
			    		   	res.end();
			    		   	return;
					    }
			  	});
	  		}
	  	);
	});
});
app.post("/rate_cauhoi", function(req,res){

	var id="'"+JSON.parse(JSON.stringify(req.body.id_cauhoi))+"'";
	var checkType=JSON.parse(JSON.stringify(req.body.type));
	var type;
	if(checkType=="up_cauhoi"){
		type="+1";
	}
	else{
		type="-1";
	}
	pool.connect(function(err, client, done) {
	  if(err) {
	    return console.error('error fetching client from pool', err);
	  }
	  client.query('UPDATE "CAUHOI" set "DANHGIA"=((Select "DANHGIA" FROM "CAUHOI" where "ID"='+id+')'+type+') WHERE "ID"='+id
  		, function(err, result) {
	    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
	    done(err);

	    if(err) {
	      return console.error('error running query', err);
	    }
	   	res.end();
	  });
	});
});
app.post("/rate_binhluan", function(req,res){

	var id="'"+JSON.parse(JSON.stringify(req.body.id_binhluan))+"'";
	var checkType=JSON.parse(JSON.stringify(req.body.type));
	if(checkType=="icon-arrow-up22 text-success"){
		type="+1";
	}
	else{
		type="-1";
	}
	pool.connect(function(err, client, done) {
	  if(err) {
	    return console.error('error fetching client from pool', err);
	  }
	  client.query('UPDATE "BINHLUAN" set "MUCDANHGIA"=((Select "MUCDANHGIA" FROM "BINHLUAN" where "ID"='+id+')'+type+') WHERE "ID"='+id
  		, function(err, result) {
	    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
	    done(err);

	    if(err) {
	      return console.error('error running query', err);
	    }
	   	res.end();
	  });
	});
});

app.post("/delete_binhluan", function(req,res){

	var id="'"+JSON.parse(JSON.stringify(req.body.id_binhluan))+"'";
	var id_cauhoi="'"+JSON.parse(JSON.stringify(req.body.id_cauhoi))+"'";

	pool.connect(function(err, client, done) {
	  if(err) {
	    return console.error('error fetching client from pool', err);
	  }
	  client.query('DELETE FROM "BINHLUAN" WHERE "ID"='+id
  		, function(err, result) {
	    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
	    done(err);

	    if(err) {
	      return console.error('error running query', err);
	    }
	    client.query('UPDATE "CAUHOI" SET "SOTRALOI" = ((Select "SOTRALOI" FROM "CAUHOI" where "ID"='+id_cauhoi+')-1) WHERE "ID" = '+id_cauhoi,
	  		function(err, result) {
	  			done(err);
			    if(err) {
			      return console.error('error running query', err);
			    }
			    else{
			    	res.end();
			    	return;
			    }
	  	});
	   	
	  });
	});
});
app.post("/delete_cauhoi", function(req,res){

	var id_cauhoi="'"+JSON.parse(JSON.stringify(req.body.id_cauhoi))+"'";

	pool.connect(function(err, client, done) {
	  	if(err) {
	    	return console.error('error fetching client from pool', err);
	  	}
	  
	  	client.query('DELETE FROM "BINHLUAN" WHERE "ID_CAUHOI"='+id_cauhoi
  		, function(err, result) {
	    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
	    done(err);

	    if(err) {
	      return console.error('error running query', err);
	    }
	    client.query('DELETE FROM "CAUHOI" WHERE "ID"='+id_cauhoi,
	  		function(err, result) {
	  			done(err);
			    if(err) {
			      return console.error('error running query', err);
			    }
			    else{
			    	res.end();
			    	return;
			    }
	  	});
	   	
	  });
	});
});
app.post("/delete_user", function(req,res){

	var id="'"+JSON.parse(JSON.stringify(req.body.id))+"'";

	pool.connect(function(err, client, done) {
	  if(err) {
	    return console.error('error fetching client from pool', err);
	  }
	  client.query('DELETE FROM "USER" WHERE "ID"='+id
  		, function(err, result) {
	    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
	    done(err);

	    if(err) {
	      return console.error('error running query', err);
	    }
	   //  client.query('UPDATE "CAUHOI" SET "SOTRALOI" = ((Select "SOTRALOI" FROM "CAUHOI" where "ID"='+id_cauhoi+')-1) WHERE "ID" = '+id_cauhoi,
	  	// 	function(err, result) {
	  	// 		done(err);
			 //    if(err) {
			 //      return console.error('error running query', err);
			 //    }
			 //    else{
			 //    	res.end();
			 //    	return;
			 //    }
	  	// });
	   	res.end();
    	return;
	  });
	});
});
///chuyen hoc sinht hanh giao vien
app.post("/chuyen_user", function(req,res){

	var id="'"+JSON.parse(JSON.stringify(req.body.id))+"'";

	pool.connect(function(err, client, done) {
	  if(err) {
	    return console.error('error fetching client from pool', err);
	  }
	  client.query('UPDATE "USER" SET "LOAINGUOIDUNG"='+"'"+'trogiang'+"'"+' WHERE "ID"='+id
  		, function(err, result) {
	    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
	    done(err);

	    if(err) {
	      return console.error('error running query', err);
	    }
	   	res.end();
    	return;
	  });
	});
});
///get list student/sup
app.post("/list_user/type:type", function(req,res){
	var tempDate="'"+"DD-MM-YYYY"+"'";
	var type ="'"+ req.params.type+"'";
	var querySql;
	if(type!="all"){

	}
	pool.connect(function(err, client, done) {
	  	if(err) {
	    	return console.error('error fetching client from pool', err);
	  	}
	  
	  	client.query('select *,to_char("NGAYSINH",'+ tempDate+') from "USER" WHERE "LOAINGUOIDUNG"='+type
  		, function(err, result) {
	    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
	    done(err);

	    if(err) {
	      return console.error('error running query', err);
	    }
	   	res.send(result.rows);
	  });
	});
});

///get bai hoc tip :mon :lop
app.post("/:mon/lop:lop/baihoc_tip", function(req,res){
	var tempDate="'"+"HH24:MI DD-MM-YYYY"+"'";
	var mon ="'"+ req.params.mon+"'";
	var lop ="'"+ req.params.lop+"'";
	pool.connect(function(err, client, done) {
	  	if(err) {
	    	return console.error('error fetching client from pool', err);
	  	}	  
	  	client.query('select *,"BAIHOC_TIP"."LOP" as "PHANLOP",to_char("NGAY",'+ tempDate+') from "BAIHOC_TIP", "USER" WHERE "BAIHOC_TIP"."ID_TACGIA"="USER"."ID" and "MON"='+mon+' and "BAIHOC_TIP"."LOP"='+lop+' order by cast("BAI" as int) asc'
  		, function(err, result) {
	    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
	    done(err);

	    if(err) {
	      return console.error('error running query', err);
	    }
	   	res.send(result.rows);
	  });
	});
})

///get bai hoc video :mon :lop :bai
app.post("/:mon/lop:lop/baihoc_video/:bai", function(req,res){
	var tempDate="'"+"HH24:MI DD-MM-YYYY"+"'";
	var mon ="'"+ req.params.mon+"'";
	var lop ="'"+ req.params.lop+"'";
	var bai ="'"+ req.params.bai+"'";
	pool.connect(function(err, client, done) {
	  	if(err) {
	    	return console.error('error fetching client from pool', err);
	  	}	  
	  	client.query('select *,"VIDEO"."LOP" as "PHANLOP","VIDEO"."ID" as "ID_VIDEO",to_char("THOIGIAN",'+ tempDate+') from "VIDEO", "USER" WHERE "VIDEO"."ID_TACGIA"="USER"."ID" and "MON"='+mon+' and "VIDEO"."LOP"='+lop+' and "VIDEO"."ID_BAIHOC"='+bai+' order by cast("ID_BAIHOC" as int) asc'
  		, function(err, result) {
	    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
	    done(err);

	    if(err) {
	      return console.error('error running query', err);
	    }
	   	res.send(result.rows);
	  });
	});
})
///get bai hoc video :mon :lop :bai :id video
app.post("/:mon/lop:lop/baihoc_video_chitiet/:bai/:video", function(req,res){
	var tempDate="'"+"HH24:MI DD-MM-YYYY"+"'";
	var mon ="'"+ req.params.mon+"'";
	var lop ="'"+ req.params.lop+"'";
	var bai ="'"+ req.params.bai+"'";
	var video ="'"+ req.params.video+"'";

	pool.connect(function(err, client, done) {
	  	if(err) {
	    	return console.error('error fetching client from pool', err);
	  	}	  
	  	client.query('select *,"VIDEO"."LOP" as "PHANLOP","VIDEO"."ID" as "ID_VIDEO",to_char("THOIGIAN",'+ tempDate+') from "VIDEO", "USER" WHERE "VIDEO"."ID_TACGIA"="USER"."ID" and "MON"='+mon+' and "VIDEO"."LOP"='+lop+' and "VIDEO"."ID_BAIHOC"='+bai+'and "VIDEO"."ID"='+video+' order by cast("ID_BAIHOC" as int) asc'
  		, function(err, result) {
	    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
	    done(err);

	    if(err) {
	      return console.error('error running query', err);
	    }
	   	res.send(result.rows);
	  });
	});
})
///get bai tap trac nghiem va dap an
app.post("/:mon/lop:lop/baitap_tracnghiem_chitiet_cauhoi/:id", function(req,res){
	var tempDate="'"+"HH24:MI DD-MM-YYYY"+"'";
	var mon ="'"+ req.params.mon+"'";
	var lop ="'"+ req.params.lop+"'";
	var id ="'"+ req.params.id+"'";
	var loai ="'"+ req.body.loai+"'";

	pool.connect(function(err, client, done) {
	  	if(err) {
	    	return console.error('error fetching client from pool', err);
	  	}	  
	  	client.query('select *,"TRACNGHIEM"."ID" as "ID_TRACNGHIEM" from "TRACNGHIEM","BAIHOC" WHERE "ID_BAIHOC"='+id+' and "ID_BAIHOC"="BAIHOC"."ID" and "LOAI"='+loai
  		, function(err, result) {
	    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
	    done(err);

	    if(err) {
	      return console.error('error running query', err);
	    }
	   	res.send(result.rows);
	  });
	});
})
app.post("/:mon/lop:lop/baithi/:id", function(req,res){
	var mon ="'"+ req.params.mon+"'";
	var lop ="'"+ req.params.lop+"'";
	var id ="'"+ req.params.id+"'";
	pool.connect(function(err, client, done) {
	  	if(err) {
	    	return console.error('error fetching client from pool', err);
	  	}	  
	  	client.query('select * from "TRACNGHIEM" where "MON"='+mon+' and "LOP"='+lop+' ORDER BY RANDOM() LIMIT 20'
  		, function(err, result) {
	    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
	    done(err);

	    if(err) {
	      return console.error('error running query', err);
	    }
	   	res.send(result.rows);
	  });
	});
})
app.post("/getDapan", function(req,res){
	var id ="'"+ req.body.id+"'";

	pool.connect(function(err, client, done) {
	  	if(err) {
	    	return console.error('error fetching client from pool', err);
	  	}	  
	  	client.query('select * from "DAPAN_TRACNGHIEM" WHERE "ID_TRACNGHIEM"='+id
  		, function(err, result) {
	    done(err);

	    if(err) {
	      return console.error('error running query', err);
	    }

	   	res.send(result.rows);
	  });
	});
})
///thay doi bai hoc hien tai
app.post("/quaBai", function(req,res){
	var id ="'"+ req.body.id_user+"'";
	var mon = req.body.mon;
	console.log(id+mon);
	if(mon=="lichsu"){
		pool.connect(function(err, client, done) {
		  	if(err) {
		    return console.error('error fetching client from pool', err);
		  	}
		  	client.query('UPDATE "USER" set "BAI_LICHSU"=(cast((Select "BAI_LICHSU" FROM "USER" where "ID"='+id+') as int)+1) WHERE "ID"='+id
	  		, function(err, result) {
		    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
		    done(err);

		    if(err) {
		      return console.error('error running query', err);
		    }
		   	res.end();
		  });
		});
	}
	else{
		pool.connect(function(err, client, done) {
		  	if(err) {
		    return console.error('error fetching client from pool', err);
		  	}
		  	client.query('UPDATE "USER" set "BAI_DIALI"=(cast((Select "BAI_DIALI" FROM "USER" where "ID"='+id+') as int)+1) WHERE "ID"='+id
	  		, function(err, result) {
		    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
		    done(err);

		    if(err) {
		      return console.error('error running query', err);
		    }
		   	res.end();
		  });
		});
	}

})
/// them tieu de bai hoc moi
app.post('/themBaihoc', function(req, res){	

	var maxid;
	var id_user="'"+JSON.parse(JSON.stringify(req.body.id))+"'";
	var tieude="'"+JSON.parse(JSON.stringify(req.body.tieude))+"'";
	var bai="'"+JSON.parse(JSON.stringify(req.body.bai))+"'";
	var sotrang="'"+JSON.parse(JSON.stringify(req.body.sotrang))+"'";
	var lop="'"+JSON.parse(JSON.stringify(req.body.lop))+"'";
	var thoigian="'"+JSON.parse(JSON.stringify(req.body.thoigian))+"'";
	var mon="'"+JSON.parse(JSON.stringify(req.body.mon))+"'";

	var id_cauhoi="'"+JSON.parse(JSON.stringify(req.body.mon))+JSON.parse(JSON.stringify(req.body.lop))+JSON.parse(JSON.stringify(req.body.bai))+"'";
	pool.connect(function(err, client, donedb) {
		if(err) {
	    	return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * FROM "BAIHOC" where "MON"='+mon+' and "PHANLOP"='+lop+' and "BAI"='+bai,
	  		function(err, result) {
	  			donedb(err);
			    if(err || result.rowCount!=0) {
			      return console.error('error running query', err);
			    }
			    else{
		   		  	client.query('SELECT * FROM "BAIHOC" order by cast("ID" as int) desc limit 1',
				  		function(err, result) {
				  			donedb(err);
						    if(err) {
						      return console.error('error running query', err);
						    }

						    if(result.rowCount==0)
						    	id=1;
						    else{
						    	maxid=parseInt(result.rows[0].ID);
						    	id=maxid+1;
							}
						    maxid="'"+id+"'";
						  	client.query('INSERT INTO "BAIHOC" VALUES ('+maxid+','+
						  												id_user+','+
						  												lop+','+
						  												0+','+
						  												mon+','+
						  												bai+','+
						  												tieude+','+
						  												thoigian+','+
						  												sotrang+')',
						  		function(err, result) {
						  			donedb(err);
								    if(err) {
								      return console.error('error running query', err);
								    }
								    else{
						    		   	client.query('INSERT INTO "CAUHOI" VALUES ('+id_cauhoi+')',
									  		function(err, result) {
									  			donedb(err);
											    if(err) {
											      return console.error('error running query', err);
											    }
											    else{
									    		   	res.end();
									    		   	return;
											    }
									  	});
								    }
						  	});
				  		}
				  	);
			    }
	  	});	
	});
});
//xoa bai hoc
app.post("/delete_baihoc", function(req,res){

	var id_baihoc="'"+JSON.parse(JSON.stringify(req.body.id_baihoc))+"'";

	pool.connect(function(err, client, done) {
	  	if(err) {
	    	return console.error('error fetching client from pool', err);
	  	}
	  
	  	client.query('DELETE FROM "CAUHOI" WHERE "ID"= CONCAT((select cast("MON" as varchar(20)) from "BAIHOC" WHERE "ID"='+id_baihoc+'),(select cast("PHANLOP" as varchar(20)) from "BAIHOC" WHERE "ID"='+id_baihoc+'),(select cast("BAI" as varchar(20)) from "BAIHOC" WHERE "ID"='+id_baihoc+'))'
  		, function(err, result) {
	    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
	    done(err);

	    if(err) {
	      return console.error('error running query', err);
	    }
	    client.query('DELETE FROM "BAIHOC" WHERE "ID"='+id_baihoc,
	  		function(err, result) {
	  			done(err);
			    if(err) {
			      return console.error('error running query', err);
			    }
			    else{
			    	res.end();
			    	return;
			    }
	  	});
	   	
	  });
	});
});
/// them video bai hoc moi
app.post('/themVideo', function(req, res){	

	var maxid;
	var id_user="'"+JSON.parse(JSON.stringify(req.body.id))+"'";
	var tieude="'"+JSON.parse(JSON.stringify(req.body.tieude))+"'";
	var noidung="'"+JSON.parse(JSON.stringify(req.body.noidung))+"'";
	var link="'"+JSON.parse(JSON.stringify(req.body.link))+"'";
	var bai="'"+JSON.parse(JSON.stringify(req.body.bai))+"'";
	var lop="'"+JSON.parse(JSON.stringify(req.body.lop))+"'";
	var thoigian="'"+JSON.parse(JSON.stringify(req.body.thoigian))+"'";
	var mon="'"+JSON.parse(JSON.stringify(req.body.mon))+"'";

	pool.connect(function(err, client, donedb) {
		if(err) {
	    	return console.error('error fetching client from pool', err);
		}	
	  	client.query('SELECT * FROM "VIDEO" order by cast("ID" as int) desc limit 1',
	  		function(err, result) {
	  			donedb(err);
			    if(err) {
			      return console.error('error running query', err);
			    }

			    maxid=parseInt(result.rows[0].ID);
			    id=maxid+1;

			    maxid="'"+id+"'";
			  	client.query('INSERT INTO "VIDEO" VALUES ('+maxid+','+
			  												bai+','+
			  												tieude+','+
			  												noidung+','+
			  												link+','+
			  												thoigian+','+
			  												mon+','+
			  												lop+','+
			  												id_user+')',
			  		function(err, result) {
			  			donedb(err);
					    if(err) {
					      return console.error('error running query', err);
					    }
					    else{
					    	var mon1;
					    	if(mon=="lichsu")
					    		mon1="ls";
					    	else
					    		mon1="dl"
					    	var id_cauhoi="'"+"v"+mon1+id+"'";
			    		   	client.query('INSERT INTO "CAUHOI" VALUES ('+id_cauhoi+')',
						  		function(err, result) {
						  			donedb(err);
								    if(err) {
								      return console.error('error running query', err);
								    }
								    else{
						    		   	res.end();
						    		   	return;
								    }
						  	});
					    }
			  	});
	  		}
	  	);
	});
});
//xoa video
app.post("/delete_video", function(req,res){

	var id_video="'"+JSON.parse(JSON.stringify(req.body.id_video))+"'";
	var mon="'"+JSON.parse(JSON.stringify(req.body.mon))+"'";
	var mon1;
	if(mon=="lichsu")
		mon1="ls";
	else
		mon1="dl"
	var id_cauhoi="'"+"v"+mon1+id+"'";
	pool.connect(function(err, client, done) {
	  	if(err) {
	    	return console.error('error fetching client from pool', err);
	  	}
	  
	   	client.query('DELETE FROM "CAUHOI" WHERE "ID"='+id_cauhoi,
	  		function(err, result) {
	  			done(err);
			    if(err) {
			      return console.error('error running query', err);
			    }
	    	    client.query('DELETE FROM "VIDEO" WHERE "ID"='+id_video,
			  		function(err, result) {
			  			done(err);
					    if(err) {
					      return console.error('error running query', err);
					    }
					    else{
					    	res.end();
					    	return;
					    }
			  	});
	  	});
	});
});
/// them bài tap trac nghiem va dapan
app.post('/themTracnghiem', function(req, res){	
	var maxid,maxid1,maxid2,maxid3,maxid4;
	var noidung="'"+JSON.parse(JSON.stringify(req.body.noidung))+"'";
	var cau1="'"+JSON.parse(JSON.stringify(req.body.cau1))+"'";
	var cau2="'"+JSON.parse(JSON.stringify(req.body.cau2))+"'";
	var cau3="'"+JSON.parse(JSON.stringify(req.body.cau3))+"'";
	var cau4="'"+JSON.parse(JSON.stringify(req.body.cau4))+"'";
	var da1="'"+JSON.parse(JSON.stringify(req.body.da1))+"'";
	var da2="'"+JSON.parse(JSON.stringify(req.body.da2))+"'";
	var da3="'"+JSON.parse(JSON.stringify(req.body.da3))+"'";
	var da4="'"+JSON.parse(JSON.stringify(req.body.da4))+"'";
	var id="'"+JSON.parse(JSON.stringify(req.body.id))+"'";
	var lop="'"+JSON.parse(JSON.stringify(req.body.lop))+"'";
	var bai="'"+JSON.parse(JSON.stringify(req.body.bai))+"'";
	var mon="'"+JSON.parse(JSON.stringify(req.body.mon))+"'";
	var loai="'"+JSON.parse(JSON.stringify(req.body.loai))+"'";
	var link_anh="'"+JSON.parse(JSON.stringify(req.body.link_anh))+"'";
	pool.connect(function(err, client, donedb) {
		if(err) {
	    	return console.error('error fetching client from pool', err);
		}	
	  	client.query('SELECT * FROM "TRACNGHIEM" order by cast("ID" as int) desc limit 1',
	  		function(err, result) {
	  			donedb(err);
			    if(err) {
			      return console.error('error running query', err);
			    }

			   	if(result.rowCount==0)
			    	id1=1;
			    else{
			    	maxid=parseInt(result.rows[0].ID);
			    	id1=maxid+1;
				}

			    maxid="'"+id1+"'";
			    console.log(maxid);
			  	client.query('INSERT INTO "TRACNGHIEM" VALUES ('+maxid+','+
			  												bai+','+
			  												mon+','+
			  												lop+','+
			  												noidung+','+
			  												loai+','+
			  												link_anh+')',
			  		function(err, result) {
			  			donedb(err);
					    if(err) {
					      return console.error('error running query', err);
					    }
					    else{
					    	//them dapan
					    	client.query('SELECT * FROM "DAPAN_TRACNGHIEM" order by cast("ID" as int) desc limit 1',
					  		function(err, result) {
					  			donedb(err);
							    if(err) {
							      return console.error('error running query', err);
							    }

							    maxid1=parseInt(result.rows[0].ID);
							    console.log(maxid1);
							    var id2=maxid1+1;

							    maxid1="'"+id2+"'";
							    console.log(maxid1);
							  	client.query('INSERT INTO "DAPAN_TRACNGHIEM" VALUES ('+maxid1+','+
							  												maxid+','+
							  												cau1+','+
							  												da1+')',function(){return;});
							  	var id3=id2+1;
							  	maxid2="'"+id3+"'";
							  	client.query('INSERT INTO "DAPAN_TRACNGHIEM" VALUES ('+maxid2+','+
							  												maxid+','+
							  												cau2+','+
							  												da2+')',function(){return;});
							  	var id4=id3+1;
							  	maxid3="'"+id4+"'";
							  	client.query('INSERT INTO "DAPAN_TRACNGHIEM" VALUES ('+maxid3+','+
							  												maxid+','+
							  												cau3+','+
							  												da3+')',function(){return;});
							  	var id5=id4+1;
							  	maxid4="'"+id5+"'";
							  	client.query('INSERT INTO "DAPAN_TRACNGHIEM" VALUES ('+maxid4+','+
							  												maxid+','+
							  												cau4+','+
							  												da4+')',function(){return;});
						  		}
						  	);
					    	if(JSON.parse(JSON.stringify(req.body.loai))=="kiemtra"){
					    		client.query('UPDATE "BAIHOC" SET "BAITHI" = '+"'"+1+"'"+' WHERE "MON"='+mon+' and "PHANLOP"='+lop+' and "BAI" ='+bai,
							  		function(err, result) {
							  			donedb(err);
									    if(err) {
									      return console.error('error running query', err);
									    }
									    else{
									    	console.log("them xong");
									    	res.end();
									    	return;
									    }
							  	});
					    	}
					    	else{
					    		res.end();
						    	return;
					    	}
					    }
			  	});
	  		}
	  	);
	});
});
/// them bài tap trac nghiem va dapan cho bai kiem tra
app.post('/themTracnghiemKiemtra', function(req, res){	
	var obj = JSON.parse(req.body.list);

	console.log(obj.length);
	var processItems = function(i){
	  if( i < obj.length ) {
	  	console.log(i);
  	    var maxid,maxid1,maxid2,maxid3,maxid4;
		var noidung="'"+JSON.parse(JSON.stringify(obj[i].noidung))+"'";
		var cau1="'"+JSON.parse(JSON.stringify(obj[i].cau1))+"'";
		var cau2="'"+JSON.parse(JSON.stringify(obj[i].cau2))+"'";
		var cau3="'"+JSON.parse(JSON.stringify(obj[i].cau3))+"'";
		var cau4="'"+JSON.parse(JSON.stringify(obj[i].cau4))+"'";
		var da1="'"+JSON.parse(JSON.stringify(obj[i].da1))+"'";
		var da2="'"+JSON.parse(JSON.stringify(obj[i].da2))+"'";
		var da3="'"+JSON.parse(JSON.stringify(obj[i].da3))+"'";
		var da4="'"+JSON.parse(JSON.stringify(obj[i].da4))+"'";
		var id="'"+JSON.parse(JSON.stringify(obj[i].id))+"'";
		var lop="'"+JSON.parse(JSON.stringify(obj[i].lop))+"'";
		var bai="'"+JSON.parse(JSON.stringify(obj[i].bai))+"'";
		var mon="'"+JSON.parse(JSON.stringify(obj[i].mon))+"'";
		var loai="'"+JSON.parse(JSON.stringify(obj[i].loai))+"'";
		var link_anh="'"+JSON.parse(JSON.stringify(obj[i].link_anh))+"'";
		pool.connect(function(err, client, donedb) {
			if(err) {
		    	return console.error('error fetching client from pool', err);
			}	
		  	client.query('SELECT * FROM "TRACNGHIEM" order by cast("ID" as int) desc limit 1',
		  		function(err, result) {
		  			donedb(err);
				    if(err) {
				      return console.error('error running query', err);
				    }

				   	if(result.rowCount==0)
				    	id1=1;
				    else{
				    	maxid=parseInt(result.rows[0].ID);
				    	id1=maxid+1;
					}

				    maxid="'"+id1+"'";
				    console.log(maxid);
				  	client.query('INSERT INTO "TRACNGHIEM" VALUES ('+maxid+','+
				  												bai+','+
				  												mon+','+
				  												lop+','+
				  												noidung+','+
				  												loai+','+
				  												link_anh+')',
				  		function(err, result) {
				  			donedb(err);
						    if(err) {
						      return console.error('error running query', err);
						    }
						    else{
						    	//them dapan
						    	client.query('SELECT * FROM "DAPAN_TRACNGHIEM" order by cast("ID" as int) desc limit 1',
						  		function(err, result) {
						  			donedb(err);
								    if(err) {
								      return console.error('error running query', err);
								    }

								    maxid1=parseInt(result.rows[0].ID);
								    console.log(maxid1);
								    var id2=maxid1+1;

								    maxid1="'"+id2+"'";
								    console.log(maxid1);
								  	client.query('INSERT INTO "DAPAN_TRACNGHIEM" VALUES ('+maxid1+','+
								  												maxid+','+
								  												cau1+','+
								  												da1+')',function(){return;});
								  	var id3=id2+1;
								  	maxid2="'"+id3+"'";
								  	client.query('INSERT INTO "DAPAN_TRACNGHIEM" VALUES ('+maxid2+','+
								  												maxid+','+
								  												cau2+','+
								  												da2+')',function(){return;});
								  	var id4=id3+1;
								  	maxid3="'"+id4+"'";
								  	client.query('INSERT INTO "DAPAN_TRACNGHIEM" VALUES ('+maxid3+','+
								  												maxid+','+
								  												cau3+','+
								  												da3+')',function(){return;});
								  	var id5=id4+1;
								  	maxid4="'"+id5+"'";
								  	client.query('INSERT INTO "DAPAN_TRACNGHIEM" VALUES ('+maxid4+','+
								  												maxid+','+
								  												cau4+','+
								  												da4+')',function(){return;});
							  		}
							  	);
						    	client.query('UPDATE "BAIHOC" SET "BAITHI" = '+"'"+1+"'"+' WHERE "MON"='+mon+' and "PHANLOP"='+lop+' and "BAI" ='+bai,
							  		function(err, result) {
							  			donedb(err);
									    if(err) {
									      return console.error('error running query', err);
									    }
									    else{
									    	console.log("them xong");
						    		    	processItems(i+1);
									    	return;
									    }
							  	});
						    }
					  	});
			  		}
			  	);
			});
	  	}
	};
	processItems(0);
  	res.send(true);
});
app.post("/deleteKiemtra", function(req,res){

	var lop="'"+JSON.parse(JSON.stringify(req.body.lop))+"'";
	var bai="'"+JSON.parse(JSON.stringify(req.body.bai))+"'";
	var mon="'"+JSON.parse(JSON.stringify(req.body.mon))+"'";

	pool.connect(function(err, client, done) {
		if(err) {
		    return console.error('error fetching client from pool', err);
		}
	  	client.query('DELETE FROM "DAPAN_TRACNGHIEM" WHERE "ID_TRACNGHIEM" in (select "ID" FROM "TRACNGHIEM" WHERE "MON"='+mon+' and "LOP"='+lop+' and "ID_BAIHOC"='+bai+' and "LOAI"='+"'"+'kiemtra'+"'"+')'
	  		, function(err, result) {
		    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
		    done(err);

		    if(err) {
		      return console.error('error running query1', err);
		    }
	    	client.query('DELETE FROM "TRACNGHIEM" WHERE "MON"='+mon+' and "LOP"='+lop+' and "ID_BAIHOC"='+bai+' and "LOAI"='+"'"+'kiemtra'+"'"
		  		, function(err, result) {
			    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
			    done(err);

			    if(err) {
			      return console.error('error running query2', err);
			    }

			    client.query('UPDATE "BAIHOC" SET "BAITHI" = '+"'"+0+"'"+' WHERE "MON"='+mon+' and "PHANLOP"='+lop+' and "BAI" ='+bai,
			  		function(err, result) {
			  			done(err);
					    if(err) {
					      return console.error('error running query3', err);
					    }
					    else{
		    		    	res.end();
					    	return;
					    }
			  	});
			   	
		  	});
			   //  client.query('UPDATE "BAIHOC" SET "BAITHI" = '+"'"+0+"'"+' WHERE "MON"='+mon+' and "PHANLOP"='+lop+' and "BAI" ='+bai,
			  	// 	function(err, result) {
			  	// 		done(err);
					 //    if(err) {
					 //      return console.error('error running query', err);
					 //    }
					 //    else{
		    // 		    	res.end();
					 //    	return;
					 //    }
			  	// });
	   	
	  	});
	});
});
/// check xem nguoi dung co hoang thanh het bai kiem tra chua
app.post("/checkBaithi", function(req,res){
	var so1, so2;
	var id="'"+JSON.parse(JSON.stringify(req.body.id))+"'";
	var mon="'"+JSON.parse(JSON.stringify(req.body.mon))+"'";
	var lop="'"+JSON.parse(JSON.stringify(req.body.lop))+"'";
	pool.connect(function(err, client, done) {
		if(err) {
		    return console.error('error fetching client from pool', err);
		}
	  	client.query('select "ID" FROM "KETQUAHOCTAP" WHERE "MON"='+mon+' and "LOP"='+lop+' and "ID_USER"='+id
	  		, function(err, result) {
		    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
		    done(err);

		    if(err) {
		      return console.error('error running query1', err);
		    }
		    so1=result.rowCount;
	    	client.query('select "ID_BAIHOC" FROM "TRACNGHIEM" WHERE "MON"='+mon+' and "LOP"='+lop+' and  "LOAI"='+"'"+'kiemtra'+"'"+'GROUP BY "ID_BAIHOC"'
		  		, function(err, result1) {
			    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
			    done(err);
			    if(err) {
			      return console.error('error running query2', err);
			    }
			    so2=result1.rowCount;
			    if(so1==so2)
			    	res.send(true);
			    else
			    	res.send(false);
				return;
			   	
		  	});
			   //  client.query('UPDATE "BAIHOC" SET "BAITHI" = '+"'"+0+"'"+' WHERE "MON"='+mon+' and "PHANLOP"='+lop+' and "BAI" ='+bai,
			  	// 	function(err, result) {
			  	// 		done(err);
					 //    if(err) {
					 //      return console.error('error running query', err);
					 //    }
					 //    else{
		    // 		    	res.end();
					 //    	return;
					 //    }
			  	// });
	   	
	  	});
	});
});
/// them ket qua hoc tap
app.post('/themKetquahoctap', function(req, res){	

	var maxid;
	var id_user="'"+JSON.parse(JSON.stringify(req.body.id))+"'";
	var diem="'"+JSON.parse(JSON.stringify(req.body.diem))+"'";
	var heso="'"+JSON.parse(JSON.stringify(req.body.heso))+"'";
	var lop="'"+JSON.parse(JSON.stringify(req.body.lop))+"'";
	var thoigian="'"+JSON.parse(JSON.stringify(req.body.thoigian))+"'";
	var mon="'"+JSON.parse(JSON.stringify(req.body.mon))+"'";
	var bai="'"+JSON.parse(JSON.stringify(req.body.bai))+"'";

	pool.connect(function(err, client, donedb) {
		if(err) {
	    	return console.error('error fetching client from pool', err);
		}	
		client.query('SELECT * FROM "KETQUAHOCTAP" where "MON"='+mon+' and "LOP"='+lop+' and "ID_BAIHOC"='+bai+' and "ID_USER"='+id_user,
	  		function(err, result) {
	  			donedb(err);
			    if(err) {
			      return console.error('error running query', err);
			    }
			    console.log(result.rowCount);
			    if(result.rowCount!=0){
			    	res.send(true);
			    }
			    else{
	    		  	client.query('SELECT * FROM "KETQUAHOCTAP" order by cast("ID" as int) desc limit 1',
				  		function(err, result) {
				  			donedb(err);
						    if(err) {
						      return console.error('error running query', err);
						    }

						    console.log(result.rowCount);
						    if(result.rowCount==0)
						    	id=1;
						    else{
						    	maxid=parseInt(result.rows[0].ID);
						    	id=maxid+1;
							}
						    maxid="'"+id+"'";
						  	client.query('INSERT INTO "KETQUAHOCTAP" VALUES ('+maxid+','+
						  												id_user+','+
						  												mon+','+
						  												lop+','+
						  												heso+','+
						  												diem+','+
						  												bai+','+
						  												thoigian+')',
						  		function(err, result) {
						  			donedb(err);
								    if(err) {
								      return console.error('error running query', err);
								    }
								    else{
								    	res.end();
						    		   	return;
								    }
						  	});
				  		}
				  	);
				}

		});
	});
});

///up file
app.post('/uploadAnh',function(req,res){

  var file_name=req.body.file_name;
  if(req.files.upfile){
    var file = req.files.upfile,
      name = file.name,
      type = file.mimetype;
    var uploadpath = __dirname + '/public/assets/images/user/' + 'user_'+file_name+'.jpg';
    file.mv(uploadpath,function(err){
      if(err){
        console.log("File Upload Failed",name,err);
        res.redirect("/#/trangcanhan/caidat");
      }
      else {
        console.log("File Uploaded",name);
        res.redirect("/#/trangcanhan/caidat");
        zip.unzip({
          source: __dirname + '/uploads/' + name,
          destination: __dirname + '/extracted/'
        }).exec({
          error: function (err) {
            console.log(err);
          },
          success: function () {
            console.log("extracted successfully");
          }
        })
      }
    });
  }
  else {
    res.send("No File selected !");
    res.end();
  };
})
///up anh cau hoi
app.post('/uploadCauhoi',function(req,res){
	console.log("link anh cau hoi "+req.body.file_name);
  var file_name=req.body.file_name;
  if(req.files.upfile){
    var file = req.files.upfile,
      name = file.name,
      type = file.mimetype;
    var uploadpath = __dirname + '/public/assets/images/cauhoi/' + file_name+'.jpg';
    file.mv(uploadpath,function(err){
      if(err){
        console.log("File Upload Failed",name,err);
        res.redirect("/#/");
      }
      else {
        console.log("File Uploaded",name);
        res.redirect("/#/");
        zip.unzip({
          source: __dirname + '/uploads/' + name,
          destination: __dirname + '/extracted/'
        }).exec({
          error: function (err) {
            console.log(err);
          },
          success: function () {
            console.log("extracted successfully");
          }
        })
      }
    });
  }
  else {
    res.send("No File selected !");
    res.end();
  };
})
///up sgk
app.post('/uploadSGK', function(req, res) {
    console.log(req.files);
    if (req.files.upfile) {
        var file = req.files.upfile,
            name = file.name,
            type = file.mimetype;
        var uploadpath = __dirname + '/uploads/' + name;

        var extension = name.split('.').pop();

        file.mv(uploadpath, function(err) {
            if (err) {
                console.log("File Upload Failed", name, err);
                res.send("Error Occured!")
            } else {
              if (extension !== 'zip') {
                console.log("Invalid file type. Cannot upload");
                res.send('This file is not a .zip file')
              }
              else {
                console.log("File Uploaded : ", name);
                
                res.redirect("/");
                zip.unzip({
                    source: __dirname + '/uploads/' + name,
                    destination: __dirname +'/public/sgk/'
                }).exec({
                    error: function(err) {
                        console.log(err);
                    },
                    success: function() {
                        console.log("extracted successfully");
                    }
                })
              }  
            }
        });
    } else {
        res.send("No File selected !");
        res.end();
    };
})
/// lay su kien lich su
app.post('/dongsukien', function(req, res){
	var tempDate="'"+"YYYY-MM-DD"+"'";
	var tempDate1="'"+"DD/MM/YYYY"+"'";
	var tempDate2="'"+"YYYY"+"'";
	pool.connect(function(err, client, donedb) {
		if(err) {
	    	return console.error('error fetching client from pool', err);
		}
	  	client.query('select *, to_char("THOIGIAN",'+ tempDate+') as "START", to_char("END",'+ tempDate+') as "END", to_char("THOIGIAN",'+ tempDate1+') as "DATE", to_char("THOIGIAN",'+ tempDate2+') as "DATE_START", to_char("END",'+ tempDate2+') as "DATE_END" from "SUKIEN"', function(err, result) {
		    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
		    donedb(err);
		    
		    if(err) {
		      return console.error('error running query', err);
		    }
		    res.send(result.rows);
	  });
	});
});
app.post('/themsukien', function(req, res){
	var id_user="'"+JSON.parse(JSON.stringify(req.body.id))+"'";
	var thoigian="'"+JSON.parse(JSON.stringify(req.body.thoigian))+"'";
	var thoigian_end="'"+JSON.parse(JSON.stringify(req.body.thoigian_end))+"'";
	var tieude="'"+JSON.parse(JSON.stringify(req.body.tieude))+"'";
	var noidung="'"+JSON.parse(JSON.stringify(req.body.noidung))+"'";
	pool.connect(function(err, client, donedb) {
		if(err) {
	    	return console.error('error fetching client from pool', err);
		}	
	  	client.query('SELECT * FROM "SUKIEN" order by cast("ID" as int) desc limit 1',
	  		function(err, result) {
	  			donedb(err);
			    if(err) {
			      return console.error('error running query', err);
			    }

			    console.log(result.rowCount);
			    if(result.rowCount==0)
			    	id=1;
			    else{
			    	maxid=parseInt(result.rows[0].ID);
			    	id=maxid+1;
				}
			    maxid="'"+id+"'";
			  	client.query('INSERT INTO "SUKIEN" VALUES ('+maxid+','+
			  												tieude+','+
			  												noidung+','+
			  												thoigian+','+
			  												id_user+','+
			  												thoigian_end+')',
			  		function(err, result) {
			  			donedb(err);
					    if(err) {
					      return console.error('error running query', err);
					    }
					    else{
					    	res.end();
			    		   	return;
					    }
			  	});
	  		}
	  	);
	});
});
app.post('/laysukien', function(req, res){
	var tempDate="'"+"YYYY-MM-DD"+"'";
	var tempDate1="'"+"DD/MM/YYYY"+"'";
	var tempDate2="'"+"YYYY"+"'";
	var id="'"+JSON.parse(JSON.stringify(req.body.id))+"'";

	pool.connect(function(err, client, donedb) {
		if(err) {
	    	return console.error('error fetching client from pool', err);
		}
	  	client.query('select *, to_char("THOIGIAN",'+ tempDate+') as "START", to_char("THOIGIAN",'+ tempDate1+') as "DATE", to_char("THOIGIAN",'+ tempDate2+') as "DATE_START", to_char("END",'+ tempDate2+') as "DATE_END" from "SUKIEN" where "ID"='+id, function(err, result) {
		    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
		    donedb(err);
		    
		    if(err) {
		      return console.error('error running query', err);
		    }
		    res.send(result.rows);
	  	});
	});
});
///lay ket qua hoc tap
app.post('/layKetqua', function(req, res){
	var tempDate="'"+"YYYY-MM-DD"+"'";
	var tempDate1="'"+"DD/MM/YYYY"+"'";
	var id="'"+JSON.parse(JSON.stringify(req.body.id))+"'";
	pool.connect(function(err, client, donedb) {
		if(err) {
	    	return console.error('error fetching client from pool', err);
		}
	  	client.query('select *, to_char("THOIGIAN",'+ tempDate+') as "THOIGIAN",CAST("DIEM" AS FLOAT) from "KETQUAHOCTAP" where "ID_USER"='+id+' order by "ID_BAIHOC" asc', function(err, result) {
		    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
		    donedb(err);
		    
		    if(err) {
		      return console.error('error running query', err);
		    }
		    res.send(result.rows);
	  	});
	});
});
///lay tong hop ket qua hoc tap
app.post('/tonghopKetqua', function(req, res){
	pool.connect(function(err, client, donedb) {
		if(err) {
	    	return console.error('error fetching client from pool', err);
		}
	  	client.query('SELECT (SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'0'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'6'+"'"+') as "diemls60", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'1'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'6'+"'"+') as "diemls61", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'2'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'6'+"'"+') as "diemls62", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'3'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'6'+"'"+') as "diemls63", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'4'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'6'+"'"+') as "diemls64", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'5'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'6'+"'"+') as "diemls65", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'6'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'6'+"'"+') as "diemls66", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'7'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'6'+"'"+') as "diemls67", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'8'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'6'+"'"+') as "diemls68", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'9'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'6'+"'"+') as "diemls69", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'10'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'6'+"'"+') as "diemls610", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'0'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'7'+"'"+') as "diemls70", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'1'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'7'+"'"+') as "diemls71", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'2'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'7'+"'"+') as "diemls72", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'3'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'7'+"'"+') as "diemls73", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'4'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'7'+"'"+') as "diemls74", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'5'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'7'+"'"+') as "diemls75", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'6'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'7'+"'"+') as "diemls76", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'7'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'7'+"'"+') as "diemls77", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'8'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'7'+"'"+') as "diemls78", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'9'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'7'+"'"+') as "diemls79", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'10'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'7'+"'"+') as "diemls710", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'0'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'8'+"'"+') as "diemls80", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'1'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'8'+"'"+') as "diemls81", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'2'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'8'+"'"+') as "diemls82", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'3'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'8'+"'"+') as "diemls83", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'4'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'8'+"'"+') as "diemls84", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'5'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'8'+"'"+') as "diemls85", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'6'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'8'+"'"+') as "diemls86", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'7'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'8'+"'"+') as "diemls87", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'8'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'8'+"'"+') as "diemls88", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'9'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'8'+"'"+') as "diemls89", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'10'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'8'+"'"+') as "diemls810", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'0'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'9'+"'"+') as "diemls90", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'1'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'9'+"'"+') as "diemls91", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'2'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'9'+"'"+') as "diemls92", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'3'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'9'+"'"+') as "diemls93", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'4'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'9'+"'"+') as "diemls94", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'5'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'9'+"'"+') as "diemls95", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'6'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'9'+"'"+') as "diemls96", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'7'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'9'+"'"+') as "diemls97", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'8'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'9'+"'"+') as "diemls98", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'9'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'9'+"'"+') as "diemls99", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'10'+"'"+' and "MON"='+"'"+'lichsu'+"'"+' and "LOP"='+"'"+'9'+"'"+') as "diemls910", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'0'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'6'+"'"+') as "diemdl60", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'1'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'6'+"'"+') as "diemdl61", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'2'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'6'+"'"+') as "diemdl62", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'3'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'6'+"'"+') as "diemdl63", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'4'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'6'+"'"+') as "diemdl64", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'5'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'6'+"'"+') as "diemdl65", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'6'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'6'+"'"+') as "diemdl66", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'7'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'6'+"'"+') as "diemdl67", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'8'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'6'+"'"+') as "diemdl68", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'9'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'6'+"'"+') as "diemdl69", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'10'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'6'+"'"+') as "diemdl610", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'0'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'7'+"'"+') as "diemdl70", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'1'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'7'+"'"+') as "diemdl71", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'2'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'7'+"'"+') as "diemdl72", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'3'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'7'+"'"+') as "diemdl73", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'4'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'7'+"'"+') as "diemdl74", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'5'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'7'+"'"+') as "diemdl75", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'6'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'7'+"'"+') as "diemdl76", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'7'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'7'+"'"+') as "diemdl77", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'8'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'7'+"'"+') as "diemdl78", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'9'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'7'+"'"+') as "diemdl79", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'10'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'7'+"'"+') as "diemdl710", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'0'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'8'+"'"+') as "diemdl80", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'1'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'8'+"'"+') as "diemdl81", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'2'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'8'+"'"+') as "diemdl82", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'3'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'8'+"'"+') as "diemdl83", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'4'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'8'+"'"+') as "diemdl84", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'5'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'8'+"'"+') as "diemdl85", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'6'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'8'+"'"+') as "diemdl86", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'7'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'8'+"'"+') as "diemdl87", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'8'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'8'+"'"+') as "diemdl88", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'9'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'8'+"'"+') as "diemdl89", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'10'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'8'+"'"+') as "diemdl810", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'0'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'9'+"'"+') as "diemdl90", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'1'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'9'+"'"+') as "diemdl91", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'2'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'9'+"'"+') as "diemdl92", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'3'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'9'+"'"+') as "diemdl93", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'4'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'9'+"'"+') as "diemdl94", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'5'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'9'+"'"+') as "diemdl95", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'6'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'9'+"'"+') as "diemdl96", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'7'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'9'+"'"+') as "diemdl97", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'8'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'9'+"'"+') as "diemdl98", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'9'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'9'+"'"+') as "diemdl99", '+
	  						'(SELECT COUNT(*) FROM "KETQUAHOCTAP" WHERE "DIEM"::numeric::integer ='+"'"+'10'+"'"+' and "MON"='+"'"+'diali'+"'"+' and "LOP"='+"'"+'9'+"'"+') as "diemdl910" '+
	  						' FROM "KETQUAHOCTAP"',
	  	 function(err, result) {
		    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
		    donedb(err);
		    
		    if(err) {
		      return console.error('error running query', err);
		    }
		    res.send(result.rows);
	  	});
	});
});
//xoa thong bao
app.post("/delete_thongbao", function(req,res){

	var id="'"+JSON.parse(JSON.stringify(req.body.id))+"'";
	var id_user="'"+JSON.parse(JSON.stringify(req.body.id_user))+"'";
 	
 	var query="DELETE FROM "+'"'+"THONGBAO"+'"'+" WHERE ";
	if(JSON.parse(JSON.stringify(req.body.id))!="all"){
		query=query+'"'+"ID"+'"'+"="+id;
	}
	else{
		query=query+'"'+"ID_USER"+'"'+"="+id_user;
	}
	console.log(query);
	pool.connect(function(err, client, done) {
	  if(err) {
	    return console.error('error fetching client from pool', err);
	  }
	  client.query(query
  		, function(err, result) {
	    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
	    done(err);

	    if(err) {
	      return console.error('error running query', err);
	    }
	   	res.end();
    	return;
	  });
	});
});