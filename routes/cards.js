const express = require('express');
const app = express.Router();
const bodyParser =  require('body-parser');
const db = require('../models');
const Card = db.Card;
const User = db.User;

app.use(bodyParser.urlencoded({extended : true}));

function getUserIdByUsername(name){
  let id = 0;
  let userFound = {};
  userFound  = User.findAll(
    {
      limit: 2
    }
  );
  console.log('userFound', userFound);
  id = parseInt(userFound.id);
  return id;
  // .then((user) =>{
  //   console.log('userCreated', userCreated);
  //   let creatorID = user.id;
  // })
  // .then((id) =>{
  //   Card.create(
  //    {
  //       title: req.body.title,
  //       priority: req.body.priority,
  //       status: req.body.status,
  //       createdby: req.body.createdby,
  //       assignedto: req.body.assignedto,
  //       creatorID: req.body.creatorID,
  //       assignedID: req.body.assignedID
  //   });
  // })
}

app.get('/', function(req,res){
  Card.findAll({
    limit: 20
  })
  .then((card)=>{
    //console .log('card', card);
    res.json({
      success: true,
      card
    });
  });
});

app.get('/new', (req, res)=> {
    //console.log('req.card: ', req.card);
    if(typeof req.card !== 'undefined'){
      res.json('/new', {
        title: '',
        priority: '',
        status: '',
        createdby: '',
        assignedto: '',
        creatorID: '',
        assignedID: ''
      });
    }else{
      res.json({
        error: '/error/403'
      });
    }
});
app.post('/new', (req, res) => {
  console.log('req.body.createdby', req.body.createdby);
  let creator = 1; //getUserIdByUsername(req.body.createdby);
  let assigned = 2; //getUserIdByUsername(req.body.assignedto);
  console.log('creator:  ', creator);
  Card.create(
   {
    title: req.body.title,
    priority: req.body.priority,
    status: req.body.status,
    createdby: req.body.createdby,
    assignedto: req.body.assignedto,
    creatorID: creator,
    assignedID: assigned
   })
  .then((card) => {
    res.json({
      success: true,
      card
    });
  }); //then
});

app.get('/:id/edit', (req,res) =>{
  Card.findById(req.params.id)
  .then((card) =>{
    console .log('card', card);
    res.json({
      success: true,
      card
    });
  });
});
app.put('/:id/edit', (req,res) =>{
  Card.update(
  {
    title: req.body.title,
    priority: req.body.priority,
    status: req.body.status,
    createdby: req.body.createdby,
    assignedto: req.body.assignedto,
    creatorID: req.body.creatorID,
    assignedID: req.body.assignedID
  },{
    where: { id: req.params.id}
  }
  )
  .then((card) =>{
    res.json({
      success: true,
      card
    });
  });
});

app.delete('/:id/delete', (req,res) =>{
  Card.destroy({where: {id: req.params.id} })
  .then(() => {
    res.json({
      success: true
    });
  });
});

module.exports= app;