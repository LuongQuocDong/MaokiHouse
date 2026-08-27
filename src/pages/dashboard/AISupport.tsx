const EXAMPLE_PROMPTS = [
  'Tóm tắt tin nhắn khách hôm nay',
  'Gợi ý giá phòng cuối tuần',
  'Soạn phản hồi cho khách yêu cầu hoàn tiền',
  'Phân tích nguyên nhân doanh thu tháng này giảm',
];

const AISupport = () => {
  return (
    <div>
      <div className="mb-4">
        <div className="eyebrow">Sắp ra mắt</div>
        <h1 className="font-display" style={{ fontSize: '1.9rem' }}>Hỗ trợ AI</h1>
      </div>

      <div className="elevated-card">
        <div className="card-body p-4 p-md-5 text-center">
          <div className="mb-3" style={{ fontSize: '2.5rem' }}>🤖</div>
          <h3 className="h4 mb-3" style={{ fontFamily: 'var(--font-display)' }}>Trợ lý AI đang được phát triển</h3>
          <p className="mx-auto mb-4" style={{ maxWidth: 560, color: 'var(--color-ink)', opacity: 0.8 }}>
            Chúng tôi đang xây dựng một trợ lý AI giúp bạn tóm tắt tin nhắn khách, gợi ý giá phòng,
            và trả lời các câu hỏi vận hành thường gặp. Tính năng này chưa hoạt động — các gợi ý dưới đây
            chỉ là ví dụ minh họa cho những gì sắp ra mắt.
          </p>

          <div className="gold-divider"><i className="bi bi-stars gold-divider-icon"></i></div>

          <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
            {EXAMPLE_PROMPTS.map((prompt) => (
              <span
                key={prompt}
                className="px-3 py-2"
                style={{
                  borderRadius: 999,
                  background: 'var(--color-blush)',
                  color: 'var(--color-ink)',
                  opacity: 0.55,
                  fontSize: '0.9rem',
                  cursor: 'not-allowed',
                  userSelect: 'none',
                }}
              >
                {prompt}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISupport;
