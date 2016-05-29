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

var ModalInstanceCtrl = function ($scope, $modalInstance, userForm, $http) {
    $scope.form = {}
    $scope.submitForm = function () {
        if ($scope.form.userForm.$valid) {
            console.log('user form is in scope');
			
			
			$http({
              method  : 'POST',
              url     : '/api/users/',
              data    : $scope.form,  // pass in data as strings
               headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
            .success(function(data) {
             console.log(data);
			
              if (!data.success) {
               // if not successful, bind errors to error variables
              console.log("error");
              } else {
               // if successful, bind success message to message
              $scope.message = data.message;
              }
              });
            
			
			
            $modalInstance.close('closed');
        } else {
            console.log('userform is not in scope');
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};