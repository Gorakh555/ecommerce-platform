import { Link }         from 'react-router-dom'
import { useAuth }      from '../context/AuthContext.jsx'
import { useCountdown } from '../hooks/useCountdown.js'

const SALE_END = Date.now() + (8 * 3600 + 47 * 60 + 23) * 1000

export default function LandingPage() {
  const { isAuthenticated, isSeller } = useAuth()
  const cd = useCountdown(SALE_END)

  return (
    <div>
      {/* ── HERO ── */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-warm via-canvas to-canvas overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-accent-light text-accent px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent pulse" />
                New Season Collection
              </div>
              <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl leading-[1.06] tracking-tight text-ink mb-5">
                Shop <em className="text-accent not-italic">Smarter,</em><br />Live Better.
              </h1>
              <p className="text-base lg:text-lg text-ink-soft leading-relaxed max-w-md mb-9">
                Discover thousands of products across electronics, fashion, and lifestyle — delivered fast, priced right, with hassle-free returns on every order.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/products"
                  className="bg-accent text-white px-7 py-3.5 rounded-full text-base font-semibold hover:opacity-90 hover:-translate-y-0.5 transition-all">
                  Browse Products →
                </Link>
                {!isAuthenticated ? (
                  <Link to="/register" className="text-sm font-semibold text-ink-soft hover:text-ink transition-colors flex items-center gap-1">
                    Create account <span>→</span>
                  </Link>
                ) : isSeller ? (
                  <Link to="/seller" className="border border-seller text-seller px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-seller-light transition-colors">
                    Seller Dashboard
                  </Link>
                ) : null}
              </div>

              <div className="flex gap-8 mt-12 pt-8 border-t border-bdr">
                {[
                  { n:'50K+',  l:'Products'        },
                  { n:'1.2M',  l:'Happy customers' },
                  { n:'4.9★',  l:'Avg. rating'     },
                ].map(s => (
                  <div key={s.l}>
                    <div className="font-mono text-xl font-medium text-ink">{s.n}</div>
                    <div className="text-xs text-ink-faint mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative right side */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { e:'👟', n:'Air Runner Pro',      p:4299,  span:true },
                { e:'⌚', n:'Smart Watch X1',      p:12999 },
                { e:'🎧', n:'Studio Headphones',   p:8499  },
              ].map((c, i) => (
                <div key={i} className={`bg-white rounded-[24px] border border-bdr overflow-hidden group hover:-translate-y-1 hover:shadow-xl transition-all ${c.span ? 'row-span-2' : ''}`}>
                  <div className={`bg-warm w-full ${c.span ? 'aspect-[3/4]' : 'aspect-square'} flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300`}>{c.e}</div>
                  <div className="px-4 py-3">
                    <p className="text-[13px] font-semibold text-ink">{c.n}</p>
                    <p className="font-mono text-sm text-accent mt-0.5">₹{c.p.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
              <div className="col-span-2 bg-white border border-bdr rounded-2xl px-4 py-3 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0 pulse" />
                <div>
                  <p className="text-sm font-semibold text-ink">Same-day delivery active</p>
                  <p className="text-xs text-ink-faint">Order before 2 PM for today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE STRIP ── */}
      <section className="border-y border-bdr">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-bdr">
            {[
              { icon:'🚚', t:'Free Delivery',    d:'Free shipping on all orders above ₹999.'    },
              { icon:'🔄', t:'Easy Returns',     d:'30-day hassle-free returns, no questions.'  },
              { icon:'🔒', t:'Secure Payments',  d:'Your data and payments are always safe.'    },
              { icon:'🎯', t:'Genuine Products', d:'Every item sourced from verified sellers.'  },
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-4 py-8 px-6">
                <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center text-xl flex-shrink-0">{f.icon}</div>
                <div>
                  <p className="text-sm font-bold text-ink mb-0.5">{f.t}</p>
                  <p className="text-xs text-ink-soft leading-relaxed">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SALE BANNER ── */}
      <section className="bg-ink py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(45,91,227,0.3)_0%,transparent_65%)] pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-10">
            <div>
              <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-accent mb-3">// Limited Time</p>
              <h2 className="font-serif text-4xl text-white tracking-tight">Monsoon Sale — <em className="text-blue-400 not-italic">Ends in</em></h2>
              <div className="flex gap-5 mt-5">
                {[{v:cd.hours,l:'Hrs'},{v:cd.minutes,l:'Min'},{v:cd.seconds,l:'Sec'}].map(({v,l}) => (
                  <div key={l} className="text-center">
                    <span className="font-mono text-3xl font-medium text-white block leading-none">{v}</span>
                    <span className="text-[10px] text-white/40 uppercase tracking-widest mt-1.5 block">{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <Link to="/products" className="bg-white text-ink px-8 py-4 rounded-full font-bold hover:scale-[1.02] transition-transform flex items-center gap-2 self-center">
              Shop the Sale 🔥
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl text-ink tracking-tight mb-3">What our customers say</h2>
            <p className="text-ink-soft text-base max-w-md mx-auto">Thousands of happy shoppers — here's what some of them think.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { avatar:'😊', name:'Aarav Mehta',  location:'Mumbai',    rating:5,
                text:'Ordered a pair of sneakers and got them the next morning. Packaging was perfect and the price was ₹3,000 less than the brand store.' },
              { avatar:'🙋', name:'Priya Sharma', location:'Bengaluru', rating:5,
                text:'Returns are as smooth as they promise. Wrong size, initiated return at 10pm, courier picked up by 9am, refund in 3 days. Impressive.' },
              { avatar:'👨‍💼', name:'Rohit Gupta',  location:'Delhi',     rating:5,
                text:'Been shopping here for over a year. Product quality is consistently great and the support team actually resolves issues properly.' },
            ].map(t => (
              <div key={t.name} className="bg-white border border-bdr rounded-[24px] p-7 flex flex-col gap-5">
                <div className="text-4xl font-serif text-accent-light leading-none select-none">"</div>
                <p className="text-sm text-ink-soft leading-relaxed flex-1">{t.text}</p>
                <div>
                  <div className="text-amber-400 text-sm mb-3">{'★'.repeat(t.rating)}</div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-warm border border-bdr flex items-center justify-center text-xl flex-shrink-0">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink leading-tight">{t.name}</p>
                      <p className="text-xs text-ink-faint">{t.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-16 bg-warm">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="max-w-[480px] mx-auto text-center">
            <h2 className="font-serif text-3xl text-ink tracking-tight mb-3">Stay in the loop</h2>
            <p className="text-ink-soft text-sm mb-7">
              Get early access to flash sales, new arrivals, and exclusive deals — straight to your inbox.
            </p>
            <form
              onSubmit={e => e.preventDefault()}
              className="flex gap-2.5"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3 border-[1.5px] border-bdr rounded-full text-sm bg-white focus:outline-none focus:border-accent transition-colors"
              />
              <button
                type="submit"
                className="bg-accent text-white px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Subscribe →
              </button>
            </form>
            <p className="text-xs text-ink-faint mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
