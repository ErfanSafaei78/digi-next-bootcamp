// Challenge 2
// Why the value of this in the inner regular function is undefined and it's pointing to window? try to figure it out
// Also, fix the code in a way that the regularFunction returns the obj.value instead of window.value !
const obj = {
  value: 42,
  getValue: function () {
    const arrowFunction = () => this.value;
    function regularFunction() {
      return this.value;
    }
    console.log("Arrow:", arrowFunction());
    //console.log("Regular:", regularFunction()); cuz regularFunction is a standalone regular function and not wrapped by an object
    console.log("Regular:", regularFunction.call(this));
  },
};

obj.getValue();
