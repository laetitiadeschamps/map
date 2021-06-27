const modal = {
    // Method for attaching events to our modal (close, category select and form submission)
    bindAllModalEvents:function() {
        document.querySelector('.map__modal-close').addEventListener('click', modal.handleModalClose);
        document.querySelector('.map__modal form').addEventListener('submit', modal.handleNewLocationSubmit);
        modal.createSelect();
    },
    // Create select element for category choice when adding a marker, according to BDD
    createSelect:function() {
        let selectElement = document.querySelector('#typeSelect');
        selectElement.textContent='';
        let firstOption = document.createElement('option');
        firstOption.value='';
        firstOption.textContent='Choisissez une catégorie';
        selectElement.appendChild(firstOption);
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
            jsonResponse.forEach(category=> {
                    let option =document.createElement('option');
                    option.value=category.id;
                    option.textContent = category.name;
                    selectElement.appendChild(option);
            })
        })   
    },
    handleModalClose:function() {
        document.querySelector('.map__modal').style.display='none';
        document.querySelector('.map__modal input[type=text]').value='';
        document.querySelector('.map__modal select').selectedIndex = 0;
    },
    // On submission of the modal, we close it and process the new location entry
    handleNewLocationSubmit:function(e) {
        e.preventDefault();
        let text = document.querySelector('.map__modal-text #displayText').value;
        let category_id = document.querySelector('.map__modal-text #typeSelect').value;
       
        modal.handleModalClose();
        map.addMarkerToBDD(newLocation.lat, newLocation.lon, text, category_id);   
        map.addMarker(newLocation.lat, newLocation.lon, text, category_id)
    },
}