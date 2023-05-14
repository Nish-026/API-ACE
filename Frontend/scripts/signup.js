
let register = async () => {
  try {
    let name = document.querySelector("#username").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    if (name == "" || email == "" || password == "") {
      alert("please fill all fields");
      return;
    }

    let regdata = {
      name,
      email,
      password,
    };

    await fetch("http://localhost:4500/user/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(regdata),
    })
      .then(async (result) => {
        const data = await result.text();
        if (result.status == 200) {
          alert(data);
          window.location.href = "./login.html";
        } else {
          alert(data);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(data);
      });
  } catch (err) {
    console.log(err);
  }
};


