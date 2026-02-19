const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');

const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');


searchBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission
    console.log('Search button clicked!');

    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
})

const fetchRecipes = async (query) => {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    console.log(response);

    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h2>${meal.strMeal}</h2>
            <p>${meal.strCategory}</p>
        `


        const button = document.createElement('button');
        button.textContent = 'View Recipe';
        recipeDiv.appendChild(button);

        button.addEventListener('click', () => {
            openRecipePopup(meal);
        });

        recipeContainer.appendChild(recipeDiv);
    });
}


const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <h3>Ingredients</h3>
        <ul> ${fetchIngredients(meal)}</ul>
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
        
    `;
    recipeDetailsContent.parentElement.style.display = 'block';
}

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = 'none';
});

const fetchIngredients = (meal) => {
    let ingredients = '';
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li>${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
        }
        else {
            break;
        }
    }
    return ingredients;
}