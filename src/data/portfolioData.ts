export type Language = 'en' | 'tr';

export const portfolioData = {
    personal: {
        name: "Öznur Karahasan",
        email: "oznurkarahasann@gmail.com",
        social: {
            github: "https://github.com/oznurkarahasan",
            linkedin: "https://linkedin.com/in/oznurkarahasan",
            medium: "https://medium.com/@oznurkarahasann"
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
            subBio: "From creating voice-controlled kitchen assistants to developing vehicle tracking and mapping systems, I focus on solving real-world problems with innovative technology stacks like Python, Django, and Generative AI.",
            techTitle: "Tech Stack"
        },
        experience: [
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
                    title: "Danilo: Voice Kitchen Assistant",
                    description: "An AI-powered voice assistant for the kitchen. Uses Adaptive RAG architecture and FAISS for semantic search to provide personalized recipe guidance.",
                    techStack: ["Python", "Django", "GPT-4o", "FAISS", "RAG"],
                    link: "#"
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
                    techStack: ["Flutter", "Dart", "ARCore", "ARKit", "BLE"],
                    link: "https://github.com/oznurkarahasan/ESP32-Indoor-GPS-system.git"
                },
                {
                    title: "DualFlow",
                    description: "A virtual fluid physics engine simulating a 'digital water balance'. Responds to inertia and momentum through motion-based input.",
                    techStack: ["C++", "Raspberry Pi Pico", "MPU6050", "I2C"],
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
                    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"],
                    link: "https://github.com/oznurkarahasan/my-ai-portfolio"
                }
            ]
        },
        blog: {
            title: "Latest Articles",
            readMore: "Read on Medium",
            items: [
                {
                    title: "GPS-Based Mapping and Path Planning System with C++: An Integrated Solution for Real-Time Navigation",
                    summary: "This study presents the design and implementation of a GPS-based mapping and path planning system developed using the C++ programming language. The system receives GPS data via the MAVLink protocol, performs noise reduction using a Kalman filter, stores route information in an SQLite database, and provides real-time map visualization with the OpenCV library. Optimal path planning using the A* algorithm is also integrated into the system. The developed system addresses the critical need for real-time localization and path planning, which is crucial for autonomous vehicles, drone navigation, and robotic applications.",
                    link: "https://medium.com/@oznurkarahasann/gps-based-mapping-and-path-planning-system-with-c-an-integrated-solution-for-real-time-c0598b12c81e"
                },
                {
                    title: "Flutter & BLE: The Future of Indoor Navigation",
                    summary: "Challenges and solutions in creating accessible navigation apps for the visually impaired.",
                    link: "#"
                },
                {
                    title: "Integrating Hardware with Software: A Pi Pico Guide",
                    summary: "Getting started with MPU6050 sensors and data processing on microcontrollers.",
                    link: "https://medium.com/@oznurkarahasann/motion-driven-light-water-physics-pi-pico-dual-core-f170fa815a83"
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
            initialMessage: "Hi! I'm the AI Assistant. Ask me about my projects like 'Danilo' or my experience with Flutter and IoT.",
            placeholder: "Ask about the projects...",
            thinking: "Processing..."
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
            subBio: "Sesli mutfak asistanlarından araç takip ve haritalama sistemlerine kadar, Python, Django ve Üretken Yapay Zeka gibi modern teknolojileri kullanarak gerçek dünya problemlerine çözümler üretiyorum.",
            techTitle: "Teknoloji Yığınım"
        },
        experience: [
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
                    title: "Danilo: Sesli Mutfak Asistanı",
                    description: "Mutfaklar için geliştirilmiş yapay zeka asistanı. Kişiselleştirilmiş tarif rehberliği için Adaptive RAG mimarisi ve FAISS kullanır.",
                    techStack: ["Python", "Django", "GPT-4o", "FAISS", "RAG"],
                    link: "#"
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
                    techStack: ["Flutter", "Dart", "ARCore", "ARKit", "BLE"],
                    link: "https://github.com/oznurkarahasan/ESP32-Indoor-GPS-system.git"
                },
                {
                    title: "DualFlow",
                    description: "Dijital su dengesini simüle eden sanal akışkan fiziği motoru. Hareket bazlı girdilere (atalet/momentum) gerçek zamanlı tepki verir.",
                    techStack: ["C++", "Raspberry Pi Pico", "MPU6050", "I2C"],
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
                    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"],
                    link: "https://github.com/oznurkarahasan/my-ai-portfolio"
                }
            ]
        },
        blog: {
            title: "Son Yazılarım",
            readMore: "Medium'da Oku",
            items: [
                {
                    title: "LIO-SAM Kurulumu ve Çalıştırma Rehberi",
                    summary: "ROS 2 Humble ortamında LIO-SAM (LIDAR Inertial Odometry via Smoothing and Mapping) kurulumunu ve çalıştırılmasını adım adım açıklar. Aşağıdaki talimatlar, Ubuntu 22.04 üzerinde test edilmiştir ve GTSAM kütüphanesi ile LIO-SAM’in ROS 2 ile uyumlu bir şekilde çalışmasını sağlar.",
                    link: "https://medium.com/@oznurkarahasann/lio-sam-kurulumu-ve-%C3%A7al%C4%B1%C5%9Ft%C4%B1rma-rehberi-9b895e929806"
                },
                {
                    title: "Flutter ve BLE: İç Mekan Navigasyonunun Geleceği",
                    summary: "Görme engelliler için erişilebilir uygulamalar geliştirirken karşılaşılan zorluklar ve çözümler.",
                    link: "https://medium.com/@oznurkarahasann"
                },
                {
                    title: "Yazılımı Donanımla Birleştirmek: Pi Pico Rehberi",
                    summary: "Mikrodenetleyicilerde MPU6050 sensör verilerini okuma ve işleme üzerine teknik bir bakış.",
                    link: "https://medium.com/@oznurkarahasann"
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
            initialMessage: "Merhaba! Ben AI Asistanım. Bana 'Danilo' projesini, Flutter deneyimimi veya gömülü sistem projelerimi sorabilirsin.",
            placeholder: "Projeler hakkında sor...",
            thinking: "Düşünüyor..."
        }
    },
    skills: [
        "Python (Django/FastAPI/LightGBM)",
        "PHP (Laravel 12)",
        "C# (Entity Framework)",
        "Flutter / Dart",
        "React / Next.js 14",
        "Generative AI / RAG / FAISS",
        "Embedded Systems (Raspberry Pi Pico/ESP32)",
        "C++ / OpenCV / MAVLink",
        "Docker / n8n Automation",
        "SQL Server / PostgreSQL / MySQL"
    ],
    systemPrompt: `You are an AI assistant for a Full Stack Developer & IoT Engineer's portfolio.
  Your goal is to answer visitor questions professionally, technically accurate, yet strictly based on the provided data.
  
  **Profile Summary:**
  The developer specializes in merging software with hardware. Key areas: Generative AI (RAG), Mobile Dev (Flutter), and Embedded Systems.
  
  **Key Projects to Mention:**
  1. **Danilo:** A Voice Kitchen Assistant using Python, Django, and Adaptive RAG architecture. It helps with cooking via voice commands.
  2. **Indoor Navigation:** A Flutter app for the visuallys impaired using BLE and AR for indoor navigation.
  3. **Embedded Works:** Experience with Raspberry Pi Pico, MPU6050 sensors, and C++/MicroPython.
  
  **Tone:**
  Friendly, "Geeky" but professional. Convince them that this developer is innovative and versatile.
  
  **Rules:**
  - If asked about "Project Management", mention their interest in Agile principles and real-world application.
  - If asked about contact, provide the following details: Email: oznurkarahasann@gmail.com, LinkedIn: https://linkedin.com/in/oznurkarahasan
  - If user speaks Turkish, reply in Turkish. If English, reply in English.
  `
};