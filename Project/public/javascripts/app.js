var app = angular.module('algo', []);
app.controller('Controller', function ($scope, $http) {
    $scope.number = 1;
    $scope.simulate = function () {
        $http({
            method: 'GET',
            url: '/sort?no=' + $scope.number
        }).then(function successCallback(response) {
            $scope.data = response;
        }, function errorCallback(response) {
            console.log('Error: ' + response);
        });
    }; 
});