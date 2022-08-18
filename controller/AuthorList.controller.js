sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("sap.ui.demo.bookapp.controller.AuthorList", {


		onPress: function (oEvent) {
            var oItem = oEvent.getSource();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail",{
                authorPath: window.encodeURIComponent(oItem.getBindingContext("author").getPath().substr(1))
            });
		},
        onFilterAuthors : function (oEvent) {

			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter({
                    filters:[
                    new Filter(
                        "FirstName", FilterOperator.Contains, sQuery),
                    new Filter(
                        "LastName", FilterOperator.Contains, sQuery)
                    ], and: false
                    })
                    );
			}

			// filter binding
			var oList = this.byId("authorList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		}
	});

});