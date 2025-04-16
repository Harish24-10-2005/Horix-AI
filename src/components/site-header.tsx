"use client"

import Link from "next/link";
import BgLogo from "@/assets/bglogo.png";
import SiteLogo from "@/assets/logo.svg"
import {CodeXml, Feather, MenuIcon, Newspaper, Wallet2} from "lucide-react";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import {useState} from "react";
import {ActionButton} from "@/components/action-button";

export default function SiteHeader() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <style jsx>{`
                html {
                    scroll-behavior: smooth;
                }
            `}</style>
            <header className="py-4 border-b max-md:backdrop-blur md:border-none sticky top-0 z-10">
                <div className="container max-md:px-4">
                    <div
                        className="flex items-center justify-between md:border md:p-2.5 md:rounded-xl max-w-2xl mx-auto md:backdrop-blur">

                        <div className="inline-flex items-center gap-2">
                            <Link href="/">
                                <div className="border border-[rgba(255,255,255,0.1)] size-10 rounded-lg inline-flex items-center justify-center py-2">
                                    <img src={BgLogo.src} alt="logo" className="size-10 h-auto object-contain" />
                                </div>
                            </Link>
                            <p className="font-bold">Horix AI</p>
                        </div>
                        
                        <section className="max-md:hidden">
                            <nav className="flex gap-8 items-center text-sm">
                                <Link href="#features" className="text-white/70 hover:text-white transition"
                                      onClick={() => {
                                          const element = document.getElementById('features');
                                          element?.scrollIntoView({ behavior: 'smooth' });
                                      }}>
                                    Features
                                </Link>
                                <Link href="#benefits" className="text-white/70 hover:text-white transition"
                                      onClick={() => {
                                          const element = document.getElementById('benefits');
                                          element?.scrollIntoView({ behavior: 'smooth' });
                                      }}>Benefits</Link>

                                <Link href="#footer" className="text-white/70 hover:text-white transition"
                                      onClick={() => {
                                        const element = document.getElementById('footer');
                                        element?.scrollIntoView({ behavior: 'smooth' });
                                    }}>
                                    About
                                </Link>
                            </nav>
                        </section>
                        <section className="flex max-md:gap-4 items-center">

                            <ActionButton label="Join Waitlist" href="#waitlist-form"/>

                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger>
                                    <MenuIcon className="size-9 md:hidden hover:text-white/70 transition"/>
                                </SheetTrigger>
                                <SheetContent side="top" className="p-8">
                                    <div className="inline-flex items-center center gap-3">
                                        <div className="border border-[rgba(255,255,255,0.1)] size-8 rounded-lg inline-flex items-center justify-center py-1">
                                            <img src={BgLogo.src} alt="logo" className="h-auto w-auto max-h-8 max-w-8 object-contain" />
                                        </div>
                                        <p className="font-bold">Horix AI</p>
                                    </div>
                                    <div className="mt-8 mb-4">
                                        <nav className="grid gap-4 items-center text-lg">
                                        <Link href="#features" className="text-white/70 hover:text-white transition"
                                      onClick={() => {
                                          const element = document.getElementById('features');
                                          element?.scrollIntoView({ behavior: 'smooth' });
                                      }}>
                                    Features
                                </Link>
                                <Link href="#benefits" className="text-white/70 hover:text-white transition"
                                      onClick={() => {
                                          const element = document.getElementById('benefits');
                                          element?.scrollIntoView({ behavior: 'smooth' });
                                      }}>Benefits</Link>

                                <Link href="#footer" className="text-white/70 hover:text-white transition"
                                      onClick={() => {
                                        const element = document.getElementById('footer');
                                        element?.scrollIntoView({ behavior: 'smooth' });
                                    }}>
                                    About
                                </Link>
                                        </nav>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </section>
                    </div>
                </div>
            </header>
        </>
    )
}