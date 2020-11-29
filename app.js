var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var User=require("./models/user");
var photos=require("./models/photos");
//requiring routes
var csitPicsRoutes=require("./routes/csitPics");
var indexRoutes=require("./routes/index");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
// mongoose.connect("mongodb://localhost/csit_site",{
// 	useUnifiedTopology:true,
// 	useNewUrlParser:true
// });

mongoose.connect("mongodb+srv://Rahul_Prasad:csitgeu@123@cluster0.vyuhj.mongodb.net/Rahul_Prasad?retryWrites=true&w=majority",{
	useUnifiedTopology:true,
	useNewUrlParser:true
}).then (()=>{
	console.log("Connected to DB!");
}).catch(err => {
	console.log('error:',err.message);
});
// var siteSchema=new mongoose.Schema({
// 	image:String
// });
// var photos=mongoose.model("photos",siteSchema);


var flash=require("connect-flash");
var session = require('express-session');
app.use(session({ cookie: { maxAge: 60000 }, 
                  secret: 'woot',
                  resave: false, 
                  saveUninitialized: false}));




app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
});
	
	
	
// var pics=[
// 		{image:"http://csitgeu.in/wp/wp-content/uploads/2019/07/president-at-graphic-era-group.jpg"},
// 		{image:"https://csitgeu.in/wp/wp-content/uploads/2019/10/M-12ddn-pg27-0-184x300.png"}
// 	];

//PASSPORT CONFIGURATION
 // app.use(require("express-session")({
 // secret:"good developer",
 // resave:false,
 // saveUninitialized:false
 // }));


app.get("/syllabus",function(req,res){
	res.render("syllabus");
});

app.get("/vision-and-mission",function(req,res){
	res.render("vission");
});
app.get("/contact",function(req,res){
	res.render("contact");
});

//NOTICES ROUTES
app.get("/notices",function(req,res){
	res.render("notices");
});

app.get("/notices/nov",function(req,res){
	res.render("months/november");
});
app.get("/notices/sept",function(req,res){
	res.render("months/september");
});

app.get("/notices/oct",function(req,res){
	res.render("months/october");
});

app.get("/notices/aug",function(req,res){
	res.render("months/august");
});

app.get("/notices/july",function(req,res){
	res.render("months/july");
});

app.get("/notices/june",function(req,res){
	res.render("months/june");
});

app.get("/notices/may",function(req,res){
	res.render("months/may");
});

app.get("/notices/april",function(req,res){
	res.render("months/april");
});

app.get("/notices/march",function(req,res){
	res.render("months/march");
});

app.get("/notices/feb",function(req,res){
	res.render("months/february");
});
app.get("/notices/jan",function(req,res){
	res.render("months/january");
});



app.get("/disclaimer",function(req,res){
	res.render("About");
});

app.use(indexRoutes);
app.use(csitPicsRoutes);




app.listen(process.env.PORT || 3000,process.env.IP,function(){
	console.log("CSITGEU server is running");
});