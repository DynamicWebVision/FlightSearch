
(function() {
    'use strict';

    angular
        .module('app')
        .controller('OrderingController', OrderingController);

    function OrderingController(Merchant, $timeout, UtilityService, Lookup) {
        var vm = this;

        vm.prep_time = {};
        vm.new_payment_group = {};

        vm.payment_groups = [];

        vm.delete_payment_group = {};
        var delete_payment_group_index;

        //Payment Lookup Values
        vm.payment_types = [];
        vm.billing_entities = [];

        //All Methods Used in the UI
        vm.updatePrepTime = updatePrepTime;
        vm.createPaymentGroup = createPaymentGroup;
        vm.deletePaymentGroup = deletePaymentGroup;
        vm.updatePayments = updatePayments;
        vm.deletePaymentGroupDialog = deletePaymentGroupDialog;
        vm.createSendOrder = createSendOrder;
        vm.deleteSendOrderDialog = deleteSendOrderDialog;
        vm.confirmDeleteSendOrder = confirmDeleteSendOrder;
        vm.editSendOrderDialog = editSendOrderDialog;
        vm.editSendOrder = editSendOrder;
        vm.createSendOrder = createSendOrder;
        vm.shortenBackend = shortenBackend;

        //Lead Time Form Status Variables
        vm.prep_time_submit = false;
        vm.update_prep_time_success = false;
        vm.edit_prep_time_processing = false;

        vm.payments_form_updated_success = false;


        //Order Receiving Stuff
        vm.send_orders = [];
        vm.new_send_order = {};
        vm.submit = false;

        //The URL used for all controller AJAX requests
        var url = 'order_receiving';

        //Delete Send Order Variables
        var delete_send_order;
        vm.delete_send_order_name;
        var delete_send_order_index;

        //Edit Send Order Variables
        vm.edit_send_order = {};
        var edit_send_order_index;
        vm.send_order_update_success = false;

        vm.message_types = [];

        vm.lookup = {};

        load();

        function resetForm() {
            vm.prep_time.success = false;
        }

        function load() {
            Merchant.index('ordering').then(function(response) {
                vm.prep_time = response.data.prep_time;
                vm.payment_types = response.data.payment_types;
                vm.billing_entities = response.data.billing_entities;
                vm.payment_groups = response.data.payment_groups;
                vm.send_orders = response.data.send_orders;

                vm.lookup.messages_types = response.data.messages_types;
                vm.lookup.message_formats = response.data.message_formats;
            });
        }

        function updatePrepTime() {
            vm.prep_time.submit = true;
            if (vm.prep_time_form.$valid) {
                vm.prep_time.processing = true;
                Merchant.update('prep_time',vm.prep_time).then(function(response) {
                    vm.prep_time.processing = false;
                    vm.prep_time.success = true;
                    $timeout(resetForm, 3500);
                });
            }
        }

        //Create New Payment Group
        function createPaymentGroup() {
            if (vm.new_payment_group_form.$valid) {
                Merchant.create('payment_group',vm.new_payment_group).then(function(response) {
                    vm.payment_groups.push(response.data.new_payment_group);
                    $("#add-payment-group-modal").modal("toggle");
                });
            }
        }

        //Confirmation of Deleting an Email
        function deletePaymentGroupDialog(payment_group, index) {
            vm.delete_payment_group = payment_group;
            delete_payment_group_index = index;
        }

        //Confirmation of Deleting a Payment Group
        function deletePaymentGroup() {
            Merchant.delete('payment_group', vm.delete_payment_group.id).then(function(response){
                vm.payment_groups.splice(delete_payment_group_index, 1);
                $("#delete-payment_group-modal").modal('toggle');
            });
        }

        //Update Payments
        function updatePayments() {
            Merchant.updateMerchant(vm.payment_groups, 'payments').then(function(response) {
                vm.payment_groups = response.data;
                vm.payments_form_updated_success = true;
                $timeout(resetForm, 3500);
            });
        }


        function createSendOrder() {
            Merchant.create(url,vm.new_send_order).then(function(response) {
                vm.send_orders.push(response.data);
                $("#add-send-order-modal").modal('toggle');
            });
        }


        //Opens the Dialog to Delete Send Order
        function deleteSendOrderDialog(send_order , index) {
            delete_send_order = send_order;
            vm.delete_send_order_desc = send_order.message_text;
            delete_send_order_index = index;
            console.log(vm.delete_send_order_desc);
        }

        //Confirmation of Deleting Delivery Zone
        function confirmDeleteSendOrder() {
            Merchant.delete(url, delete_send_order.map_id).then(function(response) {
                vm.send_orders.splice(delete_send_order_index, 1);
                $("#delete-send-order-modal").modal('toggle');
            });
        }

        //Opens the Dialog to edit a Delivery Zone
        function editSendOrderDialog(send_order , index) {
            vm.edit_send_order = send_order;
            edit_send_order_index = index;
        }

        //Update Order Receiving
        function editSendOrder() {
            Merchant.update('order_receiving', vm.edit_send_order).then(function(response) {
                //Edit Send Order Variables
                vm.send_orders[edit_send_order_index] = vm.edit_send_order;
                $("#edit-send-order-modal").modal('toggle');
            });
        }

        //Create Order Receiving
        function createSendOrder() {
            Merchant.create('order_receiving', vm.new_send_order).then(function(response) {
                //Edit Send Order Variables
                $("#add-send-order-modal").modal('toggle');
                vm.send_orders.push(response.data);
                vm.new_send_order = {};
            });
        }

        function shortenBackend(val) {
            return UtilityService.shortenTextBackend(val);
        }
    }
})();