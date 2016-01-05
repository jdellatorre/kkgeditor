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

var path = function(name, source, target, isLast) {
	return {
		name: name,
		source: source,
		target: target,
		isLast: isLast
	}
}

queryApp.controller('conditionsGetController', ['$scope', '$location', 'queryService', function ($scope, $location, queryService) {
    $scope.conditions = [];
	queryService.getSortings(function (data) {
        $scope.sortings = data;
        $scope.$apply();
    });
	
	queryService.getLists(function (data) {
        $scope.lists = data;
        $scope.$apply();
    });
	
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
	
	queryService.queryname = function () {
        return $scope.queryname;
    };
	
	$scope.paths = function () {
		var paths = [];

		var counter = 0;
		for(var i = 0; i < $scope.groups.length; i++) {
			if(i > 0) {
				var isLast = i == $scope.groups.length-1;
				paths.push(new path("path" + counter, "group" + (i-1), "group" + i, isLast));
				counter++;
			}
			
			var group = $scope.groups[i];
			
			for(var j = 0; j < group.conditions.length; j++) {			
				if(j > 0) {
					var isLast = j == group.conditions.length-1;
					paths.push(new path(
						"path" + counter,
						"group" + i + "condition" + (j-1),
						"group" + i + "condition" + j,
						isLast));
					counter++;
				}
			}
		}
		return paths;
	};
	
	$scope.drawPaths = function(){
		var paths = $scope.paths();
		
		setTimeout(function(){
			for(var i = 0; i < paths.length; i++) {
				var path = paths[i];
				connectElements($("#svgPaths"), $("#" + path.name), $("#" + path.source), $("#" + path.target));
			}
		}, 200);
	}
	
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