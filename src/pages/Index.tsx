import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.png";
import testimonialBg from "@/assets/testimonial-bg.jpg";
import positionsBg from "@/assets/positions-bg.jpg";
import {
  ChevronRight,
  Star,
  Quote,
  Phone,
  Headphones,
  ChevronLeft,
  Search,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import SalaryCalculator from "@/components/SalaryCalculator";
import AnimatedCounter from "@/components/AnimatedCounter";
import WhyJoinUs from "@/components/WhyJoinUs";
import ScrollReveal from "@/components/ScrollReveal";

const testimonials = [
  {
    name: "คุณสมชาย ใจดี",
    position: "พนักงานขาย → หัวหน้าทีม",
    quote: "เริ่มจากพนักงานขายธรรมดา ตอนนี้ดูแลทีม 10 คน รายได้เพิ่มขึ้น 3 เท่า ภายใน 2 ปี",
    rating: 5,
    avatar: "ส",
  },
  {
    name: "คุณมาลี รักดี",
    position: "Customer Support",
    quote: "บริษัทดูแลพนักงานดีมาก มีอบรมตลอด ได้เรียนรู้เทคโนโลยีใหม่ๆ ทุกเดือน",
    rating: 5,
    avatar: "ม",
  },
  {
    name: "คุณปิติ ช่างดี",
    position: "ช่างเทคนิค",
    quote: "งานท้าทาย ได้แก้ปัญหาจริง มีค่าล่วงเวลา และโบนัสตามผลงาน",
    rating: 5,
    avatar: "ป",
  },
];

// reasons moved to WhyJoinUs component

const openPositions = [
  { title: "พนักงานขาย Apple", type: "Sales", location: "กรุงเทพฯ", count: 10, key: "apple" },
  { title: "พนักงานขาย Smartphone", type: "Sales", location: "กรุงเทพฯ", count: 8, key: "smartphone" },
  { title: "พนักงานขาย SuperSale", type: "Sales", location: "นนทบุรี", count: 5, key: "supersale" },
  { title: "พนักงาน Service", type: "Support", location: "ปทุมธานี", count: 6, key: "service" },
];

const Index = () => {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [keyword, setKeyword] = useState("");
  const t = testimonials[testimonialIdx];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* HERO — Grab-style: split layout */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-background">
        {/* Decorative soft blob */}
        <div className="absolute right-0 top-0 w-[55%] h-full bg-secondary/60 rounded-bl-[80px] hidden md:block" />
        <div className="absolute right-0 top-0 w-[55%] h-full" style={{ background: "radial-gradient(ellipse at 80% 50%, hsl(185 75% 42% / 0.08) 0%, transparent 70%)" }} />

        <div className="relative container mx-auto px-4 py-20 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* LEFT — Headline + search */}
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground rounded-full px-4 py-1.5 text-sm font-medium mb-6 border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
                กำลังรับสมัครด่วน!
              </div>

              <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground leading-[1.1] mb-4">
                งานดี...{" "}
                <span className="text-gradient-primary">ชีวิตดี</span>
                <br />
                <span className="text-gradient-accent">เริ่มต้นที่นี่</span>
              </h1>

              <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-md">
                โอกาสทองสำหรับสายงานโทรคมนาคมและมือถือ
                รายได้ดี เติบโตไว สวัสดิการเต็มที่
              </p>

              {/* Search bar */}
              <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-brand-lg border border-border max-w-lg mb-8">
                <div className="flex items-center gap-2 flex-1 px-3">
                  <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                  <Input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="ค้นหาตำแหน่งงาน..."
                    className="border-0 shadow-none p-0 h-auto focus-visible:ring-0 bg-transparent text-sm"
                  />
                </div>
                <div className="w-px bg-border self-stretch" />
                <div className="flex items-center gap-2 px-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>ทุกสาขา</span>
                </div>
                <Link to={`/jobs${keyword ? `?q=${keyword}` : ""}`}>
                  <Button className="gradient-accent text-accent-foreground rounded-xl shadow-accent-glow font-semibold">
                    <Search className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-6 md:gap-10">
                <AnimatedCounter end={500} suffix="+" label="ผู้สมัครทั้งหมด" />
                <AnimatedCounter end={20} suffix="+" label="สาขาที่รองรับ" />
                <AnimatedCounter end={95} suffix="%" label="อัตราการผ่าน" />
              </div>
            </div>

            {/* RIGHT — Photo grid (Grab-style) */}
            <div className="hidden md:grid grid-cols-3 grid-rows-2 gap-3 h-[480px]">
              {/* Row 1 */}
              <div className="rounded-2xl overflow-hidden shadow-brand">
                <img src={hero1} alt="True Shop Ext" className="w-full h-full object-cover" />
              </div>
              <div className="col-span-1 rounded-2xl overflow-hidden shadow-brand-lg row-span-1">
                <img src={hero2} alt="True 5G Int" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-brand">
                <img src={hero3} alt="True Stand" className="w-full h-full object-cover" />
              </div>
              {/* Row 2 */}
              <div className="col-span-2 rounded-2xl overflow-hidden shadow-brand-lg">
                <img src={hero4} alt="True Counter" className="w-full h-full object-cover object-center" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-brand">
                <img src={hero5} alt="Better Together" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyJoinUs />

      {/* OPEN POSITIONS PREVIEW */}
      <section className="py-16 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <img src={positionsBg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  ตำแหน่งที่เปิดรับ
                </h2>
                <p className="text-muted-foreground text-sm mt-1">เลือกตำแหน่งที่ใช่สำหรับคุณ</p>
              </div>
              <Link to="/jobs">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 gap-1">
                  ดูทั้งหมด <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {openPositions.map((p) => {
              const Icon = p.type === "Sales" ? Phone : Headphones;
              return (
                <Card key={p.key} className="border-border shadow-brand hover:shadow-brand-lg transition-all hover:-translate-y-1 bg-white group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl gradient-primary group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display font-semibold text-foreground">{p.title}</h3>
                        <p className="text-muted-foreground text-sm flex items-center gap-1">
                          <MapPin className="w-3 h-3" />{p.location}
                        </p>
                      </div>
                      <span className="inline-block bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded-full">
                        {p.count} อัตรา
                      </span>
                    </div>
                    <SalaryCalculator positionKey={p.key} />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]">
          <img src={testimonialBg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
                เสียงจากพนักงาน
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                ความสำเร็จของพวกเขา
              </h2>
            </div>
          </ScrollReveal>
          <div className="max-w-2xl mx-auto">
            <Card className="border-border shadow-brand-lg bg-white">
              <CardContent className="p-10 text-center">
                <Quote className="w-10 h-10 text-primary mx-auto mb-4 opacity-40" />
                <p className="text-foreground text-lg leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
                <div className="flex justify-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center font-display font-bold text-primary-foreground">
                    {t.avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground text-sm">{t.name}</div>
                    <div className="text-muted-foreground text-xs">{t.position}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-center gap-3 mt-6">
              <Button
                size="icon"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5"
                onClick={() => setTestimonialIdx((i) => (i - 1 + testimonials.length) % testimonials.length)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIdx(i)}
                    className={`h-2.5 rounded-full transition-all ${i === testimonialIdx ? "bg-primary w-5" : "bg-muted w-2.5"
                      }`}
                  />
                ))}
              </div>
              <Button
                size="icon"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5"
                onClick={() => setTestimonialIdx((i) => (i + 1) % testimonials.length)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 gradient-primary">
        <ScrollReveal>
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              พร้อมเริ่มต้นชีวิตที่ดีกว่า?
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-8">
              สมัครงานวันนี้ ใช้เวลาไม่นาน ผลลัพธ์เปลี่ยนชีวิต
            </p>
            <Link to="/apply">
              <Button
                size="lg"
                className="gradient-accent text-accent-foreground font-bold text-lg px-10 py-6 shadow-accent-glow hover:opacity-90"
              >
                สมัครงานทันที ฟรี!
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
