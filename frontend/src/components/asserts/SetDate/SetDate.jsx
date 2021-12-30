import style from './SetDate.module.scss'
import {useEffect, useState} from "react";
import editImg from '../../../static/img/svg/pencil.svg'
import BlackButton from "../Buttons/BlackButton/BlackButton";
import YellowButtom from "../Buttons/YellowButtom/YellowButtom";
import {connect} from "react-redux";
import {setCurrentInterval, setDataVisiability, setNavBarStatus} from "../../../redux/reducers/mainPageReducer";
import DataPicker from "../DataPicker/DataPicker";
import {dateToString} from "../../../utils/utils";


let mapStateToProps = (state) => {
    return {

        dataSetWindowVisiability : state.main.dataSetWindowVisiability
    }
}

let SetDate = (props) => {
    let {dataSetWindowVisiability,setDataVisiability,setCurrentInterval,setNavBarStatus, ...other} = props
    const [selectedDate, setSelectedDate] = useState(new Date());



    return (
        <div className={props.visibility ? `${style.wrapper} ${style.active}` : style.wrapper}>
            <div className={props.visibility ? `${style.setDate} ${style.active}` : style.setDate}>
                <div className={style.header}>
                    <div className={style.title}>
                        Выберите дату
                    </div>

                </div>
                <div className={style.calendar}>
                    <DataPicker setSelectedDate={setSelectedDate}/>
                </div>
                <div className={style.bottomBar}>
                    <div onClick={() => setDataVisiability(false)}>
                        <BlackButton text={"Отмена"}/>
                    </div>
                    <div onClick={() => {
                        document.querySelector("#diagramImg").style.zIndex ="1"
                        setDataVisiability(false)
                        setNavBarStatus({
                            rightMenuStatus : false,leftMenuStatus : false
                        })
                        setCurrentInterval(dateToString(selectedDate), "day")
                    }}>
                        <YellowButtom text={"Ок"}/>
                    </div>
                </div>
            </div>
        </div>
        )
}
export default connect(mapStateToProps, {setDataVisiability,setCurrentInterval,setNavBarStatus})(SetDate)