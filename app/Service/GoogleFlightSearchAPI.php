<?php namespace App\Service;

class GoogleFlightAPI  {

    public $originAirport;
    public $destinationAirport;

    public $departureDate;
    public $returnDate;

    public $passengerCount;

    public $apiKey;

    public function __construct()
    {
        $this->apiKey = env('GOOGLE_API_KEY', '');
    }

    public function roundTripSearch() {
       $url = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=".$this->apiKey;

       $post = ["request" => [
            "passengers" => [
                "adultCount" => $this->passengerCount
            ],
            "slice" => [
                [
                    "origin" => $this->originAirport,
                    "destination" => $this->destinationAirport,
                    "date" => $this->departureDate
                ],
                [
                    "origin" => $this->destinationAirport,
                    "destination" => $this->originAirport,
                    "date" => $this->returnDate
                ],
            ]
        ]];

        $post = json_encode($post);

        $curlConnection = curl_init();

        curl_setopt($curlConnection, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
        curl_setopt($curlConnection, CURLOPT_URL, $url);
        curl_setopt($curlConnection, CURLOPT_POST, TRUE);
        curl_setopt($curlConnection, CURLOPT_POSTFIELDS, $post);
        curl_setopt($curlConnection, CURLOPT_FOLLOWLOCATION, TRUE);
        curl_setopt($curlConnection, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curlConnection, CURLOPT_SSL_VERIFYPEER, FALSE);

        $results = curl_exec($curlConnection);

        $flights = json_decode($results);

        $trips = [];

        $firstPrice = $flights->trips->tripOption[0]->saleTotal;
        $firstPrice = str_replace("USD", "", $firstPrice);


        foreach ($flights->trips->tripOption as $trip) {

            $tripPrice = $trip->saleTotal;
            $tripPrice = str_replace("USD", "", $tripPrice);

            if (($tripPrice - $firstPrice) > 100) {
                break;
            }

            $farePrice = $tripPrice;

            //TO TRIP
            $toCarrier = $trip->pricing[0]->fare[0]->carrier;

            $toDepartureTime = $trip->slice[0]->segment[0]->leg[0]->departureTime;
            $toArrivalTime = end($trip->slice[0]->segment)->leg[0]->arrivalTime;

            $toLegs = [];

            foreach ($trip->slice[0]->segment as $segment) {
                $toLegs[] = [
                    'carrier' => $segment->flight->carrier,
                    'arrivalTime' => $segment->leg[0]->arrivalTime,
                    'departureTime' =>$segment->leg[0]->departureTime,
                    'origin' =>$segment->leg[0]->origin,
                    'destination' =>$segment->leg[0]->destination
                    ];
            }

            //RETURN TRIP
            $returnCarrier = $trip->pricing[0]->fare[0]->carrier;

            $returnDepartureTime = $trip->slice[1]->segment[0]->leg[0]->departureTime;
            $returnArrivalTime = end($trip->slice[1]->segment)->leg[0]->arrivalTime;


            $returnLegs = [];

            foreach ($trip->slice[1]->segment as $segment) {
                $returnLegs[] = [
                    'carrier' => $segment->flight->carrier,
                    'arrivalTime' => $segment->leg[0]->arrivalTime,
                    'departureTime' =>$segment->leg[0]->departureTime,
                    'origin' =>$segment->leg[0]->origin,
                    'destination' =>$segment->leg[0]->destination
                ];
            }

            $trips[] = [
              "farePrice" => $farePrice,
              "toCarrier" => $toCarrier,
              "toDepartureTime" => $toDepartureTime,
              "toArrivalTime" => $toArrivalTime,
              "toLegs" => $toLegs,
              "toLegCount" => sizeof($toLegs),
              "returnCarrier" => $returnCarrier,
              "returnDepartureTime" => $returnDepartureTime,
              "returnArrivalTime" => $returnArrivalTime,
              "returnLegs" => $returnLegs,
              "returnLegCount" => sizeof($returnLegs)
            ];

        }
        return $trips;
    }
}
