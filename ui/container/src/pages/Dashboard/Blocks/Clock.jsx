import React, { Component, useState } from "react";
import { useInterval } from "src/hooks/useInterval";
import "./Assets/Clock.css";

const Clock = props => {
    const hour = props.date.getHours();
    const minute =
    props.date.getMinutes() < 10
      ? "0" + props.date.getMinutes()
      : props.date.getMinutes();
    const seconds =
      props.date.getSeconds() < 10
        ? "0" + props.date.getSeconds()
        : props.date.getSeconds();

  return (
    <div className="timeContainer">
      <h2>{hour}:{minute}:<span>{seconds}</span></h2>
    </div>
  );
};



class Display extends Component {
    render() {
      const secondDegrees = (this.props.now.getSeconds() / 60) * 360 + 90;
      const secondStyle = {
        transform: "rotate(" + secondDegrees + "deg)",
        transitionProperty: secondDegrees === 360 ? "none" : "all 0.5s"
      };
  
      const hourDegrees = (this.props.now.getHours() / 12) * 360 + 90;
      const hourStyle = {
        transform: "rotate(" + hourDegrees + "deg)",
        transitionProperty: hourDegrees === 360 ? "none" : "all 0.5s"
      };
  
      const minuteDegrees = (this.props.now.getMinutes() / 60) * 360 + 90;
      const minuteStyle = {
        transform: "rotate(" + minuteDegrees + "deg)",
        transitionProperty: minuteDegrees === 360 ? "none" : "all 0.5s"
      };
  
      return (
        <div className="clocKContainer">
          <div className="clockFace">
            <div className="center" />
            <div className="hand secondHand" style={secondStyle} />
            <div className="hand minuteHand" style={minuteStyle} />
            <div className="hand hourHand" style={hourStyle} />
          </div>
          <Clock date={this.props.now} />
        </div>
      );
    }
  }


const ClockTime = ()=>{
  const [time, setTime] = useState(new Date());
  // useInterval(()=>{
  //   setTime(new Date());
  // }, 1000)
  return(
    // <Display now={null} />
    <>SAAT</>
  )
}
export default ClockTime;
