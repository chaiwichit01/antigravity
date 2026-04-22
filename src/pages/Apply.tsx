import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect, useRef } from "react";
import { DollarSign } from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle2,
  Clock,
  ChevronRight,
  ChevronLeft,
  Upload,
  AlertCircle,
  Trophy,
  Star,
  BrainCircuit,
  MessageSquareHeart,
  Lightbulb
} from "lucide-react";

// === QUIZ DATA (40 Questions) ===
const allQuestions = [
  // ==========================================
  // PART 1: MBTI & Job Fit (15 Questions)
  // Focus: Extraversion, Adaptability, Empathy vs Logic, Structure vs Flexibility
  // ==========================================
  { id: 1, category: "MBTI", question: "1. เมื่อคุณก้าวเข้าไปในงานเลี้ยงบริษัทที่มีคนแปลกหน้าเต็มไปหมด คุณมีแนวโน้มจะทำอะไรเป็นสิ่งแรก?", options: ["ยืนอยู่ขอบๆ ห้องและรอให้คนเข้ามาทักทายคุณเอง", "มองหาคนที่ดูคุ้นหน้าหรือคนที่ยืนอยู่คนเดียวแล้วเข้าไปชวนคุย", "เดินไปที่ซุ้มอาหารหรือเครื่องดื่มก่อนเป็นอันดับแรกเพื่อตั้งหลัก", "เดินเข้าไปทักทายกลุ่มคนที่กำลังคุยกันอย่างสนุกสนานและแนะนำตัวเอง"], correct: 3 },
  { id: 2, category: "MBTI", question: "2. คุณชอบวิธีการทำงานแบบไหนมากที่สุด?", options: ["การทำงานคนเดียวที่ต้องการสมาธิสูงและลงรายละเอียดลึกๆ", "การได้รับมอบหมายงานที่ชัดเจนและมีขั้นตอนที่แน่นอน ไม่ต้องคิดนอกกรอบมาก", "การทำงานเป็นทีมที่ได้ระดมสมองและแลกเปลี่ยนไอเดียใหม่ๆ ตลอดเวลา", "การทำงานที่ต้องพบปะผู้คนหลากหลายและแก้ปัญหาเฉพาะหน้าทุกวัน"], correct: 3 },
  { id: 3, category: "MBTI", question: "3. เมื่อเพื่อนร่วมงานมีปัญหาและดูเครียดจัด คุณมักจะตอบสนองอย่างไร?", options: ["เข้าไปถามด้วยความห่วงใยและเป็นผู้ฟังที่ดีให้เขาระบายความรู้สึก", "พยายามวิเคราะห์สาเหตุของปัญหาและเสนอวิธีแก้ไขเป็นข้อๆ ทันที", "ให้พื้นที่ส่วนตัวเขาจนกว่าเขาจะพร้อมเข้ามาปรึกษาเอง", "ชวนเขาไปทำอย่างอื่นที่ผ่อนคลายเพื่อเปลี่ยนบรรยากาศโดยไม่พูดถึงปัญหา"], correct: 0 },
  { id: 4, category: "MBTI", question: "4. คุณต้องนำเสนอสินค้าใหม่ให้ลูกค้า คุณจะเริ่มต้นจากอะไร?", options: ["ร่ายสเปคและคุณสมบัติทางเทคนิคที่ล้ำสมัยที่สุดของสินค้า", "เล่าถึงประสบการณ์และความรู้สึกดีๆ ที่ลูกค้าจะได้รับจากการใช้สินค้า", "ถามสารทุกข์สุกดิบและสร้างความสนิทสนมกับลูกค้าก่อนเข้าเรื่อง", "อธิบายถึงความคุ้มค่าและให้เปรียบเทียบราคากับคู่แข่งชัดเจน"], correct: 2 },
  { id: 5, category: "MBTI", question: "5. เช้าวันหนึ่ง ผู้จัดการเปลี่ยนโปรโมชั่นกะทันหัน ซึ่งต่างจากที่คุณท่องจำมาทั้งคืน คุณรู้สึกอย่างไร?", options: ["หงุดหงิดเล็กน้อยเพราะเตรียมตัวมาแล้ว แต่ก็ทำตามกฎใหม่", "รู้สึกท้าทายที่มีอะไรใหม่ๆ ให้ลอง และรีบทำความเข้าใจโปรโมชั่นใหม่ทันที", "กังวลว่าจะอธิบายลูกค้าผิดพลาด และขอเวลาทบทวนให้แม่นยำก่อนเริ่มงาน", "รู้สึกตื่นเต้นและคิดหาคำพูดเจ๋งๆ เพื่อนำโปรใหม่ไปเชียร์ลูกค้า"], correct: 3 },
  { id: 6, category: "MBTI", question: "6. หากให้คุณเลือกวันหยุดที่สมบูรณ์แบบ คุณจะเลือกแบบไหน?", options: ["นอนพักผ่อนที่บ้าน ดูหนัง อ่านหนังสือเงียบๆ คนเดียว", "นัดเจอแก๊งเพื่อนสนิทกลุ่มใหญ่ ไปปาร์ตี้หรือกิจกรรมที่สนุกสนาน", "ไปเที่ยวที่ใหม่ๆ ที่ไม่เคยไปแบบไม่มีการวางแผนล่วงหน้า", "ทำกิจกรรมงานอดิเรกที่ต้องใช้สมาธิและการประดิษฐ์ประดอย"], correct: 1 },
  { id: 7, category: "MBTI", question: "7. เมื่อคุณต้องทำงานร่วมกับคนที่มีนิสัยต่างจากคุณสุดขั้ว คุณจะทำอย่างไร?", options: ["พยายามปรับตัวและหาวิธีสื่อสารที่เขาชอบ เพื่อให้งานเดินต่อได้", "หลีกเลี่ยงการโต้เถียง คุยเฉพาะเรื่องงานที่จำเป็นเท่านั้น", "ยืนหยัดในวิธีการของตนเอง ถ้าเขาไม่ยอมรับก็ปล่อยให้ผู้จัดการตัดสิน", "พยายามเปลี่ยนความคิดเขาให้ยอมรับวิธีคิดและการทำงานของคุณ"], correct: 0 },
  { id: 8, category: "MBTI", question: "8. การตัดสินใจเรื่องสำคัญในชีวิตของคุณ มักขึ้นอยู่กับสิ่งใด?", options: ["ความรู้สึก สัญชาตญาณ และผลกระทบต่อจิตใจคนรอบข้าง", "ข้อมูล ข้อเท็จจริง สถิติ และหลักเหตุผลที่จับต้องได้", "คำปรึกษาจากคนใกล้ชิดและผู้ที่มีประสบการณ์มากกว่า", "ผลประโยชน์และความคุ้มค่าที่จะได้รับในระยะยาว"], correct: 0 },
  { id: 9, category: "MBTI", question: "9. ในการประชุมทีม ทุกคนกำลังถกเถียงเรื่องเป้าหมายเดือนหน้า และบรรยากาศเริ่มตึงเครียด คุณมักจะรับบทบาทใด?", options: ["เป็นคนเงียบๆ จดบันทึก และสรุปประเด็นเมื่อทุกคนทะเลาะกันเสร็จ", "พยายามไกล่เกลี่ย หาจุดร่วม และพูดเรื่องตลกเพื่อลดความตึงเครียด", "ยืนยันเหตุผลและตัวเลขอย่างหนักแน่นเพื่อพิสูจน์ว่าวิธีไหนดีที่สุด", "ถอยออกมาจากการเถียง และรอให้ผู้จัดการเป็นคนฟันธง"], correct: 1 },
  { id: 10, category: "MBTI", question: "10. คุณมีแนวทางการบริหารเวลาส่วนตัวอย่างไร?", options: ["มีตารางเวลาชัดเจน ทำตามแผนเป๊ะๆ ไม่ชอบการเปลี่ยนแปลง", "มีเป้าหมายคร่าวๆ ในหัว แต่ยืดหยุ่นปรับเปลี่ยนได้ตามสถานการณ์หน้างานเสมอ", "ชอบปล่อยให้เรื่องมันลื่นไหลไปตามอารมณ์ ค่อยคิดว่าจะทำอะไรต่อไป", "วางแผนไว้บ้าง แต่ส่วนใหญ่ถูกรบกวนด้วยเรื่องด่วนแทรกเข้ามาเสมอ"], correct: 1 },
  { id: 11, category: "MBTI", question: "11. คุณรู้สึกได้ชาร์จพลังงานตัวเองมากที่สุดจากสถานการณ์ใด?", options: ["ได้นั่งเงียบๆ จิบกาแฟ และทบทวนเรื่องราวคนเดียว", "ได้พูดคุยแลกเปลี่ยนเรื่องตลกๆ หรือความสำเร็จกับเพื่อนร่วมงานหลังเลิกงาน", "ได้ทำภารกิจหรือโปรเจกต์ยากๆ สำเร็จตามเป้าหมายคนเดียว", "ได้จัดเก็บโต๊ะ จัดการอีเมล หรือกำจัดสิ่งรกรุงรัง"], correct: 1 },
  { id: 12, category: "MBTI", question: "12. ในฐานะพนักงานขาย คุณพบว่าตัวเองสามารถปิดการขายได้ดีที่สุดเมื่อใด?", options: ["เมื่อคุณได้อธิบายฟังก์ชันเครื่องแบบละเอียดและแสดงหลักฐานความคุ้มค่า", "เมื่อคุณรู้สึกว่าตัวเอง 'คลิก' กับลูกค้า และคุยกันเหมือนเพื่อน", "เมื่อคุณใช้เทคนิคจิตวิทยาต้อนลูกค้าให้ตัดสินใจซื้อโดยเร็ว", "เมื่อโปรโมชั่นของทางร้านถูกที่สุดในห้าง"], correct: 1 },
  { id: 13, category: "MBTI", question: "13. การเรียนรู้สิ่งใหม่ของคุณเป็นไปในลักษณะใด?", options: ["ชอบอ่านคู่มือให้จบและทำความเข้าใจทฤษฎีก่อนลงมือทำ", "ชอบให้มีคนมาสอน หรือดูวิดีโอที่มีคนอธิบายอย่างสนุกสนาน", "ชอบลองกดดูเมนูหรือลองผิดลองถูกด้วยตัวเองเลย ไม่กลัวพัง", "ไม่ชอบเรียนรู้สิ่งใหม่ ถ้าของเดิมยังใช้งานได้ดีอยู่แล้ว"], correct: 2 },
  { id: 14, category: "MBTI", question: "14. เมื่อต้องอธิบายเรื่องซับซ้อน (เช่น วิธีใช้งานสมาร์ทโฟนรุ่นใหม่) ให้ผู้สูงอายุฟัง คุณจะทำอย่างไร?", options: ["ใช้ศัพท์เทคนิคเพื่อดูมีความน่าเชื่อถือ แต่อธิบายด้วยน้ำเสียงสุภาพ", "เปรียบเทียบการใช้งานกับสิ่งที่คุ้นเคยในชีวิตประจำวันอย่างใจเย็น และจับมือทำ", "ปริ้นท์คู่มือที่มีรูปภาพอธิบายชัดเจนให้เขากลับไปลองอ่านที่บ้าน", "บอกให้เขาให้ลูกหลานเป็นคนตั้งค่าให้จะดีที่สุด"], correct: 1 },
  { id: 15, category: "MBTI", question: "15. ถ้าพรุ่งนี้เป็นวันแรกของการมาทำงานที่นี่ สิ่งที่คุณตั้งเป้าจะทำให้สำเร็จคืออะไร?", options: ["จำรายละเอียดสินค้าและโปรโมชั่นให้ได้มากที่สุด", "ทำความรู้จักและสามารถทักทายพูดคุยกับเพื่อนร่วมงานให้ได้ครบทุกคน", "จัดโครงสร้างการทำงานและเตรียมพื้นที่โต๊ะทำงานให้เรียบร้อย", "ทำยอดขายบิลแรกให้ได้เพื่อพิสูจน์ฝีมือตั้งแต่ระดับทันที"], correct: 1 },

  // ==========================================
  // PART 2: Role Play & Customer Service (15 Questions)
  // Focus: Conflict Resolution, Needs Analysis, Consultative Selling, Empathy
  // ==========================================
  { id: 16, category: "RolePlay", question: "[สถานการณ์จำลอง] ลูกค้าเข้ามาบ่นว่า 'เมื่อวานเพิ่งซื้อฟิล์มกระจกไป วันนี้หลุดแล้ว! ติดยังไงเนี่ย ร้านนี้ไม่ได้เรื่อง!' คุณจะเริ่มต้นบทสนทนาอย่างไร?", options: ["'ต้องขออภัยที่ทำให้ลูกค้าเสียความรู้สึกครับ ขออนุญาตขอดูตัวเครื่องสักนิดนะครับ เดี๋ยวผมจัดการเปลี่ยนแผ่นใหม่ให้เคลมให้ทันทีครับ'", "'ใจเย็นๆ ก่อนครับลูกค้า ฟิล์มมันหลุดเองยากมาก ลูกค้าเอาไปแงะหรือใส่เคสแน่นไปหรือเปล่าครับ ขอตรวจสอบก่อนนะครับ'", "'ทางเราใช้ของแท้นะครับ คงต้องส่งเข้าศูนย์ตรวจสอบก่อน แบบนี้ยังไม่สามารถเปลี่ยนให้ได้ทันทีครับ'", "'พนักงานคนไหนเป็นคนติดให้ครับเนี่ย เดี๋ยวผมจะไปจัดการตักเตือนให้ครับ รบกวนลูกค้ารอสักครู่'"], correct: 0 },
  { id: 17, category: "RolePlay", question: "[สถานการณ์จำลอง] ลูกค้ากำลังจะเดินออกจากร้านเพราะบอกว่า 'ราคาที่นี่แพงกว่าร้านตู้ข้างหน้าตั้ง 500 บาท!' คุณจะโต้ตอบเพื่อดึงลูกค้าอย่างไร?", options: ["'ร้านตู้นั้นอาจจะขายเครื่องย้อมแมวครับ ไว้ใจไม่ได้หรอก พี่ซื้อกับเราดีกว่า'", "'ถ้าพี่ไปซื้อร้านนั้น แล้วเครื่องมีปัญหา เค้าไม่รับเคลมเหมือนนร้านเรานะครับ'", "'จริงครับน้องเข้าใจเลย แต่เครื่องร้านเราเป็นเครื่องศูนย์แท้ 100% มีประกันซ่อมหน้าจอแตกฟรี 1 ปี และพี่เข้ามาเคลมที่นี่ได้ตลอด 500 บาทที่เพิ่มมาคือซื้อความอุ่นใจระยะยาวนะครับ'", "'งั้นเดี๋ยวผมขอลองคุยกับผู้จัดการให้ดูนะครับ ว่าพอลดให้เท่ากับร้านตู้ได้หรือเปล่า พี่รอแปปนะ'"], correct: 2 },
  { id: 18, category: "RolePlay", question: "[สถานการณ์จำลอง] ลูกค้าวัยรุ่นอยากได้มือถือรุ่น Top ซีรีส์ 15 Pro Max แต่ดูแล้วงบไม่น่าจะถึง (เงินดาวน์ไม่พอติดโปร) คุณจะเสนอทางเลือกเพื่อรักษาโอกาสการขายอย่างไร?", options: ["'รุ่นนี้เกินงบน้องไปหน่อยนะ พี่ว่าดูรุ่นเริ่มต้นดีกว่า จะได้มีเงินเหลือไปเที่ยวด้วย ดีไหม?'", "'พี่เข้าใจเลยว่าทำไมเราชอบรุ่นนี้ สเปคมันแรงมาก! แต่ถ้ามองเรื่องฟังก์ชันการเล่นเกมและกล้องที่คล้ายกัน รุ่น Top ของแบรนด์ S ราคาเบากว่าพอสมควรเลย สนใจลองจับดูไหม?'", "'ถ้างบไม่ถึง พี่แนะนำให้รูดบัตรเครดิตคุณพ่อคุณแม่ดีกว่าครับ จะได้ของที่อยากได้เลย'", "'ยังไงก็พยายามเก็บเงินดาวน์เพิ่มอีกนิดเนาะ ไว้พร้อมแล้วค่อยกลับมาซื้อร้านพี่นะ'"], correct: 1 },
  { id: 19, category: "RolePlay", question: "[สถานการณ์จำลอง] ลูกค้าสองสามีภรรยาเข้ามาดูมือถือใหม่ ทั้งคู่เถียงกันว่า 'จะเอาจอเล็กกะทันรัด' กับ 'เอาจอใหญ่จัดเต็มไปเลย' ในฐานะพนักงานขาย คุณจะทำอย่างไร?", options: ["รอให้ทั้งคู่ตกลงกันเสร็จก่อน แล้วค่อยเดินเข้าไปเสนอขาย", "เข้าข้างสามีหรือคนที่เป็นคนจ่ายเงิน เพื่อให้ปิดการขายได้เร็วที่สุด", "รับฟังและอมยิ้ม แล้วเสนอ 'ตรงกลาง' โดยแนะนำมือถือขนาดกลางที่มีโปรโมชั่นพิเศษ ควบรวมทั้งสองความต้องการ", "บอกข้อดีข้อเสียของมือถือทั้งสองขนาดอย่างละเอียดเป็นกลางที่สุด และให้เวลาเขาซัก 10 นาทีตัดสินใจ"], correct: 2 },
  { id: 20, category: "RolePlay", question: "[สถานการณ์จำลอง] ลูกค้าใช้มือถือเครื่องเก่ามา 5 ปี ข้อมูลเต็มจนเครื่องค้าง ไม่ยอมซื้อใหม่บอกว่า 'แค่ลบรูปก็น่าจะพอแล้ว เสียดายเงิน' คุณจะพูดยังไงให้ผู้ใหญ่วัยนี้ตัดสินใจเปิดใจซื้อมือถือใหม่?", options: ["'ลบยังไงก็เต็มครับ ใช้วิธีลบทีละรูปให้เสียเวลาทำไมครับ ซื้อเครื่องใหม่ความจุเยอะกว่ากัน 4 เท่าเลย โอนข้อมูลแปปเดียว'", "'คุณน้าลบรูปเก่งจังเลย แต่เครื่องเก่าพอแบตเริ่มเสื่อมหน้าจอมันมืดนะ น้าลองจับเครื่องรุ่นใหม่ดูสิ จอสว่างสบายตามาก วันนี้มีโปรเอาเครื่องเก่ามาแลกส่วนลดได้ด้วย สนใจไหมคะ?'", "'ถ้าไม่ซื้อใหม่ วันนึงเครื่องดับเปิดไม่ติด รูปจะหายหมดกู้ไม่ได้ถึงขั้นร้องไห้เลยนะครับ เตือนไว้ก่อนเลย'", "'งั้นเดี๋ยวหนูสอนวิธีสำรองข้อมูลลงคอมให้ค่ะ จะได้ไม่ต้องซื้อใหม่ ประหยัดเงินกว่าเยอะเลย'"], correct: 1 },
  { id: 21, category: "RolePlay", question: "[สถานการณ์จำลอง] มีลูกค้ากำลังหงุดหงิดรอคิวอยู่นาน เพราะระบบคิวล่ม แล้วคุณเพิ่งเคลียร์งานเสร็จ คุณจะเดินไปรับเขายังไง?", options: ["'มาค่ะ คิวเบอร์ 45 ค่ะ ระบบมันรวนนิดหน่อย ขอโทษที่รอนานนะคะ วันนี้รับอะไรดี'", "'สวัสดีครับคุณผู้ชาย ต้องกราบขออภัยอย่างสูงครับที่ปล่อยให้รอนานเป็นพิเศษ วันนี้ให้ผมช่วยดูแลเรื่องอะไรดีครับ เดี๋ยวผมจะรีบจัดการให้อย่างเต็มที่เลย'", "'ลูกค้าใจเย็นๆ นะครับ วันนี้คนมันเยอะมาก แถมระบบมีปัญหาด้วย เดี๋ยวผมเร่งให้ครับ'", "'สวัสดีค่ะ รับเรื่องอะไรคะ บัตรประชาชนด้วยค่ะ'"], correct: 1 },
  { id: 22, category: "RolePlay", question: "[สถานการณ์จำลอง] ลูกค้านำสายชาร์จมาเคลม อ้างว่าซื้อจากร้านคุณเมื่อ 2 วันก่อน แต่สายมีรอยโดนหนูแทะขาด ซึ่งอยู่นอกเหนือประกันแน่ๆ คุณจะแจ้งลูกค้าอย่างไรไม่ให้เกิดเรื่อง?", options: ["'พี่ครับ ประกันไม่ครอบคลุมหนูแทะนะครับ พี่ต้องไปซื้อใหม่เอาเองครับ เคลมไม่ได้จริงๆ'", "'โอ้โห สายนี้ขาดเหมือนโดนอะไรกัดเลยค่ะพี่ กรณีแบบนี้บริษัทผู้ผลิตเขาถือเป็นอุบัติเหตุและไม่รับเคลมเลยค่ะ... แต่พี่เป็นลูกค้าเก่า เดี๋ยวหนูให้ส่วนลด 20% สำหรับสายเส้นใหม่ดีไหมคะ จะได้ไม่ต้องจ่ายเต็ม'", "'พี่แน่ใจเหรอครับว่าหนูเคลมให้ได้? รอยกัดแบบนี้ไม่ผ่านประกันแน่นอนครับ ไปคุยกับผู้จัดการก็ไม่ได้ครับ'", "'งั้นเดี๋ยวผมรับเรื่องส่งศูนย์ให้ก่อนนะครับ แต่คงต้องบอกไว้ก่อนว่าโอกาสได้เคลมน้อยมากๆ ให้ศูนย์ตัดสินละกัน'"], correct: 1 },
  { id: 23, category: "RolePlay", question: "[สถานการณ์จำลอง] ลูกค้าเดินเข้ามาแบบไม่มีจุดหมาย แค่ดูเพลินๆ แต่คุณต้องการเข้าชาร์จ (Approach) เพื่อเปิดการขาย ประโยคแรกที่คุณจะใช้คือ?", options: ["'สวัสดีครับ รับรุ่นไหนดีครับ วันนี้มีโปรใหม่เยอะเลย'", "'สนใจรุ่นไหนถามได้เลยนะครับ พี่มาดูมือถือให้ตัวเองหรือให้ลูกหลานครับ?'", "'สวัสดีค่ะ ตามสบายเลยนะคะ ถ้ารุ่นไหนน่าสนใจเรียกน้องได้เลยค่ะ ยินดีบริการ'", "'ถ้าพี่ซื้อวันนี้ น้องแถมกระเป๋าให้ฟรีเลย 1 ใบ พี่ดูเครื่องงบเท่าไหร่ไว้ครับ?'"], correct: 1 },
  { id: 24, category: "RolePlay", question: "[สถานการณ์จำลอง] ในช่วงจัดรายการ 'นาทีทอง' คนรุมหน้าร้านเยอะมาก มีลูกค้าสองคนแย่งอยากได้มือถือเครื่องสุดท้าย (สีขาว) คุณจะแก้ปัญหานี้ยังไง?", options: ["'ใครจ่ายเงินสดก่อน หรือใครหยิบบัตรเครดิตมาเตรียมรูดก่อน ให้คนนั้นครับ!'", "'ผมขอโทษทั้งสองท่านจริงๆ ครับ เครื่องสีขาวหมดแล้วจริงๆ แต่ท่านใดสนใจรับสีดำแทน ตอนนี้ผมยินดีแถมเคสใสและฟิล์มกระจกพิเศษให้ฟรีเลยแทนคำขอโทษครับ'", "'เดี๋ยวผมโยนเหรียญหัวก้อยตัดสินให้ดีไหมครับ จะได้ยุติธรรมกับทั้งสองฝ่าย'", "'ให้คนแรกที่เข้ามาถามละกันครับ ลูกค้าอีกท่านนึงต้องขออภัยด้วยนะครับ ให้รอของเข้าวันจันทร์นะครับ'"], correct: 1 },
  { id: 25, category: "RolePlay", question: "[สถานการณ์จำลอง] ลูกค้าถามเรื่องฟินเจอร์ของมือถือยี่ห้อหนึ่ง แต่คุณยังอ่านคู่มือรุ่นนี้ไม่จบ เลยไม่ทราบแน่ชัดว่าสามารถ 'กันน้ำระดับลึก' ได้ไหม คุณจะตอบว่าอย่างไร?", options: ["'น่าจะกันน้ำได้สบายๆ เลยครับพี่ มือถือสมัยนี้ลงน้ำลึกได้ทุกรุ่นแหละครับ'", "'รุ่นนี้เด่นเรื่องกันน้ำเลยค่ะพี่ สบายใจได้... เดี๋ยวหนูรีบขายตัวเครื่องให้ก่อนนะคะ'", "'เป็นคำถามที่ดีมากเลยครับพี่ แต่เพื่อความชัวร์ไม่ให้พี่เสียโอกาสการรับประกัน ขอผมเปิดแคตตาล็อกคู่หูเช็คสเปค 1 นาทีนะครับ จะได้ตอบพี่ให้ตรงเป๊ะเลย'", "'อันนี้ผมไม่แน่ใจเลยครับ เพิ่งมาทำงานใหม่ รบกวนพี่เสิร์ช Google เอาน่าจะเร็วกว่านะครับ'"], correct: 2 },
  { id: 26, category: "RolePlay", question: "[สถานการณ์จำลอง] คุณเสนอแพ็กเกจเน็ตรายเดือนที่มีราคา 899 ซึ่งครอบคลุมการใช้งานทั้งหมด แต่ลูกค้าทำหน้าลังเลและบอกว่า 'แพงจังเลย มีถูกกว่านี้ไหม' คุณจะพูดอย่างไร?", options: ["'มีครับ ตัวราคา 499 ก็มี แต่ไม่แนะนำเพราะเน็ตมันช้ามาก พี่เล่นเกมกระตุกแน่นอน สู้ 899 ไม่ได้หรอกครับ'", "'พี่รู้สึกว่า 899 แพงไปเหรอครับ... งั้นพี่ดูตัว 699 ก็ได้ครับ เน็ตลดลงมานิดนึง แต่ประหยัดไปตั้ง 200'", "'พี่ครับ ที่พี่ดูว่าราคาสูง เพราะแพ็กนี้นอกจากเน็ตไม่อั้นแถมยังไม่ลดสปีดแล้ว ยังได้ดูสตรีมมิ่งฟรี 1 ปีด้วย ซึ่งปกติพี่ต้องสมัครแยกเดือนละด 300 อยู่แล้ว เท่ากับแพ็กเกจนี้คุ้มกว่ามากๆ เลยนะครับพี่'", "'งั้นพี่อย่าเพิ่งสมัครเลยครับ เอาแบบเติมเงินใช้ชิลๆ ไปก่อนดีไหม หมดค่อยเติม'"], correct: 2 },
  { id: 27, category: "RolePlay", question: "[สถานการณ์จำลอง] ลูกค้าต่างชาติเดินเข้ามาในร้าน คุณฟังภาษาอังกฤษเขารู้เรื่องบ้างไม่รู้เรื่องบ้าง เขาเหมือนจะสื่อสารว่าอยากได้ Power Bank คุณจะทำอย่างไร?", options: ["โบกมือปฏิเสธและพูดว่า 'No have, No have' เพื่อปัดความรำคาญ", "รีบเดินไปเรียกเพื่อนร่วมงานที่เก่งภาษาอังกฤษมาช่วยคุยทันที โดยไม่ต้องทักทายเขา", "ยิ้ม ทักทาย 'Hello sir' แล้วชวนเขาเดินไปที่แผนก Power Bank แล้วใช้วิธีชี้เพื่อพยายามบริการเขาอย่างดีที่สุดเท่าที่ทำได้", "ใช้แอปแปลภาษาในมือถือ แปลคำพูดของตัวเองแล้วให้เขาฟัง และพยายามถามว่าเขาต้องการกี่ mAh อย่างตั้งใจ"], correct: 3 },
  { id: 28, category: "RolePlay", question: "[สถานการณ์จำลอง] เพื่อนร่วมงานแอบนินทาลูกค้าที่เพิ่งเดินออกจากร้านว่า 'แต่งตัวมอซอมาจับเครื่องตั้งนาน สุดท้ายก็ไม่ซื้อ เสียเวลา' คุณจะตอบสนองเพื่อนอย่างไร?", options: ["เห็นด้วยและร่วมบ่นผสมโรง เพื่อทอดสนิทกับเพื่อนร่วมงาน", "เงียบ ไม่พูดอะไร แต่ในใจก็แอบคิดเหมือนกัน", "พูดเตือนสติว่า 'เอาน่าพี่ วันนี้ดูลำบาก แต่อนาคตเขาอาจจะกลับมาเหมาของร้านเราก็ได้ บริการให้ดีไว้ก่อนเขาจะได้ประทับใจ'", "รีบเดินไปฟ้องผู้จัดการร้าน ว่ามีพนักงานทัศนคติไม่ดีอยู่ในสาขา"], correct: 2 },
  { id: 29, category: "RolePlay", question: "[สถานการณ์จำลอง] ลูกค้าตัดสินใจซื้อเครื่องเรียบร้อยแล้ว รูดบัตรแล้ว แต่ดันยืนยันขอเปลี่ยนสีเครื่องกะทันหัน ซึ่งต้องยกเลิกบิลวุ่นวาย คุณจะรับมืออย่างไร?", options: ["'พี่ครับ รูดไปแล้วระบบมันแก้ไม่ได้ครับ พี่ต้องรับสีนี้ไปแหละครับ'", "'ได้ครับพี่! แต่การยกเลิกบิลบัตรเครดิตต้องใช้เวลาประมาณ 10-15 นาทีในการติดต่อธนาคาร พี่สะดวกนั่งรอดื่มน้ำสีกนิดนึงไหมครับ เดี๋ยวผมรีบจัดการเปลี่ยนสีใหม่ให้ถูกใจพี่ที่สุดครับ'", "'โหยยยย พี่ยกเลิกยากมากเลยนะครับ งั้นพี่ต้องยอมโดนหักค่าธรรมเนียมบัตรเครดิต 3% นะครับ จะเปลี่ยนไหม?'", "'เปลี่ยนไม่ได้แล้วจริงๆ ครับ ถ้างั้นผมแถมเคสสีที่พี่อยากได้ไปครอบทับแทนละกันนะครับ'"], correct: 1 },
  { id: 30, category: "RolePlay", question: "[สถานการณ์จำลอง] หากคุณพบรอยตำหนิเล็กๆ บนตัวเครื่องตอนที่กำลังจะส่งมอบให้ลูกค้า (ซึ่งลูกค้ายังไม่ทันเห็น) คุณควรทำอย่างไร?", options: ["รีบเอาผ้าเช็ดแล้วหลบๆ มุมสายตา ส่งมอบให้ลูกค้าไปอย่างแนบเนียน ถ้าเขาเห็นค่อยกลับมาเคลมทีหลัง", "บอกลูกค้าตามตรงว่า 'พี่ครับ พอดีผมสังเกตเห็นรอยขนแมวเส้นเล็กๆ ตรงนี้ เพื่อความสมบูรณ์แบบร้อยเปอร์เซ็นต์ เดี๋ยวผมเดินไปเบิกเครื่องกล่องใหม่มาให้เลยดีกว่าครับ พี่รอสัก 2 นาทีนะครับ'", "บอกลูกค้าว่า 'อ้าว เครื่องเป็นรอยเฉยเลยพี่ ห่วยจังยี่ห้อนี้ หลุด QC มาได้ไง'", "ทำเป็นไม่รู้ไม่ชี้ ถ้าลูกค้าทัก ก็ให้โทษว่าเป็นรอยมาจากโรงงาน"], correct: 1 },

  // ==========================================
  // PART 3: Vision & Growth Mindset (10 Questions)
  // Focus: Embracing Challenges, Continuous Learning, Resilience, Forward-thinking
  // ==========================================
  { id: 31, category: "Vision", question: "เวลาได้รับข้อเสนอแนะในเชิงลบ (Negative Feedback) อย่างรุนแรงจากลูกค้าระดับ VIP คุณรับมือกับความรู้สึกตัวเองอย่างไร?", options: ["รู้สึกแย่และเสียความมั่นใจ เก็บคำพูดเหล่านั้นมาบั่นทอนจนทำงานต่อไม่ได้ทั้งวัน", "คิดว่าลูกค้าจุกจิกเรื่องมากเกินไป ปัดตกความเห็นของเขา เพราะเราทำตามขั้นตอนบริษัทถูกต้องหมดแล้ว", "รับฟังอย่างใจเย็น ขอโทษลูกค้า และพิจารณาความผิดพลาดเพื่อนำไปปรับปรุงแก้ไขวิธีการบริการในครั้งหน้า", "แก้ตัวชี้แจงเหตุผลให้ลูกค้าเข้าใจทันที เพื่อปกป้องตัวเองและชื่อเสียงของร้าน"], correct: 2 },
  { id: 32, category: "Vision", question: "หากมีโอกาสได้เป็นหัวหน้าสาขาในอีก 3 ปีข้างหน้า สิ่งที่คุณจะให้ความสำคัญที่สุดเพื่อนำทีมสู่ความสำเร็จคือ?", options: ["การออกกฎระเบียบที่เข้มงวดที่สุด เพื่อให้พนักงานทุกคนมีวินัย ไม่กล้าทำงานพลาด", "การกระตุ้นทีมด้วยยอดขาย ใครขายไม่ถึงเป้าต้องโดนทำโทษ หรือให้ออก", "การสร้างบรรยากาศการเรียนรู้ รับฟังปัญหาลูกน้อง และแบ่งปันเทคนิคการขายใหม่ๆ ให้โตไปพร้อมกัน", "การเหมาทำงานหน้าบ้านทั้งหมดด้วยตัวเอง เพราะเก่งกว่าลูกน้อง และปล่อยให้ลูกน้องทำแต่งานหลังบ้าน"], correct: 2 },
  { id: 33, category: "Vision", question: "คุณคิดว่าอะไรคือสาเหตุสำคัญที่ทำให้พนักงานขาย 'ไม่เติบโต' ในสายอาชีพนี้?", options: ["คู่แข่งเยอะ เศรษฐกิจไม่ดี และสินค้าแบรนด์อื่นขายง่ายกว่า", "การหยุดเรียนรู้สิ่งใหม่ๆ และพอใจเมื่อปิดยอดขายได้แล้วโดยไม่สนใจดูแลบริการหลังการขายสร้างความสัมพันธ์ระยะยาว", "เจ้านายไม่สนับสนุน ไม่ยอมให้ขึ้นเงินเดือน และโอกาสความก้าวหน้าน้อย", "ลูกค้าสมัยนี้เลือกเยอะและเรื่องมาก ทำให้ทำงานยากขึ้น"], correct: 1 },
  { id: 34, category: "Vision", question: "เมื่อเจอเพื่อนร่วมงานที่ยอดขายแซงคุณไปมากเกินครึ่งทั้งที่เพิ่งมาใหม่ คุณมีความคิดเห็นอย่างไรต่อเรื่องนี้?", options: ["ลาออกหรือย้ายสาขา เพราะรู้สึกกดดันและสู้เด็กใหม่ไม่ได้", "คิดว่าน่าจะเป็นเรื่องบังเอิญ หรือเขาได้ลูกค้าหน้าฟลุคๆ มา", "รู้สึกอิจฉาและพยายามหาข้อจับผิดว่าเขาทำผิดกฎการขายหรือแย่งลูกค้าเราหรือเปล่า", "รู้สึกท้าทาย และแอบไปสังเกตหรือซักถามเทคนิคการพูดของเขา เพื่อนำมาปรับใช้และพัฒนาตัวเองให้ยอดดีขึ้น"], correct: 3 },
  { id: 35, category: "Vision", question: "บริษัทเปลี่ยนมาใช้ระบบคอมพิวเตอร์แบบใหม่ทั้งหมดแทนกระดาษ คุณที่ไม่ถนัดคอมพิวเตอร์จะมีแนวทางรับมืออย่างไร?", options: ["ยอมรับว่าตัวเองไม่เก่ง และพยายามใช้ระบบเก่าควบคู่ไปจนกว่าจะโดนบีบให้เลิกใช้", "โวยวายว่าระบบใหม่ทำให้งานช้าลง และส่งผลกระทบต่อยอดขาย เพื่อให้บริษัทเปลี่ยนใจ", "มองว่าเป็นเรื่องที่ต้องเผชิญหน้า เข้าอบรม ฝึกใช้จริงนัดพี่ๆ มาช่วยสอน ใช้งานพลาดก็ถือเป็นบทเรียนจนกว่าจะคล่อง", "ขอร้องให้คนที่เก่งคอมฯ เป็นคนประสานงานส่วนของระบบแทน ส่วนตนเองจะไปเน้นขายหน้าร้านอย่างเดียว"], correct: 2 },
  { id: 36, category: "Vision", question: "คุณจะทำอย่างไรถ้าผู้จัดการกำหนดเป้ายอดขาย (Target) เดือนนี้สูงขึ้นจากเดิม 30% ซึ่งดูเหมือนแทบจะเป็นไปไม่ได้?", options: ["บ่นและถอดใจตั้งแต่ต้นเดือน เพราะรู้ว่ายังไงก็ทำไม่ได้แน่นอน", "นั่งวิเคราะห์ฐานลูกค้าเก่า คิดหาผลิตภัณฑ์ชิ้นเล็กๆ เข้ามา Cross-sale เพื่อเพิ่มยอดใบเสร็จ และวางแผนเป้ารายวันใหม่", "ตั้งสเตตัสในโซเชียลระบายความเครียด เพื่อหาเพื่อนร่วมชะตากรรม", "ทำงานตามวิธีเดิมทุกวัน เพราะถือว่าได้ทำเต็มที่แล้ว ถ้าไม่ถึงก็ช่วยไม่ได้"], correct: 1 },
  { id: 37, category: "Vision", question: "โลกเทคโนโลยี AI กำลังเข้ามามีบทบาท คุณมองว่าอุตสาหกรรมการขายและบริการลูกค้าในร้านสาขาจะเป็นอย่างไรในอนาคต?", options: ["AI จะมาแย่งงานเราทั้งหมด ไม่ช้าก็เร็วอาชีพพนักงานขายมือถือคงตกงานหมด", "ทุกคนก็จะขายมือถือผ่านออนไลน์หมด หน้าร้านจะเจ๊ง และไม่มีใครเข้ามาซื้ออีก", "หุ่นยนต์จะมาช่วยขายแทนคน เราแค่ยืนเฉยๆ รอกดปุ่มแสกนจ่ายเงิน", "ถึง AI จะฉลาดแค่ไหน แต่รอยยิ้ม ความใส่ใจ (Human Touch) และการแก้ปัญหาที่เข้าใจหัวอกคน เป็นสิ่งที่ลูกค้ายังมองหาเสมอเมื่อมาที่สาขา"], correct: 3 },
  { id: 38, category: "Vision", question: "ในวันที่แย่ที่สุด ฝนตก ลูกค้าน้อย แถมคุณถูกตักเตือนเรื่องการมาสาย สิ่งที่คุณทำเพื่อดึงสติให้ทำงานต่อได้คือ?", options: ["ขอลาป่วยครึ่งวันบ่าย เพื่อกลับบ้านไปนอนพักสมอง", "โทษสภาพอากาศและหัวหน้าที่จู้จี้ ทำให้เป็นวันที่ซวยที่สุด", "ยอมรับความผิดเรื่องมาสาย และหากลูกค้าน้อยก็ใช้เวลาจัดร้าน ทำความสะอาด หรืออ่านอัปเดตสเปคเครื่องรอรับลูกค้าคนต่อไป", "ไปแอบหลับหลังร้านเงียบๆ ปล่อยให้เพื่อนขายคนเดียว แล้วเดี๋ยวค่อยตื่นมาตอนใกล้เลิกงาน"], correct: 2 },
  { id: 39, category: "Vision", question: "ความ 'ผิดพลาด' มีความสำคัญต่อความก้าวหน้าของคุณหรือไม่ อย่างไร?", options: ["ไม่สำคัญ ความผิดพลาดหมายถึงความล้มเหลว และควรปกปิดให้มิดชิดที่สุด", "สำคัญมาก ทุกครั้งที่พลาด เราจะเจ็บ และจะทำให้เราไม่กล้าลองทำอะไรใหม่ๆ อีก", "สำคัญที่สุด เพราะมันคือป้ายบอกทางว่า 'วิธีที่ไม่เวิร์ค' คืออะไร เพื่อนำไปสู่วิธีการที่ 'ใช่' ในอนาคต (Fail Fast, Learn Faster)", "เป็นเรื่องปกติและหลีกเลี่ยงไม่ได้ ทำไปก็พลาดไปไม่ต้องคิดอะไรมาก ปล่อยให้มันผ่านไป"], correct: 2 },
  { id: 40, category: "Vision", question: "คุณคิดว่านิยามความสำเร็จ ของแบรนด์ 'Ngan Dee (งานดี)' คืออะไร?", options: ["การขายสมาร์ทโฟนได้จำนวนมากที่สุดในประเทศไทย ชนะทุกคู่แข่ง", "การมีพนักงานหน้าร้านที่สามารถปิดการขายได้รวดเร็วทันใจ ทำเป้าทะลุร้อยเปอร์เซ็นต์ทุกเดือน", "การส่งมอบประสบการณ์บริการที่ให้ลูกค้าเดินกลับบ้านด้วยรอยยิ้ม ความประทับใจและความไว้วางใจในการกลับมาซื้อซ้ำ", "การมีคอลเอาท์และแคมเปญแจกของแถมและจัดโปรโมชันลดราคาโหดๆ เพื่อให้ได้ยอดกดไลก์เยอะๆ"], correct: 2 },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

const TOTAL_TIME = 45 * 60; // 45 minutes for full 40 questions test
const QUESTIONS_COUNT = 40;

type Step = "form" | "quiz" | "done";

interface FormData {
  fullName: string;
  nickname: string;
  phone: string;
  lineId: string;
  email: string;
  dob: string;
  education: string;
  experience: string;
  position: string;
  pdpa: boolean;
  photo: File | null;
  resume: File | null;
}

const Apply = () => {
  const { jobId } = useParams();
  const [step, setStep] = useState<Step>("form");
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    nickname: "",
    phone: "",
    lineId: "",
    email: "",
    dob: "",
    education: "",
    experience: "",
    position: jobId ? String(jobId) : "",
    pdpa: false,
    photo: null,
    resume: null,
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const [questions] = useState(() => allQuestions.slice(0, QUESTIONS_COUNT));
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [quizDone, setQuizDone] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (step === "quiz" && !quizDone) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            setQuizDone(true);
            setStep("done");
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [step, quizDone]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Calculate sub-scores based on categories
  const calculateScoreByCategory = (category: string) => {
    const categoryQuestions = questions.filter(q => q.category === category);
    const categoryTotal = categoryQuestions.length;
    let earned = 0;
    categoryQuestions.forEach(q => {
      const qIndex = questions.findIndex(item => item.id === q.id);
      if (answers[qIndex] === q.correct) earned += 1;
    });
    return Math.round((earned / (categoryTotal || 1)) * 100);
  };

  const mbtiScore = calculateScoreByCategory("MBTI");
  const rolePlayScore = calculateScoreByCategory("RolePlay");
  const visionScore = calculateScoreByCategory("Vision");
  const overallScorePercent = Math.round((mbtiScore + rolePlayScore + visionScore) / 3);

  const validateForm = () => {
    const e: Partial<FormData> = {};
    if (!formData.fullName.trim()) e.fullName = "กรุณากรอกชื่อ-นามสกุล";
    if (!formData.phone.trim() || !/^0\d{8,9}$/.test(formData.phone)) e.phone = "กรุณากรอกเบอร์โทรให้ถูกต้อง";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) e.email = "กรุณากรอกอีเมลให้ถูกต้อง";
    if (!formData.position) e.position = "กรุณาเลือกตำแหน่ง";
    if (!formData.pdpa) e.pdpa = "กรุณายินยอมข้อมูลส่วนบุคคล" as unknown as boolean;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmitForm = () => {
    if (!validateForm()) return;
    setStep("quiz");
  };

  const handleAnswer = (optIdx: number) => {
    setAnswers((prev) => ({ ...prev, [currentQ]: optIdx }));
  };

  const handleNextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
    } else {
      clearInterval(timerRef.current!);
      setQuizDone(true);
      setStep("done");
    }
  };

  const handlePrevQuestion = () => {
    if (currentQ > 0) setCurrentQ((q) => q - 1);
  };

  const stepLabels = [
    { key: "form", label: "กรอกข้อมูล", num: 1 },
    { key: "quiz", label: "ประเมินศักยภาพ", num: 2 },
    { key: "done", label: "เสร็จสิ้น", num: 3 },
  ];

  const getStepState = (key: string) => {
    const order = ["form", "quiz", "done"];
    const current = order.indexOf(step);
    const target = order.indexOf(key);
    if (target < current) return "completed";
    if (target === current) return "active";
    return "pending";
  };

  const getCategoryConfig = (category: string) => {
    switch (category) {
      case "MBTI": return { label: "บุคลิกภาพ (Job Fit)", icon: <BrainCircuit className="w-4 h-4 mr-1" />, bg: "bg-purple-100 text-purple-700" };
      case "RolePlay": return { label: "สถานการณ์บริการ", icon: <MessageSquareHeart className="w-4 h-4 mr-1" />, bg: "bg-blue-100 text-blue-700" };
      case "Vision": return { label: "วิสัยทัศน์ & ทัศนคติ", icon: <Lightbulb className="w-4 h-4 mr-1" />, bg: "bg-amber-100 text-amber-700" };
      default: return { label: "คำถาม", icon: null, bg: "bg-secondary" };
    }
  };

  const scoreLabel =
    overallScorePercent >= 80
      ? { text: "ผ่านเกณฑ์ 100% (High Potential)", color: "text-green-600", bg: "bg-green-50" }
      : overallScorePercent >= 60
        ? { text: "ผ่านเกณฑ์ พิจารณาต่อ", color: "text-accent", bg: "bg-orange-50" }
        : { text: "ทักษะเบื้องต้นยังไม่ตรงกับตำแหน่ง", color: "text-destructive", bg: "bg-red-50" };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16 flex-1 bg-background">
        <div className="gradient-primary py-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-3xl font-bold text-primary-foreground mb-2">
              หน้าต่างรับสมัครงาน & ประเมินศักยภาพ
            </h1>
            <div className="flex items-center justify-center gap-2 mt-6">
              {stepLabels.map((s, idx) => (
                <div key={s.key} className="flex items-center gap-2">
                  <div className={`step-indicator ${getStepState(s.key)}`}>
                    {getStepState(s.key) === "completed" ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      s.num
                    )}
                  </div>
                  <span
                    className={`text-sm hidden md:block ${getStepState(s.key) === "active"
                      ? "text-primary-foreground font-semibold"
                      : "text-primary-foreground/50"
                      }`}
                  >
                    {s.label}
                  </span>
                  {idx < stepLabels.length - 1 && (
                    <div className="w-8 h-0.5 bg-primary-foreground/30 mx-1" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10 max-w-3xl">
          {/* STEP 1: FORM */}
          {step === "form" && (
            <Card className="border-border shadow-sm rounded-xl overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="font-display text-2xl font-bold text-foreground">
                  ข้อมูลส่วนตัว
                </CardTitle>
                <p className="text-muted-foreground text-sm mt-1">กรอกข้อมูลให้ครบถ้วน เพื่อให้ HR ติดต่อกลับได้</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Row 1: ชื่อ-นามสกุล, ชื่อเล่น */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="fullName" className="text-sm font-semibold">ชื่อ-นามสกุล *</Label>
                    <Input
                      id="fullName"
                      placeholder="สมชาย ใจดี"
                      value={formData.fullName}
                      onChange={(e) => setFormData((f) => ({ ...f, fullName: e.target.value }))}
                      className={`h-11 rounded-lg ${errors.fullName ? "border-destructive ring-1 ring-destructive/20" : "border-border"}`}
                    />
                    {errors.fullName && <p className="text-destructive text-xs">{errors.fullName}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="nickname" className="text-sm font-semibold">ชื่อเล่น</Label>
                    <Input
                      id="nickname"
                      placeholder="ชาย"
                      value={formData.nickname}
                      onChange={(e) => setFormData((f) => ({ ...f, nickname: e.target.value }))}
                      className="h-11 rounded-lg border-border"
                    />
                  </div>
                </div>

                {/* Row 2: เบอร์โทรศัพท์, Line ID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-sm font-semibold">เบอร์โทรศัพท์ *</Label>
                    <Input
                      id="phone"
                      placeholder="0812345678"
                      value={formData.phone}
                      onChange={(e) => setFormData((f) => ({ ...f, phone: e.target.value }))}
                      className={`h-11 rounded-lg ${errors.phone ? "border-destructive ring-1 ring-destructive/20" : "border-border"}`}
                    />
                    {errors.phone && <p className="text-destructive text-xs">{errors.phone}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="lineId" className="text-sm font-semibold">Line ID</Label>
                    <Input
                      id="lineId"
                      placeholder="@somchai"
                      value={formData.lineId}
                      onChange={(e) => setFormData((f) => ({ ...f, lineId: e.target.value }))}
                      className="h-11 rounded-lg border-border"
                    />
                  </div>
                </div>

                {/* Row 3: อีเมล */}
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-semibold">อีเมล *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="somchai@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                    className={`h-11 rounded-lg ${errors.email ? "border-destructive ring-1 ring-destructive/20" : "border-border"}`}
                  />
                  {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
                </div>

                {/* Row 4: วันเดือนปีเกิด, ตำแหน่งที่สมัคร */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="dob" className="text-sm font-semibold">วันเดือนปีเกิด</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={formData.dob}
                      onChange={(e) => setFormData((f) => ({ ...f, dob: e.target.value }))}
                      className="h-11 rounded-lg border-border text-muted-foreground w-full block"
                      style={{ colorScheme: "light" }}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold">ตำแหน่งที่สมัคร *</Label>
                    <Select
                      value={formData.position}
                      onValueChange={(v) => setFormData((f) => ({ ...f, position: v }))}
                    >
                      <SelectTrigger className={`h-11 rounded-lg ${errors.position ? "border-destructive ring-1 ring-destructive/20" : "border-border"}`}>
                        <SelectValue placeholder="เลือกตำแหน่ง" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apple">พนักงานขาย Apple</SelectItem>
                        <SelectItem value="smartphone">พนักงานขาย Smartphone</SelectItem>
                        <SelectItem value="supersale">สายงานบริการหน้าร้าน</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.position && <p className="text-destructive text-xs">{errors.position}</p>}
                  </div>
                </div>

                {/* Row 5: ระดับการศึกษา, ประสบการณ์ทำงาน */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold">ระดับการศึกษา</Label>
                    <Select
                      value={formData.education}
                      onValueChange={(v) => setFormData((f) => ({ ...f, education: v }))}
                    >
                      <SelectTrigger className="h-11 rounded-lg border-border">
                        <SelectValue placeholder="เลือกระดับการศึกษา" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="m6">ม.6 หรือเทียบเท่า</SelectItem>
                        <SelectItem value="vocational">ปวช. / ปวส.</SelectItem>
                        <SelectItem value="bachelor">ปริญญาตรี</SelectItem>
                        <SelectItem value="master">ปริญญาโทขึ้นไป</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold">ประสบการณ์ทำงาน</Label>
                    <Select
                      value={formData.experience}
                      onValueChange={(v) => setFormData((f) => ({ ...f, experience: v }))}
                    >
                      <SelectTrigger className="h-11 rounded-lg border-border">
                        <SelectValue placeholder="เลือกประสบการณ์" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">ไม่มีประสบการณ์</SelectItem>
                        <SelectItem value="1">1-2 ปี</SelectItem>
                        <SelectItem value="3">3-5 ปี</SelectItem>
                        <SelectItem value="5">มากกว่า 5 ปี</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Row 6: อัปโหลดรูปถ่าย และ Resume */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-2">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-foreground">รูปถ่าย</Label>
                    <label className="flex flex-col items-center justify-center w-full min-h-[140px] rounded-xl border-2 border-dashed border-border/80 hover:border-primary/50 hover:bg-muted/30 transition-all cursor-pointer p-4 group">
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setFormData(f => ({ ...f, photo: e.target.files![0] }));
                        }
                      }} />
                      <Upload className="w-6 h-6 text-muted-foreground group-hover:text-primary mb-3 transition-colors" />
                      <span className="text-sm text-foreground/70 group-hover:text-primary transition-colors font-medium">
                        {formData.photo ? formData.photo.name : "อัปโหลดรูปถ่าย"}
                      </span>
                    </label>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-foreground">Resume / CV</Label>
                    <label className="flex flex-col items-center justify-center w-full min-h-[140px] rounded-xl border-2 border-dashed border-border/80 hover:border-primary/50 hover:bg-muted/30 transition-all cursor-pointer p-4 group">
                      <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setFormData(f => ({ ...f, resume: e.target.files![0] }));
                        }
                      }} />
                      <Upload className="w-6 h-6 text-muted-foreground group-hover:text-primary mb-3 transition-colors" />
                      <span className="text-sm text-foreground/70 group-hover:text-primary transition-colors font-medium text-center">
                        {formData.resume ? formData.resume.name : "PDF, DOC (สูงสุด 5MB)"}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Row 7: PDPA Checkbox (Custom designed box) */}
                <div className="flex items-start gap-4 p-5 bg-[#fafafa] rounded-xl border border-[#eaeaea] mt-8 hover:border-primary/30 transition-colors">
                  <Checkbox
                    id="pdpa"
                    checked={formData.pdpa}
                    onCheckedChange={(v) => setFormData((f) => ({ ...f, pdpa: !!v }))}
                    className={`mt-1 bg-white h-5 w-5 rounded-full border-[1.5px] border-red-500 text-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500 ${errors.pdpa ? "ring-2 ring-red-500/20" : ""}`}
                  />
                  <div className="flex-1 space-y-1">
                    <Label htmlFor="pdpa" className="font-semibold text-foreground cursor-pointer text-[15px] leading-tight flex items-center">
                      ยินยอมให้เก็บรวบรวมและใช้ข้อมูลส่วนบุคคล (PDPA) <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <p className="text-muted-foreground text-[13px] leading-relaxed">
                      ข้อมูลของคุณจะถูกใช้เพื่อการสมัครงานเท่านั้น ไม่มีการเผยแพร่ต่อบุคคลที่สาม
                    </p>
                    {errors.pdpa && (
                      <p className="text-destructive text-[13px] mt-2 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" /> ตำเป็นต้องกดยินยอมก่อนทำแบบทดสอบ
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    onClick={handleSubmitForm}
                    className="w-full bg-[#111111] hover:bg-black text-white font-medium text-base h-14 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
                  >
                    ถัดไป: ทำแบบทดสอบ <ChevronRight className="w-5 h-5 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* STEP 2: QUIZ */}
          {step === "quiz" && (
            <div className="space-y-4">
              <Card className={`border-border ${timeLeft < 60 ? "border-destructive shadow-destructive/20" : "shadow-brand"}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-full text-sm">
                        ข้อที่ {currentQ + 1} / {questions.length}
                      </span>
                    </div>
                    <div className={`flex items-center gap-1.5 font-display font-bold text-lg ${timeLeft < 60 ? "text-destructive animate-pulse-soft" : "text-primary"}`}>
                      <Clock className="w-5 h-5" />
                      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                    </div>
                  </div>
                  <Progress value={((currentQ + 1) / questions.length) * 100} className="h-2" />
                </CardContent>
              </Card>

              <Card className="border-border shadow-brand-lg overflow-hidden">
                <div className="h-2 w-full gradient-primary"></div>
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <Badge className={`${getCategoryConfig(questions[currentQ].category).bg} border-0 text-sm py-1 px-3 shadow-sm`}>
                      <span className="flex items-center">
                        {getCategoryConfig(questions[currentQ].category).icon}
                        {getCategoryConfig(questions[currentQ].category).label}
                      </span>
                    </Badge>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-8 leading-relaxed">
                    {questions[currentQ].question}
                  </h3>
                  <RadioGroup
                    value={answers[currentQ] !== undefined ? String(answers[currentQ]) : ""}
                    onValueChange={(v) => handleAnswer(Number(v))}
                    className="space-y-3"
                  >
                    {questions[currentQ].options.map((opt, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${answers[currentQ] === idx
                          ? "border-primary bg-primary/5 shadow-md scale-[1.01]"
                          : "border-border hover:border-primary/30 hover:bg-secondary/20"
                          }`}
                        onClick={() => handleAnswer(idx)}
                      >
                        <RadioGroupItem value={String(idx)} id={`opt-${idx}`} className="mt-1" />
                        <Label htmlFor={`opt-${idx}`} className="cursor-pointer text-sm sm:text-base font-medium flex-1 leading-relaxed">
                          {opt}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  <div className="flex gap-3 mt-8 pt-6 border-t border-border">
                    <Button
                      variant="outline"
                      onClick={handlePrevQuestion}
                      disabled={currentQ === 0}
                      className="border-border px-6"
                    >
                      <ChevronLeft className="w-5 h-5 mr-1" /> ย้อนกลับ
                    </Button>
                    <div className="flex-1"></div>
                    <Button
                      onClick={handleNextQuestion}
                      disabled={answers[currentQ] === undefined}
                      className={`px-8 font-semibold shadow-md ${currentQ === questions.length - 1
                        ? "gradient-accent text-accent-foreground shadow-accent-glow"
                        : "gradient-primary text-primary-foreground"
                        } ${answers[currentQ] === undefined ? "opacity-50 grayscale" : ""}`}
                    >
                      {currentQ === questions.length - 1 ? "ส่งคำประเมิน" : "ถัดไป"}
                      <ChevronRight className="w-5 h-5 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* STEP 3: DONE */}
          {step === "done" && (
            <Card className="border-border shadow-brand-lg text-center overflow-hidden">
              <div className="h-3 w-full gradient-accent"></div>
              <CardContent className="p-10">
                <div className="flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mx-auto mb-6 shadow-md border-4 border-white">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  ทำแบบประเมินเสร็จสมบูรณ์ 🎉
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed text-sm">
                  ขอบคุณ <span className="font-semibold text-foreground">{formData.fullName}</span>{" "}
                  ระบบได้บันทึกผลการจำลองสถานการณ์ของคุณเรียบร้อยแล้ว HR จะพิจารณาความเหมาะสมและติดต่อกลับโดยเร็วที่สุด
                </p>

                {/* Radar Mockup for Applicant */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-purple-50 rounded-xl p-4 border border-purple-100 flex flex-col items-center">
                    <BrainCircuit className="w-8 h-8 text-purple-600 mb-2" />
                    <div className="font-bold text-purple-900 text-lg mb-1">{mbtiScore}%</div>
                    <div className="text-xs text-purple-700 text-center">ความเข้ากันได้<br />กับรูปแบบงาน</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 flex flex-col items-center">
                    <MessageSquareHeart className="w-8 h-8 text-blue-600 mb-2" />
                    <div className="font-bold text-blue-900 text-lg mb-1">{rolePlayScore}%</div>
                    <div className="text-xs text-blue-700 text-center">ทักษะการรับมือ<br />และการบริการ</div>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 flex flex-col items-center">
                    <Lightbulb className="w-8 h-8 text-amber-600 mb-2" />
                    <div className="font-bold text-amber-900 text-lg mb-1">{visionScore}%</div>
                    <div className="text-xs text-amber-700 text-center">มุมมอง &<br />Growth Mindset</div>
                  </div>
                </div>

                <Badge className={`${scoreLabel.bg} ${scoreLabel.color} px-6 py-2 text-sm border-0 font-bold mb-8 shadow-sm`}>
                  สรุปผลรวม: {scoreLabel.text} ({overallScorePercent}%)
                </Badge>

                <div className="flex flex-col gap-3 max-w-xs mx-auto">
                  <Button
                    onClick={() => { window.location.href = '/' }}
                    className="gradient-primary"
                  >
                    กลับสู่หน้าหลัก
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Apply;
