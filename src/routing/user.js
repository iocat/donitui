import {Goal} from './goals';

export class Users {
    constructor(prefix, username){
        this.prefix = prefix;
        if (username){
            this.username = username;
        }
    }
    goals(goalid){
        return new Goal(this.url(), goalid);
    }
    url(){
        if (this.username){
            return encodeURI(this.prefix + "/users/" + this.username);
        }
        return encodeURI(this.prefix + "/users");
    }
}
