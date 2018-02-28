// @flow

// Request builder for Fetch
export default class FetchRequestBuilder{
    static CONTENT_JSON: string = "application/json"

    static METHOD_GET: string = "GET"
    static METHOD_POST: string = "POST"
    static METHOD_DELETE: string = "DELETE"

    static HEADER_AUTHORIZATION: string = "Authorization"
    request = {
        method: FetchRequestBuilder.METHOD_GET,
        body:null,
        mode:"cors",
        headers: {},
    }
    constructor(request: any){
        if(request !== undefined){
            this.request = request;
        }
        if(window.location.hostname === "localhost"){
            this.request.headers["Origin"] = "localhost:3000";
        }

    }
    body = (json: any) =>{
        this.request.body =  JSON.stringify(json);
        return this;
    }
    method = (method: string) => {
        this.request.method = method;
        return this;
    }
    content = (content: string) =>{
        this.request.headers["Content-Type"] = content;
        return this;
    }
    header = (key: string, value: string) => {
        this.request.headers[key] = value;
        return this;
    }
    googleAuth = (token: string) =>{
        this.request.headers["Authorization"] = "Bearer " + token;
        return this;
    }
    build = (): any => {
        console.log(this.request);
        return this.request;
    }
}
