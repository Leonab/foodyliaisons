angular.module('locationService', [])

.factory('Locations', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/locations');
			},
			create : function(locationData) {
				return $http.post('/api/locations', locationData);
			},
			delete : function(id) {
				return $http.delete('/api/locations/' + id);
			},
			finder : function(longitude, latitude) {
				return $http.get('/api/query?' + 'longitude=' + longitude + '&latitude=' + latitude);
		    },
			geocoder : function(address) {
			    return $http.post('//maps.googleapis.com/maps/api/geocode/json?address=' + address);
			}
		}
	}]);