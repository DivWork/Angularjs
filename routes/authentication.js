const User = require('../models/user');

module.exports = (router) =>{
  router.post('/register',(req, res)=>{
    // req.body.email;
    // req.body.username;
    // req.body.password;

    if(!req.body.email){
      res.json({success:false, message: 'provide an email'});
    }else{
      if(!req.body.username){
        res.json({success:false, message: 'provide a user name'});
      }else{
        if(!req.body.password){
          res.json({success:false, message: 'provide a password'});
        }else{

          let user = new User({
            email : req.body.email.toLowerCase(),
            userName : req.body.username.toLowerCase(),
            password: req.body.password
          });

          user.save((err)=>{
            if(err){

              console.log(err);
              if(err.code === 11000){
                res.json({success:false, message:'UserName/Email already exists'});
              }else{
                if(err.errors){
                  // console.log('inside');
                  if(err.errors.email){
                    res.json({success:false, message: err.errors.email.message});
                  }else{
                    if(err.errors.userName){
                      res.json({success:false, message: err.errors.userName.message});
                    }else{
                      if(err.errors.password){
                        res.json({success:false, message: err.errors.password.message});
                      }else{
                        res.json({success:false})
                      }
                    }
                  }
                }else{
                  res.json({success:false, message:'could not save users', err});
                  }
                }
              // }
            }else{
              res.json({success:true, message:'User registered successfully'});
            }
          });

        }
      }
      // res.send('Hello world');

    }


    // res.send('Hello world');

  });
  return router;
}
