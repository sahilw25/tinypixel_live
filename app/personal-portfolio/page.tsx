"use client";

import dynamic from "next/dynamic";
import CustomCursor from "@/components/CustomCursor";

const Portfolio = dynamic(() => import("@/components/Portfolio"), {
  ssr: false,
  loading: () => (
    <div className="w-screen h-screen flex items-center justify-center bg-[#F5F0E8]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-[#1A1A2E] border-t-[#FF6B35] rounded-full animate-spin" />
        <p className="font-body text-[#8B8070] text-sm tracking-widest uppercase">Loading</p>
      </div>
    </div>
  ),
});

export default function PersonalPortfolioPage() {
  return (
    <div className="portfolio-grain" style={{ overflow: 'hidden', background: '#F5F0E8', cursor: 'none' }}>
      <CustomCursor />
      <Portfolio />
    </div>
  );
}
