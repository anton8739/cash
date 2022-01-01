import React, {useEffect, useRef, useState} from "react";
import style from './MainPage.module.scss'
import NavBar from "../../asserts/NavBar/NavBar";

import GreenButtom from "../../asserts/Buttons/GreenButtom/GreenButtom";
import RedButtom from "../../asserts/Buttons/RedButton/RedButtom";
import CustomFooter from "../../asserts/Footer/CustomFooter/CustomFooter";
import {Chart} from "chart.js";

import arrowLeft from '../../../static/img/svg/arrowLeft.svg'
import arrowRight from '../../../static/img/svg/arrowRight.svg'
import icon1 from '../../../static/img/categoryIcon/akar-icons_phone.svg';
import icon2 from '../../../static/img/categoryIcon/ant-design_home-outlined.svg';
import icon3 from '../../../static/img/categoryIcon/bx_bx-drink.svg';
import icon4 from '../../../static/img/categoryIcon/bytesize_gift.svg';
import icon5 from '../../../static/img/categoryIcon/cil_car-alt.svg';
import icon6 from '../../../static/img/categoryIcon/cil_taxi.svg';
import icon7 from '../../../static/img/categoryIcon/clarity_shopping-cart-line.svg';
import icon8 from '../../../static/img/categoryIcon/fluent_animal-cat-28-regular.svg';
import icon9 from '../../../static/img/categoryIcon/ic_baseline-sports-handball.svg';
import icon10 from '../../../static/img/categoryIcon/ic_outline-directions-railway-filled.svg';
import icon11 from '../../../static/img/categoryIcon/la_tshirt.svg';
import icon12 from '../../../static/img/categoryIcon/mdi_toothbrush-paste.svg';
import icon13 from '../../../static/img/categoryIcon/ph_fork-knife.svg';
import icon14 from '../../../static/img/categoryIcon/uil_bill.svg';
import {useQuery} from "@apollo/client";
import {GET_EXPERSE_BY_DATE} from "../../../query/experse";
import {connect} from "react-redux";
import {
    setActiveIcon,
    setCurrentInterval, setDataCount,
    setDataSets,
    setLegend, setSelectedDaysArray,
    setTotal
} from "../../../redux/reducers/mainPageReducer";
import {

    getCurrentDate, getCurrentMonthInterval, getCurrentWeekInterval, getCurrentYearInterval,
    nextCurrentDate, parseStringToDate,
    prevCurrentDate
} from "../../../utils/utils";
import SetDate from "../../asserts/SetDate/SetDate";
import SetInterval from "../../asserts/SetInterval/SetInterval";


let mapStateToProps = (state) => {
    return {
        legend: state.main.legend,
        total: state.main.total,
        activeIcon: state.main.activeIcon,
        datasetsData: state.main.datasetsData,
        currentInterval: state.main.currentInterval,
        datasetsCount: state.main.datasetsCount,
        intervalType: state.main.intervalType,
        dataSetWindowVisiability: state.main.dataSetWindowVisiability,
        intervalSetWindowVisiability: state.main.intervalSetWindowVisiability,
        categoryTitles: state.main.categoryTitles,
        auth: state.auth.auth
    }
}


const MainPage = (props) => {

    let {
        legend,
        total,
        datasetsData,
        datasetsCount,
        activeIcon,
        currentInterval,
        intervalType,
        setActiveIcon,
        setLegend,
        setTotal,
        setDataSets,
        setCurrentInterval,
        setDataCount,
        dataSetWindowVisiability,
        intervalSetWindowVisiability,
        setSelectedDaysArray,
        categoryTitles,
        auth,
        ...other
    } = props
    const {data: diagramData, loading: loading, refetch: refetch} = useQuery(GET_EXPERSE_BY_DATE, {
        variables: {
            dates: currentInterval,
            intervalType: intervalType,
            userId: auth.id
        }
    })
    let [canvasData, setCanvasData] = useState({
        type: 'doughnut',
        data: {
            datasets: [
                {
                    data: datasetsData,
                    count: datasetsCount,
                    backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)',
                        'rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)',
                        'rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)'],
                    icon: [icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8, icon9, icon10, icon11, icon12, icon13, icon14],
                    id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
                },
            ],

            labels: categoryTitles,

        },
        options: {
            legend: false,
            legendCallback: (chart) => {
                let legend = []
                for (let i = 0; i < chart.data.labels.length; i++) {
                    legend.push({
                        label: chart.data.labels[i],
                        data: chart.data.datasets[0].data[i],
                        color: chart.data.datasets[0].backgroundColor[i],
                        icon: chart.data.datasets[0].icon[i],
                        count: chart.data.datasets[0].count[i],
                        id: chart.data.datasets[0].id[i]
                    })
                }
                return legend;
            },
            plugins: {
                datalabels: {
                    formatter: (value) => {
                        return value + '%';
                    }
                }
            },
            onClick: (event) => handleDiagramClick(event)
        }
    })
    useEffect(() => {
        const ctx = document.getElementById('canvas').getContext('2d');
        window.myChart = new Chart(ctx, canvasData)
        refetch()
    }, [])
    useEffect(() => {
        setCanvasData({
            ...canvasData,
            data: {
                ...canvasData.data,
                datasets: [{...canvasData.data.datasets[0], data: datasetsData, count: datasetsCount}]
            }
        })
    }, [datasetsData, datasetsCount])

    useEffect(() => {

        if (diagramData) {
            setSelectedDaysArray(diagramData.getExperseByDates)
            let getTotalBalance = (diagramData) => {
                let total = 0;

                diagramData.forEach(item => {
                    total += parseFloat(item.sum);
                })
                return total
            }
            setTotal(getTotalBalance(diagramData.getExperseByDates));
            if (!currentInterval) {
                let inter;

                inter = diagramData.getExperseByDates.slice().sort((a, b) => {
                    return parseStringToDate(a.date) < parseStringToDate(b.date)
                })

                setCurrentInterval(`${inter[0].date}-${inter[inter.length - 1].date}`, "all")
            }
            let getDatasetsData = (diagramData) => {
                let total = 0;
                diagramData.forEach(item => {
                    if (item.category != -1) {
                        total += parseFloat(item.sum);
                    }
                })
                if (total === 0) {
                    return [];
                }
                let datasetsData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                diagramData.forEach(item => {
                    datasetsData[item.category] += Math.round(item.sum / total * 100);

                })

                return datasetsData;
            }
            let getDatasetsCount = (diagramData) => {

                let datasetsCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                diagramData.forEach(item => {
                    datasetsCount[item.category] += parseInt(item.sum);

                })

                return datasetsCount;
            }
            setDataSets(getDatasetsData(diagramData.getExperseByDates, total));
            setDataCount(getDatasetsCount(diagramData.getExperseByDates, total))
            let income = 0
            let experse = 0
            diagramData.getExperseByDates.forEach(item => {
                if (item.category != -1) {
                    experse += parseFloat(item.sum);
                } else {
                    income += parseFloat(item.sum);
                }
            })
            setActiveIcon({
                ...activeIcon, data: null,
                label: 'Расход/Доход', count: `${experse}/${income}`
            })
        }
    }, [diagramData, total])


    let handleDiagramClick = (event) => {
        console.log(window.myChart.data.datasets[0].count)
        if (window.myChart) {
            let activeElement = window.myChart.getElementAtEvent(event);
            if (activeElement[0] && canvasData) {

                let targetId = canvasData.data.datasets[activeElement[0]._datasetIndex].id[activeElement[0]._index];
                setActiveIcon({
                    label: window.myChart.data.labels[targetId - 1],
                    data: window.myChart.data.datasets[0].data[targetId - 1],
                    color: window.myChart.data.datasets[0].backgroundColor[targetId - 1],
                    icon: window.myChart.data.datasets[0].icon[targetId - 1],
                    count: window.myChart.data.datasets[0].count[targetId - 1],
                    id: window.myChart.data.datasets[0].id[targetId - 1]
                })
                let targets = document.querySelectorAll("[id^='legendIcon_']")
                targets.forEach(target => {

                    if (target.id === `legendIcon_${targetId}`) {
                        target.classList.add(style.activeIcon)
                    } else {
                        target.classList.remove(style.activeIcon)
                    }
                })
            }
        }
    }


    useEffect(() => {
        if (loading) {
            console.log("Loading!")
        } else if (window.myChart) {
            window.myChart.config = canvasData

            legend = window.myChart.generateLegend(style.diagram);
            legend = legend.map(item => <div className={style.category} id={`legendIcon_${item.id}`}
                                             onClick={(event) => {
                                                 let targets = document.querySelectorAll("[id^='legendIcon_']")
                                                 targets.forEach(target => {
                                                     if (target.id == `legendIcon_${item.id}`) {
                                                         target.classList.add(style.activeIcon)
                                                     } else {
                                                         target.classList.remove(style.activeIcon)
                                                     }
                                                 })
                                                 setActiveIcon(item)
                                             }}>
                <img src={item.icon} alt="icon"/>
                <div className={style.categoryTitle} style={{color: item.color}}>
                    {item.label}
                </div>
            </div>)
            setLegend(legend)
        }
        if (window.myChart) {
            window.myChart.update()
        }
    }, [canvasData])
    let [arrow, setArrow] = useState(false);
    useEffect(() => {

        switch (intervalType) {

            case "day" :
                if (currentInterval == getCurrentDate()) {
                    setArrow(false)

                } else {
                    setArrow(true)
                }
                break;
            case "week" :
                if (currentInterval == getCurrentWeekInterval()) {
                    setArrow(false)
                } else {
                    setArrow(true)
                }
                break;
            case "month" :
                if (currentInterval == getCurrentMonthInterval()) {
                    setArrow(false)
                } else {
                    setArrow(true)
                }
                break;
            case "year" :
                if (currentInterval == getCurrentYearInterval()) {
                    setArrow(false)
                } else {
                    setArrow(true)
                }
                break;
            case "all" :
                setArrow(false)
                break;
            default :
                break;
        }
    }, [currentInterval])

    return (
        <div>
            <NavBar/>
            <div className={style.content}>
                <div className={style.date}>
                    <div className={style.DateImg}>
                        {intervalType != "all" ? <img
                            src={arrowLeft}
                            onClick={() => setCurrentInterval(prevCurrentDate(currentInterval, intervalType), intervalType)}
                            alt="arrow"/> : null}
                    </div>
                    {currentInterval}
                    <div className={style.DateImg}>
                        {arrow ? <img
                            src={arrowRight}
                            onClick={() => setCurrentInterval(nextCurrentDate(currentInterval, intervalType), intervalType)}
                            alt="arrow"/> : null}
                    </div>
                </div>
                <div className={style.diagram}>
                    <div className={style.diagramImg} id="diagramImg">
                        <div className={style.hoverElement}>
                            <div className={style.hoverWrapper}>
                                <div>
                                    {(activeIcon.data === 0) ? activeIcon.data + '%' : null}
                                    {!activeIcon.data ? null : activeIcon.data + '%'}
                                </div>
                                <div>
                                    {activeIcon.label}
                                </div>
                                <div onClick={() => console.log(window.myChart)}>
                                    {activeIcon.count} BYN
                                </div>
                            </div>

                        </div>
                        <canvas id="canvas" width="400" height="400"></canvas>
                    </div>
                    {legend}
                </div>
                <div className={style.hoverElement2}>

                    <div>
                        {(activeIcon.data === 0) ? activeIcon.data + '%' : null}
                        {!activeIcon.data ? null : activeIcon.data + '%'}
                    </div>
                    <div>
                        {activeIcon.label}
                    </div>
                    <div onClick={() => console.log(window.myChart)}>
                        {activeIcon.count} BYN
                    </div>
                </div>
                <div className={style.tabs}>
                    <GreenButtom/>
                    <RedButtom/>
                </div>
            </div>
            <CustomFooter refetch={refetch}/>
            <SetDate visibility={dataSetWindowVisiability}/>
            <SetInterval visibility={intervalSetWindowVisiability}/>
        </div>)
}
export default connect(mapStateToProps, {
    setLegend,
    setTotal,
    setActiveIcon,
    setDataSets,
    setCurrentInterval,
    setDataCount,
    setSelectedDaysArray
})(MainPage);