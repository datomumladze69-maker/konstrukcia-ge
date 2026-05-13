"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

type Product = {
  id: string
  name: string
  category: string
  price: number
  image: string
  description?: string
}

export default function ProductsSearchClient({
  products,
}: {
  products: Product[]
}) {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("ყველა")
  const [showFilter, setShowFilter] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("dark-mode")

    if (savedTheme === "true") {
      setDarkMode(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("dark-mode", darkMode.toString())
  }, [darkMode])

  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase().trim()

    const matchesSearch =
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText)

    const matchesCategory =
      selectedCategory === "ყველა"
        ? true
        : product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      {
        threshold: 0.16,
      }
    )

    elements.forEach((element) => observer.observe(element))

    return () => {
      elements.forEach((element) => observer.unobserve(element))
    }
  }, [filteredProducts.length])

  return (
    <div className={darkMode ? "dark page" : "page"}>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial, sans-serif;
        }

        .page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(249, 115, 22, 0.12), transparent 34%),
            linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%);
          color: #111827;
          transition: all 0.3s ease;
        }

        .dark {
          background:
            radial-gradient(circle at top left, rgba(249, 115, 22, 0.16), transparent 32%),
            linear-gradient(180deg, #020617 0%, #0f172a 100%);
          color: white;
        }

        .reveal {
          opacity: 0;
          transform: translateY(34px) scale(0.98);
          transition:
            opacity 0.75s ease,
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.28s ease,
            border-color 0.28s ease;
          will-change: opacity, transform;
        }

        .reveal.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .navbar {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 20;
          padding: 22px 40px;
        }

        .navInner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          background: rgba(17, 24, 39, 0.36);
          border: 1px solid rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(14px);
          border-radius: 999px;
          padding: 14px 22px;
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.18);
        }

        .logo {
          color: white;
          font-size: 23px;
          font-weight: 900;
          letter-spacing: -1px;
          white-space: nowrap;
        }

        .navRight {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .navSearchInput {
          width: 220px;
          height: 44px;
          border: 1px solid rgba(255,255,255,0.28);
          background: rgba(255,255,255,0.16);
          color: white;
          border-radius: 999px;
          padding: 0 16px;
          font-size: 15px;
          font-weight: 800;
          outline: none;
        }

        .navSearchInput::placeholder {
          color: rgba(255,255,255,0.78);
        }

        .themeButton {
          border: none;
          background: white;
          width: 44px;
          height: 44px;
          border-radius: 999px;
          cursor: pointer;
          font-size: 18px;
          font-weight: 900;
          box-shadow: 0 10px 22px rgba(0,0,0,0.16);
        }

        .navLinks {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }

        .navLinks a {
          color: white;
          text-decoration: none;
          font-weight: 900;
          font-size: 14px;
        }

        .cover {
          position: relative;
          height: 540px;
          overflow: hidden;
          border-bottom-left-radius: 34px;
          border-bottom-right-radius: 34px;
        }

        .cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.02);
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(0,0,0,0.78), rgba(0,0,0,0.46), rgba(0,0,0,0.72));
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 110px 20px 20px;
        }

        .coverBadge {
          background: #f97316;
          color: white;
          padding: 10px 18px;
          border-radius: 999px;
          font-weight: 900;
          margin-bottom: 20px;
          box-shadow: 0 12px 28px rgba(249, 115, 22, 0.35);
        }

        .coverTitle {
          color: white;
          font-size: 76px;
          margin: 0;
          font-weight: 900;
          letter-spacing: -3px;
          line-height: 1;
          text-shadow: 0 14px 38px rgba(0,0,0,0.38);
        }

        .coverText {
          color: #e5e7eb;
          font-size: 22px;
          margin-top: 18px;
          max-width: 700px;
          line-height: 1.45;
        }

        .coverButton {
          margin-top: 28px;
          background: white;
          color: #111827;
          text-decoration: none;
          padding: 15px 26px;
          border-radius: 999px;
          font-weight: 900;
          transition: 0.25s;
          box-shadow: 0 16px 34px rgba(0,0,0,0.28);
        }

        .coverButton:hover {
          transform: translateY(-3px);
          background: #fff7ed;
        }

        .cinematicSection {
          max-width: 1200px;
          margin: 54px auto 0;
          padding: 0 20px;
        }

        .cinematicBox {
          position: relative;
          height: 440px;
          border-radius: 34px;
          overflow: hidden;
          background: #111827;
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.22);
          border: 1px solid ${darkMode ? "#334155" : "rgba(226,232,240,0.95)"};
        }

        .cinematicVideo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.03);
          filter: saturate(1.08) contrast(1.06);
        }

        .cinematicShade {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 72% 30%, rgba(249,115,22,0.2), transparent 25%),
            linear-gradient(90deg, rgba(0,0,0,0.28), rgba(0,0,0,0.1), rgba(0,0,0,0.34)),
            linear-gradient(180deg, rgba(0,0,0,0.06), rgba(0,0,0,0.35));
          pointer-events: none;
        }

        .cinematicLight {
          position: absolute;
          top: -30%;
          left: -55%;
          width: 55%;
          height: 160%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,0.08),
            transparent
          );
          transform: rotate(18deg);
          animation: lightMove 7s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes lightMove {
          0% {
            left: -55%;
            opacity: 0;
          }

          30% {
            opacity: 1;
          }

          70% {
            opacity: 1;
          }

          100% {
            left: 105%;
            opacity: 0;
          }
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 56px 20px 76px;
        }

        .sectionTop {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .sectionTitle {
          font-size: 36px;
          margin: 0;
          font-weight: 900;
          letter-spacing: -1.2px;
        }

        .sectionText {
          margin-top: 10px;
          color: ${darkMode ? "#cbd5e1" : "#6b7280"};
          font-weight: 700;
          line-height: 1.5;
        }

        .productsActions {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .filterWrapper {
          position: relative;
        }

        .filterButton {
          border: none;
          border-radius: 999px;
          background: #111827;
          color: white;
          padding: 13px 19px;
          font-size: 14px;
          font-weight: 900;
          cursor: pointer;
          transition: 0.25s;
        }

        .filterButton:hover {
          background: #f97316;
          transform: translateY(-2px);
        }

        .filterMenu {
          position: absolute;
          top: 52px;
          right: 0;
          background: ${darkMode ? "#1e293b" : "white"};
          border-radius: 20px;
          box-shadow: 0 18px 42px rgba(0,0,0,0.2);
          padding: 10px;
          width: 240px;
          z-index: 100;
          border: 1px solid ${darkMode ? "#334155" : "#e5e7eb"};
        }

        .filterItem {
          width: 100%;
          border: none;
          background: transparent;
          text-align: left;
          padding: 13px 14px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 900;
          cursor: pointer;
          color: ${darkMode ? "white" : "#111827"};
        }

        .filterItem:hover {
          background: ${darkMode ? "#334155" : "#f3f4f6"};
        }

        .activeFilter {
          background: #f97316;
          color: white;
        }

        .count {
          background: ${darkMode ? "#1e293b" : "white"};
          border-radius: 999px;
          padding: 14px 22px;
          font-weight: 900;
          box-shadow: 0 12px 28px rgba(15,23,42,0.1);
          border: 1px solid ${darkMode ? "#334155" : "#e5e7eb"};
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .card {
          background: ${darkMode ? "#1e293b" : "rgba(255,255,255,0.96)"};
          border-radius: 26px;
          overflow: hidden;
          box-shadow: 0 14px 34px rgba(15,23,42,0.09);
          transition:
            opacity 0.75s ease,
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.28s ease,
            border-color 0.28s ease;
          border: 1px solid ${darkMode ? "#334155" : "rgba(226,232,240,0.95)"};
          position: relative;
        }

        .card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 24px 52px rgba(15,23,42,0.18);
          border-color: rgba(249, 115, 22, 0.38);
        }

        .imageBox {
          position: relative;
          height: 220px;
          overflow: hidden;
          background: #e5e7eb;
        }

        .imageBox::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.34));
        }

        .imageBox :global(img) {
          transition: transform 0.4s ease;
        }

        .card:hover .imageBox :global(img) {
          transform: scale(1.08);
        }

        .priceBadge {
          position: absolute;
          bottom: 12px;
          right: 12px;
          background: #111827;
          color: white;
          padding: 9px 13px;
          border-radius: 999px;
          font-weight: 900;
          z-index: 2;
        }

        .stockBadge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(34, 197, 94, 0.95);
          color: white;
          padding: 8px 12px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 900;
          z-index: 2;
        }

        .content {
          padding: 18px;
        }

        .category {
          display: inline-block;
          background: #fff7ed;
          color: #ea580c;
          padding: 7px 12px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 900;
          margin-bottom: 12px;
        }

        .name {
          margin: 0;
          font-size: 22px;
          font-weight: 900;
          line-height: 1.22;
          letter-spacing: -0.4px;
        }

        .rating {
          margin-top: 10px;
          color: #f59e0b;
          font-size: 14px;
          font-weight: 900;
        }

        .smallText {
          margin-top: 14px;
          line-height: 1.6;
          color: ${darkMode ? "#cbd5e1" : "#6b7280"};
          min-height: 70px;
        }

        .buttonRow {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
          margin-top: 18px;
        }

        .button {
          display: flex;
          min-height: 52px;
          align-items: center;
          justify-content: center;
          width: 100%;
          text-align: center;
          background: #f97316;
          color: white;
          text-decoration: none;
          padding: 14px;
          border-radius: 16px;
          font-weight: 900;
          transition: 0.25s;
        }

        .button:hover {
          background: #111827;
          transform: translateY(-2px);
        }

        .empty {
          background: ${darkMode ? "#1e293b" : "white"};
          padding: 28px;
          border-radius: 24px;
          text-align: center;
          font-weight: 900;
          border: 1px solid ${darkMode ? "#334155" : "#e5e7eb"};
        }

        .floatingButtons {
          position: fixed;
          right: 18px;
          bottom: 18px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          z-index: 999;
        }

        .whatsappButton,
        .phoneButton {
          width: 58px;
          height: 58px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 26px;
          box-shadow: 0 12px 26px rgba(0,0,0,0.22);
          transition: 0.25s;
        }

        .whatsappButton {
          background: #25D366;
        }

        .phoneButton {
          background: #111827;
          color: white;
        }

        .whatsappButton:hover,
        .phoneButton:hover {
          transform: scale(1.08) translateY(-2px);
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .cinematicLight {
            animation: none;
          }
        }

        @media (max-width: 1100px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .coverTitle {
            font-size: 58px;
          }
        }

        @media (max-width: 700px) {
          .navbar {
            padding: 14px;
          }

          .navInner {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
            border-radius: 24px;
            padding: 14px;
          }

          .logo {
            font-size: 20px;
          }

          .navRight {
            width: 100%;
            flex-direction: column;
            align-items: stretch;
          }

          .navSearchInput {
            width: 100%;
          }

          .navLinks {
            gap: 12px;
          }

          .navLinks a {
            font-size: 14px;
          }

          .cover {
            height: 470px;
            border-bottom-left-radius: 24px;
            border-bottom-right-radius: 24px;
          }

          .overlay {
            padding-top: 145px;
          }

          .coverTitle {
            font-size: 34px;
            letter-spacing: -1.4px;
          }

          .coverText {
            font-size: 16px;
            line-height: 1.6;
          }

          .cinematicSection {
            margin-top: 34px;
            padding: 0 14px;
          }

          .cinematicBox {
            height: 300px;
            border-radius: 24px;
          }

          .container {
            padding: 38px 14px 60px;
          }

          .sectionTitle {
            font-size: 29px;
          }

          .productsActions {
            width: 100%;
            flex-direction: column;
            align-items: stretch;
          }

          .filterWrapper {
            width: 100%;
          }

          .filterButton {
            width: 100%;
          }

          .filterMenu {
            left: 0;
            right: auto;
            width: 100%;
          }

          .count {
            width: 100%;
            text-align: center;
          }

          .grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .imageBox {
            height: 220px;
          }

          .smallText {
            min-height: auto;
          }

          .floatingButtons {
            right: 12px;
            bottom: 12px;
          }
        }
      `}</style>

      <header className="navbar">
        <div className="navInner">
          <div className="logo">KONSTRUKCIA.GE</div>

          <div className="navRight">
            <input
              className="navSearchInput"
              type="text"
              placeholder="მოძებნე..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              className="themeButton"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            <nav className="navLinks">
              <a href="/">მთავარი</a>
              <a href="#products">პროდუქტები</a>
              <a href="/calculator">კალკულატორი</a>
              <a href="tel:596614614">კონტაქტი</a>
            </nav>
          </div>
        </div>
      </header>

      <section className="cover">
        <Image
          src="/cover.jpg"
          alt="KONSTRUKCIA.GE cover"
          fill
          priority
          style={{
            objectFit: "cover",
          }}
        />

        <div className="overlay">
          <div className="coverBadge">სამშენებლო პროდუქცია</div>

          <h1 className="coverTitle">KONSTRUKCIA.GE</h1>

          <p className="coverText">
            ხარისხიანი სამშენებლო მასალები ერთ სივრცეში
          </p>

          <a className="coverButton" href="#products">
            პროდუქციის ნახვა
          </a>
        </div>
      </section>

      <section className="cinematicSection reveal">
        <div className="cinematicBox">
          <video
            className="cinematicVideo"
            autoPlay
            muted
            loop
            playsInline
            poster="/cover.jpg"
          >
            <source src="/construction-hero.mp4" type="video/mp4" />
          </video>

          <div className="cinematicShade" />
          <div className="cinematicLight" />
        </div>
      </section>

      <section id="products" className="container">
        <div className="sectionTop reveal">
          <div>
            <h2 className="sectionTitle">პოპულარული პროდუქტები</h2>

            <p className="sectionText">
              მოძებნე პროდუქტი და შეუკვეთე მარტივად
            </p>
          </div>

          <div className="productsActions">
            <div className="filterWrapper">
              <button
                className="filterButton"
                onClick={() => setShowFilter(!showFilter)}
              >
                ფილტრი
              </button>

              {showFilter && (
                <div className="filterMenu">
                  <button
                    className={`filterItem ${
                      selectedCategory === "ყველა" ? "activeFilter" : ""
                    }`}
                    onClick={() => {
                      setSelectedCategory("ყველა")
                      setShowFilter(false)
                    }}
                  >
                    ყველა
                  </button>

                  <button
                    className={`filterItem ${
                      selectedCategory === "სამშენებლო ტექნიკა"
                        ? "activeFilter"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedCategory("სამშენებლო ტექნიკა")
                      setShowFilter(false)
                    }}
                  >
                    სამშენებლო ტექნიკა
                  </button>

                  <button
                    className={`filterItem ${
                      selectedCategory === "სამშენებლო ინვენტარი"
                        ? "activeFilter"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedCategory("სამშენებლო ინვენტარი")
                      setShowFilter(false)
                    }}
                  >
                    სამშენებლო ინვენტარი
                  </button>
                </div>
              )}
            </div>

            <div className="count">
              პროდუქტების რაოდენობა: {filteredProducts.length}
            </div>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="empty reveal">პროდუქტი ვერ მოიძებნა Firebase-ში</div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty reveal">პროდუქტი ვერ მოიძებნა</div>
        ) : (
          <div className="grid">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="card reveal"
                style={{
                  transitionDelay: `${Math.min(index * 80, 480)}ms`,
                }}
              >
                <div className="imageBox">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw"
                    style={{
                      objectFit: "cover",
                    }}
                  />

                  <div className="stockBadge">მარაგშია</div>

                  <div className="priceBadge">₾ {product.price}</div>
                </div>

                <div className="content">
                  <div className="category">{product.category}</div>

                  <h2 className="name">{product.name}</h2>

                  <div className="rating">★★★★★ 5.0</div>

                  <p className="smallText">
                    {product.description ||
                      "აღწერა დროებით არ არის დამატებული"}
                  </p>

                  <div className="buttonRow">
                    <a className="button" href="/calculator">
                      კალკულატორში დამატება
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="floatingButtons">
        <a
          className="whatsappButton"
          href="https://wa.me/995598357294"
          target="_blank"
        >
          💬
        </a>

        <a className="phoneButton" href="tel:596614614">
          📞
        </a>
      </div>
    </div>
  )
}
