import style from './Balance.module.scss'
import arrow_down from '../../../static/img/arrow-down.png';
import arrow_up from '../../../static/img/arrow-down.png';
import {useEffect, useState} from "react";
import RedButtom from "../../asserts/Buttons/RedButton/RedButtom";
import GreenButtom from "../../asserts/Buttons/GreenButtom/GreenButtom";
import Day from "./Day";
let BalanceDetails = (props) => {
    let [state, setState] = useState({
        openedId : null
    });
    let {status, selectedDaysArray} = props

    let handleClick = (event) => {
        let id =event.target.id.split('_')[1];
        if (id ===state.openedId) {
            setState({...state, openedId : null})
        } else {
            setState({...state, openedId : id})
        }
    }
    let dayList = []
    if(selectedDaysArray){
        let daySet = new Set(selectedDaysArray.map(item => item.date))
        daySet.forEach(day => {
            dayList.push({
                day: day,
                Experses : selectedDaysArray.filter(item => item.date == day)
            })
        })
    }
    dayList = dayList.map(day => <Day day={day} handleClick={handleClick}/>)
    if (dayList.length == 0){
        dayList =<div className={style.emptyDay}>Нет движений по счету в этот день!</div>
    }
    let BalanceDetailsStatus;
    if (status) {
        BalanceDetailsStatus = style.opened;
    } else {
        BalanceDetailsStatus = style.hidden;
    }



    useEffect(() => {
        document.querySelectorAll("[id^='dayItem']").forEach((item) => {
            let itemId = item.id.split('_')[1];
            if (itemId === state.openedId) {
                item.classList.add(style.opened);
                item.classList.remove(style.hidden);
            } else {
                item.classList.add(style.hidden);
                item.classList.remove(style.opened);
            }
        })
    }, [state.openedId])

    return (
        <div className={BalanceDetailsStatus + " " + style.balanceDetails}>
            {dayList}
            <div className={style.tabs}>
                <GreenButtom/>
                <RedButtom/>
            </div>
        </div>
    )
}
export default BalanceDetails;