/**
 * Created by boneill on 12/15/16.
 */
app.controller('SearchResultsController', function($http, $scope, SearchResults, $location, UtilityService) {
    $scope.search_results = SearchResults;

    $scope.formatPhone = function(phone_no) {
        return UtilityService.formatPhone(phone_no);
    }

    $scope.viewMerchant =  function(merchant) {
        $http.post('/merchant/set_current', {merchant_id: merchant.merchant_id}).success(function(response){
            $location.path('general_info');
        });
    }
});