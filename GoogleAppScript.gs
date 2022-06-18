function automatedParking() {

  // Call the UTRGV Parking API
  let response = UrlFetchApp.fetch("https://webapps.utrgv.edu/it/cascaderest/api/parking");

  // Parse the JSON reply
  let json = response.getContentText();
  let data = JSON.parse(json);

  //Declare Variables
  var total;
  var free;
  var taken;
  var compensator;
  var name;

  //Set Variables
  for (var i = 0; i < 3; i++) // Cycle through the 3 available parking lots
  {
    name = data[i]["location_name"];
    total = data[i]["total_spaces"];
    free = data[i]["free_spaces"]
    taken = total - free;

    console.log(name + ":\nTotal Spaces: " + total + "\nFree Spaces: " + free + "\nTaken Spaces: " + taken)
  }

  //These variables can then be used in any way desired, such as outputting to a Google Sheets document or other type of file.
}