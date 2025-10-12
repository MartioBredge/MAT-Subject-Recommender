async function loadLocalJson() {
  try {
    const response = await fetch('matcourses.json'); // Path relative to your HTML file
    const data = await response.json();
    console.log(data);
    // Process your JSON data here
  } catch (error) {
    console.error('Error fetching local JSON:', error);
  }
}

loadLocalJson();

class Subject {
    static allSubjects=[];
    constructor(jsonData) {
        this.data=JSON.parse(jsonData);
        let keys=Object.keys(this.data);
        for(let i=0;i<keys.length;i++)
            this[keys[i]]=this.data[keys[i]];
        Subject.allSubjects.push(this);
    }
}
