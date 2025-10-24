// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import NotFound from './components/NotFound';

// Create a layout component to conditionally render Navigation and Footer
const MainLayout = ({ children }) => {
    const location = useLocation();
    const is404Page = location.pathname === '/404' || !['/', '/projects', '/contact'].includes(location.pathname);

    if (is404Page) {
        return <>{children}</>;
    }

    return (
        <>
            <Navigation />
            <main>{children}</main>
            <Footer />
        </>
    );
};

// Custom hook to check if current route is 404
const useIs404Route = () => {
    const location = useLocation();
    return location.pathname === '/404' || !['/', '/projects', '/contact'].includes(location.pathname);
};

function AppContent() {
    const [isLoading, setIsLoading] = useState(true);
    const is404Route = useIs404Route();

    useEffect(() => {
        // Don't show loader for 404 routes
        if (is404Route) {
            setIsLoading(false);
            return;
        }

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [is404Route]);

    // Don't show loader at all for 404 routes
    if (is404Route) {
        return (
            <div className="App">
                <CustomCursor />
                <Routes>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        );
    }

    return (
        <div className="App">
            {/* Loader Component - Only show for non-404 routes */}
            <Loader onLoadingComplete={() => setIsLoading(false)} />

            {/* Main Content - Only show for non-404 routes after loading */}
            <div style={{
                display: isLoading ? 'none' : 'block',
                opacity: isLoading ? 0 : 1,
                transition: 'opacity 0.5s ease-in-out'
            }}>
                <CustomCursor />

                <Routes>
                    <Route path="/" element={
                        <MainLayout>
                            <Hero />
                            <About />
                            <Skills />
                            <Projects />
                            <Experience />
                            <Contact />
                        </MainLayout>
                    } />
                    <Route path="/projects" element={
                        <MainLayout>
                            <Projects />
                        </MainLayout>
                    } />
                    <Route path="/contact" element={
                        <MainLayout>
                            <Contact />
                        </MainLayout>
                    } />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
}

function App() {
    return (
        <ThemeProvider>
            <Router>
                <AppContent />
            </Router>
        </ThemeProvider>
    );
}

export default App;