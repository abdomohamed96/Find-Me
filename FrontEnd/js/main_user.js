// import { notification_text } from "../js/main_employee.js";
// BackEnd Variables
let is_found = 1;
//
let notification_mes = "";
if (sessionStorage.getItem("notification_message")) {
  notification_mes = sessionStorage.getItem("notification_message");
  console.log("ana ali");
}
let complaintSubmit = document.querySelector(".complaints button");
let competitionSubmit = document.querySelector(".create_competition");
let itemType = document.querySelector("#item_type");
let form = document.querySelector(".lost_or_found_items .item_form");
let itemValues = {},
  competitionValues = {};
let code;
let elements, competitionElements;
let complaint_mes;
function fill_item_data(myElements, myValues) {
  myElements.forEach((el) => {
    myValues[el.classList[0]] = el.children[1].value;
  });
}
function reset_data(myElements) {
  myElements.forEach((el) => {
    el.children[1].value = "";
  });
}
function updateData() {
  code = `
  <div class="item_id">
    <label>Item ID</label>
    <input type="text" />
  </div>
  <div class="color">
    <label>Color</label>
    <input type="text" />
  </div>
  <div class="photo">
    <label>Photo</label>
    <input type="text" />
  </div>
  <div class="location">
    <label>Location</label>
    <input type="text" />
  </div>
  <div class="brand">
    <label>Brand</label>
    <input type="text" />
  </div>
`;
  if (sessionStorage.getItem("item_type") === "laptop") {
    code += `
    <div class="version_type">
      <label>Version Type</label>
      <input type="text" />
    </div>
    `;
  } else if (sessionStorage.getItem("item_type") === "glass") {
    code += `
    <div class="size">
      <label>Lens Size</label>
      <input type="text" />
    </div>
    <div class="lens_type">
      <label>Lens Type</label>
      <input type="text" />
    </div>
    `;
  } else if (sessionStorage.getItem("item_type") === "phone") {
    code += `
    <div class="phone_ip">
      <label>Phone Ip</label>
      <input type="text" />
    </div>
    <div class="version_type">
      <label>Version Type</label>
      <input type="text" />
    </div>
    `;
  }
  code += `<button class="lost_found_btn">submit</button>`;
  form.innerHTML = code;
  elements = document.querySelectorAll(".item_form > div");
  let btn = document.querySelector(".lost_found_btn");
  btn.addEventListener("click", (e) => {
    fill_item_data(elements, itemValues);
    reset_data(elements);
  });
}
itemType.addEventListener("change", (e) => {
  itemValues = {};
  sessionStorage.setItem("item_type", `${e.target.value}`);
  updateData();
});

document.querySelector(".notification_message").innerHTML = notification_mes;
console.log(notification_mes);
complaintSubmit.addEventListener("click", (e) => {
  complaint_mes = document.querySelector(".complaints #complaint_msg");
  complaint_mes.value = "";
});

competitionSubmit.addEventListener("click", (e) => {
  competitionElements = document.querySelectorAll(
    ".competitions .container > div"
  );
  fill_item_data(competitionElements, competitionValues);
  reset_data(competitionElements);
});
let recentPosts = document.querySelector(".recent_posts .container");
if (is_found) {
  recentPosts.innerHTML = `
    <p>Surprise, Your iphone has been found Recently </p>
    <select name="" id="available_drivers">
      <option value="ahmed">Ahmed price: <span>20$</span></option>
      <option value="ali">Ali price: <span>10$</span></option>
      <option value="youssef">youssef price: <span>15$</span></option>
    </select>
    <button class="select_driver">Select Driver</button>
  `;
  let select_driver_btn = document.querySelector(".select_driver");
  select_driver_btn.addEventListener("click", (e) => {
    recentPosts.innerHTML = `
    <label for="rate">Rate</label>
    <input type="number" id="rate">
    <button class="rate_submit">Submit Rate</button>
    `;
    let rate_submit_btn = document.querySelector(".rate_submit");
    rate_submit_btn.addEventListener("click", (e) => {
      recentPosts.innerHTML = "";
    });
  });
}

export { is_found };
