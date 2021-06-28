const app = {
    init:function() {
        // Creating map
        map.init();
        // Add event listeners for modal used to create new location
        modal.bindAllModalEvents();
        // Getting user location to display it
        //newLocation.getUserLocation();
        // Add event listeners on filters
        filters.addFiltersEvents();
    }
}

document.addEventListener('DOMContentLoaded', app.init);