/**
 * Set cookie in the browser
 * @param {string} cname: cookie name 
 * @param {string} cvalue: cookie value 
 * @param {string} exdays: days until expiration 
 */
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + "SameSite=Lax;" + expires + ";path=/";
}

/**
 * Retrieve cookie from browser given 
 * cookie name
 * @param {string} cname: cookie name 
 * @returns value of the cookie or "" if it doesn't exist
 */
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/**
 * Retrieves count from cookie
 */
function getCount() {
  let count = getCookie("count");
  if (count !== "") {
    return Number(count);
  } else {
    return 0;
  }
}

/**
 * Retrieves pets per second from cookie
 */
function getPetsPerSecond() {
  let count = getCookie("pps");
  if (count !== "") {
    return Number(count);
  } else {
    return 0;
  }
}

function addPetsPerSecond(count, petsPerSecond) {
  setInterval(() => {
    document.getElementById("count").innerHTML = count + petsPerSecond;
    setCookie("count", count + petsPerSecond, 120);
  }, 1000);
}

let clickerButton = document.getElementById('clicker__button');
let count = getCount();
let petsPerSecond = 5;

document.getElementById("count").innerHTML = count;
document.getElementById("pets__num").innerHTML = petsPerSecond;

setInterval(() => {
  count = count + petsPerSecond;
  document.getElementById("count").innerHTML = count;
  setCookie("count", count, 120);
}, 1000);

clickerButton.onclick = function () {
  document.getElementById("count").innerHTML = ++count
  setCookie("count", count, 120);
}