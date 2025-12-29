import mongoose, {Schema, Document} from 'mongoose';
import bcrypt from 'bcrypt';

export interface Iuser extends Document {
       userName: string,
       password: string,
       email: string,
       conFirmPassword: string,

       VerificationCode: string, // isse otp type ka ek chiz hamm mail p send karenge okkh!..
       
       // Payment wala method lagega yha p okkh!..
      

       createdAt?: Date,
       updatedAt?: Date,
}

// yha p abb schema bna lo khud s okkh!..;

const userSchema = new Schema({
    userName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    confirmPassword: {type: String, required: true},

    VerificationCode: {type: String, required: true},  
     
    createdAt: {type: Date, required: true},
    updatedAt: {type: Date, required: true},
});

// ek prev hook bhi ayega like data and dataBase m jane s pehle ek prev mai check karenge ki kya chal rha hai actaully okkh!..;

userSchema.pre("save", async function (next){
     if(this.isModified("passWord")){
        this.password = await bcrypt.hash(this.password, 10);
     }
     next();
});

// dyhan dene wali bat this kabhi bhi arrow function k andar this ka use nahi lagta okkh!..; and use bhi nahi kar sakte okkh!.

const userModel = mongoose.models.users as mongoose.Model<Iuser> || mongoose.model<Iuser>('users', userSchema);

// ye above wala apna tarikha tha but isko actauuly hamm aise bhi likh sakte hai.. okkh!.;

//const User = models?.User || model<Iuser>("users", userSchema) aise bhi hamm actaully de sakte the okkh!..;

export default userModel;


// kahi bhi koi user agar ayega to uske pass do option honge hi honge like wo kharidega ya nahi and 
// wo jo platform p chize hai wo like kaisi hai free hai ya kaisi hi okkh!..

// Aur is case m hamm video ki bat agar karenge to video kis type ka hoga like pro hai ye demo ahi etc to yha bhi paymnet auth ka use case h okkh!..


// Bass yahi dhyan rakhio like ki paymentAuthentication ata hai jabb usme hamm payment wale m sara data rakhte hai okkh!
// but user ki bat agar karenge to generally user m do chize ayengi ki paid hai ya nahi and subcription plan okkh!..
// video m hamm subscription plan ayega okkh!...


