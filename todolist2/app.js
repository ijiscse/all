const express=require("express");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs" )
app.use(express.static("public"));


let datas=["ffsdfsas"];

app.listen(3000,()=>{
	console.log("server started");
})

app.get("/",(req,res)=>{
data="cofee";
	res.render("list",{dataset:data,userin:datas});
})

app.get("/work",(req,res)=>{
workings=["cofee making","food making","fruit riping"];
	res.render("list",{dataset:"another",userin:workings});
})

app.post("/work",(req,res)=>{
let name=req.body.first;

datas.push(name);
res.redirect("/");
	//console.log(datas);
})


app.post("/",(req,res)=>{
let name=req.body.first;

datas.push(name);
res.redirect("/");
	//console.log(datas);
})