angular.module('userService', [])

.factory('Users', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/users');
			},
			create : function(form) {
				return $http.post('/api/users', form);
			},
			delete : function(id) {
				return $http.delete('/api/users/' + id);
			},
			getit : function() {
				return $http.get('/api/lastuser');
			},
		}
	}]);