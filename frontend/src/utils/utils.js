export const getCurrentDate = () => {
    let today = new Date();
    return dateToString(today)
}
export const nextCurrentDate = (currentInterval, intervalType) => {
    console.log(currentInterval)
    switch (intervalType) {
        case "day" :
            let tomorrow =  parseStringToDate(currentInterval);
            tomorrow.setDate(tomorrow.getDate()+1)
            return dateToString(tomorrow)
        case "week" :
            let end =  parseStringToDate(currentInterval.split('-')[1]);
            end.setDate(end.getDate()+7)
            if (end >= new Date() && parseStringToDate(currentInterval.split('-')[1]).getDay() < new Date().getDay() ) {
                console.log("+")
                let start =  parseStringToDate(currentInterval.split('-')[1]);
                console.log(start.getDay())
                start.setDate(start.getDate()+1)
                start =dateToString(start)
                let end = new Date()
                end =dateToString(end);
                return `${start}-${end}`
            } else if (end < new Date()) {
                console.log("-")
                let start =  parseStringToDate(currentInterval.split('-')[1]);
                start.setDate(start.getDate()+1)
                start =dateToString(start)
                end =  parseStringToDate(currentInterval.split('-')[1])
                end.setDate(end.getDate()+7)
                end =dateToString(end);
                return `${start}-${end}`
            } else {
                return currentInterval;
            }
        case "month" :
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];

            let month =currentInterval.split(',')[0]
            let year =currentInterval.split(',')[1]
            let date = new Date(year,  monthNames.findIndex(item  => item ===month), 1)
            console.log(date)

            date.setMonth(date.getMonth() + 1)
            if(date < new Date())  {
                return `${monthNames[date.getMonth()] }, ${date.getFullYear()}`
            } else {
                return currentInterval;
            }
        case "year" :
            let curYear = new Date(currentInterval,1,1);
            curYear.setFullYear(curYear.getFullYear() + 1)
            if(curYear< new Date())  {
                return `${curYear.getFullYear()}`
            } else {
                return currentInterval;
            }
        case "all" :
            return currentInterval
        default:
            break;
    }
}
export const prevCurrentDate = (currentInterval, intervalType) => {
    switch (intervalType) {
        case "day" :
            let yesterday = parseStringToDate(currentInterval);

            yesterday.setDate(yesterday.getDate()-1)
            return dateToString(yesterday)
        case "week" :
            let start =  parseStringToDate(currentInterval.split('-')[0]);
            let end =  parseStringToDate(currentInterval.split('-')[0]);
            end.setDate(end.getDate()-1)
            start.setDate(start.getDate()-7)
            return `${dateToString(start)}-${dateToString(end)}`
        case "month" :
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];

            let month =currentInterval.split(',')[0]
            let year =currentInterval.split(',')[1]
            let date = new Date(year,  monthNames.findIndex(item  => item ===month), 1)
            date.setMonth(date.getMonth() - 1)

            return `${monthNames[date.getMonth()] }, ${date.getFullYear()}`
        case "year" :
            let curYear = new Date(currentInterval,1,1);
            curYear.setFullYear(curYear.getFullYear() - 1)
            return `${curYear.getFullYear()}`
        case "all" :
            console.log("done")
           return currentInterval
        case "interval" :
            return currentInterval
        case "chosen" :
            return currentInterval
        default:
                break;
    }
}

export let getCurrentWeekInterval = () => {
    let today = dateToString(new Date());
    let td =  parseStringToDate(today);
    td = dateToString(td)
    let weekStart =  parseStringToDate(today);
    if(weekStart.getDay() ===0){
        weekStart.setDate(weekStart.getDate()-6);
    } else {
        weekStart.setDate(weekStart.getDate()-weekStart.getDay()+1);
    }

    weekStart = dateToString(weekStart)

    return `${weekStart}-${td}`

}
export let getCurrentMonthInterval = () => {
    let today = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return `${monthNames[today.getMonth()] }, ${today.getFullYear()}`

}
export let getCurrentYearInterval = () => {
    let today = new Date();

    return `${today.getFullYear()}`
}

export let dateToString = (date) => {
    let dd = date.getDate();
    let mm = date.getMonth()+1;
    let yyyy = date.getFullYear();

    let weekDay = getWeekDay(new Date(yyyy, mm-1, dd));

    if(dd<10)
    {
        dd=`0${dd}`;
    }

    if(mm<10)
    {
        mm=`0${mm}`;
    }

    date = `${dd}.${mm}.${yyyy}, ${weekDay}`;
    return date
}
export let parseStringToDate = (date) => {
    let parts = date.split(/[.,]/);
    let dd = parseInt(parts[0])
    let mm =parseInt(parts[1])-1

    let yyyy = parseInt(parts[2])
    return  new Date(yyyy, mm, dd);
}
let getWeekDay = (date) => {
    let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

    return days[date.getDay()];
}