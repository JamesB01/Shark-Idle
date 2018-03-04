var app = angular.module('sharks', []);

app.controller('control', function($scope) {
	//resources
	$scope.inhabitants = 12;
	
	//positions
	$scope.mayor={name:"You do not have a mayor", occupied: false};
	$scope.general={name:"You do not have a general", occupied: false};
	$scope.cleric={name:"You do not have a high cleric", occupied: false};
	
	//names
	$scope.names = ["Bob", "Chris", "Alf"];
	
	//promote people to positions
	$scope.promote = function(person){
		if (person.occupied === false){
			if ($scope.inhabitants == 0){
				window.alert("You don't have anyone to promote!")
			}
			else{
				$scope.inhabitants -= 1;
				person.occupied = true;
				person.name=$scope.randomName();
			}
		}
	}
	
	$scope.randomName = function(){
		return $scope.names[Math.floor(Math.random()*$scope.names.length)];
	}
});