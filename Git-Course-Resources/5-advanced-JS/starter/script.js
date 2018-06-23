//Object Creation method 1
// Function Constructor
/*let Person =function(name,yearOfBirth,job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
    // this.calculateAge =function(){
    //     console.log(2016 -this.yearOfBirth);
    // }
}

//inherit the calculateAge function
Person.prototype.calculateAge = function(){
    console.log(2018 - this.yearOfBirth)
}
//Objects creation and instntiation
let john = new Person('John',1990,'Teacher');

let jane =new Person('Jane',1948,'retired');

john.calculateAge();*/

//Object Creation Method-2
/*
let personProto ={
    calculateAge : function (){
        console.log(2018 -this.yearOfBirth);
    } 
};

let john=Object.create(personProto);
john.name = 'John';
john.yearOfBirth =1990;
john.job='teacher';

let jane =object.create(personProto,
{
    name: { value :'Jane'},
    yearOfBirth: { value :1969},
    job : {value: 'designer'}
});*/

/* The diffrence between both methods is that the object.create 
buids an object that inherits directly from one that we passed
into the first argument while on the other hand, the function 
constructor the newly created object inherits from the constructor's
prototype property*/

/* advantage of the object.create is that allows us to implement really
complex inheritance structure in an easier way because it allows us to specify
which object should be a prototype most popular is the functional constructor*/


/////////////////////////////
// Lecture: Primitives vs objects
/*
// Primitives
var a = 23;
var b = a;
a = 46;
console.log(a);
console.log(b);



// Objects
var obj1 = {
    name: 'John',
    age: 26
};
var obj2 = obj1;
obj1.age = 30;
console.log(obj1.age);
console.log(obj2.age);

// Functions
var age = 27;
var obj = {
    name: 'Jonas',
    city: 'Lisbon'
};

function change(a, b) {
    a = 30;
    b.city = 'San Francisco';
}

change(age, obj);

console.log(age);
console.log(obj.city);
*/

//Callback functions : funcion using function as parameter
/*
let years = [1990, 1965, 1937, 2005, 1998];

function maxHeartRate(el){
    return (el>=18 && el<=81)?Math.round(206.9-(0.67*el)): -1;
}
function arrayCalc(arr, fn){
    let arrRes= [];
    arr.map((value)=>{
        arrRes.push(fn(value));
    });
    return arrRes;
}

function calculateAge(el) {
    return 2018- el;
}
//here calculate age is a callback function
let ages =arrayCalc(years,calculateAge);
let rates=arrayCalc(ages,maxHeartRate);
console.log(ages);
console.log(rates);*/

// Function Returning Function
/*function interviewQuestion(job){
    switch(job){
        case 'designer' :
            return function (name){
                console.log("Hey "+name+" What is UX?");
            }
        break;
        case 'teacher' :
            return function (name){
                console.log("Hey "+name+" What subject do you teach?");
            }
        break;
        default :
            return function(name){
                console.log("Hey "+name+" What do you do?")
            }
    }  
}

let teacherQuestion=interviewQuestion('teacher');
teacherQuestion("John");
interviewQuestion('designer')('Yash');
*/

//IIFE : Immediatley invoked Function

/*(function (){
    console.log("Hello");
})();*/


//Bind ,Call and Apply
let john={
    name:"john",
    intro: function(style,time){
        style==='formal'?console.log("Ladies and Gentlements My name is "+this.name+" good "+time):console.log("Hi My name is "+this.name+" good "+time);
    }
}
let emily={
    name:'emily'
}
john.intro('formal','morning');
john.intro.call(emily,'friendly','evening');

let johnFriendly=john.intro.bind(emily,'friendly');
johnFriendly('afternoon');

var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el) {
    return 2016 - el;
}

function isFullAge(limit,el) {
    return el >= limit;
}

var ages=arrayCalc(years,calculateAge);
var fullJapan=arrayCalc(ages,isFullAge.bind(this,20));

console.log(ages);
console.log(fullJapan);