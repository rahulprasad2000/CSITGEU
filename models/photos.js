var mongoose=require("mongoose");
var siteSchema=new mongoose.Schema({
	image:String
});
module.exports=mongoose.model("photos",siteSchema);