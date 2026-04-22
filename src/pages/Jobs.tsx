import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Briefcase, MapPin, DollarSign, Clock, Search, Phone, Wifi, Headphones, ChevronRight } from "lucide-react";
import { useState } from "react";

const jobs = [
  {
    id: 1,
    title: "พนักงานขาย Apple",
    type: "Sales",
    location: "กรุงเทพฯ",
    salary: "14,000 + คอมมิชชั่น 0-25,000",
    employmentType: "งานประจำ",
    openings: 10,
    description: "ดูแลและแนะนำผลิตภัณฑ์ Apple ให้ลูกค้า ทำยอดขายตามเป้าหมาย",
    requirements: ["วุฒิ ม.6 ขึ้นไป", "บุคลิกดี มนุษยสัมพันธ์ดี", "มีความรู้ผลิตภัณฑ์ Apple"],
    tags: ["คอมมิชชั่น", "โบนัส", "อบรม"],
  },
  {
    id: 2,
    title: "พนักงานขาย Smartphone",
    type: "Sales",
    location: "กรุงเทพฯ",
    salary: "14,000 + คอมมิชชั่น 0-25,000",
    employmentType: "งานประจำ",
    openings: 8,
    description: "ขายสมาร์ทโฟนทุกแบรนด์ แนะนำแพ็กเกจและโปรโมชั่น ดูแลลูกค้าอย่างมืออาชีพ",
    requirements: ["วุฒิ ม.6 ขึ้นไป", "มีใจรักงานขาย", "มีประสบการณ์จะพิจารณาเป็นพิเศษ"],
    tags: ["คอมมิชชั่น", "โบนัส", "ประกันสังคม"],
  },
  {
    id: 3,
    title: "พนักงานขาย SuperSale",
    type: "Sales",
    location: "นนทบุรี",
    salary: "14,000 + คอมมิชชั่น 0-25,000",
    employmentType: "งานประจำ",
    openings: 5,
    description: "ขายสินค้าโปรโมชั่นพิเศษ ทำยอดขายระดับสูง รับคอมมิชชั่นไม่จำกัด",
    requirements: ["วุฒิ ม.6 ขึ้นไป", "กระตือรือร้น", "ทนแรงกดดันได้ดี"],
    tags: ["คอมมิชชั่นสูง", "โบนัส", "อบรม"],
  },
  {
    id: 4,
    title: "พนักงาน Service",
    type: "Support",
    location: "ปทุมธานี",
    salary: "14,000 + คอมมิชชั่น 0-25,000",
    employmentType: "งานประจำ",
    openings: 6,
    description: "ให้บริการลูกค้าหลังการขาย รับเรื่องซ่อม ให้คำปรึกษาปัญหาการใช้งาน",
    requirements: ["วุฒิ ม.6 ขึ้นไป", "พูดจาสุภาพ ใจเย็น", "มีใจรักงานบริการ"],
    tags: ["ค่าคอมฯ", "ประกันสังคม", "วันหยุด"],
  },
];

const typeIcon = { Sales: Phone, Tech: Wifi, Support: Headphones };
const typeLabelMap: Record<string, string> = { Sales: "ฝ่ายขาย", Tech: "เทคนิค", Support: "บริการลูกค้า" };

const Jobs = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const filtered = jobs.filter((j) => {
    const matchSearch =
      search === "" ||
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.description.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || j.type === typeFilter;
    const matchLocation = locationFilter === "all" || j.location === locationFilter;
    return matchSearch && matchType && matchLocation;
  });

  const locations = Array.from(new Set(jobs.map((j) => j.location)));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16 flex-1">
        {/* Header */}
        <div className="gradient-primary py-14 text-center">
          <Badge className="bg-primary-foreground/20 text-primary-foreground border-0 mb-3">
            ตำแหน่งงานที่เปิดรับ
          </Badge>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-3">
            หางานที่ใช่ <span className="text-accent">สำหรับคุณ</span>
          </h1>
          <p className="text-primary-foreground/70 text-lg">
            มีตำแหน่งว่างกว่า {jobs.reduce((a, j) => a + j.openings, 0)} อัตราในหลายสาขา
          </p>
        </div>

        <div className="container mx-auto px-4 py-10">
          {/* Filters */}
          <Card className="border-border shadow-brand mb-8">
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="ค้นหาตำแหน่งงาน..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="ประเภทงาน" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทุกประเภท</SelectItem>
                    <SelectItem value="Sales">ฝ่ายขาย</SelectItem>
                    <SelectItem value="Tech">เทคนิค</SelectItem>
                    <SelectItem value="Support">บริการลูกค้า</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="สถานที่" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทุกพื้นที่</SelectItem>
                    {locations.map((l) => (
                      <SelectItem key={l} value={l}>{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results count */}
          <p className="text-muted-foreground text-sm mb-5">
            พบ <span className="font-semibold text-foreground">{filtered.length}</span> ตำแหน่ง
          </p>

          {/* Job cards */}
          <div className="flex flex-col gap-5">
            {filtered.map((job) => {
              const Icon = typeIcon[job.type as keyof typeof typeIcon] || Briefcase;
              return (
                <Card key={job.id} className="gradient-card border-border shadow-brand hover:shadow-brand-lg transition-all hover:-translate-y-0.5 group">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-5">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="flex items-center justify-center w-14 h-14 rounded-2xl gradient-primary flex-shrink-0">
                          <Icon className="w-7 h-7 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                              {job.title}
                            </h3>
                            <Badge className="gradient-accent text-accent-foreground border-0 text-xs">
                              {job.openings} อัตรา
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{job.description}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-4 h-4 text-primary" /> {job.location}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <DollarSign className="w-4 h-4 text-accent" /> {job.salary}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4 text-muted-foreground" /> {job.employmentType}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs text-primary border-primary/30">
                              {typeLabelMap[job.type]}
                            </Badge>
                            {job.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex md:flex-col gap-3 items-start md:items-end justify-between md:justify-center">
                        <Link to={`/apply/${job.id}`}>
                          <Button className="gradient-accent text-accent-foreground font-semibold shadow-accent-glow hover:opacity-90 whitespace-nowrap">
                            สมัครทันที <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            {filtered.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-lg">ไม่พบตำแหน่งงานที่ตรงกับการค้นหา</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;
