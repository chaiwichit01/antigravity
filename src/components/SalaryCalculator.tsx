import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { DollarSign, Save, CheckCircle2 } from "lucide-react";

interface SalaryCalculatorProps {
  positionKey?: string;
  onSave?: (commission: number) => void;
}

const BASE_SALARY = 14000;
const MAX_COMMISSION = 25000;

const SalaryCalculator = ({ positionKey = "default", onSave }: SalaryCalculatorProps) => {
  const storageKey = `d7_commission_${positionKey}`;
  const [commission, setCommission] = useState([0]);
  const [saved, setSaved] = useState(false);

  const total = BASE_SALARY + commission[0];

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setCommission([Number(stored)]);
    }
  }, [storageKey]);

  const handleSave = () => {
    localStorage.setItem(storageKey, String(commission[0]));
    // Also save the position key as the last saved position
    localStorage.setItem("d7_last_position", positionKey);
    setSaved(true);
    onSave?.(commission[0]);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-4 mt-4">
      {/* Base salary */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">เงินเดือนพื้นฐาน</span>
        <span className="font-bold text-foreground">
          {BASE_SALARY.toLocaleString()} บาท
        </span>
      </div>

      {/* Commission slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">คอมมิชชั่น</span>
          <span className="font-bold text-primary">
            {commission[0].toLocaleString()} บาท
          </span>
        </div>
        <Slider
          value={commission}
          onValueChange={setCommission}
          min={0}
          max={MAX_COMMISSION}
          step={500}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0</span>
          <span>25,000</span>
        </div>
      </div>

      {/* Total */}
      <div className="bg-secondary rounded-xl p-3 flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">รวมรายได้</span>
        <span className="font-display text-xl font-bold text-primary">
          {total.toLocaleString()} บาท
        </span>
      </div>

      {/* Save button */}
      <Button
        onClick={handleSave}
        className={`w-full font-semibold ${
          saved
            ? "bg-green-600 hover:bg-green-600 text-white"
            : "gradient-primary text-primary-foreground"
        }`}
      >
        {saved ? (
          <>
            <CheckCircle2 className="w-4 h-4 mr-2" /> บันทึกแล้ว!
          </>
        ) : (
          <>
            <Save className="w-4 h-4 mr-2" /> บันทึกเพื่อแสดงในหน้าสมัครงาน
          </>
        )}
      </Button>
    </div>
  );
};

export default SalaryCalculator;
