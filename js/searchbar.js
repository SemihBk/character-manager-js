export { search_bar };

////////////////////////////////
//				 Searchbar				  //
////////////////////////////////
function search_bar() {
  const url = "https://character-database.becode.xyz/characters";
  const inputSearch = document.getElementById("search");
  inputSearch.addEventListener("keyup", (e) => {
    if (e.key == "Enter" && inputSearch.value != "") {
      axios
        .get(url)
        .then(function (response) {
          // handle success
          search_details(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    }
  });

  const inputBtnSearch = document.getElementById("btn-search");
  inputBtnSearch.addEventListener("click", (e) => {
    axios
      .get(url)
      .then(function (response) {
        // handle success
        search_details(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  });
  /* ----------Search function-----------  */
  function search_details(value) {
    let find = 0;
    for (let i = 0; i < value.data.length; i++) {
      if (inputSearch.value.toUpperCase() == value.data[i].name.toUpperCase()) {
        const card = document.querySelectorAll(".card");
        console.log(document.querySelectorAll(".name"));

        console.log("success !");
        document.querySelector(".name").innerHTML = value.data[i].name;
        document.querySelector(".short-description").innerHTML =
          value.data[i].shortDescription;
        document.querySelector(".description").innerHTML =
          value.data[i].description;
        document.querySelector(".img").src =
          "data:image/*;base64," + value.data[i].image;
        document.querySelector(".card").dataset.id = value.data[i].id;

        for (let i = 1; i < value.data.length; i++) {
          console.log("success !");

          card[i].style.display = "none";

          document.querySelector(".swiper-button-prev").style.display = "none";
          document.querySelector(".swiper-button-next").style.display = "none";
          document.querySelector(".swiper-pagination").style.display = "none";
        }

        inputSearch.value = "";
        find = 1;
      }
    }
    if (find == 0) {
      alert(`${inputSearch.value} not found !`);
    }
  }
}
