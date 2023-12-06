const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");

//Helper Functions

//search meal and fetch from api

function searchMeal(e) {
  e.preventDefault();

  //Clear single meal
  single_mealEl.innerHTML = "";

  //Get search term
  const term = search.value;

  //Check if term empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => console.log(data));
    resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
  } else {
    alert("please type in the name of the meal");
  }
}

// async function searchMeal(e) {
//   e.preventDefault();
//   const response = await fetch(
//     "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata"
//   );
//   const data = await response.json();
//   console.log(data.meals[0].strMealThumb);
//   updateUI(data);
// }

// function updateUI(data) {
//   let mealName = data.meals[0].strMeal;
//   resultHeading.innerText = mealName;
//   let mealImgUrl = data.meals[0].strMealThumb;
//   mealsEl.innerHTML = `<img src="${mealImgUrl}"/> <img src="${mealImgUrl}"/> <img src="${mealImgUrl}"/> <img src="${mealImgUrl}"/>`;
// }

//Event Listeners
submit.addEventListener("submit", searchMeal);
