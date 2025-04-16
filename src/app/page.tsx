"use client";
import { ActionButton } from "@/components/action-button";
import SiteHeader from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { LogoTicker } from "@/components/logo-ticker";
import SiteFooter from "@/components/site-footer";
import { CallToAction } from "@/components/call-to-action";
import { Features } from "@/components/features";
import { Testimonials } from "@/components/testimonials";
import EnhancedForm from "@/components/enhanced-form"; // Import the new form component
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <SiteHeader />
            <HeroSection/>
            <LogoTicker/>
            <Features/>
            <section id="benefits" className="py-20 md:py-24 bg-black/5">
                <div className="container relative">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-6xl font-medium text-center tracking-tighter"
                    >
                        Benefits of Joining
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-white/70 tracking-tight text-center"
                    >
                        Be the first to access our platform, receive exclusive updates, and help shape the future of AI agent development.
                    </motion.p>
                    <div className="mt-10 grid md:grid-cols-2 gap-8">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-black/20 border border-white/10 p-8 rounded-xl hover:border-white/20 hover:bg-black/25 transition-colors duration-300"
                        >
                            <h3 className="text-2xl font-semibold">
                                Early Access
                            </h3>
                            <p className="mt-4 text-white/80">
                                Secure your spot in our cutting-edge AI agent marketplace. Be among the first to build, deploy,
                                and monetize AI agents using our intuitive tools.
                            </p>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="bg-black/20 border border-white/10 p-8 rounded-xl hover:border-white/20 hover:bg-black/25 transition-colors duration-300"
                        >
                            <h3 className="text-2xl font-semibold">
                                Exclusive Perks
                            </h3>
                            <p className="mt-4 text-white/80">
                                Unlock priority access to new features and potential discounts on premium services as an early
                                adopter.
                            </p>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="bg-black/20 border border-white/10 p-8 rounded-xl hover:border-white/20 hover:bg-black/25 transition-colors duration-300"
                        >
                            <h3 className="text-2xl font-semibold">
                                Community &amp; Collaboration
                            </h3>
                            <p className="mt-4 text-white/80">
                                Join a vibrant community of AI enthusiasts and innovators. Collaborate, share ideas, and stay
                                ahead in the rapidly evolving AI space.
                            </p>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-black/20 border border-white/10 p-8 rounded-xl hover:border-white/20 hover:bg-black/25 transition-colors duration-300"
                        >
                            <h3 className="text-2xl font-semibold">Shape the Future</h3>
                            <p className="mt-4 text-white/80">
                                Your feedback will play a key role in refining the platform, ensuring it meets your needs and
                                preferences.
                            </p>
                        </motion.div>
                    </div>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="mt-12 text-center"
                    >
                        <p className="text-xl md:text-2xl text-white/80">Don&apos;t miss out—sign up now to be at the forefront of AI agent technology!</p>
                    </motion.div>

                    {/* Replace the old form with the enhanced form component */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                      <div id="waitlist-form">
                        <EnhancedForm/>
                      </div>
                    </motion.div>
                </div>
            </section>
            <Testimonials/>
            <SiteFooter/>
        </>
    );
}
