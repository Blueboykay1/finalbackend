// require("dotenv").config;


const express= require('express');
const router= express.Router()
const Flight= require('../Models/flightModel')
const {getFlight}  = require("../middleware/retriever");
const auth = require("../middleware/auth")
//Get all
router.get('/', async (req, res)=> {
    try{
        const flights= await Flight.find()
        res.json(flights)
    }
    catch(err){
        res.status(500).json({message: err.message})

    }

});

// Get one
router.get('/:id', getFlight,(req, res)=> {
    res.send(res.flight)

});

//Create One

router.post('/register', async (req, res)=> {
    const flight = new Flight({
        d: Date(),
        route: req.body.route,
        brand: req.body.brand,
        depdate: req.body.depdate,
        retdate: req.body.retdate ,
        deptime: req.body.deptime,
        rettime: req.body.rettime , 
        price: req.body.price,
        category: req.body.category
     })

       
    try{ 
        const newFlight = await flight.save()
        res.status(201).json(newFlight)
    }
    catch(err){
        res.status(400).json({message: err.message})

    }


})

// // Update One
router.put("/:id", [auth, getFlight], async (req, res, next) => {
  if (req.user._id !== res.flight.author)
  res
    .status(400)
    .json({ message: "You do not have the permission to update this post" });
const { route, depdate,retdate, price, deptime,rettime, category } = req.body;
if (title) res.post.title = title;
if (body) res.post.body = body;
if (img) res.post.img = img;

try {
  const updatedPost = await res.post.save();
  res.status(201).send(updatedPost);
} catch (error) {
  res.status(400).json({ message: error.message });
}
});   



//Delete One
router.delete('/:id', getFlight,async (req, res)=> {
    try{
        await res.flight.remove()
        res.json({message: 'Deleted Flight'})
    }
    catch(err){
        res.status(500).json({message: err.message})

    }

})

module.exports= router;