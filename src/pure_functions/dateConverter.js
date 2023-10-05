const dateConverter = (mongoDate) => {
    const date = new Date(mongoDate)
    const monthMap = {
        '0' : "jan",
        '1' : "Feb",
        '2' : "Mar",
        '3' : "Apr",
        '4' : "May",
        '5' : "jun",
        '6' : "jul",
        '7' : "Aug",
        '8' : "Sep",
        '9' : "Oct",
        '10' : "Nov",
        "11" : "Dec"
    }

    const month = date.getMonth()
    const day = date.getDate()
    const year = date.getFullYear()
    const hour = date.getHours()
    let minute = date.getMinutes()
    if (minute < 10){
        minute = `0${minute}`
    }
    const modifiedDate = `${monthMap[month]} ${day}, ${year} `
    const modifiedTime = `${hour}:${minute}`
    return {modifiedDate, modifiedTime}
}

export default dateConverter