// @flow

import React from 'react';
import TaskEditor from '../../../goal/creator/TaskEditor';

import ActionDone from 'material-ui/svg-icons/action/done';
import { Status } from '../../../../data/index';

export default <TaskEditor initTask={{status: Status.ACTIVE, name:"test", remindAt: new Date(), duration: 20}}
                    onCommit={(task)=>console.log("create",task)}
                    onDelete={()=>console.log("delete this task")}
                    commitBtn={<ActionDone/>}/>
