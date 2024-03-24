import {format} from "date-fns"
export const DateFormat = (time) => {
    if (!time) {
        return '';
    }
    const dateObject = new Date(time);
    return  format(dateObject, 'yyyy/MM/dd hh:mm a')
}