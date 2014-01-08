require([
    "dojo/dom-construct",
	"dijit/layout/BorderContainer",
    "dijit/layout/TabContainer",
    "dijit/layout/ContentPane",
	"widgets/Login",
    "widgets/CMWidget",
	"dijit/form/Button",
	"dojo/store/JsonRest",
	"dijit/tree/ObjectStoreModel",
	"dijit/Tree",
    "dojo/domReady!"
], function(domConstruct, BorderContainer, TabContainer, ContentPane, Login, CMWidget, Button, 
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
	var titlePane = new ContentPane({
		region: "top",
		content: "<h2>COMP 110</h2>",
		style: "background-color: #686868; border: 0px; margin-bottom: 25px; margin-top: 15px; color: white; line-height: 50%; padding-top: 0px; padding-bottom: 0px;"
	});
	var titleText = new ContentPane({
		style: {
			width: "49%"//,
			//"float": "right"
		}
	});
	titlePane.addChild(titleText);
	var loginPane = new ContentPane({
		style: {
			width: "49%"
		}
	});
	var login = new Login({
		style: {
			"float": "right"
		}
	});
	loginPane.addChild(login);
	titlePane.addChild(loginPane);
	
	content.addChild(titlePane);
	
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
	var filePane = new ContentPane({
		style: {
			width: "200px"
		},
		region: "left"
	});
	var fileManager = new Tree({
		model: new ObjectStoreModel({
			store: new JsonRest({
				target: "/rest/",
				getChildren: function(object) {
					return object.children || null;
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
	testPaneOrganizer.addChild(filePane);
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
			eval(cm.getContent());
        }
	});
	testPaneControls.addChild(runButton);
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
	
	console.log("adding tc");
	content.addChild(tc);
	console.log("tc added");
	
    content.startup();
	
});
