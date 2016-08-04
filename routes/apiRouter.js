let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

let User = require('../db/schema.js').User

  
  apiRouter
    .get('/users', function(req, res){
      User.find(req.query , "-password", function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      })
    })

  apiRouter
    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      })
    })
    .put('/users/:_id', function(req, res){
      console.log('sending put request')
      User.findByIdAndUpdate(req.params._id, req.body ,function(err, record){
        if(err) {
            res.send(err)
        }
        else {
            res.json(record)
        }
      })
    })
    .delete('/users/:_id', function(req, res){
      User.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })  
    })
    .post('/users', function(req, res){
      console.log(req.body)
      //checks if user already exists
      User.count({linkedInId: req.body.linkedInId}, function(err,count){
         if(count > 0){
          return res.status(400).send('user already exists')
        }
        else{
          var user = new User(req.body)
          user.save(function(err){
          if (err) return res.json(err)
          res.json(user)
          })
        }
      })
    })

    // Routes for a Model(resource) should have this structure


module.exports = apiRouter