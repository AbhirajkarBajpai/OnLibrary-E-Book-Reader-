import axios from "axios";

import { showAlert } from "./alerts";

export const addToFavorites = async (event) => {
  const bookId = event.target.getAttribute("data-book-id");

  // Make an API call to add the book to favorites
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/v1/users/add-to-favorites",
      data: {
        bookId
      },
    });

    if (res.data.status === "success") {
      showAlert("success", res.data.message);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
