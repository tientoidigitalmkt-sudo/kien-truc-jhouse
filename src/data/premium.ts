/**
 * Kiến Trúc Jhouse — contact details supplied by the business owner.
 * Portfolio photographs, project names and statistics are still demo examples.
 */
export const brand = {
  name: 'Kiến Trúc Jhouse',
  descriptor: 'ARCHITECTURE & INTERIOR',
  email: 'kientrucjhouse@gmail.com', // Opens the visitor's email client; does not send through a server.
  hotline: '0986873126', // Click-to-call hotline.
  address: 'Phường Từ Sơn, TP.Bắc Ninh',
  zaloUrl: '', // Configure the real official Zalo address if available.
};

export const nav = [
  { label: 'Trang chủ', path: '/' },
  { label: 'Giới thiệu', path: '/gioi-thieu' },
  { label: 'Dịch vụ', path: '/dich-vu' },
  { label: 'Dự án', path: '/du-an' },
  { label: 'Quy trình', path: '/quy-trinh' },
  { label: 'Blog', path: '/blog' },
  { label: 'Liên hệ', path: '/lien-he' },
];

const unsplash = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

export const photos = {
  hero: { src: unsplash('photo-1600607687920-4e2a09cf159d', 2200), fallback: '/images/fallback-hero.jpg' },
  about: { src: unsplash('photo-1600210492486-724fe5c67fb0'), fallback: '/images/fallback-about.jpg' },
  detail: { src: unsplash('photo-1600566753190-17f0baa2a6c3'), fallback: '/images/fallback-p3.jpg' },
  material: { src: unsplash('photo-1618221195710-dd6b41faaea6'), fallback: '/images/fallback-p4.jpg' },
  process: { src: unsplash('photo-1600566752355-35792bedcfea'), fallback: '/images/fallback-p1.jpg' },
  office: { src: unsplash('photo-1497366811353-6870744d04b2'), fallback: '/images/fallback-p6.jpg' },
};

export type Photo = { src: string; fallback: string };
export type ProjectCategory = 'Căn hộ' | 'Nhà phố' | 'Biệt thự' | 'Văn phòng' | 'Penthouse';
export type Project = {
  slug: string;
  title: string;
  place: string;
  area: string;
  style: string;
  category: ProjectCategory;
  year: string;
  cover: Photo;
  gallery: Photo[];
  intro: string;
  concept: string;
};

// Tự động quét toàn bộ bài viết CMS tạo ra
const cmsData = import.meta.glob('../content/projects/*.json', { eager: true });

// Chuyển đổi dữ liệu đưa ra web
export const projects: any[] = Object.values(cmsData).map((file: any) => {
  const data = file.default || file;
  return {
    slug: data.title ? data.title.toLowerCase().replace(/ /g, '-') : 'du-an-thuc-te',
    title: data.title || 'Dự án mới',
    place: data.place || 'Đang cập nhật',
    area: data.area || '',
    style: 'Hiện đại',
    category: 'Thực tế',
    year: '2026',
    cover: { src: data.cover || '/images/fallback-p1.jpg', fallback: data.cover || '/images/fallback-p1.jpg' },
    gallery: [],
    intro: 'Dự án thực tế của Jhouse tại Bắc Ninh.',
    concept: ''
  };
});
export type Service = { slug: string; title: string; short: string; eyebrow: string; photo: Photo; benefits: string[]; introduction: string };
export const services: Service[] = [
  {
    slug: 'thiet-ke-noi-that', title: 'Thiết kế nội thất', eyebrow: '01 / Sáng tạo', photo: photos.about,
    short: 'Căn hộ, nhà phố, biệt thự và không gian làm việc được thiết kế theo phong cách riêng.',
    introduction: 'Một không gian đẹp không chỉ nằm ở hình thức. Chúng tôi bắt đầu từ thói quen sống, tỷ lệ sử dụng và cảm xúc bạn muốn có khi trở về nhà.',
    benefits: ['Tư vấn định hướng phong cách và công năng', 'Bố trí mặt bằng, lựa chọn vật liệu', 'Phối cảnh 3D và hồ sơ bản vẽ chi tiết', 'Đồng hành trong quá trình hiện thực hóa thiết kế'],
  },
  {
    slug: 'thi-cong-tron-goi', title: 'Thi công trọn gói', eyebrow: '02 / Hiện thực', photo: photos.detail,
    short: 'Hiện thực hóa thiết kế với sự chỉn chu trong vật liệu, chi tiết và tiến độ.',
    introduction: 'Từ bản vẽ đến từng điểm nối vật liệu, chúng tôi xem việc thi công là hành trình bảo toàn tinh thần thiết kế trong đời sống thực.',
    benefits: ['Khảo sát hiện trạng và lập phương án triển khai', 'Bóc tách khối lượng, vật liệu và dự toán', 'Tổ chức thi công và kiểm soát chất lượng', 'Nghiệm thu và hướng dẫn sử dụng sau bàn giao'],
  },
  {
    slug: 'cai-tao-khong-gian', title: 'Cải tạo không gian', eyebrow: '03 / Tái tạo', photo: photos.material,
    short: 'Biến đổi không gian cũ thành nơi sống mới đầy cảm hứng và tính ứng dụng.',
    introduction: 'Cải tạo không đơn thuần là thay một lớp áo mới. Đó là quá trình nhìn lại những gì đang có và khai mở tiềm năng sử dụng tốt hơn.',
    benefits: ['Đánh giá hiện trạng và khả năng cải tạo', 'Tối ưu tổ chức không gian, ánh sáng', 'Lựa chọn giải pháp vật liệu phù hợp ngân sách', 'Lập kế hoạch thi công hạn chế gián đoạn sinh hoạt'],
  },
];

export const steps = [
  { num: '01', title: 'Lắng nghe & tư vấn', desc: 'Tìm hiểu nhu cầu, phong cách sống và ngân sách dự kiến.' },
  { num: '02', title: 'Khảo sát hiện trạng', desc: 'Đo đạc, đánh giá kỹ thuật và những tiềm năng của mặt bằng.' },
  { num: '03', title: 'Phát triển ý tưởng', desc: 'Xác lập định hướng thẩm mỹ, công năng, vật liệu và cảm hứng.' },
  { num: '04', title: 'Hoàn thiện thiết kế', desc: 'Phối cảnh, bản vẽ kỹ thuật và danh mục vật liệu rõ ràng.' },
  { num: '05', title: 'Thi công & giám sát', desc: 'Triển khai theo kế hoạch, kiểm soát chi tiết và tiến độ.' },
  { num: '06', title: 'Nghiệm thu & bàn giao', desc: 'Kiểm tra hoàn thiện, hướng dẫn sử dụng và chăm sóc sau bàn giao.' },
];

export type Article = { slug: string; title: string; category: string; date: string; image: Photo; excerpt: string; sections: { title: string; content: string }[] };
export const articles: Article[] = [
  {
    slug: 'nghe-thuat-anh-sang-trong-noi-that', title: 'Nghệ thuật ánh sáng trong không gian sống', category: 'Cảm hứng thiết kế', date: '08.10.2026', image: photos.detail,
    excerpt: 'Ánh sáng định hình tâm trạng của mỗi căn phòng và mang đến những trải nghiệm khác biệt theo từng thời điểm trong ngày.',
    sections: [
      { title: 'Bắt đầu từ ánh sáng tự nhiên', content: 'Hướng cửa sổ, bề mặt phản xạ và cách bố trí nội thất quyết định độ mở của một không gian. Ánh sáng ban ngày nên được khai thác trước khi lựa chọn giải pháp chiếu sáng nhân tạo.' },
      { title: 'Tạo nhiều lớp ánh sáng', content: 'Một không gian dễ chịu thường kết hợp ánh sáng tổng thể, ánh sáng tác vụ và ánh sáng nhấn. Việc thay đổi cường độ theo từng hoạt động giúp căn phòng linh hoạt và ấm áp hơn.' },
      { title: 'Chọn nhiệt độ màu phù hợp', content: 'Ánh sáng ấm có thể đem lại cảm giác thư giãn cho phòng ngủ và phòng khách; khu vực làm việc hoặc bếp cần nguồn sáng đủ rõ để sử dụng an toàn và tiện lợi.' },
    ],
  },
  {
    slug: 'chat-lieu-tao-nen-ve-dep-ben-vung', title: 'Chất liệu tạo nên vẻ đẹp bền vững', category: 'Vật liệu & hoàn thiện', date: '02.10.2026', image: photos.material,
    excerpt: 'Gỗ, đá, kim loại hay vải đều mang một ngôn ngữ riêng. Sự phối hợp tinh tế khiến căn nhà có chiều sâu.',
    sections: [
      { title: 'Sự cân bằng giữa cảm giác và công năng', content: 'Bề mặt tiếp xúc hằng ngày nên được lựa chọn dựa trên thói quen sinh hoạt, điều kiện khí hậu và khả năng vệ sinh, không chỉ dựa vào hiệu ứng hình ảnh.' },
      { title: 'Bảng vật liệu có chủ đích', content: 'Thay vì đưa quá nhiều chất liệu vào một căn phòng, hãy tạo một nhóm vật liệu chính và một vài điểm nhấn được lặp lại có tiết chế.' },
      { title: 'Chi tiết hoàn thiện quyết định chất lượng', content: 'Các mép nối, giải pháp chống ẩm, lớp phủ và phương án bảo trì là những yếu tố ảnh hưởng đến tuổi thọ của nội thất.' },
    ],
  },
  {
    slug: 'thiet-ke-can-ho-gon-gang-tinh-te', title: 'Thiết kế căn hộ gọn gàng mà tinh tế', category: 'Giải pháp không gian', date: '27.09.2026', image: photos.about,
    excerpt: 'Những lựa chọn nhỏ về lưu trữ, ánh sáng và tỷ lệ giúp căn hộ trở nên rộng rãi hơn mà vẫn giữ cá tính.',
    sections: [
      { title: 'Tối ưu lối đi và góc nhìn', content: 'Một bố cục tốt tạo được trục nhìn thông thoáng và luồng di chuyển tự nhiên. Trước khi thêm đồ nội thất, hãy xác định những khu vực cần để trống.' },
      { title: 'Lưu trữ là một phần của thiết kế', content: 'Hệ tủ kịch trần, những hộc giấu đồ và nội thất đa năng có thể giúp không gian gọn gàng mà không tạo cảm giác nặng nề.' },
      { title: 'Ưu tiên sự đồng nhất', content: 'Bảng màu tiết chế và đường nét nhất quán giúp các khu vực chức năng khác nhau được kết nối trong cùng một ngôn ngữ thẩm mỹ.' },
    ],
  },
];
