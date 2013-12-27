//Takes two parameters, an array and a function
//In the array you put all the modules you want to use
require([
"dojo/dom-construct", 
//important things for creating nodes and placing them on the page 
"dijit/Calendar",
"dojo/date",
"dojo/domReady!" 
//Does not have functionality, just asks to wait until the dom is ready before starting the code

], function(domConstruct, Calendar, date) {
domConstruct.create("div", {innerHTML:"<h1>Calendar<h1>"}, dojo.body());
var div = domConstruct.create("div", null, dojo.body());
var myCalendar = new Calendar({
		value: new Date()
	},div);
//First param: creates a tag with that word
//Second param: specifies what attributes that tag has 
//Third param: specifies where it should go (into body of index.html)
}); 
//Puts the  in the same order into the parameters of the function

//null can be replaced with: {innerHTML:"<p>Paragraph</p>"}