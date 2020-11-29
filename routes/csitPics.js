var express=require("express");
var photos=require("../models/photos");
var router=express.Router();
//INDEX-SHOW ALL PHOTOS
router.get("/gallery",function(req,res){
	photos.find({},function(err,allpics){
		if(err){
			console.log(err);
		}else{
			res.render("gallery",{pics:allpics});
		}
	});
});

router.post("/gallery",function(req,res){
	var image=req.body.image;
	var newPics={image:image};
	// pics.push(newPics);
	photos.create(newPics,function(err,newlyCreated){
		if(err){
			console.log(err);
		} else{
			req.flash("success","Successfully added the photo");
			res.redirect("/gallery");
		}
	});
	
});

router.get("/gallery/new",isLoggedIn,function(req,res){
	res.render("new");
});

//MIDDLEWARE
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
	   return next();
	   }
	req.flash("error","You need to be logged in to do that");
	res.redirect("/login");
}

module.exports=router;