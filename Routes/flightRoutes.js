const express= require('express');
const router= express.Router()
const flight= require('../Models/flightModel')
const getFlight  = require("../middleware/retriever");
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

router.post('/', async (req, res)=> {
    const flight = new Flight({
        route: req.body.route,
        fname: req.body.fname,
        depdate: req.body.depdate,
        retdate: req.body.retdate })

       
    try{ 
        const newFlight = await flight.save()
        res.status(201).json(newFlight)
    }
    catch(err){
        res.status(400).json({message: err.message})

    }


})

// // Update One
// // router.patch('/:id', getUser, async (req, res)=> {
// //     if (req.body.email != null){
// //         res.user.email =req.body.email
// //     }
// //     if (req.body.password != null){
// //         res.user.password =req.body.password
// //     }
// //     try{
// //         const updatedUser = await res.user.save()
// //         res.json(updatedUser)
// //     }
// //     catch(err){
// //         res.status(400).json({message: err.message})
// //     }

// // })
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