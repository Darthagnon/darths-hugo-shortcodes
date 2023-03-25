const AGENDA_DAYS = 20;
const DAYS_OF_WEEK = getDayNames('getLang');
const MONTHS = getMonthNames('getLang');
let ampm = (h) => (h < 12 || h === 24) ? "am" : "pm";

const url = new URL(window.location.href);
const loading = document.getElementById('loading');

const ical = url.searchParams.get('ical');
let show_title = url.searchParams.get('title') || 1;
const show_nav = url.searchParams.get('nav') || 1;
const show_date = url.searchParams.get('date') || 1;
const show_details = url.searchParams.get('details') || 0;
const show_view = url.searchParams.get('view') || 1;
const default_view = url.searchParams.get('dview') || 0;
const monday_start = url.searchParams.get('monstart') || 0;
const color = url.searchParams.get('color') || '#1A73E8';
const colorBG = url.searchParams.get('colorbg') || '#FFFFFF';
const colorText = url.searchParams.get('colortxt') || '#000000';
const colorThemeText = url.searchParams.get('colorsecondarytxt') || '#FFFFFF';

// locale detector based off StackOverflow, src: https://stackoverflow.com/questions/673905/how-to-determine-users-locale-within-browser, https://stackoverflow.com/questions/37221494/how-to-change-the-locale-in-chrome-browser
const getLang = () => navigator.language || navigator.browserLanguage || ( navigator.languages || [ "en" ] ) [ 0 ]

let today = new Date();
today.setHours(0,0,0,0);
let selectedDay = new Date(today.valueOf());
let selectedView = default_view;

// Localisation based off Cory LaViska's code (MIT), src: https://www.abeautifulsite.net/posts/getting-localized-month-and-day-names-in-the-browser/
function getDayNames(locale = 'en', format = 'long') {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: format, timeZone: 'UTC' });
  const days = [1, 2, 3, 4, 5, 6, 7].map(day => {
    const dd = day < 10 ? `0${day}` : day;
    return new Date(`2017-01-${dd}T00:00:00+00:00`);
  });
  return days.map(date => formatter.format(date));
}

function getMonthNames(locale = 'en', format = 'long') {
  const formatter = new Intl.DateTimeFormat(locale, { month: format, timeZone: 'UTC' });
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => {
    const mm = month < 10 ? `0${month}` : month;
    return new Date(`2017-${mm}-01T00:00:00+00:00`);
  });
  return months.map(date => formatter.format(date));
}

function getHumanDate(date) {
	return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,0)}-${date.getDate().toString().padStart(2,0)}`;
}

function createDateCell(date, todayd = false) {
	let day = date.getDay();
	let dateM = date.getDate();
	let month = date.getMonth();
	let dateCell = document.createElement('td');
	dateCell.tabIndex = '-1';
	dateCell.dataset.date = getHumanDate(date);
	dateCell.onfocus = () => {
		selectDay(getHumanDate(date), false)
	};
	if (todayd) {
		dateCell.className = 'today';
	}
	let dayEl = document.createElement('span');
	dayEl.className = 'dayname';
	dayEl.appendChild(document.createTextNode(DAYS_OF_WEEK[day].substring(0,3).toUpperCase()));
	dateCell.appendChild(dayEl);
	let dateEl = document.createElement('span');
	dateEl.className = 'day';
	let dateSpan = document.createElement('span');
	dateSpan.appendChild(document.createTextNode(dateM));
	dateEl.appendChild(dateSpan);
	dateCell.appendChild(dateEl);
	let monthEl = document.createElement('span');
	monthEl.className = 'month';
	monthEl.appendChild(document.createTextNode(MONTHS[month].substring(0,3).toUpperCase()));
	dateCell.appendChild(monthEl);
	return dateCell;
}

function selectDay(date, focus = true, events = null) {
	let newSelection = new Date(date + 'T00:00');
	let newMonth = false;
	if (selectedDay.getMonth() != newSelection.getMonth() && events != null) {
		renderMonth(events, newSelection);
		newMonth = true;
	}

	selectedDay = newSelection;

	document.querySelector('#date_label span').innerHTML = `${DAYS_OF_WEEK[selectedDay.getDay()]}, ${MONTHS[selectedDay.getMonth()]} ${selectedDay.getDate()}`;
	document.getElementById('date').value = getHumanDate(selectedDay);

	let selectedElement = document.querySelector(`td[data-date='${getHumanDate(selectedDay)}']`);
	if (selectedElement && (focus || newMonth)) {
		selectedElement.focus();
	}
}

function setView(newView, events) {
	selectedView = newView;
	if (selectedView == 1) {
		renderMonth(events);
		document.getElementById('agenda').classList.add('hidden');
	} else {
		renderAgenda(events);
		document.getElementById('month').classList.add('hidden');
	}
}

function eventDetails(event) {
	let startTime = `${(event.startDate.getHours() % 12) || 12}:${event.startDate.getMinutes() < 10 ? '0' : ''}${event.startDate.getMinutes()}`;
	let endTime = `${(event.endDate.getHours() % 12) || 12}:${event.endDate.getMinutes() < 10 ? '0' : ''}${event.endDate.getMinutes()}`;
	let startM = ampm(event.startDate.getHours());
	let endM = ampm(event.endDate.getHours());

	let eDetails = document.createElement('div');
	eDetails.className = 'details';

	let whenLabel = document.createElement('strong');
	whenLabel.appendChild(document.createTextNode('When: '));
	let when = document.createElement('span');
	when.className = 'when';
	let whenText = `${DAYS_OF_WEEK[event.startDate.getDay()].substring(0,3)}, ${MONTHS[event.startDate.getMonth()]} ${event.startDate.getDate()}, ${startTime}${startM} - ${endTime}${endM}`;
	if (event.days == 1 && event.allDay) {
		whenText = `${DAYS_OF_WEEK[event.startDate.getDay()]}, ${MONTHS[event.startDate.getMonth()].substring(0,3)} ${event.startDate.getDate()}, ${event.startDate.getFullYear()}`;
	} else if (event.days % 1 == 0 && event.allDay) {
		let newEnd = new Date(event.endDate.valueOf());
		newEnd.setDate(newEnd.getDate()-1);
		whenText = `${MONTHS[event.startDate.getMonth()].substring(0,3)} ${event.startDate.getDate()} - ${MONTHS[newEnd.getMonth()].substring(0,3)} ${newEnd.getDate()}, ${event.startDate.getFullYear()}`;
	} else if (event.days > 1) {
		whenText = `${MONTHS[event.startDate.getMonth()]} ${event.startDate.getDate()}, ${startTime}${startM} - ${MONTHS[event.endDate.getMonth()]} ${event.endDate.getDate()}, ${endTime}${endM}`;
	}

	when.appendChild(document.createTextNode(whenText));
	eDetails.appendChild(whenLabel);
	eDetails.appendChild(when);

	if (event.location != '') {
		eDetails.appendChild(document.createElement('br'));
		let whereLabel = document.createElement('strong');
		whereLabel.appendChild(document.createTextNode('Where: '));
		let where = document.createElement('span');
		where.className = 'where';
		let whereText = document.createTextNode(event.location);
		if (event.location.startsWith('http')) {
			whereText = document.createElement('a');
			whereText.href = event.location;
			whereText.target = '_blank';
			whereText.appendChild(document.createTextNode(event.location));
		}
		where.appendChild(whereText);
		eDetails.appendChild(whereLabel);
		eDetails.appendChild(where);
	}

	if (event.description != '') {
		eDetails.appendChild(document.createElement('br'));
		let descLabel = document.createElement('strong');
		descLabel.appendChild(document.createTextNode('Description: '));
		let desc = document.createElement('span');
		desc.className = 'description';
		desc.innerHTML = event.description;
		eDetails.appendChild(descLabel);
		eDetails.appendChild(desc);
	}

	return eDetails;
}

function renderAgenda(events) {
	// Filter after today
	events = events.filter((e) => {
		let end = new Date(e.endDate.valueOf());
		end.setHours(0,0,0,0);
		return end >= today;
	});

	// Create elements
	let days = [];
	let row;
	let column;
	let prevDay = null;
	let indicator = document.createElement('div');
	indicator.className = 'indicator';
	let nowDate = new Date();
	let now = `${(nowDate.getHours() % 12) || 12}:${nowDate.getMinutes() < 10 ? '0' : ''}${nowDate.getMinutes()}`;
	let nowM = ampm(nowDate.getHours());
	indicator.title = `${now} ${nowM}`;
	let indicatorset = false;
	let todayHasEvents = false;
	for (let i = 0; i < (events.length < AGENDA_DAYS ? events.length : AGENDA_DAYS); i++) {
		let tomorrow = new Date(today.valueOf());
		tomorrow.setDate(tomorrow.getDate() + 1);
		if (events[i].startDate > tomorrow && !todayHasEvents) {
			todayHasEvents = true;
			row = document.createElement('tr');
			row.appendChild(createDateCell(
				events[i].startDate,
				true
			));
			column = document.createElement('td');
			column.className = 'emptyday';
			column.appendChild(document.createTextNode('No events today'));
			row.appendChild(column);
			days.push(row);
		}
		if (prevDay != events[i].startDate.toDateString()) {
			prevDay = events[i].startDate.toDateString();
			row = document.createElement('tr');

			let curDay = new Date(events[i].startDate.valueOf());
			curDay.setHours(0,0,0,0);
			if (curDay.getTime() == today.getTime()) {
				todayHasEvents = true;
			}

			row.appendChild(createDateCell(
				events[i].startDate,
				curDay.getTime() == today.getTime()
			));
			column = document.createElement('td');
		}

		// Indicator
		let eventDay = new Date(events[i].endDate.valueOf());
		eventDay.setHours(0,0,0,0);
		if (nowDate < events[i].endDate && !indicatorset && today.getTime() == eventDay.getTime()) {
			column.appendChild(indicator);
			indicatorset = true;
		}

		let event = document.createElement('div');
		event.className = 'event';

		let summary = document.createElement('div');
		summary.className = 'summary';
		if (show_details == 0) {
			summary.tabIndex = '0';
			summary.onkeypress = (e) => {
				if (e.keyCode === 13) {
					event.classList.toggle('open');
				}
			};
			summary.onclick = () => event.classList.toggle('open');
		} else {
			event.className = 'event open always';
		}

		let eName = document.createElement('span');
		eName.className = 'name';
		eName.appendChild(document.createTextNode(events[i].name));
		summary.appendChild(eName);

		let startTime = `${(events[i].startDate.getHours() % 12) || 12}:${events[i].startDate.getMinutes() < 10 ? '0' : ''}${events[i].startDate.getMinutes()}`;
		let endTime = `${(events[i].endDate.getHours() % 12) || 12}:${events[i].endDate.getMinutes() < 10 ? '0' : ''}${events[i].endDate.getMinutes()}`;
		let startM = ampm(events[i].startDate.getHours());
		let endM = ampm(events[i].endDate.getHours());

		if (!events[i].allDay) {
			let eTime = document.createElement('span');
			eTime.className = 'time';
			let timeText = `${startTime} ${startM == endM ? '' : startM} - ${endTime} ${endM}`;
			if (events[i].days === 0) {
				timeText = `${startTime} ${startM}`;
			} else if (events[i].days > 1 && !events[i].allDay) {
				timeText = `${MONTHS[events[i].startDate.getMonth()]} ${events[i].startDate.getDate()}, ${startTime}${startM} - ${MONTHS[events[i].endDate.getMonth()]} ${events[i].endDate.getDate()}, ${endTime}${endM}`;
			}
			eTime.appendChild(document.createTextNode(timeText));
			summary.appendChild(eTime);
		}
		event.appendChild(summary);

		event.appendChild(eventDetails(events[i]));

		column.appendChild(event);

		if (events[i].endDate < nowDate && today.getTime() == eventDay.getTime()) {
			column.appendChild(indicator);
		}

		if (i+1 == events.length || events[i].startDate.toDateString() != events[i+1].startDate.toDateString()) {
			row.appendChild(column);
			days.push(row);
		}
	}

	let agenda = document.getElementById('agenda');
	agenda.innerHTML = '';
	agenda.classList.remove('hidden');
	for (let i = 0; i < days.length; i++) {
		agenda.appendChild(days[i]);
	}

	// Empty state
	if (events.length == 0) {
		let emptystate = document.createElement('tr');
		emptystate.id = 'emptystate';
		let emptydata = document.createElement('td');
		emptydata.appendChild(document.createTextNode('No upcoming events'));
		emptystate.appendChild(emptydata);
		agenda.appendChild(emptystate);
	}
}

function showMonthDetails(event) {
	let details = document.getElementById('monthDetails');

	document.querySelector('#monthDetails .summary').innerHTML = event.name;

	document.querySelector('#monthDetails .details').innerHTML = '';
	document.querySelector('#monthDetails .details').appendChild(eventDetails(event));

	details.classList.add('shown');
}

function renderMonth(events, fromDay = new Date(today.valueOf())) {
	let monthStartDate = new Date(fromDay.getFullYear(), fromDay.getMonth(), 1);
	let monthEndDate = new Date(fromDay.getFullYear(), fromDay.getMonth() + 1, 0);
	while (monthStartDate.getDay() != monday_start) {
		monthStartDate.setDate(monthStartDate.getDate() - 1);
	}
	while (monthEndDate.getDay() != (monday_start == 1 ? 0 : 6)) {
		monthEndDate.setDate(monthEndDate.getDate() + 1);
	}
	let days = (monthEndDate - monthStartDate) / (24 * 60 * 60 * 1000) + 1;
	let weeks = days/7;

	let rows = [];

	// Labels
	let labelRow = document.createElement('tr');
	labelRow.className = 'labels';
	for (let i = 0; i < 7; i++) {
		let label = document.createElement('td');
		let n = i + parseInt(monday_start);
		label.appendChild(document.createTextNode(DAYS_OF_WEEK[(n == 7 ? 0 : n)].substring(0,3)));
		labelRow.appendChild(label);
	}
	rows.push(labelRow);

	let day = new Date(monthStartDate.valueOf());
	for (let i = 0; i < weeks; i++) {
		let weekRow = document.createElement('tr');
		for (let j = 0; j < 7; j++) {
			let dayCell = document.createElement('td');
			dayCell.dataset.date = getHumanDate(day);
			dayCell.onfocus = () => {
				selectDay(dayCell.dataset.date, false, events);
			};
			dayCell.tabIndex = '-1';
			if (day < today) {
				dayCell.className = 'past';
			}
			let dateEl = document.createElement('span');
			dateEl.classList.add('date');
			if (day.getMonth() == fromDay.getMonth()) {
				dateEl.classList.add('current');
			}
			if (getHumanDate(day) == getHumanDate(today)) {
				dateEl.classList.add('today');
			}
			let dateText = document.createElement('span');
			dateText.appendChild(document.createTextNode(day.getDate()));
			dateEl.appendChild(dateText);
			dayCell.appendChild(dateEl);

			let dayEvents = events.filter((e) => getHumanDate(e.startDate) == getHumanDate(day));

			for (let e = 0; e < dayEvents.length; e++) {
				let event = document.createElement('div');
				event.className = 'event';
				event.tabIndex = '0';
				event.appendChild(document.createTextNode(dayEvents[e].name));
				event.onkeypress = (e) => {
					if (e.keyCode === 13) {
						showMonthDetails(dayEvents[e]);
					}
				};
				event.onclick = () => {showMonthDetails(dayEvents[e])};
				dayCell.appendChild(event);
			}
			weekRow.appendChild(dayCell);

			day.setDate(day.getDate()+1);
		}
		rows.push(weekRow);
	}

	let topHeight = 0;
	let topEl = document.getElementById('top');
	if (topEl.style.display != 'none') {
		topHeight = topEl.clientHeight;
	}
	let monthEl = document.getElementById('month');
	monthEl.style.height = `calc(100vh - ${topHeight+8}px)`;
	monthEl.innerHTML = '';
	monthEl.classList.remove('hidden');
	for (let i = 0; i < rows.length; i++) {
		monthEl.appendChild(rows[i]);
	}
}

function renderCalendar(meta, events) {
	// Sort events
	events.sort((a,b) =>  a.startDate - b.startDate);

	// Title
	if (show_title == 1) {
		show_title = meta.calname != null;
	}
	if (show_title == 1) {
		document.getElementById('title').innerHTML = meta.calname;
	} else {
		document.getElementById('title').style.display = 'none';
	}

	// Nav
	let btn_today = document.getElementById('btn_today');
	let arrows = document.getElementById('arrows');
	btn_today.onclick = () => {
		// Scroll to today
		selectDay(getHumanDate(today), true, events);
	};
	document.getElementById('btn_prev').onclick = () => {
		let prevDay = new Date(selectedDay.valueOf());
		prevDay.setDate(prevDay.getDate() - 1);
		selectDay(getHumanDate(prevDay), true, events);
	};
	document.getElementById('btn_next').onclick = () => {
		let prevDay = new Date(selectedDay.valueOf());
		prevDay.setDate(prevDay.getDate() + 1);
		selectDay(getHumanDate(prevDay), true, events);
	};
	if (show_nav == 0) {
		btn_today.style.display = 'none';
		arrows.style.display = 'none';
	}

	// View
	let view = document.getElementById('view');
	view.value = default_view;
	view.onchange = () => {
		setView(view.value, events);
	};
	if (show_view == 0) {
		view.style.display = 'none';
	}

	// Date
	let date_label = document.getElementById('date_label');
	let date_input = document.getElementById('date');
	document.querySelector('#date_label span').innerHTML = `${DAYS_OF_WEEK[selectedDay.getDay()]}, ${MONTHS[selectedDay.getMonth()]} ${selectedDay.getDate()}`;
	date_input.value = getHumanDate(selectedDay);
	date_input.onchange = () => {
		selectDay(date_input.value, true, events);
	};
	if (show_date == 0) {
		date_label.style.display = 'none';
	}

	// Remove nav element
	if (show_title == 0 && show_nav == 0 && show_date == 0 && show_view == 0) {
		document.getElementById('top').style.display = 'none';
	}

	// Colors
	document.documentElement.style.setProperty('--theme-color', color);
	document.documentElement.style.setProperty('--text-color', colorText);
	document.documentElement.style.setProperty('--background-color', colorBG);
	document.documentElement.style.setProperty('--theme-text-color', colorThemeText);

	setView(selectedView, events);

	loading.style.display = 'none';
}

function parseCalendar(data) {
	let jCal = ICAL.parse(data);
	let comp = new ICAL.Component(jCal);

	const meta = {
		calname: comp.getFirstPropertyValue('x-wr-calname'),
		timezone: new ICAL.Timezone(comp.getFirstSubcomponent('vtimezone')).tzid,
		caldesc: comp.getFirstPropertyValue('x-wr-caldesc')
	};

	let eventData = comp.getAllSubcomponents('vevent');
	let events = [];

	// Copy event data to custom array
	for (let i = 0; i < eventData.length; i++) {
		let event = new ICAL.Event(eventData[i]);
		let duration = event.endDate.subtractDate(event.startDate);
		events.push({
			uid: event.uid,
			name: event.summary,
			location: event.location,
			description: event.description,
			startDate: event.startDate.toJSDate(),
			endDate: event.endDate.toJSDate(),
			allDay: event.startDate.isDate,
			days: (duration.toSeconds()/86400)
		});
		if (event.isRecurring()) {
			let expand = new ICAL.RecurExpansion({
				component: eventData[i],
				dtstart: event.startDate
			});

			let j = 0;
			let next;
			while (j < 10 && (next = expand.next())) {
				if (j > 0) {
					let endDate = next.clone();
					endDate.addDuration(duration);
					events.push({
						uid: event.uid,
						name: event.summary,
						location: event.location,
						description: event.description,
						startDate: next.toJSDate(),
						endDate: endDate.toJSDate(),
						allDay: event.startDate.isDate,
						days: (duration.toSeconds()/86400)
					});
				}
				j++;
			}
		}
	}
	renderCalendar(meta, events);
}

if (ical) {
	fetch(ical).then((response) => {
		response.text().then((text) => {
			parseCalendar(text);
		});
	}).catch((e) => {
		console.error(e);
		loading.innerHTML = "Error: iCal URL doesn't exist or isn't valid<br><br>iCal links (like those from Google calendar) will need to use a cors proxy";
	});
} else {
	loading.innerHTML = "Error: no iCal URL provided";
}
