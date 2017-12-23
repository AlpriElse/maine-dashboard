//	================= Maine South Dashboard - Util Class =========================
//
//	Maine South Dashboard - Utilities Class Javascript
//
//	Version 1.0
//
//	(c) 2015 by Alpri Else - Paladin Technologies
//
//	All rights reserved.
//
//	==============================================================================

function Util()
{
	this.convertMinuteToTime = function(minutes)
	{
		var time = "";
		var hour = parseInt(minutes / 60);
		var minute = minutes - hour * 60;
		if(hour < 10)
		{
			time = "0";
		}
		time += hour;
		time += ":"
		if(minute < 10)
		{
			time += "0";
		}
		time += minute + " " ;//+ twelveHrPeriod;
		return time;
	}
	this.convertTimeTo12Hour = function(minutes)
	{
		var time = "";
		var hour = parseInt(minutes / 60);
		var minute = minutes - hour * 60;
		if(hour > 12)
		{
			twelveHrPeriod = "PM";
			hour -= 12;
		}
		else
			twelveHrPeriod = "AM";
		if(hour < 10)
			time = "0"
		time += hour;
		time += ":"
		if(minute < 10)
			time += "0";
		time += minute;
		return time;
	}
	this.isPM = function(minutes)
	{
		var hour = parseInt(minutes / 60);
		if(hour >= 12) return true;
		return false;
	}
	this.returnDay = function(day)
	{
		switch(day)
		{
			case 1:
				return "Mon";
			case 2:
				return "Tues";
			case 3:
				return "Wens";
			case 4:
				return "Thurs";
			case 5:
				return "Fri";
			case 6:
				return "Sat";
			case 7:
				return "Sun";
			default:
				return "Error";
		}
	}
	this.returnMonth = function(month)
	{
		switch(month)
		{
			case 1:
				return "Jan";
			case 2:
				return "Feb";
			case 3:
				return "Mar";
			case 4:
				return "Apr";
			case 5:
				return "May";
			case 6:
				return "Jun";
			case 7:
				return "Jul";
			case 8:
				return "Aug";
			case 9:
				return "Sept";
			case 10:
				return "Oct";
			case 11:
				return "Nov";
			case 12:
				return "Dec";
			default:
				console.log("Error - returnMonth()")
		}
	}
	this.formatDate = function(year, month, day)
	{
		return this.returnMonth(month) + " " + day + ", " + year;
	}
	this.findNumOfDaysInMonth = function(x)
	{
		switch(x)
		{
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				return 31;
			case 4:
			case 6:
			case 9:
			case 11:
				return 30;
			case 2:
				return 28;
			default:
				return -1;

		}
	}
	this.convertDateToDaysInYear = function(month, day)
	{
		var total = 0;
		for(var i = 0; i < month; i++)
		{
			total += this.findNumOfDaysInMonth(i);
		}
		total += day;
		return total;
	}
	this.calculateCountdown =  function(year, month, day)
	{
		if(currentYear > year || (currentMonth > month && currentYear == year) || (currentMonth == month && currentDayOfMonth > day))
		{
			return -1;
		}
		else if(currentYear == year)
	    {
	        if(currentMonth == month)
	        {
	            if(currentDayOfMonth == day) return "Today";
	            else if(day - currentDayOfMonth == 1) return day - currentDayOfMonth + " day";
	            return "" + day - currentDayOfMonth + " days";
	        }
	        else return this.convertDateToDaysInYear(month, day) - this.convertDateToDaysInYear(currentMonth, currentDayOfMonth)+ " days";
	    }
	    else
	    {
	    	return this.convertDateToDaysInYear(month, day) + (365 - this.convertDateToDaysInYear(currentMonth, currentDayOfMonth)) + " days";
	    }
	}
	this.returnDayTypeSTR = function(dayTypeINT)
	{
		switch(dayTypeINT)
		{
			case 1:
				return "Regular"
			case 2:
				return "Late-Start"
			case 3:
				return "Hawk Pride"
			case 4:
				return "Assembly"
			case 5:
				return "Testing Day"
			case 6:
				return "Finals - Day One"
			case 7:
				return "Finals - Day Two"
			case 8:
				return "Finals - Day Three"
			case 9:
				return "PARCC Testing";
			case 10:
				return "PARCC Testing Type 2";
		}
	}
	//	---------------------- JSON HTTP Request Functions ----------------------
	this.getCalendarJSON = function()
	{
		var hr = new XMLHttpRequest();
		hr.open("GET", "/json/calendar.json", true);
		hr.setRequestHeader("Content-type", "apllication/json", true);
		hr.onreadystatechange = function ()
		{
			if(hr.readyState == 4 && hr.status == 200)
			{
				calendar = JSON.parse(hr.responseText.toString()).Calendar;
				// console.log("Calendar Parsed!")
				// console.log(calendar);
				return calendar;
			}
		}
		hr.send(null);
	}
	this.getScheduleJSON = function()
	{
		var hr = new XMLHttpRequest();
		hr.open("GET", "/json/schedules.json", true);
		hr.setRequestHeader("Content-type", "apllication/json", true);
		hr.onreadystatechange = function ()
		{
			if(hr.readyState == 4 && hr.status == 200)
			{
				schedule = JSON.parse(hr.responseText.toString());
				// console.log("Schedule Parsed!");
				// console.log(schedule);
				return schedule;
			}
		}
		hr.send(null);
	}


}
