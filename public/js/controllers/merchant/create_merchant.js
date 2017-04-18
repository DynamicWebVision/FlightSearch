/**
 * Created by boneill on 1/31/17.
 */
/**
 * Created by boneill on 12/15/16.
 */
app.controller('CreateMerchantController', function($http, $scope, $location, Lookup) {

    $scope.new_merchant = {};
    $scope.lookup = {};
    $scope.brands = [];
    $scope.merchant_exist_error = false;

    var lookups = ['state', 'country'];

    Lookup.multipleLookup(lookups).then(function(response) {
        $scope.lookup.states = response.data.state;
        $scope.lookup.countries = response.data.country;
    });

    //Get All Brands
    $http.get('/brands').success(function(response){
        $scope.brands = response;
    });

    $scope.create = function() {
        $scope.new_merchant.submit = true;
        if ($scope.new_merchant_form.$valid) {
            $scope.new_merchant.processing = true;
            $http.post('/create_merchant', $scope.new_merchant).success(function(response){
                $scope.new_merchant.processing = false;
                if (response == 1) {
                    $location='/merchant';
                }
                else {
                    $scope.merchant_exist_error = true;
                }
            });
        }
    }
});