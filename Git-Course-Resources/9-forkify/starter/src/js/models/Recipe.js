import axios from 'axios';
import {key,proxy} from '../config';
export default class Recipe{
    constructor(id){
        this.id=id;
    }

    async getRecipe(){
        try {
            const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&Id=${this.query}`);
            // this.title = res.data.recipe.title;
            // this.author=res.data.recipe.publisher;
            // this.img=res.data.recipe.img_url;
            // this.url=res.data.recipe.source_url;
            // this.ingredients=res.data.recipe.ingredients;

            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
}