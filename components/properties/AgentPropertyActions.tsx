"use client";

import { Edit3, Trash2, MoreHorizontal, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface AgentPropertyActionsProps {
  propertyId: string;
  purpose: string;
}

export function AgentPropertyActions({ propertyId, purpose }: AgentPropertyActionsProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleMarkAsTaken = async () => {
    // If it's a mock ID starting with PRO-, just alert or update optimistically
    if (propertyId.startsWith("PRO-")) {
      alert("This is a mock property! In a real application, this would be marked as taken.");
      return;
    }

    try {
      setIsUpdating(true);
      const newStatus = purpose === "SALE" ? "SOLD" : "RENTED";
      
      const res = await fetch(`/api/properties/${propertyId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update property status");
      }

      router.refresh(); // Refresh the page to show the new status
    } catch (error) {
      console.error(error);
      alert("Something went wrong while updating the property.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
        <Edit3 className="w-4 h-4" />
      </button>
      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
        <Trash2 className="w-4 h-4" />
      </button>
      <button 
        onClick={handleMarkAsTaken}
        disabled={isUpdating}
        className={`p-2 rounded-lg transition-colors ${isUpdating ? "opacity-50 cursor-not-allowed text-slate-300" : "text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"}`}
        title="Mark as Taken"
      >
        <CheckCircle className="w-4 h-4" />
      </button>
      <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors" title="More options">
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </div>
  );
}
