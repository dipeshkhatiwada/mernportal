const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

 var userSchema = new mongoose.Schema({
  name:   {
    type:String,
    required:true,
    maxlength:32,
    trim:true,
  },
  email:   {  
    type:String,
    trim:true,
    required:true,
    unique:true
  },
  user_info:    {
      type:String,
      trim:true,
  },
  encrypt_password:  {
    type:String,
    required:true,
  },
  salt:String,
  photo: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
},
{timestamps:true}
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encrypt_password = this.securePassword(password);
  })
  .get(function() {
    return this._password
  });

userSchema.methods = {
  autheticate: function(plainpassword) {
    return this.securePassword(plainpassword) === this.encrypt_password;
  },
  securePassword: function(plainpassword){
    if (!plainpassword) return "";
    try{
      return crypto.createHmac('sha256', this.salt)
      .update(plainpassword)
      .digest('hex');

    }catch(err){
      return "404";
    }
  }
};

module.exports = mongoose.model("User",userSchema);