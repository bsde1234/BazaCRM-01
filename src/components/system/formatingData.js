export const formatDate = (data) => {
    const months = [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Майя',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декабря'
    ];
    let min = data.getMinutes();
    const minutes = min.toString().length===1?"0"+min:min;
    const time = " в " + data.getHours() + ":" + minutes
    const date = data.getDate() + " " + months[data.getMonth()] + " " + data.getFullYear()
    return date + time ;
}