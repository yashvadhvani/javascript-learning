let calcBMI= function(mass,height){
    console.log(mass,height);
    return mass/(height*height)
};
let persons=[{
    name :'Yash Vadhvani',
    mass :'64',
    height :'1.8'
    
},{
    name :'Yash Vadhvani',
    mass :'54',
    height :'1.73'
}]

persons.map((object) =>{
    object.BMI=calcBMI(object.mass,object.height);
    console.log(object.BMI);
});