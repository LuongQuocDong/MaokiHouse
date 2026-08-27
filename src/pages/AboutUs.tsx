import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { contentService } from '../services/contentService';
import type { AboutUsContent } from '../types';
import toast from 'react-hot-toast';
import ImageCarousel from '../components/ImageCarousel';
import type { ImageCarouselImage } from '../components/ImageCarousel';

const AboutUs = () => {
  const [user] = useAuthState(auth);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Hardcoded Cloudinary images
  const carouselImages: ImageCarouselImage[] = [
    {
      url: 'https://res.cloudinary.com/dlkejgkqk/image/upload/v1710681298/about1_w6kort.jpg',
      alt: 'Host dashboard',
      caption: 'Quản lý vận hành tập trung'
    },
    {
      url: 'https://res.cloudinary.com/dlkejgkqk/image/upload/v1710681298/about2_av5b0h.jpg',
      alt: 'Multi-channel sync',
      caption: 'Đồng bộ đa kênh OTA'
    },
    {
      url: 'https://res.cloudinary.com/dlkejgkqk/image/upload/v1710681299/about3_vkv07l.jpg',
      alt: 'Revenue reporting',
      caption: 'Báo cáo doanh thu rõ ràng'
    }
  ];

  const [content, setContent] = useState<AboutUsContent>({
    id: 'about-us',
    mainTitle: '',
    mainDescription: '',
    introText: '',
    ourStory: {
      title: '',
      content: ''
    },
    localExperience: {
      title: '',
      content: ''
    },
    whyChooseUs: {
      title: '',
      benefits: []
    }
  });

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const data = await contentService.getAboutUs();
        if (data) {
          setContent({
            id: data.id || 'about-us',
            mainTitle: data.mainTitle || '',
            mainDescription: data.mainDescription || '',
            introText: data.introText || '',
            ourStory: {
              title: data?.ourStory?.title || '',
              content: data?.ourStory?.content || ''
            },
            localExperience: {
              title: data?.localExperience?.title || '',
              content: data?.localExperience?.content || ''
            },
            whyChooseUs: {
              title: data?.whyChooseUs?.title || '',
              benefits: Array.isArray(data?.whyChooseUs?.benefits) ? data?.whyChooseUs?.benefits : []
            }
          });
        } else {
          // If no content exists, save the default content
          const defaultContent: AboutUsContent = {
            id: 'about-us',
            mainTitle: 'Về MaokiHouse',
            mainDescription: 'Nền tảng channel-manager và PMS được xây dựng bởi những người từng vận hành homestay và căn hộ cho thuê.',
            introText: 'MaokiHouse ra đời từ chính hành trình vận hành một homestay tại Sài Gòn — nơi chúng tôi hiểu rõ nỗi đau của việc quản lý lịch trên nhiều nền tảng, trả lời tin nhắn khách từ nhiều app khác nhau, và tổng hợp doanh thu thủ công mỗi cuối tháng bằng file Excel. Mỗi ngày trôi qua trong tình trạng đó đều là rủi ro: một lịch trùng có thể khiến bạn mất khách và mất uy tín trên nền tảng, một tin nhắn bị bỏ lỡ có thể khiến khách hủy đặt phòng. Chúng tôi xây dựng MaokiHouse để giải quyết chính những vấn đề đó — không phải trên lý thuyết, mà từ những gì chúng tôi từng tự tay xử lý mỗi ngày.',
            ourStory: {
              title: 'Câu chuyện của chúng tôi',
              content: 'Từ một homestay nhỏ tại Sài Gòn, đội ngũ MaokiHouse đã trải qua toàn bộ hành trình làm Host — từ đón khách lúc nửa đêm, xử lý booking trùng lịch giữa Airbnb và Booking.com, đến việc ngồi cộng lại doanh thu từng đơn vào cuối tháng. Càng vận hành nhiều bất động sản, những công việc thủ công đó càng chiếm thời gian và càng dễ sai sót. Chúng tôi bắt đầu tự xây dựng công cụ nội bộ để giải quyết vấn đề của chính mình, và nhận ra rất nhiều Host khác cũng đang gặp đúng những khó khăn tương tự. Đó là lý do MaokiHouse trở thành một sản phẩm phần mềm dành cho cả cộng đồng Host, Property Manager và đội ngũ Cohost.'
            },
            localExperience: {
              title: 'Hiểu vận hành thực tế',
              content: 'Không phải một sản phẩm được thiết kế trên giấy bởi người chưa từng đón một vị khách nào — MaokiHouse được xây dựng dựa trên quy trình vận hành thực tế mà chúng tôi trải qua mỗi ngày: đồng bộ lịch để tránh trùng đặt phòng, quản lý nhân sự dọn phòng và lễ tân, theo dõi doanh thu theo từng bất động sản, và giao tiếp với khách hàng đúng lúc, đúng kênh. Mỗi tính năng trong MaokiHouse đều xuất phát từ một tình huống vận hành có thật, không phải từ một danh sách tính năng lý tưởng.'
            },
            whyChooseUs: {
              title: 'Vì sao chọn MaokiHouse?',
              benefits: [
                'Đồng bộ lịch đa kênh Airbnb / Booking.com / Agoda, tự động tính khả dụng để tránh trùng lịch',
                'Hộp thư khách hàng hợp nhất, không bỏ lỡ tin nhắn từ bất kỳ nền tảng nào',
                'Quản lý vận hành PMS đầy đủ: check-in/check-out, hồ sơ khách, bán dịch vụ, thanh toán',
                'Báo cáo doanh thu và chi phí minh bạch theo từng bất động sản, từng tháng',
                'Quản lý nhân sự và phân quyền rõ ràng cho đội ngũ vận hành hoặc Cohost',
                'Được xây dựng bởi người từng làm Host, hiểu đúng nhu cầu vận hành thực tế',
                'Đội ngũ hỗ trợ đồng hành trong suốt quá trình thiết lập và sử dụng'
              ]
            }
          };
          setContent(defaultContent);
          if (user) {
            const idToken = await user.getIdToken();
            await contentService.put(idToken, 'about-us', defaultContent);
          }
        }
      } catch (error) {
        console.error('Error fetching about us content:', error);
        toast.error('Failed to load content');
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    if (!user) return;
    const toastId = toast.loading('Saving changes...');
    try {
      const idToken = await user.getIdToken();
      const saved = await contentService.put(idToken, 'about-us', {
        ...content,
        updatedAt: Date.now(),
        updatedBy: user.email ?? undefined
      });
      setContent(saved);
      setIsEditing(false);
      toast.success('Content updated successfully', { id: toastId });
    } catch (error) {
      console.error('Error saving about us content:', error);
      toast.error('Failed to save changes', { id: toastId });
    }
  };

  if (isLoading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (isEditing && user) {
    return (
      <Container className="py-5">
        <div className="d-flex justify-content-end mb-4">
          <Button variant="secondary" className="me-2" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </div>

        <Form>
          <Form.Group className="mb-4">
            <Form.Label>Main Title</Form.Label>
            <Form.Control
              type="text"
              value={content.mainTitle}
              onChange={(e) => setContent({ ...content, mainTitle: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Main Description</Form.Label>
            <Form.Control
              type="text"
              value={content.mainDescription}
              onChange={(e) => setContent({ ...content, mainDescription: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Introduction Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={content.introText}
              onChange={(e) => setContent({ ...content, introText: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Our Story Title</Form.Label>
            <Form.Control
              type="text"
              value={content.ourStory.title}
              onChange={(e) => setContent({
                ...content,
                ourStory: { ...content.ourStory, title: e.target.value }
              })}
            />
            <Form.Label className="mt-2">Our Story Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={content.ourStory.content}
              onChange={(e) => setContent({
                ...content,
                ourStory: { ...content.ourStory, content: e.target.value }
              })}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Local Experience Title</Form.Label>
            <Form.Control
              type="text"
              value={content.localExperience.title}
              onChange={(e) => setContent({
                ...content,
                localExperience: { ...content.localExperience, title: e.target.value }
              })}
            />
            <Form.Label className="mt-2">Local Experience Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={content.localExperience.content}
              onChange={(e) => setContent({
                ...content,
                localExperience: { ...content.localExperience, content: e.target.value }
              })}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Why Choose Us Title</Form.Label>
            <Form.Control
              type="text"
              value={content.whyChooseUs.title}
              onChange={(e) => setContent({
                ...content,
                whyChooseUs: { ...content.whyChooseUs, title: e.target.value }
              })}
            />
            <Form.Label className="mt-2">Benefits (one per line)</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={content.whyChooseUs.benefits.join('\n')}
              onChange={(e) => setContent({
                ...content,
                whyChooseUs: {
                  ...content.whyChooseUs,
                  benefits: e.target.value.split('\n').filter(benefit => benefit.trim() !== '')
                }
              })}
            />
          </Form.Group>
        </Form>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {user && (
        <div className="d-flex justify-content-end mb-4">
          <Button variant="primary" onClick={() => setIsEditing(true)}>
            Edit Content
          </Button>
        </div>
      )}

      <div className="mb-5">
        <ImageCarousel
          images={carouselImages}
          height="500px"
          interval={5000}
          fade={true}
          captionStyle="card"
        />
      </div>

      <div className="text-center mb-5">
        <div className="eyebrow mb-3">Our Story</div>
        <h1 className="font-display mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{content.mainTitle}</h1>
        <div className="gold-divider"><i className="bi bi-compass gold-divider-icon"></i></div>
        <div className="mb-0 mx-auto" style={{ maxWidth: '700px', color: 'var(--color-gold)', fontSize: '1.15rem', fontStyle: 'italic' }}>
          {content.mainDescription}
        </div>
      </div>

      <div className="mb-5 mx-auto text-center" style={{ maxWidth: '760px' }}>
        <p className="pull-quote">{content.introText}</p>
      </div>

      {/* Problem / mission section */}
      <div className="mb-5">
        <div className="text-center mb-4">
          <div className="eyebrow mb-2">Vấn đề chúng tôi giải quyết</div>
          <h2 className="h3" style={{ fontFamily: 'var(--font-display)' }}>Vận hành cho thuê không nên phức tạp đến vậy</h2>
        </div>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="elevated-card h-100">
              <div className="card-body p-4">
                <i className="bi bi-calendar-x mb-3" style={{ fontSize: '1.75rem', color: 'var(--color-primary)' }}></i>
                <h4 className="h5 mb-2">Trùng lịch giữa các kênh</h4>
                <p className="small mb-0" style={{ color: 'var(--color-ink)', opacity: 0.8 }}>
                  Khi lịch không được đồng bộ, một phòng có thể được đặt hai lần trên hai nền tảng khác nhau — dẫn đến
                  huỷ booking, đánh giá xấu và mất niềm tin từ khách.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="elevated-card h-100">
              <div className="card-body p-4">
                <i className="bi bi-chat-square-dots mb-3" style={{ fontSize: '1.75rem', color: 'var(--color-primary)' }}></i>
                <h4 className="h5 mb-2">Tin nhắn khách bị bỏ lỡ</h4>
                <p className="small mb-0" style={{ color: 'var(--color-ink)', opacity: 0.8 }}>
                  Khách hỏi thông tin trên Airbnb, kênh khác lại nhắn qua Booking.com — Host phải mở nhiều app cùng
                  lúc và rất dễ trả lời trễ, ảnh hưởng đến tỉ lệ phản hồi và xếp hạng.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="elevated-card h-100">
              <div className="card-body p-4">
                <i className="bi bi-file-earmark-spreadsheet mb-3" style={{ fontSize: '1.75rem', color: 'var(--color-primary)' }}></i>
                <h4 className="h5 mb-2">Doanh thu rời rạc, khó tổng hợp</h4>
                <p className="small mb-0" style={{ color: 'var(--color-ink)', opacity: 0.8 }}>
                  Mỗi nền tảng có một bảng sao kê riêng, định dạng riêng — việc tổng hợp doanh thu và chi phí thủ công
                  mỗi tháng vừa tốn thời gian, vừa dễ sai lệch số liệu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="elevated-card h-100">
            <div className="card-body p-4">
              <h3 className="h4 mb-3" style={{ fontFamily: 'var(--font-display)' }}>{content.ourStory.title}</h3>
              <p style={{ color: 'var(--color-ink)', opacity: 0.8 }}>{content.ourStory.content}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="elevated-card h-100">
            <div className="card-body p-4">
              <h3 className="h4 mb-3" style={{ fontFamily: 'var(--font-display)' }}>{content.localExperience.title}</h3>
              <p style={{ color: 'var(--color-ink)', opacity: 0.8 }}>{content.localExperience.content}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="elevated-card mt-4" style={{ background: 'var(--color-blush)' }}>
        <div className="card-body p-4">
          <h3 className="h4 mb-3" style={{ fontFamily: 'var(--font-display)' }}>{content.whyChooseUs.title}</h3>
          <ul className="list-unstyled mb-0">
            {content.whyChooseUs.benefits.map((benefit, index) => (
              <li
                key={index}
                className={`d-flex align-items-start gap-2 ${index < content.whyChooseUs.benefits.length - 1 ? 'mb-3' : ''}`}
              >
                <i className="bi bi-check-circle-fill mt-1" style={{ color: 'var(--color-gold)' }}></i>
                <span style={{ color: 'var(--color-ink)', opacity: 0.85 }}>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center mt-5 pt-3">
        <div className="eyebrow mb-2">Sứ mệnh</div>
        <h3 className="h4 mx-auto mb-3" style={{ fontFamily: 'var(--font-display)', maxWidth: 640 }}>
          Giúp mọi Host vận hành chuyên nghiệp như một đội ngũ lớn, dù chỉ quản lý một căn hộ
        </h3>
        <p className="mx-auto mb-4" style={{ maxWidth: 640, color: 'var(--color-ink)', opacity: 0.8 }}>
          Chúng tôi tin rằng công cụ vận hành tốt không nên chỉ dành riêng cho các chuỗi khách sạn lớn. Mục tiêu của
          MaokiHouse là mang lại cho mọi Host — dù mới bắt đầu với một căn hộ hay đang quản lý cả một danh mục bất
          động sản — một hệ thống đủ mạnh để vận hành gọn gàng, minh bạch và có thể mở rộng theo thời gian.
        </p>
        <Link to="/contact" className="pill-btn">
          Liên hệ đăng ký dùng thử <i className="bi bi-arrow-right"></i>
        </Link>
      </div>

      <style>
        {`
          .pull-quote {
            font-family: var(--font-display);
            font-size: 1.4rem;
            line-height: 1.7;
            color: var(--color-ink);
            font-style: italic;
            position: relative;
          }
        `}
      </style>
    </Container>
  );
};

export default AboutUs; 