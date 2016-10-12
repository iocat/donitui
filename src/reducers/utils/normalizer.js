import {ActionTypes} from '../actions/index';

// A reducer that normalize an array object and turns it into an object 
// with id chosen by field
// Action should has a field name for id
export function normalizer(object, action){
    if (action === undefined){
        return [];
    }
    switch (action.type){
        case ActionTypes.NORMALIZE:
            return normalize(object, action.byField);
        case ActionTypes.DENORMALIZE: 
            return denormalize(object, action.byField);
        default: 
            return object;
    }
}

function denormalize(object, byField){
    let arr = [];
    Object.keys(object).map( (key) => {
        let obj = Object.assign({}, object[key]);
        obj[byField] = key;
        return obj; 
    });
}

function normalize(arr, byField){
    let obj = {};
    for (let i = 0; i < arr.length; i ++ ){
        obj[arr[i][byField]] = Object.assign({}, arr[i]);   
    }
    return obj;
}

