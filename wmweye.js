$.simpleWeather({
    zipcode: '',
    woeid: '2214662',
    location: '',
    unit: 'c',
    success: function(weather) {
      html = '<img id="wimg" style="float:left;" width="200px" height="144">';
	  $("#weather-img").html(html);
	  $('#wimg').attr('src', weather.image).load(function() { 
	  html = '<img id="wtmpimg">';
	  $("#weather-term").html(html);
	  if(weather.temp<15)
      {
		$('#wtmpimg').attr('src', 'https://1.bp.blogspot.com/-xn72czPPRq8/YEh6ZKDkxYI/AAAAAAAAmKM/Bjrrh7fRN5YxSmE3zKPGYxl8YGeKt-4hQCLcBGAsYHQ/s16000/cold.png').load(function() {
			loadTemperature();
		});
      }
      else
      {
		$('#wtmpimg').attr('src', 'https://sites.google.com/site/freewebspace11/images/hot.png').load(function() {
			loadTemperature();
		});
      }
      function loadTemperature()
	  {
		html = weather.temp+'&deg; '+weather.units.temp;
		$("#weather-tem").html(html);
      
		html='Երևան';
		$("#weather-city").html(html);
	  }
	  });  
      
 
    },
    error: function(error) {
      
    }
  });
