require([
    "dojo/dom-construct",
	"dijit/Calendar",
	"dojo/date",
	"dijit/ColorPalette",
	"dojo/dom-style",
    "dijit/layout/TabContainer",
    "dijit/layout/ContentPane",
    "dojo/domReady!"
], function(domConstruct, Calendar, date, ColorPalette, domStyle, TabContainer, ContentPane){
	var title = domConstruct.create("h1", {innerHTML:"Calendar"}, dojo.body());
	var div = domConstruct.create("div", null, dojo.body());
	//var color = red;
	
	var myCalendar = new Calendar({
		value: new Date(),
		style: "margin-left: auto; margin-right: auto;"
	});
	var myPalette = new ColorPalette({
        palette: "7x10",
		style: "margin-left: auto; margin-right: auto;",
        onChange: function(val){ 
			//$color = val;
			cname.set("content", val);
			domStyle.set(dojo.body(), "background-color", val);
		}
    });
	var tc = new TabContainer({
        style: "height: 100%; width: 75%; margin-left: auto; margin-right: auto;",
		tabPosition: "left-h"
    }, div);

    var cp1 = new ContentPane({
         title: "Run",
		 style: "margin: 20px"
    });
	cp1.addChild(myCalendar);
    tc.addChild(cp1);

    var cp2 = new ContentPane({
         title: "Submit",
		 style: "margin: 20px"
         //content: "Pick your color:"
    });
	cp2.addChild(myPalette);
	//cp2.addChild(cname);
    tc.addChild(cp2);
	
	var cname = new ContentPane({
		content: "red"
	});
	//var cname = domConstruct.create("p", {innerHTML:"color name"});
	cp2.addChild(cname);
	
    tc.startup();
});
