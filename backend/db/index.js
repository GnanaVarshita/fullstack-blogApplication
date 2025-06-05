const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://gnana:gnana@cluster0.betal21.mongodb.net/blog-app').then(()=>{
    console.log('Connection to MongoDB established successfully');
}).catch((err)=>{
    console.error(`Error while connecting to MongoDB: ${err}`);
})

// Define schemas


const AuthorSchema = new mongoose.Schema({
    // Schema definition here
    email:String,
    password:String,
    
});

const ArticleSchema = new mongoose.Schema({
    // Schema definition here
    title:String,
    description:String,
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