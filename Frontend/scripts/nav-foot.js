let username = localStorage.getItem("username");
let sign_in_div = document.querySelector("#sign_in_div");
if (username == "null") {
  username = null;
}
// switching btn on logout and signin
if (username == null) {
  sign_in_div.innerHTML = `<button style="cursor: pointer" id="signin_btn" class="signin_btn">
                Sign In/Sign Up
              </button>`;
  // signin
  document.querySelector(".signin_btn").addEventListener("click", () => {
    console.log("yes");
    window.location.href = "./login.html";
  });
} else {
  sign_in_div.innerHTML = `<button style="cursor: pointer" id="logout_btn">
                logout
              </button>`;
  // logout function
document.querySelector("#logout_btn").addEventListener("click", () => {
    logout()
    localStorage.removeItem("username");
    setTimeout(()=>{
      window.location.href = "index.html";
    },2000)
  });
}

async function logout() {
  let logout = await fetch(
    `http://localhost:4500/user/logout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         authorization: localStorage.getItem("token"),
      },
    }
  );
  console.log(logout);
  if (logout.status == 200) {
    Swal.fire("Successfully Logged out😁")
  }else{
    Swal.fire("Something went wrong😥")
  }
}

document.querySelector("#logo_img").addEventListener("click", () => {
  window.location.href = "index.html";
});
document.querySelector("#explore").addEventListener("click", () => {
  window.location.href = "explore.html";
});


let workspace_button= document.getElementById("workspace_btn")

workspace_button.addEventListener("click",()=>{
  if(username!=null){
    window.location.href= "homepage.html"
  }else{
    Swal.fire("Please Login to get to your workspace🤗")
  }
  
})