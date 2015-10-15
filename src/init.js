$(document).ready(function() {
  window.dancers = [];

/*-----------------------CACHE THE DOM--------------------------------*/  
var $container = $('.container');
var $addRockButton = $('.addRock');
var $addVehicleButton = $('.addVehicle');
var $addFroggerButton = $('.addFrogger');
var vehicleSpeed = 4000
var directionVehicle = function(){
  return Math.round(Math.random()) === 1 ? 'left' : 'right';
}
var leftStartPositions = [100, 200, 300, 400, 500, 600];
var rightStartPositions = [50,150,250,350,450,550, 650];

/*-------------------------------------------------------------------*/  

/*--------------------Add Vehicle Instance--------------------------*/  

  $addVehicleButton.on("click", function(event) {
    var obstacleMakerFunctionName = $(this).data("vehicle-maker-name");

    // get the maker function for the obstacle we are making
    var obstacleMakerFunction = window[obstacleMakerFunctionName];
    
    //initialize a new Rock with a random position
    var vehicle = new obstacleMakerFunction(
      $container.height() * Math.random(),
      $container.width(), vehicleSpeed, directionVehicle()
    );
    if(vehicle.direction === 'left'){
      vehicle.top = leftStartPositions[Math.floor(Math.random()*6)];

    } else {
      vehicle.left = -200;
      vehicle.top = rightStartPositions[Math.floor(Math.random()*7)];
    }

    //set vehicle's position
    vehicle.setPosition();

    //append rock to the container
    $container.append(vehicle.$obstacleNode);
    vehicle.move();

    var resetInterval = setInterval(function(){
      if(vehicle.direction === 'left'){
        if(vehicle.$obstacleNode.css('left') === '-200px'){
          vehicle.resetPosition();
          vehicle.move();
        }
      } else {
        if(vehicle.$obstacleNode.css('left') === '1400px'){
          vehicle.resetPosition();
          vehicle.move();
        }
      }
    }, 300);

  });

/*-------------------------------------------------------------------*/ 

/*--------------------Add Rock Instance------------------------------*/  


  //add a rock to the page
  $addRockButton.on("click", function(event) {
    var obstacleMakerFunctionName = $(this).data("obstacle-maker-name");

    // get the maker function for the obstacle we are making
    var obstacleMakerFunction = window[obstacleMakerFunctionName];

    
    //initialize a new Rock with a random position
    var obstacle = new obstacleMakerFunction(
      $container.height() * Math.random(),
      $container.width() * Math.random()
    );

    //set Rock's position
    obstacle.setPosition();

    //append rock to the container
    $container.append(obstacle.$obstacleNode);
  });


/*-------------------------------------------------------------------*/

/*--------------------Add Frogger------------------------------*/ 
  
  //add Frogger to the page
  $addFroggerButton.on("click", function(event) {
    var obstacleMakerFunctionName = $(this).data("frogger-maker-name");

    // get the maker function for the obstacle we are making
    var obstacleMakerFunction = window[obstacleMakerFunctionName];

    
    //initialize Frogger
    var frogger = new obstacleMakerFunction(750, 600);

    //set Frogger's position
    frogger.setPosition();

    //append frogger to the container
    $container.append(frogger.$obstacleNode);
    $addFroggerButton.toggle();

/*--------------------Frogger Movement ------------------------------*/

    $('body').keydown(function(event){
      if(event.which === 37 ){
        frogger.move('left');
      } else if (event.which === 38){
        frogger.move('up');
      } else if(event.which === 39){
        frogger.move('right');
      } else if(event.which === 40){
        frogger.move('down');
      }

  // left 37 
//up 38
//right 39
//down 40
})





/*-------------------------------------------------------------------*/



  });

/*-------------------------------------------------------------------*/




});