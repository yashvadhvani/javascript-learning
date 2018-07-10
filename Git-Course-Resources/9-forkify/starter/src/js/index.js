//8b6f800465ece3cb8dad5d7eb3795446
//http://food2fork.com/api/search
//https://cors-anywhere.herokuapp.com/
//https://crossorigin.me/

import * as recipeView from './Views/recipeView';
import * as searchView from './Views/searchView';
import * as listView from './Views/listView';
import * as likesView from './Views/likesView';
import {
    elements,
    renderLoader,
    clearLoader
} from './Views/base';
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';

/** Global State of the app
 * - Search object
 * - Current Recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};


state.likes=new Likes();
const controlSearch = async () => {
    // 1) Get Query from View
    const query = searchView.getInput();
    if (query) {
        //2) New Search object and add to state
        state.search = new Search(query);
        //3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        //4) Search for recipes
        try {
            await state.search.getResults();

            //5) Render result to UI
            clearLoader();
            searchView.renderResults(state.search.recipes)
        } catch (err) {
            alert('Something Wrong');
        } finally {
            clearLoader();
        }
    }
}

elements.searchButton.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.recipes, goToPage)
    }
})
const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    if (id) {
        //prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //highlight Selected search item
        if (state.search)
            searchView.highLightSelected(id);

        //create new recipe object
        state.recipe = new Recipe(id);

        //get recipe data
        try {
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            // console.log(state.recipe.parseIngredients());
            //calculate serving and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            //render Recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe,state.likes.isLiked(id));
        } catch (err) {
            alert('Error Processing Recipe');
            console.log(err);
        }

    }
}
// window.addEventListener('hashchange',controlRecipe);
// window.addEventListener('load',controlRecipe);
['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));
/**
 * List Controller
 */
const controlList = () => {
    //create anew list if there is none
    if (!state.list) state.list = new List();

    //Add new Ingredients to list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    })
}

/**
 * Like Controller
 */
const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currentId = state.recipe.id;
    if (!state.likes.isLiked(currentId)) {
        //Add Like
        const newLike= state.likes.addLike(
            currentId,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );
        //Toggle The like Button
        likesView.toggleLikedBtn(true);
        //Add like to UI
        likesView.renderLike(newLike);
    } else {
        state.likes.deleteLike(currentId);
        likesView.toggleLikedBtn(false);
        likesView.deleteLike(currentId);
    }
    likesView.toggleLikedMenu(state.likes.getNumLikes());
}
//Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    //Handle the delete event
    if (e.target.matches('.shopping__delete,.shopping__delete *')) {
        //delete from state
        state.list.deleteItem(id);

        //delete from UI
        listView.deleteItem(id);
    } else if (e.target.matches('.shopping__count--value')) {
        const val = parseFloat(e.target.value);
        state.list.updateCount(id, val);
        
    }
});
//Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        //Decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add,.recipe__btn--add *')) {
        controlList();
    } else if (e.target.matches('.recipe__love,.recipe__love *')) {
        controlLike();
    }
});

window.l = new List();