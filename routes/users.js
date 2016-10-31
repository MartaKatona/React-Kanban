const express = require('express');
const app = express.Router();
const bodyParser =  require('body-parser');
const db = require('../models');
const User = db.User;

app.use(bodyParser.urlencoded({extended : true}));


app.get('/', function(req,res){
  User.findAll({
    limit: 10
  })
  .then((users)=>{
    console .log('users', users);
    res.json({
      success: true,
      users
    });
  });
});

// app.get('/new', (req, res)=> {
//     //console.log('req.card: ', req.card);
//     if(typeof req.card !== 'undefined'){
//       res.json('/new', {
//         title: '',
//         priority: '',
//         status: '',
//         createdby: '',
//         assignedto: '',
//         creatorID: '',
//         assignedID: ''
//       });
//     }else{
//       res.json({
//         error: '/error/403'
//       });
//     }
// });
// app.post('/new', (req, res) => {
//   console.log('req.body', req.body);
//   Card.create(
//    {
//     title: req.body.title,
//     priority: req.body.priority,
//     status: req.body.status,
//     createdby: req.body.createdby,
//     assignedto: req.body.assignedto,
//     creatorID: req.body.creatorID,
//     assignedID: req.body.assignedID
//    })
//   .then((card) => {
//     res.json({
//       success: true,
//       card
//     });
//   }); //then
// });

// app.get('/:id/edit', (req,res) =>{
//   Card.findById(req.params.id)
//   .then((card) =>{
//     console .log('card', card);
//     res.json({
//       success: true,
//       card
//     });
//   });
// });
// app.put('/:id/edit', (req,res) =>{
//   Card.update(
//   {
//     title: req.body.title,
//     priority: req.body.priority,
//     status: req.body.status,
//     createdby: req.body.createdby,
//     assignedto: req.body.assignedto,
//     creatorID: req.body.creatorID,
//     assignedID: req.body.assignedID
//   },
//     {where: { id: req.params.id}
//   }
//   )
//   .then((card) =>{
//     res.json({
//       success: true,
//       card
//     });
//   });
// });

// app.delete('/:id/delete', (req,res) =>{
//   Card.destroy({where: {id: req.params.id} })
//   .then(() => {
//     res.json({
//       success: true
//     });
//   });
// });

module.exports= app;