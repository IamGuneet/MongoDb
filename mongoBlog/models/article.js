const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');



const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    description:{
        type:String
    },
    slug:{
        type: String,
        unique: true,
        required: true
    }

})

    articleSchema.pre('validate',(next) =>{
        if(this.title){
            this.slug = slugify(this.title,{lower:true,strict: true})
        }
        next();
})

module.exports = mongoose.model('Article',articleSchema)