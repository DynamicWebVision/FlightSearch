<?php namespace App\Http\Controllers;

use \App\Model\Flight;
use \App\Model\FlightLeg;
use App\Model\Trip;
use Request;
use \App\Service\GoogleFlightAPI;
use \App\Service\Utility;
use Illuminate\Support\Facades\Log;

class FlightController extends Controller {

    public $flightId;
    public $tripId;

    public $departureAirport;
    public $destinationAirport;

    public $departureDate;
    public $returnDate;

    public function __construct()
    {
        $this->utility = new Utility();
    }

    public function processTwoFlights() {
        Log::info("START: Process Ten Flights");

        $trips = Trip::orderBy('last_processed')
            ->take(2)
            ->get();

        foreach ($trips as $trip) {
            $this->departureAirport = $trip->origin;
            $this->destinationAirport = $trip->destination;

            $this->departureDate = $trip->departure_date;
            $this->returnDate = $trip->return_date;

            $this->tripId = $trip->id;

            $this->flightSearch();
        }

        Log::info("END: Process Ten Flights");
    }

    public function flightSearch() {
        $googleFlightAPI = new GoogleFlightAPI();

        $googleFlightAPI->passengerCount = 1;

        $googleFlightAPI->originAirport = $this->departureAirport;
        $googleFlightAPI->departureDate = $this->departureDate;

        $googleFlightAPI->destinationAirport = $this->destinationAirport;
        $googleFlightAPI->returnDate = $this->returnDate;

        $trips = $googleFlightAPI->roundTripSearch();

        $lowestTrip = $trips[0];

        //Update Trip
        $updateTrip = Trip::find($this->tripId);

        $updateTrip->lowest_price = $lowestTrip['farePrice'];

        $updateTrip->last_processed = time();

        $updateTrip->save();

        foreach ($trips as $trip) {
            $flight = new Flight();

            $flight->trip_cost = $trip['farePrice'];

            $flight->trip_id = $this->tripId;

            $flight->to_carrier = $trip['toCarrier'];
            $flight->return_carrier = $trip['returnCarrier'];

            //to
            $flight->to_google_departure_time = $trip['toDepartureTime'];
            $flight->to_unix_departure_time = strtotime($trip['toDepartureTime']);

            $flight->to_unix_arrival_time = strtotime($trip['toArrivalTime']);
            $flight->to_google_arrival_time = $trip['toArrivalTime'];

            //return
            $flight->return_google_departure_time = $trip['returnDepartureTime'];
            $flight->return_unix_arrival_time = strtotime($trip['returnDepartureTime']);

            $flight->return_google_arrival_time = $trip['returnArrivalTime'];
            $flight->return_unix_departure_time = strtotime($trip['returnArrivalTime']);

            $flight->save();

            $flightId = $flight->id;

            foreach ($trip['toLegs'] as $leg) {
                $flightLeg = new FlightLeg();

                $flightLeg->flight_id = $flightId;

                $flightLeg->trip_type = 1;

                $flightLeg->origin = $leg['origin'];

                $flightLeg->destination = $leg['destination'];

                $flightLeg->carrier = $leg['carrier'];

                $flightLeg->arrival_time_unix = strtotime($leg['arrivalTime']);
                $flightLeg->arrival_time_google_format = $leg['arrivalTime'];

                $flightLeg->departure_time_unix = strtotime($leg['departureTime']);
                $flightLeg->departure_time_google_format = $leg['departureTime'];

                $flightLeg->save();
            }


            foreach ($trip['returnLegs'] as $leg) {
                $flightLeg = new FlightLeg();

                $flightLeg->flight_id = $flightId;

                $flightLeg->trip_type = 2;

                $flightLeg->origin = $leg['origin'];

                $flightLeg->destination = $leg['destination'];

                $flightLeg->carrier = $leg['carrier'];

                $flightLeg->arrival_time_unix = strtotime($leg['arrivalTime']);
                $flightLeg->arrival_time_google_format = $leg['arrivalTime'];

                $flightLeg->departure_time_unix = strtotime($leg['departureTime']);
                $flightLeg->departure_time_google_format = $leg['departureTime'];

                $flightLeg->save();
            }

        }

    }

    public function flightOptions() {

        $firstWednesday = strtotime("next wednesday + 4 weeks");

        $firstWednesday = date('Y-m-d', $firstWednesday);

        $daysOfTrip = 5;

        $weekSearch = 10;
        $weekCurrent = 1;

        $tripDates = [];

        while ($weekCurrent <= $weekSearch) {
            $currentWednesday = date('Y-m-d', strtotime($firstWednesday. ' + '.$weekCurrent.' weeks'));

            $currentDay = 0;
            $dayCutOff = 3;

            while ($currentDay <= $dayCutOff) {
                $returnDays = $currentDay + $daysOfTrip;
                $departDate = date('Y-m-d', strtotime($currentWednesday. ' + '.$currentDay.' days'));
                $returnDate = date('Y-m-d', strtotime($currentWednesday. ' + '.$returnDays.' days'));

                $tripDates[] = [
                  "departureDate" => $departDate,
                  "returnDate"=> $returnDate,
                ];

                $currentDay++;
            }

            $weekCurrent++;
        }

        foreach ($tripDates as $tripSet) {
            $trip = new Trip();

            $trip->origin = 'IAH';
            $trip->destination = 'TVC';
            $trip->departure_date = $tripSet['departureDate'];
            $trip->return_date = $tripSet['returnDate'];

            $trip->save();
        }
    }

    public function processFlights() {
        $trips = Trip::where('last_processed', '=', 0)->get();

        foreach($trips as $trip) {
            $this->tripId = $trip->id;

            $this->flightSearch($trip->departure_date, $trip->return_date);
        }
    }

}