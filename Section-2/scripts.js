console.log('Hi');
let name= 'John';
console.log(name);

function calculateAge(birthYear){
    return 2018 - birthYear;
}
console.log("My Age :",calculateAge(1995));

/*Function Statements and Expressions*/
let whatYouDo=function(job,fname){
    switch(job){
        case 'programmer':
            return fname+' does backend';
        case 'designer':
            return fname+' does fronetend';
        default:
            return fname+' is Jobless';
    }   
}
console.log(whatYouDo('programmer','yash'));

let names =['yash','khushi',1990,'teacher',false];
let empty=[];
let years = new Array(1995,1994);
empty[0]='yyyyy';
empty.push("mine");
empty.unshift('Mr.');
console.log(names);
console.log(names.length);
console.log(empty);
empty.shift()
console.log(empty);


//Objects and properties
let yash={
    firstName: 'yash',
    lastname :'vadhvani',
    birthYear: 1995,
    job:"IT",
    family:['nikita','papa','mom'],
    age:function(){
        console.log(this);
        return new Date().getFullYear()- this.birthYear;
    }

};
console.log(yash.firstName);
console.log(yash['firstName']);
yash.job ="Blockchain";
console.log(yash.age());

//creating object
let khushi= new Object();
khushi.firstName='Parul';
khushi.job='Workterra';
khushi['lastName']='Chourey';
console.log(khushi);


