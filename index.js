'use strict';

//const { forEach } = require("async");

const baseUrl = "https://recipe-puppy.p.rapidapi.com/";
const host = "recipe-puppy.p.rapidapi.com";
const apiKey = "65ecb5ffaamshaec6ef4d281b1d8p126c8fjsn4e72a949ea28";

const options = {
    headers: new Headers({
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": host,
        "useQueryString": true
    })      
};

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => {
            if (params[key] !== "") {
                return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
            }
        })
    return queryItems.join('&');
}

function getRandomRecipeData() {
    fetch(baseUrl + `?p=${Math.floor(Math.random()*(10 - 1) + 1)}&onlyImages=1`, options)
        .then(response => response.json())
        .then(responseJson => displayRandomRecipeOfTheDay(responseJson));
};

function getRecipes(userRecipeInput, userIngredientInput) {
    const params = {
        q: userRecipeInput,
        i: userIngredientInput
    };   

    const queryString = formatQueryParams(params)
    const url = baseUrl + '?' + queryString + '&onlyImages=1';

    fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            alert('Please try another recipe or ingredient.');
        })    
        .then(responseJson => displayResults(responseJson));
}

function displayRandomRecipeOfTheDay(responseJson) {
        const randomRecipe = responseJson.results[Math.floor(Math.random()*responseJson.results.length)];
        const radnomRecipeIngredients = randomRecipe.ingredients.split(",");
        let radnomRecipeIngreditentsList = "";

        radnomRecipeIngredients.forEach((ingredient,i) => {
            radnomRecipeIngreditentsList += `<li>${ingredient}</li>`
        })

        $('#js-random-daily-recipe').append(`
            <div class="item dailyrecipe">
            <h3>${randomRecipe.title}</h3>
                <img src="${randomRecipe.thumbnail}" alt="${randomRecipe.title}">
            </div>
            <div class="item">
                <h4>Ingredients:</h4>
                <ul>${radnomRecipeIngreditentsList}</ul>
                <hr>
                <a href="${randomRecipe.href}" target="_blank">link to recipe</a>
            </div>
            
        `)
}
  
function displayResults(responseJson) {
    console.log(responseJson);
    $('#js-recipe-results').empty();
    for (let i = 0; i < responseJson.results.length; i++) {
        
        // let recipeIngredients = responseJson.results[i].ingredients.split(",");
        // let ingredientList = "";

        // recipeIngredients.forEach((ingredient,i) => {
        //     ingredientList += `<li>${ingredient}</li>` 
        // })

        //GOES UNDER THE LINK:
        //<h4>Ingredients: </h4>
        //<ul>${ingredientList}</ul>
        
        $('#js-recipe-results').append(`
            <div class="recipe-result">
                <div class="item">
                    <img src="${responseJson.results[i].thumbnail}" alt="${responseJson.results[i].title}">
                </div>
                <div class="item">
                    <h3>${responseJson.results[i].title}</h3>
                    <a href="${responseJson.results[i].href}" target="_blank">link to recipe</a>
                    <p><b>Ingredients:</b> ${responseJson.results[i].ingredients}</p>
                <div>    
            </div>
        `) 
};  
    $('#js-recipe-results-container').removeClass("hidden")
    $('#js-recipe-o-day').addClass("hidden")
}

function submitFormListner() {
    $('#submit').click(event => {
        event.preventDefault();
        const userRecipeInput = $('#js-recipe-search').val();
        const userIngredientInput = $('#js-ingredient-search').val();
        getRecipes(userRecipeInput, userIngredientInput);
    })
        
}

$(function() {
    submitFormListner();
    getRandomRecipeData();
});

// fetch("https://recipe-puppy.p.rapidapi.com/?p=1&i=onions%2Cgarlic&q=omelet", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "65ecb5ffaamshaec6ef4d281b1d8p126c8fjsn4e72a949ea28",
// 		"x-rapidapi-host": "recipe-puppy.p.rapidapi.com"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });