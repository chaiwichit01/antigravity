import { Link } from "react-router-dom";
import { Smartphone, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-white py-12 mt-auto">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl gradient-primary shadow-brand">
              <Smartphone className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold">
              งานดี<span className="text-accent">.</span>
            </span>
          </div>
          <p className="text-white/50 text-sm leading-relaxed">
            แพลตฟอร์มหางานสำหรับธุรกิจโทรคมนาคมและมือถือ ช่วยให้คุณพบงานดีที่ใช่
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-display font-semibold mb-4 text-white">ลิงก์ด่วน</h4>
          <div className="flex flex-col gap-2 text-sm text-white/50">
            <Link to="/" className="hover:text-accent transition-colors">หน้าหลัก</Link>
            <Link to="/jobs" className="hover:text-accent transition-colors">ตำแหน่งงาน</Link>
            <Link to="/apply" className="hover:text-accent transition-colors">สมัครงาน</Link>
            <Link to="/admin" className="hover:text-accent transition-colors">ผู้ดูแลระบบ</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-semibold mb-4 text-white">ติดต่อเรา</h4>
          <div className="flex flex-col gap-2 text-sm text-white/50">
            <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-accent" /> 02-XXX-XXXX</div>
            <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-accent" /> hr@ngandee.com</div>
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-accent" /> กรุงเทพมหานคร</div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6 text-center text-sm text-white/30">
        © 2025 งานดี (Ngan Dee). สงวนลิขสิทธิ์ทุกประการ
      </div>
    </div>
  </footer>
);

export default Footer;
