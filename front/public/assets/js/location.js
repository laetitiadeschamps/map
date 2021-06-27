const newLocation = {
   // Variables used for keeping new user coordinates throughout the process 
   lat:0,
   lon:0,
   latlon:0,
   init:function() {
       newLocation.lat = 0;
       newLocation.lon=0;
       newLocation.latlon = 0;
   },
   // Method called at the loading of the page to get user current position
   getUserLocation:function() {   
        navigator.geolocation.getCurrentPosition(position=> {
                map.addMarker(position.coords.latitude, position.coords.longitude,`Vous êtes ici (position approximative`, 5);     
        })
   }
}