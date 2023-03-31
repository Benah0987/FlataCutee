 "use strict";
//The program first adds an event listener for when the DOM content is loaded
 document.addEventListener("DOMContentLoaded", function () {
  /*  it gets references to two elements in the HTML document using their IDs: 
  animalNames and animalDetails*/

  const animalNames = document.querySelector("#animalNames");
  const animalDetails = document.querySelector("#animalDetails");

  /* It then defines an asynchronous function 
  getData() that uses the fetch() API to get data from a JSON file.*/

  const getData = async function () {
    const response = await fetch(
      "https://phase-1-week-2-code-challenge.vercel.app/db.json"
    );
    const data = await response.json();
  //how the data is passed using the response.json
    return data.characters;
  };

  // The program then defines another asynchronous function renderAnimalNames() that calls getData()
  const renderAnimalNames = async function () {
    const data = await getData();

    //it uses the map() method to iterate over the animals array in the JSON file
    data.map((item) => {

      //for each element it creates a HTML string that contain the animal's name
      const markUp = `<p>${item.name}</p>`;
      //then the names are inserted using the insertAdjacentHTML
      animalNames.insertAdjacentHTML("beforeend", markUp);
    });
  };
  renderAnimalNames();

  // the program defines another function
  //asynchronous function renderAnimalDetails() that takes an event as a parameter
  const renderAnimalDetails = async function (e) {
    //it first calls the array character
    const data = await getData();

    //uses the map method to iterate over the characters
    data.map((item) => {

      //checks if the name of the animal matches the innerHTML name
      if (e.target.innerHTML === item.name) {
        //if true, it will crete a voting section, name, and image
        const markUp = `<div class="animalCard">

    
      <p>${item.name}</p>
      <img src="${item.image}" alt="${item.name}">
      <div class="votes">
        <label>
          <span id="label">Enter no. of votes 0 - 10</span>
          <input id="votesInput" type="number" min="0" max="10">
        </label>
        <p id="vote"><i class="fa-regular fa-heart"></i></p>
        <p id="votesCount">votes: ${item.votes}</p>
      </div>
    </div>`;
        animalDetails.innerHTML = "";
        animalDetails.insertAdjacentHTML("afterbegin", markUp);
      }
    });
  };
  //the async functions gets called evrytym the user clics on animalName
  animalNames.addEventListener("click", renderAnimalDetails);
  

  // asynchronous function renderVotes that takea an event as a parameter
  const renderVotes = async function (e) {
    const data = await getData();
    data.map((item) => {
      if (e.target.classList.contains("fa-heart")) {
        // getting elements from the DOM
        const inputSec = animalDetails.querySelector("label");
        const labelContent = animalDetails.querySelector("#label");
        const heart = document.querySelector(".fa-heart");
        const votesCount = document.querySelector("#votesCount");
        const votesInput = parseInt(
          document.querySelector("#votesInput").value
        );
        // Initializing votes
        let votes = item.votes;
        // setting votes range from 0 to 10
        if (votesInput >= 0 && votesInput <= 10) {
          labelContent.textContent = "enter no. of votes 0 - 10";
          heart.classList.toggle("red");
          if (heart.classList.contains("red")) {
            votes += votesInput;
            inputSec.style.display = "none";
          } else {
            votes = item.votes;
            inputSec.style.display = "block";
          }
        } else {
          labelContent.textContent = "enter votes within range";
        }
        votesCount.innerHTML = `votes: ${votes}`;
      }
    });
  };

  animalDetails.addEventListener("click", renderVotes);

  // add animals section
  const addAnimalBtn = document.querySelector("#addAnimal");
  const form = document.querySelector("form");
  const mainSection = document.querySelector(".mainSection");
  const closeForm = document.querySelector("#cancel");
  const addAnimalsSection = document.querySelector("#addAnimalsSection");

  // display form
  //function for displaying and hiding a form for adding a new anim
  const displayForm = function () {
    mainSection.style.filter = "blur(10px)";
    addAnimalsSection.style.display = "flex";
  };
  addAnimalBtn.addEventListener("click", displayForm);

  // hide form
  //When the user clicks on the "Cancel" button the hide form function is called
  al
  const hideForm = function () {
    addAnimalsSection.style.display = "none";
    mainSection.style.filter = "blur(0)";
  };
  closeForm.addEventListener("click", hideForm);

//user submits the form function
  const addAnimal = function (e) {
    e.preventDefault();
 //event to prevent offloading
 //an object that takes in the input from the form   
    const animalObj = {
      name: e.target.name.value,
      image: e.target.imageUrl.value,
      votes: 0
    };
    console.log(animalObj);
   
      
      hideForm();
      //function is also called to hide the form.
  };

  form.addEventListener("submit", addAnimal);
});