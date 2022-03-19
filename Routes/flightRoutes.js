const express= require('express');
const router= express.Router()
const flight= require('../Models/flightModel')

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

//Get one
router.get('/:id', getFlight,(req, res)=> {
    res.send(res.flight.FCode)

});

//Create One

router.post('/', async (req, res)=> {
    const flight = new Flight({
        from: req.body.from,
        to: req.body.to,
        depdate: req.body.depdate,
        retdate: req.body.retdate,
        fcode: req.body.fcode  })

    try{ 
        const newFlight = await flight.save()
        res.status(201).json(newFlight)
    }
    catch(err){
        res.status(400).json({message: err.message})

    }


})

// Update One
// router.patch('/:id', getUser, async (req, res)=> {
//     if (req.body.email != null){
//         res.user.email =req.body.email
//     }
//     if (req.body.password != null){
//         res.user.password =req.body.password
//     }
//     try{
//         const updatedUser = await res.user.save()
//         res.json(updatedUser)
//     }
//     catch(err){
//         res.status(400).json({message: err.message})
//     }

// })
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



//middleware
async function getFlight(req, res, next){
    let flight
    try{
        flight = await Flight.findById(req.params.id)
        if (flight == null){
            return res.status(404).json({messae: 'Cannot Find Flight'})
        }
    }
    catch(err){
        return res.status(500).json({messae: err.message})
    }
    res.flight = flight
    next()
}

module.exports= router;