import style from "./Balance.module.scss";
import {connect} from "react-redux";
import exit from '../../../static/img/svg/gg_close.svg'
import {useEffect, useState} from "react";
import {useMutation} from "@apollo/client";
import {DELETE_EXPERSE} from "../../../migrations/experse";
import {setSelectedDaysArray, setTotal} from "../../../redux/reducers/mainPageReducer";



let mapStateToProps = (state) => {
    return {
        categoryTitles : state.main.categoryTitles,
        selectedDaysArray : state.main.selectedDaysArray,
        total : state.main.total
    }
}

let Experse = (props) => {

    const [deleteExperse] = useMutation(DELETE_EXPERSE)

    let id = props.item.id;
    let date = props.item.date
    let category = props.item.category
    let sum = props.item.sum

    let  handleClick = async (e) => {

        let response = await deleteExperse({
            variables: {
                input: {
                    id, date, category, sum
                }
            }
        })
     //   props.setTotal(props.total - sum)
       props.setSelectedDaysArray(props.selectedDaysArray.filter(item => item.id != id))
    }
    return(
        <div className={style.dayItem}>
            <img src={exit} alt="exit" className={style.exit} onClick={(e) => handleClick(e)}/>
            <div className={props.item.sum > 0 ? style.dayItemStatusPositive : style.dayItemStatusNegative}></div>
            <div className={style.dayItemTitle}>{props.item.category == -1 ? "Доход" : props.categoryTitles [props.item.category]}</div>
            <div className={style.dayItemCost}>{props.item.sum} BYN</div>
        </div>
    )
}
export default connect(mapStateToProps, {setSelectedDaysArray, setTotal})(Experse)