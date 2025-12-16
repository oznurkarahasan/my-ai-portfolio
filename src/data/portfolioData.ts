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
            subBio: "From creating voice-controlled kitchen assistants to developing bio-acoustic monitoring systems, I focus on solving real-world problems with innovative technology stacks like Python, Django, and Generative AI.",
            techTitle: "Tech Stack"
        },
        projects: {
            title: "Featured Projects",
            viewProject: "View Details",
            items: [
                {
                    title: "Danilo: Voice Kitchen Assistant",
                    description: "An AI-powered voice assistant for the kitchen. It uses Adaptive RAG architecture and FAISS for semantic search to provide personalized recipe guidance.",
                    techStack: ["Python", "Django", "OpenAI GPT-4o", "FAISS", "RAG"],
                    link: "#"
                },
                {
                    title: "Building Indoor Navigation",
                    description: "A mobile application designed for the visually impaired using Flutter. It utilizes BLE beacons and AR technology to provide precise indoor audio navigation.",
                    techStack: ["Flutter", "Dart", "BLE", "Augmented Reality"],
                    link: "#"
                },
                {
                    title: "Pico IMU Sensor Integration",
                    description: "Motion tracking project using Raspberry Pi Pico and MPU6050 sensors, capable of processing real-time orientation data.",
                    techStack: ["C++", "MicroPython", "Raspberry Pi Pico", "I2C"],
                    link: "#"
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
                    link: "#"
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
            subBio: "Sesli mutfak asistanlarından biyo-akustik izleme sistemlerine kadar, Python, Django ve Üretken Yapay Zeka gibi modern teknolojileri kullanarak gerçek dünya problemlerine çözümler üretiyorum.",
            techTitle: "Teknoloji Yığınım"
        },
        projects: {
            title: "Öne Çıkan Projeler",
            viewProject: "Projeyi Gör",
            items: [
                {
                    title: "Danilo: Sesli Mutfak Asistanı",
                    description: "Mutfaklar için geliştirilmiş yapay zeka asistanı. Kişiselleştirilmiş tarifler sunmak için Adaptive RAG mimarisi ve FAISS vektör veritabanı kullanır.",
                    techStack: ["Python", "Django", "OpenAI GPT-4o", "FAISS", "RAG"],
                    link: "#"
                },
                {
                    title: "Bina İçi Navigasyon",
                    description: "Görme engelliler için Flutter ile geliştirilen erişilebilirlik uygulaması. BLE beacon'lar ve AR teknolojisi kullanarak hassas sesli yönlendirme sağlar.",
                    techStack: ["Flutter", "Dart", "BLE", "Artırılmış Gerçeklik"],
                    link: "#"
                },
                {
                    title: "Pico IMU Sensör Entegrasyonu",
                    description: "Raspberry Pi Pico ve MPU6050 sensörleri kullanılarak geliştirilen, gerçek zamanlı hareket verisi işleme ve yönelim hesaplama projesi.",
                    techStack: ["C++", "MicroPython", "Raspberry Pi Pico", "I2C"],
                    link: "#"
                }
            ]
        },
        blog: {
            title: "Son Yazılarım",
            readMore: "Medium'da Oku",
            items: [
                {
                    title: "Python ile Adaptive RAG Sistemleri Kurmak",
                    summary: "Bağlam farkındalığına sahip AI asistanlar için FAISS ve OpenAI kullanarak RAG mimarisi nasıl uygulanır?",
                    link: "https://medium.com/@oznurkarahasann"
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
        "Python (Django/FastAPI)",
        "Flutter / Dart",
        "React / Next.js",
        "Generative AI / RAG / FAISS",
        "Embedded Systems (Raspberry Pi/Arduino)",
        "Machine Learning (Logistic Regression)",
        "C++ / MicroPython",
        "Linux / Bash Scripting",
        "Tailwind CSS"
    ],
    systemPrompt: `You are an AI assistant for a Full Stack Developer & IoT Engineer's portfolio.
  Your goal is to answer visitor questions professionally, technically accurate, yet strictly based on the provided data.
  
  **Profile Summary:**
  The developer specializes in merging software with hardware. Key areas: Generative AI (RAG), Mobile Dev (Flutter), and Embedded Systems.
  
  **Key Projects to Mention:**
  1. **Danilo:** A Voice Kitchen Assistant using Python, Django, and Adaptive RAG architecture. It helps with cooking via voice commands.
  2. **Binaural Navigation:** A Flutter app for the visuallys impaired using BLE and AR for indoor navigation.
  3. **Embedded Works:** Experience with Raspberry Pi Pico, MPU6050 sensors, and C++/MicroPython.
  
  **Tone:**
  Friendly, "Geeky" but professional. Convince them that this developer is innovative and versatile.
  
  **Rules:**
  - If asked about "Project Management", mention their interest in Agile principles and real-world application.
  - If asked about contact, provide the following details: Email: oznurkarahasann@gmail.com, LinkedIn: https://linkedin.com/in/oznurkarahasan
  - If user speaks Turkish, reply in Turkish. If English, reply in English.
  `
};