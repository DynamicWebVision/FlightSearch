<?php namespace App\Http\Controllers;

use App\Http\Controllers\Auth\RegisterController;
use App\User;
use App\Model\Role;
use Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use App\Model\TravelPreference;
use App\Model\Airport;
use App\Service\TravelDates;
use App\Model\Trip;
use App\Model\UserTravelPreference;


class UserController extends Controller {

    public function index() {
        if (auth::check()) {
            return view('home');
        }
        else {
            return view('login');
        }
    }

    public function createUser() {
        //$data = Request::all();

        $data = [
          'first_name'=>'Brian',
          'last_name'=>"O'Neill",
          'email'=>"Briantamu6@gmail.com",
          'password'=>"People96321"
        ];

        $user = new User([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        $user->save();

        $role = Role::find($data['role']);

        $user->roles()->save($role);

        return 1;
    }

    public function loginAttempt() {
        $data = Request::all();

        if (Auth::attempt($data)) {
            $user = Auth::user();

            return 1;
        }
        else {
            return ["status"=>0];
        }
    }

    public function logOut() {
        Auth::logout();
        return redirect('/');
    }

    public function home() {
        $user = Auth::user();

        if ($user->can('home')) {
            return view('home');
        }
        return view('home');
    }

    public function roles() {
        $roles = Role::get();

        return $roles->toArray();
    }

    public function delete() {
        $data = Request::all();

        User::destroy($data['id']);

        return 1;
    }

    //Returns All Users for the Manage Users View
    public function allUsers() {
        $users = User::get();

        foreach($users as $user) {
            $roles = $user->roles;

            $user->role = [
                "id"=> $roles[0]->id,
                "name"=>$roles[0]->name
            ];
        }
        return $users->toArray();
    }

    //View User Permissions View
    public function userPermissions() {
        return view('user_permissions');
    }

    //View User Permissions View
    public function loginView() {
        return view('login');
    }

    public function userPreferences() {
        $travelPreferences = TravelPreference::get()->toArray();
        $airports = Airport::get()->toArray();

        return [
            'travelPreferences'=>$travelPreferences,
            'airports'=>$airports,
        ];
    }

    public function updateUserPreferences() {
        $post = Request::all();

        //Save Travel Preference
        $userTravelPreferences = new UserTravelPreference();

        $userTravelPreferences->user_id = Auth::user()->id;

        $userTravelPreferences->user_id = $post['travelPreferenceId'];

        $userTravelPreferences->name = $post['searchName'];

        $userTravelPreferences->departure_airport = $post['departureAirport'];

        $userTravelPreferences->save();

        $travelDates = new TravelDates($post['startDate'], $post['endDate']);

        if ($post['travelPreferenceId'] == 1) {
            $dates = $travelDates->threeDayWeekends();
        }
        elseif ($post['travelPreferenceId'] == 2) {
            $dates = $travelDates->fourDayWeekends();
        }
        elseif ($post['travelPreferenceId'] == 3) {
            $dates = $travelDates->fiveDayWeekends();
        }



        return $this->saveTrips($dates, $post, $userTravelPreferences->id);
    }

    public function saveTrips($travelDates, $post, $userPreferenceId) {
        foreach ($travelDates as $travelDateSet) {
            foreach ($post['airports'] as $destinationAirport) {
                $newTrip = new Trip();

                $newTrip->origin = $post['departureAirport'];

                $newTrip->destination = $destinationAirport['airport_code'];

                $newTrip->departure_date = $travelDateSet['departureDate'];

                $newTrip->return_date = $travelDateSet['returnDate'];

                $newTrip->last_processed = 0;

                $newTrip->user_id = Auth::user()->id;

                $newTrip->user_travel_preference_id = $userPreferenceId;

                $newTrip->save();
            }
        }
    }
}