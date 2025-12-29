import mongoose, {Document, Schema} from 'mongoose';

export const Video_Dimension = {
    height: 1080,
    width: 1080
}

export interface IVideo extends Document{
    id: mongoose.Types.ObjectId,
    title: string,
    description: string,
    videoUrl: string,
    thumbnailUrl: string,
    controls?: boolean,
    transformation?: {
          height: number,
          width:  number,
          quality: number
    },

    // agar koi video hai usme hamm yahi dekhte hai ki wo ksi type ka hai okkh!..
    
}

const videoSchema: Schema<IVideo> = new Schema({
     id: {type: 'ObjectId', required: true},
     title: {type: String, required: true },
     description: {type: String, required: true},
     videoUrl: {type: String, required: true},
     thumbnailUrl: {type: String, required: true},
     controls: {type: Boolean, required: true},
     transformation: {
        height: {type: Number, default: Video_Dimension.height},
        width: {type: Number,  default: Video_Dimension.width},
        quality: {type: Number, min: 1, max: 100}
     },
})



// yha koi password ya kuch alg sa nahi h hash karne k liye okkh!..;


export const videoModel = (mongoose.models.videos as mongoose.Model<IVideo>) || (mongoose.model<IVideo>('videos', videoSchema))

// default: Video_Dimension.height},
// width: {type: Number, default: Video_Dimension.width
// for pasword hashing before gong further...

