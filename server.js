const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const knex = require('knex');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'banktrack'
  }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res) => {

	res.send('api connected');
})

app.post('/bank_register',(req,res) => { bank_register.handleBank_register(req,res,db) })


app.post("/map_display",(req,res) => {
  db.select('bank_name','bank_branch').from('login')
    .where('bank_branch', '=', req.body.bank_branch)
    .then(data => {
      console.log(data);
      if(data) {
        return db.select('*').from('bankdetails')
          .where('bank_branch','=',req.body.bank_branch)
          .then(bank => {
            res.json(bank[0])
          })
          .catch(err =>res.status(400).json("Cannot fetch bank details"))
      } else {
        res.status(400).json("Wrong bank name or bank branch")
      }
    })  	

    .catch(err => res.status(400).json("Wrong bank name or bank branch"))
})


app.listen(3001, () => {
	console.log("app is running on port 3000");
})

/*

/ --> app is working

/bank_register --> POST = bank object

/map_display --> GET = address of the bank

*/



