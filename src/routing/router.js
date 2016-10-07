import { DOMAIN } from '../global';
import {User} from './user';

class Router {
    constructor(domain){
        this.prefix = domain;
    }
    user(username){
        return new User(this.url(),username);
    }
    url(){
        return encodeURI(this.prefix);
    }
}

export var router = new Router(DOMAIN);