let currSemPicker=document.getElementById("currSemPicker");
let intakeSemPicker=document.getElementById("intakeSemPicker");
let currSemRange=[2024,2026];
let intakeSemRange=[2020,2026];
let months=["02","04","09"];
for(let i=currSemRange[0];i<=currSemRange[1];i++) {
    for(let j=0;j<3;j++) {
        let newOption=document.createElement("option");
        newOption.value=i+"/"+months[j];
        newOption.innerHTML=i+"/"+months[j];
        currSemPicker.appendChild(newOption);
    }
}
for(let i=intakeSemRange[0];i<=intakeSemRange[1];i++) {
    for(let j=0;j<3;j++) {
        let newOption=document.createElement("option");
        newOption.value=i+"/"+months[j];
        newOption.innerHTML=i+"/"+months[j];
        currSemPicker.appendChild(newOption);
    }
}
class Subject {
    static allSubjects=[];
    constructor(jsonData) {
        this.data=jsonData;
        let keys=Object.keys(this.data);
        for(let i=0;i<keys.length;i++)
            this[keys[i]]=this.data[keys[i]];
        Subject.allSubjects.push(this);
    }
  toString() {
    return "Course Name: "+this.name+"\n"+"Course Code: "+this.code;
  }
}

async function loadLocalJson() {
  try {
    const response = await fetch('matcourses.json'); // Path relative to your HTML file
    const data = await response.json();
    console.log(data);
    for(let i=0;i<data.length;i++) new Subject(data[i]);
    doOtherStuff();
  } catch (error) {
    console.error('Error fetching local JSON:', error);
  }
}

loadLocalJson();


const courseInput=document.getElementById("courseInput");
const courseOutput=document.getElementById("courseOutput");
courseInput.oninput=function(event) {
  let courseName=courseInput.value;
  if(courseName.length<1) return false;
  let matches=[];
  for(let i=0;i<Subject.allSubjects.length;i++) {
    let subj=Subject.allSubjects[i];
    if(!subj["name"].toLowerCase().includes(courseName.toLowerCase())) continue;
    matches.push(subj);
  }
  //matches.sort(function(a,b) {return a["name"].indexOf(courseName)-b["name"].indexOf(courseName)});
  courseOutput.innerHTML="";
  for(let i=0;i<matches.length;i++) {
    courseOutput.innerHTML+=matches[i].toString().replaceAll("\n","<br>")+"<br><br>";
  }
}




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
function createSubjectBox(subject) {
    let mainDiv=document.createElement("div");
    let courseName=document.createElement("h5");
    courseName.innerHTML=subject["name"]+" ("+subject["code"]+")";
    mainDiv.appendChild(courseName);
    mainDiv.className="subjectButton";
    mainDiv.onclick=function() {openPopup(subject);}
    return mainDiv;
}
function doOtherStuff() {
    let a=createSubjectBox(Subject.allSubjects[0]);
    document.body.appendChild(a);
    console.log("FUCKING HELL!");
}
