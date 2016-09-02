(function() {
    var app = angular.module('maineDashboard', []);

    app.controller('InfoController', ['$scope', function($scope) {
        $scope.test = 'Hello World!';
    }]);
}());
