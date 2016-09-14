sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"cj/formatters/dateFormatter",
		"cj/controller/tableUtils"
	], function (Controller, Filter, FilterOperator, dateFormatter, tableUtils) {
		"use strict";
		
		return Controller.extend("cj.controller.Detail", {
			
			dateFormatter: dateFormatter,
			
			onInit: function() {
				this.getOwnerComponent().getRouter().getRoute("object").attachPatternMatched(this.onObjectMatched, this);   
				this.initChart(this.getView().byId("vizFrame"));
			},
			
			onObjectMatched: function(oEvent) {
				var path = decodeURIComponent(oEvent.getParameter("arguments").orderId);
				var page = this.getView().byId("detailPage");
				page.bindElement(path);
				var sOrederId = this.getView().getModel().getObject(path).OrderID;
				tableUtils.filterTable(this.getView().byId("orderDetailsTable"), new Filter("OrderID", FilterOperator.EQ, sOrederId));
			},
			
			_filterTable: function(sOrederId) {
				var oTable = this.getView().byId("orderDetailsTable");
				oTable.getBinding("items").filter(new Filter("OrderID", FilterOperator.EQ, sOrederId));
			},
			
			onInvoiceButtonPressed: function(oEvent) {
				var oBindingContext = oEvent.getSource().getBindingContext();
				var path = oBindingContext.getPath();
				this.getOwnerComponent().getRouter().navTo("invoices", {
					orderId: encodeURIComponent(path)
				});
			},
			
			initChart: function(oVizFrame) {
				oVizFrame.removeAllFeeds();
				oVizFrame.setVizType('column');
				oVizFrame.setUiConfig({
		            "applicationSet": "fiori"
		        });
		        var properties = {
				     'title' : {'visible': true, 'text': 'Sales by Products'}
				};
		        oVizFrame.setVizProperties(properties);
		        var dataset = new sap.viz.ui5.data.FlattenedDataset({
	        	    dimensions: [{
	        		 		name: "Product",
	        				axis : 1,
	        		 		value: {path: "ProductName"}
	        		 	}],
	        		 	measures: [
	        		 		{
	        		 			name: 'Sales', 
	        		 			value: {path:'ProductSales'}
	        		 		}
	        		 	],
	        		 	data: {
	        		 		path: '/Product_Sales_for_1997'
	        		 	}
		        });
		        var feedPrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid' : "primaryValues",
					'type' : "Measure",
					'values' : ["Sales"]
				});
				var feedAxisLabels = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid' : "axisLabels",
					'type' : "Dimension",
					'values' : ["Product"]
				
				});
	    	    oVizFrame.setModel(this.getView().getModel());
	    	    oVizFrame.setDataset(dataset);
	    	    oVizFrame.addFeed(feedPrimaryValues);
				oVizFrame.addFeed(feedAxisLabels);
				
			}

		});

	}
);