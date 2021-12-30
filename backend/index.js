require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')
const {validateToken,generateAccessToken } = require("./jwt");
const config = require('config')
const Transaction = require('./models/Transaction')
const User = require('./models/User')
const PORT = process.env.PORT


const app = express()
app.use(cors())

const root = {
    getAllUsers: async () => {
        return await User.find()
    },
    getUserById: async (id) => {

        return await User.find( {id : id})
    },
    getAuth: async ({username, password}) => {
        let user = await User.findOne({ username : username, password : password})
        if (user) {
            let token = generateAccessToken(user.username)

            let Auth = {
                id: user.id,
                username: user.username,
                phone : user.phone,
                name : user.name,
                surname : user.surname,
                token : token
            }
            return Auth
        } else  {
            throw new Error("Пользователь с таким логином не существует, пожалуйста зарегестируйтесь!")
        }

    },
    validateToken : ({token}) => {
        if (validateToken(token)) {
            return true
        } else {
            return  false
        }

    },
    createUser: async ({input}) => {

        let user = await User.findOne({username : input.username})
        if(user) {
            throw new Error("Такой пользователь уже существует")
        } else {
            user = new User ({
                id: new Date().getTime(),
                username: input.username,
                password: input.password,
                phone: null,
                name: null,
                surname: null
            })
            user = await user.save()
            let Auth = {
                id: user.id,
                username: user.username,
                phone : user.phone,
                name : user.name,
                surname : user.surname,
                token : generateAccessToken(user.username)
            }
            return Auth
        }
    },
    getExperseByDates: async ({dates, intervalType, userId}) => {
        let Experses = await Transaction.find()
        switch (intervalType) {

            case "day" :

               return Experses.filter(exp => (exp.date.split(',')[0] === dates.split(',')[0] && exp.userId == userId))

            case "week" :
                let weekStart = parseStringToDate (dates.split('-')[0].split(',')[0])
                let weekEnd = parseStringToDate (dates.split('-')[1].split(',')[0])


                return Experses.filter(exp => (parseStringToDate (exp.date) >= weekStart && parseStringToDate (exp.date) <= weekEnd && exp.userId == userId))

            case "month" :
                    let monthMN = dates.split(',')[0]
                    let monthYR =dates.split(',')[1].trim()
                    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                    ];
                    monthMN = monthNames.findIndex(item  => item ===monthMN) +1;

                    return Experses.filter(exp =>{
                        return ((exp.date.split(/\.|\,/)[1] == monthMN) && (exp.date.split(/\.|\,/)[2] == monthYR) && exp.userId == userId)
                    } )
            case "year" :
                let yearYR =dates
                return Experses.filter(exp => ((exp.date.split(/\.|\,/)[2] == yearYR) && exp.userId == userId))
            case "all" :
                console.log("LLLL")
                console.log(Experses.filter(exp => exp.userId == userId))
                return Experses.filter(exp => exp.userId == userId)
            default :
                return {}
        }


    },
    createExperse: async ({input}) => {
        let sum;
        if (input.category < 0) {
            sum = parseInt(input.sum)
        } else {
            sum = -parseInt(input.sum)
        }
        let Experse = new Transaction ({
            id : input.id,
            date : input.date,
            category : parseInt(input.category),
            userId : input.userId,
            sum : sum
        })


        return await Experse.save()
    },
    deleteExperse: async ({input}) => {
        return await Transaction.find({id : input.id}).remove()
    },

}

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))

async function start() {
    try {
         mongoose.connect(process.env.MONGO_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log("-----")
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()



let parseStringToDate = (date) => {
    let parts = date.split(/[.,]/);
    let dd = parseInt(parts[0])
    let mm =parseInt(parts[1])-1

    let yyyy = parseInt(parts[2])
    return  new Date(yyyy, mm, dd);
}