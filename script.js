const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
// document.querySelector takes the first matching element it finds and assigns it to a constant variable. this is so that we can use these elements later in the code.
//'.searchBox': The CSS selector looking for an element with class="searchBox".


//for recipe details
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');


searchBtn.addEventListener('click', (e) => {
    e.preventDefault(); //this prevents the default behavior of the button, which is to submit the form and refresh the page. -> allows the button was clicked message to stay
    //add the e in the () and the line above after typing the console log
    console.log("button was clicked")
    //now when you do control shift j for dev tools and click the button, you will see "button was clicked" in the console.

    const searchInput = searchBox.value.trim(); //this gets the value that the user typed in the search box and assigns it to a variable called searchInput.
    fetchRecipes(searchInput); //this calls the fetchRecipes function and passes the searchInput variable as an argument.
});

//this is the function that will fetch recipes from the API based on the search query
const fetchRecipes = async (query) => {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);

    const response = await data.json(); //this converts the data to json format so that we can work with it easily in javascript.

    recipeContainer.innerHTML = ""; //this clears the recipe container before displaying new recipes.this is so that we dont have "Serach your favorite recipes" and the new recipes at the same time
    console.log(response);
    //await keyword means that the function will wait for the promise to resolve before moving on to the next line of code. 
    //add await after and then async
    // it can only be used inside an async function.

    //after this go back in dev tools, refresh, and type in cake or salad or something and go to the console to see the response from the API.


    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        //this line creates a new div element in the HTML document and assigns it to a variable called recipeDiv. we do this to display each recipe we get from the API.

        recipeDiv.classList.add('recipe');
        //this line adds a class called 'recipe' to the recipeDiv element. this is so that we can style it later using CSS.

        recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}" />  
            <h3>${meal.strMeal}</h3>
            <p>${meal.strCategory}</p>

        `


        //this line sets the inner HTML of the recipeDiv element to an image tag with the source set to the meal's thumbnail image URL from the API response.

        //recipeContainer.appendChild(recipeDiv);

        //this line appends the recipeDiv element to the recipeContainer element in the HTML document. this is so that the recipe is displayed on the webpage.

        //go back to dev tools and look at the images (button goes on top but do it after recipeContainer line)

        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        //now we need to add the eventlistened to the recipe button so that when we click on it, it will show us the recipe instructions.
        button.addEventListener('click', () => {
            openRecipePopup(meal);
        });



        recipeContainer.appendChild(recipeDiv);
    });

}

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2 >${meal.strMeal}</h2>
        <h3>Ingredients: </h3>
        <ul >${fetchIngredients(meal)}</ul>
        <div>
            <h3>Instructions: </h3>
            <p >${meal.strInstructions}</p>
        </div>
    `
    recipeDetailsContent.parentElement.style.display = 'block';
}

//to get ingredients and measurements
const fetchIngredients = (meal) => {
    let ingredientList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientList += `<li>${measure} ${ingredient}</li>`;
        } else {
            break;
        }
    }
    //this function loops through the ingredients and measurements in the meal object and creates a list of ingredients with their corresponding measurements. it checks if the ingredient exists (not empty) and if it does, it adds it to the ingredientList string in the form of a list item. if it encounters an empty ingredient, it breaks out of the loop.
    return ingredientList;
}


recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = 'none';
    //this line hides the recipe details popup when the close button is clicked by setting the display property of the parent element of recipeDetailsContent to 'none'.
})
