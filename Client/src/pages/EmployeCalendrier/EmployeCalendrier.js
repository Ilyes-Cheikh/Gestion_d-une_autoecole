import React from 'react'
import moment from 'moment';
import './EmployeCalendrier.css'
import Axios from 'axios'
import EventFormDialog from '../AdminCalendrier/Eventform';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Icon from '@material-ui/core/Icon';
import SidebarEmploye from '../../components/Sidebar/SideBarEmploye';
import Swal from 'sweetalert2'



const { Fragment, useState, useEffect, useCallback } = React;

// ---- spanish
moment.locale("es");

// ---- calendar wrapper
const Calendar = (props) => <div className="calendar">{props.children}</div>;

// ---- calendar header
const Header = (props) => <header className="header">{props.children}</header>;


// ---- column component for calendar header
const Column = (props) => <div className={props.align}>{props.children}</div>;

// ---- button component
const Button = (props) => (
	<button type="button" title={props.text} aria-label={props.text} {...props}>
		{(props.icon) ? (<i className={props.icon}></i>) : props.text}
	</button>
);

// ---- week days
const WeekDays = (props) => {
	let m = moment().weekday();
	// map week names
	return (
		<ul className="weekdays">
			{moment.weekdays(true).map((item, i) => (
				<li key={i.toString()} className={m == i && "today"}>
					{item}
				</li>
			))}
		</ul>
	);
};

// ---- month events
const MonthEvents = (props) =>
	props.data &&
	props.data.map((c) => {
		let arr = c.date.split("T")[0].split("-");
		if (arr[0] === props.year && arr[1] === props.month && arr[2] === props.day) {
			return (
				<div className={`ev ${(c.type) && 'label_' + c.type}`} onClick={() => props.fn(c)}>
					<div className="ev-desc">
						<b style={{ fontWeight: 'bold', fontSize: '16px', textTransform: 'uppercase', fontFamily:'info' }}>SEANCE : {c.content}</b><br />
						<b style={{fontSize: '13px', textTransform: 'uppercase', fontFamily:'info'}}>Candidat : {c.candidat}</b>
						<small style={{ display: 'block', textAlign: 'right', fontSize: '20px', fontWeight: 'bolder',fontFamily:'info' }}>{c.heure}</small>
					</div>
				</div>
			);
		}
	});

// ---- month days
const MonthDays = (props) => {
	// first day
	const first = moment(props.date).date(1),
		// week format
		weekF = moment().format("YYYYMM");

	// get event data
	const handleClick = useCallback((event) => {

	
		Swal.fire({
			title: ` ${event.date.split('T')[0]} : seance ${event.content}`.toUpperCase(),
			text: `seance ${event.content} à ${event.heure} pour le candidat  ${event.candidat} avec le moniteur ${event.employe}`,		
			
			icon: 'info',
			showCancelButton: true,
			confirmButtonColor: '#df6c4f',
			cancelButtonColor: '#1a99aa',
			cancelButtonText: "D'accord",
			confirmButtonText: 'Supprimer'
		}).then((result) => {
			if (result.isConfirmed) {

				fetch(`http://localhost:5000/events/${event._id}`, {
					method: 'DELETE'
				}).then(() => {
					Swal.fire( {
						title :"C'EST FAIT! ",
						text : 'La seance a été supprimée avec succes.',
						icon :'success',
						confirmButtonText: "D'accord",
						confirmButtonColor: "#3c948b",
						
						
					}).then((result) => {
						if (result.isConfirmed) {
					window.location.reload()
						}
					})
				})
				

	



	}
		})
	});

// init arr
let arr = [];

// create 7 x 5 boxes
for (let i = 0; i < 35; i++) {
	// day
	let day = moment()
		.date(1)
		.subtract(first.weekday() - i, "days"),
		// day format
		dayF = moment(day.format("YYYYMM")),
		// add class by type
		cls = dayF.isBefore(weekF)
			? "days-before"
			: dayF.isAfter(weekF)
				? "days-after"
				: props.date.clone().isSame(day, "day") && "today";

	// push
	arr.push(
		<li key={i.toString()} className={cls}>
			<div className="date">{day.date()}</div>
			<div className="info">{day.format("dddd")}</div>

			<MonthEvents
				data={props.data}
				day={day.clone().format("DD")}
				month={props.date.clone().format("MM")}
				year={props.date.clone().format("YYYY")}
				fn={handleClick}

			/>
		</li>
	);
}
return <ul className="days">{arr}</ul>;
};

// ---- app
export default function EmployeCalendrier() {
    let storageData = localStorage.getItem("userInfo");
    let dataNchala = JSON.parse(storageData)
	const employe_prenom = dataNchala.prenom
 	useEffect(() => {
		let unmounted = false
		if (!unmounted) {
			Axios.get(`http://localhost:5000/events/employes/${employe_prenom}`).then(
				(data) => {
					console.log(data.data)
					setData(data.data)


				}
			)
		}
		return () => { unmounted = true }
	}, [])



	// states
	const [data, setData] = useState([]);
	const [month, setMonth] = useState(moment());

	// next prev and today buttons
	const next = useCallback(() => {
		setMonth(month.clone().add(1, "month"));
	}, [month]);

	const prev = useCallback(() => {
		setMonth(month.clone().subtract(1, "month"));
	}, [month]);

	const today = useCallback(() => {
		setMonth(moment());
	}, [month]);

	// render
	return (
		<div>
			<SidebarEmploye />
			<EventFormDialog />
			<Calendar>
				<Header>
					<Column align="left">
						<Button
							onClick={prev}
							endIcon={<ArrowForwardIosIcon/>}
							text={"Mois Anterieur"} />
						<Button
							onClick={today}
							
							text={"Aujourd'hui"} />
						<Button
							onClick={next}
							
							text={"Mois Posterieur"} />
					</Column>
					<Column align="center">
						<h1 className='current_month'>{month.format("MMMM")}</h1>
					</Column>
					<Column align="right" >
						{moment().format("dddd")} {moment().format("LL")}
					</Column>
				</Header>
				<WeekDays />
				<MonthDays date={month} data={data} />
			</Calendar>
		</div>
	);
}