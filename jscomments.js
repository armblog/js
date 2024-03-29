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
						$tab.prepend("<img src='https://1.bp.blogspot.com/-eNQGZ14k0Io/YXlB_CsQw2I/AAAAAAAAnxU/-JwZc025aCw42Hu0ktnqw_Ty2Moa31kuwCLcBGAsYHQ/w199-h200/44-442110_jpg-black-and-white-library-google-logo-png.png'>");
						break;
					case "twitter-comments":
						$tab.prepend("<img src='https://4.bp.blogspot.com/-qExtWK1THwI/Wst0JEJBpjI/AAAAAAAAf1c/SFf2UOgg4VcYNSGDgL3fmUsA2bJeLfgrwCLcBGAs/s1600/white-twitter-bird.png'>");
						break;
					case "fb-comments":
						$tab.prepend("<img src='https://1.bp.blogspot.com/-WA9UOqQMhB4/YXlEQ5xWabI/AAAAAAAAnxc/O0OyAdwvpOA7EYFNb0GH96xWrmCi7zCdwCLcBGAsYHQ/w200-h199/PngItem_2690228.png'>");
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
