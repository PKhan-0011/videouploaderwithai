// Yha p jo entry hogi wo to smjh lo general hai ye hona hi tha okkh!..
// bcz ye paymet authentciation wali bat chit hai yha p hona hi tha ye same entry har jagah chl jayegi okkh!...

// userId, VideoId, cureency, amount, status, provider, transactionId, createdAt..

import mongoose, {Schema, Document} from 'mongoose';

export interface paymentMethod extends Document{

     userId: mongoose.Types.ObjectId,
     videoId?: mongoose.Types.ObjectId,
     amount: number,
     currency: string,
     status: "PENDING" | "SUCCESS" | "FAILED",
     provider: "STRIPE" | "RAZORPAY",
     transactionId: string,
     createdAt?: Date,

}

export const paymentSchema: Schema<paymentMethod> = new Schema<paymentMethod>({

        userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users'}, // relationship hai ye ek user multiple video upoad kar sakta hai one-many realtioship..
        videoId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'videos'},
        amount: {type: Number, required: true},
        currency: {type: String, required: true},
        status: {type: String, required: true, enum: ["PENDING", "SUCCESS", "FAILED"],  default: "PENDING"},
        provider: {type: String, reuqired: true, enum: ["STRIPE", "RAZORPAY"]},
        transactionId: {type: String, required: true},
        createdAt: {type: Date, default: Date.now()}

});


// model create karo iska..

export const paymentModel = (mongoose.models.payments as mongoose.Model<paymentMethod>) || (mongoose.model<paymentMethod>("payments", paymentSchema));


// ye wala jo payment Schema h wo har jagah kaam ayega okkh!. like ye wala userID, videoId, amount, currency, transactionId, stausu, provider, craetedAt.., 

// Yha p hamm userId and videoId ki bat agar karenge to wha k samjh l realtaionship hai ek tarikhe ka to wha bhi hamm kuch paymnet ka use jarror karngeokkh!..

