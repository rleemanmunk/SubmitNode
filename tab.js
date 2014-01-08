require([
    "dojo/dom-construct",
	"dijit/layout/BorderContainer",
    "dijit/layout/TabContainer",
	"dijit/layout/AccordionContainer",
    "dijit/layout/ContentPane",
    "widgets/CMWidget",
	"dijit/form/Button",
	"dojo/store/JsonRest",
	"dijit/tree/ObjectStoreModel",
	"dijit/Tree",
    "dojo/domReady!"
], function(domConstruct,
	BorderContainer, TabContainer, AccordionContainer, ContentPane,
	CMWidget, Button, 
	JsonRest, ObjectStoreModel, Tree){
	var content = new BorderContainer({
		style: {
			height: "100%", 
			width: "90%",
			minWidth: "400px",
			marginLeft: "auto",
			marginRight: "auto"
		}
	}, "tc1-prog");
	//=====================================
	//================TITLE================
	//=====================================
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
		// TODO move to center container
		 style: "padding: 20px;",
    });
	var testPaneOrganizer = new BorderContainer({
		design: "sidebar"
	});
	var editorTitle = new ContentPane({
		content: "Code",
		style: {
			fontFamily: "sans-serif",
			fontWeight: "bold",
			fontSize: "20px"
		},
		region: "top"
	});
	testPaneOrganizer.addChild(editorTitle);
	var testLeftPane = new AccordionContainer({
		style: {
			width: "200px"
		},
		region: "left"
	});
	var assignmentPane = new ContentPane({
		title: "Assignments"
	});
	var assignmentTree = new Tree({
		model: new ObjectStoreModel({
			store: new JsonRest({
				target: "/assignments/",
				getChildren: function (object) {
					return object.children || [];
				}
			}),
			getRoot: function (onItem, onError) {
				this.store.get("root").then(onItem,onError);
			},
			mayHaveChildren: function (object) {
				return "children" in object;
			}
		})
	});
	assignmentPane.addChild(assignmentTree);
	testLeftPane.addChild(assignmentPane);
	var filePane = new ContentPane({
		title: "Your Files"
	});
	var fileManager = new Tree({
		model: new ObjectStoreModel({
			store: new JsonRest({
				target: "/rest/",
				getChildren: function(object) {
					return object.children || [];
				}
			}),
		   getRoot: function(onItem, onError) {
			   this.store.get("root").then(onItem,onError);
		   },
		   mayHaveChildren: function(object) {
			   return "children" in object;
		   }
		})
	});
	filePane.addChild(fileManager);
	testLeftPane.addChild(filePane);
	testPaneOrganizer.addChild(testLeftPane);
	// ------ CM ------
	var cmContainer = new ContentPane({
		region:"center"
	});
	var cm = new CMWidget({
		style: {
			border: "1px solid red",
			height: "100%"
		}
	});
	cmContainer.addChild(cm);
	testPaneOrganizer.addChild(cmContainer);
	// ------ CM ------
	var testPaneControls = new ContentPane({
		region: "bottom"
	});
	var runButton = new Button({
        label: "Run",
        onClick: function() {
			try {
				eval(cm.getContent());
			} catch (e) {
				alert("Error: " + e);
			}
        }
	});
	testPaneControls.addChild(runButton);
	var submitButton = new Button({
		label: "Submit",
		onClick: function() {
			alert("TODO: submit to server");
		}
	});
	testPaneControls.addChild(submitButton);
	testPaneOrganizer.addChild(testPaneControls);
	testPane.addChild(testPaneOrganizer);
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
