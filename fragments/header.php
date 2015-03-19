<!doctype html>
<html>
	<head>
		<title>LCS 2.0</title>
		<link href="/style/bootstrap.min.css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link href='http://fonts.googleapis.com/css?family=Roboto:200,500,300italic,700,400,600' rel='stylesheet' type='text/css'>
		<script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
		<meta charset="UTF-8">
		<link rel="icon" type="image/png" href="/images/favicon.png">

		
		<link rel="stylesheet" href="style/style.css">
	</head>
	<body>

		<nav class="navbar navbar-inverse navbar-fixed-top">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="/"><img class="header-logo" src="/images/logo_small_white.png" alt=""></a>
				</div>
				<div id="navbar" class="collapse navbar-collapse navbar-right">
					<ul class="nav navbar-nav">
						<li class="<?= ($active==1) ? "active" : "" ?>"><a href="/">Accueil</a></li>
						<li class="<?= ($active==2) ? "active" : "" ?>"><a href="/mon-compte">Mon compte</a></li>
					</ul>
				</div><!--/.nav-collapse -->
			</div>
		</nav>

		<div class="container">

			<div class="main-template">