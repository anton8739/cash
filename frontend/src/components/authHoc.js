import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";


export let authHoc = (Compoment) => {

    let CheckAuthComponent = (props) => {

        if (!props.login) {
            return <Compoment {...props}/>
        } else {
            return <Redirect to="/login"></Redirect>
        }
    }
    let mapStateToProps = (state) => {
        return {
            token : state.auth.login
        }
    }
    return connect (mapStateToProps, {}) (CheckAuthComponent);
}
