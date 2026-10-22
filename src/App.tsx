import { useEffect, useMemo, useState } from 'react';
import type { FormEvent, MouseEvent, ReactNode } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronLeft, ChevronRight, Copy, Mail, Menu, Phone, Plus, Search, X } from 'lucide-react';
import { articles, brand, nav, photos, projects, services, steps } from './data/premium';
import type { Article, Photo, Project, Service } from './data/premium';
import './styles.css';

type Navigate = (path: string) => void;

function Picture({ image, alt, className = '', eager = false }: { image: Photo; alt: string; className?: string; eager?: boolean }) {
  return <img src={image.src} alt={alt} className={className} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={event => {
    const img = event.currentTarget;
    if (!img.src.endsWith(image.fallback)) img.src = image.fallback;
  }} />;
}

function SiteLink({ to, go, className = '', children, onClick, ...rest }: { to: string; go: Navigate; className?: string; children: ReactNode; onClick?: () => void; title?: string }) {
  const click = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onClick?.();
    go(to);
  };
  return <a href={to} className={className} onClick={click} {...rest}>{children}</a>;
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <span className={`eyebrow${light ? ' eyebrow--light' : ''}`}><span className="eyebrow-line" />{children}</span>;
}

function SectionHead({ eyebrow, title, description, light = false, center = false, action }: { eyebrow: string; title: string; description?: string; light?: boolean; center?: boolean; action?: ReactNode }) {
  return <div className={`section-heading${center ? ' section-heading--center' : ''}${light ? ' section-heading--light' : ''}`}>
    <div><Eyebrow light={light}>{eyebrow}</Eyebrow><h2 className="display-title">{title}</h2>{description && <p className="section-desc">{description}</p>}</div>
    {action && <div className="section-heading__action">{action}</div>}
  </div>;
}

function Header({ pathname, go }: { pathname: string; go: Navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 22);
    fn(); window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);
  return <>
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <div className="header-inner container-wide">
        <SiteLink to="/" go={go} className="brand" title="Kiến Trúc Jhouse – Trang chủ"><strong>{brand.name}</strong><small>{brand.descriptor}</small></SiteLink>
        <nav className="desktop-nav" aria-label="Điều hướng chính">
          {nav.map(item => <SiteLink key={item.path} to={item.path} go={go} className={(pathname === item.path || (item.path === '/du-an' && pathname.startsWith('/du-an/')) || (item.path === '/dich-vu' && pathname.startsWith('/dich-vu/')) || (item.path === '/blog' && pathname.startsWith('/blog/'))) ? 'nav-link nav-link--active' : 'nav-link'}>{item.label}</SiteLink>)}
        </nav>
        <div className="header-actions"><SiteLink to="/lien-he" go={go} className="btn btn--gold btn--compact header-cta">Nhận tư vấn <ArrowUpRight size={16}/></SiteLink><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'} aria-expanded={menuOpen}>{menuOpen ? <X size={23}/> : <Menu size={23}/>}</button></div>
      </div>
    </header>
    <div className={`mobile-panel${menuOpen ? ' mobile-panel--open' : ''}`} aria-hidden={!menuOpen}>
      <nav aria-label="Điều hướng trên điện thoại">{nav.map((item, i) => <SiteLink to={item.path} go={go} key={item.path} className={pathname === item.path ? 'mobile-nav-link mobile-nav-link--active' : 'mobile-nav-link'}><span className="mobile-nav-index">0{i+1}</span>{item.label}<ArrowUpRight size={19}/></SiteLink>)}
      </nav><div className="mobile-menu-foot">{brand.name} <span>Designing a sense of belonging.</span></div>
    </div>
  </>;
}

function Footer({ go }: { go: Navigate }) {
  return <footer className="footer">
    <div className="container footer-main"><div className="footer-intro"><SiteLink to="/" go={go} className="brand brand--light"><strong>{brand.name}</strong><small>{brand.descriptor}</small></SiteLink><p>Kiến tạo những không gian giàu cảm xúc, nơi thẩm mỹ gặp gỡ công năng và mỗi chi tiết đều mang một câu chuyện.</p><span className="footer-signature">Spaces with soul.</span></div>
      <div className="footer-col"><h4>Khám phá</h4>{nav.filter(n => n.path !== '/').map(n => <SiteLink to={n.path} go={go} key={n.path}>{n.label}</SiteLink>)}</div>
      <div className="footer-col"><h4>Dịch vụ</h4>{services.map(s => <SiteLink key={s.slug} to={`/dich-vu/${s.slug}`} go={go}>{s.title}</SiteLink>)}<SiteLink to="/lien-he" go={go}>Gửi yêu cầu tư vấn</SiteLink></div>
      <div className="footer-col footer-col--contact"><h4>Liên hệ Kiến Trúc Jhouse</h4><p>Mỗi không gian đáng sống đều bắt đầu từ một cuộc trò chuyện chân thành.</p><SiteLink to="/lien-he" go={go} className="footer-contact-link">Liên hệ với chúng tôi <ArrowUpRight size={20}/></SiteLink><p className="footer-address">{brand.address}</p><a href={`tel:${brand.hotline}`}>Hotline: {brand.hotline}</a><a href={`mailto:${brand.email}`}>{brand.email}</a></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} {brand.name}. All rights reserved.</span><span>Thiết kế tối giản. Giá trị bền lâu.</span><SiteLink to="/" go={go}>Trở về đầu trang ↑</SiteLink></div>
  </footer>;
}

function FloatingContact({ go }: { go: Navigate }) {
  return <div className="floating-contact" aria-label="Liên hệ nhanh">{brand.hotline && <a href={`tel:${brand.hotline}`} title="Gọi điện"><Phone size={18}/></a>}{brand.zaloUrl && <a target="_blank" rel="noopener noreferrer" href={brand.zaloUrl} title="Nhắn Zalo">Z</a>}<SiteLink to="/lien-he" go={go} className="floating-contact__main" title="Nhận tư vấn"><Mail size={19}/><span>Tư vấn</span></SiteLink></div>;
}

function ProjectCard({ project, go, index = 0, dark = false }: { project: Project; go: Navigate; index?: number; dark?: boolean }) {
  return <SiteLink to={`/du-an/${project.slug}`} go={go} className={`project-card${dark ? ' project-card--dark' : ''}`}>
    <div className="project-card__image"><Picture image={project.cover} alt={`Không gian tham khảo ${project.title}`} /><span className="project-card__index">0{index+1} / {project.category}</span><span className="project-card__arrow"><ArrowUpRight size={19}/></span></div>
    <div className="project-card__meta"><div><h3>{project.title}</h3><p>{project.place} <span>·</span> {project.area} <span>·</span> {project.style}</p></div><span className="project-card__plus"><ArrowUpRight size={19}/></span></div>
  </SiteLink>;
}

function ServiceCard({ service, go, index }: { service: Service; go: Navigate; index: number }) {
  return <SiteLink to={`/dich-vu/${service.slug}`} go={go} className="service-card">
    <div className="service-card__image"><Picture image={service.photo} alt={`Minh họa dịch vụ ${service.title}`} /><span>0{index+1}</span></div>
    <div className="service-card__body"><h3>{service.title}</h3><ArrowUpRight size={20}/></div><p>{service.short}</p><span className="text-link text-link--small">Khám phá dịch vụ <ArrowRight size={15}/></span>
  </SiteLink>;
}

function CTA({ go, title = 'Bạn đã có ý tưởng cho không gian của mình?', description = 'Hãy chia sẻ với chúng tôi câu chuyện của bạn. Một không gian tuyệt vời có thể bắt đầu từ hôm nay.' }: { go: Navigate; title?: string; description?: string }) {
  return <section className="cta-section"><div className="cta-backdrop"><Picture image={photos.hero} alt="Không gian sống hiện đại sang trọng" /></div><div className="container cta-inner"><Eyebrow light>Hành trình mới bắt đầu</Eyebrow><h2>{title}</h2><p>{description}</p><SiteLink to="/lien-he" go={go} className="btn btn--gold">Đặt lịch tư vấn <ArrowUpRight size={17}/></SiteLink></div></section>;
}

function Home({ go }: { go: Navigate }) {
  const [heroNumber, setHeroNumber] = useState(0);
  const heros = [
    { image: photos.hero, heading: <>Thiết kế không gian sống<br/>Mang dấu ấn<br/><em>riêng của bạn</em></>, sub: 'Kiến tạo nội thất tinh tế từ ý tưởng đến hoàn thiện cho những không gian đáng sống.' },
    { image: photos.detail, heading: <>Tinh tế trong từng<br/>đường nét, trọn vẹn<br/><em>trong cảm xúc</em></>, sub: 'Mỗi chi tiết đều được lựa chọn để kể một câu chuyện rất riêng về bạn.' },
    { image: photos.about, heading: <>Một nơi để trở về.<br/>Một không gian để<br/><em>thuộc về.</em></>, sub: 'Kết nối vẻ đẹp và công năng trong một tổng thể hài hòa, giàu cảm hứng.' },
  ];
  return <>
    <section className="home-hero"><div className="home-hero__photo"><Picture key={heroNumber} image={heros[heroNumber].image} alt="Không gian nội thất cao cấp tông màu ấm" eager /></div><div className="home-hero__shade" /><div className="container home-hero__inner"><div className="home-hero__text"><Eyebrow light>Kiến tạo giá trị sống</Eyebrow><h1>{heros[heroNumber].heading}</h1><p>{heros[heroNumber].sub}</p><div className="hero-actions"><SiteLink to="/lien-he" go={go} className="btn btn--gold">Nhận tư vấn miễn phí <ArrowUpRight size={17}/></SiteLink><SiteLink to="/du-an" go={go} className="text-link text-link--white">Khám phá dự án <ArrowRight size={17}/></SiteLink></div></div><div className="hero-bottom"><div className="hero-dots">{heros.map((_, i) => <button key={i} className={heroNumber === i ? 'hero-dot hero-dot--active' : 'hero-dot'} aria-label={`Xem ảnh giới thiệu ${i+1}`} onClick={() => setHeroNumber(i)} />)}<span className="hero-counter">0{heroNumber+1} <span>/ 03</span></span></div><a href="#ve-chung-toi" onClick={e => {e.preventDefault();document.querySelector('#ve-chung-toi')?.scrollIntoView({behavior:'smooth'});}} className="scroll-cue">Cuộn để khám phá <ArrowDown size={17}/></a></div></div>
    </section>
    <section className="stats-bar" aria-label="Số liệu giới thiệu mẫu"><div className="container stats-inner"><div><b>10<span>+</span></b><small>Năm kinh nghiệm*</small></div><div><b>350<span>+</span></b><small>Dự án hoàn thiện*</small></div><div><b>98<span>%</span></b><small>Khách hàng hài lòng*</small></div><span className="stats-disclaimer">*Số liệu minh họa, cần thay bằng thông tin xác thực.</span></div></section>
    <section className="about-section section-pad" id="ve-chung-toi"><div className="container about-grid"><div className="about-art"><div className="about-art__main"><Picture image={photos.about} alt="Không gian phòng ăn hiện đại tông màu be" /></div><div className="about-art__second"><Picture image={photos.material} alt="Chất liệu và chi tiết nội thất cao cấp" /></div><span className="about-art__tag">EST. · INTERIOR STUDIO</span></div><div className="about-text"><Eyebrow>Về chúng tôi</Eyebrow><h2 className="display-title">Không gian đẹp<br/>bắt đầu từ <em>sự thấu hiểu</em></h2><p className="lead">Chúng tôi tin rằng mỗi không gian đều kể một câu chuyện riêng.</p><p>Với triết lý đặt con người ở vị trí trung tâm, Kiến Trúc Jhouse tìm kiếm sự cân bằng giữa thẩm mỹ, công năng và cảm xúc. Từ ý tưởng đầu tiên đến chi tiết hoàn thiện, mỗi dự án đều hướng tới vẻ đẹp tinh tế và giá trị bền lâu.</p><SiteLink to="/gioi-thieu" go={go} className="btn btn--outline">Tìm hiểu về chúng tôi <ArrowUpRight size={17}/></SiteLink></div></div></section>
    <section className="services-section section-pad"><div className="container"><SectionHead eyebrow="Dịch vụ của chúng tôi" title="Giải pháp toàn diện cho không gian sống" center description="Một hành trình liền mạch từ những nét phác thảo đầu tiên đến không gian hoàn thiện."/><div className="services-grid">{services.map((s,i) => <ServiceCard key={s.slug} service={s} go={go} index={i}/>)}</div></div></section>
    <section className="featured-section section-pad"><div className="container"><SectionHead light eyebrow="Dự án tiêu biểu" title="Những không gian truyền cảm hứng" description="Khám phá các ý tưởng không gian với phong cách thiết kế đa dạng." action={<SiteLink to="/du-an" go={go} className="text-link text-link--white">Xem tất cả dự án <ArrowUpRight size={17}/></SiteLink>}/><div className="featured-grid">{projects.slice(0,3).map((p,i) => <ProjectCard key={p.slug} project={p} go={go} index={i} dark/>)}</div><p className="demo-caption">Hình ảnh và hồ sơ dự án đang được dùng để minh họa giao diện mẫu.</p></div></section>
    <section className="philosophy-section section-pad"><div className="container philosophy-grid"><div className="philosophy-copy"><Eyebrow>Triết lý thiết kế</Eyebrow><h2 className="display-title">Tinh tế không nằm ở sự phô trương, mà ở <em>cảm giác thuộc về.</em></h2><div className="philosophy-number">01 <span>—</span> 03</div></div><div className="philosophy-values"><div><span>01</span><h3>Thấu hiểu con người</h3><p>Lắng nghe thói quen, sở thích và cách bạn muốn sống trong không gian đó.</p></div><div><span>02</span><h3>Tôn trọng chất liệu</h3><p>Chọn lựa chân thực, hài hòa giữa vẻ đẹp tự nhiên và độ bền sử dụng.</p></div><div><span>03</span><h3>Chăm chút từng chi tiết</h3><p>Từ bố cục tổng thể đến những điểm chạm nhỏ trong đời sống mỗi ngày.</p></div></div></div></section>
    <section className="process-section section-pad"><div className="container"><SectionHead eyebrow="Cách chúng tôi làm việc" title="Chỉn chu trong từng bước" description="Quy trình rõ ràng để ý tưởng được triển khai một cách nhất quán và có kiểm soát." action={<SiteLink to="/quy-trinh" go={go} className="text-link">Xem toàn bộ quy trình <ArrowUpRight size={17}/></SiteLink>}/><div className="process-steps">{steps.map(s => <div className="process-step" key={s.num}><span>{s.num}</span><div><h3>{s.title}</h3><p>{s.desc}</p></div></div>)}</div></div></section>
    <section className="journal-section section-pad"><div className="container"><SectionHead eyebrow="Tạp chí Kiến Trúc Jhouse" title="Cảm hứng dành cho tổ ấm" action={<SiteLink to="/blog" go={go} className="text-link">Xem tất cả bài viết <ArrowUpRight size={17}/></SiteLink>}/><div className="journal-grid">{articles.map(a => <SiteLink key={a.slug} to={`/blog/${a.slug}`} go={go} className="journal-card"><div className="journal-card__image"><Picture image={a.image} alt={a.title}/></div><span>{a.category} · {a.date}</span><h3>{a.title}</h3><p>{a.excerpt}</p><span className="journal-more">Đọc bài viết <ArrowUpRight size={16}/></span></SiteLink>)}</div></div></section>
    <CTA go={go}/>
  </>;
}

function PageHero({ eyebrow, title, description, image, breadcrumb, go, size = 'large' }: { eyebrow: string; title: string; description?: string; image: Photo; breadcrumb?: string; go: Navigate; size?: 'large' | 'small' }) {
  return <section className={`page-hero page-hero--${size}`}><div className="page-hero__image"><Picture image={image} alt={`Hình ảnh minh họa ${title}`} eager/></div><div className="page-hero__overlay"/><div className="container page-hero__content"><div className="breadcrumbs"><SiteLink to="/" go={go}>Trang chủ</SiteLink><span>›</span><span>{breadcrumb || title}</span></div><Eyebrow light>{eyebrow}</Eyebrow><h1>{title}</h1>{description && <p>{description}</p>}</div></section>;
}

function About({ go }: { go: Navigate }) {
  return <><PageHero eyebrow="Our story" title="Không gian mang bản sắc riêng" description="Một studio lấy con người và trải nghiệm sống làm trung tâm của mọi ý tưởng thiết kế." image={photos.about} breadcrumb="Giới thiệu" go={go}/>
    <section className="section-pad"><div className="container about-story"><div><Eyebrow>Câu chuyện thương hiệu</Eyebrow><h2 className="display-title">Thiết kế không chỉ để ngắm nhìn, mà để <em>sống cùng.</em></h2></div><div><p className="lead">Chúng tôi tin một ngôi nhà đáng yêu nhất là ngôi nhà mang theo dấu ấn của người sống trong đó.</p><p>Đó có thể là ánh nắng sớm bên bàn ăn, một góc đọc sách tĩnh lặng hay chất liệu bạn muốn chạm vào mỗi ngày. Kiến Trúc Jhouse tiếp cận từng không gian từ những điều giản dị ấy để tạo nên thiết kế có chiều sâu, bền bỉ với thời gian.</p><p>Từ ý tưởng đến hoàn thiện, chúng tôi ưu tiên sự rõ ràng, trách nhiệm và tinh thần đồng hành.</p></div></div></section>
    <section className="story-image"><Picture image={photos.hero} alt="Không gian nội thất sáng ấm"/><div className="story-image__quote">“Thiết kế tốt không chỉ đẹp trong ảnh. Nó phải đẹp trong từng khoảnh khắc sống.”</div></section>
    <section className="section-pad"><div className="container"><SectionHead eyebrow="Giá trị chúng tôi theo đuổi" title="Ba nguyên tắc. Một tinh thần."/><div className="values-grid"><div><span>01 —</span><h3>Thẩm mỹ có chủ đích</h3><p>Vẻ đẹp của không gian được xây dựng từ tỷ lệ, màu sắc, ánh sáng và những lựa chọn nhất quán.</p></div><div><span>02 —</span><h3>Công năng thấu hiểu</h3><p>Mọi giải pháp được cân nhắc theo người sử dụng, nhu cầu thực tế và sự linh hoạt lâu dài.</p></div><div><span>03 —</span><h3>Chi tiết bền vững</h3><p>Tôn trọng vật liệu và kỹ thuật hoàn thiện để không gian đẹp cả khi bước vào đời sống.</p></div></div></div></section>
    <CTA go={go} title="Một không gian rất riêng đang chờ bạn." />
  </>;
}

function Services({ go }: { go: Navigate }) {
  return <><PageHero eyebrow="What we do" title="Dịch vụ của chúng tôi" description="Từ những ý tưởng đầu tiên đến hoàn thiện, mỗi dịch vụ đều được cá nhân hóa cho nhu cầu của bạn." image={photos.detail} breadcrumb="Dịch vụ" go={go}/>
  <section className="section-pad"><div className="container"><SectionHead eyebrow="Giải pháp của Kiến Trúc Jhouse" title="Mỗi hành trình, một giải pháp phù hợp" description="Bạn có thể bắt đầu từ thiết kế, lựa chọn thi công trọn gói hoặc làm mới không gian hiện tại."/><div className="service-list">{services.map((s,i) => <SiteLink key={s.slug} to={`/dich-vu/${s.slug}`} go={go} className="service-row"><div className="service-row__photo"><Picture image={s.photo} alt={s.title}/></div><div className="service-row__copy"><span className="eyebrow-small">0{i+1} / DỊCH VỤ</span><h3>{s.title}</h3><p>{s.introduction}</p><span className="text-link">Khám phá chi tiết <ArrowUpRight size={18}/></span></div><span className="service-row__arrow"><ArrowUpRight size={25}/></span></SiteLink>)}</div></div></section><CTA go={go}/></>;
}

function ServiceDetail({ service, go }: { service: Service; go: Navigate }) {
  return <><PageHero eyebrow={service.eyebrow} title={service.title} description={service.short} image={service.photo} breadcrumb={service.title} go={go}/>
    <section className="section-pad"><div className="container detail-intro"><div><Eyebrow>Giải pháp của chúng tôi</Eyebrow><h2 className="display-title">Không gian được tạo ra <em>cho chính bạn.</em></h2></div><div><p className="lead">{service.introduction}</p><SiteLink to="/lien-he" go={go} className="btn btn--outline">Nhận tư vấn dự án <ArrowUpRight size={17}/></SiteLink></div></div></section>
    <section className="section-pad service-detail-benefits"><div className="container split-feature"><div className="split-feature__image"><Picture image={photos.material} alt="Vật liệu và thiết kế nội thất tinh tế"/></div><div><Eyebrow>Bạn sẽ nhận được</Eyebrow><h2 className="display-title">Chỉn chu ở mọi giai đoạn</h2><ul className="benefits-list">{service.benefits.map(b => <li key={b}><Check size={18}/><span>{b}</span></li>)}</ul><p className="subtle-note">Phạm vi công việc cụ thể sẽ được thống nhất trong báo giá và hợp đồng.</p></div></div></section>
    <section className="section-pad"><div className="container"><SectionHead eyebrow="Dự án tham khảo" title="Khám phá ngôn ngữ thiết kế" action={<SiteLink to="/du-an" go={go} className="text-link">Tất cả dự án <ArrowUpRight size={16}/></SiteLink>}/><div className="featured-grid featured-grid--light">{projects.slice(0,3).map((p,i) => <ProjectCard key={p.slug} project={p} index={i} go={go}/>)}</div><p className="demo-caption demo-caption--dark">Hình ảnh dự án là dữ liệu mẫu để xem trước thiết kế.</p></div></section><CTA go={go}/></>;
}

function Portfolio({ go }: { go: Navigate }) {
  const categories = ['Tất cả', 'Căn hộ', 'Nhà phố', 'Biệt thự', 'Penthouse', 'Văn phòng'] as const;
  const [filter, setFilter] = useState<(typeof categories)[number]>('Tất cả');
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => projects.filter(p => (filter === 'Tất cả' || p.category === filter) && `${p.title} ${p.place} ${p.style}`.toLowerCase().includes(search.toLowerCase())), [filter, search]);
  return <><PageHero eyebrow="Selected works" title="Dự án thực tế" description="Những không gian được kiến tạo từ sự thấu hiểu và tinh thần sáng tạo không ngừng." image={photos.hero} breadcrumb="Dự án" go={go}/>
    <section className="portfolio-section section-pad"><div className="container"><div className="portfolio-controls"><div className="filter-tabs" role="group" aria-label="Lọc dự án theo loại công trình">{categories.map(c => <button key={c} onClick={() => setFilter(c)} className={filter === c ? 'filter-tab filter-tab--active' : 'filter-tab'} aria-pressed={filter === c}>{c}</button>)}</div><label className="portfolio-search"><Search size={17}/><input value={search} onChange={e => setSearch(e.target.value)} aria-label="Tìm kiếm dự án" placeholder="Tìm dự án..." /></label></div>
    <div className="portfolio-count">HIỂN THỊ {filtered.length.toString().padStart(2,'0')} / {projects.length.toString().padStart(2,'0')} DỰ ÁN</div>
    <div className="portfolio-grid">{filtered.map((p,i) => <ProjectCard key={p.slug} project={p} index={i} go={go}/>)}</div>
    {!filtered.length && <div className="empty-results"><p>Chưa tìm thấy dự án phù hợp.</p><button className="btn btn--outline" onClick={() => {setSearch('');setFilter('Tất cả');}}>Xóa bộ lọc <ArrowRight size={16}/></button></div>}
    <p className="demo-caption demo-caption--dark">Lưu ý: tên, thông số và hình ảnh dự án đang là nội dung minh họa của bản demo.</p></div></section><CTA go={go}/></>;
}

function ProjectDetail({ project, go }: { project: Project; go: Navigate }) {
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);
  useEffect(() => {
    if (galleryOpen === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setGalleryOpen(null);
      if (event.key === 'ArrowRight') setGalleryOpen(i => i === null ? null : (i + 1) % project.gallery.length);
      if (event.key === 'ArrowLeft') setGalleryOpen(i => i === null ? null : (i - 1 + project.gallery.length) % project.gallery.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [galleryOpen, project.gallery.length]);
  return <><PageHero eyebrow="Project / Selected works" title={project.title} description={project.intro} image={project.cover} breadcrumb={project.title} go={go}/>
    <section className="project-facts"><div className="container project-facts__inner"><div><small>Loại hình</small><b>{project.category}</b></div><div><small>Diện tích</small><b>{project.area}</b></div><div><small>Vị trí</small><b>{project.place}</b></div><div><small>Phong cách</small><b>{project.style}</b></div></div></section>
    <section className="section-pad"><div className="container detail-intro"><div><Eyebrow>Ý tưởng thiết kế</Eyebrow><h2 className="display-title">Không gian kể <em>câu chuyện riêng.</em></h2></div><div><p className="lead">{project.concept}</p><p>Hình ảnh và thông tin công trình ở trang này được dùng làm nội dung minh họa. Khi đưa website vào sử dụng, hãy thay bằng ảnh, mô tả và hồ sơ công trình thực tế.</p></div></div></section>
    <section className="project-gallery"><div className="container"><div className="project-gallery__heading"><Eyebrow>Thư viện hình ảnh</Eyebrow><p>Chạm vào ảnh để xem kích thước lớn</p></div><div className="gallery-layout">{project.gallery.map((image,i) => <button key={i} type="button" className={`gallery-tile gallery-tile--${i}`} onClick={() => setGalleryOpen(i)} aria-label={`Xem ảnh ${i+1}`}><Picture image={image} alt={`${project.title} - góc nhìn ${i+1}`}/><span><Plus size={22}/></span></button>)}</div></div></section>
    <section className="section-pad"><div className="container"><SectionHead eyebrow="Tiếp tục khám phá" title="Có thể bạn sẽ thích" action={<SiteLink to="/du-an" go={go} className="text-link">Quay lại dự án <ArrowUpRight size={17}/></SiteLink>}/><div className="featured-grid featured-grid--light">{projects.filter(p => p.slug !== project.slug).slice(0,3).map((p,i)=><ProjectCard key={p.slug} project={p} go={go} index={i}/>)}</div></div></section>
    {galleryOpen !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Thư viện ảnh ${project.title}`} onClick={() => setGalleryOpen(null)}><button className="lightbox-close" onClick={() => setGalleryOpen(null)} aria-label="Đóng thư viện"><X size={25}/></button><button className="lightbox-prev" aria-label="Ảnh trước" onClick={e => {e.stopPropagation();setGalleryOpen((galleryOpen-1+project.gallery.length)%project.gallery.length);}}><ChevronLeft size={28}/></button><div className="lightbox-image" onClick={e=>e.stopPropagation()}><Picture image={project.gallery[galleryOpen]} alt={`${project.title} ảnh ${galleryOpen+1}`}/><p>{galleryOpen+1} / {project.gallery.length} · {project.title}</p></div><button className="lightbox-next" aria-label="Ảnh sau" onClick={e => {e.stopPropagation();setGalleryOpen((galleryOpen+1)%project.gallery.length);}}><ChevronRight size={28}/></button></div>}
    <CTA go={go}/></>;
}

function Process({ go }: { go: Navigate }) {
  return <><PageHero eyebrow="How we work" title="Quy trình làm việc" description="Một hành trình minh bạch để mỗi ý tưởng được thực hiện với sự an tâm và chỉn chu." image={photos.process} breadcrumb="Quy trình" go={go}/>
    <section className="section-pad"><div className="container"><SectionHead eyebrow="06 bước đồng hành" title="Từ câu chuyện của bạn đến không gian sống" description="Mỗi bước đều có mục tiêu và đầu ra cụ thể, giúp đôi bên thống nhất trước khi bước tiếp."/><div className="process-timeline">{steps.map((s,i) => <div className="timeline-item" key={s.num}><div className="timeline-number">{s.num}</div><div><span className="eyebrow-small">GIAI ĐOẠN {s.num}</span><h3>{s.title}</h3><p>{s.desc}</p></div>{i < 3 && <Picture image={[photos.about,photos.detail,photos.material][i]} alt={`Quy trình ${s.title}`}/>}</div>)}</div></div></section><CTA go={go} title="Bắt đầu bằng một cuộc trò chuyện."/></>;
}

function Blog({ go }: { go: Navigate }) {
  return <><PageHero eyebrow="Stories & insights" title="Góc cảm hứng" description="Chia sẻ về không gian sống, vật liệu, ánh sáng và những ý tưởng nhỏ tạo nên khác biệt lớn." image={photos.material} breadcrumb="Blog" go={go}/>
    <section className="section-pad"><div className="container"><SectionHead eyebrow="Chia sẻ mới nhất" title="Những góc nhìn dành cho bạn"/><div className="blog-feature"><SiteLink to={`/blog/${articles[0].slug}`} go={go} className="blog-feature__image"><Picture image={articles[0].image} alt={articles[0].title}/></SiteLink><div><Eyebrow>{articles[0].category}</Eyebrow><h3>{articles[0].title}</h3><p>{articles[0].excerpt}</p><SiteLink to={`/blog/${articles[0].slug}`} go={go} className="text-link">Đọc bài viết <ArrowUpRight size={17}/></SiteLink></div></div><div className="journal-grid journal-grid--blog">{articles.slice(1).map(a => <SiteLink key={a.slug} to={`/blog/${a.slug}`} go={go} className="journal-card"><div className="journal-card__image"><Picture image={a.image} alt={a.title}/></div><span>{a.category} · {a.date}</span><h3>{a.title}</h3><p>{a.excerpt}</p><span className="journal-more">Đọc bài viết <ArrowUpRight size={16}/></span></SiteLink>)}</div></div></section><CTA go={go}/></>;
}

function ArticleDetail({ article, go }: { article: Article; go: Navigate }) {
  return <><section className="article-hero"><div className="container article-hero__inside"><div className="breadcrumbs"><SiteLink to="/" go={go}>Trang chủ</SiteLink><span>›</span><SiteLink to="/blog" go={go}>Blog</SiteLink><span>›</span><span>Bài viết</span></div><Eyebrow>{article.category} · {article.date}</Eyebrow><h1>{article.title}</h1><p>{article.excerpt}</p></div></section><div className="article-cover"><Picture image={article.image} alt={article.title} eager/></div><section className="section-pad"><article className="container article-body"><p className="article-lead">{article.excerpt}</p>{article.sections.map(s => <section key={s.title}><h2>{s.title}</h2><p>{s.content}</p></section>)}<div className="article-outro">Thiết kế bền vững luôn bắt đầu bằng sự hiểu biết đúng về nhu cầu sống của chính mình.</div><SiteLink to="/blog" go={go} className="text-link"><ArrowLeft size={16}/> Quay lại tạp chí</SiteLink></article></section><CTA go={go}/></>;
}

function Contact({ go }: { go: Navigate }) {
  const [form, setForm] = useState({ name: '', phone: '', type: '', budget: '', note: '' });
  const [requestText, setRequestText] = useState('');
  const [copied, setCopied] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    const text = `YÊU CẦU TƯ VẤN ${brand.name.toUpperCase()}\nHọ tên: ${form.name.trim()}\nSố điện thoại: ${form.phone.trim()}\nLoại công trình: ${form.type || 'Chưa xác định'}\nNgân sách dự kiến: ${form.budget || 'Trao đổi thêm'}\nNội dung: ${form.note || 'Mong được tư vấn thêm.'}`;
    setRequestText(text); setCopied(false);
    if (brand.email) {
      window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent('Yêu cầu tư vấn nội thất - '+form.name)}&body=${encodeURIComponent(text)}`;
    }
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(requestText); setCopied(true); } catch {
      const input = document.getElementById('contact-summary') as HTMLTextAreaElement | null;
      input?.select();
      setCopied(false);
    }
  };
  return <><PageHero eyebrow="Let's connect" title="Bắt đầu dự án của bạn" description="Kể cho chúng tôi nghe về không gian bạn đang hình dung. Chúng tôi rất muốn lắng nghe." image={photos.about} breadcrumb="Liên hệ" go={go} size="small"/>
    <section className="section-pad contact-section"><div className="container contact-grid"><div className="contact-info"><Eyebrow>Liên hệ với Kiến Trúc Jhouse</Eyebrow><h2 className="display-title">Một ý tưởng hay bắt đầu bằng <em>cuộc trò chuyện.</em></h2><p>Gọi trực tiếp tới hotline, gửi email hoặc để lại thông tin dưới đây. Khi nhấn tạo yêu cầu, website sẽ mở ứng dụng email với nội dung đã được điền sẵn; biểu mẫu chưa tự gửi lên máy chủ.</p><div className="contact-info__details"><div><span>01 / ĐỊA CHỈ</span><strong>{brand.address}</strong></div><div><span>02 / HOTLINE</span><a href={`tel:${brand.hotline}`}>{brand.hotline}</a></div><div><span>03 / GMAIL</span><a href={`mailto:${brand.email}`}>{brand.email}</a></div><div><span>04 / LỊCH HẸN</span><strong>Vui lòng đặt lịch trước để được tư vấn</strong></div></div><div className="contact-ornament">J <span>·</span> H</div></div>
    <div className="contact-form-wrap"><span className="eyebrow-small">FORM / NHẬN TƯ VẤN</span><h3>Chia sẻ về dự án của bạn</h3><form onSubmit={submit} className="contact-form"><div className="form-row"><label>Họ và tên <span>*</span><input required autoComplete="name" maxLength={100} placeholder="Nguyễn Văn A" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>Số điện thoại <span>*</span><input required type="tel" autoComplete="tel" pattern="[0-9+(). -]{9,20}" title="Nhập số điện thoại hợp lệ" placeholder="09xx xxx xxx" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></label></div><div className="form-row"><label>Loại công trình <span className="optional">(tùy chọn)</span><span className="select-wrap"><select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option value="">Chọn loại công trình</option><option>Căn hộ</option><option>Nhà phố</option><option>Biệt thự</option><option>Văn phòng</option><option>Cải tạo</option><option>Khác</option></select><ChevronDown size={17}/></span></label><label>Ngân sách dự kiến <span className="optional">(tùy chọn)</span><span className="select-wrap"><select value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})}><option value="">Chọn ngân sách</option><option>Dưới 300 triệu</option><option>300 – 700 triệu</option><option>700 triệu – 1,5 tỷ</option><option>Trên 1,5 tỷ</option><option>Cần tư vấn thêm</option></select><ChevronDown size={17}/></span></label></div><label>Lời nhắn <span className="optional">(tùy chọn)</span><textarea rows={5} maxLength={2000} value={form.note} onChange={e=>setForm({...form,note:e.target.value})} placeholder="Diện tích, phong cách yêu thích, thời gian dự kiến..."/></label><button className="btn btn--dark" type="submit">Tạo yêu cầu tư vấn <ArrowUpRight size={17}/></button><p className="form-note">* Biểu mẫu mở ứng dụng email trên thiết bị của bạn; thông tin chỉ được gửi khi bạn xác nhận Gửi. Website chưa lưu hoặc tiếp nhận yêu cầu trên máy chủ.</p></form>
    {requestText && <div className="contact-result" role="status"><h4><Check size={18}/> Nội dung yêu cầu đã sẵn sàng</h4><p>{brand.email ? 'Ứng dụng email đã được yêu cầu mở. Vui lòng bấm Gửi trong ứng dụng email để hoàn tất. Bạn cũng có thể sao chép nội dung bên dưới.' : 'Bạn có thể sao chép yêu cầu và gửi qua email cho Kiến Trúc Jhouse.'}</p><textarea id="contact-summary" value={requestText} readOnly rows={7}/><button type="button" className="btn btn--outline" onClick={copy}><Copy size={16}/>{copied ? 'Đã sao chép' : 'Sao chép yêu cầu'}</button></div>}
    </div></div></section></>;
}

function NotFound({ go }: { go: Navigate }) {
  return <div className="not-found container"><Eyebrow>404 · Không tìm thấy</Eyebrow><h1>Trang bạn tìm kiếm chưa có ở đây.</h1><p>Hãy trở về trang chủ để tiếp tục khám phá những không gian truyền cảm hứng.</p><SiteLink to="/" go={go} className="btn btn--dark">Về trang chủ <ArrowRight size={17}/></SiteLink></div>;
}

const normalizePath = (path: string) => path.replace(/\/+$/, '') || '/';
function getPageMeta(path: string) {
  if (path === '/') return ['Kiến Trúc Jhouse | Thiết kế kiến trúc & nội thất', 'Kiến Trúc Jhouse – thiết kế kiến trúc, nội thất, thi công trọn gói và cải tạo không gian. Hotline 0986873126 tại Phường Từ Sơn, TP.Bắc Ninh.'];
  const project = path.startsWith('/du-an/') ? projects.find(p => p.slug === path.split('/')[2]) : null;
  if (project) return [`${project.title} | Kiến Trúc Jhouse`, project.intro];
  const article = path.startsWith('/blog/') ? articles.find(a => a.slug === path.split('/')[2]) : null;
  if (article) return [`${article.title} | Kiến Trúc Jhouse`, article.excerpt];
  const service = path.startsWith('/dich-vu/') ? services.find(s => s.slug === path.split('/')[2]) : null;
  if (service) return [`${service.title} | Kiến Trúc Jhouse`, service.short];
  const labels: Record<string,[string,string]> = {
    '/gioi-thieu': ['Về Kiến Trúc Jhouse | Triết lý thiết kế', 'Khám phá câu chuyện và triết lý thiết kế của Kiến Trúc Jhouse.'],
    '/dich-vu': ['Dịch vụ nội thất | Kiến Trúc Jhouse', 'Thiết kế, thi công trọn gói và cải tạo không gian.'],
    '/du-an': ['Dự án thiết kế nội thất | Kiến Trúc Jhouse', 'Khám phá những không gian nội thất với đa dạng phong cách.'],
    '/quy-trinh': ['Quy trình làm việc | Kiến Trúc Jhouse', 'Quy trình thiết kế và thi công gồm sáu bước minh bạch.'],
    '/blog': ['Góc cảm hứng | Kiến Trúc Jhouse', 'Góc chia sẻ về thiết kế nội thất, chất liệu và không gian sống.'],
    '/lien-he': ['Liên hệ | Kiến Trúc Jhouse', 'Chia sẻ nhu cầu thiết kế nội thất của bạn với Kiến Trúc Jhouse.'],
  };
  return labels[path] || ['Không tìm thấy trang | Kiến Trúc Jhouse', 'Trang bạn tìm kiếm không tồn tại.'];
}

function App() {
  const [pathname, setPathname] = useState(() => normalizePath(window.location.pathname));
  const go: Navigate = (path) => {
    const normalized = normalizePath(path);
    if (window.location.pathname !== normalized) window.history.pushState(null, '', normalized);
    setPathname(normalized);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  useEffect(() => {
    const onPop = () => { setPathname(normalizePath(window.location.pathname));window.scrollTo({top:0,behavior:'instant'}); };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  useEffect(() => {
    const [title, description] = getPageMeta(pathname);
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [pathname]);
  const innerPage = () => {
    if (pathname === '/') return <Home go={go}/>;
    if (pathname === '/gioi-thieu') return <About go={go}/>;
    if (pathname === '/dich-vu') return <Services go={go}/>;
    if (pathname === '/du-an') return <Portfolio go={go}/>;
    if (pathname === '/quy-trinh') return <Process go={go}/>;
    if (pathname === '/blog') return <Blog go={go}/>;
    if (pathname === '/lien-he') return <Contact go={go}/>;
    if (pathname.startsWith('/dich-vu/')) { const s = services.find(x => x.slug === pathname.split('/')[2]); return s ? <ServiceDetail key={s.slug} service={s} go={go}/> : <NotFound go={go}/>; }
    if (pathname.startsWith('/du-an/')) { const p = projects.find(x => x.slug === pathname.split('/')[2]); return p ? <ProjectDetail key={p.slug} project={p} go={go}/> : <NotFound go={go}/>; }
    if (pathname.startsWith('/blog/')) { const a = articles.find(x => x.slug === pathname.split('/')[2]); return a ? <ArticleDetail key={a.slug} article={a} go={go}/> : <NotFound go={go}/>; }
    return <NotFound go={go}/>;
  };
  return <div className="site-shell"><Header pathname={pathname} go={go}/><main id="main-content" key={pathname}>{innerPage()}</main><Footer go={go}/><FloatingContact go={go}/></div>;
}
export default App;
