var namesignin = document.getElementById("name");
var emailsignin = document.getElementById("one");
var passsignin = document.getElementById("two");
var emailsignup = document.getElementById("four");
var passsignup = document.getElementById("five");
var inputs = JSON.parse(localStorage.getItem("inp")) || [];

function add() {
  if (check() == true) {
    if (exists()) {
      var inp = {
        name: namesignin.value,
        email: emailsignin.value,
        pass: passsignin.value,
      };
      inputs.push(inp);
      localStorage.setItem("inp", JSON.stringify(inputs));
      displaySuccess();
    } else {
      displayExists();
    }
  } else {
    displayCheck();
  }
}

function check() {
  if (
    namesignin.value != "" &&
    emailsignin.value != "" &&
    passsignin.value != ""
  ) {
    return true;
  } else {
    return false;
  }
}

function exists() {
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].email === emailsignin.value) {
      return false;
    }
  }
  return true;
}

function displayCheck() {
  document.getElementById(
    "required"
  ).innerHTML = `<p class="text-danger m-2">All inputs are required</p>`;
}

function displayExists() {
  document.getElementById(
    "required"
  ).innerHTML = `<p class="text-danger m-2">Email already exists</p>`;
}

function displaySuccess() {
  document.getElementById(
    "required"
  ).innerHTML = `<p class="text-warning m-2">Success</p>`;
}

function clear() {
  namesignin.value = "";
  emailsignin.value = "";
  passsignin.value = "";
}

function login() {
  var email = emailsignup.value;
  var password = passsignup.value;

  var user = inputs.find(function (user) {
    return user.email === email && user.pass === password;
  });

  if (user) {
    sessionStorage.setItem("username", user.name);
    window.location.href = "welcome.html";
  } else {
    document.getElementById(
      "required"
    ).innerHTML = `<p class="text-danger m-2">Invalid email or password</p>`;
  }
}

window.onload = function () {
  if (window.location.pathname.includes("welcome.html")) {
    var username = sessionStorage.getItem("username");
    if (username) {
      document.getElementById("username").innerText = username;
    } else {
      window.location.href = "index.html";
    }
  }
};
