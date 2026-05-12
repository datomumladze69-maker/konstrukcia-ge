"use client"

import { useEffect, useState } from "react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore/lite"
import { db } from "@/lib/firebase"

type Product = {
  id: string
  name: string
  category: string
  price: number
  image: string
}

type CartItem = Product & {
  quantity: number
}

export default function CalculatorClient({
  products,
}: {
  products: Product[]
}) {
  const [items, setItems] = useState<CartItem[]>([])
  const [quantities, setQuantities] = useState<{
    [key: string]: string
  }>({})
  const [searchText, setSearchText] = useState("")
  const [ordering, setOrdering] = useState(false)
  const [toast, setToast] = useState("")

  const [selectedCategory, setSelectedCategory] =
    useState("ყველა")

  const [showFilter, setShowFilter] = useState(false)

  function showToast(message: string) {
    setToast(message)

    setTimeout(() => {
      setToast("")
    }, 2500)
  }

  useEffect(() => {
    const savedItems = localStorage.getItem("calculator-items")

    if (savedItems) {
      setItems(JSON.parse(savedItems))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("calculator-items", JSON.stringify(items))
  }, [items])

  function changeInputQuantity(productId: string, value: string) {
    setQuantities((prev) => ({
      ...prev,
      [productId]: value,
    }))
  }

  function addToCalculator(product: Product) {
    const quantity = Math.max(1, Number(quantities[product.id]) || 1)

    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      )

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }

      return [...currentItems, { ...product, quantity }]
    })

    setQuantities((prev) => ({
      ...prev,
      [product.id]: "",
    }))

    showToast("პროდუქტი დაემატა კალკულატორში")
  }

  function increaseQuantity(productId: string) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  function decreaseQuantity(productId: string) {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  function changeCartQuantity(productId: string, value: string) {
    const newQuantity = Number(value)

    if (value === "") {
      setItems((currentItems) =>
        currentItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: 0 }
            : item
        )
      )

      return
    }

    if (newQuantity < 1 || Number.isNaN(newQuantity)) {
      return
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  function fixEmptyCartQuantity(productId: string) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId && item.quantity < 1
          ? { ...item, quantity: 1 }
          : item
      )
    )
  }

  function removeItem(productId: string) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    )

    showToast("პროდუქტი ამოიშალა კალკულატორიდან")
  }

  function clearCalculator() {
    setItems([])
    localStorage.removeItem("calculator-items")
    showToast("კალკულატორი გასუფთავდა")
  }

  const filteredProducts = products.filter((product) => {
    const search = searchText.toLowerCase().trim()

    const matchesSearch =
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)

    const matchesCategory =
      selectedCategory === "ყველა"
        ? true
        : product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const totalQuantity = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  const whatsappText = encodeURIComponent(
    `გამარჯობა, მინდა შეკვეთა:\n\n${items
      .map(
        (item) =>
          `${item.name}\nრაოდენობა: ${item.quantity} ცალი\nერთეულის ფასი: ₾ ${item.price}\nჯამი: ₾ ${
            item.price * item.quantity
          }`
      )
      .join("\n\n")}\n\nსულ გადასახდელი: ₾ ${totalPrice}`
  )

  async function sendOrderToWhatsapp() {
    if (items.length === 0) {
      showToast("ჯერ დაამატე პროდუქტი კალკულატორში")
      return
    }

    setOrdering(true)

    try {
      await addDoc(collection(db, "orders"), {
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          category: item.category,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
          total: item.price * item.quantity,
        })),
        totalPrice,
        totalQuantity,
        status: "new",
        createdAt: serverTimestamp(),
      })

      showToast("შეკვეთა შეინახა და WhatsApp იხსნება")

      window.open(
        `https://wa.me/995598357294?text=${whatsappText}`,
        "_blank"
      )
    } catch (error) {
      console.error(error)
      showToast("შეკვეთის შენახვისას მოხდა შეცდომა")
    } finally {
      setOrdering(false)
    }
  }

  return (
    <main>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }

        .page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e5e7eb 100%);
          font-family: Arial, sans-serif;
          color: #111827;
          padding-bottom: 50px;
        }

        .toast {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #111827;
          color: white;
          padding: 14px 18px;
          border-radius: 14px;
          font-weight: 900;
          z-index: 9999;
          box-shadow: 0 12px 28px rgba(0,0,0,0.2);
          animation: toastFade 0.3s ease;
        }

        @keyframes toastFade {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .navbar {
          background: #111827;
          padding: 20px;
        }

        .navInner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .logo {
          color: white;
          font-size: 22px;
          font-weight: 900;
          text-decoration: none;
        }

        .navLinks {
          display: flex;
          gap: 20px;
        }

        .navLinks a {
          color: white;
          text-decoration: none;
          font-size: 15px;
          font-weight: 700;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .hero {
          background: white;
          border-radius: 28px;
          padding: 32px;
          margin-bottom: 28px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
        }

        .title {
          margin: 0 0 10px;
          font-size: 42px;
          font-weight: 900;
          letter-spacing: -1px;
        }

        .subtitle {
          margin: 0;
          color: #6b7280;
          font-size: 17px;
        }

        .searchBox {
          background: white;
          border-radius: 24px;
          padding: 20px;
          margin-bottom: 26px;
          box-shadow: 0 12px 28px rgba(0,0,0,0.08);
          position: relative;
        }

        .topActions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          margin-bottom: 14px;
        }

        .searchLabel {
          display: block;
          font-size: 15px;
          font-weight: 900;
          color: #374151;
        }

        .filterWrapper {
          position: relative;
        }

        .filterButton {
          border: none;
          border-radius: 12px;
          background: #111827;
          color: white;
          padding: 10px 14px;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
        }

        .filterMenu {
          position: absolute;
          top: 48px;
          right: 0;
          background: white;
          border-radius: 16px;
          box-shadow: 0 12px 28px rgba(0,0,0,0.12);
          padding: 10px;
          width: 220px;
          z-index: 50;
          border: 1px solid #e5e7eb;
        }

        .filterItem {
          width: 100%;
          border: none;
          background: transparent;
          text-align: left;
          padding: 12px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          color: #111827;
        }

        .filterItem:hover {
          background: #f3f4f6;
        }

        .activeFilter {
          background: #fff7ed;
          color: #ea580c;
        }

        .searchInput {
          width: 100%;
          height: 52px;
          border: 1px solid #d1d5db;
          border-radius: 16px;
          padding: 0 16px;
          font-size: 16px;
          outline: none;
        }

        .searchInput:focus {
          border-color: #f97316;
        }

        .searchInfo {
          margin: 10px 0 0;
          color: #6b7280;
          font-size: 14px;
          font-weight: 700;
        }

        .layout {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 26px;
          align-items: start;
        }

        .productsGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        .noProducts {
          background: white;
          border-radius: 22px;
          padding: 26px;
          text-align: center;
          color: #6b7280;
          font-weight: 800;
          box-shadow: 0 12px 28px rgba(0,0,0,0.08);
        }

        .card {
          background: white;
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 12px 28px rgba(0,0,0,0.08);
          border: 1px solid rgba(229, 231, 235, 0.9);
          transition: all 0.3s ease;
        }

        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.14);
        }

        .imageBox {
          height: 145px;
          background: #e5e7eb;
          overflow: hidden;
          position: relative;
        }

        .imageBox img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .priceBadge {
          position: absolute;
          right: 12px;
          bottom: 12px;
          background: #111827;
          color: white;
          padding: 7px 11px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 900;
        }

        .content {
          padding: 16px;
        }

        .category {
          display: inline-block;
          background: #fff7ed;
          color: #ea580c;
          padding: 6px 11px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 800;
          margin-bottom: 10px;
        }

        .name {
          margin: 0 0 16px;
          font-size: 20px;
          font-weight: 900;
          min-height: 48px;
        }

        .quantityInput {
          width: 100%;
          height: 46px;
          border: 1px solid #d1d5db;
          border-radius: 14px;
          padding: 0 14px;
          font-size: 16px;
          margin-bottom: 12px;
          outline: none;
        }

        .quantityInput:focus {
          border-color: #f97316;
        }

        .addButton {
          width: 100%;
          border: none;
          border-radius: 14px;
          padding: 12px;
          background: #f97316;
          color: white;
          font-size: 15px;
          font-weight: 900;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .addButton:hover {
          background: #111827;
        }

        .calculatorBox {
          background: white;
          border-radius: 24px;
          padding: 20px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.1);
          position: sticky;
          top: 20px;
        }

        .calculatorTitle {
          margin: 0 0 6px;
          font-size: 25px;
          font-weight: 900;
        }

        .calculatorText {
          margin: 0 0 18px;
          color: #6b7280;
          font-size: 14px;
        }

        .empty {
          background: #f9fafb;
          border-radius: 18px;
          padding: 18px;
          text-align: center;
          color: #6b7280;
          font-size: 15px;
        }

        .cartItems {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 18px;
        }

        .cartItem {
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 12px;
        }

        .cartTop {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 10px;
        }

        .cartName {
          font-size: 15px;
          font-weight: 900;
        }

        .removeButton {
          border: none;
          background: #fee2e2;
          color: #dc2626;
          border-radius: 999px;
          width: 28px;
          height: 28px;
          cursor: pointer;
          font-weight: 900;
        }

        .quantityRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .quantityControls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .qtyButton {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 10px;
          background: #111827;
          color: white;
          font-size: 18px;
          font-weight: 900;
          cursor: pointer;
        }

        .cartQuantityInput {
          width: 62px;
          height: 32px;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          text-align: center;
          font-size: 15px;
          font-weight: 900;
          outline: none;
        }

        .cartQuantityInput:focus {
          border-color: #f97316;
        }

        .itemTotal {
          font-weight: 900;
        }

        .summary {
          border-top: 1px solid #e5e7eb;
          padding-top: 16px;
        }

        .summaryRow {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-weight: 800;
        }

        .grandTotal {
          font-size: 24px;
          font-weight: 900;
          margin-top: 14px;
        }

        .whatsappOrder {
          display: block;
          width: 100%;
          text-align: center;
          text-decoration: none;
          margin-top: 16px;
          border: none;
          border-radius: 14px;
          padding: 13px;
          background: #25D366;
          color: white;
          font-weight: 900;
          cursor: pointer;
          font-size: 15px;
        }

        .whatsappOrder:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .callButton {
          display: block;
          width: 100%;
          text-align: center;
          text-decoration: none;
          margin-top: 10px;
          border-radius: 14px;
          padding: 13px;
          background: #111827;
          color: white;
          font-weight: 900;
          font-size: 15px;
        }

        .clearButton {
          width: 100%;
          margin-top: 10px;
          border: none;
          border-radius: 14px;
          padding: 12px;
          background: #fee2e2;
          color: #dc2626;
          font-weight: 900;
          cursor: pointer;
        }

        @media (max-width: 1000px) {
          .layout {
            grid-template-columns: 1fr;
          }

          .productsGrid {
            grid-template-columns: repeat(2, 1fr);
          }

          .calculatorBox {
            position: static;
          }
        }

        @media (max-width: 650px) {
          .toast {
            left: 14px;
            right: 14px;
            top: 14px;
            text-align: center;
          }

          .navInner {
            flex-direction: column;
            align-items: flex-start;
          }

          .navLinks {
            flex-wrap: wrap;
          }

          .container {
            padding: 28px 14px;
          }

          .hero {
            padding: 24px;
          }

          .title {
            font-size: 32px;
          }

          .productsGrid {
            grid-template-columns: 1fr;
          }

          .name {
            min-height: auto;
          }

          .topActions {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="page">
        {toast && (
          <div className="toast">
            {toast}
          </div>
        )}

        <header className="navbar">
          <div className="navInner">
            <a className="logo" href="/">
              KONSTRUKCIA.GE
            </a>

            <nav className="navLinks">
              <a href="/">მთავარი</a>
              <a href="/#products">პროდუქტები</a>
              <a href="/calculator">კალკულატორი</a>
              <a href="tel:596614614">კონტაქტი</a>
            </nav>
          </div>
        </header>

        <div className="container">
          <section className="hero">
            <h1 className="title">კალკულატორი</h1>

            <p className="subtitle">
              ჩაწერე სასურველი რაოდენობა, გაიგე საორიენტაციო ფასი და დაგვიკავშირდი WhatsApp-ით ან ტელეფონით.
            </p>
          </section>

          <section className="searchBox">
            <div className="topActions">
              <label className="searchLabel">
                პროდუქტის ძებნა
              </label>

              <div className="filterWrapper">
                <button
                  className="filterButton"
                  onClick={() =>
                    setShowFilter(!showFilter)
                  }
                >
                  ფილტრი
                </button>

                {showFilter && (
                  <div className="filterMenu">
                    <button
                      className={`filterItem ${
                        selectedCategory === "ყველა"
                          ? "activeFilter"
                          : ""
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
                        selectedCategory ===
                        "სამშენებლო ტექნიკა"
                          ? "activeFilter"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedCategory(
                          "სამშენებლო ტექნიკა"
                        )
                        setShowFilter(false)
                      }}
                    >
                      სამშენებლო ტექნიკა
                    </button>

                    <button
                      className={`filterItem ${
                        selectedCategory ===
                        "სამშენებლო ინვენტარი"
                          ? "activeFilter"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedCategory(
                          "სამშენებლო ინვენტარი"
                        )
                        setShowFilter(false)
                      }}
                    >
                      სამშენებლო ინვენტარი
                    </button>
                  </div>
                )}
              </div>
            </div>

            <input
              className="searchInput"
              type="text"
              placeholder="მაგ: დოკი, ბეტონი..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <p className="searchInfo">
              ნაპოვნია {filteredProducts.length} პროდუქტი
            </p>
          </section>

          <div className="layout">
            <section>
              {filteredProducts.length === 0 ? (
                <div className="noProducts">
                  ასეთი პროდუქტი ვერ მოიძებნა
                </div>
              ) : (
                <div className="productsGrid">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="card">
                      <div className="imageBox">
                        <img src={product.image} alt={product.name} />
                        <div className="priceBadge">₾ {product.price}</div>
                      </div>

                      <div className="content">
                        <div className="category">{product.category}</div>

                        <h2 className="name">{product.name}</h2>

                        <input
                          className="quantityInput"
                          type="number"
                          min="1"
                          placeholder="ჩაწერე რაოდენობა"
                          value={quantities[product.id] || ""}
                          onChange={(e) =>
                            changeInputQuantity(product.id, e.target.value)
                          }
                        />

                        <button
                          className="addButton"
                          onClick={() => addToCalculator(product)}
                        >
                          კალკულატორში დამატება
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <aside className="calculatorBox">
              <h2 className="calculatorTitle">შენი კალკულაცია</h2>

              <p className="calculatorText">
                დამატებული პროდუქტები: {totalQuantity}
              </p>

              {items.length === 0 ? (
                <div className="empty">
                  ჯერ პროდუქტი არ არის დამატებული
                </div>
              ) : (
                <>
                  <div className="cartItems">
                    {items.map((item) => (
                      <div key={item.id} className="cartItem">
                        <div className="cartTop">
                          <div className="cartName">{item.name}</div>

                          <button
                            className="removeButton"
                            onClick={() => removeItem(item.id)}
                          >
                            ×
                          </button>
                        </div>

                        <div className="quantityRow">
                          <div className="quantityControls">
                            <button
                              className="qtyButton"
                              onClick={() => decreaseQuantity(item.id)}
                            >
                              -
                            </button>

                            <input
                              className="cartQuantityInput"
                              type="number"
                              min="1"
                              value={item.quantity === 0 ? "" : item.quantity}
                              onChange={(e) =>
                                changeCartQuantity(item.id, e.target.value)
                              }
                              onBlur={() => fixEmptyCartQuantity(item.id)}
                            />

                            <button
                              className="qtyButton"
                              onClick={() => increaseQuantity(item.id)}
                            >
                              +
                            </button>
                          </div>

                          <div className="itemTotal">
                            ₾ {item.price * item.quantity}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="summary">
                    <div className="summaryRow">
                      <span>პროდუქტები</span>
                      <span>{totalQuantity} ცალი</span>
                    </div>

                    <div className="summaryRow grandTotal">
                      <span>სულ</span>
                      <span>₾ {totalPrice}</span>
                    </div>

                    <button
                      className="whatsappOrder"
                      onClick={sendOrderToWhatsapp}
                      disabled={ordering}
                    >
                      {ordering
                        ? "შეკვეთა ინახება..."
                        : "WhatsApp-ით შეკვეთა"}
                    </button>

                    <a
                      className="callButton"
                      href="tel:596614614"
                    >
                      📞 დარეკვა: 596 614 614
                    </a>

                    <button className="clearButton" onClick={clearCalculator}>
                      გასუფთავება
                    </button>
                  </div>
                </>
              )}
            </aside>
          </div>
        </div>
      </div>
    </main>
  )
}
