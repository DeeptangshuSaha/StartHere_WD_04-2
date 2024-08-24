import {useEffect, useRef, useState} from "react";

const Timer=(a: string | Date) => {
    const Ref = useRef(null);
    const [timer, setTimer] = useState([]);

    const getTimeRemaining = (e) => {
        const total =
            Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        return {
            total,
            days,
            hours,
            minutes,
            seconds,
        };
    };

    const startTimer = (e) => {
        const { total, days, hours, minutes, seconds } =
            getTimeRemaining(e);
        if (total >= 0) {
            setTimer([days, hours, minutes, seconds]);
        } else {
            setTimer("Done");
        }
    };

    const clearTimer = (e) => {
        setTimer([]);
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    };

    const getDeadTime = () => {
        //return new Date(Date.parse(new Date()) + 2 * 24 * 60 * 60 * 1000); //return new Date(Date.parse(new Date()) + (days) * (hours) * (minutes) * (seconds) * 1000);
        return new Date(Date.parse(a));
    };
    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);
    return timer;
}
export default Timer;
