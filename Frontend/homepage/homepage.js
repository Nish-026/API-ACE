function redirect() {
  console.log("hi");
  window.location.href = "../apirequest/apiRequest.html"; /// file name to be redirected
}
function logout() {
  console.log("hi");
  window.location.href = "index.html"; /// file name to be redirected
}



// geting users saved api data

async function getApiData() {
  fetchData = await fetch(
    `http://localhost:4500/getUserApi/${localStorage.getItem("userID")}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    }
  );
  if (fetchData.status == 200) {
    let data = await fetchData.json();
    displayApi(data);
  }
}
getApiData();

let displayUserApi = document.querySelector("#displayUserApi");
function displayApi(data) {
  console.log(data)
  let apiArr = data.map((element) => {
    return `<div class="apis">
                <h6>${element.method}</h6>
                <p>${element.url}</p>
            </div>`;
  });
  apiArr.unshift(`<div class="apis">
  <h4 id="saved_api">Saved Apis</h4>
  </div>`)
  displayUserApi.innerHTML = apiArr.join("");
  console.log(apiArr);
}


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
    window.location.href = "./signin_signup/login.html";
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
  window.location.href = "../index.html";
});
document.querySelector("#explore").addEventListener("click", () => {
  window.location.href = "../explore/explore.html";
});

document.querySelector("#workspace_btn").addEventListener("click", () => {
  window.location.href = "homepage.html";
});
