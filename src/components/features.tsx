"use client";

import {DotLottieCommonPlayer, DotLottiePlayer,} from "@dotlottie/react-player";
import ProductImage from "@/assets/product-image.png";
import MarketPlace from "@/assets/marketplace.png";
import SketchImage from "@/assets/sketch_img.png";
import AIAgentImage from "@/assets/aiagent_img.png";
import {animate, motion, useMotionTemplate, useMotionValue, ValueAnimationTransition,} from "framer-motion";
import {ComponentPropsWithoutRef, useEffect, useRef, useState, ReactNode} from "react";
import { ComparisonSlider } from "./ComparisonSlider";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client - replace with your actual URL and anon key from Supabase dashboard
const supabaseUrl = 'https://etoqmkuqtwtjhttcyfei.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0b3Fta3VxdHd0amh0dGN5ZmVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0NDQxNTgsImV4cCI6MjA2MDAyMDE1OH0.a4718opTbPX-HdEZ__6qL2fozvYPN8scHhRX9avDzGs';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const tabs = [
    {
        icon: "/assets/lottie/vroom.lottie",
        title: "Build AI Agents",
        description: "Create custom AI agents using simple drag & drop interface or convert sketches to working agents with prompt-based building.",
        isNew: false,
        backgroundPositionX: 0,
        backgroundPositionY: 0,
        backgroundSizeX: 150,
        useComparisonSlider: true,
    },
    {
        icon: "/assets/lottie/click.lottie",
        title: "Deploy & Rent",
        description: "Deploy your AI agents and earn by renting them to others in the marketplace. Buy and use other creators' agents.",
        isNew: false,
        backgroundPositionX: 98,
        backgroundPositionY: 100,
        backgroundSizeX: 135,
        useComparisonSlider: false,
    },
    {
        icon: "/assets/lottie/stars.lottie",
        title: "Premium Features",
        description: "Get smart LLM recommendations for your agents based on output quality. Use multiple AI agents together with any LLM by providing your own API keys.",
        isNew: true,
        backgroundPositionX: 100,
        backgroundPositionY: 27,
        backgroundSizeX: 177,
        useComparisonSlider: false,
        comingSoon: true,
    },
];

const FeatureTab = (
    props: (typeof tabs)[number] &
        ComponentPropsWithoutRef<"div"> & { selected: boolean }
) => {
    const tabRef = useRef<HTMLDivElement>(null);
    const isDeployRent = props.title === "Deploy & Rent";
    const dotLottieRef = useRef<DotLottieCommonPlayer>(null);

    const xPercentage = useMotionValue(0);
    const yPercentage = useMotionValue(0);

    const maskImage = useMotionTemplate`radial-gradient(80px 80px at ${xPercentage}% ${yPercentage}%, black, transparent)`;

    useEffect(() => {
        if (!tabRef.current || !props.selected) return;

        xPercentage.set(0);
        yPercentage.set(0);
        const {height, width} = tabRef.current?.getBoundingClientRect();
        const circumference = height * 2 + width * 2;
        const times = [
            0,
            width / circumference,
            (width + height) / circumference,
            (width * 2 + height) / circumference,
            1,
        ];

        const options: ValueAnimationTransition = {
            times,
            duration: 5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
        };

        animate(xPercentage, [0, 100, 100, 0, 0], options);
        animate(yPercentage, [0, 0, 100, 100, 0], options);
    }, [props.selected]);

    const handleTabHover = () => {
        if (dotLottieRef.current === null) return;
        dotLottieRef.current.seek(0);
        dotLottieRef.current.play();
    };

    return (
        <div
            onMouseEnter={handleTabHover}
            className={
                "border border-muted flex items-center p-2.5 gap-2.5 rounded-xl relative cursor-pointer hover:bg-muted/30 overflow-hidden"
            }
            ref={tabRef}
            onClick={props.onClick}
        >
            {props.selected && (
                <motion.div
                    style={{maskImage}}
                    className={
                        "absolute inset-0 -m-px border border-[#A369FF] rounded-xl"
                    }
                />
            )}
            
            <div className={"size-12 border border-muted rounded-lg inline-flex items-center justify-center"}>
                <DotLottiePlayer
                    src={props.icon}
                    className={"size-5"}
                    autoplay
                    ref={dotLottieRef}
                />
            </div>
            <div className={"font-medium"}>{props.title}</div>
            {props.isNew && (
                <div className={"text-xs rounded-full text-white px-2 py-0.5 bg-[#8c44ff] font-semibold"}>
                    New
                </div>
            )}
        </div>
    );
};

export function Features() {
    const [selectedTab, setSelectedTab] = useState(0);
    const [showComingSoon, setShowComingSoon] = useState(false);
    const [notifyEmail, setNotifyEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const backgroundPositionX = useMotionValue(tabs[0].backgroundPositionX);
    const backgroundPositionY = useMotionValue(tabs[0].backgroundPositionY);
    const backgroundSizeX = useMotionValue(tabs[0].backgroundSizeX);

    const backgroundPosition = useMotionTemplate`${backgroundPositionX}% ${backgroundPositionY}%`;
    const backgroundSize = useMotionTemplate`${backgroundSizeX}% auto`;

    const handleSelectTab = (index: number) => {
        setSelectedTab(index);
        
        if (tabs[index].comingSoon) {
            setShowComingSoon(true);
        } else {
            setShowComingSoon(false);
            
            const animateOptions: ValueAnimationTransition = {
                duration: 2,
                ease: "easeInOut",
            };
            
            animate(
                backgroundSizeX,
                [backgroundSizeX.get(), 100, tabs[index].backgroundSizeX],
                animateOptions
            );
            animate(
                backgroundPositionX,
                [backgroundPositionX.get(), tabs[index].backgroundPositionX],
                animateOptions
            );
            animate(
                backgroundPositionY,
                [backgroundPositionY.get(), tabs[index].backgroundPositionY],
                animateOptions
            );
        }
    };

    const handleNotifySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage("");
        
        try {
            // Insert the email into the Supabase table
            const { data, error } = await supabase
                .from('early_access_emails')
                .insert([{ email: notifyEmail }]);
                
            if (error) {
                if (error.code === '23505') {
                    // Unique constraint error - email already exists
                    setErrorMessage("This email is already registered for updates.");
                } else {
                    setErrorMessage("Something went wrong. Please try again later.");
                    console.error("Supabase error:", error);
                }
                setIsSubmitting(false);
                return;
            }
            
            setIsSubmitted(true);
            // Reset after 3 seconds
            setTimeout(() => {
                setIsSubmitted(false);
                setNotifyEmail("");
            }, 3000);
        } catch (err) {
            console.error("Error submitting email:", err);
            setErrorMessage("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
   
    return (
        <>
            <section id="features" className={"py-20 md:py-24"}>
                <div className={"container"}>
                    <h2 className={"text-5xl md:text-6xl font-medium text-center tracking-tighter"}>
                        Key Features.
                    </h2>
                    <p className={"text-white/70 text-lg md:text-xl max-w-2xl mx-auto text-center tracking-tight mt-5"}>
                        Build, deploy, rent, and monetize AI agents with our intuitive platform. 
                        Connect any LLM and create powerful AI solutions without coding.
                    </p>

                    <div className={"mt-10 grid lg:grid-cols-3 gap-3"}>
                        {tabs.map((tab, index) => (
                            <FeatureTab
                                {...tab}
                                key={index}
                                onClick={() => handleSelectTab(index)}
                                selected={selectedTab === index}
                            />
                        ))}
                    </div>
                    <motion.div className={"border border-muted rounded-xl p-2.5 mt-3"}>
                        {showComingSoon ? (
                            <div className="aspect-video bg-gradient-to-br from-purple-900/70 to-indigo-900/50 rounded-lg relative overflow-hidden flex flex-col items-center justify-center text-center p-4 sm:p-6 md:p-8">
                                <motion.div 
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
                                />
                                <motion.div 
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="absolute -bottom-32 -left-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"
                                />
                                
                                <motion.div 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.6 }}
                                    className="relative z-10 w-full max-w-xl"
                                >
                                    <div className="text-xs inline-block px-3 py-1 rounded-full bg-purple-500/30 text-purple-200 font-semibold mb-3 md:mb-4">
                                        Coming Soon
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
                                        Premium Features
                                    </h3>
                                    <p className="text-white/80 max-w-xl mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base md:text-lg px-2">
                                        Get early access to our smart LLM recommendations and multi-agent workflows. 
                                        Be among the first to unlock the full potential of AI agent management.
                                    </p>
                                    
                                    {isSubmitted ? (
                                        <motion.div 
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="bg-green-500/20 text-green-200 px-4 py-3 sm:px-6 sm:py-4 rounded-lg mx-auto max-w-sm"
                                        >
                                            Thanks! We&apos;ll notify you when Premium Features launch.
                                        </motion.div>
                                    ) : (
                                        <div className="w-full px-4 sm:px-0">
                                            <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-md mx-auto w-full">
                                                <input 
                                                    type="email" 
                                                    value={notifyEmail}
                                                    onChange={(e) => setNotifyEmail(e.target.value)}
                                                    placeholder="Enter your email" 
                                                    required
                                                    disabled={isSubmitting}
                                                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-full text-sm sm:text-base"
                                                />
                                                <button 
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg font-medium transition-all disabled:opacity-70 text-sm sm:text-base whitespace-nowrap"
                                                >
                                                    {isSubmitting ? "Saving..." : "Notify Me"}
                                                </button>
                                            </form>
                                            {errorMessage && (
                                                <div className="mt-2 text-xs sm:text-sm text-red-400 text-center">
                                                    {errorMessage}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                                
                                <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 flex items-center text-xs text-white/50">
                                    <span className="mr-1 sm:mr-2 size-1.5 sm:size-2 bg-green-500 rounded-full"></span>
                                    <span className="text-xs">more people are waiting</span>
                                </div>
                            </div>
                        ) : tabs[selectedTab].title === "Deploy & Rent" ? (
                            <div className="aspect-video relative overflow-hidden rounded-lg">
                                <motion.img 
                                    src={MarketPlace.src} 
                                    alt="Marketplace" 
                                    className="w-full h-full object-cover"
                                    initial={{ scale: 1.1, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        {tabs[selectedTab].title}
                                    </h3>
                                    <p className="text-white/90 max-w-3xl">
                                        {tabs[selectedTab].description}
                                    </p>
                                </div>
                            </div>
                        ) : tabs[selectedTab].useComparisonSlider ? (
                            <div className="aspect-video relative overflow-hidden rounded-lg">
                                <ComparisonSlider 
                                    beforeImage={SketchImage.src} 
                                    afterImage={AIAgentImage.src} 
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        {tabs[selectedTab].title}
                                    </h3>
                                    <p className="text-white/90 max-w-3xl">
                                        {tabs[selectedTab].description}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div
                                className={"aspect-video bg-cover border border-muted rounded-lg relative overflow-hidden"}
                                style={{
                                    backgroundPosition: backgroundPosition.get(),
                                    backgroundSize: backgroundSize.get(),
                                    backgroundImage: `url(${ProductImage.src})`,
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        {tabs[selectedTab].title}
                                    </h3>
                                    <p className="text-white/90 max-w-3xl">
                                        {tabs[selectedTab].description}
                                    </p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>
        </>
    );
}