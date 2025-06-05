const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Article } = require("../db");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    const purchasedCourses = req.body.purchasedCourses || [];

    User.create({
        username,
        password,
        purchasedCourses
    }).then(()=>{
        console.log('User created successfully')
        res.status(200).json({
            msg:"User created successfully"
        })
    }).catch((err)=>{
        res.status(500).json({
            message: `Error while creating user: ${err}`
        })
    })
});

router.post('/signin', (req, res) => {
    

    const email = req.body.email
    const password = req.body.password

    User.find({email,password}).then(()=>{
        //send token
        //Secret key can be stored in .env file (best practice)
        const token = jwt.sign({email},'GV_serverkey')
        res.status(200).json({
            token:token
        })

    }).catch((err)=>{
        console.log(`Error while signing in admin: ${err}`);
        res.status(500).json({
            message: 'Error while signing in admin'
        });
    })
});

router.get('/posts', (req, res) => {
    // Implement listing all courses logic
    Article.find({}).then((articles)=>{
        res.status(200).json({
            articles:articles
        })
    }).catch((err)=>{
        res.status(500).json(({
            msg:"Error while fetching the courses"
        }))
    })
});

router.post('/post', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const article = new Article({
        title: req.body.title,
        content: req.body.content
    });

    try {
        const newArticle = await article.save()
        res.status(201).json(newPost)
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/publishedArticle', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router