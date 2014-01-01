require([
    "dojo/dom-construct",
    "dijit/layout/TabContainer",
    "dijit/layout/ContentPane",
    "widgets/CMWidget",
	"dijit/form/Button",
    "dojo/domReady!"
], function(domConstruct, TabContainer, ContentPane, CMWidget, Button){
	var runButton = new Button({
        label: "Run",
        onClick: function(){
			eval(cm.getContent());
        }
	});
	var submitButton = new Button({
        label: "Submit",
        onClick: function(){
			//eval(cm.getContent());
        }
	});
	var cm = new CMWidget({});
	var tc = new TabContainer({
        style: "height: 100%; width: 100%;",
		tabPosition: "left-h"
    }, "tc1-prog");

    var cp1 = new ContentPane({
         title: "Run",
         content: "Enter your code here and click run to test",
		 style: "padding: 20px;"
    });
	cp1.addChild(cm);
	cp1.addChild(runButton);
    tc.addChild(cp1);

    var cp2 = new ContentPane({
         title: "Submit",
         content: null,
		 style: "padding: 20px;"
    });
    tc.addChild(cp2);
	
	var upload = domConstruct.create("div", {innerHTML:
		"<input type=\"file\">"
	});
	
	var uppane = new ContentPane({
         title: null,
		 content: upload
    });
	cp2.addChild(uppane);
	cp2.addChild(submitButton);
	
    tc.startup();
});
