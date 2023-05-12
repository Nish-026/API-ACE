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
    console.log("yes");
    localStorage.setItem("username", null);
    window.location.reload();
  });
}

document.querySelector("#logo_img").addEventListener("click", () => {
  window.location.href = "index.html";
});
document.querySelector("#explore").addEventListener("click", () => {
  window.location.href = "explore.html";
});

document.querySelector("#workspace_btn").addEventListener("click", () => {
  window.location.href = "homepage.html";
});
