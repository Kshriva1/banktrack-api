const express = require("express");
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.json());

const database = {
	users : [
	{
        id: 0,
        bank_name: "capitalone",
        bank_address: "9-seminary avenue,Binghamton NY",
        bank_branch: "Binghamton",
        opening_hours: "9am-2pm",
        phone_number: "6078665543",
        bank_code: "43567"
     }
	]
}
app.get('/',(req,res) => {

	res.send(database.users);
})

app.post('/bank_register',(req,res) => {
   const {bank_name,bank_address,bank_branch,opening_hours,phone_number,bank_code} = req.body;
   database.users.push({
   	id : 1,
   	bank_name:bank_name,
	bank_address:bank_address,
	bank_branch:bank_branch,
	opening_hours:opening_hours,
	phone_number:phone_number,
	bank_code:bank_code,
   })
   res.json(database.users[database.users.length-1])
})

app.get("/map_display",(req,res) => {
  if(req.body.bank_name === database.users[0].bank_name && req.body.bank_branch === database.users[0].bank_branch) {
  	res.json(database.users[0].bank_address)
  } else {
  	res.status(400).error("Cannot fiond the bank details")
  }

})

app.listen(3003, () => {
	console.log("app is running on port 3000");
})

/*

/ --> app is working

/bank_register --> POST = bank object

/map_display --> GET = address of the bank

*/



