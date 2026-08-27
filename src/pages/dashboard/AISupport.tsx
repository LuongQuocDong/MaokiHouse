const AISupport = () => {
  return (
    <div>
      <div className="mb-4">
        <div className="eyebrow">Trợ lý</div>
        <h1 className="font-display" style={{ fontSize: '1.9rem' }}>Hỗ trợ AI</h1>
      </div>

      <div className="elevated-card" style={{ overflow: 'hidden' }}>
        <iframe
          src="https://page.botpenguin.com/6a90cd48ef3c88df50ef7979/6a900d58153d99f1ca28b4c3"
          title="Trợ lý AI hỗ trợ"
          style={{ width: '100%', height: '75vh', minHeight: 600, border: 'none', display: 'block' }}
          allow="microphone"
        />
      </div>
    </div>
  );
};

export default AISupport;
