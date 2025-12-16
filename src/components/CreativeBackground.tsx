"use client";

import React, { useEffect, useRef } from "react";

export default function CreativeBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        // Fare konumu ve etkileşim yarıçapı
        const mouse = {
            x: -1000, // Başlangıçta ekran dışında
            y: -1000,
            radius: 150 // Etkileşim alanı büyüklüğü
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Mobilde daha az, masaüstünde daha çok parçacık (Performans için)
            const densityDivider = window.innerWidth < 768 ? 15000 : 9000;
            initParticles(densityDivider);
        };

        class Particle {
            x: number;
            y: number;
            directionX: number;
            directionY: number;
            size: number;
            color: string;
            baseColor: string;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                // Parçacık boyutu
                this.size = Math.random() * 2 + 1;
                // Hız (Rastgele yönler)
                this.directionX = (Math.random() * 2) - 1;
                this.directionY = (Math.random() * 2) - 1;

                // Renk paleti (Turuncu ve Gri tonları - AI temasına uygun)
                const colors = [
                    "rgba(234, 88, 12, ",  // Orange
                    "rgba(148, 163, 184, ", // Slate Gray
                    "rgba(56, 189, 248, "   // Light Blue (Aksan rengi)
                ];
                this.baseColor = colors[Math.floor(Math.random() * colors.length)];
                this.color = this.baseColor + "0.6)";
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                // Sınırlardan sekme mantığı
                if (this.x > canvas!.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas!.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }

                // Fare ile etkileşim (Kaçışma Efekti)
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    // Fareye çok yakınsa parçacığı it (daha büyük hale getirerek vurgula)
                    if (mouse.x < this.x && this.x < canvas!.width - this.size * 10) {
                        this.x += 3;
                    }
                    if (mouse.x > this.x && this.x > this.size * 10) {
                        this.x -= 3;
                    }
                    if (mouse.y < this.y && this.y < canvas!.height - this.size * 10) {
                        this.y += 3;
                    }
                    if (mouse.y > this.y && this.y > this.size * 10) {
                        this.y -= 3;
                    }
                }

                // Normal hareket
                this.x += this.directionX * 0.4; // Hızı biraz düşürdük, daha smooth olsun diye
                this.y += this.directionY * 0.4;

                this.draw();
            }
        }

        const initParticles = (densityDivider: number) => {
            particles = [];
            const numberOfParticles = (canvas.width * canvas.height) / densityDivider;
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        const connect = () => {
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
                        + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));

                    // Bağlantı mesafesi
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);

                        // Fareye yakın olan çizgiler daha parlak ve kalın olsun
                        const dx = mouse.x - particles[a].x;
                        const dy = mouse.y - particles[a].y;
                        const mouseDistance = Math.sqrt(dx * dx + dy * dy);

                        if (mouseDistance < 200) {
                            ctx.strokeStyle = `rgba(234, 88, 12, ${opacityValue + 0.2})`; // Parlak turuncu
                            ctx.lineWidth = 0.8;
                        } else {
                            ctx.strokeStyle = `rgba(148, 163, 184, ${opacityValue * 0.5})`; // Soluk gri
                            ctx.lineWidth = 0.4;
                        }

                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            connect();
            animationFrameId = requestAnimationFrame(animate);
        };

        // Event Listeners
        window.addEventListener("resize", resizeCanvas);

        // Mouse hareketi
        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.x;
            mouse.y = event.y;
        }

        // Dokunmatik ekran hareketi (Touch)
        const handleTouchMove = (event: TouchEvent) => {
            mouse.x = event.touches[0].clientX;
            mouse.y = event.touches[0].clientY;
        }

        // Fare ekrandan çıkarsa etkileşimi kaldır
        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        }

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('mouseout', handleMouseLeave);

        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('mouseout', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            // pointer-events-none: Kullanıcı arka plana tıklayamaz
            // bg-[#0c0a09]: Verdiğin özel koyu renk
            // bg-gradient-to-b from-[#0c0a09] to-black: O renkten tam siyaha hafif bir geçiş
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-gradient-to-b from-[#0c0a09] to-black"
        />
    );
}