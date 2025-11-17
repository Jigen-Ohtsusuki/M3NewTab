import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { applyTheme, argbFromHex, themeFromSourceColor } from '@material/material-color-utilities';
import { MdApps } from 'react-icons/md';
import Clock from './components/Clock';
import Greeting from './components/Greeting';
import SearchBar from './components/SearchBar';
import CustomizationButton from './components/CustomizationButton';
import CustomizationPanel from './components/CustomizationPanel';
import ProfilePanel from './components/ProfilePanel';
import GoogleAppsMenu from './components/GoogleAppsMenu';
import ShortcutList from './components/ShortcutList';
import AddShortcutModal from './components/AddShortcutModal';

const sourceColors = {
    'theme-blue': '#0B57D0',
    'theme-teal': '#006A60',
    'theme-green': '#006E34',
    'theme-purple': '#6750A4',
    'theme-dark-blue': '#344053',
    'theme-cyan': '#006B6B',
    'theme-light-green': '#A8C9A5',
    'theme-grey': '#747775',
    'theme-yellow': '#B58B00',
    'theme-orange': '#8F4C00',
    'theme-brown': '#6D5345',
    'theme-pink': '#BC838F',
    'theme-dark-purple': '#5B445B',
    'theme-magenta': '#8B3A8B',
    'theme-indigo': '#4C4A8F',
    'theme-red': '#B3261E'
};

function App() {
    const [colorTheme, setColorTheme] = useState(() =>
        localStorage.getItem('my-material-tab-theme-color') || 'theme-blue'
    );
    const [mode, setMode] = useState(() =>
        localStorage.getItem('my-material-tab-theme-mode') || 'dark-mode'
    );
    const [font, setFont] = useState(() =>
        localStorage.getItem('my-material-tab-theme-font') || 'font-system'
    );

    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);
    const [isAppsMenuOpen, setIsAppsMenuOpen] = useState(false);
    const [isAddShortcutModalOpen, setIsAddShortcutModalOpen] = useState(false);

    const [userInfo, setUserInfo] = useState({
        email: 'Loading...',
        name: 'User',
        picture: ''
    });

    const [shortcuts, setShortcuts] = useState([]);

    const containerRef = useRef(null);
    const headerRef = useRef(null);

    useEffect(() => {
        if (chrome.identity) {
            chrome.identity.getAuthToken({ interactive: true }, (token) => {
                if (chrome.runtime.lastError || !token) {
                    console.error(chrome.runtime.lastError);
                    setUserInfo({ email: 'example@gmail.com', name: 'User', picture: '' });
                    return;
                }

                fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`)
                    .then(response => response.json())
                    .then(data => {
                        setUserInfo({
                            email: data.email,
                            name: data.given_name || data.name.split(' ')[0],
                            picture: data.picture
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching user info:', error);
                    });
            });
        }

        if (chrome.storage) {
            chrome.storage.local.get(['shortcuts'], (result) => {
                if (result.shortcuts) {
                    setShortcuts(result.shortcuts);
                }
            });
        }
    }, []);

    useEffect(() => {
        const hex = sourceColors[colorTheme];
        const isDark = mode === 'dark-mode';

        const theme = themeFromSourceColor(argbFromHex(hex));

        applyTheme(theme, { target: document.body, dark: isDark });

        document.body.className = `${mode} ${font}`;

        localStorage.setItem('my-material-tab-theme-color', colorTheme);
        localStorage.setItem('my-material-tab-theme-mode', mode);
        localStorage.setItem('my-material-tab-theme-font', font);
    }, [colorTheme, mode, font]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set('.app-header', { y: -20, opacity: 0 });
            gsap.set('.clock-widget', { y: -30, opacity: 0, scale: 0.95 });
            gsap.set('#greeting', { y: -20, opacity: 0 });
            gsap.set('.search-widget', { y: 30, opacity: 0, scale: 0.95 });
            gsap.set('.shortcut-grid', { y: 30, opacity: 0 });
            gsap.set('.customization-fab', { y: 30, opacity: 0 });

            const tl = gsap.timeline({
                defaults: {
                    duration: 0.8,
                    ease: 'expo.out'
                },
                delay: 0.1
            });

            tl.to('.app-header', {
                y: 0,
                opacity: 1
            })
                .to('.clock-widget', {
                    y: 0,
                    opacity: 1,
                    scale: 1
                }, "<0.1")
                .to('#greeting', {
                    y: 0,
                    opacity: 1
                }, "<0.2")
                .to('.search-widget', {
                    y: 0,
                    opacity: 1,
                    scale: 1
                }, "<0.2")
                .to('.shortcut-grid', {
                    y: 0,
                    opacity: 1,
                    duration: 0.6
                }, "<0.1")
                .to('.customization-fab', {
                    y: 0,
                    opacity: 1,
                    duration: 0.6
                }, "<0.2");

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const anyModalOpen = isPanelOpen || isProfilePanelOpen || isAppsMenuOpen || isAddShortcutModalOpen;

    useEffect(() => {
        if (anyModalOpen) {
            gsap.to(headerRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                ease: 'expo.out',
                overwrite: true
            });
        } else {
            gsap.to(headerRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: 'expo.out',
                delay: 0.3,
                overwrite: true
            });
        }
    }, [anyModalOpen]);

    const closeAllModals = () => {
        setIsPanelOpen(false);
        setIsProfilePanelOpen(false);
        setIsAppsMenuOpen(false);
        setIsAddShortcutModalOpen(false);
    };

    const toggleCustomizationPanel = () => {
        const currentlyOpen = isPanelOpen;
        closeAllModals();
        if (!currentlyOpen) setIsPanelOpen(true);
    };

    const toggleProfilePanel = () => {
        const currentlyOpen = isProfilePanelOpen;
        closeAllModals();
        if (!currentlyOpen) setIsProfilePanelOpen(true);
    };

    const toggleAppsMenu = () => {
        const currentlyOpen = isAppsMenuOpen;
        closeAllModals();
        if (!currentlyOpen) setIsAppsMenuOpen(true);
    };

    const toggleAddShortcutModal = () => {
        const currentlyOpen = isAddShortcutModalOpen;
        closeAllModals();
        if (!currentlyOpen) setIsAddShortcutModalOpen(true);
    };

    const handleAddShortcut = (name, url) => {
        let formattedUrl = url;
        if (!/^https?:\/\//i.test(url)) {
            formattedUrl = 'https://' + url;
        }

        let domain;
        try {
            domain = new URL(formattedUrl).hostname;
        } catch (e) {
            console.error("Invalid URL:", e);
            return;
        }

        const newShortcut = {
            id: crypto.randomUUID(),
            name: name,
            url: formattedUrl,
            iconUrl: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
        };

        const newShortcuts = [...shortcuts, newShortcut];
        setShortcuts(newShortcuts);
        if (chrome.storage) {
            chrome.storage.local.set({ shortcuts: newShortcuts });
        }
        toggleAddShortcutModal();
    };

    return (
        <div ref={containerRef} className="app-container">
            <header className="app-header" ref={headerRef}>
                <button className="header-button" onClick={toggleAppsMenu} title="Google Apps">
                    <MdApps />
                </button>
                <button className="header-button profile-button" onClick={toggleProfilePanel} title="Profile">
                    <img
                        src={userInfo.picture}
                        alt="Profile"
                        className="profile-avatar"
                    />
                </button>
            </header>

            <main className="container">
                <Clock />
                <Greeting />
                <SearchBar />
                <ShortcutList shortcuts={shortcuts} onAddClick={toggleAddShortcutModal} />
            </main>

            <CustomizationButton
                onClick={toggleCustomizationPanel}
                isOpen={anyModalOpen}
            />

            <CustomizationPanel
                isOpen={isPanelOpen}
                onClose={toggleCustomizationPanel}
                colorTheme={colorTheme}
                setColorTheme={setColorTheme}
                mode={mode}
                setMode={setMode}
                font={font}
                setFont={setFont}
            />

            <ProfilePanel
                isOpen={isProfilePanelOpen}
                onClose={toggleProfilePanel}
                userInfo={userInfo}
            />

            <GoogleAppsMenu
                isOpen={isAppsMenuOpen}
                onClose={toggleAppsMenu}
            />

            <AddShortcutModal
                isOpen={isAddShortcutModalOpen}
                onClose={toggleAddShortcutModal}
                onSave={handleAddShortcut}
            />
        </div>
    );
}

export default App;