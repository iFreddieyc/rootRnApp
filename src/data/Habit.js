import db from "../base";

export default class Habit{

    // Constructor (I did not include endDate due to ECMAScript only allow one constructor)
    constructor(name, userid, startDate, description, visible, category){
        this.name = name;
        this.userid = userid;
        this.startDate = startDate;
        this.description = description;
        this.visible = visible;
        //this.endDate = endDate;
        this.category = category;
    }
    /*
    // Setters
    set visible(boolVal){
        this.visible = boolVal;
    }
    set endDate(val){
        this.endDate = val;
    }
    set description(val){
        this.description = val;
    }

    // Getters
    get name(){
        return this.name;
    }
    get userid(){
        return this.userid;
    }
    get startDate(){
        return this.startDate;
    }
    get description(){
        return this.description;
    }
    get visible(){
        return this.visible;
    }
    get endDate(){
        return this.endDate;
    }
    */
    pushToFirestore = () => {
        console.log("Hey");
        db.firestore().collection("habits").add({
            name: this.name,
            userid: this.userid,
            startDate: this.startDate,
            description: this.description,
            visible: this.visible,
            category: this.category
            //endDate: this.endDate
        }).catch(function(error){
            console.error("Error adding document: ", error);
        })
    };
}

