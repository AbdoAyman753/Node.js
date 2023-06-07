const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema({
	email:{
		type:String,
		required:true,
		unique:true
	},
	password:{
		type:String,
		required:true,
		select:false
	},
})

userSchema.methods.checkPassword = async function(password){
	const isMatch = await bcrypt.compare(password,this.password);
	return isMatch;
}
const User = mongoose.model('User',userSchema);
module.exports = User;