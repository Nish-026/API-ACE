let mail = "";
let password = "";
let otpval = 0;

document.querySelector("#submit").addEventListener("click", () => {
  mail = document.querySelector("#otpemail").value;
  password = document.querySelector("#pass").value;
  if (mail == "" || password == "") {
    Swal.fire("Fill the all details");
  } else {
    let otp = async () => {
      try {
        let regdata = {
          email: mail,
        };

        await fetch(`${URL}/user/otp`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(regdata),
        })
          .then(async (result) => {
            const data = await result.json();
            if (data.ok) {
              otpval = data.message;
              Swal.fire(`OTP is - ${data.message}`);
              document.querySelector("#otp").style.display = "block";
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
    };

    otp();
  }
});

document.querySelector("#ok").addEventListener("click", () => {
  const paaskey = document.querySelector("#val").value;
  if (paaskey == "") {
    Swal.fire("Enter Correct OTP");
  } else if (otpval == paaskey) {
    Swal.fire("OTP Verified");
    window.location.href = "setPassword.html";
  } else {
    Swal.fire("Wrong OTP");
  }
});

// -----------------------------------otp part done----------------------------------
