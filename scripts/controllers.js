app.controller('listController', ['$scope', '$location', 'shptService', function ($scope, $location, shptService) {
    $scope.artists = [];
    shptService.getArtists(function (data) {
		console.log("get");
        $scope.artists = data;
        $scope.$apply();
    });

    $scope.artistDetail = function (index) {
        $location.path('/artists/' + index);
    };

    $scope.artistAdd = function () {
        $location.path('/artists/add');
    };
}]);

queryApp.controller('conditionsGetController', ['$scope', '$location', 'queryService', function ($scope, $location, queryService) {
    $scope.conditions = [];
    queryService.getConditions(function (data) {
		console.log("get");
        $scope.groups = data;
		$scope.test = data.length;
        $scope.$apply();
    });
	
	$scope.test = function () {
        alert("test from controller");
    };
	
	$scope.addGroup = function () {
		queryService.addGroup();
    };
	
	$scope.deleteGroup = function(index) {
		queryService.deleteGroup(index);
	}
	
	$scope.addCondition = function (index) {
		queryService.addCondition(index);
    };
	
	$scope.deleteCondition = function(groupIndex, index) {
		queryService.deleteCondition(groupIndex, index);
	}
	/*
    $scope.artistDetail = function (index) {
        $location.path('/artists/' + index);
    };

    $scope.artistAdd = function () {
        $location.path('/artists/add');
    };
	*/
}]);

app.controller('addController', ['$scope', '$location', 'shptService', function ($scope, $location, shptService) {
    $scope.genres = [];
    shptService.getGenres(function (data) {
        $scope.genres = data;
        $scope.$apply();
    });

    $scope.save = function () {
        shptService.addArtist({
            artist: $scope.Item.artist,
            genre: $scope.Item.genre,
            rating: $scope.Item.rating
        }, function () {
            $location.path('/artists');
        });
    };

    $scope.cancel = function () {
        $location.path('#/artists');
    };
}]);

app.controller('editController', ['$scope', '$location', '$routeParams', 'shptService', function ($scope, $location, $routeParams, shptService) {
    $scope.genres = [];
    shptService.getGenres(function (data) {
        $scope.genres = data;
        $scope.$apply();
    });

    $scope.Item = null;
    shptService.getArtists(function (data) {
        $scope.Item = data[parseInt($routeParams.index)];
        $scope.$apply();
    });

    $scope.save = function () {
        shptService.updateArtist({
            id: $scope.Item.id,
            artist: $scope.Item.artist,
            genre: $scope.Item.genre,
            rating: $scope.Item.rating
        }, function () {
            $location.path('/artists');
        });
    };

    $scope.cancel = function () {
        $location.path('#/artists');
    };
}]);