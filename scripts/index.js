// Function that creates the dynamic table
function createTable(x1, x2, y1, y2) {
  var table = document.getElementById("m_table");
  var tbody = document.createElement("tbody");
  // set number of rows
  for (let i = 0; i <= y2 - y1 + 1; ++i) {
    let row = document.createElement("tr");
    // set number of columns
    for (let j = 0; j <= x2 - x1 + 1; ++j) {
      let data = document.createElement("td");
      // Top left block empty
      if (i === 0 && j === 0) {
        data.innerHTML = "";
      }
      // sets up top row
      else if (i === 0) {
        data.innerHTML = x1 + j - 1;
      }
      // sets first column
      else if (j === 0) {
        data.innerHTML = y1 + i - 1;
      }
      // Multiplication preformed the get the table numbers
      else {
        data.innerHTML = (x1 + j - 1) * (y1 + i - 1);
      }
      // appends the data to eachg row and individual data cell in that row and appends it to our currently empty html table
      row.appendChild(data);
    }
    tbody.appendChild(row);
  }
  table.appendChild(tbody);
}

// Checks all of the edge cases and ensures the inputs work and if not it tells the user what to fix
function errorCheck(range) {
  if (range[0] > range[1]) {
    document.getElementById("error").innerHTML =
      "Least X value cannot exceed the greatest value error: " + range[0];
    return false;
  } else if (range[2] > range[3]) {
    document.getElementById("error").innerHTML =
      "Least Y value cannot exceed the greatest value error: " + range[2];
    return false;
  }
  for (var i = 0; i < range.length; i++) {
    if (
      range[i] < -50 ||
      range[i] > 50 ||
      range[i] % 1 !== 0 ||
      range[i] === "" ||
      isNaN(range[i])
    ) {
      document.getElementById("error").innerHTML =
        "Please ensure all integers are between -50 & 50 error: " + range[i];
      return false;
    }
  }
  return true;
}

// music_play controls when the music can be played to prevent overlap
var music_play = false;
document.querySelector("button").addEventListener("click", function () {
  // Error messages are hidden to start and the among us music plays when the button is clicked
  document.getElementById("error").innerHTML = "";
  var audio = new Audio("Music/AmongUS_Drip.mp3");
  if (!music_play) {
    audio.play();
    music_play = true;
  }
  // Get all of needed elements from the form using getElementById
  document.getElementById("m_table").innerHTML = "";
  var form = document.getElementById("input_form");
  var multiplier_bottom = document.getElementById("x1").value;
  var multiplier_top = document.getElementById("x2").value;
  var multiplicand_bottom = document.getElementById("y1").value;
  var multiplicand_top = document.getElementById("y2").value;
  var values = [x1, x2, y1, y2];
  var range = [];
  // Loop through and look for empty inputs and set them to NaN
  for (var i = 0; i < values.length; ++i) {
    if (values[i] == "") {
      values[i] = NaN;
    }
    // Creates a new array of the text numbers becoming real names to JavaScript
    range[i] = Number(values[i].value);
  }
  // Runs the test for any errors and creates the table respectively if there are none
  if (errorCheck(range)) {
    createTable(
      Number(multiplier_bottom),
      Number(multiplier_top),
      Number(multiplicand_bottom),
      Number(multiplicand_top)
    );
  } else {
    return false;
  }

  document.getElementById("m_table").style.visibility = "visible";
  form.reset();

  return false;
});
