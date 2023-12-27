const form = document.forms["form"];
const formArr = Array.from(form);
const validFormArr = [];
const button = form.elements["button"];

formArr.forEach((el) => {
  if (el.hasAttribute("data-reg")) {
    el.setAttribute("is-valid", "0");
    validFormArr.push(el);
  }
});

form.addEventListener("input", inputHandler);
button.addEventListener("click", formCheck);

function inputHandler({ target }) {
  if (target.hasAttribute("data-reg")) {
    inputCheck(target);
  }
}

function inputCheck(el) {
  const inputValue = el.value;
  const inputReg = el.getAttribute("data-reg");
  const reg = new RegExp(inputReg);
  if (reg.test(inputValue)) {
    el.setAttribute("is-valid", "1");
    el.style.border = "2px solid rgb(0, 196, 0)";
  } else {
    el.setAttribute("is-valid", "0");
    el.style.border = "2px solid rgb(255, 0, 0)";
  }
}

function formCheck(e) {
  e.preventDefault();
  const allValid = validFormArr.map(el => el.getAttribute("is-valid"));
  const isAllValid = allValid.every(value => value === "1");
  if (!isAllValid) {
    alert("Введите корректное значение!");
    return;
  }
  formSubmit();
}

async function formSubmit() {
  const data = serializeForm(form);
  const response = await sendData(data);
  console.log(response);
  if (response.ok) {
    let result = await response.json();
    alert(result.message);
    formReset();
  } else {
    alert("Код ошибки:" + response.status);
  }
}

function serializeForm(formNode) {
  return new FormData(formNode);
}
  
async function sendData(data) {
  const response = await fetch("send_mail.php", {
    method: "POST",
    body: data
  });
  return response;
}

function formReset() {
  form.reset();
  validFormArr.forEach((el) => {
    el.setAttribute("is-Valid", 0);
    el.style.border = "none";
  })
}