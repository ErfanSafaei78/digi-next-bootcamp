// Challenge 2
// Try to implement a function named secretValue which takes the initival value as ther parameter.
// It should has 2 methods named getSecret and setSecret and should work correctly by changing the secret and getting it.

function secretVault(initVal) {
    // implmenent here
    let secretValue = initVal;
  
    function setSecret(value) {
      secretValue = value;
    }
  
    function getSecret() {
      return secretValue;
    }
  
    return {
      setSecret,
      getSecret,
    };
  }
  
  const vault = secretVault("initial");
  console.log(vault.getSecret()); // "initial"
  vault.setSecret("new secret");
  console.log(vault.getSecret()); // "new secret"