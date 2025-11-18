let currSemPickerYear=document.getElementById("currSemPickerYear");
let currSemPickerMonth=document.getElementById("currSemPickerMonth");
let intakeSemPickerYear=document.getElementById("intaSemPickerYear");
let intakeSemPickerMonth=document.getElementById("intaSemPickerMonth");

//set month and year of current semester picker
const currentDate = new Date();
const monthIndex = currentDate.getMonth();
if(monthIndex>=8) currSemPickerMonth.value="09";
else if(monthIndex>=3) currSemPickerMonth.value="04";
else if(monthIndex>=1) currSemPickerMonth.value="02";
else currSemPickerMonth.value="09";
currSemPickerYear.value=currentDate.getFullYear().toString();

console.log("cwe@#");
console.log("WEFE");
function createSubjectBox(subject) {
    let mainDiv=document.createElement("div");
    let courseName=document.createElement("h5");
    courseName.innerHTML=subject["name"]+" ("+subject["code"]+")";
    mainDiv.appendChild(courseName);
    mainDiv.className="subjectButton";
    mainDiv.onclick=function() {openPopup(subject);}
    return mainDiv;
}
function updateRecommendations() {
    //feb: X 1 2 apr: 2 X 1 sep: 1 2 X
    let months=["February","April","September"];
    let offset=intakeSemPickerMonth.selectedIndex; //feb 0 apr 1 sep 2

    for(let i=1;i<=3;i++) {
        for(let j=1;j<=3;j++) {
            let ulist=document.getElementById("y"+i+"s"+j+"Recomm");
            ulist.innerHTML="";
            let label=document.getElementById("y"+i+"s"+j+"RecommLabel");
            let monthYear=((i-1)*3+(j-1)+offset);
            let currMonth=months[monthYear%3];
            let currYear=Math.floor(monthYear/3)+parseInt(intakeSemPickerYear.value);
            label.innerHTML="Year "+i+" Semester "+j+"<br>"+currMonth+" "+currYear;
        }
    }
    let sems=[1,2,3];
    if(offset==0) sems=[1,2,3];
    else if(offset==1) sems=[2,3,1];
    else if(offset==2) sems=[2,1,3];
    
    for(let i=0;i<Subject.allSubjects.length;i++) {
        let subject=Subject.allSubjects[i];
        //if(subject.optional==="comp") {
            let semIndex=sems.indexOf(subject.semester)+1;
            //console.log("ASDF");
            //let monthYear=((subject.year-1)*3+(subject.semester-1)+offset);
            //let currMonth=months[monthYear%3];
            console.log(subject);
            console.log(semIndex);
            console.log((semIndex+offset)%3);
            let ulist=document.getElementById("y"+subject.year+"s"+semIndex+"Recomm");
            let p=document.createElement("li");
            p.innerHTML=subject.name+" ("+subject.code+")";
            p.onclick=function() {
                openPopup(subject);
            }
            ulist.appendChild(p);
        //}
    }
    // 0, 1, 2
    // (1-1+0)%3+1 -> 1
    // (1-1+1)%3+1 -> 2
    // (1-1+2)%3+1 -> 3
    // (2-1+0)%3+1 -> 2
    // (2-1+1)%3+1 -> 3
    // (2-1+2)%3+1 -> 1
    /*for(let i=0;i<Subject.allSubjects.length;i++) {
        let subject=Subject.allSubjects[i];
        if(subject.optional==="comp") {
            let index=((subject.semester-1+offset)%3+1);
            //if(offset==
            let ulist=document.getElementById("y"+subject.year+"s"+index+"Recomm");
            
            let p=document.createElement("li");
            p.innerHTML=subject.name+" ("+subject.code+")";
            p.onclick=function() {
                openPopup(subject);
            }
            ulist.appendChild(p);
        }
    }*/
}
function doOtherStuff() {
    //let a=createSubjectBox(Subject.allSubjects[0]);
    //document.body.appendChild(a);
    updateRecommendations();
}
intakeSemPickerYear.onchange=function(event) {
    updateRecommendations();
}
intakeSemPickerMonth.onchange=function(event) {
    updateRecommendations();
}
console.log("EFWE");




const myPopup = document.getElementById('myPopup');

function openPopup(subject) {
    updatePopup(subject);
    myPopup.style.display='flex';
}
function closePopup() {
    myPopup.style.display='none';
}
// Close the popup if the user clicks outside of the content
window.addEventListener('click', (event) => {
  if (event.target === myPopup) {
    closePopup();
  }
});


// Close the popup if the user clicks outside of the content
document.getElementById("closePopupBtn").addEventListener('click', (event) => {closePopup();});

const popupCourseName=document.getElementById("popup_courseName")
function updatePopup(subject) {
    popupCourseName.innerHTML=subject["name"]+" ("+subject["code"]+")";
}

