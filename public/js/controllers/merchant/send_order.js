/**
 * Created by boneill on 12/15/16.
 */
app.controller('MerchantSendOrderController', function($scope, Merchant, Lookup, UtilityService) {

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

    var lookups = ['message_type', 'message_template'];
    vm.lookup = {};


});