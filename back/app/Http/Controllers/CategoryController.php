<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use SebastianBergmann\Environment\Console;

class CategoryController extends Controller
{
    /**
     * Method to get categories
     * @return json
     */
    public function list() {
        $list =Category::where('type', 'marker')->get();
        // Return JSON of this list
        return $this->sendJsonResponse($list, 200);
    }

    /**
     * Method to get one category
     * @param int
     * @return json
     */

    public function readOne(int $id) {
        $category =Category::find($id);
        if($category) {
            return $this->sendJsonResponse($category, 200);
        } else {
            return $this->sendEmptyResponse(404);
        }

    }

}
