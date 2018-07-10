import axios from 'axios';
import {
    key,
    proxy
} from '../config';
export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;

            // console.log(res);
        } catch (error) {
            console.log(error);
            alert('Something Went Wrong');
        }
    }
    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }
    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoon', 'tablespoons', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound']
        const units=[...unitsShort, 'kg','g']
        // console.log(this.ingredients);
        const newIngredients = this.ingredients.map(e1 => {
            // 1) Uniform Units
            let ingredient = e1.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });
            // 2) Remove parenthesis 
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");
            // 3) parse ingredients into count, unit  and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(elm => units.includes(elm));

            let objIng;
            if (unitIndex > -1) {
                const arrCount = arrIng.slice(0, unitIndex);

                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'))
                } else {
                    count = eval (arrIng.slice(0,unitIndex).join('+'));
                }
                // arrIng.slice(0,unitIndex);
                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient :arrIng.slice(unitIndex+1).join(' ')
                    
                }
            } else if (parseInt(arrIng[0], 10)) {
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient : arrIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient

                }
            }
            // console.log(objIng);    
            return objIng;
        });
        this.ingredients = newIngredients;
    }
    updateServings(type) {
        //Servings
        const newServings = type === 'dec' ?this.servings -1 : this.servings +1;

        //Ingredients
        this.ingredients.forEach(ing => {
            ing.count *=  ( newServings / this.servings);
        })
        this.servings =newServings;
    }
}