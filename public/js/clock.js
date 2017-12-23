//	================= Maine South Dashboard - Clock =========================
//
//	Maine South Dashboard - Clock Javascript
//
//	Version 1.3
//
//	(c) 2015 by Alpri Else - Paladin Technologies
//
//	All rights reserved.
//
//	=========================================================================

//	========================= Updator Functions =========================
function clockStart()
{
	//	clockStart() continually checks if the JSON files are loaded to start the clock

	if(typeof calendar == 'object' && typeof schedule == 'object')
	{

		setTimeout(function(){ clockUpdater(); }, 1000);
	}
	else setTimeout(function(){ clockStart()}, 1000);
}
function clockUpdater()
{
	updateTime();
	updateDate();
	updateDayType();
	if(dayType != 0)
	{
		updatePeriod();
		updateCountDown();
		fillScheduleGrid();
	}
	setTimeout(function(){ clockUpdater()},1000);
}
function updateTime()
{
	//	updateTime() takes the currentMinuteOfDay and displays its formatted version on the site
	if($("#currTime").innerHTML = "...")
	{
		$('#currTime').addClass('animated fadeIn');
	}
	document.getElementById("currTime").innerHTML = U.convertTimeTo12Hour(currentMinuteOfDay);
}
function updateDate()
{
	//	updateDate() formats the date into readable text and displays it on the site

	var date = " ";
	date = U.returnMonth(currentMonth);
	date += " " + currentDayOfMonth + ", " + currentYear;

	//	Display
	if($("#currDate").innerHTML == undefined)
	{
		$('#currDate').addClass('animated fadeIn');
	}
	document.getElementById("currDate").innerHTML = date;
}

//	==================================== Logic Functions ====================================
function updatePeriod()
{
	//	updatePeriod() uses the currentMinute of day and compares it to the schedule to determin the current period

	//	Variable used to optimize for-loop
	var scheduleLength = scheduleType.length;
	for(var i = 0; i < scheduleLength; i++)
	{
		if(currentMinuteOfDay >= scheduleType[i].start && currentMinuteOfDay <= scheduleType[i].end)
		{
			if($("#currPeriod").innerHTML = "loading...")
			{
				$('#currPeriod').addClass('animated fadeIn');
			}
			$("#currPeriod").text(scheduleType[i].period);
			period = scheduleType[i].period;
			index = i;
			return;
		}
	}
}
function checkCalendar()
{
	//	checkCalendar() searches the calendar to see if the current day has a particular dayType

	//	Variable used to optimize for-loop
	var calendarLength = calendar.length;
	for(var i = 0; i < calendarLength; i++)
	{
		if(!calendar[i].dateRange)
		{
			if(calendar[i].year == currentYear && calendar[i].month == currentMonth && calendar[i].day == currentDayOfMonth)
			{
				return calendar[i].dayType;
			}
		}
		else
		{
			if(calendar[i].startDate.year >= currentYear && calendar[i].startDate.month >= currentMonth && calendar[i].startDate.day >= currentDayOfMonth)
			{
				if(calendar[i].endDate.year <= currentYear && calendar[i].endDate.month <= currentMonth && calendar[i].startDate.day <= currentDayOfMonth)
				{
					return calendar[i].dayType;
				}
			}
		}
	}
	return 0;
}
function updateDayType()
{
	//	updateDayType() takes the data return from checkCalendar() and determines the day's dayType

	var x = checkCalendar();
	if(x == -1) x = 0;
	if(x != 0)
	{
		switch(x)
		{
			case 2:
				scheduleType = schedule.lateStart;
				dayType = 2;
				dayTypeSTR = "Late-Start";
				break;
			case 3:
				scheduleType = schedule.hawkPride;
				dayType = 3;
				dayTypeSTR = "Hawk Pride";
				break;
			case 4:
				scheduleType = schedule.assemblyDay;
				dayType = 4;
				dayTypeSTR = "Assembly Day";
				break;
			case 5:
				scheduleType = schedule.testingDay;
				dayType = 5;
				dayTypeSTR = "Testing Day";
				break;
			case 6:
				scheduleType = schedule.finalsDayOne;
				dayType = 6;
				dayTypeSTR = "Finals - Day One";
				break;
			case 7:
				scheduleType = schedule.finalsDayTwo;
				dayType = 7;
				dayTypeSTR = "Finals - Day Two";
				break;
			case 8:
				scheduleType = schedule.finalsDayThree;
				dayType = 8;
				dayTypeSTR = "Finals - Day Three";
				break;
			case 9:
				scheduleType = schedule.parccTesting;
				dayType = 9;
				dayTypeSTR = "PARCC Testing";
				break;
			case 10:
				scheduleType = schedule.parccTesting2;
				dayType = 10;
				dayTypeSTR = "PARCC Testing";
				break;
			case 11:
				scheduleType = schedule.summerSchool;
				dayType = 11;
				dayTypeSTR = "Summer School";
				break;
			case 12:
				scheduleType = schedule.earlyDismissal;
				dayType = 12;
				dayTypeSTR = 'Early Dismissal';
				break;
			default:
				console.log("Error - updateDayType()" + x);
				break;
		}

	}
	else
	{
		//	If no date on the calendar, determine dayType using the currentDayOfWeek

		switch(currentDayOfWeek)
		{
			case 0:
			case 6:
				dayType = 0;
				dayTypeSTR = "No School";
				noschool();
				break;
			case 1:
			case 2:
			case 4:
			case 5:
				scheduleType = schedule.regular;
				dayType = 1;
				dayTypeSTR = "Regular Day";
				break;
			case 3:
				scheduleType = schedule.lateStart;
				dayType = 2;
				dayTypeSTR = "Late-Start Day"
				break;
			default:
				scheduleType = schedule.regular;
				dayType = 1;
				dayTypeSTR = "Regular Day";
				break;
		}
	}
	//	Display dayType
	if($("#currDaytype").innerHTML == undefined)
	{
		$('#currDaytype').addClass('animated fadeIn');
	}
	document.getElementById("currDaytype").innerHTML = dayTypeSTR;
}
function updateCountDown()
{
	//	updateCountDown() calculates formats the countdown depending on the period and dayType

	var countdown = "";

	//	Before and After School Handlers
	if(index == 0 && (dayType != 9 && dayType != 10)|| (index == 1 && (dayType == 1 || dayType == 2)))
	{
		countdown = "School starts at " + U.convertMinuteToTime(scheduleType[2].start) + " (" + (scheduleType[2].start - currentMinuteOfDay) + " minutes).";
		document.getElementById("currCountdown").innerHTML = countdown;
	}
	else if(index == 0 && (dayType == 9 || dayType == 10))
	{
		countdown = "PARCC Testing starts at " + U.convertMinuteToTime(scheduleType[1].start) + " (" + (scheduleType[1].start - currentMinuteOfDay) + " minutes).";
		document.getElementById("currCountdown").innerHTML = countdown;
	}
	else if(index == scheduleType.length - 2)
	{
		countdown = "School ends at " + U.convertMinuteToTime(scheduleType[scheduleType.length - 1].start) + " (" + (scheduleType[scheduleType.length - 1].start - currentMinuteOfDay) + " minutes).";
		document.getElementById("currCountdown").innerHTML = countdown;
	}

	//	Testing Handler
	if(index === 0 && dayType === 5)
	{
		countdown = "Testing starts at " + U.convertMinuteToTime(scheduleType[1].start) + " (" + (scheduleType[1].start - currentMinuteOfDay) + " minutes).";
		document.getElementById("currCountdown").innerHTML = countdown;
	}
	else if(dayType === 5 && index === 1)
	{
		countdown = "Testing ends at " + U.convertMinuteToTime(scheduleType[1].end) + " (" + (scheduleType[1].end - currentMinuteOfDay) + " minutes).";;
	}

	if(countdown == "" && typeof scheduleType[index] == 'object')
	{
		//	Period Countdoen Handlers
		if(scheduleType[index].period.substring(1, scheduleType[index].period.length) == "A")
		{
			countdown = scheduleType[index].period + " ends at " + U.convertMinuteToTime(scheduleType[index].end) + " (" + (scheduleType[index].end - currentMinuteOfDay) + " minutes).<br />";
			countdown += scheduleType[index + 2].period + " ends at " + U.convertMinuteToTime(scheduleType[index + 2].end) + " (" + (scheduleType[index + 2].end - currentMinuteOfDay) + " minutes).";
		}
		else if(scheduleType[index].period.substring(1, scheduleType[index].period.length) == "B" || scheduleType[index].period.length == 1 || scheduleType[index].period == "Lunch Break")
		{
			countdown = scheduleType[index].period + " ends at " + U.convertMinuteToTime(scheduleType[index].end) + " (" + (scheduleType[index].end - currentMinuteOfDay) + " minutes).";
		}
		else if(scheduleType[index].period.substring(scheduleType[index].period.length - 7,scheduleType[index].period.length) == "Passing")
		{
			countdown = scheduleType[index].period + " ends at " + U.convertMinuteToTime(scheduleType[index].end) + " (" + (scheduleType[index].end - currentMinuteOfDay) + " minutes).<br />";
			countdown += scheduleType[index + 1].period + " ends at " + U.convertMinuteToTime(scheduleType[index + 1].end) + " (" + (scheduleType[index + 1].end - currentMinuteOfDay) + " minutes).";
		}
		//	Special Case Handlers
		if(dayType == 1 || dayType == 3)
		{
			//	Hawk Talk and Hawk Pride handler
			if(index + 2 < scheduleType.length && (scheduleType[index + 2].period == "Hawk Talk" || scheduleType[index + 2].period == "Hawk Pride"))
			{
				countdown = scheduleType[index].period + " ends at " + U.convertMinuteToTime(scheduleType[index].end) + " (" + (scheduleType[index].end - currentMinuteOfDay) + " minutes).<br />";
				countdown += scheduleType[index + 1].period + " ends at " + U.convertMinuteToTime(scheduleType[index + 1].end) + " (" + (scheduleType[index + 1].end - currentMinuteOfDay) + " minutes).";
			}
			else if(scheduleType[index].period == "Hawk Talk")
			{
				countdown = "Hawk Talk ends at " + U.convertMinuteToTime(scheduleType[index].end) + " (" + (scheduleType[index].end - currentMinuteOfDay) + " minutes).";
			}
			else if(scheduleType[index].period == "Hawk Pride")
			{
				countdown = "Hawk Pride ends at " + U.convertMinuteToTime(scheduleType[index].end) + " (" + (scheduleType[index].end - currentMinuteOfDay) + " minutes).";
			}
		}
		//	Finals Handler
		if(dayType == 6 || dayType == 7 || dayType == 8)
		{
			if(index == 0)
				countdown = "Finals starts at " + U.convertMinuteToTime(scheduleType[1].start) + " (" + (scheduleType[1].start - currentMinuteOfDay) + " minutes).";
			else if(index == scheduleType.length - 2)
				countdown = "Finals ends at " + U.convertMinuteToTime(scheduleType[scheduleType.length - 1].start) + " (" + (scheduleType[scheduleType.length - 1].start - currentMinuteOfDay) + " minutes).";
			else if(scheduleType[index].period == "Break")
			{
				countdown = scheduleType[index].period + " ends at " + U.convertMinuteToTime(scheduleType[index].end) + " (" + scheduleType[index].end - currentMinuteOfDay + " minutes).";
				countdown += scheduleType
			}
			else
				countdown = scheduleType[index].period + " ends at " + U.convertMinuteToTime(scheduleType[index].end) + " (" + scheduleType[index].end - currentMinuteOfDay + " minutes).";
		}
		//	PARCC Testing Handler
		if(dayType == 9 || dayType == 10)
		{
			if(index == 1)
			{
				countdown = "PARCC Testing ends at " + U.convertMinuteToTime(scheduleType[1].end) + " (" + (scheduleType[1].end - currentMinuteOfDay) + " minutes).";;
			}
		}
	}

	//	Replaces "0 minutes" with "shortly"
	if(countdown.indexOf("(0 minutes") != -1)
	{
		countdown = countdown.substring(0,countdown.indexOf("(0 minutes")) + "(shortly)" + countdown.substring(countdown.indexOf("0 minutes") + 10,countdown.length);
	}

	//	If countdown is empty, add &nbsp; to retain site formatting
	if(countdown ==  "")
	{
		countdown = "&nbsp;";
	}

	//	Display countdown
	if($("#currCountdown").innerHTML == undefined)
	{
		$('#currCountdown').addClass('animated fadeIn');
	}
	document.getElementById("currCountdown").innerHTML = countdown;
}

function noschool()
{
	//	noschool() displays "No School" and replaces period with &nbsp to retain site formatting
	document.getElementById("currPeriod").innerHTML = "&nbsp;";
	$("#scheduleLoadingMessage").html("No School");;
}
