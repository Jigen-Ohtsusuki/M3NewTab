import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { MdEdit } from 'react-icons/md';

function CustomizationButton({ onClick, isOpen }) {
    const fabRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            gsap.to(fabRef.current, {
                opacity: 0,
                scale: 0.8,
                y: 20,
                duration: 0.3,
                ease: 'expo.out',
                overwrite: true
            });
        } else {
            gsap.to(fabRef.current, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: 'expo.out',
                delay: 0.3,
                overwrite: true
            });
        }
    }, [isOpen]);

    return (
        <button
            ref={fabRef}
            className="customization-fab"
            onClick={onClick}
            title="Customize"
        >
            <MdEdit />
        </button>
    );
}

export default CustomizationButton;