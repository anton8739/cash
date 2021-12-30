import style from './Balance.module.scss'
import arrow_down from "../../../static/img/arrow-down.png";
import Experse from "./Experse";
import {useState} from "react";
import {connect} from "react-redux";
let Day = (props) => {
    let getTotalBalance = (Experses) => {
        let total = 0;

        Experses.forEach(item => {
            total += parseFloat(item.sum);
        })
        return total
    }

    let Experses = props.day.Experses.map(item =><Experse item={item} />)
    let number = 0;
    if (Experses.length > 1) {
        number = props.day.Experses.map( item => Number(item.sum) ).reduce((prev,cur) => {
                     return prev + cur
        });
    } else  {
        number = props.day.Experses[0].sum
    }


    return(  <div className={style.day} >
        <div className={style.dayTitle}>
            <img  id={`day_${props.day.day}`} src={arrow_down} alt="down" onClick={(event) => props.handleClick(event)}/>
            <div className={style.dayDate}>
                {props.day.day}
            </div>
            <div className={style.dayItemNumber}>
                {props.day.Experses.length}
            </div>
            <div className={number > 0 ? style.totalCountPositive : style.totalCountNegative}>
                {number} BYN
            </div>
        </div>
        <div id={`dayItem_${props.day.day}`}  className={style.dayHidden} >
            {Experses}
        </div>
    </div>)
}

let mapStateToProps = (state) => {
    return {
        total: state.main.total,

    }
}
export default connect(mapStateToProps, {})(Day)