import { useEffect, useState } from "react";

const CountdownTimer = ({ publishDate }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(publishDate));
  
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(publishDate));
        }, 1000);

        return () => clearInterval(timer); // Cleanup interval on unmount
    }, [publishDate]);
  
    function calculateTimeLeft(publishDate) {
        const now = new Date().getTime();
        const publishTime = new Date(publishDate).getTime();
        const difference = publishTime - now;

        if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
        };
    }
  
    return (
        <div className="flex py-4 flex-col items-center gap-y-4">
            <p className="font-medium">Time until Publication</p>
            <div className="text-2xl font-bold">{timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s</div>
        </div>
    );
  };
  
  export default CountdownTimer;