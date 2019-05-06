const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const knex = require('knex');
const bank_register = require('./controllers/bank_register')
const map_display = require('./controllers/map_display')


const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl : true
  }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res) => {

	res.send('api connected');
})

app.post('/bank_register',(req,res) => { bank_register.handleBank_register(req,res,db) })


app.post("/map_display",(req,res) => { map_display.handleMap_display(req,res,db)})


app.listen(process.env.PORT || 3001, () => {
	console.log(`app is running on port ${process.env.PORT}`);
})

/*

/ --> app is working

/bank_register --> POST = bank object

/map_display --> GET = address of the bank

*/



