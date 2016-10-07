export const HANDLE_ERROR       = "HANDLE_ERROR";

export function handleError(error){
    return {
        type: HANDLE_ERROR,
        error
    }
}