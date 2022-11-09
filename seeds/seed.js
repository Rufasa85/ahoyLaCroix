const sequelize = require("../config/connection");
const { User,Flavor } = require("../models");

const seeds = async()=>{
    try {
        await sequelize.sync({force:true});
        const users = await User.bulkCreate([
            {
                username:"bahamutTheCat",
                email:"cat@joe.joe",
                password:"iLoveTuna123",
                bio:"I am a  very friendly cat who like to go on adventures to the porch and basement!"
            },
            {
                username:"ShivaToo",
                email:"cat2@joe.joe",
                password:"meowmeow",
                bio:"I am shy around people I dont know but fiercely loyal to those I love. Also, just let me chew the cables!"
            },
            {
                username:"laCroixBoi",
                email:"dood@joe.joe",
                password:"password",
                bio:"I have very strong opinions on la croix flavors!"
            }
        ],{
            individualHooks:true
        })
        const flavors = await Flavor.bulkCreate([
            {
                name:"Beach Plum",
                pic:"https://www.lacroixwater.com/wp-content/uploads/2021/03/IMG-Beach-Plum-821.png"
            },
            {
                name:"Limoncello",
                pic:"https://www.lacroixwater.com/wp-content/uploads/2020/01/LIMONCELLO.png"
            },
            {
                name:"Coconut",
                pic:"https://www.lacroixwater.com/wp-content/uploads/2019/01/COCONUT.png"
            },
        ])
        console.log(users[0].toJSON());
        console.log(flavors[1].toJSON());
        process.exit(0);
    }catch(err){
        console.log(err)
        process.exit(1);
    }
}

seeds();