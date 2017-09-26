var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var bcyrpt = require('bcrypt-nodejs');
let emailLengthChecker = (email) => {
  if(!email){
    return false;
  }else{
    if(email.length < 5 || email.length > 40){
      return false;
    }else{
        return true;
    }
  }
};

let ValidemailChecker = (email) =>{
  if(!email){
    return false;
  }else{
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExp.test(email);
  }
};

let UserNameLengthChecker = (userName) =>{
  if(!userName){
    return false;
  }else{
    if(userName.length< 3 || userName.length > 20){
      return false;
    }else{
      return true;
    }
  }
};

let validUsername = (userName) => {
  if(!userName){
    return false;
  }else{
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(userName);
  }
};

let passwordValidLengthChecker = (password) => {
  if(!password){
    return false;
  }else{
    if(password.length<8 || password.length > 35){
      return false;
    }else{
      return true;
    }
  }
};

let validPassword = (password) => {
 if(!password){
   return false;
 }else{
   const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
   return regExp.test(password);
 }
};

const usernameValidators = [
  {
    validator: UserNameLengthChecker,
    message: 'user name should be more than 3 characters and should be less than 20'
  },
  {
    validator: validUsername,
    message: 'User Name should be specific'
  }
]

const emailValidators = [
    {
      validator: emailLengthChecker, message:'Email must be atleast 5 characters'
    },
    {
      validator: ValidemailChecker, message: 'Valid email check failed'
    }

]


var userSchema = new Schema({
  email : {type: String, required:true, unique: true, lowercase: true, validate: emailValidators},
  userName : {type: String, required:true, unique: true, lowercase: true, validate: usernameValidators},
  password : {type: String, required: true}
});

userSchema.pre('save',function(next) {
  if(!this.isModified('password'))
    return next();

    bcyrpt.hash(this.password,null, null, (err,hash) =>{
      if(err) return next(err);
      this.password = hash;
      next();
    })
});

userSchema.methods,comparePassword = (password) =>{
  return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('user',userSchema);
