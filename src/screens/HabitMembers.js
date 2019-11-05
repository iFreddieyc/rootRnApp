import React from 'react';
import db from '../base'

class HabitMembers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            habitName: '',
            time: '',
            category: '',
            publicity: ''
        };
        this.firebaseRef = db.database().ref("Habits");
    }

    componentWillUnmount() {
        this.firebaseRef.off();
    }

    pushToFirebase(event) {
        const {habitName, time, category, publicity} = this.state;
        event.preventDefault();
        console.log(time, category, publicity);
        this.firebaseRef.child(habitName).set({habitName, time, category, publicity});
        this.setState({habitName: '', time: '', category: '', publicity: ''});
    }

    render(){
        return(
            <div>
                <label>Habit Name</label>
                <input onChange= {e => this.setState({habitName: e.target.value})}/>
                <br />
                <label>Period of Time</label>
                <input onChange= {e => this.setState({time: e.target.value})}/>
                <br />
                <label>Habit Category</label>
                <input onChange= {e => this.setState({category: e.target.value})}/>
                <br />
                <label>Publicity</label>
                <input onChange= {e => this.setState({publicity: e.target.value})}/>
                <br />
                <button onClick={this.pushToFirebase.bind(this)}>Done</button>
            </div>
        );
    }
}

export default HabitMembers;