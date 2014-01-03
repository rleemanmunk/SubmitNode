require([
    "dojo/dom-construct",
	"dijit/layout/BorderContainer",
    "dijit/layout/TabContainer",
    "dijit/layout/ContentPane",
    "widgets/CMWidget",
	"dijit/form/Button",
    "dojo/domReady!"
], function(domConstruct, BorderContainer, TabContainer, ContentPane, CMWidget, Button){
	var content = new BorderContainer({
		style: {
			height: "100%", 
			width: "90%",
			minWidth: "400px",
			marginLeft: "auto",
			marginRight: "auto"
		}
	}, "tc1-prog");
	var title = new ContentPane({
		region: "top",
		content: "<h2>COMP 110</h2>",
		style: "background-color: #686868; border: 0px; margin-bottom: 25px; margin-top: 15px; color: white; line-height: 50%; padding-top: 0px; padding-bottom: 0px;"
	});
	
	content.addChild(title);
	
	var tc = new TabContainer({
		region: "center",
		useMenu: false,
		useSlider: false
    });
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
	
	content.addChild(tc);
	
    content.startup();
	
});
