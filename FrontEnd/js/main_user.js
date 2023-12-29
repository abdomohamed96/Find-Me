// import { notification_text } from "../js/main_employee.js";
// BackEnd Variables
let is_found = 1;
let notification_text = "";
//
let notification_mes = "";
if (sessionStorage.getItem("notification_message")) {
  notification_mes = sessionStorage.getItem("notification_message");
  console.log("ana ali");
}
let complaintSubmit = document.querySelector(".complaint_btn");
let competitionSubmit = document.querySelector(".create_competition");
let itemType = document.querySelector("#item_type");
let form = document.querySelector(".lost_or_found_items .item_form");

let select_item_type_btn = document.querySelector(".select_item_type_btn");
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
          <div class="item_id field padding-bottom--24">
            <label for="item_id">Item ID</label>
            <input type="number" name="item_id" class="item_id"/>
          </div>
          <div class="color field padding-bottom--24">
            <div class="grid--50-50">
              <label for="color">Color</label>
            </div>
            <input type="text" name="color"/>
          </div>
          <div class="photo field padding-bottom--24">
            <label for="photo">Photo</label>
            <input type="text" name="photo"  id="photo" class="photo"/>
          </div>
          <div class="location field padding-bottom--24">
            <label for="location">Location</label>
            <input type="text" name="location"  id="location" class="location"/>
          </div>
          <div class="brand field padding-bottom--24">
            <label for="brand">Brand</label>
            <input type="text" name="brand" class="brand" id="brand"/>
          </div>
`;
  if (sessionStorage.getItem("item_type") === "laptop") {
    code += `
    <div class="version_type field padding-bottom--24">
      <label for="version_type">Version Type</label>
      <input type="text" id="version_type"/>
    </div>
    `;
  } else if (sessionStorage.getItem("item_type") === "glass") {
    code += `
    <div class="size field padding-bottom--24">
      <label>Lens Size</label>
      <input type="text" />
    </div>
    <div class="lens_type field padding-bottom--24">
      <label>Lens Type</label>
      <input type="text" />
    </div>
    `;
  } else if (sessionStorage.getItem("item_type") === "phone") {
    code += `
    <div class="phone_ip field padding-bottom--24">
      <label for="phone_ip">Phone Ip</label>
      <input type="text" id="phone_ip"/>
    </div>
    <div class="version_type field padding-bottom--24">
    <label for="version_type">Version Type</label>
    <input type="text" id="version_type"/>
    </div>
    `;
  }
  code += `
  <div class=" field padding-bottom--24">
    <input
      class="submit_item_btn"
      type="submit"
      name="submit"
      value="Continue"
    />
  </div>
  `;
  form.innerHTML = code;
  elements = document.querySelectorAll(".item_form > div");
  let submit_item_btn = document.querySelector(".submit_item_btn");
  submit_item_btn.addEventListener("click", (e) => {
    fill_item_data(elements, itemValues);
    reset_data(elements);
  });
}
// itemType.addEventListener("change", (e) => {
// itemValues = {};
// sessionStorage.setItem("item_type", `${e.target.value}`);
// updateData();
// });

select_item_type_btn.addEventListener("click", (e) => {
  itemValues = {};
  sessionStorage.setItem("item_type", `${itemType.value}`);
  updateData();
});

document.querySelector(".notification_message").innerHTML = notification_mes;
console.log(notification_mes);
complaintSubmit.addEventListener("click", (e) => {
  complaint_mes = document.querySelector(".complaints #complaint_msg");
  complaint_mes.value = "";
});

competitionSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  competitionElements = document.querySelectorAll(".competitions form > div");
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

// export { is_found };
