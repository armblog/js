        $(function () {
			var updateTime;
function createCORSRequest(method, url){
				var xhr = new XMLHttpRequest();
				if ("withCredentials" in xhr){
					xhr.open(method, url, true);
				} else if (typeof XDomainRequest != "undefined"){
					xhr = new XDomainRequest();
					xhr.open(method, url);
				} else {
					xhr = null;
				}
			return xhr;
			}
			
			function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var request = createCORSRequest("get", "https://rawgit.com/armblog/Armlikes/master/PagesForSite.xml"+"?p="+Math.random());
if (request){
    request.onload = function(){
        parseXml(request.responseText);//do something with request.responseText
    };
    request.send();
}


            function Page(title, url, thumbnail, likes, id, category) {
                this.title = title;
                this.likes = likes;
                this.url = url;
                this.id = id;
                this.thumbnail = thumbnail;
				this.category = category;
            }

            function parseXml(xml) {
                var NumberOfThumbInOnePage = 50;
                var previousPage = 0;
                var myArray = new Array();
				var isDefaultTextInSearchForm = true;
				xml = $.parseXML(xml);
				updateTime = $(xml).find('Pages').attr('updateTime');
                $(xml).find('Page').each(function () {
                    var $page = $(this);
                    var page = new Page();
                    page.title = $page.find('Name').text();
                    page.url = $page.find('PageURL').text();
                    page.thumbnail = $page.find('Thumbnail').text();
                    page.likes = $page.find('Likes').text();
					page.category = $page.find('Category').text();
                    page.id = 1;
					if(page.likes>1000)
					{
						myArray.push(page);
					}
                   
                });

                function SortByLikes(a, b) {
                    var aLike = parseInt(a.likes);
                    var bLike = parseInt(b.likes);
                    return ((aLike < bLike) ? 1 : ((aLike > bLike) ? -1 : 0));
                }
				
				function Init()
				{
				    var count = $('.article').size();
					var amboxjmas = parseInt(count / NumberOfThumbInOnePage);
					var mnacord = count % NumberOfThumbInOnePage;
					var pageCount = amboxjmas
					if (mnacord > 0) pageCount++;
					isDefaultTextInSearchForm = true;
					$('.article').fadeOut(500);
					$('.pagination').empty();
					$('#s').css("color", "gray");
					$('#s').val("Փնտրել");
					
					for (i = 1; i <= pageCount; i++) {
						var pageID = "page" + i;
						if((i-1)%20==0)
						{
						   $('</br>').appendTo('.pagination');
						}

						$('<a class="pagingNumber" style="display:inline-block;margin-top:15px;margin-left:10px; color: white; font-size: 20px;" href="#" id=' + pageID + '>' + i + '</a>').appendTo('.pagination');
						
						
					}
					$('.pagingNumber:lt(1)').css('background', 'rgba(0, 0, 0, 1)');
					previousPage = "page1";
					$('.article:lt(' + NumberOfThumbInOnePage + ')').fadeIn(500);
					
					  /*$('.article').filter(function () {
                            var text = $(this).find('.category').text().toLowerCase();
							console.log(text.indexOf("people"));
                            return text.indexOf("people") >= 0;
                        }).slice(0, NumberOfThumbInOnePage).fadeIn(500);
						
						$(".article:visible").each(function(){
							var Id = $(this).attr('data-id');
							console.log(Id);
							$(this).find('.thumb').attr("src",myArray[Id].thumbnail);
                        });*/
					var Pcount = "Էջերի քանակը: " + count;
					$('#PageCounter').text(Pcount);
					var updateTimeStr = "Թարմացվել է: " + updateTime;
					$('#UpdateTime').text(updateTimeStr);
				}

                myArray.sort(SortByLikes);

                for (i = 0; i < myArray.length; i++) {
                    $('<a target="_blank" href=' + myArray[i].url + '><span style="display:none;" data-id=' + i + ' class="article"><img class="thumb"></img><span class="img_h"/><span class="place">' + (i + 1) + '</span><span class="likes">' + numberWithCommas(myArray[i].likes) + '</span><span class="title"><span>' + myArray[i].title + '</span><span style="display:none;" class="category">'+ myArray[i].category + '</span></span></span></a>').appendTo('#content');
					
					if(i<NumberOfThumbInOnePage)
					{
						$('.article :last').find('.thumb').attr("src",myArray[i].thumbnail);
					}
                }
				

                Init();

                $('.pagingNumber').live("click", (function () {
                    var thisID = $(this).attr('id');
					//original paging
					if(thisID.indexOf("Filtered")<0)
					{
					    var NumId = thisID.substring(4, thisID.length);
					    $('.article').fadeOut(500);
						var beginIndex = NumberOfThumbInOnePage * (NumId - 1);
						var endIndex = beginIndex + NumberOfThumbInOnePage;
						$('.article').slice(beginIndex, endIndex).fadeIn(500);
						
						for (i = beginIndex; i < endIndex; i++) {
						$('.article[data-id=' + i + ']').find('.thumb').attr("src",myArray[i].thumbnail);
						}
						
						
						if(previousPage != thisID)
						{
						$(this).css('background', 'rgba(0, 0, 0, 1)');
						var tempId = $('#' + previousPage);
						
						$(tempId).css('background', 'rgba(0, 0, 0, .5)');
						previousPage = thisID;
						}
						
					}
					else
					{
                    var NumId = thisID.substring(12, thisID.length);
                    
                    $('.article').fadeOut(500);
                    var beginIndex = NumberOfThumbInOnePage * (NumId - 1);
                    var endIndex = beginIndex + NumberOfThumbInOnePage;
                    var query = $('#s').attr('value').toLowerCase();
					
					    $('.article').filter(function () {
                            var text = $(this).find('.title').text().toLowerCase();
                            return text.indexOf(query) >= 0;
                        }).slice(beginIndex, endIndex).fadeIn(500);
						
						$(".article:visible").each(function(){
							var Id = $(this).attr('data-id');
							console.log(Id);
							$(this).find('.thumb').attr("src",myArray[Id].thumbnail);
                        });
						
						
					
						
                    if(previousPage != thisID)
					{
						$(this).css('background', 'rgba(0, 0, 0, 1)');
						var tempId = $('#' + previousPage);
						$(tempId).css('background', 'rgba(0, 0, 0, .5)');
						previousPage = thisID;
					}
					}
                }));
				
                $('.article').mouseenter(function () {
                    $(this).find('.thumb').css('opacity', '0.7');
					$(this).find('.title').css('opacity', '0.7');
					$(this).find('.likes').css('opacity', '0.7');
					$(this).find('.place').css('opacity', '0.7');
                }).mouseleave(function () {
                     $(this).find('.thumb').css('opacity', '1');
					$(this).find('.title').css('opacity', '1');
					$(this).find('.likes').css('opacity', '1');
					$(this).find('.place').css('opacity', '1');
                });

                //site title click
                $('.sitetitle').click(function () {
                    Init();
					
                });
				
				
				$("#w2b-searchbox #w2b-searchform #s").click(function()
				{
				if(isDefaultTextInSearchForm)
				{
					$('#s').val("");
					$('#s').css("color", "black");
					isDefaultTextInSearchForm = false;
				}				
				});

                $("#w2b-searchbox #w2b-searchform #s").keypress(function (e) {
                    if (e.which == 13) {
                        var query = $(this).attr('value').toLowerCase();
                        $('.article').fadeOut(500);
                        var count = $('.article').filter(function () {
                            var text = $(this).find('.title').text().toLowerCase();;
                            return text.indexOf(query) >= 0;
                        }).size();
						
						var amboxjmas = parseInt(count / NumberOfThumbInOnePage);
						var mnacord = count % NumberOfThumbInOnePage;
						var pageCount = amboxjmas
						if (mnacord > 0) pageCount++;
						
						$('.pagination').empty();
						
						if(pageCount>1)
						{
							for (i = 1; i <= pageCount; i++) {
							var pageID = "FilteredPage" + i;
							$('<a class="pagingNumber" style="margin-left:10px; color: white; font-size: 20px;" href="#" id=' + pageID + '>' + i + '</a>').appendTo('.pagination');
							}
							$('.pagingNumber:lt(1)').css('background', 'rgba(0, 0, 0, 1)');
							previousPage = "FilteredPage1";
						}
                        $('.article').filter(function () {
                            var text = $(this).find('.title').text().toLowerCase();;
                            return text.indexOf(query) >= 0;
                        }).slice(0, NumberOfThumbInOnePage).fadeIn(500);
						
						$(".article:visible").each(function(){
							var Id = $(this).attr('data-id');
							$(this).find('.thumb').attr("src",myArray[Id].thumbnail);
                        });
						
                    }

                });
            }

        });
