//Takes two parameters, an array and a function
//In the array you put all the modules you want to use
define([
"dojo/dom-construct", 
//important things for creating nodes and placing them on the page 
"dojo/domReady!" 
//Does not have functionality, just asks to wait until the dom is ready before starting the code
], function(domConstruct) {
domConstruct.create("div", {innerHTML:"<p>Paragraph</p>"}, dojo.body());
//First param: creates a tag with that word
//Second param: specifies what attributes that tag has 
//Third param: specifies where it should go (into body of index.html)
}); 
//Puts them in the same order into the parameters of the function

