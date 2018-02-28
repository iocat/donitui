import { API_DOMAIN } from '../global';
import {Users} from './user';

class Router {
    constructor(domain){
        this.prefix = domain;
    }
    users(username){
        return new Users(this.url(),username);
    }
    login(){
        let urlFunc = ()=> encodeURI(this.prefix+"/login");
        return {
            url: urlFunc,
        }
    }
    url(){
        return encodeURI(this.prefix);
    }
}

export default  new Router(API_DOMAIN);
