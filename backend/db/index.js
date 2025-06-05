const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('yor url').then(()=>{
    console.log('Connection to MongoDB established successfully');
}).catch((err)=>{
    console.error(`Error while connecting to MongoDB: ${err}`);
})

// Define schemas


const AuthorSchema = new mongoose.Schema({
    
    email:String,
    password:String,
    
});

const ArticleSchema = new mongoose.Schema({
  
    title:String,
    content:String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    
});

//const Admin = mongoose.model('Admin', AdminSchema);
const Author = mongoose.model('User', AuthorSchema);
const Article = mongoose.model('Article', ArticleSchema);

module.exports = {

    Author,
    Article
}