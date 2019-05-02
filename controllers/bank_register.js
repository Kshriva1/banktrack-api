const handleBank_register = (req,res) => {
   const {bank_name,bank_address,bank_branch,opening_hours,phone_number,bank_code} = req.body;
   db.transaction(trx => {

    trx.insert({
      bank_name: bank_name,
      bank_branch: bank_branch
    })
      .into('login')
      .returning('bank_branch')
      .then(loginBank_branch => {

        return trx('bankdetails')
        .returning('*')
        .insert({
        bank_name:bank_name,
        bank_address:bank_address,
        bank_branch:loginBank_branch[0],
        opening_hours:opening_hours,
        phone_number:phone_number,
        bank_code:bank_code
       })
       .then(user => {
       res.json(user);
      })
     })
      .then(trx.commit)
      .catch(trx.rollback)
      })
       .catch(err => res.status(400).json('unable to register'))
    
   }

   module.exports = {
    handleBank_register: handleBank_register
   }