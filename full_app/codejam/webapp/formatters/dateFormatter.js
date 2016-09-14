sap.ui.define([
		
	], function () {
		"use strict";
		

		return {
			
			formatDate: function(date) {
				if(date) {
					return date.toLocaleDateString();
				}
			}
			
		};

	}
);