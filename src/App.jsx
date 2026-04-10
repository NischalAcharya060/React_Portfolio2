// App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

// Lazy load below-the-fold and heavy components
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Blog = lazy(() => import('./components/Blog'));
const Contact = lazy(() => import('./components/Contact'));
const Chatbot = lazy(() => import('./components/ChatBot'));
const Certifications = lazy(() => import('./components/Certifications'));

const MainLayout = ({ children }) => {
    const location = useLocation();
    const is404Page = location.pathname === '/404' || !['/', '/projects', '/contact'].includes(location.pathname);

    if (is404Page) {
        return <>{children}</>;
    }

    return (
        <>
            <Navigation />
            <main id="main-content">{children}</main>
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
    const is404Route = useIs404Route();

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
            <a href="#main-content" className="skip-to-content">Skip to content</a>
            <CustomCursor />

            <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
                <Routes>
                    <Route path="/" element={
                        <MainLayout>
                            <Hero />
                            <About />
                            <Skills />
                            <Projects />
                            <Experience />
                            <Certifications/>
                            <Blog/>
                            <Contact />
                            <Chatbot/>
                        </MainLayout>
                    } />
                    <Route path="/projects" element={
                        <MainLayout>
                            <Helmet>
                                <title>Projects - Nischal Acharya | Full-Stack Developer</title>
                                <meta name="description" content="Browse my portfolio of web development projects built with React, Node.js, and modern technologies." />
                                <link rel="canonical" href="https://acharyanischal.com.np/projects" />
                            </Helmet>
                            <Projects />
                        </MainLayout>
                    } />
                    <Route path="/contact" element={
                        <MainLayout>
                            <Helmet>
                                <title>Contact - Nischal Acharya | Full-Stack Developer</title>
                                <meta name="description" content="Get in touch for web development services. Available for remote projects worldwide." />
                                <link rel="canonical" href="https://acharyanischal.com.np/contact" />
                            </Helmet>
                            <Contact />
                        </MainLayout>
                    } />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
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