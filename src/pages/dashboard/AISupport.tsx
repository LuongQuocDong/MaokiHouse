import { useState, useRef, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { auth } from '../../config/firebase';
import { aiService } from '../../services/aiService';
import type { AIChatMessage } from '../../services/aiService';

const SUGGESTED_PROMPTS = [
  'Tóm tắt tin nhắn khách hôm nay',
  'Gợi ý giá phòng cuối tuần',
  'Soạn phản hồi cho khách yêu cầu hoàn tiền',
  'Cách xử lý khi khách trả phòng trễ',
];

const AISupport = () => {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, sending]);

  const send = async (text: string) => {
    if (!text.trim() || !user || sending) return;

    const nextHistory: AIChatMessage[] = [...messages, { role: 'user', text: text.trim() }];
    setMessages(nextHistory);
    setInput('');
    setSending(true);

    try {
      const idToken = await user.getIdToken();
      const { reply } = await aiService.chat(idToken, nextHistory);
      setMessages((prev) => [...prev, { role: 'model', text: reply }]);
    } catch (error) {
      console.error(error);
      toast.error('Trợ lý AI hiện không phản hồi được. Vui lòng thử lại.');
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <div className="eyebrow">Trợ lý</div>
        <h1 className="font-display" style={{ fontSize: '1.9rem' }}>Hỗ trợ AI</h1>
      </div>

      <div className="elevated-card d-flex flex-column" style={{ height: '70vh', minHeight: 500 }}>
        <div className="flex-grow-1 overflow-auto p-4">
          {messages.length === 0 ? (
            <div className="text-center py-5">
              <div className="mb-3" style={{ fontSize: '2.5rem' }}>🤖</div>
              <p className="text-muted mb-4">Hỏi trợ lý AI bất cứ điều gì về vận hành homestay của bạn.</p>
              <div className="d-flex flex-wrap justify-content-center gap-2">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    className="px-3 py-2 border-0"
                    style={{ borderRadius: 999, background: 'var(--color-blush)', color: 'var(--color-ink)', fontSize: '0.9rem' }}
                    onClick={() => send(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {messages.map((m, i) => (
                <div key={i} className={`d-flex ${m.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                  <div
                    className="p-3"
                    style={{
                      maxWidth: '75%',
                      borderRadius: 14,
                      whiteSpace: 'pre-wrap',
                      background: m.role === 'user' ? 'var(--color-primary)' : 'var(--color-blush)',
                      color: m.role === 'user' ? '#fff' : 'var(--color-ink)',
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {sending && (
                <div className="d-flex justify-content-start">
                  <div className="p-3" style={{ borderRadius: 14, background: 'var(--color-blush)' }}>
                    <Spinner animation="border" size="sm" style={{ color: 'var(--color-primary)' }} />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        <Form
          className="d-flex gap-2 p-3 border-top"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <Form.Control
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập câu hỏi của bạn..."
            disabled={sending}
          />
          <Button type="submit" className="pill-btn" style={{ border: 'none', flexShrink: 0 }} disabled={sending || !input.trim()}>
            Gửi
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AISupport;
