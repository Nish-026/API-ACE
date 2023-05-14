
// let username= localStorage.getItem("userID");
let new_req = document.getElementById("new_req");
new_req.addEventListener("click", () => {
  console.log("hi");
  window.location.href = "apiRequest.html";

})


let name_span= document.getElementById("name_span");
let welcome_div=document.getElementById("welcome_div")
name_span.innerText=localStorage.getItem("username")+",Save your work Here!😁";
welcome_div.append(name_span);


function logout() {
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
    console.log(data);
    if (data.length > 0) {
      displayApi(data);
    }
  }
}
getApiData();

let displayUserApi = document.querySelector("#displayUserApi");
function displayApi(data) {
  let apiArr = data.map((element,index) => {
    return `<div id="main_api_div">
                      <div class="apis">
                         <h6>${element.method}</h6>
                         <p>${element.url}</p>
                      </div>
                      <div><button class="remove" id=${element._id}>❌</button></div>
            </div>
    `;
  });
  apiArr.unshift(`<div id="welcome_div">
  <h5 id="saved_api">Hi! ${username}, Your saved Apis are here 😁</h5>
  </div>`)
  displayUserApi.innerHTML = apiArr.join("");
  let remove_buttons=document.getElementsByClassName("remove")
  console.log(remove_buttons);
  for(let i=0;i<remove_buttons.length;i++){
    remove_buttons[i].addEventListener("click",()=>{
      let ID=remove_buttons[i].getAttribute("id");
      console.log(ID)
      remove_api(ID)
    })
  }
  // console.log(apiArr);
}

async function remove_api(ID) {
  fetchData = await fetch(
    `http://localhost:4500/delete/${ID}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    }
  );
  if (fetchData.status == 200) {
    let data = await fetchData.json();
    getApiData()
  }
}
