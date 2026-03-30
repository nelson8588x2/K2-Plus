import "dotenv/config";
import express from "express";

const app = express();

app.get("/session", async (req, res) => {
  try {
    const r = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-realtime-preview-2025-06-03", // 你要用的模型
	temperature: 0.6,
        voice: "alloy", // 或其他支援的 voice
	speed: 1.2,
        instructions: "You are a voice assistant named Nova. You must maintain a professional and accurate tone. Always respond clearly and concisely in English. If uncertain, reply with 'I don't know.",
        
	input_audio_noise_reduction: {
	  type: "far_field"
  	},

	input_audio_transcription: {
          model: "whisper-1" // 加上 Whisper 語音辨識
        },
	turn_detection: {
          type: "semantic_vad",
          create_response: true,
          interrupt_response: true
        }
      }),
    });
    const data = await r.json();
    res.send(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});