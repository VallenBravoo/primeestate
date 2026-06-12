"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface AdminPropertyActionsProps {
  propertyId: string;
  slug: string;
}

export function AdminPropertyActions({ propertyId, slug }: AdminPropertyActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (propertyId.startsWith("PRO-")) {
      alert("This is a mock property! In a real application, this would be deleted.");
      return;
    }

    if (!confirm("Are you sure you want to delete this property? This action cannot be undone.")) {
      return;
    }

    try {
      setIsDeleting(true);
      
      const res = await fetch(`/api/properties/${propertyId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete property");
      }

      router.refresh(); // Refresh the page to remove the deleted property
    } catch (error) {
      console.error(error);
      alert("Something went wrong while deleting the property.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex justify-end gap-2">
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-gold-600 hover:text-gold-700 hover:bg-gold-50"
        onClick={() => router.push(`/properties/${slug}`)}
      >
        View
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-red-600 hover:text-red-700 hover:bg-red-50" 
        title="Delete"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
