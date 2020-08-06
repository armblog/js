var GetWeather = function GetWeather()
{
var url = "https://weather-ydn-yql.media.yahoo.com/forecastrss";
var method = "GET";
var app_id = "1BCktdxz";
var consumer_key = "dj0yJmk9d2ZXWTNHUzlwN2pZJmQ9WVdrOU1VSkRhM1JrZUhvbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTRk";
var consumer_secret = "0c2685df479ec40e2a165dc8bd61ec59387e3249";
var concat = "&";
var query = {"location": "yerevan", "format": "json"};
var oauth = {
    "oauth_consumer_key": consumer_key,
    "oauth_nonce": Math.random().toString(36).substring(2),
    "oauth_signature_method": "HMAC-SHA1",
    "oauth_timestamp": parseInt(new Date().getTime() / 1000).toString(),
    "oauth_version": "1.0"
};

var merged = {}; 
jQuery.extend(merged, query, oauth);
// Note the sorting here is required
var merged_arr = Object.keys(merged).sort().map(function(k) {
  return [k + "=" + encodeURIComponent(merged[k])];
});
var signature_base_str = method
  + concat + encodeURIComponent(url)
  + concat + encodeURIComponent(merged_arr.join(concat));

var composite_key = encodeURIComponent(consumer_secret) + concat;
var hash = CryptoJS.HmacSHA1(signature_base_str, composite_key);
var signature = hash.toString(CryptoJS.enc.Base64);

oauth["oauth_signature"] = signature;
var auth_header = "OAuth " + Object.keys(oauth).map(function(k) {
  return [k + "=&quot;" + oauth[k] + "&quot;"];
}).join(",");

jQuery.ajax({
  url: url + "?" + $.param(query),
  headers: {
    "Authorization": auth_header,
    "X-Yahoo-App-Id": app_id 
  },
  method: "GET",
  success: function(data){
console.log(&quot;AAA1&quot;);
   console.log(data);
    html = &quot;<img height='144' id='wimg' style='float:left;' width='200px'/>&quot;;
     $(&quot;#weather-img&quot;).html(html);
     var wimg = &quot;https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/&quot;+data.current_observation.condition.code+&quot;d.png&quot;
    $("#wimg").attr("src", wimg).load(function() { 
       html = "<img id='wtmpimg'></img>";
	  $("#weather-term").html(html);
      var farenTemp = data.current_observation.condition.temperature;
      var celsTemp = Math.round(5/9*(farenTemp-32));
     
	  if(farenTemp<20)
      {
		
      }
     

    });
  },

});
}