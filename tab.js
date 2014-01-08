require([
    "dojo/dom-construct",
	"dijit/layout/BorderContainer",
    "dijit/layout/TabContainer",
	"dijit/layout/AccordionContainer",
    "dijit/layout/ContentPane",
	"widgets/Login",
    "widgets/CMWidget",
	"dijit/form/Button",
	"dojo/store/JsonRest",
	"dijit/tree/ObjectStoreModel",
	"dijit/Tree",
    "dojo/domReady!"
], function(domConstruct,
	BorderContainer, TabContainer, AccordionContainer, ContentPane,
	Login, CMWidget, Button, 
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
	var titlePane = new ContentPane({
		region: "top",
		style: {
			backgroundColor: "#686868",
			border: "0px",
			marginBottom: "25px",
			marginTop: "15px",
			color: "white",
			minHeight: "60px"
		}
	});
	
	var titleSplit = new BorderContainer({
		style: {
			backgroundColor: "inherit",
			border: "inherit"
		}
	});
	
	var titleText = new ContentPane({
		region: "center",
		content: "COMP 110",
		style: {
			backgroundColor: "inherit",
			border: "inherit",
			marginTop: "auto",
			marginBottom: "auto",
			fontFamily: "sans-serif",
			fontWeight: "bold",
			fontSize: "25px"
		}
	});
	var loginPane = new ContentPane({
		region: "right",
		style: {
			backgroundColor: "inherit",
			border: "inherit"
		}
	});
	var login = new Login({

	});
	
	titleSplit.addChild(titleText);
	loginPane.addChild(login);
	titleSplit.addChild(loginPane);
	titlePane.addChild(titleSplit);
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
         title: "In Class",
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

	//=======================================
	//============HOMEWORK PANE==============
	//=======================================
    var homeworkPane = new ContentPane({
         title: "Homework",
		 style: "padding: 20px;"
    });
    tc.addChild(homeworkPane);
	
	var upload = domConstruct.create("div", {innerHTML:
		"<input type=\"file\">"
	});
	var uppane = new ContentPane({
         title: null,
		 content: upload
    });
	homeworkPane.addChild(uppane);
	
	var submitButton = new Button({
        label: "Submit",
        onClick: function() {
			alert("TODO: submission function");
        }
	});
	homeworkPane.addChild(submitButton);
	
	//=====================================
	//============GRADES PANE==============
	//=====================================
    var gradesPane = new ContentPane({
         title: "Grades",
		 style: "padding: 20px;"
    });
    tc.addChild(gradesPane);
	
	//================================================
	//============FOLDER MANAGEMENT PANE==============
	//================================================
    var fmPane = new ContentPane({
         title: "Folder Management",
		 style: "padding: 20px;"
    });
    tc.addChild(fmPane);
	
	content.addChild(tc);
    content.startup();
	
});
