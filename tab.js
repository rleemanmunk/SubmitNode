require([
    "dojo/dom-construct",
    "dijit/layout/TabContainer",
    "dijit/layout/ContentPane",
    "widgets/CMWidget",
	"dijit/form/Button",
    "dojo/domReady!"
], function(domConstruct, TabContainer, ContentPane, CMWidget, Button){
	var tc = new TabContainer({
        style: "height: 100%; width: 100%;",
		tabPosition: "top"
    }, "tc1-prog");

	//=====================================
	//==============TEST PANE==============
	//=====================================
    var testPane = new ContentPane({
         title: "Test",
		 style: "padding: 20px;"
    });
	var editorTitle = new ContentPane({
		content: "Code:",
		style: {
			fontFamily: "sans-serif",
			fontWeight: "bold",
			fontSize: "30px"
		}
	});
	testPane.addChild(editorTitle);
	var cm = new CMWidget({
		style: {border: "1px solid red"}
	});
	testPane.addChild(cm);
	var runButton = new Button({
        label: "Run",
        onClick: function() {
			eval(cm.getContent());
        }
	});
	testPane.addChild(runButton);
    tc.addChild(testPane);

	//=====================================
	//============SUBMIT PANE==============
	//=====================================
    var submitPane = new ContentPane({
         title: "Submit",
		 style: "padding: 20px;"
    });
    tc.addChild(submitPane);
	
	var upload = domConstruct.create("div", {innerHTML:
		"<input type=\"file\">"
	});
	var uppane = new ContentPane({
         title: null,
		 content: upload
    });
	submitPane.addChild(uppane);
	
	var submitButton = new Button({
        label: "Submit",
        onClick: function() {
			alert("TODO: submission function");
        }
	});
	submitPane.addChild(submitButton);
	
    tc.startup();
});
