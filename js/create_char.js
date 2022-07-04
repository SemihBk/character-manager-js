export { create_char };

//////////////////////
//  ADD A NEW CHARACTER

function create_char() {
  /* -----------------Traitement image--------------- */
  const fileInput = document.getElementById("pictureInput");

  // This is for storing the base64 strings
  let myFiles = {};
  // if you expect files by default, make this disabled
  // we will wait until the last file being processed
  let isFilesReady = true;

  fileInput.addEventListener("change", async (event) => {
    const files = event.srcElement.files;

    console.log(files);
  });

  ////////////////////////////////////////////
  // Converting input file to base64 string //
  ////////////////////////////////////////////

  // We are going to use native FileReader API to read files from the input
  fileInput.addEventListener("change", async (event) => {
    // clean up earliest items
    myFiles = {};
    // set state of files to false until each of them is processed
    isFilesReady = false;

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
        isFilesReady = true;
      })
      .catch((error) => {
        console.log(error);
        console.log("something wrong happened");
      });
  });

  // Now we can access FileReader data using event.target.result but we need to transform it to Base64 string, let's do that:

  fileInput.addEventListener("change", async (event) => {
    // clean up earliest files
    myFiles = {};
    // set state of files to false until each of them is processed
    isFilesReady = false;

    const files = event.srcElement.files;

    const filePromises = Object.entries(files).map((item) => {
      return new Promise((resolve, reject) => {
        const [index, file] = item;
        const reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onload = function (event) {
          // Convert file to Base64 string
          // btoa is built int javascript function for base64 encoding
          myFiles["picture"] = btoa(event.target.result);

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
        isFilesReady = true;
        console.log(myFiles);
      })
      .catch((error) => {
        console.log(error);
        console.log("something wrong happened");
      });
  });

  // ADDEVENTLISTENER

  const btnCreate = document.getElementById("btn-submit");
  btnCreate.addEventListener("click", function () {
    new_character();
  });

  // fonction pour ajouter un nouveau character
  function new_character() {
    axios
      .post("https://character-database.becode.xyz/characters", {
        name: document.getElementById("in_name").value,
        shortDescription: document.getElementById("in_short_description").value,
        description: document.getElementById("in_description").value,
        image: myFiles["picture"],
      })
      .then(function (response) {
        location.reload();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
