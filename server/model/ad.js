const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    photos: [{}],
    price: { type: Number, maxLength: 255 },
    address:{type:String,required:true},
    bedrooms:Number,
    bathrooms:Number,
    landsize:Number,
    carpark:Number,
    location:{
        type:{
            type:String,
            enum:['point'],
            default:"Point"
        },
        coordinates:{
            type:[Number],
            default:[18.603058,73.732852]
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
        type:isObjectIdOrHexString,ref:'User'
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

export default model = ('Ad', schema);