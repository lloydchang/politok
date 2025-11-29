import React, { useEffect, useState } from 'react';

export default function SplashScreen({ onFinish }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Wait for 1 second then fade out
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onFinish) setTimeout(onFinish, 0); // Allow fade out animation to finish
        }, 1000);

        return () => clearTimeout(timer);
    }, [onFinish]);

    if (!isVisible) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-100 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-48 h-48 md:w-64 md:h-64 relative animate-pulse">
                <img
                    src="/logo.png"
                    alt="PoliTok Logo"
                    className="w-full h-full object-contain"
                />
            </div>
        </div>
    );
}
