let staurate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hue_rotate = document.getElementById("hue-rotate");
let invert = document.getElementById("invert");
let drop_shadow = document.getElementById("drop-shadow");

let upload = document.getElementById("upload");
let download = document.getElementById("download");
let img = document.getElementById("img");
let reset = document.querySelector("span");
let imgBox = document.querySelector(".img-box");
let filters = document.querySelectorAll("ul li input");
let canvas = document.getElementById("canvas");
let pnge = document.getElementById("png");
let ctx = canvas.getContext("2d");

function resetValue() {
  ctx.filter = "none";
  staurate.value = "100";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "0";
  grayscale.value = "0";
  blur.value = "0";
  hue_rotate.value = "0";
  invert.value = "0";

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

function showAlert() {
  const alertPlaceholder = document.getElementById("alerto");
  const alert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} d-flex  alert-dismissible fade show" role="alert"id="navB">`,
      `<svg xmlns="http://www.w3.org/2000/svg" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:"style="width:20;height:20px">
      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
    </svg><div>${message}</div>  `,
      `  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`,
      "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);
  };

  alert(
    "Please chose a picture that contains 600/600 in it's dimentions",
    "primary"
  );
}

window.onload = function () {
  setTimeout(() => {
    showAlert();
    // alert(`Please chose a picture that contains 600/600 in it's dimentions  `)
  }, 5000);
  if (img.src === "") {
    download.style.display = "none";
    reset.style.display = "none";
    pnge.style.display = "none";
    imgBox.style.display = "none";
  }
};
upload.onchange = function () {
  resetValue();
  download.style.display = "block";
  reset.style.display = "block";
  pnge.style.display = "block";
  imgBox.style.display = "block";
  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = function () {
    img.src = file.result;
  };
  img.onload = function () {
    // let imgW = img.src.width;
    // let imgh = img.src.height;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.style.display = "none";
  };
};
filters.forEach((filter) => {
  filter.addEventListener("input", function () {
    ctx.filter = `
    saturate(${staurate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayscale.value})
    blur(${blur.value}px)
    hue-rotate(${hue_rotate.value}deg)
    invert(${invert.value}%)
    
    `;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  });
});

download.onclick = function () {
  download.href = canvas.toDataURL("image/jpeg");
};
pnge.onclick = function () {
  pnge.href = canvas.toDataURL("");
};

// reset.onclick = function () {
//   resetValue();
// };
// contrast.addEventListener("input", function () {
//   img.style.filter = `contrast(${contrast.value}%)`;
// });
