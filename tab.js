require([
    "dojo/dom-construct",
	"dijit/layout/BorderContainer",
    "dijit/layout/TabContainer",
    "dijit/layout/ContentPane",
	"widgets/Login",
    "widgets/CMWidget",
	"widgets/Banner",
	"dijit/form/Button",
	"dojo/store/JsonRest",
	"dijit/tree/ObjectStoreModel",
	"dijit/Tree",
    "dojo/domReady!"
], function(domConstruct, BorderContainer, TabContainer, ContentPane, Login, CMWidget, Banner, Button, 
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
	/*
	var title = new ContentPane({
		region: "top",
		content: "COMP 110",
		style: {
			backgroundColor: "#686868",
			border: "0px",
			color: "white",
			marginBottom: "10px",
			marginTop: "5px",
			fontFamily: "sans-serif"
		}
	});
	content.addChild(title);
	*/
	var banner = new Banner({
		region: "top",
		title: "COMP 110"
	});
	var login = new Login({
	});
	banner.addChild(login);
	content.addChild(banner);
	
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
	
	content.addChild(tc);
    content.startup();
	
});
