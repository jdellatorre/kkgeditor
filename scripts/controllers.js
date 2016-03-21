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

queryApp.controller('listsGetController', ['$scope', '$location', 'queryService', '$timeout', function ($scope, $location, queryService, $timeout) {
	$scope.lists = [];
	
	queryService.getLists(function (data) {
        $scope.lists = data;
		$timeout(function() {
			$scope.$apply();
		});
    });
	
	$scope.save = function () {
		queryService.save();
    };
}]);

queryApp.controller('sortingsGetController', ['$scope', '$location', 'queryService', '$timeout', function ($scope, $location, queryService, $timeout) {
	$scope.sortings = [];
	
	queryService.getSortings(function (data) {
        $scope.sortings = data;
		$timeout(function() {
			$scope.$apply();
		});
    });
	
	queryService.getFields(function (data) {
        $scope.fields = data;
		$timeout(function() {
			$scope.$apply();
		});
    });
	
	$scope.save = function () {
		queryService.save();
    };
}]);

queryApp.controller('viewFieldsGetController', ['$scope', '$location', 'queryService', '$timeout', function ($scope, $location, queryService, $timeout) {
	$scope.viewFields = [];

	queryService.getViewFields(function (data) {
        $scope.viewFields = data;
		$timeout(function() {
			$scope.$apply();
		});
    });
	
	$scope.save = function () {
		queryService.save();
    };
}]);

queryApp.controller('previewGetController', ['$scope', '$location', 'queryService', function ($scope, $location, queryService) {
	
	$scope.save = function () {
		queryService.save();
    };
}]);

queryApp.controller('conditionsGetController', ['$scope', '$location', 'queryService', '$timeout' , function ($scope, $location, queryService, $timeout) {
    $scope.conditions = [];
	$scope.groups = [];
	$scope.fields = [];
	$scope.operators = [];
	
    queryService.getConditions(function (data) {
        $scope.groups = data;
		$timeout(function() {
			$scope.$apply();
		});
    });
	
	queryService.getFields(function (data) {
        $scope.fields = data;
		$timeout(function() {
			$scope.$apply();
		});
    });
	
	queryService.getOperators(function (data) {
        $scope.operators = data;
		$timeout(function() {
			$scope.$apply();
		});
    });
	
	var paths = [];
	
	$scope.paths = function () {
		var counter = 0;
		
		for(var i = 0; i < $scope.groups.length; i++) {
			
			if(i > 0) {
				var isLast = i == $scope.groups.length-1;
				
				var found = false;
				var pathTemp = new path("path" + counter, "group" + (i-1), "group" + i, isLast)
				
				// check here to see if we have added the item already.
				for(var p = 0; p < paths.length; p++) {
					var pathCurrent = paths[p];
					
					if (pathCurrent.name === pathTemp.name &&
						pathCurrent.source === pathTemp.source &&
						pathCurrent.target === pathTemp.target) {
						found = true;
						break;
					}
				}
				
				if(!found) {
					paths.push(pathTemp);
				}
				counter++;
			}
			
			var group = $scope.groups[i];
			
			for(var j = 0; j < group.conditions.length; j++) {			
				if(j > 0) {
					var isLast = j == group.conditions.length-1;
					
					var found = false;
					var pathTemp = new path(
							"path" + counter,
							"group" + i + "condition" + (j-1),
							"group" + i + "condition" + j,
							isLast);
					
					// check here to see if we have added the item already.
					for(var p = 0; p < paths.length; p++) {
						var pathCurrent = paths[p];
						
						if (pathCurrent.name === pathTemp.name &&
							pathCurrent.source === pathTemp.source &&
							pathCurrent.target === pathTemp.target) {
							found = true;
							break;
						}
					}
					
					if(!found) {
						paths.push(pathTemp)
					}
					
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
}]);

app.controller('addController', ['$scope', '$location', 'shptService', function ($scope, $location, shptService) {
    $scope.genres = [];
    shptService.getGenres(function (data) {
        $scope.genres = data;
        //$scope.$apply();
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
        //$scope.$apply();
    });

    $scope.Item = null;
    shptService.getArtists(function (data) {
        $scope.Item = data[parseInt($routeParams.index)];
        //$scope.$apply();
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