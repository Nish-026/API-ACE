
// Get the current URL
const currentUrl = window.location.href;
// Create a URL object from the current URL
const url = new URL(currentUrl);

// Get the search parameters from the URL
const searchParams = url.searchParams;

// Get specific query parameters
const token = searchParams.get('token');
const id = searchParams.get('userID');
const userName = searchParams.get("username");
console.log(token);
localStorage.setItem("token",token);
localStorage.setItem("userID",id);
localStorage.setItem("username", userName);
if(userName){
    window.location.href="index.html"
}

