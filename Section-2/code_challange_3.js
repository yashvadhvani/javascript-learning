let bills=[124,48,268];
let tips=[];
let final=[];
let pushFunc=function(val,tip){
    tips.push(tip);
    final.push(val+tip);
}
bills.map((val) => {
    console.log(val);
    switch(true){
        case (val<50):
            console.log("20%",val );
            pushFunc(val,val*0.20);
        break;
        case (val>=50 && val<200):
            console.log("15%",val );
            pushFunc(val,val*15/100);
        break;
        default:
            console.log("10%",val );
            pushFunc(val,val*0.10);
    }
});
console.log(tips)
console.log(final);