//8b6f800465ece3cb8dad5d7eb3795446
//http://food2fork.com/api/search
//https://cors-anywhere.herokuapp.com/
//https://crossorigin.me/


import * as searchView from './Views/searchView';
import {elements} from './Views/base';
import Search from './models/Search';
/** Global State of the app
 * - Search object
 * - Current Recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state ={};



const controlSearch= async () => {
    // 1) Get Query from View
    const query = searchView.getInput();
    if(query){
        //2) New Search object and add to state
        state.search=new Search(query);
        //3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        //4) Search for recipes
        
        await state.search.getResults();

        //5) Render result to UI
        searchView.renderResults(state.search.recipes)

    }
}

elements.searchButton.addEventListener('submit',e => {
    e.preventDefault();
    controlSearch();
})

// const search =new Search('Pizza');
// search.getResults();