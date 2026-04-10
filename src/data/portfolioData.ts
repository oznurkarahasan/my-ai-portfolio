export type Language = 'en' | 'tr';

export const portfolioData = {
    personal: {
        name: "Öznur Karahasan",
        email: "oznurkarahasann@gmail.com",
        social: {
            github: "https://github.com/oznurkarahasan",
            linkedin: "https://linkedin.com/in/oznurkarahasan",
            medium: "https://medium.com/@oznurkarahasann"
        },
        githubStats: {
            username: "oznurkarahasan",
            totalContributions: 482,
            stars: 12,
            forks: 8,
            streak: 14,
            level: 42,
            nextLevelXp: 500
        }
    },
    en: {
        hero: {
            title: "Full Stack Developer & IoT Engineer",
            cta: "View Projects",
            greeting: "Hello, I'm"
        },
        about: {
            title: "About Me",
            bio: "I am a developer who loves bridging the gap between software and the physical world. I specialize in building AI-powered assistants, mobile applications with Flutter, and embedded systems using Raspberry Pi/Arduino.",
            subBio: "From creating Edge AI presentation assistants to fine-tuning vision-language models and building local agent ecosystems, I focus on solving complex problems with technologies like Python, MS-Swift, and LangChain.",
            techTitle: "Tech Stack"
        },
        experience: [
            {
                company: "Kedy.ai",
                role: "C++ Intern",
                period: "December 2025 - Current",
                details: "Contributed to a cloud-native, GPU-accelerated video rendering engine developed with C++14, OpenGL, and FFmpeg."
            },
            {
                company: "Zerosoft",
                role: "Intern Software Developer",
                period: "August 2025 - November 2025",
                details: "Developed a QR-based stock management system using Laravel 12 and MySQL. Focused on MVC architecture, CRUD operations, and responsive UI with Bootstrap."
            },
            {
                company: "Posco Assan TST",
                role: "Intern Computer Engineer",
                period: "July 2024 - August 2024",
                details: "Built a registration system using C# and Entity Framework. Gained experience in network management (TCP/IP, Switch/Router configuration)."
            }
        ],
        projects: {
            title: "Featured Projects",
            viewProject: "View Details",
            items: [
                {
                    title: "Live Translate (Rust & AI)",
                    description: "An ultra-low latency, real-time speech transcription and translation system. Built with Rust for high-performance audio processing, it features real-time subtitle delivery and WebSocket-based AI integration.",
                    techStack: ["Rust", "Next.js", "WebSockets", "Groq", "Deepgram", "LLM"],
                    link: "https://github.com/oznurkarahasan/live-translate.git"
                },
                {
                    title: "AI-Powered Presentation Assistant",
                    description: "An intelligent system that analyzes real-time speech during presentations to automatically navigate slides, powered by Edge AI logic and a modern web stack.  ",
                    techStack: ["Next.js", "FastAPI", "RAG", "Whisper", "GPT-4o"],
                    link: "https://github.com/oznurkarahasan/ai-presentation-assistant.git"
                },
                {
                    title: "Local Agent Collective",
                    description: "A scalable ecosystem of multiple AI agents designed to run fully locally. It ensures total data privacy by utilizing local LLMs through Ollama and LangChain for task orchestration, eliminating the need for external cloud dependencies.",
                    techStack: ["Python", "FastAPI", "Ollama", "LangChain", "Docker"],
                    link: "https://github.com/oznurkarahasan/local-agent-collective.git"
                },
                {
                    title: "Analog Clock with ESP32 & NeoPixels",
                    description: "ESP32-based analog clock with NeoPixel LEDs. Features NTP time sync over WiFi, RTC backup, web interface control, LDR brightness auto-adjustment, and OTA updates.",
                    techStack: ["ESP32", "NeoPixel", "C++", "WiFi", "NTP", "RTC (DS3231)", "Web Interface"],
                    link: "https://github.com/oznurkarahasan/analog-clock.git"
                },
                {
                    title: "Flight Tracking",
                    description: "Automated flight price monitor that tracks airfares and sends email alerts upon price drops. Features Docker containerization and GitHub Actions for scheduled execution.",
                    techStack: ["Python", "JSON", "SMTP", "Docker", "GitHub Actions"],
                    link: "https://github.com/oznurkarahasan/flight-tracking.git"
                },
                {
                    title: "Danilo: Voice Kitchen Assistant",
                    description: "An AI-powered voice assistant for the kitchen. Uses Adaptive RAG architecture and FAISS for semantic search to provide personalized recipe guidance.",
                    techStack: ["Python", "Django", "GPT-4o", "FAISS", "RAG", "Generative AI"],
                    link: "https://github.com/oznurkarahasan/Danilo.git"
                },
                {
                    title: "LLM fine tuning with MS-Swift",
                    description: "End-to-end fine-tuning and deployment of the Qwen2-VL-7B-Instruct vision-language model using MS-Swift for high-accuracy traffic sign recognition.",
                    techStack: ["Python", "MS-Swift", "Fine-tuning", "Qwen2-VL", "Vision-Language Model", "Traffic Sign Recognition"],
                    link: "https://github.com/oznurkarahasan/llm-finetuning-swift.git"
                },
                {
                    title: "Wastewater Predictive Maintenance",
                    description: "Machine Learning project focused on predicting maintenance needs for wastewater treatment. Analyzes sensor data to prevent system failures.",
                    techStack: ["Python", "LightGBM", "Pandas", "Scikit-learn"],
                    link: "https://github.com/oznurkarahasan/wastewater-predictive-maintenance"
                },
                {
                    title: "Vehicle Tracking & Mapping (C++)",
                    description: "Real-time tracking and mapping system. Delivers accurate location data, route planning (A*), and drone integration support.",
                    techStack: ["C++", "OpenCV", "SQLite", "A* Algorithm"],
                    link: "https://github.com/oznurkarahasan/Vehicle-tracking-and-mapping-with-C-.git"
                },
                {
                    title: "Indoor Navigation (AR/BLE)",
                    description: "Flutter-based indoor navigation system for visually impaired. Uses BLE signals for detection and AR technology for guidance.",
                    techStack: ["Flutter", "Dart", "ARCore", "ARKit", "BLE", "Embedded Systems", "ESP32"],
                    link: "https://github.com/oznurkarahasan/ESP32-Indoor-GPS-system.git"
                },
                {
                    title: "DualFlow",
                    description: "A virtual fluid physics engine simulating a 'digital water balance'. Responds to inertia and momentum through motion-based input.",
                    techStack: ["C++", "Raspberry Pi Pico", "MPU6050", "I2C", "Embedded Systems"],
                    link: "https://github.com/oznurkarahasan/DualFlow.git"
                },
                {
                    title: "Restaurant Automation (Laravel)",
                    description: "Full-stack management system with role-based access, real-time stock tracking, and secure authentication.",
                    techStack: ["PHP", "Laravel", "MySQL", "Bootstrap", "AJAX"],
                    link: "https://github.com/oznurkarahasan/Restoran-Otomasyon-Sistemi.git"
                },
                {
                    title: "CineMood",
                    description: "Web application for discovering and recommending movies via TMDB integration. Features personal list management and genre filtering.",
                    techStack: ["PHP", "PostgreSQL", "Bootstrap", "AJAX"],
                    link: "https://github.com/oznurkarahasan/CineMood.git"
                },
                {
                    title: "Student Grade System",
                    description: "WinForms application for managing educational data using Entity Framework 6 (Database-First).",
                    techStack: ["C#", "SQL Server", "EF6", ".NET Framework"],
                    link: "https://github.com/oznurkarahasan/Ogrenci-not-kayit-sistemi.git"
                },
                {
                    title: "My AI Portfolio",
                    description: "This interactive Terminal/Shell based portfolio built with modern web technologies.",
                    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
                    link: "https://github.com/oznurkarahasan/my-ai-portfolio"
                }
            ]
        },
        blog: {
            title: "Latest Articles",
            readMore: "Read on Medium",
            items: [
                {
                    title: "GPS-Based Mapping and Path Planning System with C++",
                    summary: "Design and implementation of a GPS-based mapping system using C++, featuring Kalman filtering, SQLite storage, and A* path planning for autonomous navigation.",
                    link: "https://medium.com/@oznurkarahasann/gps-based-mapping-and-path-planning-system-with-c-an-integrated-solution-for-real-time-c0598b12c81e"
                },
                {
                    title: "Motion-Driven Light: Water Physics on Pi Pico Dual-Core",
                    summary: "Building a virtual fluid physics engine on Raspberry Pi Pico that simulates digital water balance through motion-based input and dynamic LED output.",
                    link: "https://medium.com/@oznurkarahasann/motion-driven-light-water-physics-pi-pico-dual-core-f170fa815a83"
                },
                {
                    title: "Anomaly Detection and Predictive Maintenance in Wastewater Treatment Plants",
                    summary: "Optimizing industrial processes at wastewater treatment plants to make a fundamental contribution to the Smart City ecosystem",
                    link: "https://medium.com/@oznurkarahasann/anomaly-detection-and-predictive-maintenance-in-wastewater-treatment-plants-aeddbfcad743"
                }
            ]
        },
        contact: {
            title: "Get in Touch",
            subtitle: "Have a project idea involving AI or IoT? Let's collaborate.",
            email: "Send Email",
            social: "Follow Me"
        },
        chatbot: {
            initialMessage: "Hi! I'm Olric. I'm here to help you explore Öznur's projects in AI, IoT, and Full Stack development. What are you interested in today?",
            placeholder: "Ask about the projects...",
            thinking: "Processing..."
        },
        sudoku: {
            title: "SUDOKU",
            challengeTitle: "Daily Challenge",
            controls: "Controls",
            backButton: "Back",
            resetBtn: "Reset",
            undoBtn: "Undo",
            verifyBtn: "Verify",
            processing: "Processing",
            difficulty: "Difficulty",
            easy: "Easy",
            medium: "Medium",
            hard: "Hard",
            levelSelection: "Level Selection",
            showAnswer: "Show Answer",
            hideAnswer: "Hide Answer",
            subtitle: "Challenge your mind with our AI-powered daily Sudoku puzzle.",
            aiTitle: "AI FEEDBACK",
            aiWaiting: "Waiting for your solution...",
            error: "An error occurred. Please try again."
        }
    },
    tr: {
        hero: {
            title: "Full Stack Geliştirici & IoT Mühendisi",
            cta: "Projeleri İncele",
            greeting: "Merhaba, ben"
        },
        about: {
            title: "Hakkımda",
            bio: "Yazılım dünyası ile fiziksel dünyayı birleştirmeyi seven bir mühendisim. Yapay zeka destekli asistanlar, Flutter ile mobil uygulamalar ve Raspberry Pi/Arduino tabanlı gömülü sistemler geliştirmek üzerine uzmanlaşıyorum.",
            subBio: "Edge AI sunum asistanlarından görüntü-dil modellerinin ince ayarına ve yerel ajan ekosistemlerine kadar, Python, MS-Swift ve LangChain gibi teknolojilerle karmaşık problemlere çözümler üretiyorum.",
            techTitle: "Teknoloji Yığınım"
        },
        experience: [
            {
                company: "Kedy.ai",
                role: "C++ Stajyeri",
                period: "Aralık 2025 - Şu anda",
                details: "C++14 , OpenGL, ve FFmpeg ile geliştirilen bir bulut-native, GPU-accelerated video rendering engine geliştirildi."
            },
            {
                company: "Zerosoft",
                role: "Stajyer Yazılım Geliştirici",
                period: "Ağustos 2025 - Kasım 2025",
                details: "Laravel 12 ve MySQL kullanarak QR kod tabanlı stok yönetim sistemi geliştirildi. MVC mimarisi ve Bootstrap ile duyarlı arayüz tasarımı üzerine odaklanıldı."
            },
            {
                company: "Posco Assan TST",
                role: "Stajyer Bilgisayar Mühendisi",
                period: "Temmuz 2024 - Ağustos 2024",
                details: "C# ve Entity Framework ile kayıt sistemi geliştirildi. Ağ yönetimi, Switch/Router konfigürasyonu ve TCP/IP protokollerinde deneyim kazanıldı."
            }
        ],
        projects: {
            title: "Öne Çıkan Projeler",
            viewProject: "Projeyi Gör",
            items: [
                {
                    title: "Canlı Çeviri(Rust & AI)",
                    description: "Yüksek performanslı ses işleme için Rust ile geliştirilmiş, ultra düşük gecikmeli, gerçek zamanlı konuşma transkripsiyonu ve çeviri sistemi. Gerçek zamanlı altyazı desteği ve WebSocket tabanlı yapay zeka entegrasyonu sunar.",
                    techStack: ["Rust", "Next.js", "WebSockets", "Groq", "Deepgram", "LLM"],
                    link: "https://github.com/oznurkarahasan/live-translate.git"
                },
                {
                    title: "Yapay Zeka Destekli Sunum Asistanı",
                    description: "Sunumlar sırasında konuşmayı gerçek zamanlı analiz ederek slaytları otomatik olarak yöneten, Edge AI mantığı ve modern bir web yığınıyla güçlendirilmiş akıllı bir sistem.",
                    techStack: ["Next.js", "FastAPI", "RAG", "Whisper", "GPT-4o"],
                    link: "https://github.com/oznurkarahasan/ai-presentation-assistant.git"
                },
                {
                    title: "Local Agent Collective",
                    description: "Tamamen yerel olarak çalışacak şekilde tasarlanmış, ölçeklenebilir bir çoklu yapay zeka ajanı ekosistemi. Ollama ve LangChain kullanarak, harici bulut bağımlılığı olmadan karmaşık görevleri koordine eder ve %100 veri gizliliği sağlar.",
                    techStack: ["Python", "FastAPI", "Ollama", "LangChain", "Docker"],
                    link: "https://github.com/oznurkarahasan/local-agent-collective.git"
                },
                {
                    title: "ESP32 ve NeoPixel ile Analog Saat",
                    description: "ESP32 ve NeoPixel LED'li analog saat. WiFi üzerinden NTP senkronizasyonu, RTC yedekleme, web arayüzü kontrolü ve LDR ile otomatik parlaklık sunar.",
                    techStack: ["ESP32", "NeoPixel", "C++", "WiFi", "NTP", "RTC (DS3231)", "Web Arayüzü"],
                    link: "https://github.com/oznurkarahasan/analog-clock.git"
                },
                {
                    title: "Uçuş Takip Sistemi",
                    description: "Uçak bileti fiyatlarını takip eden ve fiyat düştüğünde e-posta bildirimi gönderen otomatik izleme sistemi. Docker ve GitHub Actions ile zamanlanmış görev otomasyonu içerir.",
                    techStack: ["Python", "JSON", "SMTP", "Docker", "GitHub Actions"],
                    link: "https://github.com/oznurkarahasan/flight-tracking.git"
                },
                {
                    title: "Danilo: Sesli Mutfak Asistanı",
                    description: "Mutfaklar için geliştirilmiş yapay zeka asistanı. Kişiselleştirilmiş tarif rehberliği için Adaptive RAG mimarisi ve FAISS kullanır.",
                    techStack: ["Python", "Django", "GPT-4o", "FAISS", "RAG", "Generative AI"],
                    link: "https://github.com/oznurkarahasan/Danilo.git"
                },
                {
                    title: "MS-Swift ile LLM İnce Ayar (Fine-tuning)",
                    description: "MS-Swift kullanarak Qwen2-VL görüntü-dil modelinin trafik işareti tanıma için uçtan uca ince ayar (fine-tuning) ve dağıtım süreci.",
                    techStack: ["Python", "MS-Swift", "Fine-tuning", "Qwen2-VL", "Görüntü-Dil Modeli", "Trafik İşareti Tanıma"],
                    link: "https://github.com/oznurkarahasan/llm-finetuning-swift.git"
                },
                {
                    title: "Atıksu Tahminleyici Bakım",
                    description: "Arıtma sistemlerinde bakım ihtiyaçlarını tahmin etmeye odaklanan ML projesi. Sensör verilerini analiz ederek sistem arızalarını önler.",
                    techStack: ["Python", "LightGBM", "Pandas", "Scikit-learn"],
                    link: "https://github.com/oznurkarahasan/wastewater-predictive-maintenance"
                },
                {
                    title: "Araç Takip ve Haritalama (C++)",
                    description: "Gerçek zamanlı araç takip ve haritalama sistemi. Hassas konum verisi, rota planlama (A*) ve drone entegrasyonu sunar.",
                    techStack: ["C++", "OpenCV", "SQLite", "A* Algoritması"],
                    link: "https://github.com/oznurkarahasan/Vehicle-tracking-and-mapping-with-C-.git"
                },
                {
                    title: "Bina İçi Navigasyon (AR/BLE)",
                    description: "Görme engelliler için Flutter tabanlı navigasyon. Konum tespiti için BLE sinyallerini ve yönlendirme için AR teknolojisini kullanır.",
                    techStack: ["Flutter", "Dart", "ARCore", "ARKit", "BLE", "Embedded Systems", "ESP32"],
                    link: "https://github.com/oznurkarahasan/ESP32-Indoor-GPS-system.git"
                },
                {
                    title: "DualFlow",
                    description: "Dijital su dengesini simüle eden sanal akışkan fiziği motoru. Hareket bazlı girdilere (atalet/momentum) gerçek zamanlı tepki verir.",
                    techStack: ["C++", "Raspberry Pi Pico", "MPU6050", "I2C", "Embedded Systems"],
                    link: "https://github.com/oznurkarahasan/DualFlow.git"
                },
                {
                    title: "Restoran Otomasyonu (Laravel)",
                    description: "Rol tabanlı erişim, gerçek zamanlı stok takibi ve güvenli kimlik doğrulama içeren tam kapsamlı yönetim sistemi.",
                    techStack: ["PHP", "Laravel", "MySQL", "Bootstrap", "AJAX"],
                    link: "https://github.com/oznurkarahasan/Restoran-Otomasyon-Sistemi.git"
                },
                {
                    title: "CineMood",
                    description: "TMDB entegrasyonu ile film keşfetme ve önerme uygulaması. Kişisel liste yönetimi ve tür filtreleme özelliklerini içerir.",
                    techStack: ["PHP", "PostgreSQL", "Bootstrap", "AJAX"],
                    link: "https://github.com/oznurkarahasan/CineMood.git"
                },
                {
                    title: "Öğrenci Not Kayıt Sistemi",
                    description: "Entity Framework 6 kullanarak öğrenci, ders ve not verilerini yöneten WinForms uygulaması.",
                    techStack: ["C#", "SQL Server", "EF6", ".NET"],
                    link: "https://github.com/oznurkarahasan/Ogrenci-not-kayit-sistemi.git"
                },
                {
                    title: "Yapay Zeka Portfolyom",
                    description: "Modern web teknolojileri ile oluşturulmuş, etkileşimli Terminal/Shell tabanlı portfolyo sitesi.",
                    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
                    link: "https://github.com/oznurkarahasan/my-ai-portfolio"
                }
            ]
        },
        blog: {
            title: "Son Yazılarım",
            readMore: "Medium'da Oku",
            items: [
                {
                    title: "Atık Su Arıtma Tesislerinde Anomali Tespiti ve Arıza Tahmini",
                    summary: "Atık su arıtma tesislerinde anomali tespiti ve arıza tahmini için yapay zeka teknolojilerini kullanarak bir makine öğrenmesi modeli geliştirilmesi",
                    link: "https://medium.com/@oznurkarahasann/at%C4%B1k-su-ar%C4%B1tma-tesislerinde-anomali-tespiti-ve-ar%C4%B1za-tahmini-957967c9a8ad"
                },
                {
                    title: "ChatGPT Atlas: OpenAI’nin Yapay Zeka Web Tarayıcısı",
                    summary: "OpenAI'nin yapay zeka web tarayıcısı olan ChatGPT Atlas'ını inceleyerek, yapay zeka teknolojilerini kullanarak web tarayıcısı oluşturmayı amaçlıyor.",
                    link: "https://medium.com/@oznurkarahasann/chatgpt-atlas-openainin-yapay-zeka-web-taray%C4%B1c%C4%B1s%C4%B1-a6c10f900d40"
                },
                {
                    title: "LIO-SAM Kurulumu ve Çalıştırma Rehberi",
                    summary: "ROS 2 Humble ortamında LIO-SAM (LIDAR Inertial Odometry via Smoothing and Mapping) kurulumunu ve çalıştırılmasını adım adım açıklar.",
                    link: "https://medium.com/@oznurkarahasann/lio-sam-kurulumu-ve-%C3%A7al%C4%B1%C5%9Ft%C4%B1rma-rehberi-9b895e929806"
                },
                {
                    title: "Hareketle Çalışan Işık (Su Fiziği) — Pi Pico Çift Çekirdek",
                    summary: "Building a virtual fluid physics engine on Raspberry Pi Pico that simulates digital water balance through motion-based input and dynamic LED output.",
                    link: "https://medium.com/@oznurkarahasann/hareketle-%C3%A7al%C4%B1%C5%9Fan-i%C5%9F%C4%B1k-su-fizi%C4%9Fi-pi-pico-%C3%A7ift-%C3%A7ekirdek-b955a7b516ed"
                }
            ]
        },
        contact: {
            title: "İletişime Geç",
            subtitle: "Yapay zeka veya IoT içeren bir proje fikriniz mi var? Tanışalım.",
            email: "E-posta Gönder",
            social: "Takip Et"
        },
        chatbot: {
            initialMessage: "Selam! Ben Olric. Öznur'un yapay zeka, IoT ve Full Stack projelerini keşfetmene yardımcı olmak için buradayım. Bugün hangi alanla ilgileniyorsun?",
            placeholder: "Projeler hakkında sor...",
            thinking: "Düşünüyor..."
        },
        sudoku: {
            title: "SUDOKU",
            challengeTitle: "Günlük Challenge",
            controls: "Kontroller",
            backButton: "Geri Dön",
            resetBtn: "Sıfırla",
            undoBtn: "Geri Al",
            verifyBtn: "Doğrula",
            processing: "İşleniyor",
            difficulty: "Zorluk",
            easy: "Kolay",
            medium: "Orta",
            hard: "Zor",
            levelSelection: "Seviye Seçimi",
            showAnswer: "Cevabı Göster",
            hideAnswer: "Cevabı Gizle",
            subtitle: "Yapay zeka destekli günlük Sudoku bulmacamızla zihninizi zorlayın.",
            aiTitle: "AI FEEDBACK",
            aiWaiting: "Çözümünü bekliyorum...",
            error: "Sistemde bir hata oluştu. Lütfen tekrar deneyin."
        }
    },
    skills: [
        "Python (Django/FastAPI/MS-Swift)",
        "PHP (Laravel 12)",
        "C# (Entity Framework)",
        "Flutter / Dart / ARCore",
        "React / Next.js 15 / TypeScript",
        "Generative AI / RAG / Fine-tuning / LangChain",
        "Embedded Systems (ESP32/NeoPixel/Pi Pico)",
        "C++ / OpenCV / Edge AI",
        "SQL Server / PostgreSQL / MySQL",
        "Docker / Ollama / Linux"
    ],
    systemPrompt: `You are an AI assistant for a Full Stack Developer & IoT Engineer's portfolio.
  Your goal is to answer visitor questions professionally, technically accurate, yet strictly based on the provided data.
  
  **Profile Summary:**
  The developer specializes in merging software with hardware. Key areas: Generative AI (RAG), Mobile Dev (Flutter), and Embedded Systems.
  
  **Key Projects to Mention:**
  1. **Live Translate:** An ultra-low latency Rust-based speech translation system using Groq and Deepgram.
  2. **Precue.ai:** AI-Powered Presentation Assistant using Edge AI, Next.js, and FastAPI.
  3. **Local Agent Collective:** A fully local, privacy-guaranteed AI agent ecosystem using Ollama and LangChain.
  4. **Danilo:** A Voice Kitchen Assistant using Python, Django, and Adaptive RAG architecture.
  5. **Flight Tracking:** A Python automation tool for flight price monitoring with email alerts.
  6. **Indoor Navigation:** A Flutter app for the visually impaired using BLE and AR for indoor navigation.
  7. **Embedded Works:** Experience with ESP32 (NeoPixel Clock), Raspberry Pi Pico, and C++.
  
  **Tone:**
  Friendly, "Geeky" but professional. Convince them that this developer is innovative and versatile.
  
  **Rules:**
  - If asked about "Project Management", mention their interest in Agile principles and real-world application.
  - If asked about contact, provide the following details: Email: oznurkarahasann@gmail.com, LinkedIn: https://linkedin.com/in/oznurkarahasan
  - If user speaks Turkish, reply in Turkish. If English, reply in English.
  `
};