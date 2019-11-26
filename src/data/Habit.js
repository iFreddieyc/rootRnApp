/**
 * Class File for Habit
 * @author Qingcheng You, Qiuling Chen
 * @since Nov.3.2019
 */

import db from "../base";
import util from "../util";

export default class Habit {

    // Constructor (I did not include endDate due to ECMAScript only allow one constructor)
    constructor(name, userid, startDate, description, visible, numOfDays, archived) {
        this.name = name;
        this.userid = userid;
        this.startDate = startDate;
        this.description = description;
        this.visible = visible;
        this.numOfDays = numOfDays;
        this.archived = archived;
    }

    // Function to push object into Firebase Firestore
    pushToFirestore = () => {
        return new Promise((resolve, reject) => {
            db.firestore().collection("habits").add({
                name: this.name,
                userid: this.userid,
                startDate: this.startDate,
                description: this.description,
                visible: this.visible,
                numOfDays: this.numOfDays,
                archived: this.archived,
                habitId: "",
            }).then(function (docRef) {
                return docRef.update({
                    habitId: docRef.id,
                })
                    .then(function () {
                        console.log("Document successfully updated!");
                        resolve(true)
                    })
                    .catch(function (error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
            }).catch(function (error) {
                console.error("Error adding document: ", error);
            })
        });
    };

    get duration() {
        return util.getDifference(this.startDate);
    }

    get days(){
        return this.numOfDays;
    }
}

