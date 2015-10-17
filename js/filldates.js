// Create and array containing the month names
var monthName = new Array(
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
)

// Fill year dropdown
function makeYears(location)
{
	// Select location element
	location = document.getElementById(location);
	// For 2 years proir and 8 years in the future
	for (var i = year-2; i <= year+8; i++)
	{
		// Create new DOM element
		var opt = document.createElement('option');
		// Set the value to i
		opt.value = String(i);
		// Set the contents to i
		opt.innerHTML = String(i);
		// If i is the current year
		if (i === year)
		{
			// Set it to selected
			opt.selected = true;
		}
		// Append each element
		location.appendChild(opt)
	}
}

// Fill month dropdown
function makeMonths(location)
{	
	// Set location element
	location = document.getElementById(location);
	// For the 12 months
	for (var i = 0; i <= 11; i++)
	{
		// Create new DOM element
		var opt = document.createElement('option');
		// Set the value to i
		opt.value = String(i);
		// Set the contents to the monthName of i
		opt.innerHTML = monthName[i]
		// If i is the current month
		if (i === month)
		{
			// Set it to selected
			opt.selected = true;
		}
		// Append each element
		location.appendChild(opt)
	}
}