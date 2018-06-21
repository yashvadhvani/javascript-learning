let restaurents=[{
    name:'res1',
    billAmt: 77
},{
    name:'res2',
    billAmt: 375
},{
    name:'res3',
    billAmt: 110
},{
    name:'res4',
    billAmt: 45
}];
let avg=0;
restaurents.map((object)=>{
    switch(true){
        case (object.billAmt<50):
            object.tip = object.billAmt*0.20;
            object.total=object.billAmt+object.tip;
        break;
        case (object.billAmt>=50 && object.billAmt<200) :
            object.tip=object.billAmt*0.15;
            object.total=object.billAmt+object.tip;
        break;
        default :
            object.tip=object.billAmt*0.10;
            object.total=object.billAmt+object.tip;
    }
    avg += object.total;
    console.log(object);
});
console.log("Average is : "+(avg/restaurents.length))