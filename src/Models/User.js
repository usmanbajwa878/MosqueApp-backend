const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber:{type:String,required:true},
    role:{type:String,required:true}//admin,moazan,user
});


module.exports = mongoose.model("Users", UserSchema)