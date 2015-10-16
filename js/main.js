var date = new Date(),
	year = date.getFullYear(),
	month = date.getMonth()

function submitCheck()
{
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
	
	var old = document.getElementById("err");
	if (old)
	{
		old.parentNode.removeChild(old);
	}
	
	// Check if any are empty
	for (key in info)
	{
		// If value is empty
		if (!info[key])
		{
			// Disable submit
			return false;
		}
	}
	
	var loc = document.getElementById("buttons");
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
	return false;
}

function helpClick()
{
	window.open("html/help.html", "Help", "status = 0, height = 250px, width = 400px, menubar = no");
	return;
}