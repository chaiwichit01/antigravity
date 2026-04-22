import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  TrendingUp,
  Smartphone,
  LayoutDashboard,
  Briefcase,
  HelpCircle,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Download,
  Eye,
  ChevronUp,
  ChevronDown,
  BrainCircuit,
  MessageSquareHeart,
  Lightbulb
} from "lucide-react";

// Regions
const regions = [
  { key: "all", label: "ทั้งหมด" },
  { key: "central", label: "ภาคกลาง" },
  { key: "north", label: "ภาคเหนือ" },
  { key: "northeast", label: "ภาคอีสาน" },
  { key: "south", label: "ภาคใต้" },
  { key: "east", label: "ภาคตะวันออก" },
];

// Branches
const branches = [
  { id: "bkh", name: "สาขาบางเขน" },
  { id: "bkn", name: "สาขาบางกะปิ" },
  { id: "non", name: "สาขานนทบุรี" },
  { id: "ptr", name: "สาขาปทุมธานี" },
  { id: "spk", name: "สาขาสมุทรปราการ" },
];

const mockApplicants = [
  { id: 1, name: "สมชาย ใจดี", position: "พนักงานขาย Apple", scores: { mbti: 90, roleplay: 85, vision: 80 }, status: "Interview", date: "2025-02-10", phone: "0812345678", email: "somchai@email.com", age: 24, experience: "2 ปี", region: "central", photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop" }, // เมน
  { id: 2, name: "มาลี รักดี", position: "พนักงานขาย Smartphone", scores: { mbti: 60, roleplay: 50, vision: 65 }, status: "Pending", date: "2025-02-12", phone: "0898765432", email: "malee@email.com", age: 22, experience: "ไม่มี", region: "north", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop" }, // วูแมน
  { id: 3, name: "ปิติ ช่างดี", position: "สายงานบริการหน้าร้าน", scores: { mbti: 100, roleplay: 95, vision: 90 }, status: "Hired", date: "2025-02-08", phone: "0823456789", email: "piti@email.com", age: 28, experience: "5 ปี", region: "northeast", photo: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop" }, // เมน
  { id: 4, name: "นภา สวยงาม", position: "พนักงานขาย SuperSale", scores: { mbti: 40, roleplay: 30, vision: 45 }, status: "Rejected", date: "2025-02-14", phone: "0867891234", email: "napa@email.com", age: 20, experience: "1 ปี", region: "south", photo: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&h=150&fit=crop" }, // วูแมน
  { id: 5, name: "วิชัย เก่งมาก", position: "พนักงานขาย Apple", scores: { mbti: 100, roleplay: 100, vision: 95 }, status: "Talent Pool", date: "2025-02-15", phone: "0845678901", email: "wichai@email.com", age: 30, experience: "8 ปี", region: "central", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop" }, // เมน
  { id: 6, name: "สุดา ใจงาม", position: "พนักงานขาย Smartphone", scores: { mbti: 75, roleplay: 60, vision: 80 }, status: "Pending", date: "2025-02-16", phone: "0834567890", email: "suda@email.com", age: 25, experience: "3 ปี", region: "east", photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&h=150&fit=crop" }, // วูแมน
  { id: 7, name: "ธนา รุ่งเรือง", position: "สายงานบริการหน้าร้าน", scores: { mbti: 80, roleplay: 88, vision: 70 }, status: "Interview", date: "2025-02-17", phone: "0856789012", email: "thana@email.com", age: 26, experience: "4 ปี", region: "north", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop" }, // เมน
  { id: 8, name: "พิมพ์ สุขใจ", position: "พนักงานขาย SuperSale", scores: { mbti: 65, roleplay: 70, vision: 60 }, status: "Pending", date: "2025-02-18", phone: "0878901234", email: "pim@email.com", age: 23, experience: "1 ปี", region: "northeast", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop" }, // วูแมน
];

const mockQuestions = [
  { id: 1, category: "MBTI", question: "เมื่อคุณต้องร่วมงานกับเพื่อนร่วมงานใหม่...", correct: "ข้อ B" },
  { id: 2, category: "RolePlay", question: "[สถานการณ์จำลอง] มีลูกค้าวัย 60 ปีเดินเข้ามา...", correct: "ข้อ A" },
  { id: 3, category: "Vision", question: "หากบริษัทมีระบบซอฟต์แวร์ใหม่ที่หน้าตาซับซ้อน...", correct: "ข้อ C" },
];

const mockJobs = [
  { id: 1, title: "พนักงานขายมือถือ", location: "กรุงเทพฯ", salary: "15,000–25,000", status: "Active", openings: 10 },
  { id: 2, title: "ช่างเทคนิค", location: "นนทบุรี", salary: "18,000–28,000", status: "Active", openings: 5 },
  { id: 3, title: "Customer Support", location: "ปทุมธานี", salary: "14,000–20,000", status: "Paused", openings: 8 },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  Pending: { label: "รอพิจารณา", className: "bg-yellow-100 text-yellow-800" },
  Interview: { label: "นัดสัมภาษณ์", className: "bg-blue-100 text-blue-800" },
  Hired: { label: "รับเข้าทำงาน", className: "bg-green-100 text-green-800" },
  Rejected: { label: "ไม่ผ่าน", className: "bg-red-100 text-red-800" },
  "Talent Pool": { label: "Talent Pool", className: "bg-purple-100 text-purple-800" },
};

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", key: "dashboard" },
  { icon: Users, label: "ผู้สมัคร", key: "applicants" },
  { icon: Briefcase, label: "ตำแหน่งงาน", key: "jobs" },
  { icon: HelpCircle, label: "คลังสถานการณ์ (แบบทดสอบ)", key: "quiz" },
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState("applicants"); // Default to applicants to show the UI
  const [applicants, setApplicants] = useState(mockApplicants);
  const [jobs, setJobs] = useState(mockJobs);
  const [questions, setQuestions] = useState(mockQuestions);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [regionFilter, setRegionFilter] = useState("all");

  const getAvgScore = (a: any) => Math.round((a.scores.mbti + a.scores.roleplay + a.scores.vision) / 3);

  const stats = {
    total: applicants.length,
    today: 2,
    hired: applicants.filter((a) => a.status === "Hired").length,
    rejected: applicants.filter((a) => a.status === "Rejected").length,
    pending: applicants.filter((a) => a.status === "Pending").length,
    avgScore: Math.round(applicants.reduce((acc, curr) => acc + getAvgScore(curr), 0) / applicants.length),
  };

  const updateStatus = (id: number, status: string) => {
    setApplicants((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const updateBranch = (id: number, branch: string) => {
    setApplicants((prev) => prev.map((a: any) => (a.id === id ? { ...a, branch } : a)));
  };

  const deleteQuestion = (id: number) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const deleteJob = (id: number) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-16"} transition-all duration-300 flex-shrink-0 flex flex-col`}
        style={{ background: "hsl(var(--sidebar-background))" }}
      >
        <div className="h-16 flex items-center px-4 border-b border-sidebar-border gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-sidebar-primary flex-shrink-0">
            <Smartphone className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          {sidebarOpen && (
            <span className="font-display text-lg font-bold text-sidebar-foreground whitespace-nowrap">
              งานดี Admin
            </span>
          )}
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${activeTab === item.key
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <Link to="/">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors text-sm">
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span>ออกจากระบบ</span>}
            </button>
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-card border-b border-border flex items-center px-6 gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-muted-foreground hover:text-foreground"
          >
            {sidebarOpen ? <ChevronDown className="w-5 h-5 rotate-90" /> : <ChevronUp className="w-5 h-5 rotate-90" />}
          </button>
          <div>
            <h1 className="font-display font-bold text-foreground">
              {navItems.find((n) => n.key === activeTab)?.label || "Dashboard"}
            </h1>
            <p className="text-muted-foreground text-xs">ระบบจัดการการประเมินศักยภาพผู้สมัคร</p>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {activeTab === "dashboard" && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "ผู้สมัครทั้งหมด", value: stats.total, icon: Users, color: "primary" },
                  { label: "สมัครวันนี้", value: stats.today, icon: TrendingUp, color: "accent" },
                  { label: "รับเข้าทำงาน", value: stats.hired, icon: UserCheck, color: "primary" },
                  { label: "Job Fit เฉลี่ย", value: `${stats.avgScore}%`, icon: HelpCircle, color: "accent" },
                ].map((s) => (
                  <Card key={s.label} className="border-border shadow-brand">
                    <CardContent className="p-5">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-xl mb-3 ${s.color === "accent" ? "gradient-accent" : "gradient-primary"}`}>
                        <s.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="font-display text-2xl font-bold text-foreground">{s.value}</div>
                      <div className="text-muted-foreground text-xs mt-0.5">{s.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-border shadow-brand">
                  <CardHeader><CardTitle className="font-display text-base">สถานะผู้สมัคร</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(statusConfig).map(([key, cfg]) => {
                      const count = applicants.filter((a) => a.status === key).length;
                      const pct = (count / applicants.length) * 100;
                      return (
                        <div key={key}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">{cfg.label}</span>
                            <span className="font-medium text-foreground">{count} คน</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full gradient-primary rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                <Card className="border-border shadow-brand">
                  <CardHeader><CardTitle className="font-display text-base">การประเมินศักยภาพโดดเด่น (Top Talent)</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {applicants
                        .sort((a, b) => getAvgScore(b) - getAvgScore(a))
                        .slice(0, 4).map((a) => (
                          <div key={a.id} className="flex items-center gap-3 p-2 hover:bg-secondary/40 rounded-lg transition-colors">
                            {a.photo ? (
                              <img src={a.photo} alt={a.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20 flex-shrink-0" />
                            ) : (
                              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0 ring-2 ring-primary/20">
                                {a.name[0]}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-foreground text-sm truncate">{a.name}</div>
                              <div className="text-muted-foreground text-xs">{a.position}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-primary font-bold text-sm">{getAvgScore(a)}%</div>
                              <div className="text-[10px] text-muted-foreground">Overall Fit</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "applicants" && (() => {
            const filtered = regionFilter === "all" ? applicants : applicants.filter(a => a.region === regionFilter);
            return (
              <div className="space-y-5 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h2 className="font-display font-bold text-lg text-foreground">
                    ผู้สมัครทั้งหมด <span className="text-primary">({filtered.length} คน)</span>
                  </h2>
                  <div className="flex gap-2 flex-wrap">
                    {regions.map((r) => (
                      <button
                        key={r.key}
                        onClick={() => setRegionFilter(r.key)}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${regionFilter === r.key
                          ? "gradient-primary text-primary-foreground shadow-accent-glow"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filtered.map((a, idx) => {
                    const avgScore = getAvgScore(a);
                    const scoreColor = avgScore >= 80 ? "text-green-600" : avgScore >= 60 ? "text-amber-500" : "text-destructive";
                    return (
                      <Card key={a.id} className="border-border shadow-brand hover:shadow-brand-lg transition-shadow group overflow-hidden flex flex-col">
                        <div className="relative">
                          <div className="gradient-primary text-primary-foreground w-full h-20 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-black/10" />
                            <div className="absolute top-2 right-2">
                              <Badge className={`${statusConfig[a.status]?.className} border-0 text-[10px] px-2 shadow-sm`}>
                                {statusConfig[a.status]?.label}
                              </Badge>
                            </div>
                          </div>

                          <div className="w-16 h-16 rounded-full bg-background border-4 border-card flex items-center justify-center overflow-hidden absolute -bottom-8 left-4 shadow-sm z-10">
                            {a.photo ? (
                              <img src={a.photo} alt={a.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-xl font-display font-bold text-primary">{a.name[0]}</span>
                            )}
                          </div>
                        </div>

                        <CardContent className="p-4 pt-10 flex-1 flex flex-col space-y-4">
                          <div>
                            <h3 className="font-display font-bold text-foreground text-base tracking-tight">{a.name}</h3>
                            <p className="text-muted-foreground text-xs">{a.position}</p>
                          </div>

                          {/* Skill Progress Indicators */}
                          <div className="space-y-3 bg-secondary/30 p-3 rounded-xl flex-1">
                            <div className="flex justify-between items-center text-xs mb-1">
                              <span className="text-foreground font-medium flex items-center gap-1.5">
                                <BrainCircuit className="w-3.5 h-3.5 text-purple-600" /> Job Fit
                              </span>
                              <span className={`font-bold ${a.scores.mbti >= 80 ? "text-green-600" : a.scores.mbti >= 60 ? "text-amber-600" : "text-red-500"}`}>{a.scores.mbti}%</span>
                            </div>
                            <Progress value={a.scores.mbti} className="h-1.5 [&>div]:bg-purple-500" />

                            <div className="flex justify-between items-center text-xs mb-1 mt-3">
                              <span className="text-foreground font-medium flex items-center gap-1.5">
                                <MessageSquareHeart className="w-3.5 h-3.5 text-blue-600" /> Role Play
                              </span>
                              <span className={`font-bold ${a.scores.roleplay >= 80 ? "text-green-600" : a.scores.roleplay >= 60 ? "text-amber-600" : "text-red-500"}`}>{a.scores.roleplay}%</span>
                            </div>
                            <Progress value={a.scores.roleplay} className="h-1.5 [&>div]:bg-blue-500" />

                            <div className="flex justify-between items-center text-xs mb-1 mt-3">
                              <span className="text-foreground font-medium flex items-center gap-1.5">
                                <Lightbulb className="w-3.5 h-3.5 text-amber-600" /> Vision
                              </span>
                              <span className={`font-bold ${a.scores.vision >= 80 ? "text-green-600" : a.scores.vision >= 60 ? "text-amber-600" : "text-red-500"}`}>{a.scores.vision}%</span>
                            </div>
                            <Progress value={a.scores.vision} className="h-1.5 [&>div]:bg-amber-500" />
                          </div>

                          <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                            <span>อายุ: {a.age} ปี</span>
                            <span>EXP: {a.experience}</span>
                          </div>

                          <div className="flex flex-col gap-2 pt-2 border-t border-border/50">
                            <div className="flex gap-2">
                              <Select value={a.status} onValueChange={(v) => updateStatus(a.id, v)}>
                                <SelectTrigger className="h-9 text-xs flex-1 font-medium bg-secondary/50 border-0">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.entries(statusConfig).map(([k, v]) => (
                                    <SelectItem key={k} value={k}>{v.label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="icon" variant="outline" className="w-9 h-9 flex-shrink-0 bg-background border-border">
                                    <Eye className="w-4 h-4 text-primary" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-xl">
                                  <DialogHeader>
                                    <DialogTitle className="font-display text-xl">{a.name}</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-6 text-sm">
                                    {/* Detailed Score Breakdown */}
                                    <div className="bg-secondary/20 p-5 rounded-xl border border-border">
                                      <h4 className="font-bold text-foreground mb-4">สรุปผลประเมินศักยภาพ (Overall: {avgScore}%)</h4>
                                      <div className="grid grid-cols-3 gap-4 text-center">
                                        <div className="bg-background rounded-lg p-3 border border-purple-100 shadow-sm">
                                          <BrainCircuit className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                                          <div className="text-xl font-bold text-purple-900">{a.scores.mbti}%</div>
                                          <div className="text-xs text-muted-foreground mt-1">บุคลิกภาพ (MBTI)</div>
                                        </div>
                                        <div className="bg-background rounded-lg p-3 border border-blue-100 shadow-sm">
                                          <MessageSquareHeart className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                                          <div className="text-xl font-bold text-blue-900">{a.scores.roleplay}%</div>
                                          <div className="text-xs text-muted-foreground mt-1">บทบาทสมมติ (Role Play)</div>
                                        </div>
                                        <div className="bg-background rounded-lg p-3 border border-amber-100 shadow-sm">
                                          <Lightbulb className="w-6 h-6 text-amber-600 mx-auto mb-1" />
                                          <div className="text-xl font-bold text-amber-900">{a.scores.vision}%</div>
                                          <div className="text-xs text-muted-foreground mt-1">วิสัยทัศน์ (Vision)</div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                                      {[
                                        ["ตำแหน่งที่สมัคร", a.position],
                                        ["เบอร์โทรศัพท์", a.phone],
                                        ["อีเมล", a.email],
                                        ["อายุ / ประสบการณ์", `${a.age} ปี / ${a.experience}`],
                                        ["พื้นที่", regions.find(r => r.key === a.region)?.label],
                                        ["วันที่สมัคร", a.date],
                                      ].map(([k, v]) => (
                                        <div key={k} className="border-b border-border pb-2">
                                          <div className="text-muted-foreground text-xs mb-1">{k}</div>
                                          <div className="font-medium text-foreground">{v}</div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                            {a.status === "Hired" && (
                              <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                                <Select value={(a as any).branch || ""} onValueChange={(v) => updateBranch(a.id, v)}>
                                  <SelectTrigger className="h-9 text-xs w-full bg-green-50/50 border-green-200 text-green-700 hover:bg-green-50">
                                    <SelectValue placeholder="เลือกสาขาที่รับเข้าทำงาน" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {branches.map((b) => (
                                      <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {filtered.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground bg-secondary/20 rounded-2xl border border-dashed border-border mt-6">
                    <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>ไม่พบผู้สมัครที่ตรงกับเงื่อนไข</p>
                  </div>
                )}
              </div>
            );
          })()}

          {activeTab === "jobs" && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex justify-between items-center">
                <p className="text-muted-foreground text-sm">{jobs.length} ตำแหน่งงาน</p>
                <Button className="gradient-accent text-accent-foreground shadow-accent-glow text-sm">
                  <Plus className="w-4 h-4 mr-1" /> เพิ่มตำแหน่ง
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobs.map((job) => (
                  <Card key={job.id} className="border-border shadow-brand">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-display font-bold text-foreground">{job.title}</h3>
                          <p className="text-muted-foreground text-sm">{job.location} · {job.salary} บาท</p>
                        </div>
                        <Badge className={job.status === "Active" ? "gradient-accent text-accent-foreground border-0" : "bg-muted text-muted-foreground border-0"}>
                          {job.status === "Active" ? "เปิดรับ" : "หยุดชั่วคราว"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-sm">{job.openings} อัตราว่าง</span>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost" className="w-8 h-8 text-muted-foreground hover:text-primary">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="w-8 h-8 text-muted-foreground hover:text-destructive"
                            onClick={() => deleteJob(job.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "quiz" && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex justify-between items-center">
                <h3 className="font-display font-bold text-lg">คลังสถานการณ์ (Assessment Bank)</h3>
                <Button className="gradient-accent text-accent-foreground shadow-accent-glow text-sm">
                  <Plus className="w-4 h-4 mr-1" /> สร้างสถานการณ์ใหม่
                </Button>
              </div>
              <Card className="border-border shadow-brand">
                <CardContent className="overflow-x-auto p-0">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-secondary/30">
                        {["หมวดหมู่การประเมิน", "สถานการณ์ (Scenario)", "แนวทางที่เหมาะสมที่สุด", "จัดการ"].map((h) => (
                          <th key={h} className="text-left py-4 px-5 text-muted-foreground font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {questions.map((q) => (
                        <tr key={q.id} className="hover:bg-muted/30 transition-colors">
                          <td className="py-4 px-5">
                            <Badge variant="secondary" className={`text-xs border-0 ${q.category === "MBTI" ? "bg-purple-100 text-purple-700" : q.category === "RolePlay" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>
                              {q.category === "MBTI" ? "บุคลิกภาพ" : q.category === "RolePlay" ? "การรับมือ" : "วิสัยทัศน์"}
                            </Badge>
                          </td>
                          <td className="py-4 px-5 text-foreground max-w-sm font-medium">{q.question}</td>
                          <td className="py-4 px-5 text-muted-foreground">{q.correct}</td>
                          <td className="py-4 px-5">
                            <div className="flex gap-1">
                              <Button size="icon" variant="ghost" className="w-8 h-8 text-muted-foreground hover:text-primary bg-background shadow-sm border border-border">
                                <Pencil className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="w-8 h-8 text-muted-foreground hover:text-destructive bg-background shadow-sm border border-border"
                                onClick={() => deleteQuestion(q.id)}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
