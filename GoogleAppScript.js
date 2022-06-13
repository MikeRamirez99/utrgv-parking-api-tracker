function automatedParking() {
   
    // Call the UTRGV Parking API
    var response = UrlFetchApp.fetch("https://webapps.utrgv.edu/it/cascaderest/api/parking");
  
    // Parse the JSON reply
    var json = response.getContentText();
    var data = JSON.parse(json);
     
    var total;
    var free;
    var taken;
    var compensator;
    var name;
    //Transfer
    var sheet = SpreadsheetApp.getActiveSheet();
    sheet.getRange(sheet.getLastRow() + 1,1).setValue(" ");
    for(var i = 0;i<3;i++)
    {
    name = data[i]["location_name"];
    Logger.log(name)
    //Modify Compensator
      if(name == "Lot B1")
      {
      compensator = 0;
      }
      else if(name == "Lot E32")
      {
      compensator = 6;
      }
      else
      {
      compensator = 12;
      }
    Logger.log(compensator)
    //Variables
    total = data[i]["total_spaces"];
    free = data[i]["free_spaces"]
    taken = total-free;
    var d = new Date();
    //Date
    var currentDate = d.toLocaleDateString();
    sheet.getRange(sheet.getLastRow() + 0,1 + compensator).setValue([currentDate]);
    //Time
    var currentTime = d.toLocaleTimeString();
    sheet.getRange(sheet.getLastRow() + 0,2 + compensator).setValue([currentTime]);
    //Total
    sheet.getRange(sheet.getLastRow() + 0,3 + compensator).setValue([total]);
    //Free
    sheet.getRange(sheet.getLastRow() + 0,4 + compensator).setValue([taken]);
    //Taken
    sheet.getRange(sheet.getLastRow() + 0,5 + compensator).setValue([free]);
    }
  }