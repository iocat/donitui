import {Task} from './tasks';

export class Goal {
    constructor(prefix, goalid){
        this.prefix = prefix;
        if (goalid){
            this.goalid = goalid;
        }
    }
    tasks(taskid){
        return new Task(this.url(), taskid);
    }
    url(){
        if (this.goalid){
            return encodeURI(this.prefix + "/goals/" + this.goalid);
        }
        return encodeURI(this.prefix + "/goals");
        
    }
}