/**
 * Created by boneill on 12/15/16.
 */
app.controller('HomeController', function($http, $scope, Merchant, UtilityService, $location) {

    $scope.search_text = "";

    $scope.search_processing = false;
    $scope.search_submit = false;

    $scope.initial_search = false;
    $scope.result_merchants = [];
    $scope.processing = false;

    $scope.order_search_text = '';

    var active_letter;

    $scope.merchantSearch = function() {
        $scope.search_submit = true;
        $scope.result_merchants = [];

        if ($scope.search_form.$valid) {
            $scope.initial_search = true;
            $scope.processing = true;
            active_letter = '';
            $http.post('/merchant_search', {search_text: $scope.search_text}).success(function(response){
                $scope.result_merchants = response;
                $scope.processing = false;
                $scope.search_submit = false;
            });
        }
    }

    $scope.orderSearch = function() {
        $scope.search_submit = true;
        $scope.result_merchants = [];

        if ($scope.search_form.$valid) {
            $scope.initial_search = true;
            $scope.processing = true;
            active_letter = '';
            $http.post('/merchant_search', {search_text: $scope.search_text}).success(function(response){
                $scope.result_merchants = response;
                $scope.processing = false;
                $scope.search_submit = false;
            });
        }
    }

    $scope.merchantLetter = function(letter) {
        $scope.search_text = "";
        if (active_letter != letter) {
            active_letter = letter;
            $scope.result_merchants = [];
            $scope.processing = true;
            $scope.initial_search = true;
            $http.post('/merchant/first_letter_filter', {letter: letter}).success(function(response){
                $scope.result_merchants = response;
                $scope.processing = false;
            });
        }

    }

    $scope.viewMerchant =  function(merchant) {
        $http.post('/merchant/set_current', {merchant_id: merchant.merchant_id}).success(function(response){
            window.location='merchant';
        });
    }

    $scope.formatPhone = function(phone_no) {
        return UtilityService.formatPhone(phone_no);
    }

    //
    $scope.currentLetter = function(letter) {
        if (letter == active_letter) {
            return "alphabet-active";
        }
        else {
            return "alphabet";
        }
    }

    $scope.createMerchant = function() {
        $location.path('create_new_merchant');
    }
});