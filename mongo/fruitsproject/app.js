const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var mongoose = require('mongoose');

 app.listen(3000, ()=>{
  console.log("server started");
})

 app.get("/",(req, res)=>{
 



// make a connection 
mongoose.connect('mongodb://localhost:27017/movies');
 
// get reference to database
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
    console.log("Connection Successful!");
     
    // define Schema
    var BookSchema = mongoose.Schema({
      name: String,
      price: Number,
      quantity: Number
    });
 
    // compile schema to model
    var Book = mongoose.model('Book', BookSchema,);
 
    // a document instance
    var book1 = new Book({ name: 'Introduction to Mongoose', price: 10, quantity: 25 });
 
    // save model to database
    book1.save(function (err, book) {
      if (err) return console.error(err);
      console.log(book.name + " saved to bookstore collection.");
 res.send(book+"alsdhjlakshf");

    });
  
    db.collection('books').find( function(err, docs) {
    if (!err) { 
        console.log(docs);
        
    }
    else {
        throw err;
    }

    res.send(docs['price']+"hlkjlkjh");
});
     

});
})