// src/components/SpotifyNowPlaying.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FaMusic, FaHeadphones, FaPlay, FaSpotify } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SpotifyNowPlaying = () => {
    const [trackData, setTrackData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const intervalRef = useRef(null);

    const LASTFM_USERNAME = 'GrdhRavan';
    const LASTFM_API_KEY = '8c0907db11fdbc5a060a0a4d6f7271f1';

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const getCurrentTheme = () => {
            if (document.documentElement.classList.contains('dark')) return true;
            if (document.documentElement.classList.contains('light')) return false;
            if (document.documentElement.getAttribute('data-theme') === 'dark') return true;
            if (document.documentElement.getAttribute('data-theme') === 'light') return false;
            if (document.documentElement.getAttribute('data-mode') === 'dark') return true;
            if (document.documentElement.getAttribute('data-mode') === 'light') return false;

            const computedStyle = window.getComputedStyle(document.documentElement);
            const bgColor = computedStyle.backgroundColor;
            const isDark = bgColor && (
                bgColor.includes('17, 24, 39') ||
                bgColor.includes('25, 20, 20') ||
                bgColor.includes('0, 0, 0') ||
                parseInt(computedStyle.color?.split(',')[0]) > 128
            );

            return isDark ?? mediaQuery.matches;
        };

        const updateTheme = () => {
            setIsDarkMode(getCurrentTheme());
        };

        updateTheme();

        mediaQuery.addEventListener('change', updateTheme);

        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class', 'data-theme', 'data-mode', 'style']
        });

        const handleStorageChange = (e) => {
            if (e.key === 'theme' || e.key === 'color-scheme') {
                updateTheme();
            }
        };
        window.addEventListener('storage', handleStorageChange);

        const handleThemeChange = () => updateTheme();
        document.addEventListener('themeChange', handleThemeChange);

        return () => {
            mediaQuery.removeEventListener('change', updateTheme);
            observer.disconnect();
            window.removeEventListener('storage', handleStorageChange);
            document.removeEventListener('themeChange', handleThemeChange);
        };
    }, []);

    useEffect(() => {
    }, [isDarkMode]);

    const fetchRecentTracks = useCallback(async (isPolling = false) => {
        try {
            if (!isPolling) {
                setLoading(true);
            }
            setError(null);

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const response = await fetch(
                `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1&extended=1`,
                {
                    signal: controller.signal,
                    headers: {
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache'
                    }
                }
            );

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error('Network response failed');
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.message);
            }

            if (data.recenttracks?.track?.length > 0) {
                const track = data.recenttracks.track[0];
                const newTrackData = {
                    name: track.name,
                    artist: track.artist['#text'],
                    album: track.album['#text'],
                    image: track.image[2]?.['#text'] || track.image[1]?.['#text'] || '/api/placeholder/80/80',
                    nowPlaying: track['@attr']?.nowplaying === 'true',
                    url: track.url,
                    timestamp: Date.now()
                };

                setTrackData(prev => {
                    if (!prev) return newTrackData;

                    const isNewSong = prev.name !== newTrackData.name ||
                        prev.artist !== newTrackData.artist ||
                        prev.nowPlaying !== newTrackData.nowPlaying;

                    return isNewSong ? newTrackData : prev;
                });

                setLastUpdated(Date.now());

                localStorage.setItem('spotify-cache', JSON.stringify(newTrackData));
                localStorage.setItem('spotify-cache-time', Date.now().toString());
            } else {
                setTrackData(null);
            }
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.error('Error fetching Spotify data:', err);
                if (!isPolling) {
                    setError(err.message);
                }
            }
        } finally {
            if (!isPolling) {
                setLoading(false);
            }
        }
    }, []);

    const startPolling = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        const interval = trackData?.nowPlaying ? 10000 : 30000;

        intervalRef.current = setInterval(() => {
            fetchRecentTracks(true);
        }, interval);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [trackData?.nowPlaying, fetchRecentTracks]);

    useEffect(() => {
        const cachedData = localStorage.getItem('spotify-cache');
        const cacheTime = localStorage.getItem('spotify-cache-time');

        if (cachedData && cacheTime && Date.now() - parseInt(cacheTime) < 120000) {
            const parsedData = JSON.parse(cachedData);
            setTrackData(parsedData);
            setLoading(false);
            setTimeout(() => fetchRecentTracks(true), 1000);
        } else {
            fetchRecentTracks();
        }

        const cleanup = startPolling();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            cleanup;
        };
    }, [fetchRecentTracks, startPolling]);

    useEffect(() => {
        startPolling();
    }, [startPolling]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                fetchRecentTracks(true);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [fetchRecentTracks]);

    const containerVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 }
        }
    };

    const trackChangeVariants = {
        initial: { opacity: 0, x: 20 },
        animate: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        },
        exit: {
            opacity: 0,
            x: -20,
            transition: { duration: 0.3 }
        }
    };

    const colors = {
        primary: '#1DB954',
        background: isDarkMode
            ? 'rgba(25, 20, 20, 0.95)'
            : 'rgba(255, 255, 255, 0.95)',
        surface: isDarkMode
            ? 'rgba(40, 40, 40, 0.8)'
            : 'rgba(248, 248, 248, 0.8)',
        text: {
            primary: isDarkMode ? '#FFFFFF' : '#191414',
            secondary: isDarkMode ? '#B3B3B3' : '#5A5A5A',
            muted: isDarkMode ? '#7A7A7A' : '#8A8A8A'
        },
        border: isDarkMode
            ? 'rgba(29, 185, 84, 0.3)'
            : 'rgba(29, 185, 84, 0.2)',
        error: isDarkMode
            ? 'rgba(239, 68, 68, 0.3)'
            : 'rgba(239, 68, 68, 0.2)',
        skeleton: isDarkMode
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.1)'
    };

    const manualThemeCheck = () => {
        const html = document.documentElement;
        const isDark = html.classList.contains('dark') ||
            html.getAttribute('data-theme') === 'dark' ||
            window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(isDark);
    };

    if (error) {
        return (
            <motion.div
                className="spotify-widget error"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="widget-header">
                    <FaSpotify className="header-icon" />
                    <span>Spotify</span>
                    <button
                        onClick={manualThemeCheck}
                        className="theme-check-btn"
                        title="Check current theme"
                    >
                        🔄
                    </button>
                </div>
                <div className="error-state">
                    <FaHeadphones />
                    <p>Unable to load Spotify data</p>
                    <button
                        className="retry-btn"
                        onClick={() => fetchRecentTracks()}
                    >
                        Retry
                    </button>
                </div>

                <style jsx>{`
                    .spotify-widget {
                        background: ${colors.background};
                        border: 1px solid ${colors.error};
                        border-radius: 16px;
                        padding: 1.25rem;
                        backdrop-filter: blur(20px);
                        max-width: 380px;
                        margin: 0 auto;
                        transition: all 0.3s ease;
                        position: relative;
                        overflow: hidden;
                        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                    }

                    .widget-header {
                        display: flex;
                        align-items: center;
                        gap: 0.75rem;
                        margin-bottom: 1rem;
                    }

                    .header-icon {
                        color: ${colors.primary};
                        font-size: 1.5rem;
                    }

                    .widget-header span {
                        font-weight: 700;
                        color: ${colors.text.primary};
                        font-size: 1rem;
                    }

                    .theme-check-btn {
                        background: none;
                        border: none;
                        cursor: pointer;
                        font-size: 0.8rem;
                        opacity: 0.6;
                        margin-left: auto;
                    }

                    .error-state {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 0.75rem;
                        padding: 1.5rem 1rem;
                        text-align: center;
                        color: ${colors.text.muted};
                    }

                    .error-state svg {
                        font-size: 2rem;
                        opacity: 0.5;
                    }

                    .error-state p {
                        margin: 0;
                        font-weight: 500;
                        font-size: 0.9rem;
                        color: ${colors.text.secondary};
                    }

                    .retry-btn {
                        background: rgba(29, 185, 84, 0.1);
                        color: ${colors.primary};
                        border: 1px solid rgba(29, 185, 84, 0.3);
                        padding: 0.5rem 1rem;
                        border-radius: 8px;
                        font-size: 0.8rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }

                    .retry-btn:hover {
                        background: ${colors.primary};
                        color: ${isDarkMode ? '#191414' : '#FFFFFF'};
                    }
                `}</style>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="spotify-widget"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            whileHover={{ y: -2 }}
            key={`spotify-widget-${isDarkMode ? 'dark' : 'light'}`}
        >
            <div className="widget-header">
                <div className="header-main">
                    <FaSpotify className="header-icon" />
                    <div className="header-text">
                        <span className="title">
                            {trackData?.nowPlaying ? 'Now Playing' : 'Recently Played'}
                        </span>
                    </div>
                </div>
                {trackData?.nowPlaying && (
                    <div className="live-badge">
                        <span className="pulse"></span>
                        LIVE
                    </div>
                )}
            </div>

            <div className="widget-content">
                {loading ? (
                    <div className="skeleton-loader">
                        <div className="skeleton-image"></div>
                        <div className="skeleton-text">
                            <div className="skeleton-line large"></div>
                            <div className="skeleton-line medium"></div>
                            <div className="skeleton-line small"></div>
                        </div>
                    </div>
                ) : trackData ? (
                    <motion.a
                        key={`${trackData.name}-${trackData.artist}-${trackData.timestamp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="track-card"
                        variants={trackChangeVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        whileHover={{ x: 4 }}
                    >
                        <div className="album-art">
                            <img
                                src={trackData.image}
                                alt={`${trackData.album} cover`}
                                loading="lazy"
                                onError={(e) => {
                                    e.target.src = `data:image/svg+xml;base64,${btoa(`
                                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="80" height="80" rx="12" fill="${isDarkMode ? '#1D1B1B' : '#F0F0F0'}"/>
                                            <path d="M40 44C42.2091 44 44 42.2091 44 40C44 37.7909 42.2091 36 40 36C37.7909 36 36 37.7909 36 40C36 42.2091 37.7909 44 40 44Z" fill="${isDarkMode ? '#333' : '#DDD'}"/>
                                            <path d="M48 40L36 32V48L48 40Z" fill="${isDarkMode ? '#333' : '#DDD'}"/>
                                        </svg>
                                    `)}`;
                                }}
                            />
                            {trackData.nowPlaying && (
                                <div className="playing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            )}
                            <div className="album-overlay">
                                <FaPlay className="play-icon" />
                            </div>
                        </div>
                        <div className="track-info">
                            <h4 className="track-title">{trackData.name}</h4>
                            <p className="artist">{trackData.artist}</p>
                            <p className="album">{trackData.album}</p>
                            <div className="track-meta">
                                <span className="source">
                                    <FaSpotify />
                                    Spotify
                                </span>
                                {trackData.nowPlaying && (
                                    <span className="status-badge">Playing Now</span>
                                )}
                            </div>
                        </div>
                    </motion.a>
                ) : (
                    <div className="empty-state">
                        <FaMusic />
                        <p>No recent tracks</p>
                        <button
                            className="refresh-btn"
                            onClick={() => fetchRecentTracks()}
                        >
                            Check Now
                        </button>
                    </div>
                )}
            </div>

            <style jsx>{`
                .spotify-widget {
                    background: ${colors.background};
                    border: 1px solid ${colors.border};
                    border-radius: 16px;
                    padding: 1.25rem;
                    backdrop-filter: blur(20px);
                    max-width: 380px;
                    margin: 0 auto;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                }

                .spotify-widget::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, ${colors.primary}, transparent);
                }

                .spotify-widget:hover {
                    border-color: ${isDarkMode ? 'rgba(29, 185, 84, 0.5)' : 'rgba(29, 185, 84, 0.4)'};
                    transform: translateY(-2px);
                    box-shadow: 0 12px 40px rgba(29, 185, 84, 0.15);
                }

                .widget-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                    gap: 0.75rem;
                    position: relative;
                }

                .header-main {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    flex: 1;
                }

                .header-icon {
                    width: 32px;
                    height: 32px;
                    color: ${colors.primary};
                    flex-shrink: 0;
                }

                .header-text {
                    display: flex;
                    flex-direction: column;
                }

                .title {
                    font-weight: 700;
                    color: ${colors.text.primary};
                    font-size: 1rem;
                    line-height: 1.2;
                }

                .subtitle {
                    font-size: 0.7rem;
                    color: ${colors.text.muted};
                    font-weight: 500;
                }

                .live-badge {
                    display: flex;
                    align-items: center;
                    gap: 0.375rem;
                    background: rgba(29, 185, 84, 0.1);
                    border: 1px solid rgba(29, 185, 84, 0.3);
                    border-radius: 12px;
                    padding: 0.25rem 0.5rem;
                    font-size: 0.7rem;
                    font-weight: 700;
                    color: ${colors.primary};
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .update-dot {
                    width: 6px;
                    height: 6px;
                    background: ${colors.primary};
                    border-radius: 50%;
                }

                .pulse {
                    width: 6px;
                    height: 6px;
                    background: ${colors.primary};
                    border-radius: 50%;
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(1.1); }
                }

                .widget-content {
                    min-height: 80px;
                }

                .skeleton-loader {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .skeleton-image {
                    width: 60px;
                    height: 60px;
                    background: ${colors.skeleton};
                    border-radius: 12px;
                    flex-shrink: 0;
                    animation: skeletonPulse 2s infinite;
                }

                .skeleton-text {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .skeleton-line {
                    background: ${colors.skeleton};
                    border-radius: 4px;
                    height: 0.75rem;
                    animation: skeletonPulse 2s infinite;
                }

                .skeleton-line.large { width: 80%; }
                .skeleton-line.medium { width: 60%; }
                .skeleton-line.small { width: 40%; }

                @keyframes skeletonPulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }

                .track-card {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    text-decoration: none;
                    color: inherit;
                    transition: all 0.3s ease;
                }

                .album-art {
                    position: relative;
                    width: 60px;
                    height: 60px;
                    flex-shrink: 0;
                }

                .album-art img {
                    width: 100%;
                    height: 100%;
                    border-radius: 12px;
                    object-fit: cover;
                    background: ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                }

                .track-card:hover .album-art img {
                    transform: scale(1.05);
                }

                .album-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(29, 185, 84, 0.8);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .track-card:hover .album-overlay {
                    opacity: 1;
                }

                .play-icon {
                    color: white;
                    font-size: 1.2rem;
                }

                .playing-indicator {
                    position: absolute;
                    top: -4px;
                    right: -4px;
                    display: flex;
                    align-items: end;
                    gap: 2px;
                    height: 16px;
                    padding: 0.25rem;
                    background: ${colors.primary};
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                }

                .playing-indicator span {
                    width: 2px;
                    background: white;
                    border-radius: 1px;
                    animation: soundWave 1.4s ease-in-out infinite;
                }

                .playing-indicator span:nth-child(1) { height: 6px; animation-delay: 0s; }
                .playing-indicator span:nth-child(2) { height: 8px; animation-delay: 0.2s; }
                .playing-indicator span:nth-child(3) { height: 10px; animation-delay: 0.4s; }

                @keyframes soundWave {
                    0%, 100% { height: 6px; }
                    50% { height: 12px; }
                }

                .track-info {
                    flex: 1;
                    min-width: 0;
                }

                .track-title {
                    font-size: 1rem;
                    font-weight: 700;
                    color: ${colors.text.primary};
                    margin: 0 0 0.25rem 0;
                    line-height: 1.3;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .artist {
                    font-size: 0.875rem;
                    color: ${colors.text.primary};
                    margin: 0 0 0.25rem 0;
                    font-weight: 500;
                    opacity: 0.9;
                }

                .album {
                    font-size: 0.8rem;
                    color: ${colors.text.muted};
                    margin: 0 0 0.5rem 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .track-meta {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }

                .source {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    background: rgba(29, 185, 84, 0.1);
                    color: ${colors.primary};
                    padding: 0.25rem 0.5rem;
                    border-radius: 6px;
                    font-size: 0.7rem;
                    font-weight: 600;
                }

                .status-badge {
                    background: rgba(29, 185, 84, 0.1);
                    color: ${colors.primary};
                    padding: 0.25rem 0.5rem;
                    border-radius: 6px;
                    font-size: 0.7rem;
                    font-weight: 600;
                }

                .empty-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 1.5rem 1rem;
                    text-align: center;
                    color: ${colors.text.muted};
                }

                .empty-state svg {
                    font-size: 2rem;
                    opacity: 0.5;
                }

                .empty-state p {
                    margin: 0;
                    font-weight: 500;
                    font-size: 0.9rem;
                    color: ${colors.text.secondary};
                }

                .refresh-btn {
                    background: rgba(29, 185, 84, 0.1);
                    color: ${colors.primary};
                    border: 1px solid rgba(29, 185, 84, 0.3);
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .refresh-btn:hover {
                    background: ${colors.primary};
                    color: ${isDarkMode ? '#191414' : '#FFFFFF'};
                }

                @media (max-width: 768px) {
                    .spotify-widget {
                        max-width: 100%;
                        padding: 1rem;
                    }

                    .album-art {
                        width: 50px;
                        height: 50px;
                    }

                    .track-title {
                        font-size: 0.9rem;
                    }

                    .artist, .album {
                        font-size: 0.8rem;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .spotify-widget,
                    .track-card {
                        transition: none;
                    }

                    .pulse,
                    .playing-indicator span,
                    .update-dot {
                        animation: none;
                    }
                }
            `}</style>
        </motion.div>
    );
};

export default React.memo(SpotifyNowPlaying);