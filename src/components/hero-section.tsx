"use client"

import BgLogo from "@/assets/bglogo.png";
import BlackHoleVideo from "@/assets/blackhole.mp4";
import BackgroundStars from "@/assets/stars.png";
import { motion } from "framer-motion";
import { useRef } from "react";
import { ActionButton } from "@/components/action-button";

export function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    
    return (
        <section
            id="hero"
            className="h-[492px] md:h-[800px] flex items-center overflow-hidden relative [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
            style={{backgroundImage: `url(${BackgroundStars.src})`}} 
            ref={sectionRef}>
            <div className="absolute inset-0 bg-[radial-gradient(75%_75%_at_center_center,rgb(140,69,255,0.5)_15%,rgb(14,0,36,0.5)_78%,transparent)]" />
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
                style={{
                  objectFit: 'cover',
                }}
                >
                    <source src={BlackHoleVideo} type="video/mp4" />
                    Your browser does not support the video tag.
              </video>
            {/* Planet Logic */}
            <div className="absolute size-64 md:size-96 rounded-full border border-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,black,rgb(24,0,66)) ]" />
            {/* Rings + Mini planets Logic */}
            <div
                className="absolute size-[344px] md:size-[580px] border border-white opacity-20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="absolute size-2 bg-white rounded-full top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute size-2 bg-white rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute size-5 border border-white rounded-full top-1/2 left-full -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center">
                    <div className="size-2 bg-white rounded-full" />
                </div>
            </div>
            <div
                className="absolute size-[444px] md:size-[780px] rounded-full border border-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed" />
            <div
                className="absolute size-[544px] md:size-[980px] rounded-full border border-white opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="absolute size-2 bg-white rounded-full top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"/>
                <div className="absolute size-2 bg-white rounded-full top-1/2 left-full -translate-x-1/2 -translate-y-1/2"/>
            </div>
            {/* Hero Section Content Logic */}
            <div className="container relative mt-16 flex flex-col items-center">
                {/* Move the logo higher with more negative margin */}
                <div className="mb-12 w-full flex justify-center">
                    <img 
                        src={BgLogo.src} 
                        alt="Background Logo" 
                        className="w-[150px] md:w-[180px] lg:w-[280px] brightness-200" 
                    />
                </div>
                
                <div className="relative z-10 text-center -mt-6">
                    <h1 className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter relative">
                      Horix AI
                    </h1>
                    <p className="text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] text-lg md:text-xl max-w-2xl mx-auto tracking-tight mt-5">
                      Join the waiting list to be the first to access our AI agent marketplace.
                    </p>

                    <div className="flex justify-center mt-5">
                        <ActionButton href="#waitlist-form" label="Join the Waitlist" />
                    </div>
                </div>
            </div>
        </section>
    )
}