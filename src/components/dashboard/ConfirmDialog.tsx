import { createContext, useCallback, useContext, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ConfirmOptions {
  title?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
}

type ConfirmFn = (message: string, options?: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmFn | null>(null);

export const useConfirm = (): ConfirmFn => {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error('useConfirm must be used within a ConfirmDialogProvider');
  return ctx;
};

export const ConfirmDialogProvider = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [options, setOptions] = useState<ConfirmOptions>({});
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback<ConfirmFn>((msg, opts = {}) => {
    setMessage(msg);
    setOptions(opts);
    setShow(true);
    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve;
    });
  }, []);

  const close = (result: boolean) => {
    setShow(false);
    resolveRef.current?.(result);
    resolveRef.current = null;
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}

      <Modal show={show} onHide={() => close(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>
            {options.title || 'Xác nhận'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: 'var(--color-ink)' }}>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => close(false)}>
            {options.cancelLabel || 'Hủy'}
          </Button>
          <Button
            className="pill-btn"
            style={{
              border: 'none',
              background: options.danger
                ? 'linear-gradient(135deg, #c0392b, #e07a5f)'
                : 'linear-gradient(135deg, var(--color-gold), var(--color-primary-light))',
            }}
            onClick={() => close(true)}
          >
            {options.confirmLabel || 'Đồng ý'}
          </Button>
        </Modal.Footer>
      </Modal>
    </ConfirmContext.Provider>
  );
};
