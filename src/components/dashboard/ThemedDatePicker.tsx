import { useEffect, useRef } from 'react';
import flatpickr from 'flatpickr';
import type { Instance as FlatpickrInstance } from 'flatpickr/dist/types/instance';
import 'flatpickr/dist/flatpickr.min.css';

interface ThemedDatePickerProps {
  value: string; // YYYY-MM-DD
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
}

const ThemedDatePicker = ({ value, onChange, required, className }: ThemedDatePickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const fpRef = useRef<FlatpickrInstance | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!inputRef.current) return;

    const instance = flatpickr(inputRef.current, {
      dateFormat: 'Y-m-d',
      altInput: true,
      altFormat: 'd/m/Y',
      defaultDate: value || undefined,
      onChange: (_dates, dateStr) => onChangeRef.current(dateStr),
    });
    fpRef.current = instance;

    return () => {
      instance.destroy();
      fpRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fpRef.current && fpRef.current.input.value !== value) {
      fpRef.current.setDate(value || '', false);
    }
  }, [value]);

  return (
    <input
      ref={inputRef}
      type="text"
      required={required}
      className={`form-control themed-datepicker ${className || ''}`}
      readOnly
    />
  );
};

export default ThemedDatePicker;
