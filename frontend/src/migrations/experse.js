import {gql} from '@apollo/client'


export const CREATE_USER = gql`
   mutation createUser($input: UserInput) {
        createUser(input: $input) {
              id,username,phone ,name ,surname, token
        }
    }
    
`
export const CREATE_EXPERSE = gql`
   mutation createExperse($input: ExperseInput) {
        createExperse(input: $input) {
           date, category, sum
        }
    }
    
`
export const DELETE_EXPERSE = gql`
   mutation deleteExperse($input: ExperseInput) {
        deleteExperse(input: $input) {
           id,date,category, sum
        }
    }
    
`