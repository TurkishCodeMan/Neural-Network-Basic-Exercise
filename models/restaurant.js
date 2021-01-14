const mongoose=require("mongoose");


const restaurantSchema=mongoose.Schema({
    restaurantName:{type:String},
    days:[
        {type:Number}
    ]
})


module.exports=mongoose.model("Restaurant",restaurantSchema);