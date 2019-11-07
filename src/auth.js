import db from "./base";

var user = db.auth().currentUser;

export default user;