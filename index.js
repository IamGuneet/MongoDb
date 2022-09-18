const express = require ('express');
const { ObjectId } = require('mongodb');

const app = express();

const {connectToDb , getDb} = require('./db');

let db;

//db connection

app.use(express.json())

// routes
app.get('/books',(req,res) =>{
    const page =req.query.p || 0  ;
    const booksPerPage = 3;
    
    let books =[];

    console.log("request for books");
    db.collection('books')
    .find()  // returns somethingg called cursor which we can work with using array or for each
    .sort({author:1})
    .skip(page * booksPerPage)
    .limit(booksPerPage)
    .forEach(book => books.push(book))
    .then(() => {
        res.status(200).json(books)
    })
        .catch(() => {  //error code
            res.status(500).json({error:"could not fetch"})
        })
        // res.json({mssg:"Welcome to the api"})
        
    })
    

    //Reading Data
    app.get('/books/:id',(req,res) => {
        console.log(req.params.id);
        
        if(ObjectId.isValid(req.params.id)){
            
            db.collection('books')
            .findOne({_id: ObjectId(req.params.id)})
            .then(singleDoc => {
                res.status(200).json(singleDoc)
            })
            .catch(err => {
                res.status(500).json({
                    error:'could not fetch data'
                })
            })
        }else{
            res.status(500).json({error:"Not valid id"})
        }
    
    })
    
    //Creating Data
    app.post('/postBook',(req,res) => {
        const bookNew = req.body;
        // console.log(books);
        console.log("books posted");
        
        db.collection('books')
        .insertOne(bookNew)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:"File insert error!!"})
        })
        
    })

    //Deleting Request
    app.delete('/books/:id',(req,res) => {
        if(ObjectId.isValid(req.params.id)){
            console.log("delete request valid");
            db.collection('books')
            .deleteOne({_id: ObjectId(req.params.id)})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({error: "Error"})
            })
        }else{
            res.status(500).json({error: "Error"})
        }
    })


    //Updating Request
    app.patch('/books/:id',(req,res) => {
        const updates = req.body
        console.log("request for updating book data");
        db.collection('books')
        .updateOne({_id:ObjectId(req.params.id)},{$set:updates})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({error:'not found'})
        })
    })



    
    connectToDb((err) =>{
        //c=logging if there is error
        console.log(err);
    
        //if no error app.listen runs
        if(!err){
            app.listen(3000, () => {
                console.log("server started on port 3000");
            })
        }
        db = getDb();
    
    })