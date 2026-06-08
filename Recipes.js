let itemE1 = document.getElementById("item");

let allRecipes = [];

async function getallrecipes() {

    try {

        let res = await fetch("https://dummyjson.com/recipes");

        let data = await res.json();
        allRecipes = data.recipes;
        displayallRecipes(allRecipes);

    }

    catch(err){

        console.log("Something Went Wrong");

    }

}

getallrecipes();

async function searchrecipes(){

    let valueE1 = document.getElementById("value").value;

    try{

        if(!valueE1) {

            getallrecipes();
            return;

        }

        let res = await fetch(`https://dummyjson.com/recipes/search?q=${valueE1}`);

        let data = await res.json();
        displayallRecipes(data.recipes);

    }

    catch(err){

        console.log("Something Went Wrong");

    }

}

async function Filtermeal(){

    let filtermealE1 = document.getElementById("Filtermeal").value;

    try {

        if(filtermealE1 === "Filter by meal") {

            getallrecipes();

            return;

        }

        let meal = filtermealE1.toLowerCase();

        let res = await fetch(`https://dummyjson.com/recipes/meal-type/${meal}`);
        let data = await res.json();

        displayallRecipes(data.recipes);

    }

    catch(err) {

        console.log("Something went wrong");

    }

}

function filterby(){

    let filterE1 = document.getElementById("filter").value;

    if(!filterE1){

        displayallRecipes(allRecipes);

        return;

    }

    let filtervalue = allRecipes.filter(item => {

        return item.cuisine.toLowerCase() === filterE1.toLowerCase();

    });

    displayallRecipes(filtervalue);

}

function displayallRecipes(recipes){

    itemE1.innerHTML = "";

    if(!recipes || recipes.length === 0) {

        itemE1.innerHTML = "<h1>No Items Found! 😐</h1>";

        return;

    }

    recipes.forEach(item => {

        let divE1 = document.createElement("div");

        divE1.classList.add("cards");
        divE1.classList.add("text");

        itemE1.appendChild(divE1);

        let h3E1 = document.createElement("h3");
        h3E1.textContent = item.name;
        divE1.appendChild(h3E1);

        let imgE1 = document.createElement("img");
        imgE1.src = item.image;
        imgE1.onclick = function(){

            getsingle(item.id);

        }

        imgE1.classList.add("item-image");

        divE1.appendChild(imgE1);

        let p1E1 = document.createElement("p");
        p1E1.textContent = "Type : " + item.cuisine;
        divE1.appendChild(p1E1);

        let p2E1 = document.createElement("p");
        p2E1.textContent = "Rating : ⭐ " + item.rating;
        divE1.appendChild(p2E1);

        let p3E1 = document.createElement("p");
        p3E1.textContent = "Cooking Time : " + item.cookTimeMinutes + " mins";
        divE1.appendChild(p3E1);

    });

}

async function getsingle(id){

    let res = await fetch(`https://dummyjson.com/recipes/${id}`);
    let data = await res.json();
    displaysingle(data);

}

function displaysingle(recipe) {

    itemE1.innerHTML = "";

    let divE1 = document.createElement("div");
    divE1.classList.add("single-card");

    divE1.innerHTML = `
        <button onclick="getallrecipes()">⬅ Back to Recipes</button>

        <h2 class="recipe-title">${recipe.name}</h2>

        <div class="recipe-layout">

            <div class="left-section">

                <img src="${recipe.image}" class="detail-image">

                <p><strong>Type :</strong> ${recipe.cuisine}</p>

                <p><strong>Rating :</strong> ⭐ ${recipe.rating}</p>

                <p><strong>Cooking Time :</strong> ${recipe.cookTimeMinutes} mins</p>

                <p><strong>Calories :</strong> ${recipe.caloriesPerServing}</p>

                <p><strong>Difficulty :</strong> ${recipe.difficulty}</p>

                <p><strong>Servings :</strong> ${recipe.servings}</p>

            </div>

            <div class="right-section">

                <h3>Ingredients</h3>

                <ul>
                    ${recipe.ingredients.map(item => `<li>${item}</li>`).join("")}
                </ul>

                <h3>Instructions</h3>

                <ol>
                    ${recipe.instructions.map(step => `<li>${step}</li>`).join("")}
                </ol>

            </div>

        </div>
    `;

    itemE1.appendChild(divE1);
}