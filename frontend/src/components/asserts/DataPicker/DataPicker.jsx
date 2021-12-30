import style from './DataPicker.module.scss'
import arrowLeft from '../../../static/img/svg/arrowLeft.svg'
import arrowRight from '../../../static/img/svg/arrowRight.svg'
import {useEffect, useState} from "react";

let DataPicker = (props) => {
    let {setSelectedDate, ...other} = props
    let daysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }
    let [state, setState] = useState({
        date: new Date(),
        activeDay: new Date().getDate(),
        numberOfDays: daysInMonth(new Date()),
        arrowRightStatus: false,
    })

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    useEffect(() => {

    }, [state.arrowRightStatus])

    let prevMonth = () => {
        let date = new Date(state.date)
        date.setMonth(date.getMonth() - 1)
        setSelectedDate(new Date(date.getFullYear(),date.getMonth(), date.getDate()))
        setState({
            ...state,
            date: new Date(date),
            numberOfDays: daysInMonth(date),
            arrowRightStatus: true
        })
    }
    let nextMonth = () => {
        let date = new Date(state.date)
        date.setMonth(date.getMonth() + 1)
        if(date.getMonth() == new Date().getMonth() && date.getFullYear() == new Date().getFullYear()) {
            date.setDate(new Date().getDate())
        }
        if (date.getMonth() == new Date().getMonth() && date.getFullYear() == new Date().getFullYear()){

            setSelectedDate(new Date(date.getFullYear(),date.getMonth(), date.getDate()))
            setState({
                ...state,
                date: new Date(date.getFullYear(),date.getMonth(), date.getDate()),
                activeDay: date.getDate(),
                numberOfDays: daysInMonth(date),
                arrowRightStatus: false
            })
        } else if (date.getFullYear() <= new Date().getFullYear()) {
            setSelectedDate(new Date(date.getFullYear(),date.getMonth(), date.getDate()))
            setState({
                ...state,
                date: new Date(date.getFullYear(),date.getMonth(), date.getDate()),
                activeDay: date.getDate(),
                numberOfDays: daysInMonth(date),
                arrowRightStatus: true
            })
        }
            }
    let days = []
    for (let i = 1; i < new Date(state.date.getFullYear(), state.date.getMonth(), 1).getDay(); i++) {
        days.push('0')
    }

    for (let i = 1; i < state.numberOfDays; i++) {
        days.push(i)
    }


    function handleDayClick(day) {
        if (day != 0 && !(day > new Date().getDate() && state.date.getMonth() == new Date().getMonth() && state.date.getFullYear() == new Date().getFullYear())) {
            setSelectedDate(new Date(state.date.getFullYear(), state.date.getMonth(), day))
            setState({
                ...state,
                activeDay: day,
                date: new Date(state.date.getFullYear(), state.date.getMonth(), day)
            })
        }

    }

    days = days.map(day =>
        <div className={`${style.day} ${(state.activeDay == day) ? style.activeDay : null}`}
             onClick={() => handleDayClick(day)}>
            {(day == 0 || (day > new Date().getDate() && state.date.getMonth() == new Date().getMonth() && state.date.getFullYear() == new Date().getFullYear())) ? null : day}
        </div>)
    return (
        <div className={style.dataPicker}>
            <div className={style.month}>
                <img src={arrowLeft} alt="" onClick={() => prevMonth()}/>
                <div className={style.monthTitle}>{`${monthNames[state.date.getMonth()]}, ${state.date.getFullYear()} `}</div>
                <img src={arrowRight} alt="arrow" onClick={() => nextMonth()} className={!state.arrowRightStatus ? style.arrowDisabled : null}/>
            </div>
            <div className={style.weekDays}>
                <div className={style.weekDay}>
                    ПН
                </div>
                <div className={style.weekDay}>
                    ВТ
                </div>
                <div className={style.weekDay}>
                    СР
                </div>
                <div className={style.weekDay}>
                    ЧТ
                </div>
                <div className={style.weekDay}>
                    ПТ
                </div>
                <div className={style.weekDay}>
                    СБ
                </div>
                <div className={style.weekDay}>
                    ВС
                </div>
            </div>
            <div className={style.days}>
                {days}
            </div>
        </div>
    )
}
export default DataPicker;