const User = require('../models/user');

module.exports = (router) =>{
  router.post('/register',(req, res)=>{
    // req.body.email;
    // req.body.username;
    // req.body.password;

    if(!req.body.email){
      res.json({success:false, message: 'provide an email'});
    }else{
      console.log(req.body);
      if(!req.body.username){
        res.json({success:false, message: 'provide a user name'});
      }else{
        if(!req.body.password){
          res.json({success:false, message: 'provide a password'});
        }else{
          res.send('Hello world');

        }
      }
      res.send('Hello world');

    }


    res.send('Hello world');

  });
  return router;
}
