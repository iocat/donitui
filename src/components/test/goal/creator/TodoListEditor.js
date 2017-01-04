// @flow

import React from 'react';
import TDCreator from '../../../goal/creator/TodoListEditor';


export default <TDCreator onChangeTasks={(tasks)=>console.log(tasks)}
                    onChangeHabits={(habits)=>console.log(habits)}/>
