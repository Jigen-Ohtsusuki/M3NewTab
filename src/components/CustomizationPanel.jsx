import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { MdClose } from 'react-icons/md';
import ThemeSwitcher from './ThemeSwitcher';

function CustomizationPanel({ isOpen, onClose, ...themeProps }) {
    const panelRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            gsap.to(panelRef.current, {
                x: '0%',
                duration: 0.5,
                ease: 'expo.out'
            });
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    const handleClose = () => {
        gsap.to(panelRef.current, {
            x: '100%',
            duration: 0.4,
            ease: 'expo.in'
        }).then(onClose);
    };

    return (
        <div className="panel-content" ref={panelRef}>
            <div className="panel-header">
                <h2>Customize</h2>
                <button className="panel-close-btn" onClick={handleClose}>
                    <MdClose />
                </button>
            </div>
            <div className="panel-body">
                <ThemeSwitcher {...themeProps} />
            </div>
        </div>
    );
}

export default CustomizationPanel;