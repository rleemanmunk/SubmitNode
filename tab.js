require([
    "dojo/dom-construct",
    "dijit/layout/TabContainer",
    "dijit/layout/ContentPane",
    "widgets/CMWidget",
	"dijit/form/Button",
    "dojo/domReady!"
], function(domConstruct, TabContainer, ContentPane, CMWidget, Button){
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
         title: "Run",
         content: "We offer amazing food",
         style: "width: 100%"
    });
	cp1.addChild(runButton);
    tc.addChild(cp1);

    var cp2 = new ContentPane({
         title: "Submit",
         content: "We are known for our drinks."
    });
    tc.addChild(cp2);

    var cm = new CMWidget({});
    cp1.addChild(cm);

    tc.startup();
});
