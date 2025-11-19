'use client'

import Image from 'next/image'
import { Phone, MapPin, MessageCircle } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

interface MenuItem {
  name: string
  price: number
}

interface MenuSection {
  title: string
  items: MenuItem[]
}

const menuData: MenuSection[] = [
  {
    title: 'Pepper Soup',
    items: [
      { name: 'Cow Leg', price: 6000 },
      { name: 'Cow Tail', price: 6000 },
      { name: 'Goat Meat', price: 8500 },
      { name: 'Assorted Meat', price: 4500 },
      { name: 'Catfish Chicken', price: 4500 },
      { name: 'Turkey', price: 7000 },
      { name: 'Chicken', price: 5000 },
    ],
  },
  {
    title: 'Rice Meal',
    items: [
      { name: 'Smokey Jolof Rice', price: 2500 },
      { name: 'Asun, Jolof Rice', price: 3000 },
      { name: 'Coconut Rice', price: 3500 },
      { name: 'Jollof Rice', price: 2500 },
      { name: 'White Rice & Stew', price: 2000 },
      { name: 'White Beans', price: 2000 },
      { name: 'Jambalaya, Jolof Rice', price: 2500 },
      { name: 'Party Food Rice', price: 2500 },
      { name: 'Native Coconut Rice', price: 1500 },
    ],
  },
  {
    title: 'Proteins / Meat',
    items: [
      { name: 'Beef', price: 3000 },
      { name: 'Goat Meat', price: 2500 },
      { name: 'Titus', price: 3000 },
      { name: 'Chicken (Big)', price: 4000 },
      { name: 'Chicken (Small)', price: 3000 },
      { name: 'Croaker', price: 5000 },
      { name: 'Turkey', price: 7000 },
      { name: 'Panla (Big)', price: 4000 },
      { name: 'Panla (Small)', price: 3000 },
    ],
  },
  {
    title: 'Sides / Wraps',
    items: [
      { name: 'Sauced Plantain', price: 1500 },
      { name: 'Moi Moi', price: 1500 },
      { name: 'Salad', price: 1500 },
      { name: 'Shawarma', price: 5000 },
      { name: 'Fried Plantain', price: 5000 },
      { name: 'Chicken Salad', price: 5000 },
      { name: 'Fruit Salad', price: 3000 },
      { name: 'Chicken Wrap', price: 6000 },
    ],
  },
  {
    title: 'Soups',
    items: [
      { name: 'Banga Soup', price: 2000 },
      { name: 'Ogbono Soup', price: 3500 },
      { name: 'Okro Soup', price: 2000 },
      { name: 'White Soup', price: 3500 },
      { name: 'Bitterleaf Soup', price: 2000 },
      { name: 'Ekpang Nkukwo Soup', price: 4000 },
      { name: 'Egusi Soup', price: 2000 },
      { name: 'Afang Soup', price: 2500 },
      { name: 'Oha Soup', price: 2000 },
      { name: 'Edikang Ikong Soup', price: 3000 },
    ],
  },
  {
    title: 'Swallow',
    items: [
      { name: 'Pounded Yam', price: 1000 },
      { name: 'Poundo Yam', price: 1000 },
      { name: 'Semovita', price: 500 },
      { name: 'Fufu', price: 500 },
      { name: 'Garri', price: 500 },
      { name: 'Wheat', price: 1000 },
      { name: 'Oat', price: 1000 },
    ],
  },
  {
    title: 'Beverages',
    items: [
      { name: 'Water', price: 400 },
      { name: 'Coca-Cola', price: 800 },
      { name: 'Zobo Juice', price: 750 },
      { name: 'Fanta', price: 800 },
      { name: 'Exotic', price: 3500 },
      { name: 'Amstel Malt', price: 1500 },
      { name: 'Malta Guinness', price: 1500 },
      { name: 'Bigi', price: 2000 },
    ],
  },
  {
    title: 'Porridge',
    items: [
      { name: 'Porridge (Beans)', price: 1500 },
      { name: 'Porridge (Yam)', price: 1500 },
      { name: 'Porridge (Plantain)', price: 1500 },
      { name: 'Porridge (Offiongs Special Potato)', price: 2000 },
      { name: 'Porridge (Epang)', price: 4000 },
    ],
  },
]

function useScrollAnimation() {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll('[data-scroll-animate]')
    elements.forEach((el) => {
      observerRef.current?.observe(el)
    })

    return () => {
      elements.forEach((el) => {
        observerRef.current?.unobserve(el)
      })
    }
  }, [])

  return visibleElements
}

export function Menu() {
  const [selectedSection, setSelectedSection] = useState(0)
  const visibleElements = useScrollAnimation()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40" id="hero-header" data-scroll-animate>
        <div className="mx-auto max-w-7xl px-4 py-5 md:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 group cursor-pointer hover-lift">
              <div className="relative h-16 w-16">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SHHHHHH-2KMDNhf11kcitoRFsGVxANHFXdt38c.png"
                  alt="Offiong Restaurant Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">Offiong Restaurant</h1>
                <p className="text-xs text-secondary"></p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Hero Section */}
        <section className="py-16 md:py-24 text-center" id="hero-section" data-scroll-animate>
          <div className={visibleElements.has('hero-section') ? 'scroll-fade-in' : ''}>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-foreground">
              Culinary Excellence
            </h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Authentic Nigerian cuisine, crafted with passion and precision
            </p>
          </div>
        </section>

        {/* Menu Navigation */}
        <section className="py-8 border-b border-border/40">
          <div className="flex flex-wrap gap-2 justify-center" id="nav-tabs" data-scroll-animate>
            {menuData.map((section, index) => (
              <button
                key={index}
                onClick={() => setSelectedSection(index)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  selectedSection === index
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-secondary hover:text-foreground'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </section>

        {/* Menu Section */}
        <section className="py-16" id="menu-section" data-scroll-animate>
          <div className={visibleElements.has('menu-section') ? 'scroll-fade-in' : ''}>
            <h3 className="text-4xl font-bold text-foreground mb-12 text-center">
              {menuData[selectedSection].title}
            </h3>
          </div>
          <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {menuData[selectedSection].items.map((item, index) => (
              <div
                key={index}
                id={`menu-item-${selectedSection}-${index}`}
                data-scroll-animate
                className={`p-6 border border-border/40 rounded-2xl hover-lift subtle-glow group transition-all duration-500 ${
                  visibleElements.has(`menu-item-${selectedSection}-${index}`)
                    ? 'scroll-slide-up'
                    : 'opacity-0'
                }`}
                style={{
                  animationDelay: visibleElements.has(`menu-item-${selectedSection}-${index}`)
                    ? `${index * 0.08}s`
                    : '0s',
                }}
              >
                <h4 className="font-medium text-foreground mb-3 text-base group-hover:text-primary transition-colors duration-300">
                  {item.name}
                </h4>
                <span className="text-primary font-semibold text-lg">
                  ₦{item.price.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="border-t border-border/40 py-16" id="contact-section" data-scroll-animate>
          <div className={visibleElements.has('contact-section') ? 'scroll-fade-in' : ''}>
            <h3 className="text-4xl font-bold text-center text-foreground mb-12">
              Get in Touch
            </h3>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            {/* Address */}
            <div
              id="contact-address"
              data-scroll-animate
              className={`flex flex-col items-center text-center group hover-lift transition-all duration-500 ${
                visibleElements.has('contact-address') ? 'scroll-scale-in' : 'opacity-0'
              }`}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h4 className="mb-3 font-semibold text-base text-foreground">Location</h4>
              <p className="text-sm text-secondary leading-relaxed">
                No 27 Alexandria Crescent<br />
                Banex, Wuse 2<br />
                Abuja
              </p>
            </div>

            {/* WhatsApp */}
            <div
              id="contact-whatsapp"
              data-scroll-animate
              className={`flex flex-col items-center text-center group hover-lift transition-all duration-500 ${
                visibleElements.has('contact-whatsapp') ? 'scroll-scale-in' : 'opacity-0'
              }`}
              style={{
                animationDelay: visibleElements.has('contact-whatsapp') ? '0.1s' : '0s',
              }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h4 className="mb-3 font-semibold text-base text-foreground">WhatsApp</h4>
              <a
                href="https://wa.me/2347042583821"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:opacity-70 transition-opacity duration-300 font-medium text-sm"
              >
                +234 704 258 3821
              </a>
            </div>

            {/* Phone */}
            <div
              id="contact-phone"
              data-scroll-animate
              className={`flex flex-col items-center text-center group hover-lift transition-all duration-500 ${
                visibleElements.has('contact-phone') ? 'scroll-scale-in' : 'opacity-0'
              }`}
              style={{
                animationDelay: visibleElements.has('contact-phone') ? '0.2s' : '0s',
              }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h4 className="mb-3 font-semibold text-base text-foreground">Direct Call</h4>
              <a
                href="tel:+2348023705532"
                className="text-primary hover:opacity-70 transition-opacity duration-300 font-medium text-sm"
              >
                +234 802 370 5532
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 mt-16" id="footer" data-scroll-animate>
        <div className={`mx-auto max-w-7xl px-4 text-center md:px-8 ${visibleElements.has('footer') ? 'scroll-fade-in' : ''}`}>
          <p className="text-sm text-secondary">
            © {new Date().getFullYear()} Offiong Restaurant. Crafting memorable experiences in Abuja.
          </p>
        </div>
      </footer>
    </div>
  )
}
