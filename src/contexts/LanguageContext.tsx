import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Translation files
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.about": "About Us",
    "nav.goals": "Goals",
    "nav.features": "Features",
    "nav.pricing": "Pricing",
    "nav.contact": "Contact US",
    "nav.download": "Download Now",
    "nav.exercises": "Exercises",
    "nav.dashboard": "Dashboard",
    "nav.signup": "Sign up",
    "nav.signin": "Sign in",
    "nav.signout": "Sign out",
    
    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.create": "Create",
    "common.submit": "Submit",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.clear": "Clear",
    
    // Auth
    "auth.login": "Sign in",
    "auth.signup": "Sign up",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.fullName": "Full name",
    "auth.confirmPassword": "Confirm password",
    "auth.remember": "Remember",
    "auth.forgot": "Forgot?",
    "auth.enterAccount": "Enter your account to continue",
    "auth.createAccount": "Create your account",
    "auth.signupDescription": "Sign up to start using Injaz",
    "auth.completeFields": "Please complete all fields",
    "auth.passwordsMatch": "Passwords must match",
    "auth.signupFailed": "Signup failed",
    "auth.creating": "Creating...",
    "auth.signing": "Signing...",
    "auth.networkError": "Network error",
    
    // Dashboard
    "dashboard.welcome": "Welcome",
    "dashboard.overview": "Overview of your activity",
    "dashboard.points": "Points",
    "dashboard.attempts": "Attempts",
    "dashboard.correct": "Correct",
    "dashboard.streak": "Streak",
    "dashboard.exercises": "Exercises",
    "dashboard.createManage": "Create and manage exercises",
    "dashboard.analytics": "Analytics",
    "dashboard.comingSoon": "Coming soon",
    
    // Exercises
    "exercises.title": "Exercises",
    "exercises.create": "Create Exercise",
    "exercises.createNew": "+ Create Exercise",
    "exercises.edit": "Edit Exercise",
    "exercises.delete": "Delete",
    "exercises.deleteConfirm": "Are you sure you want to delete this exercise?",
    "exercises.noExercises": "No exercises found",
    "exercises.getStarted": "Get started by creating your first exercise!",
    "exercises.filterSubject": "Filter by Subject",
    "exercises.filterDifficulty": "Filter by Difficulty",
    "exercises.all": "All",
    "exercises.easy": "Easy",
    "exercises.medium": "Medium",
    "exercises.hard": "Hard",
    "exercises.questions": "questions",
    "exercises.min": "min",
    "exercises.createManage": "Create and manage your exercises",
    "exercises.searchSubject": "Search subject...",
    "exercises.clearFilters": "Clear Filters",
    "exercises.loading": "Loading exercises...",
    "exercises.failedLoad": "Failed to load exercises",
    "exercises.failedDelete": "Failed to delete exercise",
    "exercises.createFirst": "Create Your First Exercise",
    "exercises.tryFilters": "Try adjusting your filters",
    
    // Exercise Form
    "exerciseForm.title": "Title",
    "exerciseForm.description": "Description",
    "exerciseForm.subject": "Subject",
    "exerciseForm.difficulty": "Difficulty",
    "exerciseForm.timeLimit": "Time Limit (minutes, optional)",
    "exerciseForm.questions": "Questions",
    "exerciseForm.addQuestion": "+ Add Question",
    "exerciseForm.noQuestions": "No questions yet",
    "exerciseForm.addFirst": "Add your first question to get started",
    "exerciseForm.create": "Create Exercise",
    "exerciseForm.edit": "Edit Exercise",
    "exerciseForm.details": "Exercise Details",
    "exerciseForm.updateDetails": "Update your exercise details",
    "exerciseForm.createNew": "Create a new exercise for your students",
    "exerciseForm.enterTitle": "e.g., Fractions - Addition and Subtraction",
    "exerciseForm.briefDescription": "Brief description of the exercise...",
    "exerciseForm.subjectExample": "e.g., Math, Science, English",
    "exerciseForm.noTimeLimit": "Leave empty for no time limit",
    "exerciseForm.creating": "Creating...",
    "exerciseForm.updating": "Updating...",
    "exerciseForm.updateExercise": "Update Exercise",
    "exerciseForm.enterTitleError": "Please enter a title",
    "exerciseForm.enterSubjectError": "Please enter a subject",
    "exerciseForm.addQuestionError": "Please add at least one question",
    "exerciseForm.questionMissing": "Question {n} is missing text",
    "exerciseForm.questionOptions": "Question {n} needs at least 2 options",
    "exerciseForm.questionEmptyOptions": "Question {n} has empty options",
    "exerciseForm.questionCorrectAnswer": "Question {n} needs a correct answer selected",
    "exerciseForm.questionPoints": "Question {n} must have at least 1 point",
    "exerciseForm.failedCreate": "Failed to create exercise",
    "exerciseForm.failedUpdate": "Failed to update exercise",
    
    // Contact
    "contact.title": "Contact Us",
    "contact.subtitle": "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    "contact.getInTouch": "Get in Touch",
    "contact.sendMessage": "Send us a Message",
    "contact.name": "Name",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.success": "Thank you! Your message has been sent successfully.",
    "contact.fillFields": "Please fill in all required fields",
    "contact.validEmail": "Please enter a valid email address",
    "contact.failedSend": "Failed to send message. Please try again.",
    "contact.networkError": "Network error. Please try again later.",
    "contact.selectSubject": "Select a subject",
    "contact.general": "General Inquiry",
    "contact.support": "Technical Support",
    "contact.billing": "Billing Question",
    "contact.feature": "Feature Request",
    "contact.feedback": "Feedback",
    "contact.other": "Other",
    "contact.tellUs": "Tell us how we can help you...",
    "contact.faq": "Frequently Asked Questions",
    "contact.howStart": "How do I get started?",
    "contact.howStartAnswer": "Simply sign up for an account and start creating exercises for your students. It's free to get started!",
    "contact.mobileApp": "Is there a mobile app?",
    "contact.mobileAppAnswer": "Currently, Injaz is available as a web application. Mobile apps are coming soon!",
    "contact.free": "Can I use it for free?",
    "contact.freeAnswer": "Yes! We offer a free tier with basic features. Check our pricing page for more details.",
    
    // About
    "about.title": "About Injaz",
    "about.subtitle": "Empowering educators and inspiring learners through innovative exercise platforms.",
    
    // Question Form
    "questionForm.question": "Question",
    "questionForm.questionType": "Question Type",
    "questionForm.multipleChoice": "Multiple Choice",
    "questionForm.trueFalse": "True/False",
    "questionForm.fillBlank": "Fill in the Blank",
    "questionForm.shortAnswer": "Short Answer",
    "questionForm.options": "Options",
    "questionForm.correctAnswer": "Correct Answer",
    "questionForm.points": "Points",
    "questionForm.explanation": "Explanation (Optional)",
    "questionForm.addOption": "+ Add Option",
    "questionForm.option": "Option {n}",
    "questionForm.true": "True",
    "questionForm.false": "False",
    "questionForm.enterAnswer": "Enter the correct answer",
    "questionForm.blankTip": "Tip: Use _____ in your question text to indicate the blank",
    "questionForm.explainAnswer": "Explain why this is the correct answer...",
    "questionForm.enterQuestion": "Enter your question here...",
    
    // Home
    "home.heroTitle": "Create interactive exercises your students will love",
    "home.heroSubtitle": "Fast setup, beautiful reports and a reward system that keeps learners engaged. Built for teachers and schools.",
    "home.getStarted": "Get started",
    "home.learnMore": "Learn more",
    "home.trusted": "Trusted by schools and teachers worldwide — secure and easy to use.",
    "home.features": "Features",
    "home.lessonManagement": "Lesson Management",
    "home.lessonManagementDesc": "Create lessons and exercises, manage content and students.",
    "home.exerciseRunner": "Exercise Runner",
    "home.exerciseRunnerDesc": "Students answer questions and see results instantly.",
    "home.scoringSystem": "Scoring System",
    "home.scoringSystemDesc": "Points, badges and progress tracking for motivation.",
  },
  ar: {
    // Navigation
    "nav.about": "من نحن",
    "nav.goals": "الأهداف",
    "nav.features": "المميزات",
    "nav.pricing": "الأسعار",
    "nav.contact": "اتصل بنا",
    "nav.download": "حمّل الآن",
    "nav.exercises": "التمارين",
    "nav.dashboard": "لوحة التحكم",
    "nav.signup": "إنشاء حساب",
    "nav.signin": "تسجيل الدخول",
    "nav.signout": "تسجيل الخروج",
    
    // Common
    "common.loading": "جاري التحميل...",
    "common.error": "خطأ",
    "common.success": "نجح",
    "common.cancel": "إلغاء",
    "common.save": "حفظ",
    "common.delete": "حذف",
    "common.edit": "تعديل",
    "common.create": "إنشاء",
    "common.submit": "إرسال",
    "common.search": "بحث",
    "common.filter": "تصفية",
    "common.clear": "مسح",
    
    // Auth
    "auth.login": "تسجيل الدخول",
    "auth.signup": "إنشاء حساب",
    "auth.email": "البريد الإلكتروني",
    "auth.password": "كلمة المرور",
    "auth.fullName": "الاسم الكامل",
    "auth.confirmPassword": "تأكيد كلمة المرور",
    "auth.remember": "تذكرني",
    "auth.forgot": "نسيت؟",
    "auth.enterAccount": "أدخل حسابك للمتابعة",
    "auth.createAccount": "إنشاء حسابك",
    "auth.signupDescription": "سجّل للبدء في استخدام إنجاز",
    "auth.completeFields": "يرجى إكمال جميع الحقول",
    "auth.passwordsMatch": "يجب أن تتطابق كلمات المرور",
    "auth.signupFailed": "فشل إنشاء الحساب",
    "auth.creating": "جاري الإنشاء...",
    "auth.signing": "جاري تسجيل الدخول...",
    "auth.networkError": "خطأ في الشبكة",
    
    // Dashboard
    "dashboard.welcome": "مرحباً",
    "dashboard.overview": "نظرة عامة على نشاطك",
    "dashboard.points": "النقاط",
    "dashboard.attempts": "المحاولات",
    "dashboard.correct": "الصحيحة",
    "dashboard.streak": "السلسلة",
    "dashboard.exercises": "التمارين",
    "dashboard.createManage": "إنشاء وإدارة التمارين",
    "dashboard.analytics": "التحليلات",
    "dashboard.comingSoon": "قريباً",
    
    // Exercises
    "exercises.title": "التمارين",
    "exercises.create": "إنشاء تمرين",
    "exercises.createNew": "+ إنشاء تمرين",
    "exercises.edit": "تعديل التمرين",
    "exercises.delete": "حذف",
    "exercises.deleteConfirm": "هل أنت متأكد من حذف هذا التمرين؟",
    "exercises.noExercises": "لم يتم العثور على تمارين",
    "exercises.getStarted": "ابدأ بإنشاء تمرينك الأول!",
    "exercises.filterSubject": "تصفية حسب المادة",
    "exercises.filterDifficulty": "تصفية حسب الصعوبة",
    "exercises.all": "الكل",
    "exercises.easy": "سهل",
    "exercises.medium": "متوسط",
    "exercises.hard": "صعب",
    "exercises.questions": "أسئلة",
    "exercises.min": "دقيقة",
    "exercises.createManage": "إنشاء وإدارة التمارين",
    "exercises.searchSubject": "بحث في المادة...",
    "exercises.clearFilters": "مسح التصفية",
    "exercises.loading": "جاري تحميل التمارين...",
    "exercises.failedLoad": "فشل تحميل التمارين",
    "exercises.failedDelete": "فشل حذف التمرين",
    "exercises.createFirst": "إنشاء تمرينك الأول",
    "exercises.tryFilters": "حاول تعديل التصفية",
    
    // Exercise Form
    "exerciseForm.title": "العنوان",
    "exerciseForm.description": "الوصف",
    "exerciseForm.subject": "المادة",
    "exerciseForm.difficulty": "الصعوبة",
    "exerciseForm.timeLimit": "الوقت المحدد (بالدقائق، اختياري)",
    "exerciseForm.questions": "الأسئلة",
    "exerciseForm.addQuestion": "+ إضافة سؤال",
    "exerciseForm.noQuestions": "لا توجد أسئلة بعد",
    "exerciseForm.addFirst": "أضف سؤالك الأول للبدء",
    "exerciseForm.create": "إنشاء تمرين",
    "exerciseForm.edit": "تعديل التمرين",
    "exerciseForm.details": "تفاصيل التمرين",
    "exerciseForm.updateDetails": "تحديث تفاصيل التمرين",
    "exerciseForm.createNew": "إنشاء تمرين جديد لطلابك",
    "exerciseForm.enterTitle": "مثال: الكسور - الجمع والطرح",
    "exerciseForm.briefDescription": "وصف مختصر للتمرين...",
    "exerciseForm.subjectExample": "مثال: الرياضيات، العلوم، الإنجليزية",
    "exerciseForm.noTimeLimit": "اتركه فارغاً لعدم وجود حد زمني",
    "exerciseForm.creating": "جاري الإنشاء...",
    "exerciseForm.updating": "جاري التحديث...",
    "exerciseForm.updateExercise": "تحديث التمرين",
    "exerciseForm.enterTitleError": "يرجى إدخال العنوان",
    "exerciseForm.enterSubjectError": "يرجى إدخال المادة",
    "exerciseForm.addQuestionError": "يرجى إضافة سؤال واحد على الأقل",
    "exerciseForm.questionMissing": "السؤال {n} يفتقد النص",
    "exerciseForm.questionOptions": "السؤال {n} يحتاج إلى خيارين على الأقل",
    "exerciseForm.questionEmptyOptions": "السؤال {n} يحتوي على خيارات فارغة",
    "exerciseForm.questionCorrectAnswer": "السؤال {n} يحتاج إلى إجابة صحيحة محددة",
    "exerciseForm.questionPoints": "السؤال {n} يجب أن يحتوي على نقطة واحدة على الأقل",
    "exerciseForm.failedCreate": "فشل إنشاء التمرين",
    "exerciseForm.failedUpdate": "فشل تحديث التمرين",
    
    // Contact
    "contact.title": "اتصل بنا",
    "contact.subtitle": "نود أن نسمع منك. أرسل لنا رسالة وسنرد في أقرب وقت ممكن.",
    "contact.getInTouch": "تواصل معنا",
    "contact.sendMessage": "أرسل لنا رسالة",
    "contact.name": "الاسم",
    "contact.subject": "الموضوع",
    "contact.message": "الرسالة",
    "contact.send": "إرسال الرسالة",
    "contact.sending": "جاري الإرسال...",
    "contact.success": "شكراً لك! تم إرسال رسالتك بنجاح.",
    "contact.fillFields": "يرجى ملء جميع الحقول المطلوبة",
    "contact.validEmail": "يرجى إدخال عنوان بريد إلكتروني صحيح",
    "contact.failedSend": "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.",
    "contact.networkError": "خطأ في الشبكة. يرجى المحاولة مرة أخرى لاحقاً.",
    "contact.selectSubject": "اختر موضوعاً",
    "contact.general": "استفسار عام",
    "contact.support": "الدعم الفني",
    "contact.billing": "سؤال عن الفواتير",
    "contact.feature": "طلب ميزة",
    "contact.feedback": "ملاحظات",
    "contact.other": "أخرى",
    "contact.tellUs": "أخبرنا كيف يمكننا مساعدتك...",
    "contact.faq": "الأسئلة الشائعة",
    "contact.howStart": "كيف أبدأ؟",
    "contact.howStartAnswer": "ببساطة، سجّل حساباً وابدأ بإنشاء التمارين لطلابك. يمكنك البدء مجاناً!",
    "contact.mobileApp": "هل يوجد تطبيق للهاتف المحمول؟",
    "contact.mobileAppAnswer": "حالياً، إنجاز متاح كتطبيق ويب. تطبيقات الهاتف المحمول قادمة قريباً!",
    "contact.free": "هل يمكنني استخدامه مجاناً؟",
    "contact.freeAnswer": "نعم! نقدم نسخة مجانية مع ميزات أساسية. تحقق من صفحة الأسعار لمزيد من التفاصيل.",
    
    // About
    "about.title": "عن إنجاز",
    "about.subtitle": "تمكين المعلمين وإلهام المتعلمين من خلال منصات التمارين المبتكرة.",
    
    // Question Form
    "questionForm.question": "السؤال",
    "questionForm.questionType": "نوع السؤال",
    "questionForm.multipleChoice": "اختيار متعدد",
    "questionForm.trueFalse": "صحيح/خطأ",
    "questionForm.fillBlank": "املأ الفراغ",
    "questionForm.shortAnswer": "إجابة قصيرة",
    "questionForm.options": "الخيارات",
    "questionForm.correctAnswer": "الإجابة الصحيحة",
    "questionForm.points": "النقاط",
    "questionForm.explanation": "شرح (اختياري)",
    "questionForm.addOption": "+ إضافة خيار",
    "questionForm.option": "خيار {n}",
    "questionForm.true": "صحيح",
    "questionForm.false": "خطأ",
    "questionForm.enterAnswer": "أدخل الإجابة الصحيحة",
    "questionForm.blankTip": "نصيحة: استخدم _____ في نص السؤال للإشارة إلى الفراغ",
    "questionForm.explainAnswer": "اشرح لماذا هذه هي الإجابة الصحيحة...",
    "questionForm.enterQuestion": "أدخل سؤالك هنا...",
    
    // Home
    "home.heroTitle": "أنشئ تمارين تفاعلية سيحبها طلابك",
    "home.heroSubtitle": "إعداد سريع، تقارير جميلة ونظام مكافآت يحافظ على تفاعل المتعلمين. مصمم للمعلمين والمدارس.",
    "home.getStarted": "ابدأ",
    "home.learnMore": "اعرف المزيد",
    "home.trusted": "موثوق به من قبل المدارس والمعلمين في جميع أنحاء العالم — آمن وسهل الاستخدام.",
    "home.features": "المميزات",
    "home.lessonManagement": "إدارة الدروس",
    "home.lessonManagementDesc": "أنشئ الدروس والتمارين، وأدر المحتوى والطلاب.",
    "home.exerciseRunner": "مشغل التمارين",
    "home.exerciseRunnerDesc": "يجيب الطلاب على الأسئلة ويرون النتائج فوراً.",
    "home.scoringSystem": "نظام النقاط",
    "home.scoringSystemDesc": "النقاط والشارات وتتبع التقدم للتحفيز.",
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Get saved language from localStorage or default to English
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("injaz_language") as Language;
      return saved && (saved === "en" || saved === "ar") ? saved : "en";
    }
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("injaz_language", lang);
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === "ar";

  // Apply RTL to document
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

