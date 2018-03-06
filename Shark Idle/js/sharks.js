var app = angular.module('sharks', []);

app.controller('control', function($scope) {
	//resources
	$scope.inhabitants = 12;
	$scope.totalPeople = 12;
	$scope.territory = 12;
	$scope.housing = 12;
	$scope.basalt=0;
	$scope.seaweed=0;
	
	//resource finding flags
	$scope.ironvein = 0;
	$scope.ironore = 0;
	$scope.iron = 0;
	
	$scope.kelpforest = 0;
	$scope.kelp = 0;
	
	//building trackers
	$scope.seaweedToHouse = 50;
	$scope.basaltToHouse = 10;
	
	//spawning trackers
	$scope.spawnRegularTime=10;
	
	//positions
	$scope.mayor={name:"You do not have a mayor", occupied: false};
	$scope.general={name:"You do not have a general", occupied: false};
	$scope.cleric={name:"You do not have a high cleric", occupied: false};
	
	$scope.builder={name:"You do not have a builder", occupied: false};
	$scope.collector={name:"You do not have a collector", occupied: false};
	$scope.miner={name:"You do not have a miner", occupied: false};
	
	$scope.raider={name:"You do not have a raid leader", occupied: false};
	$scope.smith={name:"You do not have a weapon smith", occupied: false};
	$scope.guard={name:"You do not have a guard captain", occupied: false};
	
	$scope.spawn={name:"You do not have a spawner", occupied: false};
	$scope.tamer={name:"You do not have a tamer", occupied: false};
	$scope.monk={name:"You do not have a abbot", occupied: false};
	
	//subordinates
	$scope.builders = {number: 0, type: "civil"};
	$scope.collectors={number: 0, type: "civil"};
	$scope.miners={number: 0, type: "civil"};
	
	$scope.raiders = {number: 0, type: "military"};
	$scope.smiths={number: 0, type: "military"};
	$scope.guards={number: 0, type: "military"};
	
	$scope.spawns = {number: 0, type: "religious"};
	$scope.tamers={number: 0, type: "religious"};
	$scope.monks={number: 0, type: "religious"};
	
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
	
	//promote subordinates
	$scope.subordinates = function(subs){
		subs.number+=1;
		$scope.inhabitants -=1;
	}
	
	//demote subordinates
	$scope.removeSubordinates = function(subs){
		subs.number-=1;
		$scope.inhabitants +=1;
	}
	
	$scope.newday = function(){
		//civil stuff
		//collectors
		$scope.seaweed += 2*$scope.collectors.number;
		if(!$scope.kelpforest){
			var diceroll = Math.floor((Math.random() * 100) + 1);
			if (diceroll<$scope.collectors.number){
				window.alert("Your collectors have discovered a kelp forest");
				$scope.kelpforest = Math.floor((Math.random() * 2000) + 1);
			}
		}
		else {
			var kelpmined = (Math.min($scope.kelpforest, ($scope.miners.number/10)));
			$scope.kelp += kelpmined;
			$scope.kelpforest -= kelpmined;
		}
		//miners
		$scope.basalt += ($scope.miners.number/5);
		if(!$scope.ironvein){
			var diceroll = Math.floor((Math.random() * 100) + 1);
			if (diceroll<$scope.miners.number){
				window.alert("Your miners have discovered an iron vein");
				$scope.ironvein = Math.floor((Math.random() * 2000) + 1);
			}
		}
		else {
			var ironmined = (Math.min($scope.ironvein, ($scope.miners.number/10)));
			$scope.ironore += ironmined;
			$scope.ironvein -= ironmined;
		}
		//builders
		if($scope.territory >= $scope.housing+1){
			var seaweedUsed = Math.min($scope.seaweedToHouse, ($scope.builders.number/5), $scope.seaweed);
			$scope.seaweed-=seaweedUsed;
			$scope.seaweedToHouse-=seaweedUsed;
			var basaltUsed = Math.min($scope.basaltToHouse, ($scope.builders.number/20), $scope.basalt);
			$scope.basalt-=basaltUsed;
			$scope.basaltToHouse-=basaltUsed;
			if($scope.seaweedToHouse+$scope.basaltToHouse===0){
				$scope.seaweedToHouse = 50;
				$scope.basaltToHouse = 10;
				$scope.housing+=1;
			}
			
		}
		
		//military stuff
		//raiders
		$scope.territory += ($scope.raiders.number/10);
		//smiths
		//builders
		
		//religious stuff
		//spawners
		if($scope.totalPeople+1 <= $scope.housing){
			$scope.spawnRegularTime-= Math.min($scope.spawnRegularTime, $scope.spawns.number);
			if (!$scope.spawnRegularTime){
				$scope.totalPeople++;
				$scope.inhabitants++;
				$scope.spawnRegularTime=10;
			}
		}
		//tamers
		//monks
	}
	
	
	//assorted utility functions
	$scope.randomName = function(){
		return $scope.names[Math.floor(Math.random()*$scope.names.length)];
	}
});