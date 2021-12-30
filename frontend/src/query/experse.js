import {gql} from '@apollo/client'

export const GET_EXPERSE_BY_DATE = gql`
    query getExperseByDates($dates : String, $intervalType : String, $userId : ID) {
     getExperseByDates(dates : $dates, intervalType : $intervalType, userId : $userId ) {
                     id, userId, date, category, sum
                }
    }
    
`
export const GET_AUTH = gql`
    query  getAuth($username : String, $password : String) {
            getAuth(username: $username, password: $password) {
                id,username,phone ,name ,surname, token
                }
    }
`

export const VALIDATE_TOKEN = gql`
    query  validateToken($token : String) {
            validateToken(token : $token)
    }
`