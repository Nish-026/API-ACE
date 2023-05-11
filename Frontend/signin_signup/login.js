// ----------------------------------------------------------------------------

let logindata = async () => {
    const email = document.querySelector("#logmail").value;
    const password = document.querySelector("#logpass").value;
    if (email == "" || password == "") {
      alert("please fill all fields");
      return;
    }
    const payload = {
      email,
      password,
    };
  
    const fetchedData = await fetch("http://localhost:4500/user/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  
    const data = await fetchedData.json();
    if (fetchedData.status == 200) {
      console.log(data);
      Swal.fire('Yay! Login Successful 😍')
      localStorage.setItem("userID", data.userID);
      localStorage.setItem("username", data.username);
      localStorage.setItem("token", data.token);
      setTimeout(() => {
        window.location.href = "../index.html";
      }, "2000");
      
    } else {
      Swal.fire('Wrong Credentials ❌')
    }
  };



google_button.addEventListener("click", ()=>{
    window.location.href = "http://localhost:4500/auth/google/"
})

github_button.addEventListener("click", ()=>{
    window.location.href = "http://localhost:4500/auth/github/"
})