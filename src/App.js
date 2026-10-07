import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import music from "./music/voyah.mp3";
import "./App.css";

// =========================================================
// TO'Y SANASI
// 2-NOYABR 2026 — 18:00
// =========================================================

const WEDDING_DATE = new Date("2026-11-02T18:00:00");

function App() {
    const [opened, setOpened] = useState(false);
    const [opening, setOpening] = useState(false);

    // =====================================================
    // MUSIC
    // =====================================================

    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleMusic = async () => {
        const audio = audioRef.current;

        if (!audio) return;

        try {
            if (audio.paused) {
                await audio.play();
                setIsPlaying(true);
            } else {
                audio.pause();
                setIsPlaying(false);
            }
        } catch (error) {
            console.log("Music error:", error);
        }
    };

    // =====================================================
    // COUNTDOWN
    // =====================================================

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();

            const difference =
                WEDDING_DATE.getTime() - now.getTime();

            if (difference <= 0) {
                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                });

                return;
            }

            setTimeLeft({
                days: Math.floor(
                    difference / (1000 * 60 * 60 * 24)
                ),

                hours: Math.floor(
                    (difference / (1000 * 60 * 60)) % 24
                ),

                minutes: Math.floor(
                    (difference / (1000 * 60)) % 60
                ),

                seconds: Math.floor(
                    (difference / 1000) % 60
                ),
            });
        };

        updateCountdown();

        const timer = setInterval(updateCountdown, 1000);

        return () => clearInterval(timer);
    }, []);

    // =====================================================
    // KONVERT OCHILISHI
    // =====================================================

    const handleSealClick = () => {
        if (opening || opened) return;

        const audio = audioRef.current;

        if (audio) {
            audio
                .play()
                .then(() => {
                    setIsPlaying(true);
                })
                .catch((error) => {
                    console.log(
                        "Music autoplay error:",
                        error
                    );
                });
        }

        setOpening(true);

        setTimeout(() => {
            setOpened(true);
        }, 1300);
    };

    // =====================================================
    // COUNTDOWN BOX
    // =====================================================

    const [activeBoxes, setActiveBoxes] = useState([]);

    const handleBoxClick = (type) => {
        setActiveBoxes((prev) => {
            if (prev.includes(type)) {
                return prev;
            }

            return [...prev, type];
        });
    };

    const CountdownBox = ({
                              type,
                              title,
                              value,
                              icon,
                          }) => {
        const isActive = activeBoxes.includes(type);

        return (
            <motion.button
                type="button"
                className={`date-item ${
                    isActive ? "active" : ""
                }`}
                onClick={() => handleBoxClick(type)}
                whileTap={{ scale: 0.97 }}
            >
                <div className="date-box">

                    <div className="date-icon">
                        {icon}
                    </div>

                    <div className="date-label">
                        {title}
                    </div>

                    <div
                        className={`date-number ${
                            isActive ? "show" : ""
                        }`}
                    >
                        {isActive ? value : "• • •"}
                    </div>

                </div>
            </motion.button>
        );
    };

    return (
        <div className="app">

            {/* =================================================
                AUDIO
            ================================================= */}

            <audio
                ref={audioRef}
                src={music}
                loop
                preload="auto"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />

            {/* =================================================
                MUSIC BUTTON
            ================================================= */}

            <button
                type="button"
                className={`music-button ${
                    isPlaying ? "playing" : ""
                }`}
                onClick={toggleMusic}
                aria-label={
                    isPlaying
                        ? "Musiqani to'xtatish"
                        : "Musiqani yoqish"
                }
            >
                {isPlaying ? (
                    <span className="pause-icon">
                        <span></span>
                        <span></span>
                    </span>
                ) : (
                    <span className="play-icon"></span>
                )}
            </button>

            {/* =================================================
                INTRO / ENVELOPE
            ================================================= */}

            <AnimatePresence>
                {!opened && (
                    <motion.div
                        className={`intro ${
                            opening ? "is-opening" : ""
                        }`}
                        initial={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                            transition: {
                                duration: 0.35,
                            },
                        }}
                    >
                        <div className="envelope">

                            <img
                                src="/envelope.png"
                                alt="Taklifnoma konverti"
                                className="envelope-image"
                            />

                            <button
                                type="button"
                                className="seal-button"
                                onClick={handleSealClick}
                                disabled={opening}
                                aria-label="Taklifnomani ochish"
                            >
                                <span className="seal-ripple"></span>
                            </button>

                        </div>

                        {/* =================================================
                            OPENING LIGHT
                        ================================================= */}

                        {opening && (
                            <div className="opening-light-wrapper">

                                <motion.div
                                    className="opening-light"
                                    initial={{
                                        opacity: 0,
                                        scale: 0.05,
                                    }}
                                    animate={{
                                        opacity: [
                                            0,
                                            0.9,
                                            1,
                                            0.85,
                                            0,
                                        ],
                                        scale: [
                                            0.05,
                                            0.45,
                                            1.8,
                                            8,
                                            35,
                                        ],
                                    }}
                                    transition={{
                                        duration: 1.3,
                                        times: [
                                            0,
                                            0.18,
                                            0.45,
                                            0.72,
                                            1,
                                        ],
                                        ease: [
                                            "easeOut",
                                            "easeOut",
                                            "easeInOut",
                                            "easeIn",
                                        ],
                                    }}
                                />

                                <motion.div
                                    className="opening-glow"
                                    initial={{
                                        opacity: 0,
                                        scale: 0.1,
                                    }}
                                    animate={{
                                        opacity: [
                                            0,
                                            0.8,
                                            1,
                                            0,
                                        ],
                                        scale: [
                                            0.1,
                                            0.8,
                                            4,
                                            18,
                                        ],
                                    }}
                                    transition={{
                                        duration: 1.3,
                                        ease: "easeOut",
                                    }}
                                />

                                <motion.div
                                    className="light-core"
                                    initial={{
                                        opacity: 0,
                                        scale: 0.05,
                                    }}
                                    animate={{
                                        opacity: [
                                            0,
                                            1,
                                            1,
                                            0,
                                        ],
                                        scale: [
                                            0.05,
                                            0.8,
                                            2,
                                            7,
                                        ],
                                    }}
                                    transition={{
                                        duration: 1.3,
                                        times: [
                                            0,
                                            0.3,
                                            0.62,
                                            1,
                                        ],
                                        ease: "easeOut",
                                    }}
                                />

                            </div>
                        )}

                    </motion.div>
                )}
            </AnimatePresence>

            {/* =================================================
                MAIN PAGE
            ================================================= */}

            {opened && (
                <motion.main
                    className="invitation-page"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >

                    {/* =================================================
                        MAIN INVITATION IMAGE
                    ================================================= */}

                    <section className="invitation">

                        <img
                            src="/amir.png"
                            alt="To'y taklifnomasi"
                            className="invitation-image"
                        />

                    </section>

                    {/* =================================================
                        DATE + COUNTDOWN
                    ================================================= */}

                    <section className="date-section">

                        <div className="date-decoration">
                            ✦
                        </div>

                        <h2 className="date-title">
                            To‘yimizga
                        </h2>

                        <p className="date-subtitle">
                            2-noyabr 2026
                            <span>•</span>
                            18:00
                        </p>

                        <div className="date-line">
                            <span></span>
                            <b>✦</b>
                            <span></span>
                        </div>

                        <p className="date-caption">
                            To‘ygacha:
                        </p>

                        <div className="date-boxes">

                            <CountdownBox
                                type="days"
                                title="KUN"
                                value={`${timeLeft.days} kun`}
                                icon="♧"
                            />

                            <CountdownBox
                                type="hours"
                                title="SOAT"
                                value={`${timeLeft.hours} soat`}
                                icon="◷"
                            />

                            <CountdownBox
                                type="minutes"
                                title="MINUT"
                                value={`${timeLeft.minutes} minut`}
                                icon="⌛"
                            />

                            <CountdownBox
                                type="seconds"
                                title="SONIYA"
                                value={`${timeLeft.seconds} soniya`}
                                icon="◌"
                            />

                        </div>

                        <div className="date-bottom">
                            ♡ &nbsp; Sizni katta hayajon bilan kutamiz!
                        </div>

                        <div className="date-line bottom-line">
                            <span></span>
                            <b>✦</b>
                            <span></span>
                        </div>

                    </section>

                    {/* =================================================
                        NAMES
                    ================================================= */}

                    <section className="invitation">

                        <img
                            src="/image_transparent.png"
                            alt="Amirxon & Pokizaxon"
                            className="invitation-image"
                        />

                        <div className="invitation-content">

                            {/* KUYOV */}

                            <h1 className="groom-name">
                                <span className="first-letter">
                                    A
                                </span>
                                mirxon
                            </h1>

                            {/* AND */}

                            <div className="and">

                                <span></span>

                                <em>and</em>

                                <span></span>

                            </div>

                            {/* KELIN */}

                            <h1 className="bride-name">
                                <span className="first-letter">
                                    P
                                </span>
                                okizaxon
                            </h1>

                            {/* OTA-ONA */}

                            <div className="parents">

                                <p>
                                    With the love and blessings
                                    <br />
                                    of their families, they begin a
                                    <br />
                                    beautiful new chapter together.
                                </p>

                            </div>

                            {/* MATN */}

                            <p className="invitation-text">

                                Hayotimizning eng go‘zal kunida
                                <br />

                                sizni yonimizda ko‘rishdan
                                <br />

                                mamnun bo‘lamiz

                            </p>

                            {/* THANKS */}

                            <p className="thanks">

                                E’tiboringiz va tashrifingiz uchun
                                <br />

                                tashakkur

                            </p>

                        </div>

                    </section>

                    {/* =================================================
                        CALENDAR
                    ================================================= */}

                    <motion.section
                        className="section italian_calendar"
                        initial={{
                            opacity: 0,
                            y: 40,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                    >

                        <img
                            src="/sada.png"
                            alt=""
                            className="calendar-frame"
                        />

                        <div className="calendar_overlay">

                            <p className="calendar_title">
                                Il Nostro Giorno
                            </p>

                            <h2>
                                2 NOVEMBER 2026
                            </h2>

                            <div className="calendar_card">

                                <div className="month">
                                    NOVEMBER
                                </div>

                                <div className="calendar">

                                    {[
                                        "M",
                                        "T",
                                        "W",
                                        "T",
                                        "F",
                                        "S",
                                        "S",
                                    ].map(
                                        (day, index) => (
                                            <div
                                                key={index}
                                                className="day_name"
                                            >
                                                {day}
                                            </div>
                                        )
                                    )}

                                    {/* November 2026 starts on Sunday */}

                                    <div className="day empty_day"></div>
                                    <div className="day empty_day"></div>
                                    <div className="day empty_day"></div>
                                    <div className="day empty_day"></div>
                                    <div className="day empty_day"></div>
                                    <div className="day empty_day"></div>

                                    {Array.from(
                                        { length: 30 },
                                        (_, index) => {
                                            const day =
                                                index + 1;

                                            return (
                                                <div
                                                    key={day}
                                                    className={
                                                        day === 2
                                                            ? "day active_day"
                                                            : "day"
                                                    }
                                                >

                                                    {day}

                                                    {day === 2 && (
                                                        <span className="calendar-heart">
                                                            ♥
                                                        </span>
                                                    )}

                                                </div>
                                            );
                                        }
                                    )}

                                </div>

                            </div>

                            <h2 className="jas">

                                Bu biz uchun muhim sana
                                <br />

                                va ushbu kunda sizni
                                <br />

                                kutib qolamiz!!!

                            </h2>

                        </div>

                    </motion.section>

                    {/* =================================================
                        NEW EUROPEAN PROGRAM
                    ================================================= */}

                    <motion.section
                        className="program-section"
                        initial={{
                            opacity: 0,
                            y: 40,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                    >

                        <div className="program-elegant">

                            <div className="program-small-title">
                                OUR STORY
                            </div>

                            <div className="program-infinity">
                                ∞
                            </div>

                            <div className="program-line">

                                <span></span>

                                <b>✦</b>

                                <span></span>

                            </div>

                            <h2 className="program-main-title">
                                A day to remember
                            </h2>

                            <p className="program-description">
                                Two hearts, one beautiful beginning
                            </p>

                            <div className="program-date">

                                <span>02</span>

                                <i>•</i>

                                <span>11</span>

                                <i>•</i>

                                <span>2026</span>

                            </div>

                            <div className="program-bottom">

                                <span>
                                    FOREVER
                                </span>

                                <span className="program-heart">
                                    ♡
                                </span>

                                <span>
                                    TOGETHER
                                </span>

                            </div>

                        </div>

                    </motion.section>

                    {/* =================================================
                        LOCATION
                    ================================================= */}

                    <section className="location-section">

                        <div className="location-card">

                            <img
                                src="/map.png"
                                alt=""
                                className="location-background"
                            />

                            <div className="location-content">

                                <div className="location-top-ornament">
                                    ✦
                                </div>

                                <p className="location-label">
                                    TO‘YIMIZ MANZILI
                                </p>

                                <h2 className="location-title">
                                    Versal
                                </h2>

                                <p className="location-subtitle">
                                    To‘yxona
                                </p>

                                <div className="location-divider">

                                    <span></span>

                                    <b>✦</b>

                                    <span></span>

                                </div>

                                <p className="location-text">

                                    Sizni baxtli kunimizni birga
                                    <br />

                                    nishonlash uchun taklif qilamiz

                                </p>

                                <div className="location-pin">

                                    <img
                                        src="/location-dot-solid-full.svg"
                                        alt=""
                                        className="location-dot"
                                    />

                                </div>

                                <p className="location-address">

                                    Versal to‘yxonasi
                                    <br />

                                    Toshkent shahri

                                </p>

                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=Versal+Restaurant+Beruniy+8A+Tashkent"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="location-button"
                                >
                                    Xaritada ko‘rish
                                </a>

                                <div className="location-bottom-ornament">
                                    ❦
                                </div>

                            </div>

                        </div>

                    </section>

                    {/* =================================================
                        FOOTER
                    ================================================= */}

                    <section className="footer-section">

                        <img
                            src="/footer.png"
                            alt=""
                            className="footer-bg"
                        />

                        <div className="footer-content">

                            <p className="footer-top">
                                BIZ BILAN BIRGA BO‘LING
                            </p>

                            <h2 className="footer-names">

                                Amirxon

                                <span>
                                    &amp;
                                </span>

                                Pokizaxon

                            </h2>

                            <div className="footer-date">

                                <span>
                                    02
                                </span>

                                <b>
                                    •
                                </b>

                                <span>
                                    11
                                </span>

                                <b>
                                    •
                                </b>

                                <span>
                                    2026
                                </span>

                            </div>

                            <p className="footer-message">

                                Hayotimizning eng go‘zal kunida
                                <br />

                                sizni yonimizda ko‘rishdan
                                <br />

                                mamnun bo‘lamiz.

                            </p>

                            <p className="footer-message1">

                                Hurmat va ehtirom ila
                                <br />

                                Melikulovlar oilasi!

                            </p>

                            <div className="footer-heart">
                                ♡
                            </div>

                        </div>

                    </section>

                </motion.main>
            )}

        </div>
    );
}

export default App;