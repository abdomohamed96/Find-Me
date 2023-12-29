let signup_content = document.querySelector(".signup-root");
let submit_btn;
function show_user(value) {
  let code = `
  <div class="singup-root">
    <div
      class="box-root flex-flex flex-direction--column"
      style="min-height: 100vh; flex-grow: 1"
    >
      <div class="loginbackground box-background--white padding-top--64">
        <div class="loginbackground-gridContainer">
          <div
            class="box-root flex-flex"
            style="grid-area: top / start / 8 / end"
          >
            <div
              class="box-root"
              style="
                background-image: linear-gradient(
                  white 0%,
                  rgb(247, 250, 252) 33%
                );
                flex-grow: 1;
              "
            ></div>
          </div>
          <div class="box-root flex-flex" style="grid-area: 4 / 2 / auto / 5">
            <div
              class="box-root box-divider--light-all-2 animationLeftRight tans3s"
              style="flex-grow: 1"
            ></div>
          </div>
          <div
            class="box-root flex-flex"
            style="grid-area: 6 / start / auto / 2"
          >
            <div
              class="box-root box-background--blue800"
              style="flex-grow: 1"
            ></div>
          </div>
          <div
            class="box-root flex-flex"
            style="grid-area: 7 / start / auto / 4"
          >
            <div
              class="box-root box-background--blue animationLeftRight"
              style="flex-grow: 1"
            ></div>
          </div>
          <div class="box-root flex-flex" style="grid-area: 8 / 4 / auto / 6">
            <div
              class="box-root box-background--gray100 animationLeftRight tans3s"
              style="flex-grow: 1"
            ></div>
          </div>
          <div
            class="box-root flex-flex"
            style="grid-area: 2 / 15 / auto / end"
          >
            <div
              class="box-root box-background--cyan200 animationRightLeft tans4s"
              style="flex-grow: 1"
            ></div>
          </div>
          <div
            class="box-root flex-flex"
            style="grid-area: 3 / 14 / auto / end"
          >
            <div
              class="box-root box-background--blue animationRightLeft"
              style="flex-grow: 1"
            ></div>
          </div>
          <div
            class="box-root flex-flex"
            style="grid-area: 4 / 17 / auto / 20"
          >
            <div
              class="box-root box-background--gray100 animationRightLeft tans4s"
              style="flex-grow: 1"
            ></div>
          </div>
          <div
            class="box-root flex-flex"
            style="grid-area: 5 / 14 / auto / 17"
          >
            <div
              class="box-root box-divider--light-all-2 animationRightLeft tans3s"
              style="flex-grow: 1"
            ></div>
          </div>
        </div>
      </div>
      <div
        class="box-root padding-top--24 flex-flex flex-direction--column"
        style="flex-grow: 1; z-index: 9"
      >
        <div
          class="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center"
        >
          <h1 id="lginh1">LOG IN</h1>
        </div>
        <div class="formbg-outer">
          <div class="formbg">
            <div class="formbg-inner padding-horizontal--48">
              <span class="padding-bottom--15">Sign in to your account</span>
              <form id="stripe-login">
                <div class="fname field padding-bottom--24">
                  <label for="fname">First Name</label>
                  <input type="fname" name="fname" class="fname"/>
                </div>

                <div class="lname field padding-bottom--24">
                  <label for="lname">Last Name</label>
                  <input type="lname" name="lname" class="lname"/>
                </div>

                <div class="email field padding-bottom--24">
                  <label for="email">Email</label>
                  <input type="email" name="email" class="email"/>
                </div>

                <div class="password field padding-bottom--24">
                  <div class="grid--50-50">
                    <label for="password">Password</label>
                  </div>
                  <input type="password" name="password"/>
                </div>
                <div class="gender field padding-bottom--24">
                  <label for="gender">Gender</label>
                  <select class="gender field padding-bottom--24" name="gender" id="gender">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="neither">Prefer Not To Say</option>
                </select>
                </div>

                <div class="age field padding-bottom--24">
                  <label for="age">Age</label>
                  <input type="number" name="age" class="age"/>
                </div>

                <div
                  class="field field-checkbox padding-bottom--24 flex-flex align-center"
                ></div>
  `;
  if (value === "Normal_user") {
    code += `
    <div class="balance field padding-bottom--24">
      <label for="balance">Balance</label>
      <input type="number" name="balance" class="balance"/>
    </div>
    `;
    sessionStorage.setItem("user_type", "Normal_user");
  } else {
    code += `
    <div class="price_per_km field padding-bottom--24">
      <label for="price_per_km">Price/Km</label>
      <input type="number" name="price_per_km" class="price_per_km"/>
    </div>
    <div class="transmission field padding-bottom--24">
      <label for="transmission">transmission</label>
      <input type="number" name="transmission" class="transmission"/>
    </div>
    `;
    sessionStorage.setItem("user_type", "Delivery");
  }
  code += `
                <div class="field padding-bottom--24">
                  <input class="sign_up_btn" type="submit" name="submit" value="Continue" />
                </div>
              </form>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `;
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
let sign_upButton = document.querySelector(".check_type_btn");

sign_upButton.addEventListener("click", (e) => {
  e.preventDefault();
  show_user(userTypes.value);
  // store_data();
  if (sessionStorage.getItem("user_type") === "Normal_user") {
    window.location.replace("../html/main_user.html");
  } else {
    window.location.replace("../html/main_driver.html");
  }
});
