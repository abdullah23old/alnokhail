import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Radio, FileText, Users, AlertTriangle, Copy, Check, Menu, ExternalLink, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";

export default function Home() {
  // The userAuth hooks provides authentication state
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [code, setCode] = useState("");
  const [position, setPosition] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [promotionsDropdownOpen, setPromotionsDropdownOpen] = useState(false);
  const [guidesDropdownOpen, setGuidesDropdownOpen] = useState(false);
  const [losSantosData, setLosSantosData] = useState<any>({});
  const [sandyData, setSandyData] = useState<any>({});
  const [officersData, setOfficersData] = useState<any>({});
  const [zoneOfficerData, setZoneOfficerData] = useState<any>({});
  const [mapModalOpen, setMapModalOpen] = useState(false);

  const handleDropdownEnter = (dropdownName: string) => {
    setDropdownOpen(dropdownName === 'tables');
    setPromotionsDropdownOpen(dropdownName === 'promotions');
    setGuidesDropdownOpen(dropdownName === 'guides');
  };

  const handleDropdownLeave = () => {
    setDropdownOpen(false);
    setPromotionsDropdownOpen(false);
    setGuidesDropdownOpen(false);
  };

  const handleTextareaChange = (e: any) => {
    // Allow any text without formatting
  };

  const handleTextareaChangeNoFormat = (e: any) => {
    // Allow any text without formatting
  };

  const updateReportData = (reportType: number, field: string, value: string) => {
    if (reportType === 0) {
      setLosSantosData({ ...losSantosData, [field]: value });
    } else if (reportType === 1) {
      setSandyData({ ...sandyData, [field]: value });
    } else if (reportType === 2) {
      setOfficersData({ ...officersData, [field]: value });
    } else if (reportType === 3) {
      setZoneOfficerData({ ...zoneOfficerData, [field]: value });
    }
  };

  const getReportFieldValue = (field: string) => {
    if (selectedReport === 0) return losSantosData[field] || "";
    if (selectedReport === 1) return sandyData[field] || "";
    if (selectedReport === 2) return officersData[field] || "";
    if (selectedReport === 3) return zoneOfficerData[field] || "";
    return "";
  };

  const handleCopyReport = () => {
    const reportForm = document.querySelector('[data-report-form]');
    if (!reportForm) {
      toast.error("لم يتم العثور على نموذج التقرير");
      return;
    }

    const inputs = reportForm.querySelectorAll('input');
    const selects = reportForm.querySelectorAll('select');
    const textareas = reportForm.querySelectorAll('textarea');
    let reportData = "";

    if (selectedReport === 1) {
      // Sandy & Paleto Report - Exact Requested Format
      const startTime = inputs[0]?.value || "لايوجد";
      const endTime = inputs[1]?.value || "لايوجد";
      const operations = inputs[2]?.value || "";
      const deputy = inputs[3]?.value || "";
      
      const leadership = textareas[0]?.value || "لايوجد";
      const officers = textareas[1]?.value || "لايوجد";
      const activeCourses = textareas[2]?.value || "لايوجد";
      const militaryPolice = textareas[3]?.value || "لايوجد";
      const guardOfficer = textareas[4]?.value || "لايوجد";
      const seinUnits = textareas[5]?.value || "لايوجد";
      const baaUnits = textareas[6]?.value || "1";
      const sharedUnits = textareas[7]?.value || "لا يوجد";
      const logoutInfo = textareas[8]?.value || "";

      reportData += `تم استلام مهام العمليات لمنطقة ساندي وبوليتو في تمام الساعه ${startTime} إلى في تمام الساعة ${endTime}\n\n\n`;
      reportData += `العمليات| ${operations}\n`;
      reportData += ` نائب العمليات | ${deputy}\n`;
      reportData += `القيادات \n${leadership}\n\n`;
      reportData += `—————————————————\n\n`;
      reportData += `الضباط\n${officers}\n`;
      reportData += `—————————————————\n\n`;
      reportData += `الدورات المفعلة :\n${activeCourses}\n\n`;
      reportData += `—————————————————\n\n`;
      reportData += `الشرطة العسكرية\n${militaryPolice}\n\n`;
      reportData += `—————————————————\n\n`;
      reportData += `ضابط خفر :\n${guardOfficer}\n\n\n`;
      reportData += `—————————————————\n`;
      reportData += `وحدات سين \n\n\n`;
      reportData += `${seinUnits}\n \n\n`;
      reportData += `—————————————————\n\n\n`;
      reportData += `—————————————————\n\n\n`;
      reportData += `—————————————————\n\n`;
      reportData += `باء : ${baaUnits} \n\n\n\n\n`;
      reportData += `—————————————————\n\n\n\n\n`;
      reportData += `الوحدات المشتركة :\n${sharedUnits}\n\n`;
      reportData += `————————————————— \n\n`;
      reportData += `تسجيل خروج :\n${logoutInfo}`;
    } else {
      reportData += `نوع التقرير: ${["تقرير لوس سانتوس", "تقرير ساندي وبوليتو", "تقرير الضباط", "تقرير ضابط منطقة"][selectedReport]}\n`;
      reportData += `وقت البداية: ${inputs[0]?.value || "لا يوجد"}\n`;
      reportData += `وقت النهاية: ${inputs[1]?.value || "لا يوجد"}\n`;

      if (selectedReport === 0) {
        // Los Santos Report
        reportData += `العمليات: ${inputs[2]?.value || "لا يوجد"}\n`;
        reportData += `نائب العمليات: ${inputs[3]?.value || "لا يوجد"}\n`;
        reportData += "\n--- الدورات المفعلة ---\n";
        const losLosLabels = ["القيادات", "الضباط", "الدورات المفعلة", "الشرطة العسكرية", "ضابط خفر", "جيم 1", "جيم 2", "جيم 3", "جيم 4", "جيم 5", "عين 1", "سير 1"];
        textareas.forEach((textarea: any, index: number) => {
          if (index < losLosLabels.length) {
            const value = textarea.value || "لا يوجد";
            reportData += `${losLosLabels[index]}: ${value}\n`;
          }
        });
        reportData += `\nتسجيل الخروج: ${textareas[textareas.length - 1]?.value || "لا يوجد"}\n`;
      } else if (selectedReport === 2) {
        // Officers Report
        reportData += `الضابط: ${inputs[2]?.value || "لا يوجد"}\n`;
        reportData += `المنطقة: ${selects[0]?.value || "لا يوجد"}\n`;
        reportData += `رقم المهمة: ${textareas[0]?.value || "لا يوجد"}\n`;
        reportData += `الجهات الأمنية المتواجدة: ${textareas[1]?.value || "لا يوجد"}\n`;
        reportData += `ملاحظة إيجابية: ${textareas[2]?.value || "لا يوجد"}\n`;
        reportData += `ملاحظة سلبية: ${textareas[3]?.value || "لا يوجد"}\n`;
      } else if (selectedReport === 3) {
        // Zone Officer Report
        reportData += `رئيس رقباء: ${inputs[2]?.value || "لا يوجد"}\n`;
        reportData += `المنطقة: ${selects[0]?.value || "لا يوجد"}\n`;
        reportData += `رقم المهمة: ${textareas[0]?.value || "لا يوجد"}\n`;
        reportData += `الوحدات التابعة للمنطقة: ${textareas[1]?.value || "لا يوجد"}\n`;
        reportData += `عدد الوحدات عند الاستلام: ${textareas[2]?.value || "لا يوجد"}\n`;
        reportData += `عدد الوحدات عند الانتهاء: ${textareas[3]?.value || "لا يوجد"}\n`;
        reportData += `ملاحظة إيجابية: ${textareas[4]?.value || "لا يوجد"}\n`;
        reportData += `ملاحظة سلبية: ${textareas[5]?.value || "لا يوجد"}\n`;
        reportData += `وقت الشفت: ${selects[1]?.value || "لا يوجد"}\n`;
      }
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
                  <Button variant="ghost" className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 flex items-center gap-1">
                    الجداول
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background border-primary/20">
                  <DropdownMenuItem onClick={() => { window.open('https://docs.google.com/spreadsheets/d/1sqEcGLQAv_xo7C6YrNuWq2PlEgEpsUQQnSLoKXcRdh0/edit?usp=sharing', '_blank'); handleDropdownLeave(); }} className="cursor-pointer hover:bg-primary/10 transition-all duration-200">
                    <FileText className="w-4 h-4 ml-2" />
                    جدول إدارة الأمن العام
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { window.open('https://docs.google.com/spreadsheets/d/1tQaDa1ovrc20X6xRKgpmmisTEzII-oXsGwNzjb-WrUs/edit?usp=sharing', '_blank'); handleDropdownLeave(); }} className="cursor-pointer hover:bg-primary/10 transition-all duration-200">
                    <FileText className="w-4 h-4 ml-2" />
                    أقسام الأمن العام
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { window.open('https://docs.google.com/spreadsheets/d/16bCKLGcCWqWgrFAk1yaZy3AW1UiP8o8ulixc_KzSL7E/edit?usp=sharing', '_blank'); handleDropdownLeave(); }} className="cursor-pointer hover:bg-primary/10 transition-all duration-200">
                    <AlertTriangle className="w-4 h-4 ml-2" />
                    مخالفات منسوبي الأمن العام
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { window.open('https://docs.google.com/spreadsheets/d/1YOKCwZXm2qU3cRnrMxRjXnVbVJ2AezvRy3Io5u7xgz0/edit?usp=sharing', '_blank'); handleDropdownLeave(); }} className="cursor-pointer hover:bg-primary/10 transition-all duration-200">
                    <AlertTriangle className="w-4 h-4 ml-2" />
                    المخالفات
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div onMouseEnter={() => handleDropdownEnter('promotions')} onMouseLeave={handleDropdownLeave}>
              <DropdownMenu open={promotionsDropdownOpen} onOpenChange={setPromotionsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 flex items-center gap-1">
                    الترقيات
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background border-primary/20">
                  <DropdownMenuItem onClick={() => { window.open('https://docs.google.com/spreadsheets/d/1rVYbD65AhtWK4oufsMxm41PNjeyrZQhZoYmDesOUvAM/edit?usp=sharing', '_blank'); handleDropdownLeave(); }} className="cursor-pointer hover:bg-primary/10 transition-all duration-200">
                    <FileText className="w-4 h-4 ml-2" />
                    شروط الترقية
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { window.open('https://docs.google.com/spreadsheets/d/1t3AbBFtx_Sm39xaHyYNk-oAjAi0LyxrGglB_tU15q8w/edit?usp=sharing', '_blank'); handleDropdownLeave(); }} className="cursor-pointer hover:bg-primary/10 transition-all duration-200">
                    <FileText className="w-4 h-4 ml-2" />
                    الترقيات الاستثنائية
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div onMouseEnter={() => handleDropdownEnter('guides')} onMouseLeave={handleDropdownLeave}>
              <DropdownMenu open={guidesDropdownOpen} onOpenChange={setGuidesDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 flex items-center gap-1">
                    الأدلة الشاملة
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background border-primary/20">
                  <DropdownMenuItem onClick={() => { window.open('https://drive.google.com/file/d/1jO59_IIle6Ur64EiXoKlJPunygxNJxI9/view?usp=sharing', '_blank'); handleDropdownLeave(); }} className="cursor-pointer hover:bg-primary/10 transition-all duration-200">
                    <FileText className="w-4 h-4 ml-2" />
                    الدليل الشامل لإدارة الأمن العام
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { window.open('https://drive.google.com/file/d/1ka3XDb2CsPicChDbLWMIOqG618-kK1l_/view?usp=sharing', '_blank'); handleDropdownLeave(); }} className="cursor-pointer hover:bg-primary/10 transition-all duration-200">
                    <FileText className="w-4 h-4 ml-2" />
                    الدليل الشامل لقوات أمن الطرق
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Button variant="ghost" className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300" onClick={() => window.open('https://discord.com/channels/1399408243637227746/1427731991201316925', '_blank')}>
              تعاميم الأمن العام
            </Button>
          </nav>
          
          <Button variant="outline" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 border-b border-border/40 animate-fade-in">
          <div className="container mx-auto py-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10" onClick={() => { setActiveSection("home"); setMobileMenuOpen(false); }}>الرئيسية</Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10" onClick={() => { setActiveSection("wave"); setMobileMenuOpen(false); }}>تسمية الموجة</Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10" onClick={() => { setActiveSection("reports"); setMobileMenuOpen(false); }}>التقارير</Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10" onClick={() => { setActiveSection("protocols"); setMobileMenuOpen(false); }}>البروتوكولات</Button>
          </div>
        </div>
      )}

      <main className="container mx-auto py-8 space-y-8">
        {/* Hero Section */}
        {activeSection === "home" && (
        <section className="text-center py-12 relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-b from-primary/5 to-transparent animate-fade-in">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
          <div className="relative z-10">
            <button onClick={() => setActiveSection("home")} className="inline-block hover:scale-110 transition-transform duration-300 cursor-pointer">
              <img src="/images/logo.png" alt="مقاطعة النخيل" className="w-24 h-24 mx-auto mb-6 rounded-full shadow-[0_0_30px_rgba(212,175,55,0.3)] animate-glow" />
            </button>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 drop-shadow-lg">مديرية الأمن العام</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">في خدمة الوطن والمواطن - مقاطعة النخيل</p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105 active:scale-95" onClick={() => setActiveSection("reports")}>
                <FileText className="ml-2 w-5 h-5" />
                إنشاء تقرير جديد
              </Button>
              <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105 active:scale-95" onClick={() => window.open('https://discord.com/channels/1399408243637227746/1442030235154645244', '_blank')}>
                <Shield className="ml-2 w-5 h-5" />
                الأنظمة والقوانين
              </Button>
            </div>
          </div>
        </section>
        )}

        {/* Wave Naming Section */}
        {(activeSection === "home" || activeSection === "wave") && (
        <section className="grid md:grid-cols-12 gap-6 animate-fade-in">
          <Card className="md:col-span-12 glass border-primary/20 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/30">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Radio className="w-5 h-5" />
                تسمية الموجة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-12 gap-6 items-end">
                <div className="md:col-span-4 space-y-2">
                  <Label htmlFor="position" className="text-muted-foreground">التوجيه</Label>
                  <Input 
                    id="position" 
                    placeholder="مثال: جيم 1" 
                    className="bg-background/50 border-primary/20 focus:border-primary transition-all duration-300"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </div>
                <div className="md:col-span-4 space-y-2">
                  <Label htmlFor="code" className="text-muted-foreground">رقم الكود</Label>
                  <div className="relative">
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">P-</span>
                    <Input 
                      id="code" 
                      placeholder="000" 
                      className="pr-8 font-mono bg-background/50 border-primary/20 focus:border-primary transition-all duration-300"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                </div>
                <div className="md:col-span-4">
                  <Button 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold transition-all duration-300 hover:scale-105 active:scale-95"
                    onClick={handleCopyName}
                  >
                    {copied ? <Check className="ml-2 w-5 h-5 animate-pulse" /> : <Copy className="ml-2 w-5 h-5" />}
                    {copied ? "تم النسخ!" : "إنشاء الاسم ونسخ"}
                  </Button>
                </div>
              </div>
              {(code || position) && (
                <div className="mt-6 p-4 rounded-lg bg-background/30 border border-dashed border-primary/30 flex items-center justify-between animate-fade-in">
                  <span className="text-sm text-muted-foreground">المعاينة:</span>
                  <code className="font-mono text-lg text-primary font-bold dir-ltr">
                    {position || "التوجيه"} | P-{code || "000"}
                  </code>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
        )}

        {/* Reports Section */}
        {(activeSection === "home" || activeSection === "reports") && (
        <section className="animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">إنشاء التقارير</h3>
          </div>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            {["تقرير لوس سانتوس", "تقرير ساندي وبوليتو", "تقرير الضباط", "تقرير ضابط منطقة"].map((report, i) => (
              <Button 
                key={i} 
                onClick={() => setSelectedReport(i)}
                variant={selectedReport === i ? "default" : "outline"} 
                className={`h-12 transition-all duration-300 hover:scale-105 active:scale-95 ${selectedReport === i ? "bg-primary text-primary-foreground" : "border-primary/30 hover:border-primary hover:bg-primary/5"}`}
              >
                {report}
              </Button>
            ))}
          </div>
          <Card className="glass border-primary/10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30">
            <CardContent className="p-6 space-y-6" data-report-form>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">وقت البداية</Label>
                  <Input placeholder="2:00 م" className="bg-background/50 border-primary/10 transition-all duration-300" value={selectedReport === 0 ? losSantosData.startTime || "" : selectedReport === 1 ? sandyData.startTime || "" : selectedReport === 2 ? officersData.startTime || "" : zoneOfficerData.startTime || ""} onChange={(e) => updateReportData(selectedReport, 'startTime', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">وقت النهاية</Label>
                  <Input placeholder="4:00 م" className="bg-background/50 border-primary/10 transition-all duration-300" value={selectedReport === 0 ? losSantosData.endTime || "" : selectedReport === 1 ? sandyData.endTime || "" : selectedReport === 2 ? officersData.endTime || "" : zoneOfficerData.endTime || ""} onChange={(e) => updateReportData(selectedReport, 'endTime', e.target.value)} />
                </div>
                
                {selectedReport === 0 && (
                  <div className="col-span-full space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs text-primary/80">العمليات (Discord ID)</Label>
                        <input type="text" placeholder="Discord ID" className="w-full px-3 py-2 bg-background/50 border border-primary/10 rounded-md font-mono text-sm transition-all duration-300" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-primary/80">نائب العمليات (Discord ID)</Label>
                        <input type="text" placeholder="Discord ID" className="w-full px-3 py-2 bg-background/50 border border-primary/10 rounded-md font-mono text-sm transition-all duration-300" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {["القيادات", "الضباط", "الدورات المفعلة", "الشرطة العسكرية", "ضابط خفر", "جيم 1", "جيم 2", "جيم 3", "جيم 4", "جيم 5", "عين 1", "سير 1"].map((label, i) => (
                        <div key={i} className="space-y-2">
                          <Label className="text-xs text-primary/80">{label}</Label>
                          <Textarea placeholder="..." onChange={handleTextareaChangeNoFormat} className="min-h-[80px] bg-background/50 border-primary/10 font-mono text-sm resize-none transition-all duration-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedReport === 1 && (
                  <div className="col-span-full space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs text-primary/80">العمليات (Discord ID)</Label>
                        <input type="text" placeholder="Discord ID" className="w-full px-3 py-2 bg-background/50 border border-primary/10 rounded-md font-mono text-sm transition-all duration-300" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-primary/80">نائب العمليات (Discord ID)</Label>
                        <input type="text" placeholder="Discord ID" className="w-full px-3 py-2 bg-background/50 border border-primary/10 rounded-md font-mono text-sm transition-all duration-300" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {["القيادات", "الضباط", "الدورات المفعلة", "الشرطة العسكرية", "ضابط خفر", "وحدات سين", "باء", "الوحدات المشتركة"].map((label, i) => (
                        <div key={i} className="space-y-2">
                          <Label className="text-xs text-primary/80">{label}</Label>
                          <Textarea placeholder="..." onChange={handleTextareaChangeNoFormat} className="min-h-[80px] bg-background/50 border-primary/10 font-mono text-sm resize-none transition-all duration-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedReport === 2 && (
                  <div className="col-span-full space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs text-primary/80">الضابط (Discord ID)</Label>
                        <input type="text" placeholder="Discord ID" className="w-full px-3 py-2 bg-background/50 border border-primary/10 rounded-md font-mono text-sm transition-all duration-300" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-primary/80">المنطقة</Label>
                        <select className="w-full px-3 py-2 bg-background/50 border border-primary/10 rounded-md font-mono text-sm transition-all duration-300">
                          <option>اختر المنطقة</option>
                          <option>لوس سانتوس</option>
                          <option>ساندي وبليتو</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs text-primary/80">رقم المهمة</Label>
                        <Textarea placeholder="..." onChange={handleTextareaChangeNoFormat} className="min-h-[80px] bg-background/50 border-primary/10 font-mono text-sm resize-none transition-all duration-300" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-primary/80">الجهات الأمنية المتواجدة</Label>
                        <Textarea placeholder="..." onChange={handleTextareaChangeNoFormat} className="min-h-[80px] bg-background/50 border-primary/10 font-mono text-sm resize-none transition-all duration-300" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-primary/80">ملاحظة إيجابية</Label>
                        <Textarea placeholder="..." onChange={handleTextareaChangeNoFormat} className="min-h-[80px] bg-background/50 border-primary/10 font-mono text-sm resize-none transition-all duration-300" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-primary/80">ملاحظة سلبية</Label>
                        <Textarea placeholder="..." onChange={handleTextareaChangeNoFormat} className="min-h-[80px] bg-background/50 border-primary/10 font-mono text-sm resize-none transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                )}

                {selectedReport === 3 && (
                  <div className="col-span-full space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs text-primary/80">رئيس رقباء (Discord ID)</Label>
                        <input type="text" placeholder="Discord ID" className="w-full px-3 py-2 bg-background/50 border border-primary/10 rounded-md font-mono text-sm transition-all duration-300" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-primary/80">المنطقة</Label>
                        <select className="w-full px-3 py-2 bg-background/50 border border-primary/10 rounded-md font-mono text-sm transition-all duration-300">
                          <option>اختر المنطقة</option>
                          <option>لوس سانتوس</option>
                          <option>ساندي وبليتو</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs text-primary/80">رقم المهمة</Label>
                        <Textarea placeholder="..." onChange={handleTextareaChangeNoFormat} className="min-h-[80px] bg-background/50 border-primary/10 font-mono text-sm resize-none transition-all duration-300" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-primary/80">الوحدات التابعة للمنطقة</Label>
                        <Textarea placeholder="..." onChange={handleTextareaChangeNoFormat} className="min-h-[80px] bg-background/50 border-primary/10 font-mono text-sm resize-none transition-all duration-300" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-primary/80">عدد الوحدات عند الاستلام</Label>
                        <Textarea placeholder="..." onChange={handleTextareaChangeNoFormat} className="min-h-[80px] bg-background/50 border-primary/10 font-mono text-sm resize-none transition-all duration-300" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-primary/80">عدد الوحدات عند الانتهاء</Label>
                        <Textarea placeholder="..." onChange={handleTextareaChangeNoFormat} className="min-h-[80px] bg-background/50 border-primary/10 font-mono text-sm resize-none transition-all duration-300" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-primary/80">ملاحظة إيجابية</Label>
                        <Textarea placeholder="..." onChange={handleTextareaChangeNoFormat} className="min-h-[80px] bg-background/50 border-primary/10 font-mono text-sm resize-none transition-all duration-300" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-primary/80">ملاحظة سلبية</Label>
                        <Textarea placeholder="..." onChange={handleTextareaChangeNoFormat} className="min-h-[80px] bg-background/50 border-primary/10 font-mono text-sm resize-none transition-all duration-300" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-primary/80">وقت الشفت</Label>
                      <select className="w-full px-3 py-2 bg-background/50 border border-primary/10 rounded-md font-mono text-sm transition-all duration-300">
                        <option>اختر وقت الشفت</option>
                        <option>صباحا</option>
                        <option>مساء</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
              
              {selectedReport !== 2 && selectedReport !== 3 && (
              <div className="space-y-2">
                <Label className="text-muted-foreground">تسجيل الخروج</Label>
                <Textarea placeholder="..." className="min-h-[100px] bg-background/50 border-primary/10 transition-all duration-300" />
              </div>
              )}
              
              <Button onClick={handleCopyReport} className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg shadow-lg shadow-primary/10 transition-all duration-300 hover:scale-105 active:scale-95">
                <Copy className="ml-2 w-5 h-5" />
                إنشاء التقرير وحفظه (نسخ)
              </Button>
            </CardContent>
          </Card>
        </section>
        )}

        {/* Info Grid */}
        {(activeSection === "home" || activeSection === "protocols") && (
        <div className="space-y-8 animate-fade-in">
          <Card className="glass border-primary/10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30">
            <CardHeader>
              <CardTitle className="text-primary text-center text-2xl">خريطة المدينة المعتمدة</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/50" onClick={() => setMapModalOpen(true)}>
                <img src="/images/city-map.png" alt="خريطة المدينة المعتمدة" className="max-w-full h-auto rounded-lg shadow-lg" />
              </div>
            </CardContent>
          </Card>
          <div className="grid md:grid-cols-2 gap-8">
          <Card className="glass border-primary/10 h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <AlertTriangle className="w-5 h-5" />
                الأكواد والبروتوكولات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { code: "أ", desc: "الموقع آمن", color: "text-green-400" },
                { code: "ن", desc: "تمشيط الموقع", color: "text-blue-400" },
                { code: "م", desc: "مطاردة", color: "text-yellow-400" },
                { code: "ل", desc: "إطلاق نار", color: "text-red-400" },
                { code: "هـ", desc: "تهديد مواطن / رجل أمن", color: "text-orange-400" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-md bg-background/40 border border-primary/5 hover:border-primary/20 transition-all duration-300 hover:bg-background/60">
                  <span className="text-muted-foreground font-medium">{item.desc}</span>
                  <span className={`font-bold font-mono ${item.color}`}>حالة {item.code}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="glass border-primary/10 h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Radio className="w-5 h-5" />
                الموجات المعتمدة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { num: "1", desc: "الأمن الدبلوماسي – لوس سانتوس" },
                { num: "2", desc: "الأمن الدبلوماسي – ساندي وباليتو" },
                { num: "4", desc: "الأمن العام – لوس سانتوس" },
                { num: "5", desc: "الأمن العام – ساندي وباليتو" },
                { num: "7", desc: "أمن الطرق" },
                { num: "13", desc: "الهلال الأحمر - لوس سانتوس" },
                { num: "14", desc: "الهلال الأحمر - ساندي وبوليتو" },
                { num: "18", desc: "كراج الميكانيكي" },
              ].map((wave, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-md bg-background/40 border border-primary/5 hover:border-primary/20 transition-all duration-300 hover:bg-background/60">
                  <span className="text-muted-foreground">{wave.desc}</span>
                  <span className="font-bold text-primary">موجة {wave.num}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        </div>
        )}

        {/* Discord Section */}
        {activeSection === "home" && (
        <section className="text-center py-12 rounded-3xl border border-primary/20 bg-gradient-to-b from-primary/5 to-transparent animate-fade-in">
          <h3 className="text-3xl font-bold text-primary mb-4">انضم لديسكورد المدينة</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">تواصل مع زملائك وكن على اطلاع بآخر المستجدات والتعاميم الرسمية</p>
          <a href="https://discord.gg/wjvgu9Za" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95">
              <ExternalLink className="ml-2 w-5 h-5" />
              https://discord.gg/wjvgu9Za
            </Button>
          </a>
        </section>
        )}
      </main>
      
      <footer className="border-t border-border/40 bg-background/80 backdrop-blur-md py-8 mt-12">
        <div className="container mx-auto text-center space-y-4">
          <button onClick={() => setActiveSection("home")} className="flex items-center justify-center gap-2 opacity-80 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
            <img src="/images/logo.png" alt="مقاطعة النخيل" className="w-8 h-8 rounded-full" />
            <span className="font-bold text-lg text-primary">مقاطعة النخيل</span>
          </button>
          <p className="text-sm text-muted-foreground">جميع الحقوق محفوظة © 2026 مديرية الأمن العام - مقاطعة النخيل</p>
        </div>
      </footer>

      {/* Map Modal */}
      {mapModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setMapModalOpen(false)}>
          <div className="relative max-w-4xl max-h-[90vh] bg-background rounded-2xl border border-primary/30 shadow-2xl shadow-primary/50 overflow-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setMapModalOpen(false)} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-primary/20 hover:bg-primary/40 transition-all duration-300">
              <span className="text-2xl text-primary">×</span>
            </button>
            <img src="/images/city-map.png" alt="خريطة المدينة المعتمدة مكبرة" className="w-full h-auto" />
          </div>
        </div>
      )}
    </div>
  );
}
