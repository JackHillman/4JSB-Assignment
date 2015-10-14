var monthName = new Array()

monthName[0] = "January";
monthName[1] = "February";
monthName[2] = "March";
monthName[3] = "April";
monthName[4] = "May";
monthName[5] = "June";
monthName[6] = "July";
monthName[7] = "August";
monthName[8] = "September";
monthName[9] = "October";
monthName[10] = "November";
monthName[11] = "December";


//Year

function makeYears(location)
{
	location = document.getElementById(location);
	for (var i = year-5; i <= year+5; i++)
	{
		var opt = document.createElement('option');
		opt.value = i;
		opt.innerHTML = i;
		if (i === year)
		{
			opt.selected = true;
		}
		location.appendChild(opt)
	}
}

//Month

function makeMonths(location)
{	
	location = document.getElementById(location);
	for (var i = 0; i <= 11; i++)
	{
		var opt = document.createElement('option');
		opt.value = i;
		opt.innerHTML = monthName[i]
		if (i === month)
		{
			opt.selected = true;
		}
		location.appendChild(opt)
	}
}