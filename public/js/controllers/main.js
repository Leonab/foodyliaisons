angular.module('locationController', ['ui.router'])

	// inject the service factory into our controller
	.controller('mainController', ['$scope','$http','Locations','Users', function($scope, $http, Locations, Users) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all 
		// use the service
		$scope.showall = function() {
		Locations.get()
			.success(function(data) {
				$scope.locations = data;
				$scope.loading = false;
			});
			};
			
			
		$scope.createLocation = function() {
			
			if ($scope.formData.text != undefined) {
				$scope.loading = true;
				
        Locations.create($scope.formData)

					// if successful creation, call our get function to get all the new locations
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.locations = data; // assign our new list of locations
					});
			}
		};
		
		
		

    // delete a todo after checking it
    $scope.deleteLocation = function(id) {
			$scope.loading = true;

			Locations.delete(id)
				// if successful creation, call our get function to get all the new locations
				.success(function(data) {
					$scope.loading = false;
					$scope.locations = data; // assign our new list of locations
				});
		};
	

	
	$scope.myFunct = function(keyEvent) {
       if (keyEvent.which === 13)
       geocode();
}
	
	$scope.geocode = function() {
	    if ($scope.formData.text != undefined) {
		    $scope.loading = true;
	    var address = document.getElementById('address').value;
		Locations.geocoder(address)
		.success(function(data) {
			        $scope.loading = false;
			        $scope.locations = data;
					//console.log(data);
			var longitude =	data.results[0].geometry.location.lng;
		    var latitude =	data.results[0].geometry.location.lat;
		    Locations.finder(longitude, latitude)
			.success(function(data) {
			        $scope.loading = false;
			        $scope.locations = data;
					
		        });
		        });
	}
	//$scope.formData = {};
	//formData.$setPristine();
	//formData.$setUntouched();
	};
	
	
	
	
		$scope.createUser = function() {
			
			//if ($scope.formData.text != undefined) {
				
        Users.create($scope.form)

					// if successful creation, call our get function to get all the new locations
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.users = data; // assign our new list of locations
					});
			
		};
		
		
		$scope.getLast = function() {
			Users.getit()
			.success(function(data){
				console.log(data);
			})
		};
			
	
   
	}])
	
  
  
  
	
	
	.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: 'views/main.html'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            templateUrl: 'views/about.html'   
        })
		.state('search', {
            url: '/search',
            templateUrl: 'views/display.html'   
        })
		.state('response', {
            url: '/response',
            templateUrl: 'views/response.html'  
		});	
		
		$locationProvider.html5Mode(true);
        
});
	
