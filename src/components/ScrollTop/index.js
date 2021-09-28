import React, { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import './style.css';

function ScrollTop() {
    const [isVisible, setIsVisible] = useState(false);

    function toggleVisibility() {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        }
    }, []);

    return (
        <div className={isVisible ? "button-visible" : "button-invisible"}>
            <button className="scroll-button" type="button" onClick={scrollToTop}>
             <FiArrowUp className="arrow-up" />
            </button>
        </div>
    );
}

export default ScrollTop;