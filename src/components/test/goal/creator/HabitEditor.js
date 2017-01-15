// @flow

import React from 'react';
import HabitEditor from '../../../goal/creator/HabitEditor';

import ActionDone from 'material-ui/svg-icons/action/done';
import { Status } from '../../../../data/index';

export default <HabitEditor initHabit={
        {
            status: Status.ACTIVE,
            name: "test",
            days: {"1":true, "2":true},
            offset: 10000,
            duration: 20000,
        }}
        onCommit={(habit)=>console.log("create habit",habit)}
        onDelete={()=>console.log("delete this habit")}
        commitBtn={<ActionDone/>}/>
