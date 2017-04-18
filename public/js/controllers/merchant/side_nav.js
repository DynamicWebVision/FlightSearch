/**
 * Created by boneill on 12/15/16.
 */
app.controller('SideNavController', function($scope, $location, $http) {
    $scope.parentLink = function(url) {
        $location.path('/'+url);
    }

    $scope.current_merchant_id = '';
});