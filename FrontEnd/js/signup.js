let signup_content = document.querySelector(".page-js");
let submit_btn;
function show_user(value) {
  let code = `
    <form action="">
      <div class="fname">
        <label>First Name</label>
        <input type="text" />
      </div> 
      <div class="lname">
        <label>Last Name</label>
        <input type="text" />
      </div>    
      <div class="email">
        <label>Email</label>
        <input type="mail" />
      </div>
      <div class="password">
        <label>Password</label>
        <input type="password" />
      </div>
      <div class="gender">
        <select name="" id="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="neither">Prefer Not To Say</option>
        </select>
      </div>
      <div class="location">
        <label>Location</label>
        <input type="text" />
      </div>
      <div class="age">
        <label>Age</label>
        <input type="number" />
      </div>
    
  `;
  if (value === "normal_user") {
    code += `
      <div class="balance">
        <label>Balance</label>
        <input type="text" />
      </div>
    `;
    sessionStorage.setItem("user_type", "normal_user");
  } else {
    code += `
      <div class="price_per_km">
        <label>Price Per Km</label>
        <input type="text" />
      </div>
      <div class="transmission">
        <label>Transmission</label>
        <input type="text" />
      </div>
  `;
    sessionStorage.setItem("user_type", "driver");
  }
  code += `<button class="sign_up_btn">submit</button> </form>`;
  signup_content.innerHTML = code;
  submit_btn = document.querySelector(".sign_up_btn");
}
function store_data() {
  sessionStorage.setItem(
    "name",
    `${document.querySelector("[type='mail']").value}`
  );
  sessionStorage.setItem(
    "password",
    `${document.querySelector("[type='password']").value}`
  );
}
let userTypes = document.querySelector("#user_types");
userTypes.addEventListener("change", (e) => {
  show_user(e.target.value);
  submit_btn.addEventListener("click", (e) => {
    e.preventDefault();
    store_data();
    if (sessionStorage.getItem("user_type") === "normal_user") {
      window.location.replace("../html/main_user.html");
    } else {
      window.location.replace("../html/main_driver.html");
    }
  });
});
