define([
	"dojo/_base/declare",
	"dojo/dom-construct",
	"dojo/dom-style",
	"dijit/_WidgetBase",
	"dijit/_Container"
], function (declare, domConstruct, domStyle, _WidgetBase, _Container) {
	return declare([_WidgetBase, _Container],{
		title: "default title",
		buildRendering: function () {
			this.domNode = domConstruct.create("div", {
				style: {
					paddingLeft: "10px",
					backgroundColor: "#686868"
				}
			});
			this.containerNode = domConstruct.create("div", {
				style: {
					float: "right"
				}
			}, this.domNode);
			this.titleNode = domConstruct.create("div", {
				innerHTML:this.title,
				style: {
					fontFamily: "sans-serif",
					fontWeight: "bold",
					fontSize: "20px"
				}
			}, this.domNode);
		},postCreate: function () {
			 var topStyle = domStyle.get(this.domNode);
			 var titleStyle = domStyle.get(this.titleNode);
			 var tsWidth = Number(topStyle.width.split("px")[0]);
			 domStyle.set(this.titleNode, "width", tsWidth * .5);

			domStyle.set(this.containerNode, "height", titleStyle.height);

		},
		addChild: function () {
			this.inherited(arguments);
		}
		/*,
		resize: function () {
			this.inherited(arguments);
			var cstyle = domStyle.get(this.getChildren()[0].domNode);
			domStyle.set(this.containerNode, "height", cstyle.height);
			domStyle.set(this.domNode, "height", cstyle.height);
			domStyle.set(this.titleNode, {
				height: "auto",
				lineHeight: cstyle.height,
				verticalAlign: "middle"
			});
		}
		*/
	});
});
