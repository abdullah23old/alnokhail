import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown, X } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedReport, setSelectedReport] = useState(0);
  const [code, setCode] = useState("");
  const [position, setPosition] = useState("");
  const [copied, setCopied] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [promotionsDropdownOpen, setPromotionsDropdownOpen] = useState(false);
  const [guidesDropdownOpen, setGuidesDropdownOpen] = useState(false);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  
  // Sandy & Paleto Report State
  const [sandyStartTime, setSandyStartTime] = useState("");
  const [sandyEndTime, setSandyEndTime] = useState("");
  const [sandyOperations, setSandyOperations] = useState("");
  const [sandyDeputy, setSandyDeputy] = useState("");
  const [sandyLeadership, setSandyLeadership] = useState("");
  const [sandyOfficers, setSandyOfficers] = useState("");
  const [sandyActiveCourses, setSandyActiveCourses] = useState("");
  const [sandyMilitaryPolice, setSandyMilitaryPolice] = useState("");
  const [sandyGuardOfficer, setSandyGuardOfficer] = useState("");
  const [sandySeinUnits, setSandySeinUnits] = useState("");
  const [sandyBaaUnits, setSandyBaaUnits] = useState("");
  const [sandySharedUnits, setSandySharedUnits] = useState("");
  const [sandyLogout, setSandyLogout] = useState("");

  const handleCopyReport = () => {
    const reportForm = document.querySelector('[data-report-form]');
    if (!reportForm) {
      toast.error("لم يتم العثور على نموذج التقرير");
      return;
    }

    let reportData = "";
    
    if (selectedReport === 1) {
      // Sandy & Paleto Report with new format
      reportData += `تم استلام مهام العمليات لمنطقة ساندي وبوليتو في تمام الساعه ${sandyStartTime || "لايوجد"} إلى في تمام الساعة ${sandyEndTime || "لايوجد"}\n\n\n`;
      reportData += `العمليات| \n`;
      reportData += ` نائب العمليات | \n`;
      reportData += `القيادات \n\n\n`;
      reportData += `—————————————————\n\n`;
      reportData += `الضباط\n\n`;
      reportData += `—————————————————\n\n`;
      reportData += `الدورات المفعلة :\n`;
      reportData += `${sandyActiveCourses || "لايوجد"}\n\n`;
      reportData += `—————————————————\n\n`;
      reportData += `الشرطة العسكرية\n`;
      reportData += `${sandyMilitaryPolice || "لايوجد"}\n\n`;
      reportData += `—————————————————\n\n`;
      reportData += `ضابط خفر :\n`;
      reportData += `${sandyGuardOfficer || "لايوجد"}\n\n\n`;
      reportData += `—————————————————\n`;
      reportData += `وحدات سين \n\n\n\n`;
      reportData += `${sandySeinUnits || "لايوجد"}\n \n\n`;
      reportData += `—————————————————\n\n\n`;
      reportData += `—————————————————\n\n\n`;
      reportData += `—————————————————\n\n`;
      reportData += `باء : ${sandyBaaUnits || "1"} \n\n\n\n\n`;
      reportData += `—————————————————\n\n\n\n\n`;
      reportData += `الوحدات المشتركة :\n`;
      reportData += `${sandySharedUnits || "لا يوجد"}\n\n`;
      reportData += `————————————————— \n\n`;
      reportData += `تسجيل خروج :\n`;
    }

    navigator.clipboard.writeText(reportData).then(() => {
      toast.success("تم نسخ التقرير بنجاح");
    }).catch(() => {
      toast.error("فشل نسخ التقرير");
    });
  };

  const handleCopyName = () => {
    if (!code || !position) {
      toast.error("الرجاء إدخال الكود والتوجيه");
      return;
    }

    const formattedName = `${position} | P-${code}`;
    
    navigator.clipboard.writeText(formattedName).then(() => {
      setCopied(true);
      toast.success("تم نسخ الاسم بنجاح");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDropdownEnter = (dropdown: string) => {
    if (dropdown === 'tables') setDropdownOpen(true);
    if (dropdown === 'promotions') setPromotionsDropdownOpen(true);
    if (dropdown === 'guides') setGuidesDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    setDropdownOpen(false);
    setPromotionsDropdownOpen(false);
    setGuidesDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-cairo" dir="rtl">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto py-4 flex items-center justify-between">
          <button onClick={() => setActiveSection("home")} className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300 cursor-pointer">
            <img src="/images/logo-header.gif" alt="مقاطعة النخيل" className="w-12 h-12 rounded-full shadow-lg shadow-primary/30" />
            <div>
              <h1 className="text-xl font-bold text-primary leading-none">مقاطعة النخيل</h1>
              <p className="text-xs text-muted-foreground mt-1">مديرية الأمن العام</p>
            </div>
          </button>
          
          <nav className="hidden md:flex items-center gap-1">
            <Button variant="ghost" className={`transition-all duration-300 ${activeSection === "home" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/10"}`} onClick={() => setActiveSection("home")}>الرئيسية</Button>
            <Button variant="ghost" className={`transition-all duration-300 ${activeSection === "wave" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/10"}`} onClick={() => setActiveSection("wave")}>تسمية الموجة</Button>
            <Button variant="ghost" className={`transition-all duration-300 ${activeSection === "reports" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/10"}`} onClick={() => setActiveSection("reports")}>التقارير</Button>
            <Button variant="ghost" className={`transition-all duration-300 ${activeSection === "protocols" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/10"}`} onClick={() => setActiveSection("protocols")}>البروتوكولات</Button>
            
            <div onMouseEnter={() => handleDropdownEnter('tables')} onMouseLeave={handleDropdownLeave}>
              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 flex items-center gap-1"
                  >
                    الجداول
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background border-primary/20">
                  <DropdownMenuItem onClick={() => { window.open('https://docs.google.com/spreadsheets/d/1sqEcGLQAv_xo7C6YrNuWq2PlEgEpsUQQnSLoKXcRdh0/edit?usp=sharing', '_blank'); handleDropdownLeave(); }} className="cursor-pointer hover:bg-primary/10 transition-all duration-200">جدول إدارة الأمن العام</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { window.open('https://docs.google.com/spreadsheets/d/1tQaDa1ovrc20X6xRKgpmmisTEzII-oXsGwNzjb-WrUs/edit?usp=sharing', '_blank'); handleDropdownLeave(); }} className="cursor-pointer hover:bg-primary/10 transition-all duration-200">أقسام الأمن العام</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { window.open('https://docs.google.com/spreadsheets/d/16bCKLGcCWqWgrFAk1yaZy3AW1UiP8o8ulixc_KzSL7E/edit?usp=sharing', '_blank'); handleDropdownLeave(); }} className="cursor-pointer hover:bg-primary/10 transition-all duration-200">مخالفات منسوبي الأمن العام</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { window.open('https://docs.google.com/spreadsheets/d/1YOKCwZXm2qU3cRnrMxRjXnVbVJ2AezvRy3Io5u7xgz0/edit?usp=sharing', '_blank'); handleDropdownLeave(); }} className="cursor-pointer hover:bg-primary/10 transition-all duration-200">المخالفات</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div onMouseEnter={() => handleDropdownEnter('promotions')} onMouseLeave={handleDropdownLeave}>
              <DropdownMenu open={promotionsDropdownOpen} onOpenChange={setPromotionsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 flex items-center gap-1"
                  >
                    الترقيات
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background border-primary/20">
                  <DropdownMenuItem onClick={() => { window.open('https://docs.google.com/spreadsheets/d/1rVYbD65AhtWK4oufsMxm41PNjeyrZQhZoYmDesOUvAM/edit?usp=sharing', '_blank'); handleDropdownLeave(); }} className="cursor-pointer hover:bg-primary/10 transition-all duration-200">شروط الترقية</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { window.open('https://docs.google.com/spreadsheets/d/1t3AbBFtx_Sm39xaHyYNk-oAjAi0LyxrGglB_tU15q8w/edit?usp=sharing', '_blank'); handleDropdownLeave(); }} className="cursor-pointer hover:bg-primary/10 transition-all duration-200">الترقيات الاستثنائية</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div onMouseEnter={() => handleDropdownEnter('guides')} onMouseLeave={handleDropdownLeave}>
              <DropdownMenu open={guidesDropdownOpen} onOpenChange={setGuidesDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 flex items-center gap-1"
                  >
                    الأدلة الشاملة
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background border-primary/20">
                  <DropdownMenuItem onClick={() => { window.open('https://drive.google.com/file/d/1jO59_IIle6Ur64EiXoKlJPunygxNJxI9/view?usp=sharing', '_blank'); handleDropdownLeave(); }} className="cursor-pointer hover:bg-primary/10 transition-all duration-200">الدليل الشامل لإدارة الأمن العام</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { window.open('https://drive.google.com/file/d/1ka3XDb2CsPicChDbLWMIOqG618-kK1l_/view?usp=sharing', '_blank'); handleDropdownLeave(); }} className="cursor-pointer hover:bg-primary/10 transition-all duration-200">الدليل الشامل لقوات أمن الطرق</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Button variant="ghost" className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300" onClick={() => window.open('https://discord.com/channels/1399408243637227746/1442030235154645244', '_blank')}>تعاميم الأمن العام</Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300" onClick={() => window.open('https://discord.com/channels/1399408243637227746/1442030235154645244', '_blank')}>الأنظمة والقوانين</Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8">
        {activeSection === "reports" && (
          <div className="space-y-6">
            <div className="flex gap-4 flex-wrap">
              {["تقرير ساندي وبوليتو"].map((name, idx) => (
                <Button
                  key={idx}
                  onClick={() => setSelectedReport(1)}
                  className={`transition-all duration-300 ${selectedReport === 1 ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
                >
                  {name}
                </Button>
              ))}
            </div>

            {selectedReport === 1 && (
              <div className="bg-secondary/20 border border-primary/20 rounded-lg p-6 space-y-4" data-report-form>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">وقت البداية</label>
                    <Input 
                      type="time" 
                      value={sandyStartTime}
                      onChange={(e) => setSandyStartTime(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">وقت النهاية</label>
                    <Input 
                      type="time"
                      value={sandyEndTime}
                      onChange={(e) => setSandyEndTime(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">الدورات المفعلة</label>
                  <Textarea 
                    value={sandyActiveCourses}
                    onChange={(e) => setSandyActiveCourses(e.target.value)}
                    className="mt-1"
                    placeholder="أدخل الدورات المفعلة"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">الشرطة العسكرية</label>
                  <Textarea 
                    value={sandyMilitaryPolice}
                    onChange={(e) => setSandyMilitaryPolice(e.target.value)}
                    className="mt-1"
                    placeholder="أدخل بيانات الشرطة العسكرية"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">ضابط خفر</label>
                  <Textarea 
                    value={sandyGuardOfficer}
                    onChange={(e) => setSandyGuardOfficer(e.target.value)}
                    className="mt-1"
                    placeholder="أدخل بيانات ضابط خفر"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">وحدات سين</label>
                  <Textarea 
                    value={sandySeinUnits}
                    onChange={(e) => setSandySeinUnits(e.target.value)}
                    className="mt-1"
                    placeholder="أدخل وحدات سين"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">باء</label>
                  <Input 
                    value={sandyBaaUnits}
                    onChange={(e) => setSandyBaaUnits(e.target.value)}
                    className="mt-1"
                    placeholder="أدخل عدد وحدات باء"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">الوحدات المشتركة</label>
                  <Textarea 
                    value={sandySharedUnits}
                    onChange={(e) => setSandySharedUnits(e.target.value)}
                    className="mt-1"
                    placeholder="أدخل الوحدات المشتركة"
                  />
                </div>

                <Button onClick={handleCopyReport} className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg shadow-lg shadow-primary/10 transition-all duration-300 hover:scale-105 active:scale-95">
                  نسخ التقرير
                </Button>
              </div>
            )}
          </div>
        )}

        {activeSection === "wave" && (
          <div className="bg-secondary/20 border border-primary/20 rounded-lg p-6 space-y-4 max-w-md">
            <h2 className="text-2xl font-bold text-primary">تسمية الموجة</h2>
            <div>
              <label className="text-sm font-medium">الكود</label>
              <Input 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="أدخل الكود"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">التوجيه</label>
              <Input 
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="أدخل التوجيه"
                className="mt-1"
              />
            </div>
            <Button onClick={handleCopyName} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              {copied ? "تم النسخ ✓" : "نسخ الاسم"}
            </Button>
          </div>
        )}

        {activeSection === "home" && (
          <div className="text-center space-y-6">
            <h2 className="text-4xl font-bold text-primary">مرحباً بك في مقاطعة النخيل</h2>
            <p className="text-muted-foreground text-lg">استخدم القائمة أعلاه للتنقل بين الأقسام المختلفة</p>
          </div>
        )}
      </main>

      {/* Map Modal */}
      {mapModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setMapModalOpen(false)}>
          <div className="bg-background rounded-lg p-6 max-w-2xl w-full mx-4 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setMapModalOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-6 h-6" />
            </button>
            <img src="/images/map.png" alt="خريطة المدينة" className="w-full rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
}
