require([
	"dijit/layout/TabContainer", 
	"dijit/layout/ContentPane", 
	"dijit/form/Textarea",
	"dijit/form/Button",
	"dojo/domReady!"
	], function(TabContainer, ContentPane, Textarea, Button){
    var textarea = new Textarea({
		name: "code",
		value: "Enter code here",
		rows: "10",
		cols: "30"
	});
	var runButton = new Button({
        label: "RUN!",
        onClick: function(){
            // Do something:
        }
	});
	var tc = new TabContainer({
        style: "height: 100%; width: 100%;",
		tabPosition: "left-h"
    }, "tc1-prog");

    var cp1 = new ContentPane({
         title: "Run"
    });
	cp1.addChild(textarea);
	cp1.addChild(runButton);
    tc.addChild(cp1);

    var cp2 = new ContentPane({
         title: "Submit",
         content: "We are known for our drinks."
    });
    tc.addChild(cp2);

    tc.startup();
});
