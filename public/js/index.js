import "@babel/polyfill";
import { login, signup, logout } from "./login";
import { updateSettings } from "./updateSettings";
import { initialiase } from "./bookPage";
import { addToFavorites } from "./favorites";

const loginForm = document.querySelector(".form--login");
const signupForm = document.querySelector(".form--signup");
const logOutBtn = document.querySelector(".nav__el--logout");
const userDataForm = document.querySelector(".form-user-data");
const userPasswordForm = document.querySelector(".form-user-password");
const button = document.querySelector("#read-book-btn");
const addToFavoritesButtons = document.querySelectorAll('.add-to-favorites');


if (loginForm)
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });

if (signupForm)
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("username").value;
    const email = document.getElementById("useremail").value;
    const password = document.getElementById("userpassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    signup(name, email, password, confirmPassword);
  });

if (logOutBtn) logOutBtn.addEventListener("click", logout);

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('username').value;
    const email = document.getElementById('useremail').value;
    updateSettings({ name, email }, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });


if(button)
button.addEventListener("click", initialiase);
google.books.load({ language: "en" });


if(addToFavoritesButtons)
addToFavoritesButtons.forEach(button => {
  button.addEventListener('click', addToFavorites);
});