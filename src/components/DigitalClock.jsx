import React, { useState, useEffect } from 'react';

function DigitalClock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setTime(now);
        };

        updateClock();
        const interval = setInterval(updateClock, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="clock-widget digital-clock">
            <h1 id="clock">
                {time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
            </h1>
        </div>
    );
}

export default DigitalClock;