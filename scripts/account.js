$(document).ready(function() {

	var conf;

	var confRequest = $.getJSON("/conf.json", function(response){
		conf = response;
	});

	$.ajaxSetup({
		crossDomain: true,
		xhrFields: {
			withCredentials: true
		}
	});

	$.getJSON("http://weapon.labeli.org/users/info.json", function(response) {
		$("#access-account").hide();
		$("#my-infos").show();
		
		loadInfos(response.data);
	}).fail(function(jqXHR) {
		if (jqXHR.status == 403) {
			$("#access-account").show();
		} else {
			$("#access-account").show();
		}
	});



	$("#connect").on("click", ".button", function(){
		var username = $("#connect .username").val();
		var password = $("#connect .password").val();
		$.post("http://weapon.labeli.org/users/login.json", {"data[User][username]" : username, "data[User][password]" : password}, function(response) {
			$("#access-account").hide();
			$("#my-infos").show();
			loadInfos(response.data);

		}, "json") 
			.fail(function() {
			$("#connect .errors").text("Oops. Veuillez vérifier vos informations.");
		});
	});

	$("#signup").on("click", ".button", function(){
		var username = $("#signup .username").val();
		var password = $("#signup .password").val();
		var passwordconfirm = $("#signup .passwordconfirm").val();
		var email = $("#signup .email").val();
		var firstname = $("#signup .firstname").val();
		var lastname = $("#signup .lastname").val();

		if(password != passwordconfirm){
			$("#signup .errors").text("Les mots de passe ne sont pas identiques.");
		} else {


			$.post("http://weapon.labeli.org/users.json", 
				   {
				"data[User][username]" : username, 
				"data[User][password]" : password,
				"data[User][level]": 1,
				"data[User][firstName]": firstname,
				"data[User][lastName]": lastname,
				"data[User][email]" : email
			}, 
				   function(response) {
				$("#access-account").hide();
				$("#my-infos").show();

				$.post("http://weapon.labeli.org/users/login.json", {"data[User][username]" : username, "data[User][password]" : password},function(){
					$.getJSON("http://weapon.labeli.org/events/book/"+conf.event.id+".json", function(response){
						loadInfos(response.data);
					});
				});
			}, "json") 
				.fail(function() {
				$("#signup .errors").text("Oops. Veuillez vérifier vos informations.");
			});
		}
	});

	$(".my-tournaments").on("click", ".button", function(){
		$(".modal-body #list-games").html('<option value="null">- Veuillez choisir un jeu -</option>');
		$.getJSON("http://weapon.labeli.org/events/"+conf.event.id+".json", function(response){
			$.each(response.data.Tournament, function (index, value){
				var start = new Date(value.start.replace("-", " ", "g"));
				var end = new Date(value.end.replace("-", " ", "g"));
				var when = "De "+start.toLocaleTimeString() + " à "+end.toLocaleTimeString();
				var option = '<option value="'+value.id+'">'+value.name+' - '+when+'</option>';
				$(".modal-body #list-games").append(option);
			});

		});
	});

	$(".modal-body").on("click", ".button-validate-add", function(){
		var tournamentId = $("#list-games").val();
		if(tournamentId != null) {
			$.getJSON("http://weapon.labeli.org/tournaments/book/"+tournamentId+".json", function(){
				window.location = "/mon-compte";
			});
			$('#basicModal').modal('hide');
		}
	})

});

function disconnect(){
	$.getJSON("http://weapon.labeli.org/users/logout.json", function(){

		window.location = "/";
	});
}

function loadInfos(data){
	$("#my-infos .username").text(data.User.username);
	$("#my-infos .email").text(data.User.email);
	$("#my-infos .firstname").text(data.User.firstName);
	$("#my-infos .lastname").text(data.User.lastName);

	$.each(data.Tournament, function(index, value){
		var id=value.idTournament;
		$.getJSON("http://weapon.labeli.org/tournaments/"+id+".json", function(response){
			var start = new Date(response.data.Tournament.start.replace("-", " ", "g"));
			var end = new Date(response.data.Tournament.end.replace("-", " ", "g"));
			var when = "De "+start.toLocaleTimeString() + " à "+end.toLocaleTimeString();
			var row = "<li class='gameline'>"+response.data.Game.name+" - "+when+"</li>";
			$(".my-tournaments-list").append(row);
		});
	});
}