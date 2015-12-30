var app = angular.module('artistApp', ['ngRoute']).config(function ($routeProvider) {
    $routeProvider.when('/artists', {
        templateUrl: './views/view-list.html',
        controller: 'listController'
    }).when('/artists/add', {
        templateUrl: './views/view-detail.html',
        controller: 'addController'
    }).when('/artists/:index', {
        templateUrl: './views/view-detail.html',
        controller: 'editController'
    }).otherwise({
        redirectTo: '/artists'
    });
});

app.factory('shptService', ['$rootScope', '$http',
  function ($rootScope, $http) {
      var shptService = {};

      //artist operations
      var artists = null;
      shptService.getArtists = function (callback) {
          //check if we already have artists
          if (artists != null)
              callback(artists);
          else {
              //ensure form digest
              
          }
      };

      //add artist
      shptService.addArtist = function (artist, callback) {
          //ensure form digest
      
      };

      //update artist
      shptService.updateArtist = function (artist, callback) {
          //ensure form digest
          
      };

      //genre operations
      var genres = null;
      shptService.getGenres = function (callback) {
          //check if we already have genres
          if (genres != null)
              callback(genres);
          else {
              //ensure form digest
              
          }
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