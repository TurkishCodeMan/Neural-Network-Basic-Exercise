const express = require("express");

const router = express.Router();

const Restaurant = require("../models/restaurant");

const brain = require("brain.js");

function getDay(day) {

    if (day == 0) {
        return 'Pazar'
    }
    if (day == 1) {
        return 'Pazartesi'
    }
    if (day == 2) {
        return 'Sali'
    }
    if (day == 3) {
        return 'Carsamba'
    }
    if (day == 4) {
        return 'Persembe'
    }
    if (day == 5) {
        return 'Cuma'
    }
    if (day == 6) {
        return 'Cumartesi'
    }
}


router.get("/:day", async (req, res, next) => {
    try {
        let restaurants = await Restaurant.find();

        const trainingData = [];

        const days = []
        const restaurantNames = [];
        restaurants.forEach(element => {
            let i = 0;
            if (element.restaurantName) {
                restaurantNames.push({ name: element.restaurantName })
            }



            if (element.days.length > 1 && element.days) {
                let dayObject = {
                    days: []
                }
                element.days.forEach(() => {
                    let day = getDay(element.days[i]);

                    dayObject.days.push(day)
                    i++;
                })
                days.push(dayObject)

            }
            else {
                let day = getDay(element.days[i]);
                days.push(day)
                i++;
            }
        });

        console.log(days);
        console.log(restaurantNames)

        for (let i = 0; i < restaurantNames.length; i++) {

            if (days[i].days && days[i].days.length > 1) {
                days[i].days.forEach(day => {

                    trainingData.push({
                        input: { [day]: 1 },
                        output: { [restaurantNames[i].name]: 1 }
                    })
                })
            } else {
                trainingData.push({
                    input: { [days[i]]: 1 },
                    output: { [restaurantNames[i].name]: 1 }
                })

            }
        }

        console.log(trainingData)

        const net = new brain.NeuralNetwork({ hiddenLayers: [3, 3] });

        const stats = net.train(trainingData);
        console.log(net.run({ [getDay(req.params.day)]: 1 }))
        let result = net.run({ [getDay(req.params.day)]: 1 });
     
        return res.json(result)


    } catch (error) {
        return res.json({ message: "Server Error " + error.message });
    }
})

router.post("/save-restaurant", async (req, res, next) => {
    try {
        const restaurant = new Restaurant({
            restaurantName: req.body.restaurantName,
        })
        restaurant.days.push(req.body.days);
    } catch (error) {
        return res.json({ message: "Server Error " + error.message });
    }
})

module.exports = router