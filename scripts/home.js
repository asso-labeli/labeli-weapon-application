/*global $ */

$(document).ready(function () {
	var conf;

	var confRequest = $.getJSON("/conf.json", function(response){
		conf = response;
	});

	confRequest.done(function(){
		$.getJSON("http://weapon.labeli.org/events/"+conf.event.id+".json", function(response){
			var title = response.data.Event.name + " - " + response.data.Event.seats + " personnes";
			var description = response.data.Event.description;

			var start = new Date(response.data.Event.start.replace("-", " ", "g"));
			var end = new Date(response.data.Event.end.replace("-", " ", "g"));
			var when = "Du " + start.toLocaleDateString()+" à "+start.toLocaleTimeString() + " au " + end.toLocaleDateString()+" à "+end.toLocaleTimeString();
			var where = response.data.Event.location

			$("#presentation .title").html(title);
			$("#presentation .description").html(description);
			$("#presentation .when").html(when);
			$("#presentation .where").html(where);

			$.each(response.data.Tournament, function (index, value){
				var start = new Date(value.start.replace("-", " ", "g"));
				var end = new Date(value.end.replace("-", " ", "g"));
				var when = "De "+start.toLocaleTimeString() + " à "+end.toLocaleTimeString();
				$("#tournaments").append('<div class="col-xs-12 col-sm-6 col-md-4"><div class="baby-card card" data-toggle="modal" data-target="#basicModal" data-rule="'+value.idRule+'"><div class="text"><div>'+value.name+'</div><div class="when">'+when+'</div></div></div></div>')
			});
			
			$.each(response.data.SelfService, function (index, value){
				$("#self-service").append('<div class="col-xs-12 col-sm-6 col-md-4"><div class="baby-card card" data-toggle="modal" data-target="#basicModal" data-id="'+value.id+'"><div class="text"><div>'+value.name+'</div></div></div></div>')
			});


		});
	});

	$("#tournaments").on('click', '.card', function(){
		var rule = $(this).data("rule");
		$.getJSON("http://weapon.labeli.org/rules/"+rule+".json", function(response){

			var team = (response.data.Rule.size > 1) ? "Équipes de "+response.data.Rule.size: "Chacun pour soi";
			var website = '<a href="'+response.data.Game.website+'" target="_blank">Site officiel</a>'
			var platforms = '<a href="'+response.data.Game.downloadURL+'" target="_blank">'+response.data.Game.platforms+'</a>'
			$("#myModalLabel").text(response.data.Game.name + " - "+ response.data.Game.developer)
			$(".modal-body").html('<div class="description"><div>Genre : '+response.data.Game.genres+'</div><br>'+response.data.Game.description+'</div><div class="title">	<h3>'+response.data.Rule.name+'</h3></div><div>'+response.data.Rule.description+'</div><div class="row"><div class="col-xs-12 col-sm-6 col-md-4"><div class="notice">'+team+'</div></div><div class="col-xs-12 col-sm-6 col-md-4"><div class="notice">'+website+'</div></div><div class="col-xs-12 col-sm-6 col-md-4"><div class="notice">'+platforms+'</div></div></div>');
		});
	});
	
	$("#self-service").on('click', '.card', function(){
		var id = $(this).data("id");
		$.getJSON("http://weapon.labeli.org/games/"+id+".json", function(response){
			var website = '<a href="'+response.data.Game.website+'" target="_blank">Site officiel</a>'
			var platforms = '<a href="'+response.data.Game.downloadURL+'" target="_blank">'+response.data.Game.platforms+'</a>'
			/*var team = (response.data.Rule.size > 1) ? "Équipes de "+response.data.Rule.size: "Chacun pour soi";*/
			$("#myModalLabel").text(response.data.Game.name + " - "+ response.data.Game.developer)
			$(".modal-body").html('<div class="description"><div>Genre : '+response.data.Game.genres+'</div><br>'+response.data.Game.description+'</div><div class="row"><div class="col-xs-12 col-sm-6"><div class="notice">'+website+'</div></div><div class="col-xs-12 col-sm-6"><div class="notice">'+platforms+'</div></div></div>');
		});
	});
});