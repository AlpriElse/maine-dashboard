//	=============== Maine South Dashboard - Schedule ========================
//
//	Maine South Dashboard - Schedule Javascript
//
//	Version 1.0
//
//	(c) 2015 by Alpri Else - Paladin Technologies
//
//	All rights reserved.
//
//	************** Schedule Script uses variables from clock.js *************
//
//	=========================================================================
function fillScheduleGrid()
{
	document.getElementById("currSchedule").innerHTML = "<thead><tr><th>Period</th><th>Start</th><th>End</th></tr></thead><tbody>";

	for(var i = 0; i < scheduleType.length; i++)
	{
		if(scheduleType[i].period.indexOf("Passing") == -1 && scheduleType[i].period.indexOf("ATM") == -1)
		{
			if(period == scheduleType[i].period)
				document.getElementById("currSchedule").innerHTML += "<tr id='scheduleRow'><td style='color: black'>" + scheduleType[i].period + "</td><td style='color: black'>" + U.convertTimeTo12Hour(scheduleType[i].start) + "</td><td style='color: black'>" + U.convertTimeTo12Hour(scheduleType[i].end) + "</td></tr>";
			else
				document.getElementById("currSchedule").innerHTML += "<tr id='scheduleRow'><td style='color: white'>" + scheduleType[i].period + "</td><td>" + U.convertTimeTo12Hour(scheduleType[i].start) + "</td><td>" + U.convertTimeTo12Hour(scheduleType[i].end) + "</td></tr>";
	
		}
			
	}
	document.getElementById("currSchedule").innerHTML += '</tbody>';
	$("#scheduleLoadingMessage").slideUp();
	setTimeout( function() { $("#currScheduleContainer").slideDown("slow","swing"); }, 500);
}