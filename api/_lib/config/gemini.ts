import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.6-flash';

if (!GEMINI_API_KEY) {
  // eslint-disable-next-line no-console
  console.warn('[gemini] Missing GEMINI_API_KEY — the AI Support endpoint will fail until it is set.');
}

export interface GeminiChatMessage {
  role: 'user' | 'model';
  text: string;
}

const SYSTEM_PROMPT =
  'Bạn là trợ lý AI hỗ trợ chủ nhà (host) quản lý homestay MaokiHouse tại Sài Gòn. ' +
  'Trả lời ngắn gọn, thực tế, bằng tiếng Việt. Bạn có thể giúp soạn phản hồi cho khách, ' +
  'gợi ý cách xử lý tình huống vận hành, tóm tắt thông tin, hoặc tư vấn chung về quản lý cho thuê ngắn hạn. ' +
  'Nếu được hỏi về số liệu cụ thể (doanh thu, booking...) mà bạn không có dữ liệu thật, hãy nói rõ là bạn không có quyền truy cập số liệu đó thay vì bịa ra.';

export async function generateGeminiReply(history: GeminiChatMessage[]): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured on the server');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: history.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(`Gemini API error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const reply = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || '').join('') || '';

  if (!reply) {
    throw new Error('Gemini API returned an empty response');
  }

  return reply;
}
