var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var bcyrpt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;
var userSchema = new Schema({
  email : {type: String, required:true, unique: true, lowercase: true},
  userName : {type: String, required:true, unique: true, lowercase: true},
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
