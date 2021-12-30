import style from './SetInterval.module.scss'
import {useEffect, useRef, useState} from "react";
import editImg from '../../../static/img/svg/pencil.svg'
import BlackButton from "../Buttons/BlackButton/BlackButton";
import YellowButtom from "../Buttons/YellowButtom/YellowButtom";
import {connect} from "react-redux";
import {
    setCurrentInterval,
    setDataVisiability,
    setIntervalVisiability,
    setNavBarStatus
} from "../../../redux/reducers/mainPageReducer";
import DataPicker from "../DataPicker/DataPicker";
import {dateToString, parseStringToDate} from "../../../utils/utils";


let mapStateToProps = (state) => {
    return {}
}

let SetInterval = (props) => {
    let {setIntervalVisiability,setCurrentInterval,setNavBarStatus, ...other} = props
    let dataPicker1 = useRef();
    let dataPicker2 = useRef();
    let [state, setState] = useState({
        start: dateToString(new Date()),
        end: dateToString(new Date()),
        error : null
    });
    let setDataPickerVisiability = (element) => {
        console.log(element.current.style)
        if (!element.current.style.visibility) {
            element.current.style.visibility = "visible"
            element.current.style.maxHeight = "1000px"
            element.current.style.opacity = "1"
            element.current.style.transition = "max-height 1s ease-in-out, opacity 0.5s 0.5s ease-in-out"
        } else if (element.current.style.visibility == "hidden") {
            element.current.style.visibility = "visible"
            element.current.style.maxHeight = "1000px"
            element.current.style.opacity = "1"
            element.current.style.transition = "max-height 1s ease-in-out, opacity 0.5s 0.5s ease-in-out"
        } else {
            element.current.style.visibility = "hidden"
            element.current.style.maxHeight = "0"
            element.current.style.opacity = "0"
            element.current.style.transition = "max-height 0.1s ease-in-out, opacity 0.1s 0.1s ease-in-out"
        }


    }
    let setSelectedDateStart = (date) => {
        setState({
            ...state,
            start: dateToString(date)
        })
    }
    let setSelectedDateEnd = (date) => {
        setState({
            ...state,
            end: dateToString(date)
        })
    }
    let validateInterval = () => {
        if (parseStringToDate(state.start) > parseStringToDate(state.end)) {
            setState({...state, error: "Начало интервала не может быть позже конца"})
            return "Начало интервала не может быть позже конца"
        } else {
            setState({...state, error: null})
            return null
        }

    }

    return (
        <div className={props.visibility ? `${style.wrapper} ${style.active}` : style.wrapper}>
            <div className={props.visibility ? `${style.setDate} ${style.active}` : style.setDate}>
                <div className={style.header}>
                    <div className={style.title}>
                        Выберите интервал
                    </div>

                </div>
                <div className={style.calendar}>
                    <div className={style.calendarItem}>
                        <div className={style.calendarText}>{`От: ${state.start} `}</div>
                        <img src={editImg} alt="edit" onClick={() => setDataPickerVisiability(dataPicker1)}/>

                    </div>
                    <div className={style.dataPickerWrapper} ref={dataPicker1} >
                        <DataPicker setSelectedDate={setSelectedDateStart}/>
                    </div>
                    <div className={style.calendarItem}>
                        <div className={style.calendarText}>{`До: ${state.end} `}</div>
                        <img src={editImg} alt="edit" onClick={() => setDataPickerVisiability(dataPicker2)}/>
                    </div>
                    <div className={style.dataPickerWrapper} ref={dataPicker2} >
                        <DataPicker setSelectedDate={setSelectedDateEnd} onDataClick = {() => {}}/>
                    </div>
                </div>
                <div className={style.error}>
                    {state.error}
                </div>
                <div className={style.bottomBar}>
                    <div onClick={() => setIntervalVisiability(false)}>
                        <BlackButton text={"Отмена"}/>
                    </div>
                    <div onClick={() => {
                        let error = validateInterval()

                        if (!error) {
                            document.querySelector("#diagramImg").style.zIndex ="1"
                            setIntervalVisiability(false)
                            setNavBarStatus({
                                rightMenuStatus : false,leftMenuStatus : false
                            })
                            let interval=`${state.start}-${state.end}`
                            console.log(parseStringToDate(state.start) )
                            console.log( parseStringToDate(state.end))
                            let start =parseStringToDate(state.start)
                            let end = parseStringToDate(state.end)
                            if (start.getFullYear() == end.getFullYear() && start.getMonth() == end.getMonth() && start.getDate() ==end.getDate()) {
                                setCurrentInterval(state.start,"day")
                            } else {
                                setCurrentInterval(interval,"week")
                            }

                        }

                    }}>
                        <YellowButtom text={"Ок"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default connect(mapStateToProps, {setIntervalVisiability,setCurrentInterval,setNavBarStatus})(SetInterval)