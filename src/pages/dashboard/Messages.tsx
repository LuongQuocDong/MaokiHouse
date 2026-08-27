import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { messageService } from '../../services/messageService';
import type { MessageThread } from '../../types';

const Messages = () => {
  const [user] = useAuthState(auth);
  const [threads, setThreads] = useState<MessageThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);

  const load = async () => {
    if (!user) return;
    try {
      const idToken = await user.getIdToken();
      const data = await messageService.list(idToken);
      setThreads(data);
      if (!selectedId && data.length > 0) setSelectedId(data[0].id);
    } catch (error) {
      console.error(error);
      toast.error('Không tải được tin nhắn');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const selected = threads.find((t) => t.id === selectedId) || null;

  const handleSend = async () => {
    if (!user || !selected || !draft.trim()) return;
    setSending(true);
    try {
      const idToken = await user.getIdToken();
      const updated = await messageService.appendMessage(idToken, selected.id, draft.trim());
      setThreads((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      setDraft('');
    } catch (error) {
      console.error(error);
      toast.error('Gửi tin nhắn thất bại');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" style={{ color: 'var(--color-primary)' }} />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3">
        <div className="eyebrow">Vận hành</div>
        <h1 className="font-display" style={{ fontSize: '1.9rem' }}>Tin nhắn</h1>
      </div>

      <div className="elevated-card mb-4" style={{ background: 'var(--color-blush)' }}>
        <div className="card-body p-3 small">
          Kết nối kênh OTA/Social để nhận tin nhắn thật — đây là dữ liệu xem trước.
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-4">
          <div className="elevated-card h-100">
            <div className="list-group list-group-flush">
              {threads.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`list-group-item list-group-item-action ${selectedId === t.id ? 'active' : ''}`}
                  onClick={() => setSelectedId(t.id)}
                  style={selectedId === t.id ? { background: 'var(--color-blush)', color: 'var(--color-ink)', border: 'none' } : { border: 'none' }}
                >
                  <div className="fw-semibold">{t.guestName}</div>
                  <div className="small text-muted text-capitalize">{t.platform}</div>
                </button>
              ))}
              {threads.length === 0 && <div className="p-3 text-muted small">Chưa có cuộc trò chuyện nào.</div>}
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="elevated-card h-100 d-flex flex-column">
            <div className="card-body p-3 d-flex flex-column" style={{ minHeight: 420 }}>
              {selected ? (
                <>
                  <div className="flex-grow-1 mb-3" style={{ overflowY: 'auto', maxHeight: 380 }}>
                    {selected.messages.map((m, i) => (
                      <div
                        key={i}
                        className={`mb-2 d-flex ${m.sender === 'host' ? 'justify-content-end' : 'justify-content-start'}`}
                      >
                        <div
                          className="px-3 py-2"
                          style={{
                            borderRadius: 14,
                            maxWidth: '75%',
                            background: m.sender === 'host' ? 'var(--color-primary)' : 'var(--color-blush)',
                            color: m.sender === 'host' ? '#fff' : 'var(--color-ink)',
                          }}
                        >
                          {m.text}
                        </div>
                      </div>
                    ))}
                    {selected.messages.length === 0 && <div className="text-muted small">Chưa có tin nhắn.</div>}
                  </div>
                  <Form
                    className="d-flex gap-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSend();
                    }}
                  >
                    <Form.Control
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      placeholder="Nhập tin nhắn..."
                    />
                    <Button type="submit" disabled={sending} className="pill-btn" style={{ border: 'none' }}>
                      Gửi
                    </Button>
                  </Form>
                </>
              ) : (
                <div className="text-muted">Chọn một cuộc trò chuyện.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
