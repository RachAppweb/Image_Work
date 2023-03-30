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

window.onload = function () {
  setTimeout(() => {
    // showAlert();
    alert(`Please chose a picture that contains 600/600 in it's dimentions  `);
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
