const crypto = require('crypto');
const User = require('../models/user.model');
const Carpoolinig = require('../models/carpooling.model')
const Notification = require('../models/notif.model')


const generateRandomCode = (() => {
  const USABLE_CHARACTERS = "abcdefghijklmnopqrstuvwxyz0123456789".split("");

  return length => {
    return new Array(length).fill(null).map(() => {
      return USABLE_CHARACTERS[Math.floor(Math.random() * USABLE_CHARACTERS.length)];
    }).join("");
  }
})();

exports.addAppointment = async function (req, res) {
    try {
        const result = { 
            user: req.body.user,
            date: req.body.date,
            place: req.body.place,
            code1: generateRandomCode(4),
            code2: generateRandomCode(4)

          };
        const addAppointment = await Carpoolinig.findOneAndUpdate(
        {
          _id: req.params.id
        }, {
          $push: {
            'appointment': result
          }
        })
      .lean()
      .exec()
        res.status(201).json({ data: result })
  
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }
  exports.getAppointments = async function (req, res) {
    try {
      const doc = await Carpoolinig
        .findOne({ _id: req.params.id })
        .lean()
        .exec()
  
      if (!doc) {
        return res.status(400).json({ message: "not found " }).end()
      }
  
      res.status(200).json({ data: doc.appointment })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }

  exports.getOneppointment = async function (req, res) {
    try { 
    const doc = await Carpoolinig.findOne(
      {"appointment._id": req.params.idap}, 
      { appointment: {$elemMatch: {_id: req.params.idap}},author:1});
      if(req.params.idus==doc.author._id){
      const app = { 
        user:doc.appointment[0].user ,
        author: doc.author,
        date: doc.appointment[0].date,
        place: doc.appointment[0].place,
        code: doc.appointment[0].code1
      };
      res.status(200).json({data:app})
    }
    if(req.params.idus==doc.appointment[0].user){
      const app1 = { 
        user:doc.appointment[0].user ,
        author: doc.author,
        date: doc.appointment[0].date,
        place: doc.appointment[0].place,
        code: doc.appointment[0].code2
      };
     return res.status(200).json({data:app1})
    }
 
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }
  
  exports.suppappointment = async function (req, res) {
    
          Carpoolinig.findOneAndUpdate(
            {_id: req.params.id }, 
            {$pull: {appointment: {_id: req.params.idap}}},
            function(err, data){
               if(err) return err;
               res.send({data:data});
        });
    }
  
    exports.updateAppointment = async function (req, res) {

      try {
        const updatedDoc = await Carpoolinig
          .updateOne(
            { _id: req.params.id, "appointment._id": req.params.idap },
   { $set: { "appointment.$.date" : req.body.date, "appointment.$.place": req.body.place } }
          )
          .lean()
          .exec()
    
        if (!updatedDoc) {
          return res.status(400).json({ message: "not found " }).end()
        }
    
        res.status(200).json({ data: updatedDoc })
      } catch (e) {
        console.error(e)
        res.status(400).end()
      }
    }
   
    exports.validercode = async function (req, res) {
      try { 
      const doc = await Carpoolinig.findOne(
        {"appointment._id": req.params.idap}, 
        { appointment: {$elemMatch: {_id: req.params.idap}},author:1});
        if(req.params.idus==doc.author._id){
     if(req.body.code==doc.appointment[0].code2)
        {res.status(200).json({message: "true"})}
        else{res.status(400).json({message: "false"})}
      }
      if(req.params.idus==doc.appointment[0].user){
        if(req.body.code==doc.appointment[0].code1)
           {res.status(200).json({message: "true"})}
           else{res.status(400).json({message: "false"})}
         }

      } catch (e) {
        console.error(e)
        res.status(400).end()
      }
    }