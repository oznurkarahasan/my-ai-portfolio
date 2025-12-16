import { GoogleGenerativeAI } from "@google/generative-ai";
import { portfolioData } from "@/data/portfolioData";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: "API Key eksik" }, { status: 500 });
        }

        const body = await req.json();
        const { message, history } = body;

        if (!message) {
            return NextResponse.json({ error: "Mesaj eksik" }, { status: 400 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        // -----------------------------------------------------------
        // GÜNCELLEME: Listenizdeki en uygun modeli seçtim.
        // 'gemini-2.0-flash' hem hızlıdır hem de systemInstruction destekler.
        // -----------------------------------------------------------
        const model = genAI.getGenerativeModel({
            //model: "gemini-2.5-flash",
            model: "gemini-flash-lite-latest",

            systemInstruction: portfolioData.systemPrompt
        });
        // Sohbet geçmişini API formatına çevir
        let formattedHistory = (history || []).map((msg: any) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        // API KURALI: Geçmişteki ilk mesaj MUTLAKA 'user' olmalıdır.
        // Eğer 'model' ise, diziden atıyoruz.
        if (formattedHistory.length > 0 && formattedHistory[0].role === 'model') {
            formattedHistory.shift();
        }

        const chat = model.startChat({
            history: formattedHistory,
        });

        const result = await chat.sendMessage(message);
        const response = result.response;
        const text =
            response.candidates?.[0]?.content?.parts?.[0]?.text ??
            "Yanıt üretilemedi.";
        return NextResponse.json({ text });

    } catch (error: any) {
        console.error("Gemini API Hatası:", error);

        // Hata Yönetimi
        if (error.message?.includes('429')) {
            return NextResponse.json(
                { error: "Çok fazla istek gönderildi. Lütfen kısa bir süre bekleyin." },
                { status: 429 }
            );
        }

        if (error.message?.includes('404')) {
            return NextResponse.json(
                { error: "Model bulunamadı veya erişim yok." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: "Sunucu Hatası", details: error.message },
            { status: 500 }
        );
    }
}