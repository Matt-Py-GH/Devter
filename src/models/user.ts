import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    username:{type: String,required: [true, "username required"],
              minLength:[3, "Min length is 3"],maxLength:[50, "Max length is 50"]},
              
    password:{type: String, select: false, required: [true, "Password required"]},

    email:{type: String,unique:true,required: [true, "Email required"]},


})

const User = models.user || model('user', UserSchema);
export default User;