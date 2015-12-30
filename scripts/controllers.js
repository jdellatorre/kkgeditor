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