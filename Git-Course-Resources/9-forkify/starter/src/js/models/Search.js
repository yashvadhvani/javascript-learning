import axious from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults() {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = '8b6f800465ece3cb8dad5d7eb3795446';
        try {
            const res = await axious(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.recipes = res.data.recipes;
            // console.log(this.recipes);
        
        } catch (err) {
            alert(err);
        }

    }
}