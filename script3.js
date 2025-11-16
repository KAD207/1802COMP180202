const wrapper = document.querySelector(".wrapper");
const registerLinks = document.querySelectorAll(".register-link");
const iconClose = document.querySelector(".icon-close");

registerLinks.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        wrapper.classList.toggle("active"); 
    });
});

iconClose.addEventListener("click", () => {
    wrapper.classList.remove("active");
});

const btnPopup = document.querySelector(".btnLogin-popup");
btnPopup.addEventListener("click", () => {
    wrapper.classList.add("active-popup");
});

const iconClosePopup = document.querySelector(".icon-close");
iconClosePopup.addEventListener("click", () => {
    wrapper.classList.remove("active-popup");
});

const loginBtn = document.querySelector(".btn");
const Email = document.querySelector(".email");
const Password = document.querySelector(".password");
if (Email.value !== "" && Password.value !== "") {
    function goToTDL() {
        location.href = `TDL.html`;
    }
};