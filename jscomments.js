var jsCommentPages = function(){
	var $activePage,
		$activeTab,
		init = function(){	
			$(".comments-tab").each(function(){
				var $tab = $(this);
				$tab.click(selectPage)
					.addClass("js-inactive-tab");
				switch ($tab.attr("id")){
					case "blogger-comments": 
						$tab.prepend("<img src='https://3.bp.blogspot.com/-mh8fORYnMhA/Wstzp9lg6LI/AAAAAAAAf1U/QgeljjRXDFQ4yVx71FWYsZOAFunYIzGwgCLcBGAs/s1600/blogger-white-B.png'>");
						break;
					case "twitter-comments":
						$tab.prepend("<img src='https://4.bp.blogspot.com/-qExtWK1THwI/Wst0JEJBpjI/AAAAAAAAf1c/SFf2UOgg4VcYNSGDgL3fmUsA2bJeLfgrwCLcBGAs/s1600/white-twitter-bird.png'>");
						break;
					case "fb-comments":
						$tab.prepend("<img src='https://4.bp.blogspot.com/-y5iHWqLO33k/V-TlS1XbuKI/AAAAAAAAbwc/okZqvA67OoswRK3HGrB2LcrIOlryD3XnACLcB/s1600/fb.png'>");
						break;
					case "gp-comments":
						$tab.prepend("<img src='https://dl.dropboxusercontent.com/u/43733183/gp.png'>");
						break;
				}
				$tab = null;
			});
					
			getTweetCounts();
			
			var $default = $(".js-default-tab:first"),
				strDefault = "#blogger-comments";
			if($default.length > 0){
				strDefault = "#" + $default.attr("id");
			}
			//Set default tab and page Active
			$activeTab = $(strDefault);
			$activeTab.removeClass("js-inactive-tab");
			
			$activePage = $(strDefault + "-page");			
			$activePage.show();
		},
		getTweetCounts = function(){
		  	$(".js-page-tweet-count").each(
				function(){
					var $count = $(this);
					$.getJSON("http://urls.api.twitter.com/1/urls/count.json?callback=?",
		      	{url: $count.attr("href")},
		         function(json){$count.text(json.count);$count = null;});					   	
				}
			);		   
 	 	},
		selectPage = function() {
			//Set old tab inactive, then set clicked tab active
		  	$activeTab.addClass("js-inactive-tab");
			$activeTab = $(this);
		  	$activeTab.removeClass("js-inactive-tab");
			
			//hide active page, then switch to page associated to clicked tab
		  	$activePage.hide();
		  	$activePage = $("#" + $activeTab.attr("id") + "-page");
		  	$activePage.show();
		};
  	$("document").ready(init);
}();
