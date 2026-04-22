import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  TrendingUp,
  Heart,
  Shield,
  Gift,
  CalendarDays,
  Stethoscope,
  GraduationCap,
  Award,
  ArrowUpRight,
} from "lucide-react";
import reasonIncome from "@/assets/reason-income.jpg";
import reasonGrowth from "@/assets/reason-growth.jpg";
import reasonWelfare from "@/assets/reason-welfare.jpg";
import SalaryCalculator from "@/components/SalaryCalculator";
import ScrollReveal from "@/components/ScrollReveal";

const benefits = [
  { icon: Stethoscope, label: "ประกันสุขภาพ", desc: "คุ้มครองทั้งผู้ป่วยในและนอก" },
  { icon: Shield, label: "ประกันสังคม", desc: "สิทธิประโยชน์ตามกฎหมาย" },
  { icon: CalendarDays, label: "วันหยุดพักร้อน", desc: "สูงสุด 10 วัน/ปี" },
  { icon: Gift, label: "โบนัสประจำปี", desc: "ตามผลประกอบการ" },
  { icon: GraduationCap, label: "อบรมพัฒนา", desc: "เรียนฟรี ทุกหลักสูตร" },
  { icon: Award, label: "รางวัลพนักงานดีเด่น", desc: "เงินรางวัล + ของที่ระลึก" },
];

const WhyJoinUs = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              ทำไมต้องเรา?
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              ร่วมงานกับเรา{" "}
              <span className="text-gradient-primary">เพราะคุณคือคนสำคัญ</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: รายได้ดี + คอมมิชชั่น */}
          <ScrollReveal delay={0.1}>
            <Card className="border-border shadow-brand hover:shadow-brand-lg transition-all hover:-translate-y-1 bg-white overflow-hidden group h-full">
              <div className="h-48 overflow-hidden">
                <img src={reasonIncome} alt="รายได้ดี" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl mb-5 -mt-12 relative z-10 gradient-accent shadow-accent-glow">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">รายได้ดี + คอมมิชชั่น</h3>
                <p className="text-muted-foreground text-sm mb-4">เงินเดือนแข่งขันได้ พร้อมคอมมิชชั่นไม่จำกัด ยิ่งขายดี ยิ่งได้มาก</p>
                <SalaryCalculator positionKey="general" />
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Card 2: เติบโตก้าวหน้า */}
          <ScrollReveal delay={0.2}>
            <Card className="border-border shadow-brand hover:shadow-brand-lg transition-all hover:-translate-y-1 bg-white overflow-hidden group h-full">
              <div className="h-48 overflow-hidden">
                <img src={reasonGrowth} alt="เติบโตก้าวหน้า" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl mb-5 -mt-12 relative z-10 gradient-primary shadow-brand">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">เติบโตก้าวหน้า</h3>
                <p className="text-muted-foreground text-sm mb-5">มีแผนพัฒนาสายอาชีพชัดเจน อบรมทักษะใหม่ทุกปี เลื่อนตำแหน่งได้เร็ว</p>

                {/* Promotion criteria */}
                <div className="bg-secondary rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowUpRight className="w-4 h-4 text-primary" />
                    <span className="font-display font-semibold text-sm text-foreground">เกณฑ์เลื่อนตำแหน่ง</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="font-display font-bold text-primary text-sm">35</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">อายุ 35 ปีขึ้นไป</p>
                      <p className="text-xs text-muted-foreground">คุณสมบัติด้านอายุ</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="font-display font-bold text-primary text-sm">3+</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">อายุงานไม่ต่ำกว่า 3 ปี</p>
                      <p className="text-xs text-muted-foreground">ประสบการณ์ในบริษัท</p>
                    </div>
                  </div>

                  <div className="w-full h-px bg-border" />

                  <div className="flex items-center gap-2 justify-center">
                    <Badge className="gradient-primary text-primary-foreground font-semibold px-4 py-1">
                      ปรับตำแหน่ง → Management
                    </Badge>
                  </div>
                  <p className="text-xs text-center text-muted-foreground">เพื่อการเติบโต และอนาคตที่ดีกว่า</p>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Card 3: สวัสดิการครอบคลุม */}
          <ScrollReveal delay={0.3}>
            <Card className="border-border shadow-brand hover:shadow-brand-lg transition-all hover:-translate-y-1 bg-white overflow-hidden group h-full">
              <div className="h-48 overflow-hidden">
                <img src={reasonWelfare} alt="สวัสดิการครอบคลุม" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl mb-5 -mt-12 relative z-10 gradient-accent shadow-accent-glow">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-4">สวัสดิการครอบคลุม</h3>

                <div className="space-y-3">
                  {benefits.map((b) => (
                    <div key={b.label} className="flex items-center gap-3 group/item">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover/item:bg-primary/20 transition-colors">
                        <b.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground">{b.label}</p>
                        <p className="text-xs text-muted-foreground">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default WhyJoinUs;
