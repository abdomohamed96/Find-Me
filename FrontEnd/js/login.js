

let login_content = document.querySelector(".page-js");
let submit_btn;
function show_user(value) {
  let code = `
    <form action="">
      <div class="email">
        <label>Email</label>
        <input type="mail" />
      </div>
      <div class="password">
        <label>Password</label>
        <input type="password" />
      </div>
      <button class="log_in_btn">submit</button>
    </form>
  `;
  login_content.innerHTML = code;
  submit_btn = document.querySelector(".log_in_btn");
  if (value === "employee") {
    sessionStorage.setItem("user_type", "Employee");
  } else if (value === "normal_user") {
    sessionStorage.setItem("user_type", "Normal_user");
  } else {
    sessionStorage.setItem("user_type", "Delivery");
  }
}
async function store_data() {
  // sessionStorage.setItem(
  //   "email",
  //   `${document.querySelector("[type='mail']").value}`
  // );
  // sessionStorage.setItem(
  //   "password",
  //   `${document.querySelector("[type='password']").value}`
  // );
  // fetch("http://localhost:3002/api/login", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     // Other headers if needed
  //   },
  //   body: JSON.stringify({ email: "admin2@gmail.com", password: "123456789", user_type: 'Employee' }), // Data to send in the request body
  // })
  //   .then((response) => console.log(response.json().token))
  //   // .then((data) => console.log(data))
  //   .catch((error) => console.error("Error:", error));

  const response = await fetch("http://localhost:3002/api/login", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      // Other headers if needed
    },
    body: JSON.stringify({ email: "admin2@gmail.com", password: "123456789", user_type: 'Employee' }),
  });
  console.log(response)
}
// store_data();
let userTypes = document.querySelector("#user_types");
userTypes.addEventListener("change", (e) => {
  show_user(e.target.value);
  submit_btn.addEventListener("click", (e) => {
    e.preventDefault();
    // store_data();
    fetch("http://localhost:3002/api/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        // Other headers if needed
      },
      body: JSON.stringify({ email: "admin2@gmail.com", password: "123456789", user_type: 'Employee' }),
    }).then((res) => { console.log(res) });
    if (sessionStorage.getItem("user_type") === "Normal_user") {
      window.location.replace("../html/main_user.html");
    } else if (sessionStorage.getItem("user_type") === "Delivery") {
      window.location.replace("../html/main_driver.html");
    } else {
      window.location.replace("../html/main_employee.html");
    }
  });
});
