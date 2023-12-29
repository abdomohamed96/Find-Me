// Backend Variables
let isFree = 1;
let driverPathInfo = {};
//
document.querySelector("#select_car").value = "";
document.querySelector("#from").value = "";
document.querySelector("#to").value = "";
document.querySelector(".select_price input").value = "";
let driver_request_btn = document.querySelector(".driver_request");
driver_request_btn.addEventListener("click", (e) => {
  driverPathInfo["car"] = document.querySelector("#select_car").value;
  driverPathInfo["route_start"] = document.querySelector("#from").value;
  driverPathInfo["route_end"] = document.querySelector("#to").value;
  driverPathInfo["price"] = document.querySelector(".select_price input").value;
  console.log(driverPathInfo);
  document.querySelector("#select_car").value = "";
  document.querySelector("#from").value = "";
  document.querySelector("#to").value = "";
  document.querySelector(".select_price input").value = "";
});
