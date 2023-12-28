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
function store_data() {
  // sessionStorage.setItem(
  //   "email",
  //   `${document.querySelector("[type='mail']").value}`
  // );
  // sessionStorage.setItem(
  //   "password",
  //   `${document.querySelector("[type='password']").value}`
  // );
  fetch("https://reqres.in/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Other headers if needed
    },
    body: JSON.stringify({ key: "value" }), // Data to send in the request body
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}
let userTypes = document.querySelector("#user_types");
userTypes.addEventListener("change", (e) => {
  show_user(e.target.value);
  submit_btn.addEventListener("click", (e) => {
    e.preventDefault();
    store_data();
    if (sessionStorage.getItem("user_type") === "Normal_user") {
      window.location.replace("../html/main_user.html");
    } else if (sessionStorage.getItem("user_type") === "Delivery") {
      window.location.replace("../html/main_driver.html");
    } else {
      window.location.replace("../html/main_employee.html");
    }
  });
});
