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
    // Process your JSON data here
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
