import {
    elements
} from './base';

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
    elements.searchInput.value = '';
};
export const clearResults = () => {
    elements.searchResultList.innerHTML = '';
    elements.searchResPages.innerHTML='';
}

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, curr) => {
            if (acc + curr.length <= limit) {
                newTitle.push(curr);
            }
            return acc + curr.length;
        }, 0);
        return `${newTitle.join(' ')}...`;
    }
    return title;
}

const createButton = (page, type) => ` 
    <button class = "btn-inline results__btn--prev" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <span> Page ${type === 'prev' ? page - 1 : page + 1} </span> 
        <svg class = "search__icon">
            <use href = "img/icons.svg#icon-triangle-${type=== 'prev' ? 'left' : 'right'}"></use> 
        </svg> 
    </button> 
    `;

const renderRecipes = recipe => {
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`
    elements.searchResultList.insertAdjacentHTML("beforeend", markup)
}

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if (page === 1) {
        //Next Page Button only
        button= createButton(page,'next');
    } else if (page === pages) {
        //Prev Page Button Only
        button= createButton(page,'prev');
    } else {
        //Both Buttons
        button= `${createButton(page,'prev')}
        ${createButton(page,'next')}`;
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin',button);
}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipes);

    //render Pagination Buttons
    renderButtons(page,recipes.length,resPerPage);
}
