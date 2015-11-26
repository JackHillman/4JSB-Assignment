/*

Written By Jack Hillman - 17-10-15

*/

// Get dates, this is called from the filldates.js file
var date = new Date(),
	year = date.getFullYear(),
	month = date.getMonth()
	
////////////////////////////////////////////////////////////////////////
// submitCheck is called on form submit
////////////////////////////////////////////////////////////////////////

function submitCheck()
{
	// Create an object containing the values from the form
	var info = {
		fname: document.forms["form"]["fname"].value,
		lname: document.forms["form"]["lname"].value,
		pcode: document.forms["form"]["pcode"].value,
		email: document.forms["form"]["email"].value,
		cctype: document.forms["form"]["cctype"].value,
		ccnum: document.forms["form"]["ccnum"].value,
		ccv: document.forms["form"]["ccv"].value,
		month: document.forms["form"]["month"].value,
		year: document.forms["form"]["year"].value
	}
	
	// Define var for error messages
	var old = document.getElementById("err");
	// If an error message exists
	if (old)
	{
		// Delete the error message before continuing to make room for future messages
		old.parentNode.removeChild(old);
	}
	
	// Define location the append the error messages
	var loc = document.getElementById("buttons");
	// Define the location to append the success message
	var final = document.getElementById("main");
	// Define regex tests
	var email = /\S+@\S+\.\S+/; // Must be (not-white-space)@(not-white-space).(not-white-space)
	var pcode = /^\d{4}$/; // Must be a 4 digits
	var ccnum = /^\d{16}$/; // Must be 16 digits
	var ccv = /^\d{3}$/; // Must be 3 digits
	
	// Small function to create error messages, takes parameters for bold text and normal text
	function makeError(main, body)
	{
		// Create a new DOM element
		var err = document.createElement("div");
		// Set class to Bootstraps danger alert
		err.className = "alert alert-danger";
		// Set id to err (for clearing error messages as seen towards the top)
		err.id = "err"
		// Set the content to the bold main param and normal body param
		err.innerHTML = "<strong>" + main + " </strong>" + body;
		// Append to the end of loc (under the buttons)
		loc.appendChild(err);
	}
	
	// Check for empty input fields
	var formArray = document.forms[0].elements;
	for (i = 0; i < formArray.length; i++)
	{
		var a = formArray[i];
		if (a.tagName == "INPUT" && a.value == "")
		{
			makeError("Incomplete!", "Field '" + a.placeholder + "' must be completed!");
			a.select();
			return false;
			break;
		}
	}
	
	// One big error test, uses else if so the user won't get spammed with errors if they have more than one
	// If postcode fails regex test
	if (!pcode.test(info.pcode))
	{
		// Make error
		makeError("Error!", "Postcode must be a 4 digit number!");
		// Set focus to postcode
		document.forms["form"]["pcode"].select();
	}
	// If email fails regex test
	else if (!email.test(info.email))
	{
		// Make error
		makeError("Error!", "Invalid email address!");
		// Set focus to email field
		document.forms["form"]["email"].select();
	}
	// If ccnum fails regex test
	else if (!ccnum.test(info.ccnum))
	{
		// Make error
		makeError("Error!", "Credit card number must be valid!");
		// Set focus to credit card number
		document.forms["form"]["ccnum"].select();
	}
	// If ccv fails regex test
	else if (!ccv.test(info.ccv))
	{
		// Make error
		makeError("Error!", "CCV must be 3 digits!");
		document.forms["form"]["ccv"].select();
	}
	// If expiry is before current year or before current month on the current year
	else if (info.year < year || (info.year = year && info.month < month))
	{
		// Make error
		makeError("Error!", "Credit card has expired!");
	}
	else{
		// Hide form using bootstraps default hide class
		document.getElementById("form").className = "hide";
		// Create success message
		var success = document.createElement("div");
		success.className = "alert alert-success";
		success.innerHTML = "<strong>Success!</strong> You've successfully submitted this form!";
		final.appendChild(success);
	}
	// So the page doesn't refresh on submit, the form isn't ever submitted
	return false;
}

////////////////////////////////////////////////////////////////////////
// helpClick is called on the Help button click
////////////////////////////////////////////////////////////////////////

function helpClick()
{
	// Open help window with no navigation or status bars at 400px by 250px
	window.open("html/help.html", "Help", "status = no, location = no, menubar = no, titlebar = no, toolbar = no, resizable = no, height = 250px, width = 400px");
	return;
}

////////////////////////////////////////////////////////////////////////
// otherSites is called on Go to other sites button click
////////////////////////////////////////////////////////////////////////

function otherSites()
{
	// Init vars for width, height and url to open
	var choice, width, height, url;
	
	// While the site to goto is not a number or outside the number range
	while ((isNaN(parseInt(prompt))) || parseInt(prompt) < 1 || parseInt(prompt) > 3)
	{
		// Prompt user for new selection
		var prompt = window.prompt("Choose a website to go to:\n\n1: Google\n2: Yahoo\n3: Moodle");
		// If user cancels or exits prompt, exit function
		if (prompt === null) {return}
	}
	
	// parse prompt
	choice = parseInt(prompt);
	
	// Set url var switch
	switch(choice)
	{
		case 1:
			url = "http://google.com";
			break;
			
		case 2:
			url = "http://yahoo.com";
			break;
			
		case 3:
			url = "http://learn.tafesa.edu.au";
			break;
	}
	
	// If height is NaN or less than 300 
	while (isNaN(parseInt(height)) || height < 300)
	{
		// Prompt user for height
		height = window.prompt("Enter a height for the window:", "300");
		// If user cancels or exits prompt, exit function
		if (height == null) {return}
	}
	// If width is NaN or less than 300
	while (isNaN(parseInt(width)) || width < 300)
	{
		// Prompt user for width
		width = window.prompt("Enter a width for the window", "300");
		// If user cancels or exits prompt, exit function
		if (width == null) {return}
	}
	
	// Open new window to url, with no title & with height and width set
	window.open(url, "", "height = " + height + " width = " + width);
	// Return null
	return;
	
}