import { API_DOMAIN } from '../global';
import {Users} from './user';

class Router {
    constructor(domain){
        this.prefix = domain;
    }
    users(username){
        return new Users(this.url(),username);
    }
    url(){
        return encodeURI(this.prefix);
    }
}

export default  new Router(API_DOMAIN);
