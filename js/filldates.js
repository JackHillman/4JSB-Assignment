var date = new Date();
var year = date.getFullYear();
var month = date.getMonth();

//Year

function makeYears(location)
{
	location = document.getElementById(location);
	for (i = year-5; i <= year+5; i++)
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
	for (i = 1; i <= 12; i++)
	{
		var opt = document.createElement('option');
		opt.value = i;
		opt.innerHTML = i;
		if (i === month+1)
		{
			opt.selected = true;
		}
		location.appendChild(opt)
	}
}