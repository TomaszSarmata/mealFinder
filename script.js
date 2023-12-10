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
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
        if (data.meals == null) {
          resultHeading.innerHTML = `<p>No results found for "${term}". Try again!</p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}}"/>
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
             
            </div>
          `
            )
            .join("");
        }
      });

    //clear search text
    search.value = "";
  } else {
    alert("please type in the name of the meal");
  }
}

//Fetch meal by id
function getMealByID(tookMealIDFromClickEvent) {
  fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${tookMealIDFromClickEvent}`
  )
    .then((response) => response.json())
    .then((data) => {
      const theMealFromAPI = data.meals[0];

      addMealToDOM(theMealFromAPI);
    });
}

//fetch random meal
function fetchRandomMeal() {
  //clear meal and heading
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";
  //fetching here
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((response) => response.json())
    .then((data) => {
      const randomMeal = data.meals[0];
      addMealToDOM(randomMeal);
    });
}

// Add meal to DOM
function addMealToDOM(theMealFromAPI) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (theMealFromAPI[`strIngredient${i}`]) {
      ingredients.push(
        `${theMealFromAPI[`strIngredient${i}`]} - ${
          theMealFromAPI[`strMeassure${i}`]
        }`
      );
    } else {
      break;
    }
  }
  single_mealEl.innerHTML = `
  <div class="single-meal">
    <h1>${theMealFromAPI.strMeal}</h1>
    <img src=${theMealFromAPI.strMealThumb} />
    <div class="single-meal-info">
      ${
        theMealFromAPI.strCategory ? `<p>${theMealFromAPI.strCategory}</p>` : ""
      }
      ${theMealFromAPI.strArea ? `<p>${theMealFromAPI.strArea}</p>` : ""}
    </div>
    <div class="main">
      <p>${theMealFromAPI.strInstructions}</p>
      <h2>Ingredients</h2>
      <ul>
        ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
      </ul>
    </div>
  </div>
  `;
}

//Event Listeners
submit.addEventListener("submit", searchMeal);
random.addEventListener("click", fetchRandomMeal);

mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.composedPath().find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealID");
    console.log(mealID);
    getMealByID(mealID); //took mealID from data attribute and will pass it on to the fetch above to get more data for a one specific meal
  }
});
