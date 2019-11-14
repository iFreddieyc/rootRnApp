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
    // /**
    // /* 我咋发觉current Date其实是date object呢？ 所以我没写convert 成int 再计算duration
    // /* 我直接写了个method算两个date的差，method看的网上的reference
    //  * Function to convert string mm/dd/yyyy to int yyyymmdd
    //  */
    // static DateToInt(parameter){
    //     var replaced = parameter.replace (/\//g, "");//replace slash with empty string
    //     var year = replaced.slice(4,7);
    //     var dayMonth = replaced.slice(0,3);
    //     var res = year.concat(dayMonth);
    //     return Number(res); //convert the replaced string to int
    // }
    /**
     * method to get duration between two Dates
     * p2 must be later than p1!
     * @param {*} p1 habit start date
     * @param {*} p2 current date
     */
    static getDuration(p1, p2){
        var diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }
}
