import React from 'react';

import {Responsive, WidthProvider} from 'react-grid-layout';
const PersonalTrackingLayout = WidthProvider(Responsive);

import {GoalTracking} from '../goal/GoalTracking';
import {personalTracking, layouts, cols, breakpoints} from '../layout';

// PersonalTracking is a division page for the app
export default class PersonalTracking extends React.Component{

    render(){
        return (
            <PersonalTrackingLayout
                breakpoints={breakpoints(personalTracking)}
                cols={cols(personalTracking)}
                layouts={layouts(personalTracking)}>
                <div key="goalTracking">
                    <GoalTracking />  
                </div>
                </PersonalTrackingLayout>
        )        
    }
}