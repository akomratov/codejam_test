sap.ui.define([
		"sap/ui/model/Filter"
	], function (Filter) {
		"use strict";

		return {
			filterTable: function(oTable, aFilters) {
				oTable.getBinding("items").filter(aFilters);
			}
		};

	}
);