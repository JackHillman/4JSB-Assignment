/*

Written By Jack Hillman - 17-10-15

::PSUDO CODE::

	submitCheck()
		INPUT
			info.object <containing form elements>
				.fname <First Name>
				.lname <Last Name>
				.email <Email>
				.postcode <Postcode>
				.ccnum <Credit Card Number>
				.ccv <CCV>
				.month <Expirery Month>
				.year <Expirery Year>
			final.element <location to put success message>
			email(x@x.x), postcode(4 digits), ccnum(16 digits) & ccv(3 digits) <regex to be tested>
			year, month <current year and month>
		END INPUT
			
		DEFINE FUNCTION makeError(main, body)
			CREATE err.element
			ADD err main & body
			APPEND err to loc.element
		END FUNCTION
		
		IF info.email != email.regex
			makeError()
			FOCUS email
		ELSE IF info.postcode != postcode.regex
			makeError()
			FOCUS postcode
		ELSE IF info.ccnum != ccnum.regex
			makeError()
			FOCUS ccnum
		ELSE IF info.ccv != ccv.regex
			makeError()
			FOCUS ccv
		ELSE IF info.year < year OR (info.year = year AND info.month < month)
			makeError()
		ELSE
			HIDE form
			OUTPUT success
		END IF
		
		RETURN false
		
	helpClick()
		OPEN NEW-WINDOW to html/help.html
	
::DESK CHECK::

	INPUT
		fName: Test
		lName: Test
		email: test.com
		postcode: 12345
		ccnum: 1234 1234 1234 1234
		ccv: 123
		month: 9
		year: 2015
		
	CALC
		IS fName != null
			true
		IS lName != null
			true
		IS email = x@x.x
			false <= ERROR
		IS postcode = xxxx
			false <= ERROR
		IS ccnum = xxxxxxxxxxxxxxxx
			true
		IS ccv = xxx
			true
		IS month >= 10 WHEN year < 2015
			false <= ERROR
		IS year >= 2015
			true
			
	OUTPUT
		ERROR (email, postcode, month)
		
::DESK CHECK::		
		
	INPUT
		fName: 
		lName:
		email: test@test.com
		postcode: 1234
		ccnum: PayPal
		ccv: 1234
		month: 11
		year: 2015
		
	CALC
		IS fName != null
			false <= ERROR
		IS lName != null
			false <= ERROR
		IS email = x@x.x
			true
		IS postcode = xxxx
			true
		IS ccnum = xxxxxxxxxxxxxxxx
			false <= ERROR
		IS ccv = xxx
			false <= ERROR
		IS month >= 10 WHEN year < 2015
			true
		IS year >= 2015
			true
			
	OUTPUT
		ERROR (fName, lName, ccnum, ccv)
		
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
	var postcode = /^\d{4}$/; // Must be a 4 digits
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
	
	// One big error test, uses else if so the user won't get spammed with errors if they have more than one
	// If email fails regex test
	if (!email.test(info.email))
	{
		// Make error
		makeError("Error!", "Invalid email address!");
		// Set focus to email field
		document.forms["form"]["email"].select();
	}
	// If postcode fails regex test
	else if (!postcode.test(info.pcode))
	{
		// Make error
		makeError("Error!", "Postcode must be a 4 digit number!");
		// Set focus to postcode
		document.forms["form"]["pcode"].select();
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