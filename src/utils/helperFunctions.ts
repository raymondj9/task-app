export const HMStoInteger = (timeString: string) => {
	const arr = timeString.split(":");
	const seconds = Number(arr[0])*3600 + Number(arr[1])*60+(+Number(arr[2]));
	return seconds;
}

export const IntegerToHMS = (seconds: number) => {
	const result = new Date(seconds * 1000).toISOString().slice(11, 19);
	return result.split(':')[0]+":"+result.split(':')[1];
}

export const toHHMM = (seconds: number) => { 
	var hours = Math.floor(seconds / 60);  
	var minutes = seconds % 60;
	return hours + ":" + minutes; 
 }

export const getTimeZone = () => {
	var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
	return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
}

export const formatDate = (date: Date) => {
	if (!(date instanceof Date)) {
		date = new Date(date)
	}
    var d = date,
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export const formatTime = (date: Date) => {
	if (!(date instanceof Date)) {
		date = new Date(date)
	}
    var d = date,
        hours = '' + (d.getUTCHours() + 1),
        mins = '' + d.getUTCMinutes(),
		off = '' + d.getUTCDate();

    return [hours, mins].join(':');
}

export const timeCheck = (time: any) => {
	if (!(time instanceof Date)) {
		if(!isNaN(time)) {
			var t = new Date(1970, 0, 1);
			t.setSeconds(time);
			return t;
		}
		time = new Date(time)
	}
    return time;
}
