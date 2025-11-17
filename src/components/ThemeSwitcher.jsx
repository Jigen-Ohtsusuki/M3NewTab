import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { argbFromHex, themeFromSourceColor, hexFromArgb } from '@material/material-color-utilities';
import { MdLightMode, MdDarkMode, MdCheck } from 'react-icons/md';

function ThemeSwitcher({
                           colorTheme, setColorTheme,
                           mode, setMode,
                           font, setFont
                       }) {
    const themes = [
        { id: 'theme-blue', hex: '#0B57D0' },
        { id: 'theme-teal', hex: '#006A60' },
        { id: 'theme-green', hex: '#006E34' },
        { id: 'theme-purple', hex: '#6750A4' },
        { id: 'theme-dark-blue', hex: '#344053' },
        { id: 'theme-cyan', hex: '#006B6B' },
        { id: 'theme-light-green', hex: '#A8C9A5' },
        { id: 'theme-grey', hex: '#747775' },
        { id: 'theme-yellow', hex: '#B58B00' },
        { id: 'theme-orange', hex: '#8F4C00' },
        { id: 'theme-brown', hex: '#6D5345' },
        { id: 'theme-pink', hex: '#BC838F' },
        { id: 'theme-dark-purple', hex: '#5B445B' },
        { id: 'theme-magenta', hex: '#8B3A8B' },
        { id: 'theme-indigo', hex: '#4C4A8F' },
        { id: 'theme-red', hex: '#B3261E' }
    ];

    const fonts = [
        { id: 'font-system', label: 'System' },
        { id: 'font-poppins', label: 'Poppins' },
        { id: 'font-montserrat', label: 'Montserrat' },
        { id: 'font-rubik', label: 'Rubik' }
    ];

    const toggleMode = () => {
        setMode(mode === 'dark-mode' ? 'light-mode' : 'dark-mode');
    };

    const fontGroupRef = useRef(null);
    const fontIndicatorRef = useRef(null);
    const isFirstFontRender = useRef(true);

    useEffect(() => {
        if (!fontGroupRef.current || !fontIndicatorRef.current) return;
        const activeButton = fontGroupRef.current.querySelector('button.active');
        if (!activeButton) return;
        const { offsetLeft, offsetWidth } = activeButton;

        if (isFirstFontRender.current) {
            gsap.set(fontIndicatorRef.current, { left: offsetLeft, width: offsetWidth });
            isFirstFontRender.current = false;
        } else {
            gsap.to(fontIndicatorRef.current, { left: offsetLeft, width: offsetWidth, duration: 0.4, ease: 'expo.out' });
        }
    }, [font]);

    const getPalette = (hex, currentMode) => {
        const theme = themeFromSourceColor(argbFromHex(hex));
        const isDark = currentMode === 'dark-mode';

        return {
            '--swatch-c1': hexFromArgb(theme.palettes.primary.tone(isDark ? 80 : 90)),
            '--swatch-c2': hexFromArgb(theme.palettes.primary.tone(isDark ? 30 : 40)),
            '--swatch-c3': hexFromArgb(theme.palettes.secondary.tone(isDark ? 30 : 40)),
            '--swatch-c4': hexFromArgb(theme.palettes.secondary.tone(isDark ? 80 : 90)),
        };
    };

    return (
        <div className="theme-switcher-panel">
            <h3>Mode</h3>
            <button className="mode-toggle-btn" onClick={toggleMode} title="Toggle light/dark mode">
                {mode === 'dark-mode' ? <MdLightMode /> : <MdDarkMode />}
                <span>{mode === 'dark-mode' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            <h3>Color</h3>
            <div className="color-grid">
                {themes.map((theme) => (
                    <button
                        key={theme.id}
                        className={`color-swatch ${colorTheme === theme.id ? 'active' : ''}`}
                        style={getPalette(theme.hex, mode)}
                        onClick={() => setColorTheme(theme.id)}
                        title={theme.id.replace('theme-', '')}
                    >
                        {colorTheme === theme.id && (
                            <MdCheck className="color-swatch-check" />
                        )}
                    </button>
                ))}
            </div>

            <h3>Font</h3>
            <div className="button-group" ref={fontGroupRef}>
                <div className="theme-switcher-indicator" ref={fontIndicatorRef}></div>
                {fonts.map((fontItem) => (
                    <button
                        key={fontItem.id}
                        data-font={fontItem.id}
                        className={`font-button ${font === fontItem.id ? 'active' : ''}`}
                        onClick={() => setFont(fontItem.id)}
                        title={`${fontItem.label} Font`}
                    >
                        {fontItem.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ThemeSwitcher;