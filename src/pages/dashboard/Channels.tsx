import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button, Spinner } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { channelService } from '../../services/channelService';
import type { ChannelConnection, ChannelPlatform } from '../../types';

const PLATFORMS: { id: ChannelPlatform; name: string; color: string }[] = [
  { id: 'airbnb', name: 'Airbnb', color: '#e07a5f' },
  { id: 'booking', name: 'Booking.com', color: '#3d5a80' },
  { id: 'agoda', name: 'Agoda', color: '#c9a15a' },
];

const Channels = () => {
  const [user] = useAuthState(auth);
  const [connections, setConnections] = useState<ChannelConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<ChannelPlatform | null>(null);

  const load = async () => {
    if (!user) return;
    try {
      const idToken = await user.getIdToken();
      setConnections(await channelService.list(idToken));
    } catch (error) {
      console.error(error);
      toast.error('Không tải được trạng thái kênh');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const toggle = async (platform: ChannelPlatform, connected: boolean) => {
    if (!user) return;
    setBusy(platform);
    try {
      const idToken = await user.getIdToken();
      if (connected) {
        await channelService.disconnect(idToken, platform);
        toast.success(`Đã ngắt kết nối ${platform}`);
      } else {
        await channelService.connect(idToken, platform);
        toast.success(`Đã kết nối ${platform}`);
      }
      load();
    } catch (error) {
      console.error(error);
      toast.error('Thao tác thất bại');
    } finally {
      setBusy(null);
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
      <div className="mb-4">
        <div className="eyebrow">Tích hợp</div>
        <h1 className="font-display" style={{ fontSize: '1.9rem' }}>Kênh OTA</h1>
      </div>

      <div className="row g-3">
        {PLATFORMS.map(({ id, name, color }) => {
          const conn = connections.find((c) => c.platform === id);
          const connected = conn?.status === 'connected';
          return (
            <div className="col-md-4" key={id}>
              <div className="elevated-card h-100">
                <div className="card-body p-4 text-center">
                  <div
                    className="mx-auto mb-3"
                    style={{ width: 48, height: 48, borderRadius: 12, background: color }}
                  />
                  <h3 className="h5 mb-2">{name}</h3>
                  <div className="mb-3">
                    <span
                      className="badge"
                      style={{ background: connected ? 'var(--color-gold)' : '#ccc', color: 'var(--color-ink)' }}
                    >
                      {connected ? 'Đã kết nối' : 'Chưa kết nối'}
                    </span>
                  </div>
                  <Button
                    variant={connected ? 'outline-danger' : 'primary'}
                    disabled={busy === id}
                    onClick={() => toggle(id, connected)}
                    className={connected ? '' : 'pill-btn'}
                    style={connected ? {} : { border: 'none' }}
                  >
                    {connected ? 'Ngắt kết nối' : 'Kết nối'}
                  </Button>
                  <p className="small text-muted mt-3 mb-0">
                    Đồng bộ dữ liệu thực với {name} cần được nền tảng phê duyệt đối tác (partner API).
                    Kết nối hiện tại chỉ mang tính minh họa.
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Channels;
