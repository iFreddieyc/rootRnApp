/**
 * Utility class for fun?
 * @author Qingcheng You
 * @since 11.11.2019
 */
export default class util{
    /**
     * Function to return current date in "mm/dd/yyyy" format
     */
    static getCurrentDate() {
        let today = new Date();
        let date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
        return date;
    }0
}