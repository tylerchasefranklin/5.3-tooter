
function Vehicle(){
  this.wheels = true;
}

function Car(){
  this.hasHorn = true;
  this.doors = 4;
}
Car.prototype = new Vehicle();

var coupe = new Car();
coupe.doors = 2;

function create(parent){
  var F = function(){};
  F.prototype = parent;
  return new F();
}

var produce = {
  canEat: true,
  tasty: true
};

var apple = create(produce);
apple.color = 'red';

console.log(apple.tasty);
console.log(apple);


// Define a function called `Robot()`.
// Typically, we would create a new instance with `new Robot()`.
// Instead, create a "factory" that creates more `Robot`s with this call:
// ---
// Robot.new()
//
// When `Robot.new()` is called it should return a new instance with the prototype set to Robot e.g.:
// ---

function Robot(){

}

Robot.prototype.alarm = function(){
  console.log('Danger, Danger!');
}

Robot.new = function(){
  var F = function(){};
  F.prototype = new this();
  return new F();
}

var robby = Robot.new();

robby.alarm();
