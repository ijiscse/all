const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, ()=>{
	console.log("server started");
})


app.get("/",(req, res)=>{
	res.sendFile(__dirname+"/signup.html");
})

app.post("/", (req,res)=>{

	var name=req.body.first;

	console.log(name);
	res.send("your name is "+name);
})


//6370f2113be32fb0449d8f1cdfa1c6f2-us18
//178af15220