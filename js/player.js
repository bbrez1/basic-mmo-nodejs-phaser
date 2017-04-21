// Define a class like this
function Player(health, id, x, y) {

    // Add object properties like this
    this.health = health;
    this.id = id;
    this.x = x;
    this.y = y;
}

// Add methods like this.  All Person objects will be able to invoke this
Person.prototype.speak = function () {
    alert("Howdy, my name is" + this.name);
};

// Instantiate new objects with 'new'
var person = new Person("Bob", "M");

// Invoke methods like this
person.speak(); // alerts "Howdy, my name is Bob"