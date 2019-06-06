// Immediately-invoked function expression
(function() {
    // Load the script
    var script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
    script.type = 'text/javascript';
    script.onload = function() {
        var $ = window.jQuery;
        // Use $ here...
		setTimeout(function(){ 
			$.getScript("/_layouts/15/MicrosoftAjax.js", function () {
			$.getScript("/_layouts/15/SP.Runtime.js", function () {
				$.getScript("/_layouts/15/SP.js", function () {
					Type.registerNamespace('DJ');
					DJ.HeaderFooter = DJ.HeaderFooter || {};

					DJ.HeaderFooter.Render = function () {
						var webProperties,

						getWebPropertiesSucceeded = function () {
							var allProps = webProperties.get_fieldValues();
							if (allProps.TargetUrl != "") {
									  var footerHtml = "<br/><div id='ClientFooter'>";
										footerHtml = footerHtml + "<div>";
										footerHtml = footerHtml + "<h2 style='color:Red;font-size:16px;'><b>Migration Notice</b>: This site is moved to <a href='"+ allProps.TargetUrl +"'>" + allProps.TargetUrl +"</a></h2>";
										footerHtml = footerHtml + "</div>";
										footerHtml = footerHtml + "</div>";
									$('#pageTitle').append(footerHtml);
							}
							
						},

						handleError = function () {
							alert('Error rendering header/footer');
						}

						return {
							initializeHeaderFooter: function () {
								var clientContext = SP.ClientContext.get_current();
								var hostWeb = clientContext.get_web();
								webProperties = hostWeb.get_allProperties();
								clientContext.load(webProperties);
								clientContext.executeQueryAsync(getWebPropertiesSucceeded, handleError);
							}
						}
					}();

					if (typeof _spPageContextInfo != "undefined" && _spPageContextInfo != null) {
						// MDS enabled
						RegisterModuleInit(_spPageContextInfo.siteServerRelativeUrl + 'SiteAssets/banner.js', DJ.HeaderFooter.Render.initializeHeaderFooter);
					}
					// Run now on this page (and non-MDS scenarios)
					DJ.HeaderFooter.Render.initializeHeaderFooter();
				});
			});
		});		
		}, 2000);	
		//end
    };
    document.getElementsByTagName("head")[0].appendChild(script);
})();
