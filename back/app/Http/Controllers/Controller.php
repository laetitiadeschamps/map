<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{
    /**
     * Generic method for sending responses with data
     * @return Response
     */
    protected function sendJsonResponse($data, int $httpStatusCode=200) {
        // Return response, with headers
        return response()->json($data, $httpStatusCode)
            ->header('Access-Control-Allow-Origin', '*') // autorise l'accès via XHR depuis n'importe quel domaine
            ->header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    }

    /**
     * Provide a centralized empty response, with CORS, to all Controllers
     *
     * @param integer $httpStatusCode
     * @return void
     */
    protected function sendEmptyResponse(int $httpStatusCode=200) {
        // Return response, with headers
        return response('', $httpStatusCode)
            ->header('Access-Control-Allow-Origin', '*') // autorise l'accès via XHR depuis n'importe quel domaine
            ->header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    }
}
