define([
	"dojo/_base/declare",
	"dojo/query",
	"dojo/dom-construct",
	"dijit/_WidgetBase",
	"dojo/text!widgets/cmwidget/codemirror.css",
	"widgets/cmwidget/codemirror-compressed"
], function(declare, query, domConstruct, _WidgetBase, css) {
	return declare([_WidgetBase], {
		cm: null,
		buildRendering: function() {
			domConstruct.create("style", {innerHTML:css}, query("head")[0]);
			this.domNode = domConstruct.create("div", {style:"width:100%"});
		},
		postCreate: function() {
			this.inherited(arguments);
			this.cm = CodeMirror(this.domNode,{
				lineNumbers:true,
				value:" "
			});
		},
		resize: function() {
			this.inherited(arguments);
			this.cm.refresh();
		}
	});
});
