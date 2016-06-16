geoBackModule.controller('homeCtrl', function($scope, $http,$interval) {
    $scope.showCard = false;
    $interval(function(){$scope.trackGeolocation();},5000);
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
            // $scope.trackGeolocation();

        };

    };
    $scope.disableBGM = function() {
        cordova.plugins.backgroundMode.disable();
    };
    $scope.trackGeolocation = function() {
        // onSuccess Callback
        // This method accepts a Position object, which contains the
        // current GPS coordinates
        //
        var onSuccess = function(position) {
            console.log('Latitude: ' + position.coords.latitude + '\n' +
                'Longitude: ' + position.coords.longitude + '\n' +
                'Altitude: ' + position.coords.altitude + '\n' +
                'Accuracy: ' + position.coords.accuracy + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                'Heading: ' + position.coords.heading + '\n' +
                'Speed: ' + position.coords.speed + '\n' +
                'Timestamp: ' + position.timestamp + '\n');
            $scope.sendLocation(position.coords.latitude, position.coords.longitude);
        };

        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);

        console.warn("Got a call");
        // var watchID =navigator.geolocation.getCurrentPosition(onGeoSuccess, function(error) { console.log("error:" + JSON.stringify(error)); }, { timeout: 15000, enableHighAccuracy: true });
    };

    function onGeoSuccess(position) {
        console.warn(JSON.stringify(position));
        $scope.sendLocation(position.coords.latitude, position.coords.longitude);
    }
    $scope.sendLocation = function(lat, lng) {
        $http.get("http://202.129.196.131:8085/demo/markers/ws.php?func=store&lat=" + lat + "&lng=" + lng)
            .success(function(data) {
                $scope.showCard = true;
                $scope.fetchedData = JSON.stringify(data);
                console.log(data);
            })
            .error(function(data) {
                alert("ERROR");
            });
    };

})

document.addEventListener('deviceready', function() {
    // Rest of the code
    console.warn("Device ready");
});
