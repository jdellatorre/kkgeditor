var app = angular.module('artistApp', ['ngRoute']).config(function ($routeProvider) {
    $routeProvider.when('/artists', {
        templateUrl: 'views/view-list.html',
        controller: 'listController'
    }).when('/artists/add', {
        templateUrl: 'views/view-detail.html',
        controller: 'addController'
    }).when('/artists/:index', {
        templateUrl: 'views/view-detail.html',
        controller: 'editController'
    }).otherwise({
        redirectTo: '/artists'
    });
});

var queryApp = angular.module('queryApp', ['ngRoute']).config(function ($routeProvider) {
    $routeProvider.when('/getConditions', {
        templateUrl: 'views/get-conditions.html',
        controller: 'conditionsGetController'
    }).otherwise({
        redirectTo: '/getConditions'
    });
});

var groupManager = function(groups) {
	return {
		groups: groups
	}
}

var group = function(title, conditions) {
	return {
		title: title,
		conditions: conditions
	}
}

var condition = function(name, operator, value) {
	return {
		fieldname: name,
		operator: operator,
		value: value
	}
}

var field = function(title, value) {
	return {
		title: title,
		value: value
	}
}

var operator = function(title, value) {
	return {
		title: title,
		value: value
	}
}

queryApp.factory('queryService', ['$rootScope', '$http',
  function ($rootScope, $http) {
    var queryService = {};

	var fields = [
		new field("F1", "Field1 value"),
		new field("F2", "Field2 value"),
		new field("F3", "Field3 value")
	];
	
	var operators = [
		new operator("contains", "contains"),
		new operator("begins with", "beginsWith"),
		new operator("equals", "equals")
	];
	
	var groups = [
		new group("group title1", [
			new condition("F1", "contains", "aaaa"),
			new condition("F3", "begins with", "bbbbb")
		]),
		new group("group title2", [
			new condition("F2", "equals", "cccc")
		])
	];
	
	queryService.getFields = function (callback) {
		callback($rootScope.data = fields);
	};
	
	queryService.getOperators = function (callback) {
		callback($rootScope.data = operators);
	};
		  
      //artist operations
	queryService.getConditions = function (callback) {
		callback($rootScope.data = groups);
	};
	
	$rootScope.alert = function(){
	  alert('alerted!');
	};
	
	$rootScope.count = function(){
	  return 4;
	};
	
	//add artist
    queryService.addCondition = function(index) {
          groups[index].conditions.push(
				new condition("Field1", "contains", "condition to modify")
			);
			connectAll();
      };
	  
	//add artist
    queryService.addGroup = function() {
          groups.push(
				new group("group to modify", [
					new condition("Field1", "contains", "cccc")
				])
			);
      };
	  
	queryService.deleteGroup = function(index) {
		groups.splice(index, 1);
		connectAll();
    };
	  
	 queryService.deleteCondition = function(groupIndex, index) {
			groups[groupIndex].conditions.splice(index, 1);
			connectAll();
      };
	  
	queryService.save = function() {
		var json = JSON.stringify(groups);
		console.log(json);
	};
	  
	  return queryService;
	}
	
]);

app.factory('shptService', ['$rootScope', '$http',
  function ($rootScope, $http) {
      var shptService = {};

      //artist operations
      var artists = null;
      shptService.getArtists = function (callback) {
          //check if we already have artists
		  //ensure form digest
			
              callback($rootScope.data = [{
				artist: "test",
				genre: "Pop",
				rating: 4
			  },
			  {
				artist: "test22",
				genre: "Pop",
				rating: 4
			  }]);
      };

      //add artist
      shptService.addArtist = function (artist, callback) {
          //ensure form digest
      };

      //update artist
      shptService.updateArtist = function (artist, callback) {
          //e
      };

      //genre operations
      var genres = null;
      shptService.getGenres = function (callback) {
           console.log('genres');
		   
      };

      return shptService;
  }]);

app.directive('starRating', function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directive-rating.html',
        link: function (scope) {
            scope.$watch('starRating', function () {
                scope.stars = [];
                var starRating = scope.starRating;
                for (var i = 0; i < 5; i++) {
                    scope.stars.push({
                        empty: i >= starRating,
                        index: i + 1
                    });
                }
            });
        },
        scope: {
            starRating: '='
        }
    };
});