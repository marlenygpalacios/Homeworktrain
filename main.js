// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCWvUJZ_qY5la-9bnd3c3NSFgjWKuC5eIw",
  authDomain: "train-schedule-71058.firebaseapp.com",
  databaseURL: "https://train-schedule-71058.firebaseio.com",
  // projectId: "train-schedule-71058",
  storageBucket: "train-schedule-71058.appspot.com",
  // messagingSenderId: "923706659502",
  // appId: "1:923706659502:web:83d5dd8c4fe23626"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


$("form").on("submit", function(e){
e.preventDefault();
  var train = {
    Name: $("#trainNameInput").val().trim(),
    Destination: $("#destInput").val().trim(),
    Firstraintime: $("#firstTrainInput").val().trim(),
    Frequency: $("#freqInput").val().trim()
  };
  console.log(train)
  firebase.database().ref().push(train);
  $("#trainNameInput").append(train.Name);
  $("#destInput").append(train.Destination);
  $("firstTrainInput").append(train.Firstraintime);
  $("frequencyInput").append(train.Frequency);

  var trainTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

  var timeDifference = moment().diff(moment(trainTimeConverted), "minutes");
	console.log(timeDifference);
  var frequencyMinutes = train.Frequency;
	console.log("Frequency Minutes: " + frequencyMinutes);
  var minutesAway = Math.abs(timeDifference % frequencyMinutes);
  	console.log("Minutes Away: " + minutesAway);
  var nextArrival = moment(currentTime).add(minutesAway, "minutes").format("hh:mm A");
	console.log("Next Arrival: " + nextArrival);

});
function addTrain() {
}

//addTrain()
    // Assume the following situations.

    // (TEST 1)
    // First Train of the Day is 3:00 AMlen
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away


    // ==========================================================

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21

    // Assumptions
    var tFrequency = 3;

    // Time is 3:30 AM
    var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    firebase.database().ref().on("value", function(snapshot){
      console.log(snapshot.val());
      var trainValues  = snapshot.val();
      

      for (var eachTrainValues in trainValues) {
        console.log('eachTrainValues', trainValues[eachTrainValues]);
   $("#trainTable > tbody").append("<tr><td>" + trainValues[eachTrainValues].Name + "</td><td>" + trainValues[eachTrainValues].Destination + "</td><td>" + trainValues[eachTrainValues].Frequency + 
  "</td><td>" + trainValues[eachTrainValues].Firstraintime + "</td></tr>");
      }
      // Populate table based on results
    
    //Adding into the table

 //Declaring a time difference variable

//  var timeDifference = moment().diff(moment(trainTimeConverted), "minutes");

//  console.log(timeDifference);

 

//  var frequencyMinutes = childSnapshot.val().frequency;

//  console.log("Frequency Minutes: " + frequencyMinutes);

 

//  var minutesAway = Math.abs(timeDifference % frequencyMinutes);

//   //  console.log("Minutes Away: " + minutesAway);

 

//  var nextArrival = moment(currentTime).add(minutesAway, "minutes").format("hh:mm A");

//  console.log("Next Arrival: " + nextArrival);

 

 

 //Adding into the table

//  $("#trainScheduleTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + 
//  "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
})