var userId;

$(document).ready(function () {

	var conf;
	var optionsTime = {hour: "numeric", minute: "numeric"};

	var confRequest = $.getJSON("/conf.json", function (response) {
		conf = response;
	});

	$.ajaxSetup({
		crossDomain: true,
		xhrFields: {
			withCredentials: true
		}
	});

	$.getJSON("http://weapon.labeli.org/users/info.json", function (response) {
		$("#access-account").hide();
		$("#my-infos").show();

		loadInfos(response.data);
	}).fail(function (jqXHR) {
		if (jqXHR.status == 403) {
			$("#access-account").show();
		} else {
			$("#access-account").show();
		}
	});



	$("#connect").submit(function () {
		var username = $("#connect .username").val();
		var password = $("#connect .password").val();
		$.post("http://weapon.labeli.org/users/login.json", {"data[User][username]": username, "data[User][password]": password}, function (response) {
			window.location = "/mon-compte";
		}, "json")
				.fail(function () {
					$("#connect .errors").text("Oops. Veuillez vérifier vos informations.");
				});
		return false;
	});

	$("#signup").on("click", ".button", function () {
		var username = $("#signup .username").val();
		var password = $("#signup .password").val();
		var passwordconfirm = $("#signup .passwordconfirm").val();
		var email = $("#signup .email").val();
		var firstname = $("#signup .firstname").val();
		var lastname = $("#signup .lastname").val();

		if (password != passwordconfirm) {
			$("#signup .errors").text("Les mots de passe ne sont pas identiques.");
		} else {


			$.post("http://weapon.labeli.org/users.json",
					{
						"data[User][username]": username,
						"data[User][password]": password,
						"data[User][firstName]": firstname,
						"data[User][lastName]": lastname,
						"data[User][email]": email
					},
			function (response) {
				$("#access-account").hide();
				$("#my-infos").show();

				$.post("http://weapon.labeli.org/users/login.json", {"data[User][username]": username, "data[User][password]": password}, function () {
					$.getJSON("http://weapon.labeli.org/events/book/" + conf.event.id + ".json", function (response) {
						loadInfos(response.data);
					});
				});
			}, "json")
					.fail(function () {
						$("#signup .errors").text("Oops. Veuillez vérifier vos informations.");
					});
		}
	});

	$(".my-tournaments").on("click", ".button", function () {
		$(".requiredInfo").empty();
		$(".addTourn-error").empty();
		$(".modal-body #list-games").html('<option value="null">- Veuillez choisir un jeu -</option>');
		$.getJSON("http://weapon.labeli.org/events/" + conf.event.id + ".json", function (response) {
			$.each(response.data.Tournament, function (index, value) {
				if (value.max > 0) {
					var start = new Date(value.start.replace("-", " ", "g"));
					var end = new Date(value.end.replace("-", " ", "g"));
					var when = "De " + start.toLocaleTimeString("fr-FR", optionsTime) + " à " + end.toLocaleTimeString("fr-FR", optionsTime);
					var option = '<option data-game="' + value.idGame + '" data-infos-required="' + value.infoRequired + '" data-mac-required="' + value.macRequired + '" value="' + value.id + '">' + value.name + ' - ' + when + '</option>';
					$(".modal-body #list-games").append(option);
				}
			});

		});
	});

	$(".my-teams").on("click", ".button-create-team", function () {
		$(".modal-body #tournament").html('<option value="null">- Veuillez choisir un jeu -</option>');
		$.getJSON("http://weapon.labeli.org/events/" + conf.event.id + ".json", function (response) {
			$.each(response.data.Tournament, function (index, value) {
				if (value.max > 0) {
					var option = '<option data-game="' + value.idGame + '" value="' + value.id + '">' + value.name + '</option>';
					$(".modal-body #tournament").append(option);
				}
			});

		});
	});

	$(".modal-body").on("click", ".button-validate-add", function () {
		var tournamentId = $("#list-games").val();
		var required = $("#list-games option:selected").data("infos-required");
		var gameId = $("#list-games option:selected").data("game");
		var usergame = null;

		if (tournamentId != null) {
			if (required) {
				usergame = $(".requiredInfo input").val();
			}
			if (required && (usergame == null || usergame == "")) {
				$(".addTourn-error").text("Vous devez compléter les informations pour vous inscrire à ce tournoi.")
			} else {
				if (required) {
					$.post("http://weapon.labeli.org/usergames/" + gameId + ".json", {
						"data[Usergame][username]": usergame,
						"data[Usergame][level]": 0,
						"data[Usergame][grade]": "unknown"
					}, function () {
						$.getJSON("http://weapon.labeli.org/tournaments/book/" + tournamentId + ".json", function () {
							window.location = "/mon-compte";
						});
						$('#basicModal').modal('hide');
					});
				} else {
					$.getJSON("http://weapon.labeli.org/tournaments/book/" + tournamentId + ".json", function () {
						window.location = "/mon-compte";
					});
					$('#basicModal').modal('hide');
				}
			}
		}
	});

	$(".modal-body").on("click", ".button-validate-create-team", function () {
		var idTournament = $("#createTeam #tournament").val();
		var name = $("#createTeam #name").val();
		var description = $('#createTeam #description').val();

		var params = {"data[Team][name]": name,
			"data[Team][description]": description,
			"data[TournamentTeam][idTournament]": idTournament};

		$.post("http://weapon.labeli.org/teams/create.json", params, function () {
			window.location = "/mon-compte";
		});

	});

	$(".my-teams-list").on("click", ".button-leave-team", function () {
		var team = $(this).data("team");
		$.get("http://weapon.labeli.org/teams/leave/" + team + ".json", function () {
			window.location = "/mon-compte";
		});

	});

	$(".my-teams-list").on("click", ".button-delete-team", function () {
		if (window.confirm("Êtes vous sûr de vouloir supprimer complétement cette équipe ?"))
		{
			var team = $(this).data("team");
			$.get("http://weapon.labeli.org/teams/delete/" + team + ".json", function () {
				window.location = "/mon-compte";
			});
		}
		else
			console.log("WTF");
	});

	$(".modal-body").on("click", ".button-validate-add-team", function () {
		var code = $('#addTeam #code').val();

		$.get("http://weapon.labeli.org/teams/join/" + code + ".json", function () {
			window.location = "/mon-compte";
		});

	});



	$(".modal-body").on("click", ".button-validate-change-infos", function () {
		var shirtSize = $("#changeInfos #shirtSize").val();
		var macAdress = $("#changeInfos #macAdress").val();
		var hasPizza = $('#changeInfos input[name=hasPizza]:checked').val();

		var params = {"data[User][sizeShirt]": shirtSize,
			"data[User][macAddress]": macAdress,
			"data[User][data]": hasPizza};

		$.post("http://weapon.labeli.org/users/" + userId + ".json", params, function () {
			window.location = "/mon-compte";
		});

	});

	$("#list-games").on("change", function () {
		var required = $(this).children("option:selected").data("infos-required");
		var macRequired = $(this).children("option:selected").data("mac-required");
		var idGame = $(this).children("option:selected").data("game");

		$(".requiredInfo").empty();

		var macAlert = '';
		if (macRequired)
			macAlert = 'Attention, votre adresse MAC doit être renseignée pour pouvoir vous inscrire';

		if (required)
		{
			$(".requiredInfo").html('Nom d\'utilisateur sur ce jeu : <input type="text" id="usergame">' + macAlert);
			$.getJSON("http://weapon.labeli.org/usergames/" + idGame + ".json", function (response) {
				loadUserGameInfos(response.data);
			});
		}
		else if (macRequired)
			$(".requiredInfo").html(macAlert);
	});








});

function disconnect() {
	$.getJSON("http://weapon.labeli.org/users/logout.json", function () {

		window.location = "/";
	});
}

function loadUserGameInfos(data)
{
	$('#usergame').val(data.Usergame.username);
}

function loadInfos(data) {
	var optionsTime = {hour: "numeric", minute: "numeric"};
	userId = data.User.id;
	$("#my-infos .username").text(data.User.username);
	$("#my-infos .email").text(data.User.email);
	$("#my-infos .firstname").text(data.User.firstName);
	$("#my-infos .lastname").text(data.User.lastName);
	$("#my-infos .shirtSize").text(data.User.sizeShirt);
	$("#my-infos .macAdress").text(data.User.macAddress);
	$("#my-infos .hasPizza").text(data.User.data);

	$("#changeInfos #shirtSize").val(data.User.sizeShirt);
	$("#changeInfos #macAdress").val(data.User.macAddress);
	var $radios = $('input:radio[name=hasPizza]');
	$radios.filter('[value=' + data.User.data + ']').prop('checked', true);



	$.each(data.Tournament, function (index, value) {
		var id = value.idTournament;
		$.getJSON("http://weapon.labeli.org/tournaments/" + id + ".json", function (response) {
			if (response.data.Tournament.max > 0) {
				var start = new Date(response.data.Tournament.start.replace("-", " ", "g"));
				var end = new Date(response.data.Tournament.end.replace("-", " ", "g"));
				var when = "De " + start.toLocaleTimeString("fr-FR", optionsTime) + " à " + end.toLocaleTimeString("fr-FR", optionsTime);
				var row = "<li class='gameline'>" + response.data.Game.name + " - " + when + "</li>";
				$(".my-tournaments-list").append(row);
			}
		});
	});

	$.each(data.Team, function (index, value) {
		var id = value.id;
		$.getJSON("http://weapon.labeli.org/teams/" + id + ".json", function (response) {
			console.log(response);
			var members = [];
			for (var i = 0; i < response.data.User.length; i++)
				members.push(response.data.User[i].firstName + ' &laquo;' + response.data.User[i].username + '&raquo; ' + response.data.User[i].lastName);

			var row = '<li class="team-description"><b>' + response.data.Team.name + '</b><br/>' +
					'&laquo; <i>' + response.data.Team.description + '</i> &raquo;<br/>' +
					'<b>Membres : </b><ul><li>' + members.join('</li><li>') + '</li></ul>' +
					'<b>Tournoi : </b>' + response.data.Tournament[0].name + '<br/>' +
					'<b>Code : </b><input type="text" value="' + response.data.Team.code + '" style="width:5em" readonly/> ' +
					'<span class="button button-leave-team" data-team="' + response.data.Team.id + '">Quitter</span> ' +
					'<span class="button button-delete-team" data-team="' + response.data.Team.id + '">Supprimer</span></li>';
			$(".my-teams-list").append(row);
		});
	});
}
