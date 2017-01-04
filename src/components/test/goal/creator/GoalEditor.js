// @flow

import React from 'react';
import GoalEditor from '../../../goal/creator/GoalEditor';

import ActionDone from 'material-ui/svg-icons/action/done';
import { Status } from '../../../../data/index';

export default <GoalEditor initGoal={
        {
            name: "",
            description: "",
            status: Status.INACTIVE,
            tasks: [],
            habits: []
        }}
        accept={(goal) => console.log("accept", goal)}
        discard={()=> console.log("discarded")}
        commitBtn={<ActionDone/>}/>
