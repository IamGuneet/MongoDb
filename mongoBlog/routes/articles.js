const express = require('express');

const Article = require('../models/article')

const router = express.Router()

router.get('/new',(req,res)=>{
    console.log("Request for new article page");
    res.render('articles/new',{article: new Article()})

})

router.get('/:slug', async (req,res) => {
    const article = await Article.findOne( { slug: req.params.slug} )
        if(article == null){
            res.redirect('/')
        }
    
    res.render('articles/show',{ article:article })

})



router.post('/', async (req,res) => {
    let article = new Article ({
        title: req.body.title,
      description: req.body.description,
      date: req.body.date
    })
    try{
        console.log(req.body);
           article =  await article.save();
        res.redirect(`/articles/${article.slug}`)
    } catch(error){
        console.log(error);
        res.render('articles/new',{ article:article})
    }
})

module.exports = router