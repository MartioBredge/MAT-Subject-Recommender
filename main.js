console.log("HELLO!");


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
