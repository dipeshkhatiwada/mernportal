import React from 'react';
import Menu from "./Menu"
import Navbar from './Navbar';
import Footer from './Footer';
const Base=({
    className = "section-body",
    children
})=>  (
    <div className="main-wrapper main-wrapper-1">
        <Navbar/>
        <Menu/>
        
        <div className="main-content">
        <section className="section">
            <div className={className}>
                {children}
            </div>
        </section>
        </div>
        <Footer/>
    </div>
);

export default Base;