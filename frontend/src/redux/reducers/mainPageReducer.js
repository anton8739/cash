import {getCurrentDate} from "../../utils/utils";

let inicializationState = {
    auth : {
        token : null,
        currentUserId : null,
        isAuthenticated: false,
    },
    legend : null,
    total : 1,
    activeIcon : {
        data : null,
        label: 'Баланс',
        count : null
    },
    currentInterval : getCurrentDate(),
    datasetsData : [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    datasetsCount : [1,1,1,1,1,1,0,0,0,0,0,0,0,0],
    intervalType : "day",
    selectedDaysArray : null,
    dataSetWindowVisiability : false,
    intervalSetWindowVisiability : false,
    navBarStatus : {
        leftMenuStatus :false,
        rightMenuStatus : false,
    },
    categoryTitles : ['Телефон', 'Дом', 'Развлечения', 'Подарки', 'Машина', 'Такси', 'Магазин', 'Питомцы', 'Спорт', 'Транспорт', 'Одежда', 'Гигиена', 'Ресторан', 'Счета']
}

let mainPageReducer = (state = inicializationState, action) => {
    switch (action.type) {
        case 'MAIN_SET_LEGEND':

            return {
                ...state,
                legend: action.legend
            };
        case 'MAIN_SET_TOTAL' :
            return {
                ...state,
                total: action.total
            }
        case 'MAIN_SET_ACTIVE_ICON' :
            return {
                ...state,
                activeIcon: action.activeIcon
            }
        case 'MAIN_SET_DATASETS' :
            return {
                ...state,
                datasetsData: action.datasetsData
            }
        case 'MAIN_SET_DATACOUNT' :

            return {
                ...state,
                datasetsCount: action.datasetsCount
            }
        case 'MAIN_SET_CURRENT_INTERVAL' :
            return {
                ...state,
                currentInterval : action.currentInterval,
                intervalType: action.intervalType
            }
        case 'MAIN_SET_DATA_VISIABILITY' :
            return {
                ...state,
                dataSetWindowVisiability: action.dataSetWindowVisiability,
            }
        case 'MAIN_SET_INTERVAL_VISIABILITY' :
            return {
                ...state,
                intervalSetWindowVisiability: action.intervalSetWindowVisiability,
            }
        case 'MAIN_SET_NAVBAR_STATUS' :
            return {
                ...state,
                navBarStatus: action.navBarStatus,
            }
        case 'MAIN_SET_SELECTED_DAYS_ARRAY' :
            return {
                ...state,
                selectedDaysArray: action.selectedDaysArray,
            }
        default :
            return state;
    }
}

/* ACTIONS */

export let setLegend = (legend) => {
    return {
        type: 'MAIN_SET_LEGEND',
        legend: legend,
    }
}
export let setTotal = (total) => {
    return {
        type: 'MAIN_SET_TOTAL',
        total: total
    }
}
export let setActiveIcon = (activeIcon) => {
    return {

        type: 'MAIN_SET_ACTIVE_ICON',
        activeIcon: activeIcon
    }
}
export let setDataSets = (datasetsData) => {
    return {

        type: 'MAIN_SET_DATASETS',
        datasetsData: datasetsData
    }
}
export let setDataCount = (datasetsCount) => {
    return {

        type: 'MAIN_SET_DATACOUNT',
        datasetsCount: datasetsCount
    }
}
export let setCurrentInterval = (currentInterval,intervalType) => {
    return {

        type: 'MAIN_SET_CURRENT_INTERVAL',
        currentInterval: currentInterval,
        intervalType: intervalType
    }
}
export let setDataVisiability = (dataSetWindowVisiability) => {
    return {

        type: 'MAIN_SET_DATA_VISIABILITY',
        dataSetWindowVisiability:  dataSetWindowVisiability
    }
}
export let setIntervalVisiability = (intervalSetWindowVisiability) => {

    return {

        type: 'MAIN_SET_INTERVAL_VISIABILITY',
        intervalSetWindowVisiability:  intervalSetWindowVisiability
    }
}
export let setNavBarStatus = (navBarStatus) => {

    return {

        type: 'MAIN_SET_NAVBAR_STATUS',
        navBarStatus:  navBarStatus
    }
}

export let setSelectedDaysArray = (selectedDaysArray) => {

    return {

        type: 'MAIN_SET_SELECTED_DAYS_ARRAY',
        selectedDaysArray:  selectedDaysArray
    }
}


export default mainPageReducer;