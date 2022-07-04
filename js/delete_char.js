export { delete_char };

/*------------------Boutton supprimer--------------------*/

function delete_char() {
  /////////////////////
  // MODAL DELETE FOCUS
  /////////////////////

  const modalDeleteContainer = document.querySelector(
    ".modal-delete-container"
  );
  const modalDeleteTriggers = document.querySelectorAll(
    ".modal-delete-trigger"
  );

  modalDeleteTriggers.forEach((trigger) =>
    trigger.addEventListener("click", (e) => {
      toggleDeleteModal();
    })
  );

  function toggleDeleteModal() {
    modalDeleteContainer.classList.toggle("active");
  }

  const layout = document.querySelectorAll(".card");

  layout.forEach((trigger) =>
    trigger.addEventListener("click", (e) => {
      e.preventDefault();

      const url = "https://character-database.becode.xyz/characters";
      let delButton = e.target.className == "btn-delete modal-delete-trigger";
      let id = e.target.parentElement.dataset.id;

      // console.log(e.target.className);

      const modal = document.querySelectorAll(".modal");

      modal.forEach((trigger) => {
        trigger.addEventListener("click", (e) => {
          // Delete the existing card
          if (delButton) {
            if (e.target.className == "btn-delete-confirm") {
              axios.delete(`${url}/${id}`).then(function (response) {
                location.reload();
                console.log(response);
              });
              console.log("Character deleted");
              alert("Successful deleted !");
            } else {
              console.log("Nothing's done");
            }
          }
        });
      });
    })
  );
}
