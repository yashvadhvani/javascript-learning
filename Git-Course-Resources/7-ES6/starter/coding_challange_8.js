/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/
class Basic{
    constructor(name,year){
        this.name=name;
        this.year =year;
    }
}
class Park extends Basic{
    constructor(name,year,area,no_of_trees){
        super(name,year);
        this.no_of_trees =no_of_trees;
        this.area=area;
    }
    treeDensity(){
        return `The density of ${this.name} is ${this.no_of_trees/this.area}`;
    }
}
class Street extends Basic{ 
    constructor(name,year,len,size = 3){
        super(name,year);
        this.len=len;
        this.size=size;
    }
    classify(){
        const classification =new Map();
        classification.set(1,'tiny');
        classification.set(2,'small');
        classification.set(3,'normal');
        classification.set(4,'big');
        classification.set(5,'huge');
        console.log(`${this.name} street build in ${this.year} is ${classification.get(this.size)}`);
    }
}

function calc(arr){
    let sum =arr.reduce((prev,curr) => prev+curr);
    return [sum,sum/arr.length];
}

const allParks = [new Park('Green Park', 1987, 0.2, 215),new Park('National Park', 1894, 2.9, 3541),
                 new Park('Oak Park', 1953, 0.4, 949)];

const allStreets = [new Street('Ocean Avenue', 1999, 1.1, 4),
                   new Street('Evergreen Street', 2008, 2.7, 2),
                   new Street('4th Strjs', 2015, 0.8),
                   new Street('Sunset jslevard', 1982, 2.5, 5)];

function reportParks(p){
    //Tree Density
    p.forEach(element => console.log(element.treeDensity()));

    //Avarage age of every park
    //const ages=p.map(element => new jse().getFullYear() - element.year);
    const [totalAge,avgAge] = calc(p.map(element => new Date().getFullYear() - element.year));
    console.log(`The Average age of ${p.length} parks is ${avgAge}`);

    //Park with more than 1000 trees
    const i =p.map(element => element.no_of_trees).findIndex(element => element >=1000);
    // console.log(i);
    console.log(p[i].name);
}

function reportStreets(s){
    //Total and average length of the town's streets
    const [totalLen,avgLen] = calc(s.map(element=> element.len));
    console.log(`Total length of Streets is ${totalLen} and Average is ${avgLen}`);
    //Classification of Streets
    s.forEach(element => element.classify())
}

reportParks(allParks);
reportStreets(allStreets);