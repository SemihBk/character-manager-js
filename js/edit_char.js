function edit_char() {
  // ///////////////////
  // // MODAL EDIT FOCUS
  // ///////////////////

  const modalEditContainer = document.querySelector(".modal-edit-container");
  const modalEditTriggers = document.querySelectorAll(".modal-edit-trigger");

  modalEditTriggers.forEach((trigger) =>
    trigger.addEventListener("click", (e) => {
      toggleEditModal();
    })
  );

  function toggleEditModal() {
    modalEditContainer.classList.toggle("active");
  }

  /*------------------Boutton edit--------------------*/

  const layout = document.querySelectorAll(".card");

  layout.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();

      let editButton = e.target.className == "btn-edit modal-edit-trigger";
      let id = e.target.parentElement.dataset.id;
      // console.log(id);
      // If edit button pressed
      if (editButton) {
        const parent = e.target.parentElement;
        const parentTransparent = parent.querySelector(".transparent");
        console.log(parentTransparent);
        let nameContent = parentTransparent.querySelector(".name").textContent;
        let shortDescriptionContent =
          parentTransparent.querySelector(".short-description").textContent;
        let descriptionContent =
          parent.querySelector(".description").textContent;
        const imageContent = parent.querySelector(".img").src;

        document.getElementById("edit_image").src = imageContent;
        document.getElementById("edit_name").value = nameContent;
        document.getElementById("edit_short_description").value =
          shortDescriptionContent;
        document.getElementById("edit_description").value = descriptionContent;
        //   document.querySelector(".edit_character").dataset.id = id;

        //
        //
        //
        //
        //
        //
        //
        //
        //

        /* -----------------Traitement image--------------- */
        const fileInput2 = document.getElementById("edit_pictureInput");
        // This is for storing the base64 strings
        let myFiles2 = {};
        // if you expect files by default, make this disabled
        // we will wait until the last file being processed
        let isFilesReady2 = true;

        fileInput2.addEventListener("change", async (event) => {
          const files = event.srcElement.files;

          console.log(files);
        });

        // Converting input file to base64 string //

        // We are going to use native FileReader API to read files from the input
        fileInput2.addEventListener("change", async (event) => {
          // clean up earliest items
          myFiles2 = {};
          // set state of files to false until each of them is processed
          isFilesReady2 = false;

          const files = event.srcElement.files;

          const filePromises = Object.entries(files).map((item) => {
            return new Promise((resolve, reject) => {
              const [index, file] = item;
              const reader = new FileReader();
              reader.readAsBinaryString(file);

              reader.onload = function (event) {
                // handle reader success

                resolve();
              };

              reader.onerror = function () {
                console.log("couldn't read the file");
                reject();
              };
            });
          });

          Promise.all(filePromises)
            .then(() => {
              // if each file processed successfuly then set our state to true
              isFilesReady2 = true;
            })
            .catch((error) => {
              console.log(error);
              console.log("something wrong happened");
            });
        });

        // Now we can access FileReader data using event.target.result but we need to transform it to Base64 string, let's do that:

        fileInput2.addEventListener("change", async (event) => {
          // clean up earliest files
          myFiles2 = {};
          // set state of files to false until each of them is processed
          isFilesReady2 = false;

          const files = event.srcElement.files;

          const filePromises = Object.entries(files).map((item) => {
            return new Promise((resolve, reject) => {
              const [index, file] = item;
              const reader = new FileReader();
              reader.readAsBinaryString(file);

              reader.onload = function (event) {
                // Convert file to Base64 string
                // btoa is built int javascript function for base64 encoding
                myFiles2["picture"] = btoa(event.target.result);

                resolve();
              };
              reader.onerror = function () {
                console.log("can't read the file");
                reject();
              };
            });
          });

          Promise.all(filePromises)
            .then(() => {
              console.log("ready to submit");
              isFilesReady2 = true;
              console.log(myFiles2);
              document.getElementById("edit_image").src = "data:image/*;base64," + (myFiles2['picture']);
            })
            .catch((error) => {
              console.log(error);
              console.log("something wrong happened");
            });
        });

        let btnEdit = document.querySelectorAll("#btn-edit");
        // variable pour cibler le boutton

        btnEdit.forEach((trigger) => {
          trigger.addEventListener("click", (e) => {
            e.preventDefault(); // event listener sur le click du boutton

            const url = "https://character-database.becode.xyz/characters";
            const parent = e.target.parentElement;
            console.log(parent);
            // let id = e.target.parentElement.dataset.id;
            let edit_image = parent.querySelector("#edit_image").src;
            let old_image = edit_image.substr(20);
            let file = document.getElementById("edit_pictureInput");
            let img;
            // // Test if not upload image
            if (file.files.length == 0) {
              img = old_image;
            } else {
              img = myFiles2["picture"];
            }
            // Method : PUT - Update data in existing character
            axios
              .put(`${url}/${id}`, {
                name: document.getElementById("edit_name").value,
                shortDescription: document.getElementById(
                  "edit_short_description"
                ).value,
                description: document.getElementById("edit_description").value,
                image: img,
              })
              .then(function (response) {
                console.log(response);
                location.reload(); // Reload page after done
                alert("Updated !"); // Message to inform that's done
              })
              .catch(function (error) {
                console.log(error);
              });
          });
        });
      }
    });
  });
}

export { edit_char };
