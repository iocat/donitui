export class Task{
    constructor(prefix, taskid){
        this.prefix = prefix;
        if (taskid){
            this.taskid = taskid;
        }
    }
    url(){
        if(this.taskid){
            return encodeURI(this.prefix+"/achievables/" + this.taskid);
        }
        return encodeURI(this.prefix + "/achievables");
    }
}