import X from "@/assets/social-x.svg";
import Instagram from "@/assets/social-instagram.svg";
import Youtube from "../assets/social-youtube.svg";
import BgLogo from "@/assets/bglogo.png"
import SiteLogo from "@/assets/logo.svg";
import { Mail, Linkedin, PhoneCall, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function SiteFooter() {
    const currentYear = new Date().getFullYear();
    
    const footerLinks = [
        { title: "About", href: "/about" },
        { title: "Services", href: "/services" },
        { title: "Pricing", href: "/pricing" },
        { title: "Contact", href: "/contact" },
        { title: "Privacy Policy", href: "/privacy" },
        { title: "Terms of Service", href: "/terms" },
    ];

    return (
        <footer id="footer" className="bg-gray-900 text-gray-300 border-t border-gray-800">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-800 border border-gray-700 rounded-lg p-2 inline-flex items-center justify-center">
                            <img src={BgLogo.src} alt="logo" className="h-6 w-auto" />
                            </div>
                            <p className="font-semibold text-white text-lg">Aigentic Marketplace</p>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Pioneering AI solutions to transform your business and elevate your digital experience.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://x.com/HorixA19914" target="_blank" rel="noopener noreferrer" 
                               className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors duration-200">
                                <X className="w-5 h-5" />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" 
                               className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors duration-200">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" 
                               className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors duration-200">
                                <Youtube className="w-5 h-5" />
                            </a>
                            <a href="https://www.linkedin.com/in/horix-ai-a5152a360/" target="_blank" rel="noopener noreferrer" 
                               className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors duration-200">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-white font-medium text-lg">Quick Links</h3>
                        <ul className="space-y-3">
                            {footerLinks.slice(0, 3).map((link) => (
                                <li key={link.title}>
                                    <Link href={link.href} className="flex items-center group">
                                        <ChevronRight className="w-4 h-4 mr-2 opacity-70 group-hover:opacity-100 text-blue-400" />
                                        <span className="hover:text-white transition-colors duration-200">{link.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="space-y-6">
                        <h3 className="text-white font-medium text-lg">Resources</h3>
                        <ul className="space-y-3">
                            {footerLinks.slice(3).map((link) => (
                                <li key={link.title}>
                                    <Link href={link.href} className="flex items-center group">
                                        <ChevronRight className="w-4 h-4 mr-2 opacity-70 group-hover:opacity-100 text-blue-400" />
                                        <span className="hover:text-white transition-colors duration-200">{link.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h3 className="text-white font-medium text-lg">Contact Us</h3>
                        <div className="space-y-4">
                            <a href="tel:+918807639930" className="flex items-center gap-3 hover:text-white transition-colors duration-200">
                                <div className="bg-gray-800 p-2 rounded-md">
                                    <PhoneCall className="w-5 h-5 text-blue-400" />
                                </div>
                                <span>+91 8807639930</span>
                            </a>
                            <a href="mailto:horixaimarketplace@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors duration-200">
                                <div className="bg-gray-800 p-2 rounded-md">
                                    <Mail className="w-5 h-5 text-blue-400" />
                                </div>
                                <span className="break-all">horixaimarketplace@gmail.com</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 py-6">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-400">
                        © {currentYear} Aigentic Marketplace. All rights reserved.
                    </p>
        
                </div>
            </div>
        </footer>
    );
}