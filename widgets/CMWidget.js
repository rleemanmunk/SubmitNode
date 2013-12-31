define([
	"dojo/_base/declare",
	"dojo/query",
	"dojo/dom-construct",
	"dijit/_WidgetBase",
	"dojo/text!widgets/cmwidget/codemirror.css",
	"dojo/text!widgets/cmwidget/mbo.css",
	"widgets/cmwidget/codemirror-compressed"
], function(declare, query, domConstruct, _WidgetBase, css, theme) {
	domConstruct.create("style", {innerHTML:css}, query("head")[0]);
	domConstruct.create("style", {innerHTML:theme}, query("head")[0]);
	return declare([_WidgetBase], {
		cm: null,
		buildRendering: function() {
			this.domNode = domConstruct.create("div", {style:"width:100%"});
		},
		postCreate: function() {
			this.inherited(arguments);
			this.cm = CodeMirror(this.domNode,{
				lineNumbers:true,
				theme: "mbo"
			});
		},
		resize: function() {
			this.inherited(arguments);
			this.cm.refresh();
		},
		//returns content of codemirror
		getContent: function() {
			return this.cm.getValue();
		}
	});
});
