//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose=require("mongoose");
const _=require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://iliash:Hello123@cluster0.lceburz.mongodb.net/todoList",{useNewUrlParser:true});

//const items = ["Buy Food", "Cook Food", "Eat Food"];
//const workItems = [];

const itemsSchema={
  name:String
};
const Item=mongoose.model("Item",itemsSchema)

const item1=new Item({
  name:"iliash sk"
})

const item2=new Item({
  name:"rabindra"
})

const item3=new Item({
  name:"sahil"
})
const defaultItems=[item1,item2,item3];
/* */
const listSchema={
  name:String,
  items:[itemsSchema]
};
const List=mongoose.model("List",listSchema)

app.get("/", function(req, res) {

const day = date.getDate();
  Item.find({},(err,foundItems)=>{
    if(foundItems.length===0){
      Item.insertMany(defaultItems,(err)=>{
  if(err){
    console.log("error")
  }
  else{
    console.log("success"); 
  }
});
      res.redirect("/");

    }
    else{
      res.render("list", {listTitle: "Today", newListItems: foundItems});

    }
    
  })
  

});

app.get("/:customListName",function(req,res){

 const customListName=_.capitalize(req.params.customListName);
  List.findOne({name:customListName},(err,foundlist)=>{
    if(!err){
      if(!foundlist){
        const list=new List({
    name:customListName,
    items:defaultItems
  });
  list.save();
  console.log(customListName)
  res.redirect("/"+customListName)

      }
      else{
        res.render("list",{listTitle:foundlist.name,newListItems:foundlist.items})
      }
    }

  })
})

  

app.post("/", function(req, res){

  const itemnew=req.body.newItem;
  const newrow=req.body.list;

 const item=new Item({
  name:itemnew
 })
 if(newrow==="Today"){
  item.save();
    res.redirect("/");

 }
 else{
  List.findOne({name:newrow},(err,foundlist)=>{
    foundlist.items.push(item);
    foundlist.save();
    res.redirect("/"+newrow);
  })
 }
    
  
});

app.post("/delete", function(req, res){

  const checkid=req.body.checkbox;
  const title=req.body.title;
  if(title==="Today"){
  Item.findByIdAndRemove(checkid,(err)=>{
    if(err){console.log("error detected")}
      else{
        console.log("sucessfully deleted checked item");
        res.redirect("/");
      }
      
  })
}
else{
  List.findOneAndUpdate({name:title},{$pull:{items:{_id:checkid}}},(err,foundlist)=>{
    if(!err){
      res.redirect("/"+title);
    }
  })

}
    
  
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
