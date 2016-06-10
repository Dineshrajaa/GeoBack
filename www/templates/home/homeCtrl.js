geoBackModule.controller('homeCtrl', function($scope, $http) {
    $scope.enableBGM = function() {
        cordova.plugins.backgroundMode.enable();
        cordova.plugins.backgroundMode.onactivate = function() {
            console.warn("Background mode on");
            setTimeout(function() {
                // Modify the currently displayed notification
                cordova.plugins.backgroundMode.configure({
                    text: 'Running in background for more than 5s now.'
                });
            }, 5000);
            $http.get("http://202.129.196.50/apmobile/APMobileService.svc/getcompanylist/827ccb0eea8a706c4c34a16891f84e7b")
                .success(function(data) {
                    console.log(data);
                })
                .error(function(data) {
                    alert("ERROR");
                });
        };

    }
    $scope.disableBGM = function() {
        cordova.plugins.backgroundMode.disable();
    }

})

document.addEventListener('deviceready', function() {
    // Rest of the code
    console.warn("Device ready");
});
