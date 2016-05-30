angular.module("modalFormApp", ['ui.bootstrap','ngAnimate','ngMaterial'])
.controller("modalAccountFormController", ['$scope', '$modal', '$log',

    function ($scope, $modal, $log) {

        $scope.showForm = function () {
            $scope.message = "Show Form Button Clicked";
            console.log($scope.message);

            var modalInstance = $modal.open({
                templateUrl: 'views/modal-form.html',
                controller: ModalInstanceCtrl,
                scope: $scope,
                resolve: {
                    userForm: function () {
                        return $scope.userForm;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
            }]);

var ModalInstanceCtrl = function ($scope, $modalInstance, userForm, $http, $location, $timeout, $state) {
    $scope.form = {}
    $scope.submitForm = function () {
        if ($scope.form.userForm.$valid) {
            console.log('user form is in scope');
			
			
			$http.post('/api/users',$scope.form)
            .success(function(data,status,headers,config){
				console.log("data inserted");
			})
			
			
            $modalInstance.close('closed');
			$location.path('/response');
			$timeout(function() {
              $state.go('home');
              }, 3000);
        } else {
            console.log('userform is not in scope');
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};