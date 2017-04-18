/**
 * Created by boneill on 12/15/16.
 */

(function() {
    'use strict';

    angular
        .module('app')
        .controller('InfoController', TaxController);

    function TaxController(Merchant, Lookup, UtilityService, $timeout) {
        var vm = this;

        //View Objects
        vm.location = {};
        vm.config = {};
        vm.store = {};
        vm.message = {};

        //View Lookup Values
        vm.states = [];
        vm.countries = [];
        vm.time_zones = [];
        vm.inactive_reasons = [];

        vm.updateLocation = updateLocation;
        vm.updateConfig = updateConfig;
        vm.updateMessages = updateMessages;

        loadMerchant();

        function loadMerchant(){
            Merchant.index('general_info').then(function(response) {
                //Lookup Values
                var lookup = response.data.lookup;

                vm.states = lookup.state;
                vm.countries = lookup.country;
                vm.time_zones = lookup.time_zone;
                vm.inactive_reasons = lookup.inactive_reason;

                //Merchant Data
                var merchant = response.data.merchant;

                vm.location.business_name = merchant.name;
                vm.location.display_name = merchant.display_name;

                vm.location.address1 = merchant.address1;
                vm.location.address2 = merchant.address2;
                vm.location.city = merchant.city;
                vm.location.state = merchant.state;
                vm.location.zip = merchant.zip;
                vm.location.country = merchant.country;

                vm.location.shop_email = merchant.address1;
                vm.location.phone_no = merchant.phone_no;
                vm.location.fax_no = merchant.fax_no;

                var time_zone_index = UtilityService.findIndexByKeyValue(vm.time_zones, 'type_id_value', merchant.time_zone);
                vm.location.time_zone = vm.time_zones[time_zone_index];

                //Configurations Data
                vm.config.advanced_ordering = Lookup.yesNoTrueFalseConversion(merchant.advanced_ordering);
                vm.config.delivery = Lookup.yesNoTrueFalseConversion(merchant.delivery);
                vm.config.immediate_message_delivery = Lookup.yesNoTrueFalseConversion(merchant.immediate_message_delivery);
                vm.config.active = Lookup.yesNoTrueFalseConversion(merchant.active);

                vm.config.inactive_reason = merchant.inactive_reason;

                vm.config.ordering_on = Lookup.yesNoTrueFalseConversion(merchant.ordering_on);

                vm.config.show_tip = Lookup.yesNoTrueFalseConversion(merchant.show_tip);

                vm.config.tip_minimum_percentage = parseInt(merchant.tip_minimum_percentage);
                vm.config.tip_minimum_trigger_amount = parseInt(merchant.tip_minimum_trigger_amount);
                vm.config.lead_time = merchant.lead_time;

                vm.config.group_ordering_on = Lookup.yesNoTrueFalseConversion(merchant.group_ordering_on);

                //Messages Data
                vm.store.custom_order_message = merchant.custom_order_message;
                vm.store.custom_menu_message = merchant.custom_menu_message;
            });
        }

        //Form Submit For Editing the Location
        function updateLocation() {
            vm.location.submit = true;

            if (vm.location_form.$valid) {
                vm.location.processing = true;
                Merchant.update('location',vm.location).then(function(response) {
                    vm.location.processing = false;
                    vm.location.success = true;
                    $timeout(resetForm, 3500);
                });
            }
        }

        function updateConfig() {
            vm.config.submit = true;

            if (vm.config_form.$valid) {
                vm.config.processing = true;
                Merchant.update('config',vm.config).then(function(response) {
                    vm.config.processing = false;
                    vm.config.success = true;
                    $timeout(resetForm, 3500);
                });
            }
        }

        function updateMessages() {
            vm.message.submit = true;

                if (vm.message_form.$valid) {
                    vm.message.processing = true;
                    Merchant.update('messages',vm.message).then(function(response) {
                        vm.message.processing = false;
                        vm.message.success = true;
                        $timeout(resetForm, 3500);
                    });
                }
            }

        function resetForm() {
            vm.location.success = false;
            vm.config.success = false;
            vm.message.success = false;
        }
    }
})();



//
// app.controller('MerchantInfoController', function($http, $scope, Merchant, Lookup, UtilityService) {
//
//
//
//     $scope.editMerchantInfo = function() {
//         $scope.submit = true;
//
//         if ($scope.merchant_info_form.$valid) {
//             $scope.edit_merchant_processing = true;
//             Merchant.editMerchantInfo($scope.generalInfo).then(function(response) {
//                 $scope.edit_merchant_processing = false;
//                 $scope.submit_success = true;
//             });
//         }
//     }
//
//
//
//     //Form Submit For Editing the Location
//     $scope.updateConfig = function() {
//         $scope.configs.submit = true;
//
//         if ($scope.configs_form.$valid) {
//             $scope.configs.processing = true;
//             Merchant.updateConfig($scope.configs).then(function(response) {
//                 $scope.configs.processing = false;
//                 $scope.configs.success = true;
//             });
//         }
//     }
//
//     //Form Submit For Editing the Store
//     $scope.updateStore = function() {
//         $scope.store.submit = true;
//
//         if ($scope.store_form.$valid) {
//             $scope.store.processing = true;
//             Merchant.updateMerchant($scope.store, 'store').then(function(response) {
//                 $scope.store.processing = false;
//                 $scope.store.success = true;
//             });
//         }
//     }
//
//     //Form Submit For Editing the Custom User Messages
//     $scope.updateMessages = function() {
//         $scope.message.submit = true;
//
//         if ($scope.message_form.$valid) {
//             $scope.message.processing = true;
//             Merchant.updateMerchant($scope.message, 'message').then(function(response) {
//                 $scope.message.processing = false;
//                 $scope.message.success = true;
//             });
//         }
//     }
// });