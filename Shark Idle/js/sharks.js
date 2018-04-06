var app = angular.module("sharks", []);

app.controller("control", function($scope, $interval) {
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
	
	//timing
	$scope.seconds = 10;
	$scope.currentseconds = 10;
	
	//positions
	$scope.mayor={name:"You do not have a mayor", occupied: false, level:0, prestige:0};
	$scope.general={name:"You do not have a general", occupied: false, level:0, prestige:0};
	$scope.cleric={name:"You do not have a high cleric", occupied: false, level:0, prestige:0};
	
	$scope.builder={name:"You do not have a builder", occupied: false, level:0};
	$scope.collector={name:"You do not have a collector", occupied: false, level:0};
	$scope.miner={name:"You do not have a miner", occupied: false, level:0};
	
	$scope.raider={name:"You do not have a raid leader", occupied: false, level:0};
	$scope.smith={name:"You do not have a weaponsmith", occupied: false, level:0};
	$scope.guard={name:"You do not have a guard captain", occupied: false, level:0};
	
	$scope.spawner={name:"You do not have a spawner", occupied: false, level:0};
	$scope.tamer={name:"You do not have a tamer", occupied: false, level:0};
	$scope.monk={name:"You do not have an abbot", occupied: false, level:0};
	
	//subordinates
	$scope.builders = {number: 0, type: "civil"};
	$scope.collectors={number: 0, type: "civil"};
	$scope.miners={number: 0, type: "civil"};
	
	$scope.raiders = {number: 0, type: "military"};
	$scope.smiths={number: 0, type: "military"};
	$scope.guards={number: 0, type: "military"};
	
	$scope.spawners = {number: 0, type: "religious"};
	$scope.tamers={number: 0, type: "religious"};
	$scope.monks={number: 0, type: "religious"};
	
	//triumvirate power
	$scope.power = {civilPower: 0, militaryPower: 0, religiousPower:0};
	
	//names
	$scope.names = ["Bob", "Chris", "Alf"];
	
	//promote people to positions
	$scope.promote = function(person){
		if (person.occupied === false){
			if ($scope.inhabitants == 0){
				$scope.displaymessage("You do not have anyone to promote");
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
		if ($scope.allowRemoval(subs)){
			subs.number-=1;
			$scope.inhabitants +=1;
		}
	}
	
	//calculate triumvirate power
	$scope.calculatePower = function(){
		$scope.power.civilPower = $scope.builders.number + $scope.collectors.number + $scope.miners.number
		$scope.power.militaryPower = $scope.raiders.number + $scope.smiths.number + $scope.guards.number
		$scope.power.religiousPower = $scope.spawners.number + $scope.tamers.number + $scope.monks.number
		return [($scope.power.civilPower/($scope.power.civilPower+$scope.power.militaryPower+$scope.power.religiousPower)), ($scope.power.militaryPower/($scope.power.civilPower+$scope.power.militaryPower+$scope.power.religiousPower)),($scope.power.religiousPower/($scope.power.civilPower+$scope.power.militaryPower+$scope.power.religiousPower))];
	}
	
	
	//check whether the triumvirate member allows a removal
	$scope.allowRemoval = function (subs){
		if (subs.type == "civil"){
			currentPower = $scope.power.civilPower;
			title="Mayor";
		}
		else if (subs.type = "military"){
			currentPower = $scope.power.militaryPower;
			title="General";
		}
		else{
			currentPower = $scope.power.religiousPower;
			title = "High Priest"
		}
		if (currentPower>(($scope.power.civilPower+$scope.power.militaryPower+$scope.power.religiousPower)*0.75)){
			$scope.displaymessage ("The " + title + " has enough political sway to totally block any attempt to reduce their number of subordinates.  Any attempt at discussion or compromise is quashed.");
			return false;
		}
		return true;
	}
	
	//background colour for triumvirate shows relative strength
	$scope.colorTriumvirate=function(){
		powers = $scope.calculatePower();
		$(".leader").css("background-color", "rgb(" + Math.round(255*powers[1])+ "," + Math.round(255*powers[2]) + "," + Math.round(255*powers[0]) +",0.7)");
	}
	
	//background colour for officers shows their influence
	$scope.colorOfficers=function(){
		//civil officers
		$("#builder").css("background-color", "rgb(0,0," + Math.round(($scope.builders.number/$scope.totalPeople)*185)+80 + ", 0.7)");
		$("#collector").css("background-color", "rgb(0,0," + Math.round(($scope.collectors.number/$scope.totalPeople)*185)+80 + ", 0.7)");
		$("#miner").css("background-color", "rgb(0,0," + Math.round(($scope.miners.number/$scope.totalPeople)*185)+80 + ", 0.7)");
		
		//military officers
		$("#raider").css("background-color", "rgb(" + Math.round(($scope.raiders.number/$scope.totalPeople)*145)+110 + ",0,0, 0.7)");
		$("#smith").css("background-color", "rgb(" + Math.round(($scope.smiths.number/$scope.totalPeople)*145)+110 + ",0,0, 0.7)");
		$("#guard").css("background-color", "rgb(" + Math.round(($scope.guards.number/$scope.totalPeople)*145)+110 + ",0,0, 0.7)");
		
		//religious officers
		$("#spawner").css("background-color", "rgb(0," + Math.round(($scope.spawners.number/$scope.totalPeople)*195)+60 + ",0, 0.7)");
		$("#tamer").css("background-color", "rgb(0," + Math.round(($scope.tamers.number/$scope.totalPeople)*195)+60 + ",0, 0.7)");
		$("#monk").css("background-color", "rgb(0," + Math.round(($scope.monks.number/$scope.totalPeople)*195)+60 + ",0, 0.7)");
	}
	
	
	$scope.newday = function(){
		//resets and updates
		$scope.currentseconds = $scope.seconds;
		$scope.calculatePower();
		$scope.colorTriumvirate();
		$scope.colorOfficers();
		//civil stuff
		//collectors
		$scope.seaweed += 2*$scope.collectors.number+$scope.mayor.level+$scope.mayor.prestige + $scope.collector.level;
		if(!$scope.kelpforest){
			var diceroll = Math.floor((Math.random() * 100) + 1);
			if (diceroll<$scope.collectors.number){
				$scope.displaymessage("Your collectors have discovered a kelp forest!");
				$scope.kelpforest = Math.floor((Math.random() * 2000) + 1);
			}
		}
		else {
			var kelpmined = (Math.min($scope.kelpforest, ($scope.collectors.number/10)));
			$scope.kelp += kelpmined;
			$scope.kelpforest -= kelpmined;
			if (!$scope.kelpforest){
				$scope.displaymessage("The kelp forest has been cut down!");
			}
		}
		//miners
		$scope.basalt += ($scope.miners.number/5)+($scope.mayor.level/10)+($scope.mayor.prestige/10)+ ($scope.collector.level/10);
		if(!$scope.ironvein){
			var diceroll = Math.floor((Math.random() * 100) + 1);
			if (diceroll<$scope.miners.number){
				$scope.displaymessage("Your miners have discovered an iron mine!");
				$scope.ironvein = Math.floor((Math.random() * 2000) + 1);
			}
		}
		else {
			var ironmined = (Math.min($scope.ironvein, ($scope.miners.number/10)));
			$scope.ironore += ironmined;
			$scope.ironvein -= ironmined;
			if (!$scope.ironvein){
				$scope.displaymessage("The iron vein has been mined out!");
			}
		}
		//builders
		if($scope.territory >= ($scope.housing+1)){
			var seaweedUsed = Math.min($scope.seaweedToHouse, ($scope.builders.number/5)+($scope.mayor.level/10)+($scope.mayor.prestige/10)+($scope.builder.level/10), $scope.seaweed);
			$scope.seaweed-=seaweedUsed;
			$scope.seaweedToHouse-=seaweedUsed;
			var basaltUsed = Math.min($scope.basaltToHouse, ($scope.builders.number/20)+($scope.mayor.level/40)+($scope.mayor.prestige/40), $scope.basalt);
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
		$scope.territory += ($scope.raiders.number/10) +($scope.general.level/20)+($scope.general.prestige/20)+($scope.rader.level/20);
		//smiths
		//builders
		
		//religious stuff
		//spawners
		if($scope.totalPeople+1 <= $scope.housing){
			$scope.spawnRegularTime-= Math.min($scope.spawnRegularTime, $scope.spawners.number +($scope.cleric.level/20)+($scope.cleric.prestige/20)+($scope.spawner.level/20));
			if (!$scope.spawnRegularTime){
				$scope.totalPeople++;
				$scope.inhabitants++;
				$scope.spawnRegularTime=10;
			}
		}
		//tamers
		//monks
	}
	
	//message handling
	$scope.displaymessage = function(message){
		document.getElementById("messagebuffer").innerHTML += "<p style=\"opacity:1\">" + message + "</p>";
	}
	
	$scope.degrademessages = function(){
		var messagediv = document.getElementById("messagebuffer");
		var descendents = messagediv.getElementsByTagName("P");
		var i,e,t;
		for (i = 0; i < descendents.length; ++i) {
			e = descendents[i];
			t = e.style.opacity;
			e.style.opacity = t-0.1;
			if (e.style.opacity <= 0){
				messagediv.removeChild(e);
			}
		}
	}
	
	
	//assorted utility functions
	$scope.randomName = function(){
		return $scope.names[Math.floor(Math.random()*$scope.names.length)];
	}
	
	//autoonwards
	$interval(function() {
		$scope.currentseconds--;
		if(!$scope.currentseconds){
			$scope.degrademessages();
			$scope.newday();
		}
	}, 1000);
});