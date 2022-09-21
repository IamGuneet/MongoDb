// console.log("hello");
const { application } = require('express');
const express = require('express');
const app = express();
const Article = require('./models/article')
const mongoose = require('mongoose'); 

//connection string
mongoose.connect('mongodb://localhost/blog',{useNewUrlParser: true, useUnifiedTopology: true
  })

const articleRouter = require('./routes/articles')

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))

app.get('/',async (req,res)=>{
const articles = await Article.find().sort({date:"descending"})

res.render("articles/index",{articles:articles})
})

app.use('/articles',articleRouter)

app.listen(2022,() => {
    console.log("running on port 2022");
})