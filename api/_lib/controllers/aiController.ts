import type { Request, Response, NextFunction } from 'express';
import { generateGeminiReply } from '../config/gemini';
import type { GeminiChatMessage } from '../config/gemini';
import { HomestayModel } from '../models/Homestay';
import { BookingModel } from '../models/Booking';
import { MessageThreadModel } from '../models/MessageThread';
import { RevenueEntryModel } from '../models/RevenueEntry';

async function buildSystemContext(hostId: string): Promise<string> {
  const [homestays, bookings, threads, revenue] = await Promise.all([
    HomestayModel.list().catch(() => []),
    BookingModel.list(hostId).catch(() => []),
    MessageThreadModel.list(hostId).catch(() => []),
    RevenueEntryModel.list(hostId).catch(() => []),
  ]);

  const today = new Date();
  const upcoming = bookings
    .filter((b) => new Date(b.checkIn) >= today && b.status !== 'cancelled')
    .sort((a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime())
    .slice(0, 15);

  const thisMonthRevenue = revenue
    .filter((r) => {
      const d = new Date(r.date);
      return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
    })
    .reduce((sum, r) => sum + (r.type === 'expense' ? -r.amount : r.amount), 0);

  const recentThreads = [...threads]
    .sort((a, b) => b.lastMessageAt - a.lastMessageAt)
    .slice(0, 10);

  const lines: string[] = [];

  lines.push('--- DỮ LIỆU THỰC TẾ CỦA MAOKIHOUSE (tính đến thời điểm hiện tại) ---');

  lines.push(`\nDanh sách phòng (${homestays.length}):`);
  if (homestays.length === 0) lines.push('(chưa có phòng nào)');
  homestays.forEach((h) => lines.push(`- ${h.title}: $${h.price}/đêm — ${h.description?.slice(0, 120) || ''}`));

  lines.push(`\nĐặt phòng sắp tới (${upcoming.length} gần nhất):`);
  if (upcoming.length === 0) lines.push('(không có đặt phòng sắp tới)');
  upcoming.forEach((b) =>
    lines.push(`- ${b.guestName} (${b.source}): ${b.checkIn} → ${b.checkOut}, trạng thái: ${b.status}, thanh toán: ${b.payoutAmount.toLocaleString('vi-VN')}đ`)
  );

  lines.push(`\nDoanh thu tháng này (ròng): ${thisMonthRevenue.toLocaleString('vi-VN')}đ`);

  lines.push(`\nTin nhắn khách gần đây (${recentThreads.length}):`);
  if (recentThreads.length === 0) lines.push('(chưa có tin nhắn nào)');
  recentThreads.forEach((t) => {
    const last = t.messages[t.messages.length - 1];
    lines.push(`- ${t.guestName} (${t.platform}): "${last?.text?.slice(0, 150) || ''}"`);
  });

  lines.push(
    '\nChỉ dùng đúng dữ liệu ở trên khi trả lời các câu hỏi liên quan đến phòng/booking/doanh thu/tin nhắn. ' +
      'Nếu dữ liệu ở trên không đủ để trả lời, hãy nói rõ là chưa có dữ liệu đó trong hệ thống thay vì bịa ra.'
  );

  return lines.join('\n');
}

export async function chat(req: Request, res: Response, next: NextFunction) {
  try {
    const { history } = req.body as { history?: GeminiChatMessage[] };

    if (!Array.isArray(history) || history.length === 0) {
      return res.status(400).json({ error: 'history must be a non-empty array' });
    }

    const hostId = req.user!.uid;
    const context = await buildSystemContext(hostId);
    const reply = await generateGeminiReply(history, context);
    res.json({ reply });
  } catch (error) {
    next(error);
  }
}
