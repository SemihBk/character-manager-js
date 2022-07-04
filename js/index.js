import { swiper } from "./swiper.js";
import { edit_char } from "./edit_char.js";
import { delete_char } from "./delete_char.js";
import { create_char } from "./create_char.js";
import { search_bar } from "./searchbar.js";
import { modal } from "./modal.js";

get_character();

function get_character() {
  axios
    .get("https://character-database.becode.xyz/characters")
    .then(function (response) {
      ///////////////
      // CREATE CARDS
      ///////////////
      for (let i = 0; i < response.data.length; i++) {
        api_details(response);
        function api_details(value) {
          const swipperWrapper = document.querySelector(".flex");
          // create div card
          const newDiv = document.createElement("div");
          newDiv.classList.add("card", "swiper-slide");
          swipperWrapper.appendChild(newDiv);

          // create img
          const image = document.createElement("img");
          image.classList.add("img");
          newDiv.appendChild(image);

          // create new div transparent
          const divTransparent = document.createElement("div");
          divTransparent.classList.add("transparent");
          newDiv.appendChild(divTransparent);

          // create h1 name
          const namePerso = document.createElement("h1");
          namePerso.classList.add("name");
          divTransparent.appendChild(namePerso);

          // create p short description
          const shortDescription = document.createElement("p");
          shortDescription.classList.add("short-description");
          divTransparent.appendChild(shortDescription);

          // create p id
          const idNum = document.createElement("p");
          idNum.classList.add("id-num");
          divTransparent.appendChild(idNum);

          // create p global description
          const globalDescription = document.createElement("p");
          globalDescription.classList.add("description");
          divTransparent.appendChild(globalDescription);

          // create button learn more
          const buttonLM = document.createElement("a");
          const textButtonLM = document.createTextNode("More");
          buttonLM.classList.add("btn-lm", "modal-card-trigger");
          buttonLM.appendChild(textButtonLM);
          divTransparent.appendChild(buttonLM);

          // create button edit
          const buttonEdit = document.createElement("a");
          const textButtonEdit = document.createTextNode("Edit");
          buttonEdit.classList.add("btn-edit", "modal-edit-trigger");
          buttonEdit.appendChild(textButtonEdit);
          newDiv.appendChild(buttonEdit);

          // create button delete
          const buttonDelete = document.createElement("a");
          const textButtonDelete = document.createTextNode("X");
          buttonDelete.classList.add("btn-delete", "modal-delete-trigger");
          buttonDelete.setAttribute("id", "bt_del");
          buttonDelete.appendChild(textButtonDelete);
          newDiv.appendChild(buttonDelete);

          let buttonALM = document.querySelectorAll(".btn-lm");
          // buttonALM[i].setAttribute("href", "#");

          namePerso.innerHTML = value.data[i].name;
          shortDescription.innerHTML = value.data[i].shortDescription;
          globalDescription.innerHTML = value.data[i].description;
          image.src = "data:image/*;base64," + value.data[i].image;
          // idNum.innerHTML = value.data[i].id;
          newDiv.dataset.id = value.data[i].id;
        }
      }

      ///////////////////
      // MODAL CARD FOCUS
      ///////////////////

      const modalCardContainer = document.querySelector(
        ".modal-card-container"
      );
      const modalCardTriggers = document.querySelectorAll(
        ".modal-card-trigger"
      );

      modalCardTriggers.forEach((trigger) =>
        trigger.addEventListener("click", (e) => {
          toggleCardModal();

          const cardClone = document.querySelector(".card-clone");

          console.log(cardClone.childNodes);

          const eTargetParent = e.target.parentElement;
          const parentTransparentIsCard = eTargetParent.parentElement;
          cardClone.innerHTML = parentTransparentIsCard.innerHTML;

          const imgClone = cardClone.childNodes[0];
          const editClone = cardClone.childNodes[2];
          const deleteClone = cardClone.childNodes[3];

          const divTransparentClone = cardClone.childNodes[1];
          const nameClone = divTransparentClone.childNodes[0];
          const shortDescriptionClone = divTransparentClone.childNodes[1];
          const descriptionClone = divTransparentClone.childNodes[3];
          const buttonLMClone = divTransparentClone.childNodes[4];

          editClone.remove();
          deleteClone.remove();
          buttonLMClone.remove();

          imgClone.classList.add("img-clone");
          divTransparentClone.classList.add("transparent-clone");
          nameClone.classList.add("name-clone");
          shortDescriptionClone.classList.add("short-description-clone");
          descriptionClone.classList.add("description-clone");

          // document.querySelector(".name-clone").innerHTML = nameOG;
        })
      );

      function toggleCardModal() {
        modalCardContainer.classList.toggle("active");
      }

      delete_char();

      edit_char();
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}

swiper();

modal();

create_char();

search_bar();
