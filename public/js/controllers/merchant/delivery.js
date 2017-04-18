
(function() {
    'use strict';

    angular
        .module('app')
        .controller('DeliveryController', DeliveryController);

    function DeliveryController(Merchant, $timeout, UtilityService, Lookup) {
        var vm = this;

        vm.delivery_info = {};
        vm.delivery_price_types;

        vm.delivery_zones = [];
        vm.new_delivery_zone = {};

        vm.editDeliveryInfo = editDeliveryInfo;
        vm.createDeliveryZone = createDeliveryZone;
        vm.shorten = shorten;
        vm.deleteDeliveryZoneDialog = deleteDeliveryZoneDialog;
        vm.confirmDeleteDeliveryZone = confirmDeleteDeliveryZone;
        vm.editDeliveryZoneDialog = editDeliveryZoneDialog;
        vm.editDeliveryZone = editDeliveryZone;
        vm.buttonActive = buttonActive;

        //Delete Delivery Zone Variables
        var delete_delivery_zone;
        vm.delete_delivery_zone_name;
        var delete_delivery_zone_index;

        //Edit Delivery Zone Variables
        vm.edit_delivery_zone = {};
        var edit_delivery_zone_index;
        vm.delivery_zone_update_success = false;

        vm.lookup = [];
        vm.lookup.delivery_area_defined_bys = [{
            id: 'driving',
            name: 'Driving Distance'
        },
        {
            id: 'polygon',
            name: 'Delivery Map'
        },
        {
            id: 'zip',
            name: 'Zip Codes'
        }];

        load();

        var resetForm = function () {
            vm.delivery_info.success = false;
        }

        function load() {
            Merchant.index('delivery').then(function (response) {
                vm.delivery_info = response.data.delivery_info;
                vm.delivery_info.minimum_order = parseFloat(response.data.delivery_info.minimum_order);
                vm.delivery_info.allow_asap_on_delivery = Lookup.yesNoTrueFalseConversion(response.data.delivery_info.allow_asap_on_delivery);

                vm.delivery_zones = response.data.delivery_zones;

                vm.delivery_price_types = response.data.lookup_values.delivery_price_type;
                vm.saved_delivery_zone = vm.delivery_info.delivery_price_type;
            });
        }

        function editDeliveryInfo() {
            vm.delivery_info.submit = true;
            if (vm.delivery_form.$valid) {
                vm.delivery_info.processing = true;
                Merchant.update('delivery_info', vm.delivery_info).then(function (response) {
                    vm.delivery_info.processing = false;
                    vm.delivery_info.success = true;
                    $timeout(resetForm, 3500);
                    vm.saved_delivery_zone = vm.delivery_info.delivery_price_type;
                });
            }
        }

        function createDeliveryZone() {
            Merchant.create('delivery_zone',vm.new_delivery_zone).then(function (response) {
                vm.delivery_zones.push(response.data);
                $("#create-delivery-zone-modal").modal('toggle');
            });
        }

        function shorten(val) {
            return UtilityService.shortenText(val, 20);
        }


        //Opens the Dialog to Delete Holiday Hours
        function deleteDeliveryZoneDialog(delivery_zone, index) {
            delete_delivery_zone = delivery_zone;
            vm.delete_delivery_zone_name = delivery_zone.name;
            delete_delivery_zone_index = index;
        }

        //Confirmation of Deleting Delivery Zone
        function confirmDeleteDeliveryZone() {
            Merchant.delete('delivery_zone', delete_delivery_zone.map_id).then(function (response) {
                vm.delivery_zones.splice(delete_delivery_zone_index, 1);
                $("#delete-delivery-zone-modal").modal('toggle');
            });
        }

        //Opens the Dialog to edit a Delivery Zone
        function editDeliveryZoneDialog(delivery_zone, index) {
            vm.edit_delivery_zone = delivery_zone;
            edit_delivery_zone_index = index;
        }

        //Update Delivery Zone
        function editDeliveryZone() {
            Merchant.update('delivery_zone',vm.edit_delivery_zone).then(function (response) {
                vm.delivery_zones[edit_delivery_zone_index] = vm.edit_delivery_zone;
                $("#edit-delivery-zone-modal").modal('toggle');
                vm.delivery_zone_update_success = true;
                $timeout(resetForm, 3500);
            });
        }

        function buttonActive(val) {
            if (val == vm.delivery_info.delivery_price_type) {
                return "btn-primary";
            }
            else {
                return "btn-default";
            }
        }
    }

})();