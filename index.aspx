<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" data-ng-app="artistApp">

    <head>
        <title>Artist Catalog</title>
		
		
		<script type="text/javascript" src="./libs/jquery-1.11.3.min.js"></script>
		<script>
			$(document).bind('mobileinit',function(){
				$.mobile.changePage.defaults.changeHash = false;
				$.mobile.hashListeningEnabled = false;
				$.mobile.pushStateEnabled = false;
			});
		</script> 
		
		<script type="text/javascript" src="./libs/bootstrap.min.js"></script>
		<script type="text/javascript" src="./libs/angular.min.js"></script>
		<script type="text/javascript" src="./libs/angular-route.js"></script>
		
		
	
		
		<script type="text/javascript" src="./scripts/App.js"></script>
        <script type="text/javascript" src="./scripts/Controllers.js"></script>
		
        <link href="./css/bootstrap.min.css" rel="stylesheet" />
    </head>
	
    <body>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h1><span class="glyphicon glyphicon-volume-up"></span> Artist Catalog</h1>
                </div>
            </div>
            <div data-ng-view></div>
        </div>
    </body>
</html>