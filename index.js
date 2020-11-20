'use strict';

const baseUrl = "https://recipe-puppy.p.rapidapi.com/";
const host = "recipe-puppy.p.rapidapi.com"
const apiKey = "65ecb5ffaamshaec6ef4d281b1d8p126c8fjsn4e72a949ea28";

//"https://recipe-puppy.p.rapidapi.com/?p=1&i=onions%2Cgarlic&q=omelet"

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function getRecipes(query) {
    const params = {
        q: query
    };

    const queryString = formatQueryParams(params)
    const url = baseUrl + '?' + queryString;

    const options = {
        headers: new Headers({
 		    "x-rapidapi-key": apiKey,
            "x-rapidapi-host": host,
            "useQueryString": true })
    };

    fetch(url, options)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson));
}

// function displayRandomRecipeOfTheDay(responseJson) {
//    for (let i = 0; i < responseJson.results.length; i++) {
//         const randomRecipe = responseJson[Math.floor(Math.random()*responseJson.length)];
//         console.log(randomRecipe);
//         const RecipeOfTheDay = Object.create(randomRecipe);
//         RecipeOfTheDay.thumbnail

//         ]
//         $('#js-random-daily-recipe').append(`
//             <div class="double">
//                 <img src="${randomRecipeOfTheDay[i].thumbnail}" alt="${randomRecipeOfTheDay[i].title}">
//                 <h3>${randomRecipeOfTheDay[i].title}</h3>
//                 <a href="${randomRecipeOfTheDay[i].href}" target="_blank">link to recipe</a>
//             </div>
//             <div class="double">
//                 <h3>Ingredients:</h3>
//                 <p>${randomRecipeOfTheDay.ingredients}</p>
//             </div>
//         `)
//    };
// }
  
function displayResults(responseJson) {
    console.log(responseJson);
    $('#js-recipe-search').empty();
    for (let i = 0; i < responseJson.results.length; i++) {            
        $('#js-recipe-results').append(`
            <div class="double">
                <img src="${responseJson.results[i].thumbnail}" alt="${responseJson.results[i].title}">
                <h3>${responseJson.results[i].title}</h3>
                <a href="${responseJson.results[i].href}" target="_blank">link to recipe</a>
            </div>
            <div class="double">
            <h3>Ingredients:</h3>
            <p>${responseJson.results[i].ingredients}</p>
            </div>
        `)   
    };    
    $('#js-recipe-results-container').removeClass("hidden")
}

// function displayIngredients(responseJson) {
//     let recipeIngredients = [];
//     for (let i = 0; i < responseJson.results.length; i++) {
//         recipeIngredients = responseJson.results[i].ingredients.split(",")
//     };
//     return recipeIngredients;
// }


function submitFormListner() {
    $('#submit').click(event => {
        event.preventDefault();
        const userRecipeInput = $('#js-recipe-search').val();
        getRecipes(userRecipeInput);
    })
        
}

$(function() {
    submitFormListner();
//    displayRandomRecipeOfTheDay();
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