import React, { useState, useEffect } from 'react';
import './test.css'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import AccordionEx from './Accordion';
import Countdown from './Countdown'
import Questions from './data'
import PageHeader from '../../../components/PageHeader';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import fel from "../../../Assets/felicitations.png"
import { Alert } from '@material-ui/lab';
const useStyles = makeStyles((theme) => ({
	button: {
		padding: "10px",
		borderLeft: "4px solid var(--white)",
		borderRight: "4px solid var(--white)",
		backgroundColor: "#ccc",
		borderRadius: "30px",
		transition: "0.2s",
	},

}));

export default function Test1() {

	const classes = useStyles()
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [showAnswers, setShowAnswers] = useState(false);
	const [pause, setPause] = useState(false)
	const [reset, setReset] = useState(0)
	const [timeout, setTimeout] = useState(false)

	useEffect(() => {



	}, []);



	const handleAnswerOptionClick = (isCorrect) => {
		if (!showAnswers) {
			if (isCorrect) {

				setScore(score + 1);

			}
		}
		setShowAnswers(true);
		setPause(true)


	};
	const handleNextQuestion = () => {

		setShowAnswers(false)
		setTimeout(false)
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < Questions.length) {
			setCurrentQuestion(nextQuestion);
			setReset(reset + 1)
			setPause(false)

		} else {
			setShowScore(true);
		}

	};
	return (
		<div>
			<PageHeader
				title="Premier Test"
				subTitle="Test pédagogique"
				icon={<AssignmentTurnedInOutlinedIcon fontSize="large" />}
			/>
			<Paper className="Content" style={{ marginBottom: "10px", marginLeft: "15%", background: "rgba(41,42,44,1)", width: "60%", borderTop: "4px solid var(--white)", borderBottom: "4px solid var(--white)" }} >

				{showScore ? (
					<div>
						<h1 style={{fontFamily:'info'}}>Tu as complété le test !</h1>
						{(score<24) ? (<div ><Alert variant="filled" severity="error">
  desole, il faut avoir un minimum de 24 bonnes reponses pour reussir a l'examen
</Alert></div>):(<img src={fel} style={{width:"800px",marginLeft:"5%"}}/>)}
						
						
						
						<h1 style={{color:"white",fontWeight:"bolder",fontFamily:'info',fontSize:'35px'}}>
						
						Votre score est {score} sur {Questions.length}</h1>
						<h1 style={{fontFamily:'info',fontSize:'25px'}}>Merci !</h1>
					</div>

				) : (
					<div>
					
					<Box style={{paddingBottom:"16px",width:"800px"}}>
					<Countdown  pause={pause} reset={reset} setTimeout={setTimeout} />
					</Box>	
					<Box style={{display:"flex"}}>
					<Paper style={{position:"absolute", zIndex: "10",marginLeft:"20px",background:"#ccc",height:"100px",borderRadius:"30px",width:"200px",marginTop:"3%"}}>
								<h1 style={{position:"relative",top:"7%",width:'auto',height:"auto",fontFamily:'info',color:'black',fontSize:'bolder',paddingLeft:'25px'}}>Question <br/> {currentQuestion + 1} sur {Questions.length}</h1>
							</Paper>
							{(showAnswers || timeout) && (
							<Paper style={{position:"absolute",width:"12%",top:"40%",left:"17%",backgroundColor:"#AFA",borderTop: "4px solid var(--white)", borderBottom: "4px solid var(--white)" }} className="accord"  ><p style={{margin:"3px 3px 3px 3px",fontFamily:'info',fontSize:'15px' }}>{Questions[currentQuestion].explanation}</p></Paper>
						)}


						<Box p={0} flexGrow={0.5} >
							<div className='question-section'>
							<div className='question-text'><h2 style={{color:'white',fontFamily:'info',fontSize:'17px',width:'550px'}}>{Questions[currentQuestion].questionText}</h2></div>
								<img className="item" src={Questions[currentQuestion].image} />
								
							</div>

							<div className='answer-section'>
								{Questions[currentQuestion].answerOptions.map((answerOption) => {
									const bgColor = (showAnswers || timeout)
										? answerOption.isCorrect ? 'correct' : 'incorrect' : 'normal'
									return (
										<li className={`butt ${bgColor} `} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</li>
									)
								})}
							</div>
							{(showAnswers || timeout) && (
								<Button style={{position:"relative",marginLeft:"53%",marginBottom:"1%",fontFamily:'info'}} onClick={handleNextQuestion} variant="contained" color="primary" >Question suivante</Button>
							)}

						</Box>

						

					</Box>
					</div>

				)}
			</Paper>
			
		</div>
	);

}