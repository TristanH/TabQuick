
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById("form");
	var nevermind = document.getElementById("nevermind");

	form.addEventListener('submit', function() {
		chrome.runtime.getBackgroundPage(function(bgWindow){
											bgWindow.tabSaver.groupName = document.forms["form"]["groupName"].value;
											bgWindow.tabSaver.begin();
										});
		window.close();
	});
	nevermind.addEventListener('click', function(){
		window.close();
	});

});
