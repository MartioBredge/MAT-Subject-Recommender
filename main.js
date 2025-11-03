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

const popupCourseName=document.getElementById("popup_courseName")
function updatePopup(subject) {
    popupCourseName.innerHTML=subject["name"]+" ("+subject["code"]+")";
}
function createSubjectBox(subject) {
    let mainDiv=document.createElement("div");
    let courseName=document.createElement("h5");
    courseName.innerHTML=subject["name"]+" ("+subject["code"]+")";
    mainDiv.appendChild(courseName);
    mainDiv.style.display="flex";
    mainDiv.style.justifyContent="center";
    mainDiv.style.alignContent="center";
    mainDiv.onclick=function() {openPopup(subject["name"]);}
    return mainDiv;
}
function doOtherStuff() {
    console.log(Subject.allSubjects[0]);
    //document.body.appendChild(createSubjectBox(Subject.allSubjects[0]));
}
