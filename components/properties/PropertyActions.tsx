"use client";

import { Button } from "@/components/ui/button";
import { Share2, Download, Check } from "lucide-react";
import { useState } from "react";

export function PropertyActions({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out ${title} on PrimeEstate`,
          url: url,
        });
      } catch (err) {
        // Fallback to copy if user cancels or it fails
        if ((err as Error).name !== 'AbortError') {
          copyToClipboard(url);
        }
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="flex gap-4">
      <Button 
        onClick={handleShare}
        variant="outline" 
        className="flex-1 bg-white border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
      >
        {copied ? (
          <><Check className="h-4 w-4 mr-2 text-emerald-500" /> Copied!</>
        ) : (
          <><Share2 className="h-4 w-4 mr-2" /> Share</>
        )}
      </Button>
      <Button 
        onClick={handleDownload}
        variant="outline" 
        className="flex-1 bg-white border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
      >
        <Download className="h-4 w-4 mr-2" /> Brochure
      </Button>
    </div>
  );
}
