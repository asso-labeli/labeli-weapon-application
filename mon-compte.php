<?php 

$active = 2;
include("fragments/header.php");
?>
<script src="/scripts/account.js"></script>

<section id="access-account" class="col-xs-12">
	<div class="card-title col-xs-12">
		Mon compte Label[i] Gaming
	</div>
	<div class="row">
		<div class="col-xs-12 col-sm-6"><div class="card"><div class="text">
			<div class="row" id="connect">
				<div class="col-xs-12 form-title">Connection</div>
				<div class="col-xs-12"><input type="text" placeholder="Nom d'utilisateur" class="username"></div>
				<div class="col-xs-12"><input type="password" placeholder="Mot de passe" class="password"></div>
				<div class="col-xs-12 errors"></div>
				<div class="col-xs-12"><div class="button">Se connecter</div></div>
			</div></div></div></div>
		<div class="col-xs-12 col-sm-6"><div class="card"><div class="text">
			<div class="row" id="signup">
				<div class="col-xs-12 form-title">Inscription</div>
				<div class="col-xs-12"><input type="text" placeholder="Nom d'utilisateur" class="username"></div>
				<div class="col-xs-12"><input type="email" placeholder="Adresse email" class="email"></div>
				<div class="col-xs-12"><input type="text" placeholder="Prénom" class="firstname"></div>
				<div class="col-xs-12"><input type="text" placeholder="Nom" class="lastname"></div>
				<div class="col-xs-12"><input type="password" placeholder="Mot de passe (min 8 caractères)" class="password"></div>
				<div class="col-xs-12"><input type="password" placeholder="Confirmation mot de passe" class="passwordconfirm"></div>
				<div class="col-xs-12 errors"></div>
				<div class="col-xs-12"><div class="button">S'inscrire</div></div>
			</div></div></div></div>
	</div>
</section>

<section id="my-infos" class="col-xs-12">
	<div class="card-title col-xs-12">
		Mes espace personnel

	</div>
	<div class="row">
		<div class="col-xs-12"><div class="card"><div class="text">
			<div class="row">
				<div class="col-xs-12 col-sm-7 col-md-8">
					<div class="my-tournaments row">
						<div class="title col-xs-12">Mes inscriptions aux tournois</div>
						<div class="col-xs-12"><ul class="my-tournaments-list"></ul></div>
						<div class="col-xs-12"><div class="button" data-toggle="modal" data-target="#basicModal">Inscription à un tournoi<span class="plus">+</span></div></div>
					</div>
				</div>
				<div class="col-xs-12 col-sm-5 col-md-4">
					<div class="identity">
						<div class="id-title">Mes informations</div>
						<div class="username"></div>
						<div class="email"></div>	
						<div>
							<span class="firstname"></span>
							<span class="lastname"></span>
						</div>
					</div>
					<div class="button disconnect-button col-xs-12" onclick="disconnect()">Déconnexion</div>
				</div>
			</div>


			</div></div>
			</section>

		<div class="modal fade" id="basicModal" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
						<h4 class="modal-title" id="myModalLabel">Inscription à un tournoi</h4>
					</div>
					<div class="modal-body">
						<div>Choisissez un tournoi</div>
						<div class="achtung">Attention aux horaires</div>
						<div>
							<select name="list-games" id="list-games">
								<option value="null">- Veuillez choisir un jeu -</option>
							</select>
							<div class="button button-validate-add">Valider</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<?php 
include("fragments/footer.php");
		?>