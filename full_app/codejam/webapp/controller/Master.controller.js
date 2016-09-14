sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"sap/ui/model/Sorter",
		"cj/formatters/dateFormatter"
	], function (Controller, Filter, FilterOperator, Sorter, dateFormatter) {
		"use strict";
		
		return Controller.extend("cj.controller.Master", {
			
			dateFormatter: dateFormatter,

			onInit : function () {
				var oModel = new sap.ui.model.json.JSONModel({
					customer: ""
				});
				this.getView().setModel(oModel, "local");
			},
			
			
			onFilterButtonPress: function(oEvent) {
				var oModel = this.getView().getModel("local");
				var sCustomer = oModel.getProperty("/customer");
				var oList = this.getView().byId("list");
				if(sCustomer !== "") {
					oList.getBinding("items").filter(new Filter("CustomerID", FilterOperator.EQ, sCustomer));
				} else {
					oList.getBinding("items").filter();
				}
			},
			
			onSortButtonPress: function(oEvent) {
				var oButton = oEvent.getSource();
				var oPopover = this._getPopover();
				if(oPopover.isOpen()) {
					oPopover.close();
				} else {
					oPopover.openBy(oButton);
				}
			},
			
			onChangeSortOrder: function(oEvent) {
				var sProperty = oEvent.getParameter("listItem").getTitle();
				var oList = this.getView().byId("list");
				var sorter = new Sorter(sProperty);
				oList.getBinding("items").sort(sorter);
				this._oPopover.close();
			},
			
			onOrderSelect: function(oEvent) {
				var path = oEvent.getParameter("listItem").getBindingContext().getPath();
				this.getOwnerComponent().getRouter().navTo("object", {
					orderId: encodeURIComponent(path)
				});
			},
			
			_getPopover: function() {
				if(!this._oPopover) {
					this._oPopover = sap.ui.xmlfragment("cj.view.popover", this);
				}
				return this._oPopover;
			}

		});

	}
);