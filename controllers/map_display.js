const handleMap_display = (req,res,db) => {
  const {bank_name,bank_branch} = req.body;
   if(!bank_name||!bank_branch) {
    return res.status(400).json("Wrong information entered");
   }
  db.select('bank_name','bank_branch').from('login')
    .where('bank_branch', '=', bank_branch)
    .then(data => {
      console.log(data);
      if(data) {
        return db.select('*').from('bankdetails')
          .where('bank_branch','=',bank_branch)
          .then(bank => {
            res.json(bank[0])
          })
          .catch(err => res.status(400).json("Cannot fetch bank details"))
      } else {
        res.status(400).json("Wrong bank name or bank branch")
      }
    })  	

    .catch(err => res.status(400).json("Wrong bank name or bank branch"))
}

module.exports = {
   handleMap_display: handleMap_display
}