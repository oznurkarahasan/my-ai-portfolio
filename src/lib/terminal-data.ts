export interface FileSystemNode {
    name: string;
    type: 'file' | 'directory';
    content?: string;
    children?: FileSystemNode[];
}

export const fileSystem: FileSystemNode[] = [
    {
        name: 'projects',
        type: 'directory',
        children: [
            {
                name: 'wastewater-predictive-maintenance.md',
                type: 'file',
                content: `### Wastewater Predictive Maintenance
Machine Learning project focused on predicting maintenance needs for wastewater treatment.
- **Tech:** Python, LightGBM, Pandas, Scikit-learn.
- **Goal:** Analyzing sensor data to prevent system failures.
- **Repo:** https://github.com/oznurkarahasan/wastewater-predictive-maintenance`
            },
            {
                name: 'vehicle-tracking-and-mapping-with-c.md',
                type: 'file',
                content: `### Vehicle-tracking-and-mapping-with-C
A real-time vehicle tracking and mapping system that delivers accurate location data, route planning, and area coverage analysis, with refined positioning and intelligent path planning, and support for drone integration across multiple platforms.
- **Tech:** C++, OpenCV, SQLite, A* Algorithm.
- **Features:** Real-time vehicle tracking, route planning, area coverage analysis, refined positioning, intelligent path planning, drone integration.
- **Repo:** https://github.com/oznurkarahasan/Vehicle-tracking-and-mapping-with-C-.git`
            },
            {
                name: 'indoor-navigation-system.md',
                type: 'file',
                content: `### ESP32-Indoor-GPS-system
Flutter-based indoor navigation system. It uses Bluetooth Low Energy (BLE) signals for location detection and guides the user using AR (Augmented Reality) technology. 
- **Tech:** Flutter, Dart, ARCore, ARKit.
- **Repo:** https://github.com/oznurkarahasan/indoor-navigation-system-qrcode-augmented-reality`
            },
            {
                name: 'my-ai-portfolio.md',
                type: 'file',
                content: `### My AI Portfolio
This interactive Terminal/Shell based portfolio built with Next.js.
- **Tech:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion.
- **Repo:** https://github.com/oznurkarahasan/my-ai-portfolio`
            },
            {
                name: 'dual-flow.md',
                type: 'file',
                content: `### DualFlow
A virtual fluid physics engine that simulates an interactive “digital water balance,” responding in real time to inertia, momentum, and friction through motion-based input and dynamic light output.
- **Tech:** C++, Raspberry Pi Pico, MPU6050, 60 LEDs.
- **Features:** Real-time fluid simulation, interactive controls, responsive design.
- **Repo:** https://github.com/oznurkarahasan/DualFlow.git`
            },
            {
                name: 'stock-management-laravel.md',
                type: 'file',
                content: `### Restoran-Otomasyon-Sistemi
Restaurant Automation System digitizes ordering and management processes, enabling efficient data flow between staff roles to improve efficiency and customer satisfaction.- **Tech:** PHP, Laravel, MySQL, Bootstrap, AJAX.
- **Tech:** PHP, Laravel, MySQL, Bootstrap, AJAX.
- **Features:** Role-based access, real-time stock tracking, and secure authentication.
- **Repo:** https://github.com/oznurkarahasan/Restoran-Otomasyon-Sistemi.git`
            },
            {
                name: 'cinemood.md',
                type: 'file',
                content: `### CineMood
CineMood is a web application for discovering, searching, and recommending movies and series via TMDB integration. Users can create accounts, manage personal lists, and filter content by genre using a PHP-based frontend with a PostgreSQL database and static HTML/CSS/JS interface.
- **Tech:** PHP, PostgreSQL, Bootstrap, AJAX.
- **Features:** Movie & series discovery, personal list management, genre filtering, and secure authentication.
- **Repo:** https://github.com/oznurkarahasan/CineMood.git`
            },
            {
                name: 'ogrenci-not-kayit-sistemi.md',
                type: 'file',
                content: `### Ogrenci-not-kayit-sistemi
A WinForms application for managing student, department, course, and grade data using SQL Server, built with Entity Framework 6 (Database-First, EDMX) on .NET Framework 4.7.2.
- **Tech:** C#, SQL Server, Entity Framework 6, .NET Framework 4.7.2.
- **Features:** Student, department, course, and grade management.
- **Repo:** https://github.com/oznurkarahasan/Ogrenci-not-kayit-sistemi.git`
            }
        ]
    },
    {
        name: 'about.md',
        type: 'file',
        content: "# About Me\n\nHi! I am a Computer Engineering student passionate about AI and Software Development.\nI love building interactive and intelligent applications."
    },
    {
        name: 'experience.md',
        type: 'file',
        content: `### Intern Software Developer | Zerosoft
*August 2025 - November 2025*

- A QR code–based ordering and stock management system was developed using PHP (Laravel 12) and MySQL with role-based access control.
- Full-stack development experience was gained through MVC architecture, CRUD operations, database optimisation, and responsive UI with Bootstrap.
- The system's reliability and interactivity were enhanced through AJAX operations, CSRF protection and session-based activity control.

---

### Intern Computer Engineer | Posco Assan TST
*July 2024 - August 2024*

- A registration system was developed using Visual Studio and MSSQL to gain experience in database management and interface design.
- Database operations were handled with C# and Entity Framework (ORM), enabling efficient data processing and reporting through user-friendly interfaces.
- Practical experience was gained in network management, including switch/router configuration and TCP/IP protocols.`
    },
    {
        name: 'education.md',
        type: 'file',
        content: '### Zonguldak Bülent Ecevit University\n- Computer Engineering\n- GPA: 3.2/4.0'
    },
    {
        name: 'contact.md',
        type: 'file',
        content: "Email: oznurkarahasann@gmail.com\nGitHub: https://github.com/oznurkarahasan\nLinkedIn: https://linkedin.com/in/oznurkarahasan"
    },
    {
        name: 'skills.md',
        type: 'file',
        content: `# Technical Stack & Skills

## AI & Automation
- **AI Agents:** Developing AI agents integrated with web apps using **n8n** & **Docker**.
- **Machine Learning:** Predictive modeling with **Python**, **LightGBM**, and **Pandas**.

## Full-Stack Web Development
- **Backend:** PHP (**Laravel 12**), C# (**Entity Framework**), Java (OOP Principles).
- **Frontend:** Next.js, React, JavaScript, AJAX.
- **UI Frameworks:** Bootstrap (Responsive Design), Tailwind CSS.

## Mobile & IoT
- **Cross-Platform:** **Flutter & Dart** application development.
- **Hardware Integration:** IoT projects using **ESP32 Bluetooth module** & Flutter.

## Database Management
- **RDBMS:** MSSQL, MySQL, PostgreSQL.
- **Expertise:** Database design, optimization, and CRUD operations.

## Programming Languages
- **Advanced:** Python, C#, PHP, Java.
- **Core:** C, C++ (Systems & Embedded logic).

## DevOps & Tools
- **Containerization:** Docker.
- **Workflow:** n8n (Automation), Git, Visual Studio, VS Code.`
    }
];

export const neofetchArt = `
     (@@@@@@@@@@@)       oznur@OznurOS
   (@@@@@@@@@@@@@@@)     -------------
  @@ [---]   [---] @@    OS: Ubuntu 22.04 LTS (Web Edition)
  @@ ( o ) | ( o ) @@    Kernel: Neural Network
  @@\\      ^      /@@    Uptime: Forever
   @@'.   ---   .'@@     Shell: TypeScript / ZSH
     @'--.....--'@       Goal: Building AI Solutions
                         Status: Open to Collaboration
`;