// Lecture : let and Const

var name5= 'Jane Smith';
var age5 =23;
name5= 'Jane Miller';
console.log(name5);


const name6='Jane Smith';
let age6=23;
//name6='Jane Miller';
console.log(name6);

// Es5
//Var is function scoped
// if you use a variable without declaring and defining it shows undefined
function driversLicence5(passedTest){
    if(passedTest){
        var firstName= 'John';
        var yearOfBirth =1990;
        
    }
    console.log(firstName+ 'born in '+yearOfBirth+' is passed')
}

driversLicence5(true);


//ES6
//Let and const are Block scoped Not function scoped
// if you use a variable without declaring and defining it throws an error
//Template litrals are used instead of + signs
function driversLicence6(passedTest){
    if(passedTest){
        let firstName= 'John';
        const yearOfBirth =1990;
        console.log(`${firstName} born in ${yearOfBirth} is passed`)
        const n=`${firstName} Smith`;

        //new Methods
        console.log(n.startsWith('j'));
        console.log(n.endsWith('h'));
        console.log(n.includes(' '));
        console.log(firstName.repeat(2));
    }
    
}


driversLicence6(true);