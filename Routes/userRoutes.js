// require("dotenv").config();

const express = require("express");
const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {getUser} = require("../middleware/retriever");

const router = express.Router();


//register
router.post('/register', async (req, res)=> {
    const salt= bcrypt.genSaltSync(10)
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt)
    
    const user = new User({
        email: req.body.email,
        password: hashedPassword,
        full_name: req.body.full_name,
       
        contact_number: req.body.contact_number,
        
        
        })

        try {
            const newUser = await user.save();
            res.status(201).json(newUser)
            try {
              const access_token = jwt.sign(
                JSON.stringify(newUser),
                process.env.ACCESS_TOKEN
              );
              res.status(201).json({ jwt: ACCESS_TOKEN });
            } catch (error) {
              res.status(500).json({ message: error.message });
            }
          } catch (error) {
            res.status(400).json({ message: error.message });
          } 


})

//login
router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) res.status(404).json({ message: "Could not find user" });
    console.log(password, user.password)
    if (await bcrypt.compare(password, user.password)) {
      try {
        const access_token = jwt.sign(
          JSON.stringify(user),
          process.env.ACCESS_TOKEN
        );
        res.status(201).json({ jwt: access_token });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    } else {
      res
        .status(400)
        .json({ message: "Email & password do not match" });
    }
  });
  

//ADMIN LOGIN
router.post('/admin/login', async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) res.status(404).json({ message: "Could not find user" });

  if (user.role!="Admin") res.status(404).json({ message: "You are not an Admin " });
  if (await bcrypt.compare(password, user.password)) {
    try {
      const access_token = jwt.sign(
        JSON.stringify(user),
        process.env.ACCESS_TOKEN
      );
      res.status(201).json({ jwt: access_token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res
      .status(400)
      .json({ message: "Email & password do not match" });
  }
});


// UPDATE a user
// router.put("/:id", getUser, async (req, res, next) => {
//     const { email,  password } = req.body;
//     if (email) res.user.email = email;
    
//     if (password) {
//       const salt = await bcrypt.genSaltSync(10);
//       const hashedPassword = await bcrypt.hash(password, salt);
//       res.user.password = hashedPassword;
//     }
  
//     try {
//       const updatedUser = await res.user.save();
//       res.status(201).send(updatedUser);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   });


  //get all users
router.get('/', async (req, res)=> {
    try{
        const users= await User.find()
        res.json(users)
    }
    catch(err){
        res.status(500).json({message: err.message})

    }

});





//Get one
router.get('/:id', getUser,(req, res)=> {
    res.send(res.user)

});

// DELETE a user
router.delete("/:id", getUser, async (req, res, next) => {
    try {
      await res.user.remove();
      res.json({ message: "Deleted user" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });





module.exports= router;