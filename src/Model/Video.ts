import mongoose, {Schema, Document} from 'mongoose';

export const Video_Dimension = {
    height: 1080,
    width: 1000,
} as const;

// yha s interface bna lo iske okkh!..;

export interface Video extends Document {
    _id: mongoose.Types.ObjectId,
    title: string,
    description: string,
    VideoUrl: string,
    thumbNailUrl: string,
    controls?: boolean,
    transformation?: {
        height: number,
        width: number,
        quality: number,
    }
}

const videoSchema: Schema<Video> = new Schema<Video>({
    title: {type: String, required: true},  
    description: {type: String, required: true},  
    VideoUrl: {type: String, required: true},  
    thumbNailUrl: {type: String, required: true},
    controls: {type: Boolean, default: true},
    transformation: {
        height: {type: Number, default: Video_Dimension.height},
        width: {type: Number, default: Video_Dimension.width},
        quality: {type: Number, min: 1, max: 100},
    }
}, {timestamps: true});

// yha koi password ya kuch alg sa nahi h hash karne k liye okkh!..;

const videoModel = (mongoose.models.videos as mongoose.Model<Video>) || (mongoose.model<Video>("videos", videoSchema));

export default videoModel;


