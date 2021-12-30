import style from './CustomFooter.module.scss'
import arrow from '../../../../static/img/arrow.png';
import {useEffect, useState} from "react";
import BalanceDetails from "../../../pages/BalanceDetails/BalanceDetails";
import {connect} from "react-redux";
import {setTotal} from "../../../../redux/reducers/mainPageReducer";





let mapStateToProps = (state) => {
    return {
        currentInterval : state.main.currentInterval,
        intervalType : state.main.intervalType,
        selectedDaysArray : state.main.selectedDaysArray,
        total : state.main.total
    }
}

let CustomFooter = (props) => {
    let { currentInterval,intervalType,selectedDaysArray, total,setTotal,...other} = props
    let [state, setState] = useState({
        hiddenMenu : false
    })

    function handleClick() {
        setState({...state, hiddenMenu : !state.hiddenMenu})
        if (state.hiddenMenu) {
            document.querySelector('body').style.overflow = 'auto';
        } else  {
            document.querySelector('body').style.overflow = 'hidden';
        }
    }
    useEffect(()=> {

    }, [state.hiddenMenu])
    useEffect(() => {
        if(selectedDaysArray) {

         /*   setTotal(selectedDaysArray.map( item => Number(item.sum) ).reduce((prev,cur) => {
                return prev + cur
            }))*/
            props.refetch()
        }
    }, [selectedDaysArray])
    return (
        <div>
            <BalanceDetails status={state.hiddenMenu} selectedDaysArray={selectedDaysArray}/>
            <div className={style.footer}>
                <div className={props.total>0 ? style.positiveBalance :  style.negativeBalance}>
                    <div className={style.text}>Баланс {props.total} BYN</div>
                    <div className={style.icon} onClick={() => handleClick()}>
                        <img src={arrow} alt="arrow"/>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default connect(mapStateToProps, {setTotal})(CustomFooter);