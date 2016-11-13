// @flow
var React = require("react");
import {Checkbox} from 'material-ui';
import type {HabitDays} from '../../../../data/types';

const mapDayToNumber = {
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday":3,
    "Thursday":4,
    "Friday":5,
    "Saturday": 6,
    "Sunday": 7,
}

const displayDays = ["Monday", "Tuesday","Wednesday","Thursday", "Friday", "Saturday", "Sunday"];

export default class DaysInWeek extends React.Component{

    render (){
        let days: HabitDays = this.props.days;
        let addDay = this.props.addDay;
        let rmDay = this.props.rmDay;

        // generates callback for a day
        const onCheckFunc = (day: string)=>{
            return (event:Object, isChecked: boolean)=>{
                if (isChecked) {
                    addDay(mapDayToNumber[day]);
                }else{
                    rmDay(mapDayToNumber[day]);
                }
            }
        }

        // check if a day is checked or not
        const isChecked: (day:string)=>boolean = (day:string)=>{
            return days[mapDayToNumber[day]];
        }

        const slice = (dayArr: string[]) => {
            return dayArr.map((day:string)=>{
                return <Checkbox key={day} label={day}
                    defaultChecked={isChecked(day)}
                    onCheck={onCheckFunc(day)}/>
            });
        }

        return (
            <div className="time-picker-group">
                <div className="time-picker">
                {
                    slice(displayDays.slice(0, 4))
                }
                </div>
                <div className="time-picker">
                {
                    slice(displayDays.slice(4,displayDays.length))
                }
                </div>
            </div>);
    }
}


DaysInWeek.propTypes = {
    days: React.PropTypes.object.isRequired,
    addDay: React.PropTypes.func.isRequired,
    rmDay: React.PropTypes.func.isRequired,
};
