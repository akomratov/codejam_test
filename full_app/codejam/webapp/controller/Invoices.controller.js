sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/core/routing/History",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"cj/controller/tableUtils"
	], function (Controller, History, Filter, FilterOperator, tableUtils)  {
		"use strict";
		
		return Controller.extend("cj.controller.Invoices", {
			
			onInit: function() {
				this.getOwnerComponent().getRouter().getRoute("invoices").attachPatternMatched(this.onObjectMatched, this);   
			},
			
			onObjectMatched: function(oEvent) {
				var path = decodeURIComponent(oEvent.getParameter("arguments").orderId);
				var page = this.getView().byId("invoicePage");
				page.bindElement(path);
				var sOrederId = this.getView().getModel().getObject(path).OrderID;
				tableUtils.filterTable(this.getView().byId("invoiceTable"), new Filter("OrderID", FilterOperator.EQ, sOrederId));
			},
			
			onNavBack: function(oEvent) {
				var oHistory = History.getInstance();
				var sPreviousHash = oHistory.getPreviousHash();
	
				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				}
				// this.getOwnerComponent().getRouter().navTo("object", true);
			}

		});

	}
);