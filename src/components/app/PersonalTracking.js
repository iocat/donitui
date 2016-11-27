import React from 'react';

import {Responsive, WidthProvider} from 'react-grid-layout';
const PersonalTrackingLayout = WidthProvider(Responsive);

import GoalFiltering from '../goal/GoalFiltering';
import {personalTracking, layouts, cols, breakpoints} from '../layout';
import ActiveTasks from '../scheduler/ActiveTasks';
import NextEvent from '../scheduler/NextEvent';

// PersonalTracking is a division page for the app
export default class PersonalTracking extends React.Component {
    render() {
        return (
            <PersonalTrackingLayout breakpoints={breakpoints(personalTracking)} cols={cols(personalTracking)} layouts={layouts(personalTracking)}>
                <div key="goalFilter">
                    <GoalFiltering canUpdate={true}/>
                </div>
                <div key="scheduler">
                    <div className="scheduler">
                        <NextEvent/>
                        <br/>
                        <ActiveTasks/>
                        <br/>
                    </div>
                </div>
            </PersonalTrackingLayout>
        )
    }
}
