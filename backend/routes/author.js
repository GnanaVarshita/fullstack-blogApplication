const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const { Author, Article } = require("../db");
const authorMiddleware = require("../middlewares/author");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const email = req.body.email;
    const password = req.body.password;
    

    Author.create({
        email,
        password,
       
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

// router.post('/login', (req, res) => {
    

//     const email = req.body.email
//     const password = req.body.password

//     Author.find({email,password}).then((author)=>{
//         //send token
//         //Secret key can be stored in .env file (best practice)
//         const token = jwt.sign({email},'GV_serverkey')
//         res.status(200).json({
//             token:token,
//             id:author._id,
//         })

//     }).catch((err)=>{
//         console.log(`Error while signing in admin: ${err}`);
//         res.status(500).json({
//             message: 'Error while signing in admin'
//         });
//     })
// });

router.post('/login', async (req, res) => {
    try {
       const email = req.body.email
       const password = req.body.password

        // Find the user by email & password
        const user = await Author.find({ email, password });
       // console.log(user);

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({email}, "Gv_SERVER");

        // Return token & user ID
        res.status(200).json({
            token: token,
            id: user[0]._id,
        });
    } catch (err) {
        console.error(`Error while signing in author: ${err}`);
        res.status(500).json({ message: "Error while signing in author" });
    }
});

router.get('/posts', (req, res) => {
    // all posts
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

router.post('/post', authorMiddleware, async(req, res) => {
    // Implement course purchase logic
    const article = new Article({
        title: req.body.title,
        content: req.body.content,
        authorId: req.body.authorId,
        createdAt: new Date()
    });

   try {
           //const { title, content, authorId ,createdAt} = req.body;
   
           const newArticle = await Article.create(article);
           res.status(201).json(newArticle);
       } catch (err) {
           res.status(400).json({ message: err.message });
       }
});

// router.get('/posts:authorId?', authorMiddleware, async(req, res) => {
//     // Implement fetching purchased courses logic
//     try {
//             const { authorId } = req.params;
//             const articles = await Article.find({ authorId });
    
//             if (!articles.length) {
//                 return res.status(404).json({ message: "No articles found for this author" });
//             }
    
//             res.status(200).json({ articles });
//         } catch (err) {
//             res.status(500).json({ message: `Error fetching articles: ${err.message}` });
//         }
// });

module.exports = router