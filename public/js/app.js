(function() {
    var app = angular.module('maineDashboard', []);

    app.controller('InfoController', ['$scope', function($scope) {
        $scope.time = moment().format('hh:mm');
        $scope.date = moment().format('dddd MMMM Do, YYYY');
    }]);
}());
