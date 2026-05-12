import { getProducts } from "@/lib/getProducts"
import ProductsSearchClient from "./ProductsSearchClient"

export const dynamic = "force-dynamic"

export default async function Page() {
  const products = await getProducts()

  return (
    <main>
      <style>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
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
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 10;
          padding: 22px 40px;
        }

        .navInner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          border-radius: 999px;
          padding: 14px 22px;
          gap: 18px;
        }

        .logo {
          color: white;
          font-size: 22px;
          font-weight: 900;
          letter-spacing: -1px;
          white-space: nowrap;
        }

        .navRight {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .navSearchInput {
          width: 190px;
          height: 42px;
          border: 1px solid rgba(255,255,255,0.28);
          background: rgba(255,255,255,0.14);
          backdrop-filter: blur(10px);
          border-radius: 999px;
          padding: 0 16px;
          color: white;
          outline: none;
          font-size: 14px;
          font-weight: 700;
        }

        .navSearchInput::placeholder {
          color: rgba(255,255,255,0.75);
        }

        .navSearchInput:focus {
          border-color: rgba(249, 115, 22, 0.95);
          background: rgba(255,255,255,0.2);
        }

        .navLinks {
          display: flex;
          gap: 22px;
          align-items: center;
        }

        .navLinks a {
          color: white;
          text-decoration: none;
          font-size: 15px;
          font-weight: 700;
          opacity: 0.95;
          white-space: nowrap;
        }

        .cover {
          width: 100%;
          height: 500px;
          position: relative;
          overflow: hidden;
        }

        .cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            rgba(0, 0, 0, 0.45),
            rgba(0, 0, 0, 0.65)
          );
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 90px 20px 20px;
          text-align: center;
        }

        .coverBadge {
          background: rgba(249, 115, 22, 0.95);
          color: white;
          padding: 9px 16px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 800;
          margin-bottom: 18px;
        }

        .coverTitle {
          font-size: 76px;
          font-weight: 900;
          color: white;
          margin: 0 0 14px;
          letter-spacing: -3px;
          line-height: 1;
        }

        .coverText {
          font-size: 24px;
          color: #f3f4f6;
          margin: 0 0 28px;
        }

        .coverButton {
          display: inline-block;
          background: white;
          color: #111827;
          padding: 14px 24px;
          border-radius: 999px;
          font-size: 16px;
          font-weight: 900;
          text-decoration: none;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 50px 20px 70px;
        }

        .sectionTop {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 28px;
        }

        .sectionTitle {
          margin: 0;
          font-size: 34px;
          font-weight: 900;
          letter-spacing: -1px;
        }

        .sectionText {
          margin: 8px 0 0;
          color: #6b7280;
          font-size: 16px;
        }

        .count {
          white-space: nowrap;
          background: white;
          padding: 12px 18px;
          border-radius: 999px;
          font-size: 15px;
          font-weight: 800;
          color: #374151;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .card {
          background: white;
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 1px solid rgba(229, 231, 235, 0.9);
        }

        .card:hover {
          transform: translateY(-7px);
          box-shadow: 0 22px 45px rgba(0, 0, 0, 0.16);
        }

        .imageBox {
          width: 100%;
          height: 150px;
          background: #e5e7eb;
          overflow: hidden;
          position: relative;
        }

        .imageBox img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
          display: block;
        }

        .card:hover .imageBox img {
          transform: scale(1.07);
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
          padding: 17px;
        }

        .category {
          display: inline-block;
          background: #fff7ed;
          color: #ea580c;
          padding: 6px 11px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 800;
          margin-bottom: 11px;
        }

        .name {
          font-size: 21px;
          font-weight: 900;
          color: #111827;
          margin: 0 0 8px;
          min-height: 52px;
        }

        .smallText {
          font-size: 14px;
          color: #6b7280;
          margin: 0 0 16px;
        }

        .button {
          display: block;
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 14px;
          background: #111827;
          color: white;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          text-decoration: none;
        }

        .button:hover {
          background: #f97316;
        }

        .empty {
          background: white;
          padding: 30px;
          border-radius: 20px;
          text-align: center;
          font-size: 22px;
          color: red;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
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
          width: 64px;
          height: 64px;
          border-radius: 50%;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 28px;
          box-shadow: 0 12px 24px rgba(0,0,0,0.22);
          transition: transform 0.3s ease;
        }

        .whatsappButton {
          background: #25D366;
        }

        .phoneButton {
          background: #111827;
        }

        .whatsappButton:hover,
        .phoneButton:hover {
          transform: scale(1.1);
        }

        @media (max-width: 1100px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .coverTitle {
            font-size: 56px;
          }

          .navInner {
            border-radius: 28px;
          }

          .navRight {
            gap: 12px;
          }

          .navSearchInput {
            width: 150px;
          }
        }

        @media (max-width: 700px) {
          .navbar {
            padding: 14px;
          }

          .navInner {
            border-radius: 22px;
            align-items: flex-start;
            gap: 12px;
            flex-direction: column;
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
            gap: 14px;
            flex-wrap: wrap;
          }

          .cover {
            height: 430px;
          }

          .coverTitle {
            font-size: 39px;
            letter-spacing: -1px;
          }

          .coverText {
            font-size: 18px;
          }

          .container {
            padding: 34px 14px 55px;
          }

          .sectionTop {
            flex-direction: column;
            align-items: flex-start;
          }

          .sectionTitle {
            font-size: 28px;
          }

          .grid {
            grid-template-columns: 1fr;
          }

          .imageBox {
            height: 160px;
          }

          .name {
            min-height: auto;
          }

          .floatingButtons {
            right: 12px;
            bottom: 12px;
          }

          .whatsappButton,
          .phoneButton {
            width: 58px;
            height: 58px;
          }
        }
      `}</style>

      <ProductsSearchClient products={products} />
    </main>
  )
}
