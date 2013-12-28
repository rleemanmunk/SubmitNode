require([
    "dojo/dom-construct",
    "dijit/layout/TabContainer",
    "dijit/layout/ContentPane",
    "widgets/CMWidget",
    "dojo/domReady!"
], function(domConstruct, TabContainer, ContentPane, CMWidget){
    var tc = new TabContainer({
        style: "height: 100%; width: 100%;",
		tabPosition: "left-h"
    }, "tc1-prog");

    var cp1 = new ContentPane({
         title: "Run",
         content: "We offer amazing food",
         style: "width: 100%"
    });
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
