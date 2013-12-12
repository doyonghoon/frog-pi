$(document).ready(function(){
	$(".onButton").click(function() {
		console.log("onButton click");
		$.get("/switcher?switcherValue=0",function(data,status) {
			location.reload();
		});
	});

	$(".offButton").click(function() {
		console.log("offButton click");
		$.get("/switcher?switcherValue=1",function(data,status) {
			location.reload();
		});
	});
});
