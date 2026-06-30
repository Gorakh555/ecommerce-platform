import { Link } from 'react-router-dom'

const footerSections = [
  {
    heading: 'Shop',
    links: [
      { label: 'All Products',  to: '/products'          },
      { label: 'New Arrivals',  to: '/products?sort=new' },
      { label: 'Best Sellers',  to: '/products?sort=top' },
      { label: 'Deals & Offers',to: '/products?sort=sale'},
    ],
  },
  {
    heading: 'Customer Care',
    links: [
      { label: 'Track My Order',    to: '/track-order'   },
      { label: 'Returns & Refunds', to: '/returns'       },
      { label: 'Size Guide',        to: '/size-guide'    },
      { label: 'FAQs',              to: '/faqs'          },
      { label: 'Contact Us',        to: '/contact'       },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us',       to: '/about'      },
      { label: 'Careers',        to: '/careers'    },
      { label: 'Press & Media',  to: '/press'      },
      { label: 'Sustainability', to: '/green'      },
      { label: 'Sell on Nexora', to: '/register'   },
    ],
  },
]

const paymentIcons = ['💳', '🏦', '📱', '💵']

export default function Footer() {
  return (
    <footer className="bg-ink text-white/55">

      {/* ── Main grid ── */}
      <div className="max-w-[1280px] mx-auto px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12">

          {/* Brand column */}
          <div>
            <Link to="/" className="font-serif text-2xl text-white inline-block mb-4">
              Nexo<span className="text-accent">ra</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-[240px] mb-6">
              Your destination for the best in electronics, fashion, and lifestyle — delivered across India with care.
            </p>

            {/* Social links */}
            <div className="flex gap-2.5 mb-8">
              {[
                { label:'Facebook',  icon:'f' },
                { label:'Instagram', icon:'◎' },
                { label:'Twitter/X', icon:'𝕏' },
                { label:'YouTube',   icon:'▶' },
              ].map(s => (
                <button key={s.label} aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-sm hover:border-accent hover:bg-accent/10 transition-all">
                  {s.icon}
                </button>
              ))}
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">Contact</p>
              <p className="text-sm flex items-center gap-2">
                <span>📧</span> support@nexora.in
              </p>
              <p className="text-sm flex items-center gap-2">
                <span>📞</span> 1800-123-4567
              </p>
              <p className="text-sm flex items-center gap-2">
                <span>⏰</span> Mon–Sat, 9 AM – 7 PM
              </p>
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map(section => (
            <div key={section.heading}>
              <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-white mb-5">
                {section.heading}
              </h3>
              <ul className="space-y-3">
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link to={link.to}
                      className="text-sm hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-xs order-2 sm:order-1">
            © 2026 Nexora Commerce Pvt. Ltd. All rights reserved.
          </p>

          {/* Payment icons */}
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <span className="text-xs text-white/30 mr-1">We accept</span>
            {paymentIcons.map((icon, i) => (
              <span key={i}
                className="w-9 h-6 bg-white/10 rounded flex items-center justify-center text-base border border-white/10">
                {icon}
              </span>
            ))}
          </div>

          {/* Legal links */}
          <div className="flex gap-5 text-xs order-3">
            <Link to="/privacy"  className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms"    className="hover:text-white transition-colors">Terms of Use</Link>
            <Link to="/cookies"  className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
