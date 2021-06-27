const map = {
    // Variables needed for map creation and update
    myMap:null, 
    categoryNum:0,
    init:function() {
        // Creating map
        map.createMap(43.426963518617406, 6.738051819860819);
        // Initiating new location and filters
        newLocation.init();
        filters.init();
    },

    // Method for displaying a marker on the map
    addMarker:function(lat, lon, text, category_id) {
        let fetchOptions = {  
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };
        // We retrieve corresponding category from database to create the appropriate icon and attach it to the proper layer group
        request = fetch('http://0.0.0.0:8080/categories/' + category_id, fetchOptions);
        request.then(function(response) {
                return response.json();
        })
        .then(
            function(jsonResponse) {
                let icon = jsonResponse.icon;
                var myIcon = L.icon({
                    iconUrl: icon,
                    iconSize:     [40, 40], // size of the icon
                    iconAnchor:   [22, 17], // point of the icon which will correspond to marker's location
                    popupAnchor:  [-3, -40] // point from which the popup should open relative to the iconAnchor
                });
                var marker = L.marker([lat, lon], {icon:myIcon}).addTo(map.mymap);
                // We add a popup for each marker
                map.bindPopup(marker, text);
                let layer = filters.layers['category_'+category_id];
                // We add the marker to the corresponding layer except if it is a 'position' category type 
                category_id !== 5 ? layer.addLayer(marker):'';
       
                // We add the updated layer to the map
                for(let i = 1; i <= map.categoryNum; i++) {
                    filters.layers['category_'+i].addTo(map.mymap);
                }
            })

    },
    // Method to add marker to database when created
    addMarkerToBDD:function(lat, lon, text, category) {
        let data ={
            lat:parseFloat(lat), 
            lon:parseFloat(lon), 
            text:text, 
            category:parseInt(category)
        }
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let fetchOptions = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache', 
            headers:myHeaders,
            body : JSON.stringify(data)
        };
        request = fetch('http://0.0.0.0:8080/markers/', fetchOptions);
        request.then(
            function(response) {
                if(response.status == 404 || response.status == 500 || response.status == 422) {
                    alert("L'ajout a échoué");
                } else {
                   alert("L'ajout a bien été pris en compte");
                   // If insertion went well, we display marker on the map
                   map.addMarker(lat, lon, text, category);
                } 
            })
    },
    // Method to attach a popup to an icon
    bindPopup(element, text) {
        let popup= element.bindPopup(text).openPopup();  
    }, 
    // Method for creating layers for each category in order to enable filter through categories
    createLayers:function() {
        let fetchOptions = {   
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };
          
        request = fetch('http://0.0.0.0:8080/categories/', fetchOptions);
        request.then(function(response) {
                return response.json();
        })
        .then(function(jsonResponse) {
            map.categoryNum = jsonResponse.length;
            jsonResponse.forEach(category=>{
                let key = 'category_'+category.id;
                filters.layers[key] = L.layerGroup([]);
            })    
        })
    },
    // Method for creating the map
    createMap:function(lat, lon) {
        // Creating layer per categories in order to filter afterwards
        map.createLayers(); 
        // Config of map   
        map.mymap = L.map('map', {
            scrollWheelZoom: 'center'
        }).setView([43.4268076818088, 6.745347428104874], 13);
        map.mymap.setZoom(16);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            layers:new L.TileLayer('http://{s}.tiles.mapbox.com/v3/gvenech.m13knc8e/{z}/{x}/{y}.png'),
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoibGFldGl0aWFkZXNjaGFtcHMiLCJhIjoiY2tvbXY0ZmYyMHN6YjJvcGViMGRnbmtvbiJ9.-kgafyHwFwIPi-4dzJWKsA'
        }).addTo(map.mymap);
        //handle click event on map to create new marker
        map.mymap.on('click', map.handleMapClick);
        // Retrieving all existing markers from database and then displaying them
        map.getAllMarkers();
    },
    // Retrieving all existing markers from database
    getAllMarkers:function() {
        let fetchOptions = {   
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
          };
        request = fetch('http://0.0.0.0:8080/markers/', fetchOptions);
        request.then(
            function(response) {
                return response.json();
            })
        .then(function(jsonResponse) {
            jsonResponse.forEach(marker=> {
                // for each existing marker, we display it on the map
                map.addMarker(marker.latitude, marker.longitude, marker.text, marker.category_id)
            })
              
        })
    },
    handleMapClick:function(e) {
        //On click, retrieve coordinates
        newLocation.latlon = e.latlng;
        newLocation.lat = e.latlng.lat;
        newLocation.lon = e.latlng.lng;
        //On map click, we display the modal to enter new location info
        document.querySelector('.map__modal').style.display="block";     
    }   
}