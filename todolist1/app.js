const express=require("express");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
var data=[];

app.get("/",(req, res)=>{
var today =new Date();
var day="";

	day="weekend";
	//res.render('list', {kindofday: day});

	
	res.render('list',{kindofday: day , newlistitems:data });

})    
app.post("/", (req,res)=>{

	var name=req.body.first;
    data.push(name);
	
	res.redirect("/");
	console.log(name);

})

app.listen(3000, ()=>{ 
	console.log("server started");
});