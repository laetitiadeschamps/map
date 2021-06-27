<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Marker;
use Illuminate\Http\Request;
use SebastianBergmann\Environment\Console;

class MarkerController extends Controller
{
    /**
     * Method to get all markers
     * @return json
     */
    public function list() {
        $list = Marker::all();
        return $this->sendJsonResponse($list);

    }
    /**
     * Method to store markers into database
     * @return json
     */
   public function store(Request $request) {
       $marker = new Marker();
       $marker->latitude= $request->lat;
       $marker->longitude=$request->lon;
       $marker->text=$request->text;
       $marker->category_id=$request->category;

       try {
           $marker->save();
           $this->sendEmptyResponse(200);

        } catch (\Exception $e) {
            $this->sendEmptyResponse(500);
        }
   }
}
