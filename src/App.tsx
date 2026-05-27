import { useState, useEffect, FormEvent } from "react";
import { 
  Building2, 
  Phone, 
  Menu, 
  X, 
  CheckCircle, 
  ChevronRight, 
  ArrowRight, 
  Calculator, 
  Truck, 
  MapPin, 
  Mail, 
  Package, 
  ShieldCheck, 
  Settings, 
  CornerDownRight,
  Gift,
  Search,
  Check,
  AlertCircle
} from "lucide-react";

// Import generated images
import cat1 from "./assets/images/cat_1_wall_formwork_1779803912341.png";
import cat2 from "./assets/images/cat_2_lightweight_formwork_1779803927558.png";
import cat3 from "./assets/images/cat_3_slab_poles_1779803944280.png";
import cat4 from "./assets/images/cat_4_cuplock_shoring_1779803960537.png";
import cat5 from "./assets/images/cat_5_column_formwork_1779803980760.png";
import cat6 from "./assets/images/cat_6_scaffolding_1779804000036.png";
import cat7 from "./assets/images/cat_7_beams_plywood_1779804019789.png";
import cat8 from "./assets/images/cat_8_wedge_locks_1779804035859.png";
import cat9 from "./assets/images/cat_9_machines_tmo_1779804057882.png";
import heroBg from "./assets/images/hero_bg_monolithic_construction_1779804082211.png";

type CatalogTab = "all" | "rent" | "sale";
type CalcService = "rent" | "sale";
type CalcType = "wall" | "slab" | "column" | "scaffold" | "beams" | "tmo";

interface CatalogItem {
  id: number;
  image: string;
  badge: string;
  title: string;
  desc: string;
  types: CatalogTab[];
  specs: { label: string; value: string }[];
  rentPrice: string;
  salePrice: string;
}

export default function App() {
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Catalog tab filtering
  const [activeTab, setActiveTab] = useState<CatalogTab>("all");

  // Calculator states
  const [calcService, setCalcService] = useState<CalcService>("rent");
  const [calcType, setCalcType] = useState<CalcType>("wall");
  const [calcArea, setCalcArea] = useState<number>(150);
  const [calcDuration, setCalcDuration] = useState<number>(2);

  // Quiz states
  const [quizStep, setQuizStep] = useState<number>(1);
  const [quizAnswers, setQuizAnswers] = useState({
    step1: "",
    step2: "",
    name: "",
    phone: "",
    contactType: "WhatsApp"
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "Заказать расчет опалубки",
    subtitle: "Оставьте ваш телефон, мы свяжемся и подготовим детальное КП под ваш проект.",
    source: "",
    name: "",
    phone: "",
    emailChecked: true
  });

  // Hot Promo Alert Auto Scroll/Flasher
  const [isPromoVisible, setIsPromoVisible] = useState(true);

  // Form files attach simulation state
  const [attachedFileName, setAttachedFileName] = useState("");

  // Toast notification state
  const [toast, setToast] = useState({
    visible: false,
    title: "Заявка принята!",
    desc: "Свяжемся с вами в течение 10 минут."
  });

  const showToast = (title = "Заявка принята!", desc = "Свяжемся с вами в течение 10 минут.") => {
    setToast({ visible: true, title, desc });
  };

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, visible: false }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  // Catalog data list with imported static images
  const catalogProducts: CatalogItem[] = [
    {
      id: 1,
      image: cat1,
      badge: "Новая & БУ • Складской Лидер",
      title: "Опалубка стен (Крупнощит)",
      desc: "Стальные тяжелые щиты 1.0х3.0м (более 1500 ед. на складе), выдерживающие колоссальные нагрузки до 80 кПа.",
      types: ["rent", "sale"],
      specs: [
        { label: "Высота щитов", value: "3.0 м / 1.5 м / 1.2 м" },
        { label: "Материал рамы", value: "Высокопрочная сталь СТ-3" },
        { label: "Палуба щита", value: "Ламинированная фанера 18мм" }
      ],
      rentPrice: "от 550 ₽",
      salePrice: "от 4 800 ₽/м²"
    },
    {
      id: 2,
      image: cat2,
      badge: "Для ИЖС • Монтаж без крана",
      title: "Облегченная опалубка МСК",
      desc: "Мелкощитовая модульная система для фундаментов и перегородок. Вес щитов позволяет собирать её силами 1-2 рабочих.",
      types: ["rent"],
      specs: [
        { label: "Вес щитов", value: "от 12 до 35 кг" },
        { label: "Применение", value: "Ленточные фундаменты, ростверки" },
        { label: "Установка", value: "Без привлечения спецтехники" }
      ],
      rentPrice: "от 450 ₽",
      salePrice: "Под заказ"
    },
    {
      id: 3,
      image: cat3,
      badge: "Все размеры в наличии",
      title: "Перекрытия на телескопах",
      desc: "Опалубочный комплект на регулируемых стойках. Подходит для большинства стандартных высот в жилом секторе.",
      types: ["rent", "sale"],
      specs: [
        { label: "Высота работы", value: "от 1.5 м до 5.0 м (усиленные)" },
        { label: "Толщина перекрытия", value: "До 400 мм" },
        { label: "В комплекте", value: "Треноги, унивилки, стойки" }
      ],
      rentPrice: "от 320 ₽",
      salePrice: "от 1 900 ₽/м²"
    },
    {
      id: 4,
      image: cat4,
      badge: "Высокий Монолит • ХСИ / Cup-Lock",
      title: "Объемные леса CupLock / ХСИ",
      desc: "Для укладки бетонной смеси на больших высотах и при увеличенной толщине плиты (мосты, эстакады, ТРЦ).",
      types: ["rent"],
      specs: [
        { label: "Допустимая высота", value: "до 20.0 метров" },
        { label: "Нагрузка на стойку", value: "до 6.5 тонн" },
        { label: "Шаг ригеля", value: "0.5 м / 1.0 м / 1.5 м" }
      ],
      rentPrice: "от 420 ₽",
      salePrice: "Под расчет"
    },
    {
      id: 5,
      image: cat5,
      badge: "Прямоугольные & Радиусные",
      title: "Опалубка колонн всех типов",
      desc: "Включает универсальные щиты для квадратных сечений и специальные радиусные элементы для круглых колонн.",
      types: ["rent", "sale"],
      specs: [
        { label: "Сечения колонн", value: "от 200мм до 1200мм" },
        { label: "Радиусные щиты", value: "Стальные закругленные полукольца" },
        { label: "Высота монтажа", value: "до 12.0 м за один проход" }
      ],
      rentPrice: "от 700 ₽",
      salePrice: "от 5 100 ₽/м²"
    },
    {
      id: 6,
      image: cat6,
      badge: "Рамные • Клиновые • Хомутовые",
      title: "Строительные леса (ЛСПР)",
      desc: "Безопасные фасадные и кладочные леса. Отвечают всем нормам техники безопасности. Легко монтируются.",
      types: ["rent", "sale"],
      specs: [
        { label: "Макс. высота", value: "до 100 метров" },
        { label: "Нормат. нагрузка", value: "до 300 кгс/м²" },
        { label: "Диаметр трубы", value: "42 мм / 48 мм" }
      ],
      rentPrice: "от 90 ₽",
      salePrice: "от 240 ₽/м²"
    },
    {
      id: 7,
      image: cat7,
      badge: "Российская береза • Хвоя",
      title: "Балка БДК-1 & Фанера",
      desc: "Высококачественная балка с пропиткой от влаги и износостойкая ламинированная фанера повышенной оборачиваемости.",
      types: ["rent", "sale"],
      specs: [
        { label: "Балка БДК-1", value: "Березовая вставка, длина 1.5 - 6.0 м" },
        { label: "Фанера ламинир", value: "18 мм и 21 мм (1220х2440 / 1500х3000)" },
        { label: "Оборачиваемость", value: "До 45 циклов (1-й сорт)" }
      ],
      rentPrice: "от 40 ₽",
      salePrice: "от 380 ₽/пог.м"
    },
    {
      id: 8,
      image: cat8,
      badge: "Всегда на складе",
      title: "Комплектующие и расходники",
      desc: "Все связующие детали опалубочных систем. Клиновые замки, стяжные винты, гайки, захваты, подкосы.",
      types: ["rent", "sale"],
      specs: [
        { label: "Винты стяжные", value: "от 0.5 до 3.0 метров" },
        { label: "Типы замков", value: "Клиновые, винтовые, универсальные" },
        { label: "Дополнительно", value: "Смазка (Эмульсол), фиксаторы арматуры" }
      ],
      rentPrice: "от 10 ₽",
      salePrice: "от 45 ₽/ед."
    },
    {
      id: 9,
      image: cat9,
      badge: "Электрооборудование • ТМО",
      title: "Аренда станков и ТМО",
      desc: "Профессиональное строительное электрооборудование. Станки резки и гибки арматуры, трансформаторы прогрева бетона ТМО.",
      types: ["rent"],
      specs: [
        { label: "Трансформаторы прогрева", value: "ТМО-80 (80 кВт) в утепленном корпусе" },
        { label: "Станки гибки-резки", value: "СГИ-40 / СМЖ-322 (до 40мм диаметр)" },
        { label: "Питание станков", value: "380 В (с пультами управления)" }
      ],
      rentPrice: "от 800 ₽",
      salePrice: "Под заказ"
    }
  ];

  // Filter products by mode
  const filteredProducts = catalogProducts.filter(item => {
    if (activeTab === "all") return true;
    return item.types.includes(activeTab);
  });

  // Calculate prices logic
  const calculateResult = () => {
    let pricePerUnit = 0;
    if (calcService === "rent") {
      switch (calcType) {
        case "wall": pricePerUnit = 550; break;
        case "slab": pricePerUnit = 320; break;
        case "column": pricePerUnit = 700; break;
        case "scaffold": pricePerUnit = 90; break;
        case "beams": pricePerUnit = 40; break;
        case "tmo": pricePerUnit = 800; break;
      }
    } else {
      switch (calcType) {
        case "wall": pricePerUnit = 4800; break;
        case "slab": pricePerUnit = 1900; break;
        case "column": pricePerUnit = 5100; break;
        case "scaffold": pricePerUnit = 240; break;
        case "beams": pricePerUnit = 380; break;
        case "tmo": pricePerUnit = 45000; break;
      }
    }

    let baseCost = pricePerUnit * calcArea;
    if (calcService === "rent") {
      if (calcType === "tmo") {
        baseCost = baseCost * 30; // 30 days of rental for equipment daily rate
      } else {
        baseCost = baseCost * calcDuration;
      }
    }

    const deliveryNote = baseCost >= 100000 
      ? "БЕСПЛАТНО (Собственный автопарк)" 
      : "От 4 000 ₽ (Газель / Манипулятор / КМУ)";

    return {
      baseCost,
      deliveryNote,
      isFreeDelivery: baseCost >= 100000
    };
  };

  const { baseCost, deliveryNote, isFreeDelivery } = calculateResult();

  // Helper phrase for plural months
  const getMonthsWord = (months: number) => {
    if (months === 1) return "месяц";
    if (months >= 2 && months <= 4) return "месяца";
    return "месяцев";
  };

  const getUnitSymbol = (type: CalcType) => {
    if (type === "beams") return "пог.м";
    if (type === "tmo") return "ед.";
    return "м²";
  };

  // Open modal handler
  const handleOpenModal = (source: string, customTitle?: string, customSubtitle?: string) => {
    setModalData(prev => ({
      ...prev,
      title: customTitle || "Заказать расчет опалубки",
      subtitle: customSubtitle || "Оставьте ваш телефон, мы свяжемся и подготовим детальное КП под ваш проект.",
      source: source,
      name: "",
      phone: ""
    }));
    setIsModalOpen(true);
  };

  // Submit modal form
  const onModalSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    showToast(
      "Заявка успешно отправлена!",
      `Спецификация по разделу "${modalData.source}" принята в обработку. Свяжемся с вами за 10 минут!`
    );
  };

  // Main hero form submit
  const onHeroFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const selectEl = document.getElementById("hero-select") as HTMLSelectElement;
    const selectVal = selectEl ? selectEl.value : "Комплексная поставка";
    showToast(
      "Проект принят на расчет!",
      `Инженер уже рассчитывает раздел: "${selectVal}". Чертежи добавлены в очередь.`
    );
    // Reset simulation
    setAttachedFileName("");
    (e.target as HTMLFormElement).reset();
  };

  // Simulation of file input change
  const onSimulatedFileChange = () => {
    const fileNames = ["Проект_КЖ_Секция_1.dwg", "Чертеж_АР_Фундамент.pdf", "Спецификация_Чертеж.zip"];
    const randomFile = fileNames[Math.floor(Math.random() * fileNames.length)];
    setAttachedFileName(randomFile);
    showToast("Файл прикреплен", `Успешно добавлен файл: ${randomFile}`);
  };

  // Quiz step functions
  const selectQuizOption = (step: number, optionValue: string) => {
    if (step === 1) {
      setQuizAnswers(prev => ({ ...prev, step1: optionValue }));
      setQuizStep(2);
    } else if (step === 2) {
      setQuizAnswers(prev => ({ ...prev, step2: optionValue }));
      setQuizStep(3);
    }
  };

  const submitQuiz = (e: FormEvent) => {
    e.preventDefault();
    setQuizStep(1);
    showToast(
      "Сметный квиз пройден!",
      `Ваши варианты: ${quizAnswers.step1} -> ${quizAnswers.step2}. Скидка 10% успешно зафиксирована на номер ${quizAnswers.phone}!`
    );
    setQuizAnswers({
      step1: "",
      step2: "",
      name: "",
      phone: "",
      contactType: "WhatsApp"
    });
  };

  const handleCalculatorFormSubmit = () => {
    const serviceName = calcService === "rent" ? "Аренду" : "Покупку";
    const typeLabel = calcType === "wall" ? "Стены" : 
                      calcType === "slab" ? "Перекрытия" : 
                      calcType === "column" ? "Колонны" : 
                      calcType === "scaffold" ? "Строительные леса" : 
                      calcType === "beams" ? "Балка/Фанера" : "Станки/ТМО";
    
    handleOpenModal(
      `Калькулятор: ${serviceName} (${typeLabel}), Объём: ${calcArea}`,
      "Забронировать расчетную смету",
      "Оставьте ваши контакты, чтобы привязать скидку 10% к вашим параметрам из онлайн-калькулятора."
    );
  };

  return (
    <div className="font-sans bg-gray-50 text-gray-900 overflow-x-hidden min-h-screen">
      
      {/* Hot Promo Alert Bar */}
      {isPromoVisible && (
        <div id="hot-promo" className="bg-brand text-gray-900 font-bold py-2.5 px-4 text-center text-xs md:text-sm shadow-inner relative z-50 flex justify-center items-center gap-2 pr-12">
          <span className="inline-block animate-pulse mr-1">🔥 Акция недели!</span>
          <span>Закажите бесплатный инженерный расчет раскладки и зафиксируйте <span className="underline">скидку 10%</span> на аренду!</span>
          <button 
            onClick={() => setIsPromoVisible(false)} 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-900 hover:text-black hover:scale-115 transition-all text-sm font-black p-1"
            title="Закрыть"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo and Branding with Hat Icon */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}>
              <div className="bg-brand text-white p-2.5 rounded-lg shadow-md flex items-center justify-center">
                <svg className="w-7 h-7 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 12a10 10 0 0 1 20 0H2Z" fill="currentColor"/>
                  <path d="M5 12v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3" stroke="currentColor"/>
                  <rect x="10" y="4" width="4" height="4" rx="1" fill="currentColor"/>
                </svg>
              </div>
              <div>
                <span className="text-xl md:text-2xl font-black tracking-tight text-gray-900 leading-none block">
                  МОС<span className="text-brand">ОПАЛУБКА</span>
                </span>
                <span className="text-[9px] text-gray-500 tracking-wider uppercase font-bold leading-none block mt-1">
                  Опалубка и оборудование с 2012 года
                </span>
              </div>
            </div>

            {/* Navigation Menu (Desktop) */}
            <nav className="hidden lg:flex items-center lg:space-x-3 xl:space-x-6 font-bold lg:text-[11px] xl:text-sm text-gray-700 whitespace-nowrap flex-shrink-0">
              <a href="#about" className="hover:text-brand transition-colors py-2 whitespace-nowrap">О нас</a>
              <a href="#catalog" className="hover:text-brand transition-colors py-2 whitespace-nowrap">Каталог оборудования</a>
              <a href="#calculator" className="hover:text-brand transition-colors py-2 whitespace-nowrap">Калькулятор</a>
              <a href="#fleet" className="hover:text-brand transition-colors py-2 whitespace-nowrap">Наш автопарк</a>
              <a href="#quiz" className="hover:text-brand transition-colors py-2 whitespace-nowrap">Опрос-расчет</a>
              <a href="#advantages" className="hover:text-brand transition-colors py-2 whitespace-nowrap">Почему мы</a>
            </nav>

            {/* Right Header Phone & CTAs */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-3 xl:space-x-6 flex-shrink-0">
              <div className="text-right whitespace-nowrap">
                <a href="tel:+79267301196" className="block text-base lg:text-sm xl:text-lg font-extrabold text-gray-900 hover:text-brand transition-colors whitespace-nowrap">
                  +7 (926) 730-11-96
                </a>
                <span className="text-[10px] text-green-600 flex items-center justify-end font-bold whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5 animate-ping"></span> Склад работает 24/7
                </span>
              </div>
              <button 
                onClick={() => handleOpenModal("Обратный звонок (Шапка)", "Быстрый обратный звонок", "Специалист свяжется с вами по указанному номеру для консультации.")} 
                className="bg-gray-900 hover:bg-brand hover:text-gray-900 text-white font-bold text-xs lg:text-[11px] xl:text-sm px-4 lg:px-3.5 xl:px-5 py-3 lg:py-2.5 xl:py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-md cursor-pointer whitespace-nowrap"
              >
                Заказать звонок
              </button>
            </div>

            {/* Mobile Menu Open Button */}
            <div className="lg:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="text-gray-900 focus:outline-none p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-3 shadow-md animate-fade-in">
            <a href="#about" className="block py-2 text-base font-semibold text-gray-700 hover:text-brand" onClick={() => setIsMobileMenuOpen(false)}>О компании</a>
            <a href="#catalog" className="block py-2 text-base font-semibold text-gray-700 hover:text-brand" onClick={() => setIsMobileMenuOpen(false)}>Каталог и цены</a>
            <a href="#calculator" className="block py-2 text-base font-semibold text-gray-700 hover:text-brand" onClick={() => setIsMobileMenuOpen(false)}>Калькулятор сметы</a>
            <a href="#fleet" className="block py-2 text-base font-semibold text-gray-700 hover:text-brand" onClick={() => setIsMobileMenuOpen(false)}>Наш автопарк</a>
            <a href="#quiz" className="block py-2 text-base font-semibold text-gray-700 hover:text-brand" onClick={() => setIsMobileMenuOpen(false)}>Рассчитать проект</a>
            
            <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
              <a href="tel:+79267301196" className="text-center py-3 bg-gray-100 rounded-lg font-bold text-gray-900 hover:bg-gray-200 transition-colors">
                +7 (926) 730-11-96
              </a>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleOpenModal("Быстрый расчет (Мобильный)");
                }} 
                className="w-full text-center py-3 bg-brand hover:bg-brand-dark text-gray-900 font-bold rounded-lg transition-colors cursor-pointer"
              >
                Быстрый расчет сметы
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-dark-bg text-white py-12 lg:py-24 overflow-hidden">
        {/* Generated Hero Background with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            id="hero-bg" 
            src={heroBg} 
            alt="Строительное оборудование и опалубка в Москве" 
            className="w-full h-full object-cover object-center filter brightness-45"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/95 via-gray-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Offer Heading & Features */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-xs text-brand font-bold uppercase tracking-wider">
                <Check className="w-4 h-4 text-brand" />
                <span>Продажа и аренда строительного оборудования • Склад 24/7</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Опалубка и <span className="text-brand">строительное оборудование</span> в Москве и МО
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-2xl">
                Поставим всё под монолит: от легкой ручной опалубки МСК до лесов и прогревочных станков ТМО. <span className="text-white font-semibold">Собственный автопарк от маневренных Газелей до 20-тонных шаланд</span>. Инженерный 3D-расчёт раскладки — бесплатно!
              </p>

              {/* Grid of Key Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center space-x-2 text-sm text-gray-200">
                  <CheckCircle className="w-5 h-5 text-brand shrink-0" />
                  <span>Стеновая, перекрытия (CupLock/ХСИ), колонны</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-200">
                  <CheckCircle className="w-5 h-5 text-brand shrink-0" />
                  <span>Леса, двутавровая балка, ламинированная фанера</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-200">
                  <CheckCircle className="w-5 h-5 text-brand shrink-0" />
                  <span>Аренда ТМО и станков для гибки/резки арматуры</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-200">
                  <CheckCircle className="w-5 h-5 text-brand shrink-0" />
                  <span>Выкуп БУ оборудования до 70%</span>
                </div>
              </div>

              {/* Fast links to categories */}
              <div className="pt-4">
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Быстрый переход к оборудованию:</span>
                <div className="flex flex-wrap gap-2">
                  <a href="#catalog" onClick={() => setActiveTab("all")} className="bg-white/5 hover:bg-brand hover:text-gray-900 border border-white/15 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all">Все категории</a>
                  <a href="#catalog" onClick={() => setActiveTab("rent")} className="bg-white/5 hover:bg-brand hover:text-gray-900 border border-white/15 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all">Аренда оборудования</a>
                  <a href="#catalog" onClick={() => setActiveTab("sale")} className="bg-white/5 hover:bg-brand hover:text-gray-900 border border-white/15 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all">Покупка оборудования</a>
                </div>
              </div>
            </div>

            {/* Quick Estimation Lead Form */}
            <div className="lg:col-span-5 bg-white text-gray-900 rounded-2xl p-6 sm:p-8 shadow-2xl relative border-t-4 border-brand">
              <div className="absolute -top-3 -right-3 bg-red-600 text-white font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-lg animate-bounce">
                Выезд инженера 0 ₽
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Быстрый расчет сметы</h3>
              <p className="text-sm text-gray-600 mb-6">Загрузите ваши чертежи АР / КЖ или выберите тип. Инженер составит проект за 30 минут со скидкой 10%!</p>
              
              <form onSubmit={onHeroFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Что вас интересует?</label>
                  <select id="hero-select" className="w-full border-2 border-gray-100 rounded-lg p-3 text-sm focus:outline-none focus:border-brand font-medium bg-white">
                    <option>Комплексная поставка (опалубка + леса + балка)</option>
                    <option>Аренда опалубки стен (Крупнощит / облегченная)</option>
                    <option>Аренда опалубки перекрытий (Телескопы / CupLock)</option>
                    <option>Покупка новой или БУ опалубки</option>
                    <option>Леса строительные / Балка H20 / Фанера</option>
                    <option>Станки гибки-резки / Трансформаторы ТМО</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Номер телефона для связи</label>
                  <input 
                    type="tel" 
                    placeholder="+7 (926) 000-00-00" 
                    required 
                    className="w-full border-2 border-gray-100 rounded-lg p-3 text-sm focus:outline-none focus:border-brand font-semibold text-gray-950 placeholder-gray-400 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Прикрепить чертежи или ТЗ</label>
                  <div 
                    onClick={onSimulatedFileChange}
                    className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-3 cursor-pointer hover:border-brand bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-brand mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                      </svg>
                      <span className="text-xs text-gray-600 font-bold">
                        {attachedFileName ? "Чертеж прикреплен успешно!" : "Загрузить проект (КЖ / АР)"}
                      </span>
                    </div>
                    {attachedFileName && (
                      <span className="text-[11px] text-green-600 font-mono mt-1 block">
                        📎 {attachedFileName} ({Math.floor(Math.random() * 5) + 2} MB)
                      </span>
                    )}
                  </div>
                </div>

                <button type="submit" className="w-full bg-brand hover:bg-brand-dark text-gray-900 font-extrabold text-base py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer">
                  Получить точный расчет ➔
                </button>

                <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-500 text-center pt-1">
                  <span>🛡️ Конфиденциальность данных защищена по ФЗ-152</span>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Context Text & Key Features */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-brand font-bold text-xs uppercase tracking-widest bg-brand-light px-3 py-1 rounded-full">Опыт и ресурсы</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Комплексный поставщик профессиональной опалубки и оборудования на рынке РФ
              </h2>
              
              <p className="text-gray-700 text-base leading-relaxed">
                Наша компания занимается прямыми поставками и арендой высококачественного металлического и деревянного оборудования для монолитных конструкций с 2012 года. Мы поставляем только сертифицированное оборудование, выверенное строгим ГОСТом, которое гарантирует идеальную прямолинейность бетонной смеси при заливке.
              </p>

              <div className="bg-gray-50 border-l-4 border-brand p-4 rounded-r-xl">
                <p className="text-sm font-semibold text-gray-800 italic">
                  «В наличии на складе в Москве более 1 500 единиц крупнощитовой опалубки размером 1.0 х 3.0 м и 50 000 м² объемных и рамных лесов, готовых к отгрузке прямо сейчас!»
                </p>
              </div>

              {/* Static Icons Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start space-x-3">
                  <div className="bg-brand/10 text-brand p-2.5 rounded-lg shrink-0">
                    <Building2 className="w-5 h-5 text-gray-950" />
                  </div>
                  <div>
                    <h4 class="font-bold text-sm text-gray-900">Облегченная опалубка МСК</h4>
                    <p class="text-xs text-gray-500">Монтируется вручную без крана. Идеальный выбор для частного сектора (ИЖС) и фундаментов.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-brand/10 text-brand p-2.5 rounded-lg shrink-0">
                    <Package className="w-5 h-5 text-gray-950" />
                  </div>
                  <div>
                    <h4 class="font-bold text-sm text-gray-900">Cup-Lock и ХСИ системы</h4>
                    <p class="text-xs text-gray-500">Профессиональная объемная опалубка перекрытий для сложных высотных нагрузок.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-brand/10 text-brand p-2.5 rounded-lg shrink-0">
                    <Settings className="w-5 h-5 text-gray-950" />
                  </div>
                  <div>
                    <h4 class="font-bold text-sm text-gray-900">Усиленные стойки до 5м</h4>
                    <p class="text-xs text-gray-500">Телескопические стойки всех размеров в наличии, включая супер-усиленные для высоты 5 метров.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-brand/10 text-brand p-2.5 rounded-lg shrink-0">
                    <ShieldCheck className="w-5 h-5 text-gray-950" />
                  </div>
                  <div>
                    <h4 class="font-bold text-sm text-gray-900">Колонны и радиусные щиты</h4>
                    <p class="text-xs text-gray-500">Опалубка круглых и прямоугольных колонн для безупречной геометрии бетона.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dark Warehouse Counter Block */}
            <div className="lg:col-span-12 xl:col-span-5 bg-slate-bg text-white rounded-3xl p-8 space-y-8 relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              <div className="relative z-10 text-center border-b border-white/10 pb-6">
                <h3 className="text-lg font-bold text-brand uppercase tracking-wider">Наши складские остатки в Москве</h3>
                <p className="text-xs text-gray-300">Регулярно обновляемый парк оборудования и опалубки</p>
              </div>

              <div className="relative z-10 grid grid-cols-2 gap-6 pb-2">
                <div className="text-center">
                  <span className="block text-3xl sm:text-4xl font-black text-brand">1 500+</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Щитов (1.0x3.0м) в наличии</span>
                </div>
                <div className="text-center">
                  <span className="block text-3xl sm:text-4xl font-black text-brand">50 000+</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Кв. метров перекрытий</span>
                </div>
                <div className="text-center">
                  <span className="block text-3xl sm:text-4xl font-black text-brand">10 000+</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Стоек и балок БДК-1</span>
                </div>
                <div className="text-center">
                  <span className="block text-3xl sm:text-4xl font-black text-brand">24/7</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Отгрузка со склада</span>
                </div>
              </div>

              <div className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <p className="text-xs text-gray-300 leading-relaxed">
                  Все металлические и деревянные опалубочные изделия проходят обязательную дефектовку перед отправкой на новые строительные точки.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Catalog Section with Real Generated Images */}
      <section id="catalog" className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-brand font-bold text-xs uppercase tracking-widest bg-brand-light px-3 py-1 rounded-full">Ассортимент</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3">
              Все виды строительного оборудования и опалубки
            </h2>
            <p className="text-gray-600 mt-4">
              Широкий спектр сертифицированного оборудования первого класса: от легких систем ручного монтажа МСК до тяжелого стенового монолита, объемных лесов и спецстанков. Все товары в наличии на складе.
            </p>

            {/* Catalog Tabs Filter Control */}
            <div className="flex flex-wrap justify-center mt-8 gap-2 bg-gray-100 p-1.5 rounded-xl max-w-lg mx-auto">
              <button 
                onClick={() => setActiveTab("all")} 
                className={`flex-1 min-w-[100px] py-2 text-xs sm:text-sm font-bold rounded-lg transition-all duration-300 cursor-pointer ${
                  activeTab === "all" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Все товары
              </button>
              <button 
                onClick={() => setActiveTab("rent")} 
                className={`flex-1 min-w-[100px] py-2 text-xs sm:text-sm font-bold rounded-lg transition-all duration-300 cursor-pointer ${
                  activeTab === "rent" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Аренда
              </button>
              <button 
                onClick={() => setActiveTab("sale")} 
                className={`flex-1 min-w-[100px] py-2 text-xs sm:text-sm font-bold rounded-lg transition-all duration-300 cursor-pointer ${
                  activeTab === "sale" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Продажа
              </button>
            </div>
          </div>

          {/* Catalog Cards Grid (Interactive React state) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200/60 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Real Generated Image Area */}
                <div className="relative h-56 bg-slate-bg overflow-hidden shrink-0 group">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 bg-gray-950/80 backdrop-blur-md text-brand text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider z-10">
                    {product.badge}
                  </span>
                </div>

                {/* Card Content Description */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="font-extrabold text-lg text-gray-900">{product.title}</h3>
                    <p className="text-xs text-gray-500 mt-2 mb-4">{product.desc}</p>
                    
                    <div className="space-y-1.5 border-t border-b border-gray-100 py-3 mb-4">
                      {product.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex justify-between text-xs">
                          <span className="text-gray-500">{spec.label}:</span>
                          <span className="font-semibold text-gray-900">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prices & Actions */}
                  <div>
                    <div className="flex items-baseline justify-between mb-4">
                      <div className="text-left">
                        <p className="text-[10px] text-gray-400 uppercase font-bold">Аренда</p>
                        <p className="text-lg font-black text-gray-900">
                          <span className="text-brand">{product.rentPrice}</span>{" "}
                          <span className="text-xs font-normal text-gray-500">
                            {product.title.includes("Балка") ? "/пог.м/мес." : product.title.includes("ТМО") ? "/сутки" : "/м²/мес."}
                          </span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 uppercase font-bold">Продажа</p>
                        <p className="text-sm font-extrabold text-gray-700">{product.salePrice}</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleOpenModal(product.title, `Расчет: ${product.title}`, "Инженер подготовит полную спецификацию по этой категории оборудования и пришлет КП на WhatsApp.")}
                      className="w-full bg-gray-900 hover:bg-brand hover:text-gray-900 text-white font-bold py-2.5 rounded-lg transition-colors text-xs flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <Calculator className="w-3.5 h-3.5" />
                      <span>Заказать расчет</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Logistics & Fleet Section */}
      <section id="fleet" className="py-16 bg-slate-bg text-white relative">
        <div className="absolute inset-0 z-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand font-bold text-xs uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/10">Логистика</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">Собственная транспортная логистика</h2>
            <p className="text-gray-300 mt-4">Никаких задержек по вине сторонних служб. Наш собственный автопарк доставляет и забирает опалубку в круглосуточном режиме.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-gray-900/80 border border-white/5 rounded-2xl p-6 hover:border-brand/50 transition-all flex flex-col justify-between">
              <div>
                <div className="bg-brand/10 text-brand w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4">
                  <Truck className="w-8 h-8 text-brand" />
                </div>
                <h3 className="font-extrabold text-lg text-white mb-2">Тяжелые Шаланды</h3>
                <p className="text-xs text-gray-400 mb-4">2 единицы в постоянном дежурстве. Идеально подходят для крупных партий стеновых щитов и объемной опалубки.</p>
              </div>
              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-xs text-gray-500 font-bold">Грузоподъемность:</span>
                <span className="text-xs font-bold text-brand">20 000 кг</span>
              </div>
            </div>

            <div className="bg-gray-900/80 border border-white/5 rounded-2xl p-6 hover:border-brand/50 transition-all flex flex-col justify-between">
              <div>
                <div className="bg-brand/10 text-brand w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4">
                  <Settings className="w-8 h-8 text-brand" />
                </div>
                <h3 className="font-extrabold text-lg text-white mb-2">Манипуляторы с КМУ</h3>
                <p className="text-xs text-gray-400 mb-4">Машины 10-тонного класса с крано-манипуляторной установкой. Самостоятельно привезем, разгрузим на площадке.</p>
              </div>
              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-xs text-gray-500 font-bold">Тип разгрузки:</span>
                <span className="text-xs font-bold text-brand">Собственный кран</span>
              </div>
            </div>

            <div className="bg-gray-900/80 border border-white/5 rounded-2xl p-6 hover:border-brand/50 transition-all flex flex-col justify-between">
              <div>
                <div className="bg-brand/10 text-brand w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4">
                  <Truck className="w-8 h-8 text-brand" />
                </div>
                <h3 className="font-extrabold text-lg text-white mb-2">Грузовые Газели</h3>
                <p className="text-xs text-gray-400 mb-4">Несколько маневренных бортовых Газелей для быстрого перемещения средних объемов лесов, балок БДК, фанеры.</p>
              </div>
              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-xs text-gray-500 font-bold">Время подачи:</span>
                <span className="text-xs font-bold text-brand">В день заказа</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Interactive Calculator Section */}
      <section id="calculator" className="py-16 bg-gray-50 text-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-brand font-bold text-xs uppercase tracking-widest bg-brand-light px-3 py-1 rounded-full">Умный расчет</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3">Онлайн калькулятор аренды и продажи</h2>
            <p className="text-gray-600 mt-3 text-sm">Рассчитайте ориентировочный бюджет на оборудование. Для детальной сметы прикрепите КЖ/АР чертеж в форме.</p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100 max-w-5xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Calculator Settings panel */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Sale / Rent Switch */}
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Выберите услугу:</span>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setCalcService("rent")}
                      className={`relative rounded-xl p-4 flex items-center justify-center cursor-pointer transition-all border-2 font-bold text-sm ${
                        calcService === "rent" ? "bg-gray-50 border-brand text-gray-950" : "bg-gray-50 border-gray-200 text-gray-600"
                      }`}
                    >
                      Аренда оборудования
                    </button>
                    <button 
                      onClick={() => setCalcService("sale")}
                      className={`relative rounded-xl p-4 flex items-center justify-center cursor-pointer transition-all border-2 font-bold text-sm ${
                        calcService === "sale" ? "bg-gray-50 border-brand text-gray-950" : "bg-gray-50 border-gray-200 text-gray-600"
                      }`}
                    >
                      Покупка оборудования
                    </button>
                  </div>
                </div>

                {/* Construction Equipment Selection buttons */}
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Тип оборудования / конструкции:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { key: "wall", label: "Стены (Крупнощит/МСК)" },
                      { key: "slab", label: "Перекрытия (CupLock)" },
                      { key: "column", label: "Колонны" },
                      { key: "scaffold", label: "Строительные леса" },
                      { key: "beams", label: "Балка БДК / Фанера" },
                      { key: "tmo", label: "Станки / ТМО" }
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => setCalcType(item.key as CalcType)}
                        className={`relative rounded-xl p-3 text-center cursor-pointer transition-colors block border font-bold text-xs ${
                          calcType === item.key ? "bg-gray-50 border-brand text-gray-950" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Area volume slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    <span>Требуемый объем / площадь ({getUnitSymbol(calcType)}):</span>
                    <span className="text-brand text-sm font-black">{calcArea} {getUnitSymbol(calcType)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="3000" 
                    step="10" 
                    value={calcArea} 
                    onChange={(e) => setCalcArea(parseInt(e.target.value))}
                    className="w-full accent-brand bg-gray-200 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>10 {getUnitSymbol(calcType)}</span>
                    <span>1 500 {getUnitSymbol(calcType)}</span>
                    <span>3 000 {getUnitSymbol(calcType)}</span>
                  </div>
                </div>

                {/* Rent duration (Only shown for rent) */}
                {calcService === "rent" && (
                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      <span>Срок аренды (мес.):</span>
                      <span className="text-brand text-sm font-black">{calcDuration} {getMonthsWord(calcDuration)}</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="12" 
                      step="1" 
                      value={calcDuration} 
                      onChange={(e) => setCalcDuration(parseInt(e.target.value))}
                      className="w-full accent-brand bg-gray-200 h-2 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>1 мес.</span>
                      <span>6 мес.</span>
                      <span>12 мес.</span>
                    </div>
                  </div>
                )}

              </div>

              {/* Calculator Results block */}
              <div className="lg:col-span-5 bg-slate-bg text-white border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-lg text-white mb-6 flex items-center">
                    Спецификация (Ориентировочная):
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm border-b border-white/10 pb-3">
                      <span className="text-gray-400">Стоимость комплекта:</span>
                      <span className="font-bold text-white">{baseCost.toLocaleString("ru-RU")} ₽</span>
                    </div>
                    <div className="flex justify-between text-sm border-b border-white/10 pb-3">
                      <span className="text-gray-400">Доставка:</span>
                      <span className={`font-semibold ${isFreeDelivery ? "text-green-400" : "text-gray-200"}`}>
                        {deliveryNote}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm border-b border-white/10 pb-3">
                      <span className="text-gray-400">Инженерная 3D раскладка:</span>
                      <span className="font-semibold text-green-400">0 ₽ <del className="text-xs text-gray-500 font-light ml-1.5">6 000 ₽</del></span>
                    </div>
                    
                    <div className="pt-2">
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Итоговая сумма:</p>
                      <div className="text-3xl sm:text-4xl font-black text-brand">{baseCost.toLocaleString("ru-RU")} ₽</div>
                      <p className="text-[10px] text-gray-500 mt-2">*Точная сумма рассчитывается инженером после раскладки деталей замков, балок и комплектующих.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <button 
                    onClick={handleCalculatorFormSubmit}
                    className="w-full bg-brand hover:bg-brand-dark text-gray-900 font-black text-center py-4 rounded-xl transition-all shadow-lg text-sm sm:text-base cursor-pointer"
                  >
                    Зафиксировать цену и получить КП
                  </button>
                  <span className="block text-center text-xs text-gray-400">Вышлем расчет на WhatsApp или Telegram за 10 минут</span>
                </div>

              </div>
              
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Quiz Segment */}
      <section id="quiz" className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 sm:p-12 shadow-xl max-w-4xl mx-auto relative overflow-hidden">
            
            {/* Present Banner inside Quiz */}
            <div className="bg-brand/10 border-l-4 border-brand p-4 mb-8 flex items-center space-x-4">
              <div className="text-2xl text-brand shrink-0"><Gift className="w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Гарантированный подарок за прохождение:</h4>
                <p className="text-xs text-gray-600">Купон на скидку 10% на первый месяц аренды опалубки + Полный каталог оборудования в PDF.</p>
              </div>
            </div>

            {/* Progress indicator bar */}
            <div className="mb-8">
              <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                <span>Опрос по спецификации проекта</span>
                <span>Шаг {quizStep} из 3</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-brand h-full transition-all duration-500" 
                  style={{ width: `${quizStep === 1 ? 33 : quizStep === 2 ? 66 : 100}%` }}
                ></div>
              </div>
            </div>

            {/* Quiz Step 1 */}
            {quizStep === 1 && (
              <div className="animate-fade-in">
                <h3 className="text-lg sm:text-2xl font-black text-gray-900 mb-6">Какое именно монолитное оборудование необходимо на вашем объекте?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    "Опалубка стен (Крупнощит / МСК)",
                    "Перекрытия (Телескопы / CupLock)",
                    "Строительные леса / Фанера",
                    "Станки ТМО / Резка арматуры"
                  ].map((option) => (
                    <div 
                      key={option}
                      onClick={() => selectQuizOption(1, option)}
                      className="border-2 border-gray-200 hover:border-brand bg-white rounded-2xl p-5 text-center cursor-pointer transition-all hover:shadow-md"
                    >
                      <span className="font-bold text-xs sm:text-sm block">{option}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz Step 2 */}
            {quizStep === 2 && (
              <div className="animate-fade-in">
                <h3 className="text-lg sm:text-2xl font-black text-gray-900 mb-6 font-sans">Каковы масштабы строящегося объекта (ориентировочно)?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { title: "Частный коттедж", desc: "Монтаж без крана (МСК)" },
                    { title: "До 500 м²", desc: "Малые объемы" },
                    { title: "500 - 1500 м²", desc: "Промышленные объекты" },
                    { title: "1500 м²+", desc: "Масштабный монолит" }
                  ].map((option) => (
                    <div 
                      key={option.title}
                      onClick={() => selectQuizOption(2, option.title)}
                      className="border-2 border-gray-200 hover:border-brand bg-white rounded-2xl p-5 text-center cursor-pointer transition-all hover:shadow-md block"
                    >
                      <span className="font-black text-lg text-brand mb-1 block">{option.title}</span>
                      <span className="text-[10px] text-gray-500 block">{option.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz Step 3 - Contacts Form */}
            {quizStep === 3 && (
              <div className="animate-fade-in">
                <h3 className="text-lg sm:text-2xl font-black text-gray-900 mb-2 text-center">Расчет спецификации запущен!</h3>
                <p className="text-sm text-gray-600 text-center mb-8">Куда направить готовую смету и зафиксировать скидку 10% на аренду?</p>
                
                <form onSubmit={submitQuiz} className="max-w-md mx-auto space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Ваше имя</label>
                    <input 
                      type="text" 
                      required 
                      value={quizAnswers.name}
                      onChange={(e) => setQuizAnswers(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Константин" 
                      className="w-full border-2 border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-brand bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Номер телефона</label>
                    <input 
                      type="tel" 
                      required 
                      value={quizAnswers.phone}
                      onChange={(e) => setQuizAnswers(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+7 (926) 999-99-99" 
                      className="w-full border-2 border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-brand font-semibold text-gray-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Куда отправить расчет?</label>
                    <select 
                      value={quizAnswers.contactType}
                      onChange={(e) => setQuizAnswers(prev => ({ ...prev, contactType: e.target.value }))}
                      className="w-full border-2 border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-brand font-medium bg-white"
                    >
                      <option value="WhatsApp">В WhatsApp (быстро в формате PDF)</option>
                      <option value="Telegram">В Telegram (активно)</option>
                      <option value="Call">Личный звонок инженера с озвучиванием сметы</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-brand hover:bg-brand-dark text-gray-900 font-extrabold py-4 rounded-xl shadow-lg transition-all text-base cursor-pointer">
                    Получить смету и подарок ➔
                  </button>
                </form>
              </div>
            )}

            {/* Quiz Navigation controls */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200/60">
              <button 
                onClick={() => quizStep > 1 && setQuizStep(quizStep - 1)} 
                className={`px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center space-x-1 cursor-pointer ${
                  quizStep === 1 ? "invisible" : ""
                }`}
              >
                <span>Назад</span>
              </button>
              <span className="text-xs text-gray-400">
                Завершено на {quizStep === 1 ? 33 : quizStep === 2 ? 66 : 100}%
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Brand Advantages Grid */}
      <section id="advantages" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand font-bold text-xs uppercase tracking-widest bg-brand-light px-3 py-1 rounded-full">Стандарты качества</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3">Почему монолитчики доверяют нам?</h2>
            <p className="text-gray-600 mt-4">Мы не просто сдаем в аренду металл — мы закрываем вашу потребность под ключ с инженерной точностью и оперативным сервисом.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="bg-brand/10 text-brand w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-gray-950 font-black" />
              </div>
              <h3 className="font-extrabold text-lg text-gray-900 mb-2">Чистая и готовая опалубка</h3>
              <p className="text-sm text-gray-600">Очищаем каждый элемент от остатков бетона, смазываем специальными составами и осуществляем дефектовку перед отгрузкой клиенту.</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="bg-brand/10 text-brand w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Gift className="w-6 h-6 text-gray-950 font-black" />
              </div>
              <h3 className="font-extrabold text-lg text-gray-900 mb-2">Выкуп БУ опалубки (Buy-Back)</h3>
              <p className="text-sm text-gray-600">Если вы приобрели опалубку под конкретный проект, после его окончания мы готовы выкупить её обратно с выгодой до 70% от первоначальной стоимости!</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="bg-brand/10 text-brand w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-gray-950 font-black" />
              </div>
              <h3 className="font-extrabold text-lg text-gray-900 mb-2">Прозрачный расчет с НДС</h3>
              <p className="text-sm text-gray-600">Работаем полностью официально с НДС, предоставляем весь пакет закрывающих документов. Смета остается неизменной после подписания договора.</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="bg-brand/10 text-brand w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Settings className="w-6 h-6 text-gray-950 font-black" />
              </div>
              <h3 className="font-extrabold text-lg text-gray-900 mb-2">Шеф-монтаж и поддержка 24/7</h3>
              <p className="text-sm text-gray-600">Наш инженер находится на связи с прорабом, осуществляет консультации по шеф-монтажу и оперативно решает вопросы по докомплектации.</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="bg-brand/10 text-brand w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-gray-950 font-black" />
              </div>
              <h3 className="font-extrabold text-lg text-gray-900 mb-2">Соответствие строгим ГОСТ</h3>
              <p className="text-sm text-gray-600">Все оборудование сертифицировано по ГОСТ РФ. Гарантируем идеальную геометрию монолитной плиты и отсутствие деформаций щитов.</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="bg-brand/10 text-brand w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-gray-950 font-black" />
              </div>
              <h3 className="font-extrabold text-lg text-gray-900 mb-2">Минимальный залог или без него</h3>
              <p className="text-sm text-gray-600">Для надежных строительных компаний предлагаем специальные доверительные условия аренды опалубки с минимальной залоговой стоимостью или без залога.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Contacts Layout Map & Coordinate forms */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-dark-bg text-white rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Detailed Location Address info */}
              <div className="lg:col-span-6 p-8 sm:p-12 space-y-6">
                <span className="text-brand font-bold text-xs uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/10">Контакты</span>
                <h2 className="text-3xl font-extrabold text-white font-sans">Ждем вас у нас на складе в Москве!</h2>
                <p className="text-gray-300 text-sm">Приезжайте лично, чтобы оценить качество очистки и смазки опалубочных систем, проверить толщину стали и познакомиться с нашими инженерами до заключения договора.</p>
                
                <div className="space-y-4 pt-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-brand/10 text-brand p-1.5 rounded-lg mt-0.5 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">Адрес главного склада:</h4>
                      <p className="text-xs text-gray-400 font-sans">г. Мытищи, Олимпийский пр-т., 56</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-brand/10 text-brand p-1.5 rounded-lg mt-0.5 shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">Многоканальный телефон:</h4>
                      <a href="tel:+79267301196" className="text-sm font-bold text-white hover:text-brand transition-colors">+7 (926) 730-11-96</a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-brand/10 text-brand p-1.5 rounded-lg mt-0.5 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">Почта для чертежей КЖ/АР:</h4>
                      <a href="mailto:mosopalubka-stroy@mail.ru" className="text-sm font-bold text-white hover:text-brand transition-colors">mosopalubka-stroy@mail.ru</a>
                    </div>
                  </div>
                </div>

                {/* Instant messengers trigger */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <a 
                    href="https://wa.me/79267301196" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="bg-[#25D366] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 hover:opacity-90 transition-opacity"
                  >
                    <span>Написать в WhatsApp</span>
                  </a>
                  <a 
                    href="https://t.me/ekozhemyako" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="bg-[#229ED9] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 hover:opacity-90 transition-opacity"
                  >
                    <span>Написать в Telegram (@ekozhemyako)</span>
                  </a>
                  <div className="bg-gray-800 text-gray-300 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 border border-white/10">
                    <span>МАКС: +7 (926) 730-11-96</span>
                  </div>
                </div>
              </div>

              {/* Graphical Map simulation with route getter button */}
              <div className="lg:col-span-6 bg-slate-800 min-h-[350px] relative flex flex-col justify-center items-center text-center p-8">
                <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="relative z-10 space-y-6">
                  <div className="bg-brand text-gray-900 w-16 h-16 rounded-full mx-auto flex items-center justify-center text-3xl shadow-xl animate-bounce">
                    📍
                  </div>
                  <h4 className="text-xl font-extrabold text-white">Интерактивная карта и схема заезда</h4>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto">Отгрузка со склада осуществляется круглосуточно по предварительно согласованным пропускам.</p>
                  <button 
                    onClick={() => handleOpenModal("Запрос схемы проезда", "Получить схему проезда", "Отправим прямую ссылку на Яндекс Навигатор и PDF с планом заезда тяжелого транспорта на склад.")}
                    className="bg-brand hover:bg-brand-dark text-gray-900 font-extrabold px-6 py-3.5 rounded-xl transition-all shadow-lg text-sm cursor-pointer"
                  >
                    Получить схему заезда на склад (PDF/Я.Карты)
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Footer Segment */}
      <footer className="bg-gray-950 text-gray-400 py-12 border-t border-gray-900 pb-28 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            <div className="space-y-4">
              <span className="text-lg font-black text-white">МОС<span className="text-brand">ОПАЛУБКА</span></span>
              <p className="text-xs text-gray-500 leading-relaxed">Поставка, выкуп и аренда высококачественного опалубочного оборудования 1-го класса для монолитного строительства в Москве и Московской области.</p>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-4">Навигация</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#about" className="hover:text-white transition-colors">О компании</a></li>
                <li><a href="#catalog" className="hover:text-white transition-colors">Каталог и Цены</a></li>
                <li><a href="#calculator" className="hover:text-white transition-colors">Калькулятор Аренды</a></li>
                <li><a href="#fleet" className="hover:text-white transition-colors">Наш Автопарк</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-4">Направления</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#catalog" onClick={() => setActiveTab("all")} className="hover:text-white transition-colors">Опалубка стен (Крупнощит / МСК)</a></li>
                <li><a href="#catalog" onClick={() => setActiveTab("rent")} className="hover:text-white transition-colors">Объемные леса CupLock и ХСИ</a></li>
                <li><a href="#catalog" onClick={() => setActiveTab("all")} className="hover:text-white transition-colors">Радиусная опалубка колонн</a></li>
                <li><a href="#catalog" onClick={() => setActiveTab("all")} className="hover:text-white transition-colors">Аренда ТМО и станков резки</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-4">Контакты</h4>
              <ul className="space-y-2 text-xs space-y-1">
                <li>📍 г. Мытищи, Олимпийский пр-т., 56</li>
                <li>📞 +7 (926) 730-11-96</li>
                <li>✉️ mosopalubka-stroy@mail.ru</li>
                <li>📱 Telegram: @ekozhemyako</li>
                <li>💬 WhatsApp: +7 (926) 730-11-96</li>
                <li>🕒 Работа склада: Круглосуточно</li>
              </ul>
            </div>

          </div>

          <div className="border-t border-gray-900 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-600">
            <p>© {new Date().getFullYear()} МОСОПАЛУБКА. Все права защищены. Информация на сайте не является публичной офертой.</p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <span className="hover:text-gray-400 transition-colors cursor-pointer">Политика конфиденциальности</span>
              <span className="hover:text-gray-400 transition-colors cursor-pointer">Согласие на обработку данных</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Universal Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-gray-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl border-t-4 border-brand">
            
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 text-xl focus:outline-none cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">{modalData.title}</h3>
            <p className="text-xs text-gray-600 mb-6">{modalData.subtitle}</p>

            <form onSubmit={onModalSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Ваше имя</label>
                <input 
                  type="text" 
                  required 
                  value={modalData.name}
                  onChange={(e) => setModalData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Алексей" 
                  className="w-full border-2 border-gray-100 rounded-lg p-3 text-sm focus:outline-none focus:border-brand bg-white text-gray-950"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Номер телефона</label>
                <input 
                  type="tel" 
                  required 
                  value={modalData.phone}
                  onChange={(e) => setModalData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+7 (926) 000-00-00" 
                  className="w-full border-2 border-gray-100 rounded-lg p-3 text-sm focus:outline-none focus:border-brand font-semibold text-gray-900 bg-white"
                />
              </div>
              <div className="flex items-center space-x-2 text-[10px] text-gray-500">
                <input 
                  type="checkbox" 
                  required 
                  checked={modalData.emailChecked}
                  onChange={(e) => setModalData(prev => ({ ...prev, emailChecked: e.target.checked }))}
                  className="accent-brand" 
                />
                <span>Согласен на обработку персональных данных</span>
              </div>
              <button type="submit" className="w-full bg-brand hover:bg-brand-dark text-gray-900 font-extrabold py-3.5 rounded-lg shadow-md transition-colors text-sm cursor-pointer">
                Отправить заявку ➔
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toast.visible && (
        <div className="fixed bottom-5 right-5 z-50 bg-gray-900 text-white border-l-4 border-brand rounded-xl p-4 shadow-2xl flex items-center space-x-3 transition-all duration-300">
          <div className="bg-brand text-gray-900 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0">✓</div>
          <div>
            <h5 className="font-bold text-sm text-white">{toast.title}</h5>
            <p className="text-xs text-gray-300">{toast.desc}</p>
          </div>
        </div>
      )}

    </div>
  );
}
