// src/components/LastFMNowPlaying.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FaMusic, FaHeadphones, FaPlay, FaLastfm } from 'react-icons/fa';
import { motion } from 'framer-motion';

const LastFMNowPlaying = () => {
    const [trackData, setTrackData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const intervalRef = useRef(null);

    const LASTFM_USERNAME = 'GrdhRavan';
    const LASTFM_API_KEY = '8c0907db11fdbc5a060a0a4d6f7271f1';

    // Memoized fetch function with real-time updates
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

                // Only update if data actually changed or it's a new song
                setTrackData(prev => {
                    if (!prev) return newTrackData;

                    const isNewSong = prev.name !== newTrackData.name ||
                        prev.artist !== newTrackData.artist ||
                        prev.nowPlaying !== newTrackData.nowPlaying;

                    return isNewSong ? newTrackData : prev;
                });

                setLastUpdated(Date.now());

                // Update cache
                localStorage.setItem('lastfm-cache', JSON.stringify(newTrackData));
                localStorage.setItem('lastfm-cache-time', Date.now().toString());
            } else {
                setTrackData(null);
            }
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.error('Error fetching Last.fm data:', err);
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

    // Smart polling based on current state
    const startPolling = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // If currently playing, poll more frequently
        const interval = trackData?.nowPlaying ? 10000 : 30000; // 10s for playing, 30s for not playing

        intervalRef.current = setInterval(() => {
            fetchRecentTracks(true);
        }, interval);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [trackData?.nowPlaying, fetchRecentTracks]);

    // Initial load with cache and setup polling
    useEffect(() => {
        const cachedData = localStorage.getItem('lastfm-cache');
        const cacheTime = localStorage.getItem('lastfm-cache-time');

        // Use cache only if it's less than 2 minutes old
        if (cachedData && cacheTime && Date.now() - parseInt(cacheTime) < 120000) {
            const parsedData = JSON.parse(cachedData);
            setTrackData(parsedData);
            setLoading(false);

            // Still fetch fresh data in background
            setTimeout(() => fetchRecentTracks(true), 1000);
        } else {
            fetchRecentTracks();
        }

        // Start polling after initial load
        const cleanup = startPolling();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            cleanup;
        };
    }, [fetchRecentTracks, startPolling]);

    // Restart polling when track state changes
    useEffect(() => {
        startPolling();
    }, [startPolling]);

    // Handle visibility change - refresh when tab becomes visible
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

    // Animation variants
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

    if (error) {
        return (
            <motion.div
                className="music-widget error"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="widget-header">
                    <FaMusic className="header-icon" />
                    <span>Music</span>
                </div>
                <div className="error-state">
                    <FaHeadphones />
                    <p>Unable to load music data</p>
                    <button
                        className="retry-btn"
                        onClick={() => fetchRecentTracks()}
                    >
                        Retry
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="music-widget"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            whileHover={{ y: -2 }}
        >
            {/* Header */}
            <div className="widget-header">
                <div className="header-main">
                    <FaHeadphones className="header-icon" />
                    <div className="header-text">
                        <span className="title">
                            {trackData?.nowPlaying ? 'Now Playing' : 'Recently Played'}
                        </span>
                        <span className="subtitle">Last.fm • Live</span>
                    </div>
                </div>
                {trackData?.nowPlaying && (
                    <div className="live-badge">
                        <span className="pulse"></span>
                        LIVE
                    </div>
                )}
                {lastUpdated && (
                    <div className="update-indicator">
                        <motion.div
                            className="update-dot"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                )}
            </div>

            {/* Content */}
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
                        href={trackData.url}
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
                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iMTIiIGZpbGw9IiMyQzJDMkMiLz4KPHBhdGggZD0iTTQwIDQ0QzQyLjIwOTEgNDQgNDQgNDIuMjA5MSA0NCA0MEM0NCAzNy43OTA5IDQyLjIwOTEgMzYgNDAgMzZDMzcuNzkwOSAzNiAzNiAzNy43OTA5IDM2IDQwQzM2IDQyLjIwOTEgMzcuNzkwOSA0NCA0MCA0NFoiIGZpbGw9IiM1QjVCNUMiLz4KPHBhdGggZD0iTTQ4IDQwTDM2IDMyVjQ4TDQ4IDQwWiIgZmlsbD0iIzlGOUY5RiIvPgo8L3N2Zz4K';
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
                                    <FaLastfm />
                                    Last.fm
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

            {/* Auto-sync indicator */}
            <div className="sync-indicator">
                <span className="sync-text">Auto-syncing</span>
                <div className="sync-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <style jsx>{`
                .music-widget {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 16px;
                    padding: 1.25rem;
                    backdrop-filter: blur(20px);
                    max-width: 380px;
                    margin: 0 auto;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .music-widget::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(var(--primary-rgb), 0.3), transparent);
                }

                .music-widget:hover {
                    border-color: rgba(var(--primary-rgb), 0.2);
                    transform: translateY(-2px);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
                }

                .music-widget.error {
                    border-color: rgba(239, 68, 68, 0.2);
                }

                /* Header */
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
                    color: var(--primary-color);
                    flex-shrink: 0;
                }

                .header-text {
                    display: flex;
                    flex-direction: column;
                }

                .title {
                    font-weight: 700;
                    color: var(--text-color);
                    font-size: 1rem;
                    line-height: 1.2;
                }

                .subtitle {
                    font-size: 0.75rem;
                    color: var(--text-muted);
                    font-weight: 500;
                }

                .live-badge {
                    display: flex;
                    align-items: center;
                    gap: 0.375rem;
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68, 68, 0.3);
                    border-radius: 12px;
                    padding: 0.25rem 0.5rem;
                    font-size: 0.7rem;
                    font-weight: 700;
                    color: #ef4444;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .update-indicator {
                    position: absolute;
                    top: -2px;
                    right: -2px;
                }

                .update-dot {
                    width: 6px;
                    height: 6px;
                    background: #10b981;
                    border-radius: 50%;
                }

                .pulse {
                    width: 6px;
                    height: 6px;
                    background: #ef4444;
                    border-radius: 50%;
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(1.1); }
                }

                /* Content */
                .widget-content {
                    min-height: 80px;
                }

                /* Skeleton Loader */
                .skeleton-loader {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .skeleton-image {
                    width: 60px;
                    height: 60px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    flex-shrink: 0;
                    animation: pulse 2s infinite;
                }

                .skeleton-text {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .skeleton-line {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                    height: 0.75rem;
                    animation: pulse 2s infinite;
                }

                .skeleton-line.large { width: 80%; }
                .skeleton-line.medium { width: 60%; }
                .skeleton-line.small { width: 40%; }

                /* Track Card */
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
                    background: rgba(255, 255, 255, 0.05);
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
                    background: rgba(0, 0, 0, 0.7);
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
                    background: var(--primary-color);
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
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
                    color: var(--text-color);
                    margin: 0 0 0.25rem 0;
                    line-height: 1.3;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .artist {
                    font-size: 0.875rem;
                    color: var(--text-color);
                    margin: 0 0 0.25rem 0;
                    font-weight: 500;
                }

                .album {
                    font-size: 0.8rem;
                    color: var(--text-muted);
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
                    background: rgba(213, 16, 7, 0.1);
                    color: #d51007;
                    padding: 0.25rem 0.5rem;
                    border-radius: 6px;
                    font-size: 0.7rem;
                    font-weight: 600;
                }

                .status-badge {
                    background: rgba(34, 197, 94, 0.1);
                    color: #22c55e;
                    padding: 0.25rem 0.5rem;
                    border-radius: 6px;
                    font-size: 0.7rem;
                    font-weight: 600;
                }

                /* Sync Indicator */
                .sync-indicator {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-top: 1rem;
                    padding-top: 1rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                }

                .sync-text {
                    font-size: 0.7rem;
                    color: var(--text-muted);
                }

                .sync-dots {
                    display: flex;
                    gap: 2px;
                }

                .sync-dots span {
                    width: 3px;
                    height: 3px;
                    background: var(--text-muted);
                    border-radius: 50%;
                    animation: syncBounce 1.4s ease-in-out infinite both;
                }

                .sync-dots span:nth-child(1) { animation-delay: -0.32s; }
                .sync-dots span:nth-child(2) { animation-delay: -0.16s; }

                @keyframes syncBounce {
                    0%, 80%, 100% { transform: scale(0); }
                    40% { transform: scale(1); }
                }

                /* Empty & Error States */
                .empty-state, .error-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 1.5rem 1rem;
                    text-align: center;
                    color: var(--text-muted);
                }

                .empty-state svg, .error-state svg {
                    font-size: 2rem;
                    opacity: 0.5;
                }

                .empty-state p, .error-state p {
                    margin: 0;
                    font-weight: 500;
                    font-size: 0.9rem;
                }

                .retry-btn, .refresh-btn {
                    background: rgba(var(--primary-rgb), 0.1);
                    color: var(--primary-color);
                    border: 1px solid rgba(var(--primary-rgb), 0.3);
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .retry-btn:hover, .refresh-btn:hover {
                    background: var(--primary-color);
                    color: white;
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .music-widget {
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

                @media (max-width: 480px) {
                    .widget-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 0.5rem;
                    }

                    .live-badge {
                        align-self: flex-start;
                    }
                }

                /* Reduced motion support */
                @media (prefers-reduced-motion: reduce) {
                    .music-widget,
                    .track-card {
                        transition: none;
                    }

                    .pulse,
                    .playing-indicator span,
                    .sync-dots span {
                        animation: none;
                    }
                }
            `}</style>
        </motion.div>
    );
};

export default React.memo(LastFMNowPlaying);