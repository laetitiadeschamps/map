const filters = {
    layers: {},
    filtersChecked:[],
    init:function() {
        filters.createFilters();  
    },
    // We handle open / close mode of the filter block
    addFiltersEvents:function() {
        document.querySelector('.filters i').addEventListener('click', filters.handleFiltersDisplay);
    },
    // Method for firing event whenever an input is checked / unchecked
    bindFiltersEvents:function(element) {
        element.querySelector('input').addEventListener('change', filters.handleFilterCheck);   
    },
    // Method for retrieving categories from DB and displaying filters
    createFilters:function() {
        let fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };
        // We fetch all categories from Database  
        request = fetch('http://0.0.0.0:8080/categories/', fetchOptions);
        request.then(function(response) {
              return response.json();
        })
        .then(function(jsonResponse) {
            //For each category, we create a new filter and we attach event listeners to it
            let ulElement = document.createElement('ul');
            let filterDivElement = document.querySelector('.filters__container');
            filterDivElement.appendChild(ulElement);
            jsonResponse.forEach(category=> {
                  let liElement = document.createElement('li');
                  liElement.innerHTML = `<input type="checkbox" id="category_${category.id}" name='category_${category.id}'><label for='category_${category.id}'><img src="${category.icon}"> <span>${category.name}</span></label>`
                  filters.bindFiltersEvents(liElement);
                ulElement.appendChild(liElement);
            })
        })
    },
    // Method for displaying markers according to whether their category is checked or not
    filterMarkersDisplay:function() {
        for(let i=1; i <= map.categoryNum; i++) {
            map.mymap.removeLayer(filters.layers['category_'+i]);
        }
        filters.filtersChecked.forEach(filter=> {
            map.mymap.addLayer(filters.layers[filter]);
        }) 
    },
    // Method fired when a filter is checked/ unchecked
    handleFilterCheck:function(event) {
        // If it is checked, we add it to the filtersChecked array, that will decide which markers are shown
        if(event.currentTarget.checked) {
           filters.filtersChecked.push(event.currentTarget.id);
           const label = event.currentTarget.parentNode.querySelector('label');
           label.classList.add('active');
        // Else we remove the category from the array
        } else {
            const index = filters.filtersChecked.indexOf(event.currentTarget.id);
            if(index !== -1) {
                filters.filtersChecked.splice(index, 1);
            }  
            const label = event.currentTarget.parentNode.querySelector('label');
            label.classList.remove('active');     
        }
        // We display markers
        filters.filterMarkersDisplay();
    },
    // We handle open / close mode of the filter block
    handleFiltersDisplay:function(event) {
       event.currentTarget.parentNode.classList.toggle('open');
    }
    
}
