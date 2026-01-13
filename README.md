# مقاطعة النخيل - نظام إدارة تقارير الشرطة

<div dir="rtl">

## نظرة عامة

**مقاطعة النخيل** هو نظام إدارة تقارير شرطة متكامل مصمم خصيصاً لخوادم ألعاب الأدوار (RP Gaming Servers). يوفر النظام واجهة عربية كاملة مع تصميم مستقبلي مستوحى من أنظمة القيادة والتحكم.

## المميزات الرئيسية

### 🎯 تسمية الموجة
- إنشاء أسماء موجات مع بادئة P- تلقائياً
- نسخ فوري للحافظة
- حفظ الموجات المعتمدة في قاعدة البيانات

### 📝 نظام التقارير المتقدم
يدعم 4 أنواع من التقارير:
1. **تقرير لوس سانتوس** - تقرير شامل للعمليات في المدينة الرئيسية
2. **تقرير ساندي وبوليتو** - تقرير للمناطق الشمالية
3. **تقرير الضباط** - تقارير فردية للضباط
4. **تقرير ضابط منطقة** - تقارير خاصة بضباط المناطق

### 🔐 نظام المصادقة والأمان
- تسجيل دخول آمن عبر OAuth
- حماية البيانات وإدارة الجلسات
- التحقق من ملكية البيانات

### 📊 البروتوكولات والأكواد
- عرض الأكواد الأمنية (حالة أ، ن، م، ل، هـ)
- خريطة المدينة المعتمدة
- قائمة الموجات المعتمدة

### ☁️ التخزين السحابي
- رفع الملفات إلى AWS S3
- إدارة المرفقات
- حذف آمن للملفات

## التقنيات المستخدمة

### Frontend
- ⚛️ React 19 + TypeScript
- ⚡ Vite 7
- 🎨 TailwindCSS 4
- 🧩 Radix UI + shadcn/ui
- 🔄 TanStack Query
- 📋 React Hook Form + Zod

### Backend
- 🟢 Node.js 22
- 🚂 Express.js
- 🔌 tRPC 11
- 🗄️ Drizzle ORM + MySQL/TiDB
- 🔐 OAuth Authentication
- ☁️ AWS S3 Storage

### Development Tools
- 📦 pnpm
- 🧪 Vitest
- 🔧 TypeScript
- 🎯 ESBuild

## التصميم

**النمط:** Cyberpunk / Futuristic Command Center

**الألوان:**
- 🌑 خلفية: Navy Blue الداكن (#0f172a)
- ✨ اللون الأساسي: ذهبي/كهرماني (#d4af37)
- 🚦 ألوان الحالة: أخضر نيون (آمن)، أحمر (خطر)، أزرق (دورية)

**الخصائص:**
- ✅ دعم كامل للغة العربية (RTL)
- 🌙 تصميم مظلم (Dark Mode)
- 📱 استجابة كاملة للجوال
- 💎 تأثيرات Glassmorphism
- ⚡ حدود متوهجة وتأثيرات تقنية

## التثبيت والتشغيل

### المتطلبات
- Node.js 22+
- pnpm
- MySQL/TiDB (اختياري)

### التثبيت

```bash
# تثبيت الحزم
pnpm install
```

### إعداد متغيرات البيئة

أنشئ ملف `.env` في المجلد الرئيسي:

```env
# OAuth Configuration
VITE_OAUTH_PORTAL_URL=https://oauth.manus.computer
VITE_APP_ID=your-app-id
OAUTH_SERVER_URL=https://oauth.manus.computer

# Database Configuration (Optional)
DATABASE_URL=mysql://user:password@localhost:3306/alnokhail

# AWS S3 Configuration (Optional)
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_REGION=your-region
AWS_S3_BUCKET=your-bucket

# Server Configuration
PORT=3000
```

### وضع التطوير

```bash
pnpm dev
```

الموقع سيعمل على: `http://localhost:3000`

### البناء والإنتاج

```bash
# بناء المشروع
pnpm build

# تشغيل النسخة المبنية
pnpm start
```

### الاختبارات

```bash
# تشغيل الاختبارات
pnpm test

# فحص الأنواع
pnpm check
```

## بنية المشروع

```
alnokhail/
├── client/                 # الواجهة الأمامية
│   ├── src/
│   │   ├── components/    # المكونات
│   │   │   ├── ui/       # مكونات واجهة المستخدم
│   │   │   ├── Map.tsx   # خريطة المدينة
│   │   │   └── ...
│   │   ├── pages/         # الصفحات
│   │   │   ├── Home.tsx  # الصفحة الرئيسية
│   │   │   └── ...
│   │   ├── contexts/      # السياقات
│   │   ├── hooks/         # الخطافات
│   │   └── const.ts       # الثوابت
│   ├── public/            # الملفات العامة
│   │   └── images/        # الصور والشعارات
│   └── index.html
├── server/                # الخادم
│   ├── _core/            # نواة الخادم
│   │   ├── index.ts      # نقطة الدخول
│   │   ├── oauth.ts      # نظام المصادقة
│   │   └── vite.ts       # إعدادات Vite
│   └── routers/          # موجهات API
│       └── index.ts      # موجهات tRPC
├── shared/               # الكود المشترك
│   └── const.ts          # الثوابت المشتركة
├── drizzle/             # ملفات قاعدة البيانات
│   └── migrations/      # الهجرات
├── dist/                # الملفات المبنية
├── package.json
├── vite.config.ts
├── drizzle.config.ts
└── tsconfig.json
```

## الاختبارات

جميع الاختبارات تمر بنجاح ✅:

- ✓ اختبارات إنشاء التقارير
- ✓ اختبارات عرض التقارير
- ✓ اختبارات حذف التقارير
- ✓ اختبارات أنواع التقارير المختلفة
- ✓ اختبارات أسماء الموجات
- ✓ اختبارات رفع الملفات
- ✓ اختبارات حذف الملفات

## المميزات المستقبلية

- [ ] واجهة عرض التقارير المحفوظة
- [ ] تحرير التقارير
- [ ] تصدير التقارير (PDF/Excel)
- [ ] نظام الإشعارات
- [ ] لوحة تحكم إدارية
- [ ] تقارير إحصائية
- [ ] تحسين الأداء والـ Caching
- [ ] نسخ احتياطية تلقائية

## الترخيص

MIT License

## الدعم

للمساعدة والدعم، يرجى الانضمام إلى ديسكورد المدينة:
https://discord.gg/wjvgu9Za

---

**تم التطوير بواسطة:** Manus AI  
**التاريخ:** يناير 2026

</div>
