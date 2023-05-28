// class Cat {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }

//   eat() {
//     return `${this.name} is eating`;
//   }

//   meow() {
//     return "MEOWWWW!!";
//   }
// }

// class Dog {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }

//   eat() {
//     return `${this.name} is eating`;
//   }

//   bark() {
//     return "WOOOF!!";
//   }
// }

// If you look in the above two classes constructor function and the eat function are the same what if we have a Pet class from which these two functions could inherit these things.

// class Pet {
//   constructor(name, age) {
//     console.log("Inside Pet constructor");
//     this.name = name;
//     this.age = age;
//   }

//   eat() {
//     return `${this.name} is eating`;
//   }
// }

// class Cat extends Pet { // This Cat class now extends Pet what that means is all the functionality of Pet is included in it and some extra things if it wants for itself it can keep it.
       // When a new object of this class is created and it doesn't find a constructor here it refers to it's parent class and it does find a constructor there so it will use that so just remember when a object is created and let's say a function is called if it's present in this class itself good it will use that otherwise it will use the one present in the parent class if the parent class doesn't contain that function either obviously a error will be generated.
//     meow() { 
//     return "MEOWWWW!!";
//   }
// }

// class Dog extends Pet { 
//   bark() {
//     return "WOOOF!!";
//   }

//   eat() { // Now we won't go upto the parent when eat is called this function will be used directly.
//     return `${this.name}, Likes eating his food a bit too much`;
//   }
// }


// Now to see the use of super keyword first i'll just copy the code snippet above.
// The super keyword is used to call the constructor of its parent class to access the parent's properties and methods you can't use super keyword without extends we can't access a parent if there is no parent.
// super(arguments);  // calls the parent constructor (only to be called from inside the constructor of child class)
// super.parentMethod(arguments);  // calls a parent method
// The super() is not called for inheriting the Properties of the base class. That is done by extends keyword. The reason why we call super is because we want to execute the code which is written in the constructor of the Error class.
class Pet {
    constructor(name, age) {
      console.log("In Pet constructor");
      this.name = name;
      this.age = age;
    }
  
    eat() {
      return `${this.name} is eating`;
    }
  }
  
  class Cat extends Pet { 
      constructor(name,age,livesLeft = 9) { // Just bcz i had to add a new parameter and we don't want to repeat the lines 68,69 so we say okay the parent constructor is already taking care of that just use the super keyword and call the constructor with the parameters just like we would when forming a new object that will take care of name,age and then we set lives left here.
        console.log("In Cat constructor");
        super(name,age); // This will call the parent(Pet) constructor with name and age where it will make set name,age properties of this object.
        this.livesLeft = livesLeft;
      }
      meow() { 
      return "MEOWWWW!!";
    }
  }
  
  class Dog extends Pet { 
    bark() {
      return "WOOOF!!";
    }
  
    eat() { 
      return `${this.name}, Likes eating his food a bit too much`;
    }
  }

//   const newCat = new Cat('riley',2,"yellow");