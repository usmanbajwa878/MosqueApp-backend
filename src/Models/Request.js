const mongoose = require("mongoose");

const requestSchema = mongoose.Schema({
  requestId: mongoose.Types.ObjectId,
  name: { type: String, required: true },
  image:{type:String,required:true},
  status:{type:String,required:true},//approved,live,pending
  latitude:{type:String,required:true},
  longitude:{type:String,required:true},
  moazan:{type:Object,required:true},
  city:{type:String,required:true},
  country:{type:String,required:true},
  zipCode:{type:String,required:true},
  facilites:{type:Array,required:true},
  phoneNumber:{type:String,required:true},
  location:{type:String,required:true},
  emailAddress:{type:String},
  timings:{type:Array},
  slideShowImages:{type:Array},
  ramzanImage:{type:Array},
  requestedBy:{type:String,required:true}
});



module.exports = mongoose.model("Requests", requestSchema);
