"use client"

import { useEffect, useState } from "react"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore/lite"
import { db } from "@/lib/firebase"

type ProductForm = {
  id: string
  name: string
  price: string
  image: string
  description: string
  category: string
}

type OrderItem = {
  id: string
  name: string
  category: string
  price: number
  image: string
  quantity: number
  total: number
}

type Order = {
  id: string
  items: OrderItem[]
  totalPrice: number
  totalQuantity: number
  status: string
  createdAt: string
}

const emptyProduct = {
  id: "",
  name: "",
  price: "",
  image: "",
  description: "",
  category: "",
}

export default function AdminClient() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  const [products, setProducts] = useState<ProductForm[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [newProduct, setNewProduct] =
    useState<ProductForm>(emptyProduct)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState("")
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState("")

  useEffect(() => {
    const savedLogin = localStorage.getItem("admin-login")

    if (savedLogin === "true") {
      setIsLoggedIn(true)
    }
  }, [])

  useEffect(() => {
    if (!isLoggedIn) return

    async function loadData() {
      await loadProducts()
      await loadOrders()
      setLoading(false)
    }

    loadData()
  }, [isLoggedIn])

  async function loadProducts() {
    const snapshot = await getDocs(
      collection(db, "products")
    )

    const loadedProducts: ProductForm[] =
      snapshot.docs.map((document) => {
        const data = document.data()

        return {
          id: document.id,
          name: String(data.name || ""),
          price: String(data.price || ""),
          image: String(data.image || ""),
          description: String(data.description || ""),
          category: String(data.category || ""),
        }
      })

    setProducts(loadedProducts)
  }

  async function loadOrders() {
    const snapshot = await getDocs(
      collection(db, "orders")
    )

    const loadedOrders: Order[] =
      snapshot.docs.map((document) => {
        const data = document.data()

        let createdAt = "თარიღი არ არის"

        if (data.createdAt?.seconds) {
          createdAt = new Date(
            data.createdAt.seconds * 1000
          ).toLocaleString("ka-GE")
        }

        return {
          id: document.id,
          items: Array.isArray(data.items)
            ? data.items
            : [],
          totalPrice: Number(data.totalPrice || 0),
          totalQuantity: Number(data.totalQuantity || 0),
          status: String(data.status || "new"),
          createdAt,
        }
      })

    setOrders(loadedOrders.reverse())
  }

 async function login() {
  setLoginError("")

  try {
    const response = await fetch("/api/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      setLoginError(
        data.message || "პაროლი არასწორია"
      )

      return
    }

    setIsLoggedIn(true)

    localStorage.setItem(
      "admin-login",
      "true"
    )

    setPassword("")
  } catch (error) {
    console.error(error)

    setLoginError(
      "დაფიქსირდა შეცდომა"
    )
  }
}

  function logout() {
    localStorage.removeItem("admin-login")
    setIsLoggedIn(false)
    setPassword("")
  }

  function updateField(
    id: string,
    field: keyof ProductForm,
    value: string
  ) {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id
          ? { ...product, [field]: value }
          : product
      )
    )
  }

  function updateNewProduct(
    field: keyof ProductForm,
    value: string
  ) {
    setNewProduct((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  async function saveProduct(product: ProductForm) {
    setSaving(product.id)

    await updateDoc(doc(db, "products", product.id), {
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
    })

    setSaving("")
    alert("პროდუქტი წარმატებით განახლდა")
  }

  async function createNewProduct() {
    if (
      !newProduct.name ||
      !newProduct.price
    ) {
      alert("შეავსე სახელი და ფასი")
      return
    }

    setCreating(true)

    const newDoc = await addDoc(
      collection(db, "products"),
      {
        name: newProduct.name,
        price: newProduct.price,
        image: newProduct.image,
        description: newProduct.description,
        category: newProduct.category,
      }
    )

    setProducts((currentProducts) => [
      ...currentProducts,
      {
        ...newProduct,
        id: newDoc.id,
      },
    ])

    setNewProduct(emptyProduct)
    setCreating(false)

    alert("ახალი პროდუქტი დაემატა")
  }

  async function deleteProduct(
    productId: string,
    productName: string
  ) {
    const confirmed = window.confirm(
      `ნამდვილად გინდა წაშალო "${productName}" ?`
    )

    if (!confirmed) {
      return
    }

    setDeleting(productId)

    await deleteDoc(
      doc(db, "products", productId)
    )

    setProducts((currentProducts) =>
      currentProducts.filter(
        (product) =>
          product.id !== productId
      )
    )

    setDeleting("")

    alert("პროდუქტი წაიშალა")
  }

  if (!isLoggedIn) {
    return (
      <main>
        <style>{`
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
          }

          .loginPage {
            min-height: 100vh;
            background: linear-gradient(135deg, #111827, #374151);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            font-family: Arial, sans-serif;
          }

          .loginBox {
            width: 100%;
            max-width: 420px;
            background: white;
            border-radius: 28px;
            padding: 32px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.25);
          }

          .loginTitle {
            margin: 0 0 10px;
            font-size: 34px;
            font-weight: 900;
            color: #111827;
          }

          .loginText {
            margin: 0 0 24px;
            color: #6b7280;
            font-size: 16px;
          }

          .loginInput {
            width: 100%;
            height: 50px;
            border: 1px solid #d1d5db;
            border-radius: 16px;
            padding: 0 16px;
            font-size: 16px;
            outline: none;
            margin-bottom: 14px;
          }

          .loginInput:focus {
            border-color: #f97316;
          }

          .loginButton {
            width: 100%;
            border: none;
            border-radius: 16px;
            background: #f97316;
            color: white;
            padding: 14px;
            font-size: 16px;
            font-weight: 900;
            cursor: pointer;
          }

          .loginButton:hover {
            background: #111827;
          }

          .error {
            margin: 0 0 14px;
            color: #dc2626;
            font-weight: 800;
          }
        `}</style>

        <div className="loginPage">
          <div className="loginBox">
            <h1 className="loginTitle">Admin Login</h1>

            <p className="loginText">
              შეიყვანე პაროლი
            </p>

            {loginError ? (
              <p className="error">
                {loginError}
              </p>
            ) : null}

            <input
              className="loginInput"
              type="password"
              placeholder="პაროლი"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  login()
                }
              }}
            />

            <button
              className="loginButton"
              onClick={login}
            >
              შესვლა
            </button>
          </div>
        </div>
      </main>
    )
  }

  if (loading) {
    return (
      <main
        style={{
          padding: 40,
          fontFamily: "Arial",
        }}
      >
        იტვირთება...
      </main>
    )
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
          background: #f3f4f6;
          font-family: Arial, sans-serif;
          color: #111827;
        }

        .navbar {
          background: #111827;
          padding: 20px;
        }

        .navInner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .logo {
          color: white;
          text-decoration: none;
          font-size: 22px;
          font-weight: 900;
        }

        .navLinks {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
          align-items: center;
        }

        .navLinks a {
          color: white;
          text-decoration: none;
          font-weight: 800;
          font-size: 15px;
        }

        .logoutButton {
          border: none;
          border-radius: 999px;
          background: #fee2e2;
          color: #dc2626;
          padding: 10px 16px;
          font-weight: 900;
          cursor: pointer;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px 70px;
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
        }

        .subtitle {
          margin: 0;
          color: #6b7280;
          font-size: 17px;
        }

        .addBox {
          background: white;
          border-radius: 24px;
          padding: 24px;
          margin-bottom: 28px;
          box-shadow: 0 12px 28px rgba(0,0,0,0.08);
        }

        .addTitle {
          margin: 0 0 20px;
          font-size: 28px;
          font-weight: 900;
        }

        .addGrid {
          display: grid;
          gap: 14px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .card {
          background: white;
          border-radius: 24px;
          padding: 22px;
          box-shadow: 0 12px 28px rgba(0,0,0,0.08);
          border: 1px solid #e5e7eb;
        }

        .cardTitle {
          margin: 0 0 18px;
          font-size: 24px;
          font-weight: 900;
        }

        .field {
          margin-bottom: 14px;
        }

        .label {
          display: block;
          font-size: 14px;
          font-weight: 900;
          margin-bottom: 7px;
          color: #374151;
        }

        .input,
        .textarea {
          width: 100%;
          border: 1px solid #d1d5db;
          border-radius: 14px;
          padding: 13px 14px;
          font-size: 15px;
          outline: none;
        }

        .textarea {
          min-height: 110px;
          resize: vertical;
        }

        .input:focus,
        .textarea:focus {
          border-color: #f97316;
        }

        .preview {
          width: 100%;
          height: 170px;
          background: #e5e7eb;
          border-radius: 18px;
          overflow: hidden;
          margin-bottom: 16px;
        }

        .preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .buttonRow {
          display: flex;
          gap: 12px;
        }

        .saveButton {
          flex: 1;
          border: none;
          border-radius: 16px;
          background: #f97316;
          color: white;
          padding: 14px;
          font-size: 16px;
          font-weight: 900;
          cursor: pointer;
        }

        .saveButton:hover {
          background: #111827;
        }

        .deleteButton {
          flex: 1;
          border: none;
          border-radius: 16px;
          background: #dc2626;
          color: white;
          padding: 14px;
          font-size: 16px;
          font-weight: 900;
          cursor: pointer;
        }

        .deleteButton:hover {
          background: #991b1b;
        }

        .saveButton:disabled,
        .deleteButton:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .ordersBox {
          background: white;
          border-radius: 24px;
          padding: 24px;
          margin-top: 32px;
          box-shadow: 0 12px 28px rgba(0,0,0,0.08);
        }

        .ordersHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .ordersTitle {
          margin: 0;
          font-size: 28px;
          font-weight: 900;
        }

        .refreshButton {
          border: none;
          border-radius: 14px;
          background: #111827;
          color: white;
          padding: 12px 16px;
          font-weight: 900;
          cursor: pointer;
        }

        .ordersGrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        .orderCard {
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          padding: 18px;
          background: #f9fafb;
        }

        .orderTop {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
        }

        .orderDate {
          font-weight: 900;
          color: #111827;
        }

        .orderStatus {
          background: #fff7ed;
          color: #ea580c;
          border-radius: 999px;
          padding: 6px 10px;
          font-size: 13px;
          font-weight: 900;
        }

        .orderSummary {
          display: grid;
          gap: 6px;
          margin-bottom: 14px;
          font-weight: 800;
          color: #374151;
        }

        .orderItems {
          display: grid;
          gap: 10px;
        }

        .orderItem {
          background: white;
          border-radius: 14px;
          padding: 12px;
          border: 1px solid #e5e7eb;
        }

        .orderItemName {
          margin: 0 0 6px;
          font-weight: 900;
        }

        .orderItemText {
          margin: 0;
          color: #6b7280;
          font-size: 14px;
          font-weight: 700;
        }

        .emptyOrders {
          background: #f9fafb;
          border-radius: 18px;
          padding: 20px;
          text-align: center;
          color: #6b7280;
          font-weight: 800;
        }

        @media (max-width: 800px) {
          .grid,
          .ordersGrid {
            grid-template-columns: 1fr;
          }

          .navInner,
          .ordersHeader {
            align-items: flex-start;
            flex-direction: column;
          }

          .title {
            font-size: 32px;
          }

          .buttonRow {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="page">
        <header className="navbar">
          <div className="navInner">
            <a
              className="logo"
              href="/"
            >
              KONSTRUKCIA.GE Admin
            </a>

            <nav className="navLinks">
              <a href="/">მთავარი</a>

              <a href="/calculator">
                კალკულატორი
              </a>

              <button
                className="logoutButton"
                onClick={logout}
              >
                გასვლა
              </button>
            </nav>
          </div>
        </header>

        <div className="container">
          <section className="hero">
            <h1 className="title">
              Admin Panel
            </h1>

            <p className="subtitle">
              პროდუქტების მართვა
            </p>
          </section>

          <section className="addBox">
            <h2 className="addTitle">
              ახალი პროდუქტის დამატება
            </h2>

            <div className="addGrid">
              <input
                className="input"
                placeholder="სახელი"
                value={newProduct.name}
                onChange={(e) =>
                  updateNewProduct(
                    "name",
                    e.target.value
                  )
                }
              />

              <input
                className="input"
                placeholder="ფასი"
                value={newProduct.price}
                onChange={(e) =>
                  updateNewProduct(
                    "price",
                    e.target.value
                  )
                }
              />

              <input
                className="input"
                placeholder="/image.jpg"
                value={newProduct.image}
                onChange={(e) =>
                  updateNewProduct(
                    "image",
                    e.target.value
                  )
                }
              />

              <input
                className="input"
                placeholder="კატეგორია"
                value={newProduct.category}
                onChange={(e) =>
                  updateNewProduct(
                    "category",
                    e.target.value
                  )
                }
              />

              <textarea
                className="textarea"
                placeholder="აღწერა"
                value={newProduct.description}
                onChange={(e) =>
                  updateNewProduct(
                    "description",
                    e.target.value
                  )
                }
              />

              <button
                className="saveButton"
                disabled={creating}
                onClick={createNewProduct}
              >
                {creating
                  ? "ემატება..."
                  : "პროდუქტის დამატება"}
              </button>
            </div>
          </section>

          <section className="grid">
            {products.map((product) => (
              <div
                key={product.id}
                className="card"
              >
                <h2 className="cardTitle">
                  {product.name}
                </h2>

                <div className="preview">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                    />
                  ) : null}
                </div>

                <div className="field">
                  <label className="label">
                    სახელი
                  </label>

                  <input
                    className="input"
                    value={product.name}
                    onChange={(e) =>
                      updateField(
                        product.id,
                        "name",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="field">
                  <label className="label">
                    ფასი
                  </label>

                  <input
                    className="input"
                    value={product.price}
                    onChange={(e) =>
                      updateField(
                        product.id,
                        "price",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="field">
                  <label className="label">
                    ფოტო
                  </label>

                  <input
                    className="input"
                    value={product.image}
                    onChange={(e) =>
                      updateField(
                        product.id,
                        "image",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="field">
                  <label className="label">
                    კატეგორია
                  </label>

                  <input
                    className="input"
                    value={product.category}
                    onChange={(e) =>
                      updateField(
                        product.id,
                        "category",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="field">
                  <label className="label">
                    აღწერა
                  </label>

                  <textarea
                    className="textarea"
                    value={product.description}
                    onChange={(e) =>
                      updateField(
                        product.id,
                        "description",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="buttonRow">
                  <button
                    className="saveButton"
                    disabled={saving === product.id}
                    onClick={() =>
                      saveProduct(product)
                    }
                  >
                    {saving === product.id
                      ? "ინახება..."
                      : "შენახვა"}
                  </button>

                  <button
                    className="deleteButton"
                    disabled={
                      deleting === product.id
                    }
                    onClick={() =>
                      deleteProduct(
                        product.id,
                        product.name
                      )
                    }
                  >
                    {deleting === product.id
                      ? "იშლება..."
                      : "წაშლა"}
                  </button>
                </div>
              </div>
            ))}
          </section>

          <section className="ordersBox">
            <div className="ordersHeader">
              <h2 className="ordersTitle">
                შეკვეთების ისტორია
              </h2>

              <button
                className="refreshButton"
                onClick={loadOrders}
              >
                განახლება
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="emptyOrders">
                ჯერ შეკვეთები არ არის
              </div>
            ) : (
              <div className="ordersGrid">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="orderCard"
                  >
                    <div className="orderTop">
                      <div className="orderDate">
                        {order.createdAt}
                      </div>

                      <div className="orderStatus">
                        {order.status === "new"
                          ? "ახალი"
                          : order.status}
                      </div>
                    </div>

                    <div className="orderSummary">
                      <div>
                        პროდუქტები: {order.totalQuantity} ცალი
                      </div>

                      <div>
                        ჯამი: ₾ {order.totalPrice}
                      </div>
                    </div>

                    <div className="orderItems">
                      {order.items.map((item, index) => (
                        <div
                          key={`${order.id}-${item.id}-${index}`}
                          className="orderItem"
                        >
                          <p className="orderItemName">
                            {item.name}
                          </p>

                          <p className="orderItemText">
                            {item.quantity} ცალი × ₾ {item.price} = ₾ {item.total}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
