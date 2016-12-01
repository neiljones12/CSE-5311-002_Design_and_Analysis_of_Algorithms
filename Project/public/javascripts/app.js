var app = angular.module('algo', ['zingchart-angularjs']);

app.controller('Controller', function ($scope, $http) {
    $scope.number = 10;
    $scope.numbers = '';
    $scope.merge = 0;
    $scope.quick = 0;
    $scope.heap = 0;
    $scope.insertion = 0;
    $scope.radix = 0;

    $scope.myJson = {
        type: 'line',
        series: [
          { values: [0, $scope.merge] },
          { values: [0, $scope.quick] },
          { values: [0, $scope.heap] },
          { values: [0, $scope.insertion] },
          { values: [0, $scope.radix] }
        ]
    };

    $scope.simulate = function () {
        $http({
            method: 'GET',
            url: '/sort?no=' + $scope.number
        }).then(function successCallback(response) {

            console.log(response);
            $scope.numbers = response.data.numbers;
            var data = response.data;
            $scope.merge = data.time[0];
            $scope.quick = data.time[1];
            $scope.heap = data.time[2];
            $scope.insertion = data.time[3];
            $scope.radix = data.time[4];

            $scope.output = [
                { name: 'Merge', value: $scope.merge, colour: 'list-group-item list-group-item-action list-group-item-info' , style:''},
                { name: 'Quick', value: $scope.quick, colour: 'list-group-item list-group-item-action list-group-item-danger', style: '' },
                { name: 'Heap', value: $scope.heap, colour: 'list-group-item list-group-item-action list-group-item-success', style: '' },
                { name: 'Insertion', value: $scope.insertion, colour: 'list-group-item list-group-item-action list-group-item-warning', style: '' },
                { name: 'Radix', value: $scope.radix, colour: 'list-group-item list-group-item-action list-group-item-info', style: 'background-color:#9B59B6;color:white' }
            ]

            $scope.output.sort(function (a, b) {
                return a.value - b.value;
            });
            //$scope.merge = 10;
            //$scope.quick = 20;
            //$scope.heap = 30;
            //$scope.insertion = 40;
            //$scope.radix = 50;

            $scope.myJson = {
                type: 'line',
                series: [
                  { values: [0, $scope.merge] },
                  { values: [0, $scope.quick] },
                  { values: [0, $scope.heap] },
                  { values: [0, $scope.insertion] },
                  { values: [0, $scope.radix] }
                ]
            };

        }, function errorCallback(response) {
            console.log('Error: ' + response);
        });
    };
});