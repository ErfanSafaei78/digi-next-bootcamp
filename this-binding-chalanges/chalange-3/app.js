// Challenge 3
// Try to fix the code in a way that introduce function logs the someone.name value.
function introduce(language) {
    console.log(`Hi, I'm ${this.name}, and I love ${language}.`);
  }
  
  const someone = { name: "Bob" };
  introduce.call(someone, "JavaScript"); // Only change this line