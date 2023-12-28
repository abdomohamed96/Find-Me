import { is_found } from "./main_user.js";
let notification_text,
  products_code = "",
  backend_products;
backend_products = [
  {
    product_id: 123,
    brand: "hamas",
    type: "phone",
  },
  {
    product_id: 12341,
    brand: "hamas1123",
    type: "laptop",
  },
  {
    product_id: 12312,
    brand: "hamas22",
    type: "glass",
  },
];
console.log(is_found);
let notification_btn = document.querySelector(
  ".notification .submit_notification"
);
notification_btn.addEventListener("click", (e) => {
  notification_text = document.querySelector(".notification #mes");
  console.log(notification_text);
  sessionStorage.setItem("notification_message", `${notification_text.value}`);
});
let products = document.getElementById("available_products");
backend_products.forEach((el) => {
  products_code += `
  <option>
    <div value="${el.product_id}">${el.product_id}</div>
    <div value="${el.brand}">${el.brand}</div>
    <div value="${el.type}">${el.type}</div>
  </option>`;
});
products.innerHTML = products_code;

let event_code, event_submit;
let offer_events = document.querySelector(".set_offer .container form");
let human_events = document.querySelector(".set_h_work .container form");
let selected_event = document.querySelector("#event");
let myEvent = {},
  myCar = {};
selected_event.addEventListener("change", (e) => {
  offer_events.innerHTML = "";
  human_events.innerHTML = "";
  event_code = `
  </div>
    <div class="event_id">
      <label>Event ID</label>
      <input type="number" />
    </div>
    <div class="event_name">
      <label>Event Name</label>
      <input type="text" />
    </div> 
    <div class="event_start_date">
      <label>Event Start Date</label>
      <input type="date" />
    </div>  
    <div class="event_end_date">
      <label>Event End Date</label>
      <input type="date" />
    </div>    
    <div class="description">
      <label>Description</label>
      <input type="text" />
    </div>
  `;
  if (e.target.value === "offer") {
    event_code += `
      <div class="driver_or_user">
        <select name="" id="driver_or_user">
          <option value="driver">Driver</option>
          <option value="user">User</option>
        </select>
      </div>
      <div class="offer_percentage">
        <label>Offer Percentage</label>
        <input type="number" />
      </div>
      <button>submit</button>
    `;
    offer_events.innerHTML = event_code;
  } else {
    event_code += `
      <div class="charity_account_number">
        <label>Charity Account Number</label>
        <input type="number" />
      </div>
      <div class="charity_name">
        <label>Charity Name</label>
        <input type="text" />
      </div>
      <div class="charity_email">
        <label>Charity Email</label>
        <input type="mail" />
      </div>
      <button class="event_submit">submit</button>
    `;
    human_events.innerHTML = event_code;
  }
  event_submit = document.querySelector(".event_submit");
  event_submit.addEventListener("click", (event) => {
    event.preventDefault();
    myEvent["event_name"] = `${
      document.querySelector(".event_name input").value
    }`;
    myEvent["event_start_date"] = `${
      document.querySelector(".event_start_date input").value
    }`;
    myEvent["event_end_date"] = `${
      document.querySelector(".event_end_date input").value
    }`;
    myEvent["description"] = `${
      document.querySelector(".description input").value
    }`;
    myEvent["event_type"] = e.target.value;
    if (e.target.value === "offer") {
      myEvent["offer_percentage"] = `${
        document.querySelector(".offer_percentage input").value
      }`;
      myEvent["driver_or_user"] = `${
        document.querySelector("#driver_or_user").value
      }`;
    } else {
      myEvent["charity_account_number"] = `${
        document.querySelector(".charity_account_number input").value
      }`;
      myEvent["charity_name"] = `${
        document.querySelector(".charity_name input").value
      }`;
      myEvent["charity_email"] = `${
        document.querySelector(".charity_email input").value
      }`;
    }
    console.log(myEvent);
  });
});

let car_submit_btn = document.querySelector(".car_submit");
let car_form = document.querySelectorAll(".add_car .container form input");
car_submit_btn.addEventListener("click", (e) => {
  e.preventDefault();
  myCar["car_id"] = document.querySelector(
    ".add_car .container form .car_id input"
  ).value;
  myCar["registration_date"] = document.querySelector(
    ".add_car .container form .registration_date input"
  ).value;
  myCar["manufacturing_date"] = document.querySelector(
    ".add_car .container form .manufacturing_date input"
  ).value;
  myCar["is_available"] = document.querySelector(
    ".add_car .container form #is_available"
  ).value;
  myCar["transmission"] = document.querySelector(
    ".add_car .container form .transmission input"
  ).value;
  myCar["price"] = document.querySelector(
    ".add_car .container form .price input"
  ).value;
  myCar["model"] = document.querySelector(
    ".add_car .container form .model input"
  ).value;
  myCar["brand"] = document.querySelector(
    ".add_car .container form .brand input"
  ).value;
  myCar["center_id"] = document.querySelector(
    ".add_car .container form .center_id input"
  ).value;
  console.log(myCar);
  car_form.forEach((el) => {
    el.value = "";
  });
});
