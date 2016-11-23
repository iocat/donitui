
// goalsBackEnd is a thunk to request data from the server
//todo
export function retrieveBackEndGoals(forUser) {
    return function (dispatch) {
        var checkStatus = (response) => {

        }
        let ok = true;
        var errorHandler = (error) =>{
            dispatch(ActionCreators.HANDLE_ERROR(error));
            ok = false;
        }
        
        let json = fetch(router.user(forUser).goals(null).url())
            .then(checkStatus)
            .then( (response) => response.json())
            .catch(errorHandler);
        if (ok) {
            // Dispatch create goal with id
            return json
        }
    }
}