$(function() {

    new WOW().init();

    /*$('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });*/

    var x = 5; //x is being set to the value 5
    var y = 3; //y is being set to the value 3

    x = x + 1; //Sets x to 1 more than its previous value (5 + 1 = 6)

    //Shortcut to the line above
    x += 1; //Sets x to 1 more than its previous value (6 + 1 = 7)

    //Even shorter version (only works when adding 1)
    x++; //Sets x to 1 more than its previous value (7 + 1 = 8)

    y += 4;

    x += y; //What is the value of x now?


    var firstName = "Bob"; //firstName is set to the string literal "Bob"
    var lastName = "Lowry"; //lastName is set to the string literal "Lowry"

    //String concatenation (adding strings together)
    var fullName = firstName + " " + lastName; //fullName is set to the "Bob Lowry"

    var description = "My name is ";

    description += fullName + "."; //What is the value of description now?

    var age = 12;

    description += "I am " + age + " years old."; //What is the value of description now?

    //'+' operator used for addition
    var sum = x + y; //sum is equal to 8

    //'-' operator used for subtraction
    var difference = x - y; //difference is equal to 2

    //'*' operator used for multiplication
    var product = x * y; //product is equal to 15

    //'/' operator used for division
    var quotient = x / y; //quotient is equal to 1.66666666

    //'%' operator used to find the remainder after dividing numbers
    var remainder = x % y; //remainder after dividing x by y is equal to 2

    console.log(quotient);


    var numOneSiblingStudents = 16; //Number of students with 1 sibling
    var numTwoSiblingStudents = 6; //Number of students with 2 siblings
    var numThreeSiblingStudents = 4; //Number of students with 3 siblings

    //Total number of siblings
    var totalSiblings = (numOneSiblingStudents * 1) + (numTwoSiblingStudents * 2) + (numThreeSiblingStudents * 3);

    //Number of siblings younger than 11 is half of the total number of siblings
    var numSiblingsYoungerThan11 = totalSiblings / 2;

    /*Number of siblings less than 5 feet tall and younger than 11 is half of the
    number of siblings younger than 11*/
    var numSiblingsUnder5Feet = numSiblingsYoungerThan11 / 2;

    var result = "There are a total of " + totalSiblings + ". " + numSiblingsYoungerThan11 + " are younger than 11. ";

    result += numSiblingsUnder5Feet + " are less than 5 feet tall and younger than 11.";

    console.log(result);

    //Any expression with a comparison operator will result in a boolean value (true or false)

    var x = 5;
    var y = 3;

    var myBoolean = x > y; //Since x is greater than y, myBoolean will be set to true

    var opposite = !myBoolean //Since myBoolean is originally true, the '!' operator changes it to false

    var isOld = true;
    var isHuman = false;

    //'&&' operator used to check if two booleans are BOTH true or false
    var isSeniorCitizen = isOld && isHuman; //Since isOld is true and isHuman is false, isSeniorCitizen is set to false.

    //'||' operator used to check if one of the two booleans are true or false
    isSeniorCitizen = isOld || isHuman; //Since isOld is true and isHuman is false, isSeniorCitizen is set to true.


    var myBoolean2 = x <= y; //Since x is smaller than y, myBoolean2 will be set to false

    var myBoolean3 = x == y; //What will myBoolean3 be set to?

    y = x;

    var myBoolean4 = x != y; //What will myBoolean4 be set to?



});
