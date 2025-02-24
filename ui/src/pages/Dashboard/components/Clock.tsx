import React, { useState, useMemo } from "react";
import { useInterval } from "src/hooks/useInterval";
import "./assets/Clock.css";

interface ClockProps {
  date: Date;
}

const Clock: React.FC<ClockProps> = ({ date }) => {
  const hour = date.getHours();
  const minute = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return (
    <div className="timeContainer">
      <h2>
        {hour}:{minute}:<span>{seconds}</span>
      </h2>
    </div>
  );
};

interface DisplayProps {
  now: Date;
}

const Display: React.FC<DisplayProps> = ({ now }) => {
  const secondDegrees = useMemo(() => (now.getSeconds() / 60) * 360 + 90, [now]);
  const minuteDegrees = useMemo(() => (now.getMinutes() / 60) * 360 + 90, [now]);
  const hourDegrees = useMemo(() => (now.getHours() / 12) * 360 + 90, [now]);

  return (
    <div className="clocKContainer">
      <div className="clockFace">
        <div className="center" />
        <div
          className="hand secondHand"
          style={{
            transform: `rotate(${secondDegrees}deg)`,
            transitionProperty: secondDegrees === 360 ? "none" : "all 0.5s",
          }}
        />
        <div
          className="hand minuteHand"
          style={{
            transform: `rotate(${minuteDegrees}deg)`,
            transitionProperty: minuteDegrees === 360 ? "none" : "all 0.5s",
          }}
        />
        <div
          className="hand hourHand"
          style={{
            transform: `rotate(${hourDegrees}deg)`,
            transitionProperty: hourDegrees === 360 ? "none" : "all 0.5s",
          }}
        />
      </div>
      <Clock date={now} />
    </div>
  );
};

const ClockTime: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  useInterval(() => {
    setTime(new Date());
  }, '1000');

  return <Display now={time} />;
};

export default ClockTime;