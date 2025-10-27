// import
import { parseISO, formatDistanceToNow } from "date-fns-jalali"

const ShowTime =  ({timestamp}) => {
    let timeAgo = ' ';
    if( timestamp){
        const date = parseISO(timestamp);
        const time  = formatDistanceToNow(date);
        timeAgo = `${time} `;

    }
    return(
        <span>
            <i>
                {timeAgo }
            </i>
        </span>
    )
}
export default ShowTime;