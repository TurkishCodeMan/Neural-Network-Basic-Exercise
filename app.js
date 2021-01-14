const express=require("express");
const app=express();
const bodyParser=require("body-parser")
const cors=require("cors");
const {connectDB}=require("./config/db");
const restaurant = require("./models/restaurant");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))






app.use("/api",require("./routes/restaurant"));
connectDB();
app.listen(3000,async (err)=>{
    if(err) throw err;

    restaurant.find().then(async restaurants=>{
        if(restaurants.length<1){
            const restaurantt=new restaurant({
                restaurantName:"Alinin Yeri",
          
            });
            const restaurant1=new restaurant({
                restaurantName:"Kebapçı Mesut",
            
            })
            const restaurant2=new restaurant({
                restaurantName:"Balık Evi",
            
            })

            restaurantt.days.push(1)
            restaurant1.days.push(1);
            restaurant2.days.push(2);
            await restaurantt.save();
            await restaurant1.save();
            await restaurant2.save();
        }
    })

    console.log("Listening on port 3000")


})








