const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://gnana:gnana@cluster0.betal21.mongodb.net/blog-app').then(()=>{
    console.log('Connection to MongoDB established successfully');
}).catch((err)=>{
    console.error(`Error while connecting to MongoDB: ${err}`);
})

// Define schemas


const UserSchema = new mongoose.Schema({
    // Schema definition here
    email:String,
    password:String,
    publishedArticles:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
});

const ArticleSchema = new mongoose.Schema({
    // Schema definition here
    title:String,
    description:String,

    
});

//const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Article', CourseSchema);

module.exports = {

    User,
    Article
}