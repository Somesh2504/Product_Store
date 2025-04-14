import mongoose  from "mongoose";

const productSchema=mongoose.Schema({
    "Name":{
        type:String,
        required:true
    },
    "Price":{
        type:Number,
        required:true
    },
    "Image":{
        type:String,
        required:true
    }
},{timestamps:true})

const product=mongoose.model('Product',productSchema)

export default product