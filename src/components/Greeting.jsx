import React, { useState, useEffect } from 'react';

const greetingsLateNight = [
    "Hello, fellow creature of the night.", "Burning the midnight oil, are we?", "The internet never sleeps... and neither do you, it seems.",
    "Shouldn't you be dreaming right now?", "Up late, or up *exceptionally* early?", "You're in the deepest, darkest corner of the web now.",
    "What secrets are you hunting for at this hour?", "Even my code is getting sleepy.", "Just one more tab... right? Famous last words.",
    "The 3 AM search query. A classic.", "You've got the whole internet to yourself.", "Are you a vampire? Be honest.",
    "Don't let the 404s bite.", "What's on your mind at this ungodly hour?", "Welcome to the insomniac's browsing club.",
    "May your screen be dim and your thoughts deep.", "A quest at this ungodly hour?", "You're really pushing that 'Good Night' greeting.",
    "Hello! OWL. What are you browsing at this time?", "Is this research or just a deep rabbit hole?"
];
const greetingsMorning = [
    "Rise and shine, web surfer!", "What's the plan for today, champ?", "Grab some coffee and let's get browsing.", "Top of the morning to you!",
    "A fresh start for a fresh set of tabs.", "Hello, sunshine! What are we learning today?", "Let's get this bread (and this data).",
    "The day is full of potential. Let's find it.", "Ready to conquer the digital world?", "First stop of the day: the internet. Wise choice.",
    "Early bird gets the... search results?", "What's the buzz this morning?", "Sun's up, browser's up.", "Let's make today productive.",
    "What news are we catching up on?", "Good morning! Let's find something amazing.", "The day is young and full of websites.",
    "Kicking off the day with some curiosity.", "What's today's big idea?", "Hope your connection is as strong as your coffee."
];
const greetingsAfternoon = [
    "How's the day treating you so far?", "In the thick of it now, I see.", "Taking a well-deserved afternoon break?",
    "Hope you had a good lunch to fuel this search.", "This is the afternoon stretch. Keep going!", "Surviving that post-lunch slump with a good browse?",
    "Cruising through the day, one tab at a time.", "The day is about 60% complete. You've got this.", "What's the agenda for this afternoon?",
    "Looking for a mid-day distraction? I won't tell.", "Productivity in motion. Or is it procrastination?", "Focus time. Let's find what you need.",
    "Almost through the main grind of the day.", "What's the scoop this afternoon?", "The sun is high, and so is your tab count, probably.",
    "Let's find that piece of info and get back to it.", "Keep up the great work. Or, you know, just browse.", "What's the latest update in your world?",
    "Searching for a little inspiration?", "Hope your day is going as smoothly as this UI."
];
const greetingsEvening = [
    "Good evening. Time to unwind?", "Kicking back with a bit of browsing?", "What's for dinner? Or are you looking up a recipe?",
    "Done with the 9-to-5, on to the 6-to-10.", "Catching up on some casual reading?", "What are we watching, or shopping for, tonight?",
    "The day is wrapping up. Hope it was a good one.", "Hello, evening explorer.", "Browsing for fun, or still working?",
    "What's the plan for tonight's web adventure?", "Relax, unwind, and open a few tabs.", "Enjoy your evening browse.",
    "Let's see what the internet has to offer tonight.", "Finding something interesting to end the day?", "The stars are out. What's shining on the web?",
    "A quiet evening for a search.", "What's the latest gossip or news?", "Hope you're comfortable.", "Let's find something entertaining.",
    "The workday is over. The web is open."
];
const greetingsNight = [
    "Getting late, isn't it?", "Hello, night owl! The shift is just beginning.", "Just one last search before bed? ...Or ten?",
    "Winding down for real now, I hope.", "The digital world is getting quiet.", "Ready to call it a day soon?", "It's almost the pumpkin hour.",
    "Don't stay up *too* late. Your tabs will be here tomorrow.", "Checking in on the world one last time?", "What's the final query of the day?",
    "Tidying up your digital life before sleep?", "Satisfying that late-night curiosity?", "Shouldn't you be powering down for the night?",
    "A late-night thinker, I see.", "Just you, the moon, and a glowing screen.", "What's so important it can't wait until morning?",
    "The 'one last video' trap is easy to fall into.", "Are you getting a head start on tomorrow's problems?", "Don't forget to set your alarm.",
    "Sweet dreams... after this search."
];

function getRandomGreeting(greetingsArray) {
    const randomIndex = Math.floor(Math.random() * greetingsArray.length);
    return greetingsArray[randomIndex];
}

function getGreeting(hour) {
    if (hour < 5) return getRandomGreeting(greetingsLateNight);
    if (hour < 12) return getRandomGreeting(greetingsMorning);
    if (hour < 18) return getRandomGreeting(greetingsAfternoon);
    if (hour < 22) return getRandomGreeting(greetingsEvening);
    return getRandomGreeting(greetingsNight);
}

function Greeting() {
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const updateGreeting = () => {
            const now = new Date();
            setGreeting(getGreeting(now.getHours()));
        };

        updateGreeting();
        const interval = setInterval(updateGreeting, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <p id="greeting">{greeting}</p>
    );
}

export default Greeting;