import React from 'react'
import moment from 'moment';
import './CandidatCalendrier.css'
import Axios from 'axios'
import Grid from '@material-ui/core/Grid';
import InfoCard from '../../components/controls/InfoCard';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import SidebarCandid from '../../components/Sidebar/SideBarCandid';
import Sidebar from '../../components/Sidebar/SideBarAdmin';
import ComputerIcon from '@material-ui/icons/Computer';
import Swal from 'sweetalert2'

const { Fragment, useState, useEffect,useCallback } = React;

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
				<div className={`ev ${(c.type) && 'label_'+c.type}`} onClick={() => props.fn(c)}>
					<div className="ev-desc">
            <b style={{fontWeight:'bold',fontSize:'18px',textTransform:'uppercase' , fontFamily:'info' }}>SEANCE : {c.content}</b><br/>
            <b  style={{  fontSize: '13px', textTransform: 'uppercase', fontFamily:'info' }} >moniteur : {c.employe}</b>
            <small style={{display:'block',textAlign:'right',fontSize:'23px',fontWeight:'bolder' , fontFamily:'info'}}>{c.heure}</small>
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
			text: `Vouz avez une seance ${event.content} à ${event.heure} avec le moniteur : ${event.employe}  `,
			icon: 'info',
			confirmButtonText: "D'accord"
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


export default function CandidatCalendrier() {
	const [heureconduite,setHeureconduite] =useState(0)
	const [heurecode , setHeurecode ] = useState (0)
	let storageData = localStorage.getItem("userInfo");
    let dataNchala = JSON.parse(storageData)
	const candidat = dataNchala.prenom
    useEffect(() => {
        let unmounted = false
        if (!unmounted) {
            Axios.get(`http://localhost:5000/events/${candidat}`).then(
                (data) => {
                    console.log(data.data)
                    setData(data.data)
					let hconduite = 0;
					let hcode = 0;
					for (let i=0 ; i< data.data.length ; i++) {
						if (data.data[i].content=="code"){
							hcode++;
						}
						else if (data.data[i].content=="conduite"){
							hconduite++;
						}
					}
					setHeurecode(hcode)
					setHeureconduite(hconduite)
                    
                    
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
		 <SidebarCandid/>
		 <br/>
		 <Grid style={{marginLeft:"37%",display:"flex"}}   >
          <Grid item xs={12} sm={12} md={3}>
            <InfoCard
            color="#ecd06f"
            Iconim={<ComputerIcon/>} 
            number={heurecode}
            numberof="Seances de code"/>
			
          </Grid>
               
      
          <Grid  item xs={12} sm={12} md={3}>
            <InfoCard
            color="#ecd06f"
            Iconim={<DriveEtaIcon/>} 
            number={heureconduite}
            numberof="Seances de conduite"/> 
          </Grid>

                    </Grid>
		<Calendar >
			<Header>
				<Column align="left">
					<Button 
						onClick={prev} 
						
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