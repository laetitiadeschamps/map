<?php

namespace App\Http\Middleware;

use Closure;

class Cors
{
    /**
     * Send CORS headers in response
     */
    public function handle($request, Closure $next)
    {
        // J'exécute le traitement de la requête et je récupère la réponse générée
        $response = $next($request);

        // Si la méthode de la requête est OPTIONS, je surchage la réponse (405 Method Not Allowed) de Lumen
        if ($request->getMethod() === 'OPTIONS') {
            $response = response('', 200);
        }

        // J'ajoute les en-têtes de réponse de CORS
        $response
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
            ->header('Access-Control-Allow-Headers', 'Content-Type');
        ;

        // Je retourne la réponse modifiée
        return $response;
    }
}
