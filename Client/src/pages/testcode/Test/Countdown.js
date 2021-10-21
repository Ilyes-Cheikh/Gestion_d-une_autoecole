import React, { useRef, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, withStyles } from '@material-ui/core/styles';

export const Timeup=false;

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#ff6666",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#22FF99',
  },
}))(LinearProgress);
const RenderTime = ({ remainingTime,Timeup }) => {
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  const currentTime = useRef(remainingTime);
  const prevTime = useRef(null);
  const isNewTimeFirstTick = useRef(false);
  const [, setOneLastRerender] = useState(0);
  
  if (currentTime.current !== remainingTime) {
    isNewTimeFirstTick.current = true;
    prevTime.current = currentTime.current;
    currentTime.current = remainingTime;
  } else {
    isNewTimeFirstTick.current = false;
  }

  if (remainingTime === 0) {
    
    Timeup=true;
    setTimeout(() => {
      setOneLastRerender(val=>val+1)
      
    }, 20);
    

  }
  
  

  const isTimeUp = isNewTimeFirstTick.current;
 
  
  return (
    <div >

    <div style={{}}>

      <h2 key={remainingTime} className={`time ${isTimeUp ? "up"  : ""}`}>
      <BorderLinearProgress style={{position:"relative",width:"920px",paddingTop:"5px",borderRadius:"30px",marginTop:"15px",marginLeft:"50%",transition:"0.1s"}} variant="determinate" value={remainingTime*100/30} />

      </h2>
     
    </div>
    </div>
  );
};

export default function Countdown({reset,pause,setTimeout}) {
  
  return (
    <div>
      <div >

        <CountdownCircleTimer
          key={reset}
          isPlaying ={!pause}
          duration={30}
          colors={[["#84ec6f", 0.9],["#ec6f6f", 0.1]]}
          size={0}
          onComplete={() => { 
            setTimeout(true)
            return [false, 1000]} }  
          
        >
          
          {RenderTime}
        </CountdownCircleTimer>
      </div>
    </div>
  );
}


