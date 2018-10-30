var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-1167481-24']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'dc.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

console.log("popup loaded");

document.getElementById("flags_tab_link").addEventListener("click", function() {
    chrome.tabs.create({url:'chrome://flags/#enable-panels'});
    _gaq.push(["_trackEvent", "Panel", "flags_link", "click"]);
});

setTimeout(function(){ 
	 _gaq.push(["_trackEvent", "Panel", "flags_page", "open"]);
 }, 520);