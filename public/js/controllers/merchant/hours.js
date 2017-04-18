/**
 * Created by boneill on 12/15/16.
 */


(function() {
    'use strict';

    angular
        .module('app')
        .controller('HoursController', HoursController);

    function HoursController(Merchant, $timeout, UtilityService) {
        var vm = this;

        vm.hours = [];
        vm.holiday = {};
        vm.holiday_hours = [];
        vm.submit = false;

        vm.updateHours = updateHours;
        vm.updateHoliday = updateHoliday;
        vm.addCustomHolidayHours = addCustomHolidayHours;
        vm.decodeWeekday = decodeWeekday;
        vm.deleteHolidayHourDialog = deleteHolidayHourDialog;
        vm.confirmDeleteHolidayHour = confirmDeleteHolidayHour;

        vm.delete_holiday_hours_desc;
        var delete_holiday_hour;
        var delete_holiday_hour_index;

        vm.input_holidays = ['New Years', 'Easter', 'July 4th', 'Thanksgiving', 'Christmas', 'Other Date'];

        vm.edit_holiday_hours = {};
        load();

        function load() {
            Merchant.index("hours").then(function(response) {
                vm.holiday_hours = response.data.holiday_hours;

                vm.holiday = response.data.holiday;
                vm.holiday.newyearsday = openCloseDecode(vm.holiday.newyearsday);
                vm.holiday.easter = openCloseDecode(vm.holiday.easter);
                vm.holiday.fourthofjuly = openCloseDecode(vm.holiday.fourthofjuly);
                vm.holiday.thanksgiving = openCloseDecode(vm.holiday.thanksgiving);
                vm.holiday.christmas = openCloseDecode(vm.holiday.christmas);

                vm.hours = response.data.hours;
            });
        }

        function resetForm() {
            vm.hours.success = false;
            vm.holiday.success = false;
        }

        function updateHoliday() {
            vm.holiday.processing = true;

            var post_holiday = {};

            //Set the Holidays to "C" (Closed) or "O" (Open) for the DB column
            post_holiday.newyearsday = openCloseCOCode(vm.holiday.newyearsday);
            post_holiday.easter = openCloseCOCode(vm.holiday.easter);
            post_holiday.fourthofjuly = openCloseCOCode(vm.holiday.fourthofjuly);
            post_holiday.thanksgiving = openCloseCOCode(vm.holiday.thanksgiving);
            post_holiday.christmas = openCloseCOCode(vm.holiday.christmas);

            Merchant.update('holiday', post_holiday).then(function(response) {
                vm.holiday.processing = false;
                vm.holiday.success = true;
                $timeout(resetForm, 3500);
            });
        }

        function updateHours() {
            vm.hours.processing = true;

            Merchant.update('hours', {hours : vm.hours}).then(function(response) {
                vm.hours.processing = false;
                vm.hours.success = true;
                $timeout(resetForm, 3500);
            });
        }

        function addCustomHolidayHours() {
            var new_holiday_hours = {};

            new_holiday_hours.id = 'new';

            if (vm.edit_holiday_hours == 'Other Date') {
                new_holiday_hours.day = vm.edit_holiday_hours.other_day;
            }
            else {
                new_holiday_hours.day = vm.edit_holiday_hours.day;
            }

            new_holiday_hours.other_day = vm.edit_holiday_hours.other_day;

            new_holiday_hours.open = vm.edit_holiday_hours.open+" "+vm.edit_holiday_hours.open_am_pm;
            new_holiday_hours.close = vm.edit_holiday_hours.close+" "+vm.edit_holiday_hours.close_am_pm;


            Merchant.create('holiday_hours',new_holiday_hours).then(function(response) {
                vm.holiday_hours.push(new_holiday_hours);
                $("#add-custom-holiday-hours-modal").modal("toggle");
            });
        }

        function openCloseDecode(open_close) {
            if (open_close == 'o') {
                return true;
            }
            else {
                return false;
            }
        }

        function openCloseCOCode(open_close) {
            if (open_close) {
                return 'o';
            }
            else {
                return 'c';
            }
        }

        function decodeWeekday(idx) {
            return UtilityService.week_days[idx];
        }

        //Opens the Dialog to Delete Holiday Hours
        function deleteHolidayHourDialog(holiday_hour , indx) {
            delete_holiday_hour = holiday_hour;
            vm.delete_holiday_hours_desc = holiday_hour.day+" from "+holiday_hour.open+" to "+holiday_hour.close;
            delete_holiday_hour_index = indx;
        }

        //Confirmation of Deleting an Email
        function confirmDeleteHolidayHour() {
            Merchant.delete('holiday_hours',delete_holiday_hour.holiday_id).then(function(response) {
                vm.holiday_hours.splice(delete_holiday_hour_index, 1);
                $("#delete-holiday-hour-modal").modal('toggle');
            });
        }
    }
})();