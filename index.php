<?php 

$active = 1;
include("fragments/header.php");
?>
			<script src="/scripts/home.js"></script>
				<section class="col-xs-12">
					<div id="presentation" class="card col-xs-12">
						<img class="ban" src="/images/event_ban.png" alt="">
						<div class="text col-xs-12">
							<div class="col-xs-12">
								<div class="title col-xs-9"></div>
								<a href="mon-compte.php" class="button col-xs-3">S'inscrire</a>
							</div>
							<div class="description col-xs-12"></div>
							<div class="infos">
								<div class="col-xs-12 col-md-6"><div class="when"></div></div>
								<div class="col-xs-12 col-md-6"><div class="where"></div></div>
							</div>
						</div>
					</div>
				</section>
				<section class="col-xs-12">
					<div class="card-title col-xs-12">
						Tournois / Concours
					</div>
					<div class="row" id="tournaments">

					</div>
				</section>

				<section class="col-xs-12">
					<div class="card-title col-xs-12">
						Jeux en libre accès
					</div>
					<div class="row" id="self-service">

					</div>
				</section>

				<div class="modal fade" id="basicModal" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
								<h4 class="modal-title" id="myModalLabel"></h4>
							</div>
							<div class="modal-body">

							</div>
						</div>
					</div>
				</div>
<?php 
include("fragments/footer.php");
?>