document.querySelector("#setsubmit").addEventListener("click", async () => {
    let email = document.querySelector("#setemail").value;
    let password = document.querySelector("#setpass").value;
    let repassword = document.querySelector("#resetpass").value;

    if (email == "" || password == "" || repassword == "") {
      alert("Fill all the details");
    } else if (password !== repassword) {
      alert("Re-write Password not match");
    } else {
      try {
        let regdata = {
          email,
          password,
        };

        await fetch("http://localhost:4500/user/reset", {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(regdata),
        })
          .then(async (result) => {
            const data = await result.json();
            if (data.ok) {
              Swal.fire(`${data.message}`);
              window.location.href = "./login.html";
            } else {
              Swal.fire(data.message);
            }
          })
          .catch((err) => {
            console.log(err);
            alert(err);
          });
      } catch (err) {
        console.log(err);
      }
    }
  });