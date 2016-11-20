
import {handleError} from '../actions';
import router from '../routing/router';

// TODO
export function retrieveUserData(forUser) {
    return function (dispatch) {
        var checkStatus = (response) => {

        }
        var normalize = (json) => {

        }
        fetch(router.user(forUser).url())
            .then(checkStatus)
            .then(
            (response) => response.json()
            ).then(normalize)
            .catch()(
            function (error) {
                dispatch(handleError(error));
            }
            )
    }
}
