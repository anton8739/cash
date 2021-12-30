import {useLocation, Navigate} from "react-router-dom";
import {matchPath} from 'react-router';
import {useQuery} from "@apollo/client";
import {VALIDATE_TOKEN} from "../query/experse";
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import Cookies from 'universal-cookie';
import {setAuth} from "../redux/reducers/authReducer";

const cookies = new Cookies();


let RequireAuth = (props) => {
    let {children} = props
    let authorithation = cookies.get('auth')
    let token = null
    if (authorithation) {
        token = authorithation.token
    }
    const {pathname} = useLocation();
    const {data: auth, loading: loading, refetch: refetch} = useQuery(VALIDATE_TOKEN, {
        variables: {
            token: token
        }
    })

    let [component, setComponent] = useState(children);
    useEffect(() => {

        if (auth && auth.validateToken == false) {
            if (cookies.get('auth')) {
                cookies.remove('auth')
            }
            if (pathname != "/login") {
                setComponent(<Navigate
                    to="/login" done={"dasd"}/>)
            }
        } else if (auth && auth.validateToken == true) {

            props.setAuth({
                auth: cookies.get('auth'),
                isAuthenticated: true
            })
            setComponent(children)
        }

    }, [auth, pathname])
    return (component)

}
const mapStateToProps = (state) => {
    return {}

}

export default connect(mapStateToProps, {setAuth})(RequireAuth)