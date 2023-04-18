
import { showAlert } from './alerts'; 

const isbn = document.querySelector(".isbn");

export function nextStep(viewer) {
  window.setTimeout(function () {
    viewer.nextPage();
    nextStep(viewer);
  }, 3000);
}

function alertNotFound() {
  showAlert('error', "Book Not Found");
}

export function initialiase() {
  var viewer = new google.books.DefaultViewer(
    document.getElementById("viewerCanvas")
  );

  viewer.load("ISBN:" + isbn.value, alertNotFound);
}
