import React, { useRef, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import gsap from 'gsap';

function ShortcutList({ shortcuts, onAddClick }) {
    const gridRef = useRef(null);
    const prevShortcutsLength = useRef(shortcuts.length);

    useEffect(() => {
        if (shortcuts.length > prevShortcutsLength.current) {
            if (gridRef.current) {
                const newShortcut = gridRef.current.querySelector('.shortcut-item:not(.add-shortcut-button):last-child');
                if (newShortcut) {
                    gsap.fromTo(
                        newShortcut,
                        { opacity: 0, scale: 0.8, y: 20 },
                        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'expo.out' }
                    );
                }
            }
        }
        prevShortcutsLength.current = shortcuts.length;
    }, [shortcuts]);

    return (
        <div className="shortcut-grid" ref={gridRef}>
            {shortcuts.map(shortcut => (
                <a key={shortcut.id} href={shortcut.url} className="shortcut-item" title={shortcut.name}>
                    <div className="shortcut-icon-wrapper">
                        <img src={shortcut.iconUrl} alt={shortcut.name} className="shortcut-icon" />
                    </div>
                    <span className="shortcut-name">{shortcut.name}</span>
                </a>
            ))}
            <button className="shortcut-item add-shortcut-button" onClick={onAddClick} title="Add shortcut">
                <div className="shortcut-icon-wrapper">
                    <MdAdd />
                </div>
                <span className="shortcut-name">Add shortcut</span>
            </button>
        </div>
    );
}

export default ShortcutList;