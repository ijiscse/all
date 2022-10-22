const express=require('express')

const http=require('https')
const bodyParser=require("body-parser")

const app=express()
app.use(bodyParser.urlencoded({extended: true}));



app.get("/",(req,res)=>{
	res.sendFile(__dirname+"/index.html")
}) 

app.post("/", (req,res)=>{

	const city=req.body.cityName;
	const apikey="50a789f1ecfef4993d6f7ad02535a06e";
	var url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"";

	http.get(url,(response)=>{

		console.log(response.statusMessage);
		
		response.on("data",(data)=>{	
			const weather=JSON.parse(data);
			var temp=weather.main.temp
			
			var temp=Math.trunc(temp-273);
			res.send("<h1>The temperature of "+city+" is "+temp+" <sup>o</sup>C</h>");
		})
	})
})



app.listen(3000, ()=>{

	console.log("your server has started")

})