// App.jsx
import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
    return (
        <ThemeProvider>
            <div className="App">
                <Loader />
                <div id="main-content">
                    <CustomCursor />
                    <Navigation />
                    <main>
                        <Hero />
                        <About />
                        <Skills />
                        <Projects />
                        <Experience />
                        <Contact />
                    </main>
                    <Footer />
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;