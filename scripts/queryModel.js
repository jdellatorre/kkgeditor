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

app.factory('shptService', ['$rootScope', '$http',
  function ($rootScope, $http) {
      var shptService = {};

      //utility function to get parameter from query string
      shptService.getQueryStringParameter = function (urlParameterKey) {
          var params = document.URL.split('?')[1].split('&');
          var strParams = '';
          for (var i = 0; i < params.length; i = i + 1) {
              var singleParam = params[i].split('=');
              if (singleParam[0] == urlParameterKey)
                  return singleParam[1];
          }
      }
      shptService.appWebUrl = decodeURIComponent(shptService.getQueryStringParameter('SPAppWebUrl')).split('#')[0];
      shptService.hostWebUrl = decodeURIComponent(shptService.getQueryStringParameter('SPHostUrl')).split('#')[0];

      //form digest opertions since we aren't using SharePoint MasterPage
      var formDigest = null;
      shptService.ensureFormDigest = function (callback) {
          if (formDigest != null)
              callback(formDigest);
          else {
              $http.post(shptService.appWebUrl + '/_api/contextinfo?$select=FormDigestValue', {}, {
                  headers: {
                      'Accept': 'application/json; odata=verbose',
                      'Content-Type': 'application/json; odata=verbose'
                  }
              }).success(function (d) {
                  formDigest = d.d.GetContextWebInformation.FormDigestValue;
                  callback(formDigest);
              }).error(function (er) {
                  alert('Error getting form digest value');
              });
          }
      };


      //artist operations
      var artists = null;
      shptService.getArtists = function (callback) {
          //check if we already have artists
          if (artists != null)
              callback(artists);
          else {
              //ensure form digest
              shptService.ensureFormDigest(function (fDigest) {
                  //perform GET for all artists
                  $http({
                      method: 'GET',
                      url: shptService.appWebUrl + '/_api/web/Lists/getbytitle(\'Artists\')/Items?select=Title,Genre,Rating',
                      headers: {
                          'Accept': 'application/json; odata=verbose'
                      }
                  }).success(function (d) {
                      artists = [];
                      $(d.d.results).each(function (i, e) {
                          artists.push({
                              id: e['Id'],
                              artist: e['Title'],
                              genre: e['Genre'],
                              rating: e['AverageRating']
                          });
                      });
                      callback(artists);
                  }).error(function (er) {
                      alert(er);
                  });
              });
          }
      };

      //add artist
      shptService.addArtist = function (artist, callback) {
          //ensure form digest
          shptService.ensureFormDigest(function (fDigest) {
              $http.post(
                  shptService.appWebUrl + '/_api/web/Lists/getbytitle(\'Artists\')/items',
                  { 'Title': artist.artist, 'Genre': artist.genre, 'AverageRating': artist.rating },
                  {
                  headers: {
                      'Accept': 'application/json; odata=verbose',
                      'X-RequestDigest': fDigest
                  }
                  }).success(function (d) {
                      artist.id = d.d.ID;
                      artists.push(artist);
                      callback();
                  }).error(function (er) {
                      alert(er);
                  });
          });
      };

      //update artist
      shptService.updateArtist = function (artist, callback) {
          //ensure form digest
          shptService.ensureFormDigest(function (fDigest) {
              $http.post(
                  shptService.appWebUrl + '/_api/web/Lists/getbytitle(\'Artists\')/items(' + artist.id + ')',
                  { 'Title': artist.artist, 'Genre': artist.genre, 'AverageRating': artist.rating },
                  {
                      headers: {
                          'Accept': 'application/json; odata=verbose',
                          'X-RequestDigest': fDigest,
                          'X-HTTP-Method': 'MERGE',
                          'IF-MATCH': '*'
                      }
                  }).success(function (d) {
                      callback();
                  }).error(function (er) {
                      alert(er);
                  });
          });
      };

      //genre operations
      var genres = null;
      shptService.getGenres = function (callback) {
          //check if we already have genres
          if (genres != null)
              callback(genres);
          else {
              //ensure form digest
              shptService.ensureFormDigest(function (fDigest) {
                  //perform GET for all genres
                  $http({
                      method: 'GET',
                      url: shptService.appWebUrl + '/_api/web/Lists/getbytitle(\'Genres\')/Items?select=Title',
                      headers: {
                          'Accept': 'application/json; odata=verbose'
                      }
                  }).success(function (d) {
                      genres = [];
                      $(d.d.results).each(function (i, e) {
                          genres.push({
                              genre: e['Title']
                          });
                      });
                      callback(genres)
                  }).error(function (er) {
                      alert(er);
                  });
              });
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