angular.module('userService', [])

.factory('Users', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/users');
			},
			create : function(formData) {
				return $http.post('/api/users', formData);
			},
			delete : function(id) {
				return $http.delete('/api/users/' + id);
			},
		}
	}]);