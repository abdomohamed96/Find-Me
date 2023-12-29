let login_content = document.querySelector(".login-root");
let submit_btn;
function show_user(value) {
  let code = `
    <div class="login-root">
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
                  <div
                    class="field field-checkbox padding-bottom--24 flex-flex align-center"
                  ></div>
                  <div class="field padding-bottom--24">
                    <input class="log_in_btn" type="submit" name="submit" value="Continue" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
let check_type_btn = document.querySelector(".check_type_btn");
let userTypes = document.querySelector("#user_types");
check_type_btn.addEventListener("click", (e) => {
  e.preventDefault();
  // store_data();
  show_user(userTypes.value);
  // ------------------------
  // fetch("https://jsonplaceholder.typicode.com/posts", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     // Other headers if needed
  //   },
  //   body: JSON.stringify({
  //     userId: 312,
  //     id: 1211,
  //     title:
  //       "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  //     body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  //   }), // Data to send in the request body
  // })
  //   .then((response) => response.json())
  //   .then((data) => console.log(data))
  //   .catch((error) => console.error("Error:", error));
  // ------------------------
  if (sessionStorage.getItem("user_type") === "Normal_user") {
    window.location.replace("../html/main_user.html");
  } else if (sessionStorage.getItem("user_type") === "Delivery") {
    window.location.replace("../html/main_driver.html");
  } else {
    window.location.replace("../html/main_employee.html");
  }
});
