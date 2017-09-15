(function() {
    var app = angular.module('maine-dashboard', []);

    app.controller('Main-Controller', ['$scope', function($scope) {
        $scope.date = moment().format('DD MMM YYYY');
        $scope.time = moment().format('HH:mm');
        $scope.schedule = [
            {
                "period":"1",
                "start time":"00:00",
                "end time": "00:00"
            },
            {
                "period":"2",
                "start time":"00:00",
                "end time": "00:00"
            },
            {
                "period":"3",
                "start time":"00:00",
                "end time": "00:00"
            },
            {
                "period":"4",
                "start time":"00:00",
                "end time": "00:00"
            },
            {
                "period":"5",
                "start time":"00:00",
                "end time": "00:00"
            },
            {
                "period":"6",
                "start time":"00:00",
                "end time": "00:00"
            }
        ];
    }]);
}());
