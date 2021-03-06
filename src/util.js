/**
 * Utility class for fun?
 * @author Qingcheng You
 * @since 11.17.2019
 */
export default class util {
    /**
     * Function to return current date in "mm/dd/yyyy" format
     */
    static getCurrentDate() {
        let today = new Date();
        let date = (today.getMonth() + 1) + '/' + today.getDate() + '/'
	  + today.getFullYear();
        return date;
    }

    /**
     * Function to get difference in dates between a start date and the current
     * @param   startDate
     * @returns {number} the difference in days
     */
    static getDifference(startDate){
        let now = new Date();
        let start = new Date(startDate);
        return Math.ceil((now - start) / (1000 * 60 * 60 * 24));
    }

    // TODO: Remove extraneous comments
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
    static getDuration(startDate, endDate) {
        var timeDifference = Math.abs(endDate - startDate);
        var dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        return dayDifference;
    }

    //function to compare by duration
    static compare(a, b) {
        return (b.duration - a.duration);
    }
}
