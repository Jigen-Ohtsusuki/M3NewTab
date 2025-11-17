import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { MdClose } from 'react-icons/md';

function AddShortcutModal({ isOpen, onClose, onSave }) {
    const panelRef = useRef(null);
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');

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
        }).then(() => {
            onClose();
            setName('');
            setUrl('');
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && url) {
            onSave(name, url);
            handleClose();
        }
    };

    return (
        <div className="panel-content" ref={panelRef}>
            <div className="panel-header">
                <h2>Add Shortcut</h2>
                <button className="panel-close-btn" onClick={handleClose}>
                    <MdClose />
                </button>
            </div>
            <div className="panel-body">
                <form className="shortcut-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="shortcut-name">Name</label>
                        <input
                            type="text"
                            id="shortcut-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Google"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="shortcut-url">URL</label>
                        <input
                            type="text"
                            id="shortcut-url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="e.g. google.com"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" className="form-button secondary" onClick={handleClose}>
                            Cancel
                        </button>
                        <button type="submit" className="form-button primary">
                            Done
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddShortcutModal;