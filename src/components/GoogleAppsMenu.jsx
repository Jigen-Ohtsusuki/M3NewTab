import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import {
    SiGmail, SiGoogledrive, SiYoutube, SiGooglecalendar, SiGooglephotos,
    SiGoogletranslate, SiGoogledocs, SiGooglesheets, SiGoogleslides,
    SiGooglemeet, SiGooglekeep, SiGooglemaps
} from 'react-icons/si';

const googleApps = [
    { name: 'Gmail', icon: <SiGmail />, url: 'https://mail.google.com' },
    { name: 'Drive', icon: <SiGoogledrive />, url: 'https://drive.google.com' },
    { name: 'YouTube', icon: <SiYoutube />, url: 'https://www.youtube.com' },
    { name: 'Calendar', icon: <SiGooglecalendar />, url: 'https://calendar.google.com' },
    { name: 'Photos', icon: <SiGooglephotos />, url: 'https://photos.google.com' },
    { name: 'Translate', icon: <SiGoogletranslate />, url: 'https://translate.google.com' },
    { name: 'Docs', icon: <SiGoogledocs />, url: 'https://docs.google.com' },
    { name: 'Sheets', icon: <SiGooglesheets />, url: 'https://sheets.google.com' },
    { name: 'Slides', icon: <SiGoogleslides />, url: 'https://slides.google.com' },
    { name: 'Meet', icon: <SiGooglemeet />, url: 'https://meet.google.com' },
    { name: 'Keep', icon: <SiGooglekeep />, url: 'https://keep.google.com' },
    { name: 'Maps', icon: <SiGooglemaps />, url: 'https://maps.google.com' },
];

function GoogleAppsMenu({ isOpen, onClose }) {
    const menuRef = useRef(null);
    const scrimRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(
                menuRef.current,
                { scale: 0.95, opacity: 0, y: -10 },
                { scale: 1, opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }
            );
            gsap.set(scrimRef.current, { display: 'block' });
        } else {
            gsap.to(menuRef.current, {
                scale: 0.95,
                opacity: 0,
                y: -10,
                duration: 0.15,
                ease: 'power2.in',
                onComplete: () => {
                    gsap.set(scrimRef.current, { display: 'none' });
                }
            });
        }
    }, [isOpen]);

    const handleLinkClick = (url) => {
        window.open(url, '_blank');
        onClose();
    };

    return (
        <>
            <div
                ref={scrimRef}
                className="apps-menu-scrim"
                onClick={onClose}
                style={{ display: 'none' }}
            ></div>
            <div ref={menuRef} className="apps-menu-popup" style={{ opacity: 0 }}>
                <div className="apps-menu-grid">
                    {googleApps.map((app) => (
                        <a
                            key={app.name}
                            href={app.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="app-menu-item"
                            onMouseDown={() => handleLinkClick(app.url)}
                        >
                            <span className="app-menu-icon-wrapper">
                                {app.icon}
                            </span>
                            <span>{app.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
}

export default GoogleAppsMenu;