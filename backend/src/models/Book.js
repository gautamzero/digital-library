import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    publicationYear:{
        type:Number,
        min: 0, 
        max: 3000,
        default: 2024
    },
    summary:{
        type:String,
        default: "some summary"
    },
},
{
    timestamps:true
});

export default mongoose.model("Book", BookSchema);