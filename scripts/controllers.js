app.controller('listController', ['$scope', '$location', 'shptService', function ($scope, $location, shptService) {
    $scope.artists = [];
    shptService.getArtists(function (data) {
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
        $scope.groups = data;
        $scope.$apply();
    });
	
	queryService.getFields(function (data) {
        $scope.fields = data;
        $scope.$apply();
    });
	
	queryService.getOperators(function (data) {
        $scope.operators = data;
        $scope.$apply();
    });
	
	$scope.count = function () {
        $scope.count = 5;
    };
	
	$scope.test = function () {
		var count = $scope.groups.length - 1;
		$($scope.groups).each(function(index, element) {
			if(element.conditions.length > 0) {
				count += element.conditions.length -1;
			}
		});
		return count;
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
	
	$scope.save = function () {
		queryService.save();
    };
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