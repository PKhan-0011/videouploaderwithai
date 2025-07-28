import mongoose, {Schema, Document} from 'mongoose';
import bcrypt from 'bcrypt';

export interface Iuser extends Document {
       userName: string,
       passWord: string,
       email: string,
       conFirmPassword: string,
       createdAt?: Date,
       updatedAt?: Date,
}

// yha p abb schema bna lo khud s okkh!..;

const userSchema = new Schema({
    userName: {type: String, required: true},
    passWord: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    confirmPassword: {type: String, required: true},
    createdAt: {type: Date, required: true},
    updatedAt: {type: Date, required: true},
});

// ek prev hook bhi ayega like data and dataBase m jane s pehle ek prev mai check karenge ki kya chal rha hai actaully okkh!..;

userSchema.pre("save", async function (next){
     if(this.isModified("passWord")){
        this.passWord = await  bcrypt.hash(this.passWord, 10);
     }
     next();
});

// dyhan dene wali bat this kabhi bhi arrow function k andar this ka use nahi lagta okkh!..; and use bhi nahi kar sakte okkh!.

const userModel = (mongoose.models.users as mongoose.Model<Iuser>) || (mongoose.model('users', userSchema));

// ye above wala apna tarikha tha but isko actauuly hamm aise bhi likh sakte hai.. okkh!.;

//const User = models?.User || model<Iuser>("users", userSchema) aise bhi hamm actaully de sakte the okkh!..;

export default userModel;







