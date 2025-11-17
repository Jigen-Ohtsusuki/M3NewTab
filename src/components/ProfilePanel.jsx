import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import {
    MdClose, MdExpandMore, MdOutlineAccountCircle, MdOutlineHistory,
    MdOutlineDelete, MdOutlineSettings, MdManageSearch, MdVerifiedUser,
    MdInfoOutline, MdOutlineBookmarkBorder, MdOutlinePerson
} from 'react-icons/md';

const profileLinks = [
    { icon: <MdOutlineAccountCircle />, label: 'New Chrome Incognito tab', url: 'chrome://incognito' },
    { icon: <MdOutlineHistory />, label: 'Search history', url: 'https://myactivity.google.com/product/search', note: 'Saving' },
    { icon: <MdOutlineDelete />, label: 'Delete last 30 minutes', url: 'https://myactivity.google.com/delete-activity?dt=30m&p=My%20Activity' },
    { icon: <MdOutlineSettings />, label: 'Settings', url: 'chrome://settings' },
    { icon: <MdManageSearch />, label: 'Search personalization', url: 'https://myactivity.google.com/activitycontrols/webandapp' },
    { icon: <MdVerifiedUser />, label: 'SafeSearch', url: 'https://www.google.com/safesearch' },
    { icon: <MdInfoOutline />, label: 'Results about you', url: 'https://www.google.com/search/results-about-you' },
    { icon: <MdOutlineBookmarkBorder />, label: 'Saves & Collections', url: 'https://www.google.com/collections' },
    { icon: <MdOutlinePerson />, label: 'Your profile', url: 'https://myaccount.google.com/profile' }
];

function ProfilePanel({ isOpen, onClose, userInfo }) {
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

    const handleLinkClick = (url) => {
        if (url.startsWith('chrome://')) {
            chrome.tabs.create({ url: url });
        } else {
            window.open(url, '_blank');
        }
        handleClose();
    };

    return (
        <div className="panel-content" ref={panelRef}>
            <div className="panel-header profile-panel-header">
                <span className="profile-email">{userInfo.email}</span>
                <button className="panel-close-btn" onClick={handleClose}>
                    <MdClose />
                </button>
            </div>
            <div className="panel-body profile-panel-body">
                <div className="profile-user-info">
                    <img
                        src={userInfo.picture}
                        alt="Profile"
                        className="profile-avatar large"
                    />
                    <h2>Hi, {userInfo.name}!</h2>
                    <button
                        className="manage-account-btn"
                        onClick={() => handleLinkClick('https://myaccount.google.com/')}
                    >
                        Manage your Google Account
                    </button>
                </div>

                <button
                    className="profile-menu-item"
                    onClick={() => handleLinkClick('chrome://settings/people')}
                >
                    <span>Switch account</span>
                    <MdExpandMore className="profile-menu-chevron" />
                </button>

                <div className="profile-section-divider">
                    <span>More from Google</span>
                </div>

                <div className="profile-menu-list">
                    {profileLinks.map((link) => (
                        <button
                            key={link.label}
                            className="profile-menu-item"
                            onClick={() => handleLinkClick(link.url)}
                        >
                            <span className="profile-menu-icon-wrapper">
                                {link.icon}
                            </span>
                            <span>{link.label}</span>
                            {link.note && <span className="item-note">{link.note}</span>}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProfilePanel;