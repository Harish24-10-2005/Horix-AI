"use client"

import Avatar1 from "@/assets/avatar-1.png";
import Avatar2 from "@/assets/avatar-2.png";
import Avatar3 from "@/assets/avatar-3.png";
import Avatar4 from "@/assets/avatar-4.png";
import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
    {
        text: "“Aigentic has revolutionized how we build and deploy AI agents. The drag-and-drop interface and custom LLM support are game-changers.”",
        name: "Alex Johnson",
        position: "AI Innovation Lead",
        avatarImg: Avatar1,
    },
    {
        text: "“The ability to connect multiple AI agents in workflows has dramatically increased our efficiency. Renting agents is a great feature!”",
        name: "Emily Chen",
        position: "Data Scientist",
        avatarImg: Avatar2,
    },
    {
        text: "“Building AI agents from sketches and prompts is incredibly intuitive. Aigentic is a powerful tool for any AI enthusiast.”",
        name: "David Kim",
        position: "AI Researcher",
        avatarImg: Avatar3,
    },
    {
        text: "“With Aigentic's premium LLM recommendations, we're consistently getting the best results. Selling our AI agents on this platform was super easy.”",
        name: "Alec Witthen",
        position: "CTO, Tech Solutions",
        avatarImg: Avatar4,
    },
]

export function Testimonials() {
    return (
        <>
            <section className={""}>
                <div className={"container"}>
                    <div className={"flex overflow-hidden mt-10 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]"}>
                        <motion.div
                            initial={{translateX: '-50%'}}
                            animate={{translateX: '0'}}
                            transition={{
                                repeat: Infinity,
                                duration: 50,
                                ease: "linear",
                            }}
                            className={"flex flex-none gap-5"}>
                           
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    )
}

