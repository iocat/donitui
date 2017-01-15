// @flow

import {browserHistory as bh} from 'react-router';

let linkTo: {
    PERSONAL_TRACKING_VIEW: (username: string, replace: boolean)=>(()=>void),
    GOAL_VIEW: (username: string, goalId: number, replace: boolean) => (()=>void),
    EDIT_GOAL_VIEW:(username: string, goalId: number, replace: boolean) =>(()=>void),
    APP_ROOT:(replace:boolean)=>(()=>void),
} = {
    PERSONAL_TRACKING_VIEW: (username, replace) => ()=>{
        if(replace){
            bh.replace("/"+username+"/goals")
        }else{
            bh.push("/"+username+"/goals")
        }
    },
    GOAL_VIEW: (username, goalId, replace) => ()=>{
        if(replace){
            bh.replace("/"+username+"/goals/"+goalId)
        }else{
            bh.push("/"+username+"/goals/"+goalId)
        }
    },
    EDIT_GOAL_VIEW: (username, goalId, replace)=> ()=>{
        if(replace){
            bh.replace("/"+username+"/goals/"+goalId+"/edit")
        }else{
            bh.push("/"+username+"/goals/"+goalId+"/edit")
        }
    },
    APP_ROOT: (replace)=>()=>{
        if(replace){
            bh.replace("/")
        }else{
            bh.push("/")
        }
    }
}

export default linkTo;
