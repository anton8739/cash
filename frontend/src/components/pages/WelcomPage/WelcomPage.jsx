import React, {useEffect, useRef, useState} from "react";

import style from './WelcomPage.module.scss'

import YellowButtom from "../../asserts/Buttons/YellowButtom/YellowButtom";
import {useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const WelcomPage = (props) => {

    const navigate = useNavigate();
    return (
        <div className={style.page}>
            <div className={style.cart}>
                <div className={style.text}>
                    Добро пожаловать, {cookies.get('auth') ? cookies.get('auth').username : null}. Вы успешно зарегестрированы в приложении Cash!
                    Можете приступить к учету личных финансов.
                </div>
                <div className={style.sucReg}>
                    <div onClick={() => navigate("/")}>
                        <YellowButtom text="Продолжить"/>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default WelcomPage;