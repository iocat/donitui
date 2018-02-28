// Global app data

const DOMAIN = "donit.xyz";
export var API_DOMAIN;
export var CLIENT_DOMAIN;
export const CLOCK_UPDATE_CYCLE = 1000; // Update current time cycle in milliseconds

// Configure global variable
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"){
    document.domain ="localhost"
    CLIENT_DOMAIN = "http://localhost:3000"
    API_DOMAIN = "http://localhost:8080"
}else{
    document.domain = DOMAIN;
    API_DOMAIN = "https://api." + DOMAIN + "/";
    CLIENT_DOMAIN = "http://www." + DOMAIN + "/";
}
