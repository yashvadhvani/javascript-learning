// Lecture : let and Const
/*
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
*/

/////////////////////////////////
// Lecture: Arrow functions 2

/*
// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {
       
       var self = this; document.querySelector('.green').addEventListener('click', function() {
            var str = 'This is box number ' + self.position + ' and it is ' + self.color;
            alert(str);
        });
    }
}
//box5.clickMe();


// ES6
const box6 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
}
box6.clickMe();


const box66 = {
    color: 'green',
    position: 1,
    clickMe: () => {
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
}
box66.clickMe();


function Person(name) {
    this.name = name;
}

// ES5
Person.prototype.myFriends5 = function(friends) {
    
    var arr = friends.map(function(el) {
       return this.name + ' is friends with ' + el; 
    }.bind(this));
    
    console.log(arr);
}

var friends = ['Bob', 'Jane', 'Mark'];
new Person('John').myFriends5(friends);


// ES6
Person.prototype.myFriends6 = function(friends) {

    var arr = friends.map(el => `${this.name} is friends with ${el}`);

    console.log(arr);
}

new Person('Mike').myFriends6(friends);
*/

// Lecture :destructuring
/*
//Es5
var john =['John', 26];
var name=john[0];
var age =john[1];


//ES6

const [name,year]=['John',26];
console.log(name);
console.log(year);

const obj= {
    firstName : 'John',
    lastName : 'Smith'
}

const {firstName ,lastName}= obj;

console.log(firstName);
console.log(lastName);


const {firstName : a,lastName:b }=obj;

function calAgeRetirement(year){
    const age=new Date().getFullYear -year;
    return [age, 65- age]
}

const [age2,retirement] = calAgeRetirement(1990);

console.log(age2,retirement)
*/
//Lecture :arrays
// const boxes =document.querySelectorAll('.box');


//es5
/*
var boxesArr5= Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(cur){
    cur.style.backgroundColor ='dodgerblue';
});
*/

//es 6
/*const boxesArr6 =Array.from(boxes);
 boxesArr6.forEach(cur => cur.style.backgroundColor = 'dodgerBlue');

for(const cur of boxesArr6){
    if(cur.className.includes('blue') )
        continue;
    cur.textContent =' I changed to blue!'
    cur.style.backgroundColor ='dodgerBlue'
}*/

/*let ages =[12, 17, 8, 21, 14, 11];

console.log(ages.findIndex(cur => cur>=18));
console.log(ages.find(cur => cur>=18));


//spread Operator

function addFourages(a,b,c,d){
    return a+b+c+d;
}
//Es5

var sum =addFourages.apply(null,ages);
console.log(sum);

//ES6
const sum2=addFourages(...ages);
console.log(sum2);

const arr1= [1,2];
const arr2 =[3,4];
const mixArr = [...arr1,...arr2];
console.log(mixArr);


//Rest Parameters

function isFullAges6(...years){
    console.log(years);
}

isFullAges6(1990,1999,1965)*/


//Maps

const question =new Map();
question.set('question','Latest Javascript Version');
question.set(1,'ES5');
question.set(2,'ES6');
question.set(3,'ES7');
question.set(4,'ES8');
question.set('correct',3);
question.set(true,'Correct Answer');
question.set(false,'Wrong Answer')

console.log(question.get('question'));
//if(question.has(4))
  //  question.delete(4);

// question.forEach((value,key)=> console.log(`This is ${key} and it's set to ${value}`)
// )
for(let [key,value] of question.entries()){
    // console.log(`This is ${key} and it's set to ${value}`);
    if(typeof(key)==='number'){
        console.log(`Option ${key} : ${value}`);
    }
}
const ans=parseInt(prompt('Write the Correct answer :'));
console.log(question.get(question.get('correct')===ans));
// To remove all elements
// question.clear();