sap.ui.define([
		"sap/ui/core/UIComponent",
		"sap/ui/model/odata/ODataModel"
	], function (UIComponent, ODataModel) {
		"use strict";

		return UIComponent.extend("cj.Component", {
			
			metadata : {
				manifest : "json"
			},

			init : function () {
				var oModel = new ODataModel("/northwind/V2/Northwind/Northwind.svc/");
				this.setModel(oModel);
				UIComponent.prototype.init.apply(this);
				this.getRouter().initialize();
			}

		});

	}
);