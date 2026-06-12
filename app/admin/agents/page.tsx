"use client";

import { useState, useMemo, useEffect } from "react";
import { mockAgents } from "@/lib/mockData";
import { Plus, Search, Trash2, ShieldCheck, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Agent = typeof mockAgents[0];

export default function AdminAgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sortOption, setSortOption] = useState("Newest");

  // Fetch agents on mount
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await fetch("/api/admin/agents");
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.agents.length > 0) {
            // Define an interface for the incoming DB shape to avoid 'any'
            interface DBAgent {
              id: string;
              name: string | null;
              email: string;
              verified: boolean;
              phone: string | null;
              profileImage: string | null;
              agentProfile?: {
                specialization?: string;
                companyName?: string;
                location?: string;
                phone?: string;
                profileImage?: string;
                bio?: string;
              } | null;
              _count?: { properties: number; inquiries: number };
            }

            // Map DB format to expected UI format
            const mappedAgents = data.agents.map((u: DBAgent) => ({
              id: u.id,
              name: u.name || "Unknown Agent",
              email: u.email,
              verified: u.verified,
              role: u.agentProfile?.specialization || "Agent",
              company: u.agentProfile?.companyName || "Independent",
              location: u.agentProfile?.location || "Unknown",
              phone: u.phone || u.agentProfile?.phone || "N/A",
              image: u.profileImage || u.agentProfile?.profileImage || "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
              propertiesCount: u._count?.properties || 0,
              rating: 0,
              reviews: 0,
              bio: u.agentProfile?.bio || "",
              experience: "N/A"
            }));
            setAgents(mappedAgents);
          } else {
            // Fallback to mock data if DB is empty for demo purposes
            setAgents(mockAgents);
          }
        } else {
          setAgents(mockAgents); // Fallback if API fails (e.g. offline)
        }
      } catch (error) {
        console.error("Failed to load agents:", error);
        setAgents(mockAgents);
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<Partial<Agent>>({});

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this agent? All their properties will also be permanently deleted.")) {
      const originalAgents = [...agents];
      setAgents(agents.filter(a => a.id !== id));
      try {
        const res = await fetch(`/api/admin/agents/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Delete failed");
      } catch (error) {
        console.error(error);
        setAgents(originalAgents);
        alert("Failed to delete agent.");
      }
    }
  };

  const handleOpenAdd = () => {
    setEditingAgent(null);
    setFormData({
      name: "",
      company: "",
      role: "",
      location: "",
      email: "",
      phone: "",
      verified: false,
      propertiesCount: 0,
      rating: 0,
      reviews: 0,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      bio: "New agent bio."
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (agent: Agent) => {
    setEditingAgent(agent);
    setFormData({
      name: agent.name,
      company: agent.company,
      role: agent.role,
      location: agent.location,
      email: agent.email,
      phone: agent.phone,
      verified: agent.verified,
      image: agent.image,
      bio: ""
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (editingAgent) {
        // Update
        const res = await fetch(`/api/admin/agents/${editingAgent.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          const { agent } = await res.json();
          const updated = {
            id: agent.id,
            name: agent.name || "Unknown Agent",
            email: agent.email,
            verified: agent.verified,
            role: agent.agentProfile?.specialization || "Agent",
            company: agent.agentProfile?.companyName || "Independent",
            location: agent.agentProfile?.location || "Unknown",
            phone: agent.phone || agent.agentProfile?.phone || "N/A",
            image: agent.profileImage || agent.agentProfile?.profileImage || "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
            propertiesCount: agent._count?.properties || 0,
            rating: editingAgent.rating,
            reviews: editingAgent.reviews,
            bio: agent.agentProfile?.bio || "",
            experience: "N/A"
          };
          setAgents(agents.map(a => (a.id === editingAgent.id ? updated : a)));
        } else {
          alert("Failed to update agent.");
        }
      } else {
        // Create
        const res = await fetch(`/api/admin/agents`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          const { agent } = await res.json();
          const newAgent = {
            id: agent.id,
            name: agent.name || "Unknown Agent",
            email: agent.email,
            verified: agent.verified,
            role: agent.agentProfile?.specialization || "Agent",
            company: agent.agentProfile?.companyName || "Independent",
            location: agent.agentProfile?.location || "Unknown",
            phone: agent.phone || agent.agentProfile?.phone || "N/A",
            image: agent.profileImage || agent.agentProfile?.profileImage || "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
            propertiesCount: 0,
            rating: 0,
            reviews: 0,
            bio: agent.agentProfile?.bio || "",
            experience: "N/A"
          };
          setAgents([newAgent, ...agents]);
        } else {
          const data = await res.json();
          alert(data.error || "Failed to create agent.");
        }
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedAgents = useMemo(() => {
    let result = [...agents];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a => 
        a.name.toLowerCase().includes(q) || 
        a.company.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q)
      );
    }

    // Filter
    if (statusFilter === "Verified") {
      result = result.filter(a => a.verified);
    } else if (statusFilter === "Unverified") {
      result = result.filter(a => !a.verified);
    }

    // Sort
    if (sortOption === "Most Listings") {
      result.sort((a, b) => b.propertiesCount - a.propertiesCount);
    } else if (sortOption === "Highest Rated") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "Newest") {
      // For this mock, we assume the original order or ID order means newest. 
      // Reversing the array since new ones are unshifted.
      // Keeping it simple since we don't have createdAt dates.
    }

    return result;
  }, [agents, searchQuery, statusFilter, sortOption]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-heading">Manage Agents</h1>
          <p className="text-slate-500">View and manage real estate agents on your platform.</p>
        </div>
        <Button onClick={handleOpenAdd} className="bg-gold-500 hover:bg-gold-600 text-slate-900 font-bold">
          <Plus className="h-5 w-5 mr-2" /> Add New Agent
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search agents by name or company..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-gold-500 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select 
            aria-label="Filter Status" 
            className="w-full sm:w-auto bg-slate-50 border-none rounded-xl py-2 px-4 focus:ring-2 focus:ring-gold-500 outline-none cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Verified</option>
            <option>Unverified</option>
          </select>
          <select 
            aria-label="Sort By" 
            className="w-full sm:w-auto bg-slate-50 border-none rounded-xl py-2 px-4 focus:ring-2 focus:ring-gold-500 outline-none cursor-pointer"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option>Newest</option>
            <option>Most Listings</option>
            <option>Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAndSortedAgents.map((agent) => (
          <div key={agent.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col animate-in fade-in duration-300">
            <div className="p-6 flex-grow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4 items-center">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-gold-100">
                    <Image src={agent.image} alt={agent.name} fill className="object-cover" unoptimized />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                      {agent.name}
                      {agent.verified && <span title="Verified" className="flex"><ShieldCheck className="h-4 w-4 text-emerald-500" /></span>}
                    </h3>
                    <p className="text-sm text-gold-600 font-medium">{agent.role}</p>
                  </div>
                </div>
                <div className="relative">
                  {/* Keep structure intact for styling, removed MoreVertical button for explicit Edit below */}
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-sm text-slate-600 flex items-center gap-2">
                  <strong className="text-slate-800">Company:</strong> {agent.company}
                </p>
                <p className="text-sm text-slate-600 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-400" /> {agent.location}
                </p>
                <p className="text-sm text-slate-600 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-400" /> {agent.email}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-4 mt-auto">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900">{agent.propertiesCount}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Listings</p>
                </div>
                <div className="text-center border-l border-slate-100">
                  <p className="text-2xl font-bold text-slate-900">{agent.rating}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Rating</p>
                </div>
                <div className="text-center border-l border-slate-100">
                  <p className="text-2xl font-bold text-slate-900">{agent.reviews}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Reviews</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 border-t border-gray-100 flex flex-col gap-2">
              <Button 
                onClick={async () => {
                  // Toggle verification status
                  const newStatus = !agent.verified;
                  // Optimistic UI update
                  setAgents(agents.map(a => a.id === agent.id ? { ...a, verified: newStatus } : a));
                  try {
                    await fetch(`/api/admin/agents/${agent.id}/verify`, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ verified: newStatus })
                    });
                  } catch (error) {
                    // Revert on failure
                    console.error("Failed to update status", error);
                    setAgents(agents.map(a => a.id === agent.id ? { ...a, verified: !newStatus } : a));
                  }
                }} 
                variant="outline" 
                className={`w-full border-slate-200 bg-white hover:bg-slate-50 ${agent.verified ? 'text-amber-600' : 'text-emerald-600'}`}
              >
                {agent.verified ? "Revoke Verification" : "Verify Agent"}
              </Button>
              <div className="flex gap-2 w-full">
                <Button onClick={() => handleOpenEdit(agent)} variant="outline" className="flex-1 border-slate-200 text-slate-700 bg-white hover:bg-slate-50">
                  Edit
                </Button>
                <Button onClick={() => handleDelete(agent.id)} variant="outline" className="flex-1 border-red-200 text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700">
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="col-span-full py-12 text-center text-slate-500">
            Loading agents...
          </div>
        )}
        {!loading && filteredAndSortedAgents.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            No agents found matching your criteria.
          </div>
        )}
      </div>

      {/* Add / Edit Dialog Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingAgent ? "Edit Agent" : "Add New Agent"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input 
                id="name" 
                value={formData.name || ""} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-right">Company</Label>
              <Input 
                id="company" 
                value={formData.company || ""} 
                onChange={(e) => setFormData({...formData, company: e.target.value})} 
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">Role</Label>
              <Input 
                id="role" 
                value={formData.role || ""} 
                onChange={(e) => setFormData({...formData, role: e.target.value})} 
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input 
                id="email" 
                type="email"
                value={formData.email || ""} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">Location</Label>
              <Input 
                id="location" 
                value={formData.location || ""} 
                onChange={(e) => setFormData({...formData, location: e.target.value})} 
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-start-2 col-span-3 flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="verified"
                  aria-label="Verified Agent"
                  checked={formData.verified || false}
                  onChange={(e) => setFormData({...formData, verified: e.target.checked})}
                  className="rounded border-gray-300 text-gold-500 focus:ring-gold-500"
                />
                <Label htmlFor="verified">Verified Agent</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} className="bg-slate-900 text-white hover:bg-slate-800">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
