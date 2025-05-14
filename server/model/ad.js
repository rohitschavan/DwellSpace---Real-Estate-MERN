import mongoose from "mongoose";
const { isObjectIdOrHexString } = mongoose;

const schema = new mongoose.Schema({
    photos: [{}],
    price: { type: Number, maxLength: 255 },
    address:{type:String,required:true},
    bedrooms:Number,
    bathrooms:Number,
    landsize:String,
    carpark:Number,
    location:{
        type:{
            type:String,
            enum:['Point'],
            default:"Point"
        },
        coordinates:{
            type:[Number],
            default:[73.732852,18.603058]
        },
    },
    title:{
        type:String
    },
    slug:{
        type:String,
        lowercase:true,
        unique:true,
    },
    description:{},
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,ref:'User'
    },
    sold:{type:Boolean,default:false},
    googleMap:{},
    type:{
    type:String,
    default:'Other'
    },
    action:{
        type:String,
        default:'Sell',
    },
    views:{
        type:Number,
        default:0,
    },


},{timestamps:true})


schema.index({location:'2dsphere'})

export default mongoose.model('Ad', schema);