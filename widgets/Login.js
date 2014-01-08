define([
	"dojo/_base/declare",
	"dojo/dom-construct",
	"dojo/cookie",
	"dijit/_WidgetBase",
	"dijit/form/Form",
	"dijit/form/Button"
], function (declare, domConstruct, cookie, _WidgetBase, Form, Button) {
	return declare([_WidgetBase], {
		submit: null,
		form: null,
		buildRendering: function() {
			if (cookie("id")) {
				this.domNode = domConstruct.create("div", {innerHTML: cookie("id")});
				return;
			}
			this.domNode = domConstruct.create("div");
			this.form = new Form({
				action: "https://onyen.unc.edu/cgi-bin/unc_id/authenticator.pl",
				name: "form1",
				method: "POST",
				onSubmit: function() {
					return true;
				}
			}).placeAt(this.domNode);
			domConstruct.create("input", {
				type: "hidden",
				name: "title",
				value: "COMP 110 Onyen Authentication"
			}, this.form.containerNode);
			domConstruct.create("input", {
				type: "hidden",
				name: "getpid",
				value: "displayName"
			}, this.form.containerNode);
			domConstruct.create("input", {
				type: "hidden",
				name: "targetpass",
				value: document.URL
			}, this.form.containerNode);
			domConstruct.create("input", {
				type: "hidden",
				name: "textpass",
				value: "You are now logged in!"
			}, this.form.containerNode);
			this.submit = domConstruct.create("input", {
				type: "submit",
				name: "submit",
				value: "Log in"
			}, this.form.containerNode);
		},
		postCreate: function() {
			if (cookie("id")) {
				return;
			}
			var that = this;
			this.submit = new Button({
				label: "Log in",
				onClick: function() {
					that.form.submit();
				}
			},this.submit);
		}
	});
});
