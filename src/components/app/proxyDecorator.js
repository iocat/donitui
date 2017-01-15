// @flow
import { browserHistory } from 'react-router';
import type { RootReducer } from '../../data/reducers';

export function userCheck(mapFnc: (root: RootReducer, props: any)=>any){
    return (root: RootReducer, props: any)=>{
        if (props.params.userId === root.userService.userId) {
            return mapFnc(root, props);
        }
        browserHistory.replaceState("/404");
    }
}
