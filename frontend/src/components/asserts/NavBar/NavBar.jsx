import style from './NavBar.module.scss'
import Logo from "../Logo/Logo";
import leftBtn from '../../../static/img/leftBtn.png';
import rightBtn from '../../../static/img/rightBtn.png';
import settings from '../../../static/img/settings.png';
import category from '../../../static/img/category.png';
import exit from '../../../static/img/exit.png';
import {NavLink} from "react-router-dom";
import BlackButton from "../Buttons/BlackButton/BlackButton";
import YellowButtom from "../Buttons/YellowButtom/YellowButtom";
import {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";

import {
    setCurrentInterval,
    setDataVisiability,
    setIntervalVisiability,
    setNavBarStatus
} from "../../../redux/reducers/mainPageReducer";
import {
    getCurrentAllInterval,
    getCurrentDate,
    getCurrentMonthInterval,
    getCurrentWeekInterval,
    getCurrentYearInterval
} from "../../../utils/utils";
import Cookies from 'universal-cookie';
import {setAuth} from "../../../redux/reducers/authReducer";
const cookies = new Cookies();



let mapStateToProps = (state) => {
    return {
        intervalType : state.main.intervalType,
        dataSetWindowVisiability : state.main.dataSetWindowVisiability,
        intervalSetWindowVisiability : state.main.intervalSetWindowVisiability,
        leftMenuStatus :state.main.navBarStatus.leftMenuStatus,
        rightMenuStatus : state.main.navBarStatus.rightMenuStatus,
    }
}


let NavBar = (props) => {
    let {setCurrentInterval, intervalType, dataSetWindowVisiability,setDataVisiability,setIntervalVisiability,leftMenuStatus, rightMenuStatus,setNavBarStatus,setAuth, ...other} = props
    let leftHiddenRef = useRef();
    let rightHiddenRef = useRef();
    let hiddenBackground =useRef();

    let handleLeftBtnClick = () => {

        if (!leftMenuStatus) {
            document.querySelector("#diagramImg").style.zIndex ="-1"
            setNavBarStatus({
                leftMenuStatus : true, rightMenuStatus : false
            })

        } else  {
            document.querySelector("#diagramImg").style.zIndex ="1"
            setNavBarStatus({
                leftMenuStatus : false, rightMenuStatus : false
            })
        }
    }

    let handleRightBtnClick = () => {
        if (!rightMenuStatus) {
            document.querySelector("#diagramImg").style.zIndex ="-1"
            setNavBarStatus({
                rightMenuStatus : true,leftMenuStatus : false
            })
        } else  {
            document.querySelector("#diagramImg").style.zIndex ="1"
            setNavBarStatus({
                rightMenuStatus : false,leftMenuStatus : false
            })
        }

    }
    useEffect(() => {
        if (leftMenuStatus) {
            leftHiddenRef.current.style.transform = "translateX(0)";
        }  else  {
            leftHiddenRef.current.style.transform = "translateX(-100%)"
        }
        if (rightMenuStatus) {
            rightHiddenRef.current.style.transform = "translateX(0)"
        }
        else  {
            rightHiddenRef.current.style.transform = "translateX(100%)"
        }
        if (leftMenuStatus || rightMenuStatus) {
            hiddenBackground.current.style.opacity = "0.4";
            hiddenBackground.current.style.visibility= "visible";
        } else  {
            hiddenBackground.current.style.opacity = "0";
            hiddenBackground.current.style.visibility= "hidden";
        }
    }, [leftMenuStatus, rightMenuStatus])


    return (
        <div className={style.nav}>
            <div className={style.leftBtn} onClick={() => handleLeftBtnClick() }>
                <img src={leftBtn} alt="leftBtn"/>
            </div>
            <NavLink to="/" className={style.logo}>
                <Logo/>
            </NavLink>
            <div className={style.rightBtn}  onClick={() => handleRightBtnClick()}>
                <img src={rightBtn} alt="rightBtn"/>
            </div>
            <div ref={hiddenBackground} className={style.HiddenBackground}></div>
            <div className={style.leftHidden} ref={leftHiddenRef}>
                <div className={style.leftHiddedItem} onClick={() => {
                    document.querySelector("#diagramImg").style.zIndex ="1"
                    setNavBarStatus({
                        rightMenuStatus : false,leftMenuStatus : false
                    })
                    setCurrentInterval(getCurrentDate(),"day")}}>
                    {intervalType ==="day" ? <BlackButton text="День" /> : <YellowButtom text="День" />}
                </div>
                <div className={style.leftHiddedItem} onClick={() =>
                {
                    document.querySelector("#diagramImg").style.zIndex ="1"
                    setNavBarStatus({
                        rightMenuStatus : false,leftMenuStatus : false
                    })
                    setCurrentInterval(getCurrentWeekInterval(),"week")}}>
                    {intervalType ==="week" ? <BlackButton text="Неделя" /> : <YellowButtom text="Неделя" />}
                </div>
                <div className={style.leftHiddedItem} onClick={() =>
                {
                    document.querySelector("#diagramImg").style.zIndex ="1"
                    setNavBarStatus({
                        rightMenuStatus : false,leftMenuStatus : false
                    })
                    setCurrentInterval(getCurrentMonthInterval(),"month")}}>
                    {intervalType ==="month" ? <BlackButton text="Месяц" /> : <YellowButtom text="Месяц" />}
                </div>
                <div className={style.leftHiddedItem} onClick={() =>
                {
                    document.querySelector("#diagramImg").style.zIndex ="1"
                    setNavBarStatus({
                        rightMenuStatus : false,leftMenuStatus : false
                    })
                    setCurrentInterval(getCurrentYearInterval(),"year")}}>
                    {intervalType ==="year" ? <BlackButton text="Год" /> : <YellowButtom text="Год" />}
                </div>
                <div className={style.leftHiddedItem} onClick={() =>
                {
                    document.querySelector("#diagramImg").style.zIndex ="1"
                    setNavBarStatus({
                        rightMenuStatus : false,leftMenuStatus : false
                    })

                    setCurrentInterval(null,"all")}}>
                    {intervalType ==="all" ? <BlackButton text="Все" /> : <YellowButtom text="Все" />}
                </div>
                <div className={style.leftHiddedItem} onClick={() =>
                {

                    setIntervalVisiability(true)}}>
                    {intervalType ==="custom" ? <BlackButton text="Интервал" /> : <YellowButtom text="Интервал" />}
                </div>
                <div className={style.leftHiddedItem} onClick={() =>
                {

                    setDataVisiability(true)}}>
                    {intervalType ==="chosen" ? <BlackButton text="Выбор даты" /> : <YellowButtom text="Выбор даты" />}
                </div>
            </div>
            <div className={style.rightHidden} ref={rightHiddenRef}>
                {/*  <NavLink to="/" className={style.rightHiddenItem}>
                    <img src={settings} alt=""/>
                    <div className={style.rightHiddenItemText}>
                        Категории
                    </div>

                </NavLink>
                <NavLink to="/" className={style.rightHiddenItem}>
                    <img src={category} alt=""/>
                    <div className={style.rightHiddenItemText}>
                        Настройки
                    </div>

                </NavLink>
            */}
                <NavLink to="/login" className={style.rightHiddenItem} onClick={() => {
                    cookies.remove('auth')
                    setAuth(  {
                        auth : null,
                        isAuthenticated: false,
                    })
                }}>
                    <img src={exit} alt=""/>
                    <div className={style.rightHiddenItemText}>
                        Выход
                    </div>

                </NavLink>
            </div>

        </div>
    )
}

export default connect(mapStateToProps,{setCurrentInterval, setDataVisiability,setIntervalVisiability,setNavBarStatus,setAuth})(NavBar);