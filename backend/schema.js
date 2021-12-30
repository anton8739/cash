const {buildSchema} = require('graphql')
const schema = buildSchema(`
    type User {
        id: ID
        username: String!
        password : String!
        phone : String
        name : String
        surname : String
    }
    type Auth {
        id: ID
        username: String
        phone : String
        name : String
        surname : String
        token : String
    }
     input UserInput {
        username: String!
        password : String!
        phone : String
        name : String
        surname : String
    }   
    type Experse {
        id: ID
        userId : ID
        date: String
        category : String
        sum : String
    }
     input ExperseInput {
        id: ID
        userId : ID
        date: String!
        category : String!
        sum : String!
    }

    type Query {
        getAllUsers: [User]
        getAuth(username: String, password: String) : Auth 
        validateToken(token : String) : Boolean   
        getUserById(id : ID) : User
        getUserByUsername(username: String) : User
        getExperseByDates(dates : String, intervalType: String, userId : ID) : [Experse]    
    }
    
    
    type Mutation {
        createExperse(input : ExperseInput) : Experse
         deleteExperse(input : ExperseInput) : Experse
         createUser ( input : UserInput) : Auth
    }
 

    
`)


module.exports = schema


/*
* query
*
* query {
  getAllUsers{
    id,username, name,
  }
}
*
* migration
*mutation {
  createUser(input : {
      username : "lox"
    password : "22222"
  }){
    id,username,name
  }
}
*
* */