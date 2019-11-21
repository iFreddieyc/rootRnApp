/**
 * Class File for Habit
 * @author Qingcheng You, Qiuling Chen
 * @since Nov.3.2019
 */

import db from "../base";
import util from "../util";

export default class Habit{

    // Constructor (I did not include endDate due to ECMAScript only allow one constructor)
    constructor(name, userid, startDate, description, visible){
        this.name = name;
        this.userid = userid;
        this.startDate = startDate;
        this.description = description;
        this.visible = visible;
        //console.log(this.name, this.userid, this.startDate, this.description, this.visible);
    }

    // Function to push object into Firebase Firestore
    pushToFirestore = () => {
        db.firestore().collection("habits").add({
            name: this.name,
            userid: this.userid,
            startDate: this.startDate,
            description: this.description,
            visible: this.visible,
        }).catch(function(error){
            console.error("Error adding document: ", error);
        })
    };

    get duration(){
        return util.getDifference(this.startDate);
    }

    /*
    // Function to change visibility of the habit TODO
    changeVisibility = () => {

    }
    */
}

