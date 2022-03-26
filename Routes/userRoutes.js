// require("dotenv").config();

const express = require("express");
const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {getUser} = require("../middleware/retriever");
const auth = require("../middleware/auth")
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
        about: req.body.about,
        avatar: req.body.avatar 
        
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
router.patch('/login', async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) res.status(404).json({ message: "Could not find user" });
    console.log(password, user.password)
    if (await bcrypt.compare(password, user.password)) {
      try {
        const ACCESS_TOKEN = jwt.sign(
          JSON.stringify(user),
          process.env.ACCESS_TOKEN
        );
        res.status(201).json({ jwt: ACCESS_TOKEN });
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
router.patch('/admin/login', async (req, res, next) => {
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
router.put("/:id", getUser, async (req, res, next) => {

  const { full_name, password, contact_number, about, avatar } = req.body;
  if (full_name) res.user.full_name = full_name;
  if (contact_number) res.user.contact_number = contact_number;
  if (avatar) res.user.avatar = avatar;
  if (about) res.user.about = about;
  if (password) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    res.user.password = hashedPassword;
  }

  try {
    const updatedUser = await res.user.save();
    res.status(201).send(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


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