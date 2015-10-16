var date = new Date(),
	year = date.getFullYear(),
	month = date.getMonth()

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
		// Delete the error message before continuing
		old.parentNode.removeChild(old);
	}
	
	// Define location the append the error messages
	var loc = document.getElementById("buttons");
	// Define the location to append the success message
	var final = document.getElementById("main");
	var email = /\S+@\S+\.\S+/;
	var postcode = /^\d{4}$/;
	var ccnum = /^\d{16}$/;
	var ccv = /^\d{3}$/;
	
	function makeError(main, body)
	{
		var err = document.createElement("div");
		err.className = "alert alert-danger";
		err.id = "err"
		err.innerHTML = "<strong>" + main + " </strong>" + body;
		loc.appendChild(err);
	}
	
	if (!email.test(info.email))
	{
		makeError("Error!", "Invalid email address!");
		document.forms["form"]["email"].select();
		return false
	}
	else if (!postcode.test(info.pcode))
	{
		makeError("Error!", "Postcode must be a 4 digit number!");
		document.forms["form"]["pcode"].select();
		return false;
	}
	else if (!ccnum.test(info.ccnum))
	{
		makeError("Error!", "Credit card number must be valid!");
		document.forms["form"]["ccnum"].select();
		return false;
	}
	else if (!ccv.test(info.ccv))
	{
		makeError("Error!", "CCV must be 3 digits!");
		document.forms["form"]["ccv"].select();
		return false;
	}
	else if (info.year < year || (info.year = year && info.month < month))
	{
		makeError("Error!", "Credit card has expired!");
		return false;
	}
	else{
		document.getElementById("form").className = "hide";
		var success = document.createElement("div");
		success.className = "alert alert-success";
		success.innerHTML = "<strong>Success!</strong> You've successfully submitted this form!";
		final.appendChild(success);
	}
	// So the form doesn't actually submit
	return false;
}

function helpClick()
{
	window.open("html/help.html", "Help", "status = 0, height = 250px, width = 400px, menubar = no");
	return;
}

function otherSites()
{
	var choice;
	try
	{
		var prompt = window.prompt("Choose a website to go to:\n\n1: Google\n2: Yahoo\n3: Moodle");
		
		if (prompt === null)
		{
			throw null;
		}
		else if (isNaN(parseInt(prompt)))
		{
			throw "NaN";
		}
		else
		{
			choice = parseInt(prompt);
		}
	}
	catch(e)
	{
		console.log(e);
		switch (e)
		{
			case null:
				return;
				break;

			case "NaN":
				window.alert("Error! Please enter a number!");
				otherSites();
				return;
				break;
		}
	}
	
	switch(choice)
	{
		case 1:
			window.open("http://google.com");
			break;
			
		case 2:
			window.open("http://yahoo.com");
			break;
			
		case 3:
			window.open("http://learn.tafesa.edu.au");
			break;
			
		default:
			window.alert("Error! Please input an accepeted number!");
			otherSites();
			return;
			break;
	}
}