<?php namespace App\Service;

class TravelDates  {

    public $startWindow;
    public $endWindow;

    public $dates = [];

    public function __construct($start, $end)
    {
        $this->startWindow = date('Y-m-d', strtotime(' -1 day',strtotime($start)));
        $this->endWindow = date('Y-m-d', strtotime($end));
    }

    public function threeDayWeekends() {

        $currentDate = date('Y-m-d', strtotime('last Thursday', strtotime($this->startWindow)));

        while ($currentDate < $this->endWindow) {
            $fridayDate = date('Y-m-d', strtotime('next Friday', strtotime($currentDate)));
            $saturdayDate = date('Y-m-d', strtotime('next Saturday', strtotime($currentDate)));
            $sundayDate = date('Y-m-d', strtotime('next Sunday', strtotime($currentDate)));
            $mondayDate = date('Y-m-d', strtotime('next Monday', strtotime($currentDate)));

            $this->dates[] = [
              'departureDate'=>  $fridayDate,
              'returnDate'=>  $sundayDate,
            ];

            $this->dates[] = [
              'departureDate'=>  $saturdayDate,
              'returnDate'=>  $mondayDate,
            ];

            $currentDate = date('Y-m-d', strtotime(' +1 day',strtotime($mondayDate)));
        }
        return $this->dates;
    }

    public function fourDayWeekends() {

        $currentDate = date('Y-m-d', strtotime('last Wednesday', strtotime($this->startWindow)));

        while ($currentDate < $this->endWindow) {
            $thursdayDate = date('Y-m-d', strtotime('next Thursday', strtotime($currentDate)));
            $fridayDate = date('Y-m-d', strtotime('next Friday', strtotime($currentDate)));
            $saturdayDate = date('Y-m-d', strtotime('next Saturday', strtotime($currentDate)));
            $sundayDate = date('Y-m-d', strtotime('next Sunday', strtotime($currentDate)));
            $mondayDate = date('Y-m-d', strtotime('next Monday', strtotime($currentDate)));
            $tuesdayDate = date('Y-m-d', strtotime('next Tuesday', strtotime($currentDate)));

            $this->dates[] = [
              'departureDate'=>  $thursdayDate,
              'returnDate'=>  $sundayDate,
            ];

            $this->dates[] = [
              'departureDate'=>  $fridayDate,
              'returnDate'=>  $mondayDate,
            ];

            $this->dates[] = [
              'departureDate'=>  $saturdayDate,
              'returnDate'=>  $tuesdayDate,
            ];

            $currentDate = date('Y-m-d', strtotime(' +1 day',strtotime($mondayDate)));
        }
        return $this->dates;
    }

    public function fiveDayWeekends() {

        $currentDate = date('Y-m-d', strtotime('last Tuesday', strtotime($this->startWindow)));

        while ($currentDate < $this->endWindow) {

            $firstWednesdayDate = date('Y-m-d', strtotime('next Wednesday', strtotime($currentDate)));
            $currentDate = date('Y-m-d', strtotime(' +1 day',strtotime($currentDate)));

            $thursdayDate = date('Y-m-d', strtotime('next Thursday', strtotime($currentDate)));
            $fridayDate = date('Y-m-d', strtotime('next Friday', strtotime($currentDate)));
            $saturdayDate = date('Y-m-d', strtotime('next Saturday', strtotime($currentDate)));
            $sundayDate = date('Y-m-d', strtotime('next Sunday', strtotime($currentDate)));
            $mondayDate = date('Y-m-d', strtotime('next Monday', strtotime($currentDate)));
            $tuesdayDate = date('Y-m-d', strtotime('next Tuesday', strtotime($currentDate)));

            $secondWednesdayDate = date('Y-m-d', strtotime('next Wednesday', strtotime($currentDate)));

            $this->dates[] = [
              'departureDate'=>  $firstWednesdayDate,
              'returnDate'=>  $sundayDate,
            ];

            $this->dates[] = [
              'departureDate'=>  $thursdayDate,
              'returnDate'=>  $mondayDate,
            ];

            $this->dates[] = [
              'departureDate'=>  $fridayDate,
              'returnDate'=>  $tuesdayDate,
            ];

            $this->dates[] = [
              'departureDate'=>  $saturdayDate,
              'returnDate'=>  $secondWednesdayDate,
            ];

            $currentDate = date('Y-m-d', strtotime(' +1 day',strtotime($mondayDate)));
        }
        return $this->dates;
    }

    public function weekendToWeekend() {

        $currentDate = date('Y-m-d', strtotime('last Tuesday', strtotime($this->startWindow)));

        while ($currentDate < $this->endWindow) {

            $firstWednesdayDate = date('Y-m-d', strtotime('next Wednesday', strtotime($currentDate)));
            $currentDate = date('Y-m-d', strtotime(' +1 day',strtotime($currentDate)));

            $thursdayDate = date('Y-m-d', strtotime('next Thursday', strtotime($currentDate)));
            $fridayDate = date('Y-m-d', strtotime('next Friday', strtotime($currentDate)));
            $saturdayDate = date('Y-m-d', strtotime('next Saturday', strtotime($currentDate)));
            $sundayDate = date('Y-m-d', strtotime('next Sunday', strtotime($currentDate)));
            $mondayDate = date('Y-m-d', strtotime('next Monday', strtotime($currentDate)));
            $tuesdayDate = date('Y-m-d', strtotime('next Tuesday', strtotime($currentDate)));

            $secondWednesdayDate = date('Y-m-d', strtotime('next Wednesday', strtotime($currentDate)));

            $this->dates[] = [
              'departureDate'=>  $firstWednesdayDate,
              'returnDate'=>  $sundayDate,
            ];

            $this->dates[] = [
              'departureDate'=>  $thursdayDate,
              'returnDate'=>  $mondayDate,
            ];

            $this->dates[] = [
              'departureDate'=>  $fridayDate,
              'returnDate'=>  $tuesdayDate,
            ];

            $this->dates[] = [
              'departureDate'=>  $saturdayDate,
              'returnDate'=>  $secondWednesdayDate,
            ];

            $currentDate = date('Y-m-d', strtotime(' +1 day',strtotime($mondayDate)));
        }
        return $this->dates;
    }
}
