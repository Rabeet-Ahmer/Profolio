// components/hero-section.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const headlineRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Headline animation with GSAP
    if (headlineRef.current) {
      const chars = headlineRef.current.querySelectorAll(".char");
      gsap.fromTo(
        chars,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.5,
        }
      );
    }

    // Scroll indicator animation
    if (scrollIndicatorRef.current) {
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: "power1.inOut",
      });
    }

    // Clean up GSAP animations on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf(headlineRef.current);
      gsap.killTweensOf(scrollIndicatorRef.current);
    };
  }, []);

  const renderHeadline = (text: string) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="char inline-block will-change-transform"
        style={{ display: "inline-block" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      id="hero"
      className="relative flex h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white"
    >
      <div className="text-center px-4">
        <h1
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tighter"
        >
          <div className="overflow-hidden py-2">{renderHeadline("Hi, I'm Rabeet Ahmer.")}</div>
          <div className="overflow-hidden py-2">{renderHeadline("A Creative Developer")}</div>
        </h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5, ease: "power3.out" }}
          className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-300"
        >
          Building immersive digital experiences with a focus on motion and interaction.
        </motion.p>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8, ease: "power3.out" }}
          className="mt-10"
        >
          <Link
            href="#projects"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View My Work
            <span className="ml-2">→</span>
          </Link>
        </motion.div>
      </div>

      <motion.div
        ref={scrollIndicatorRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400"
      >
        <ChevronDown className="h-8 w-8" />
        <span className="sr-only">Scroll down</span>
      </motion.div>
    </section>
  );
};
