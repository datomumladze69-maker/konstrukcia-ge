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
          background:
            radial-gradient(circle at top left, rgba(249, 115, 22, 0.12), transparent 34%),
            linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%);
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
          background: rgba(17, 24, 39, 0.34);
          border: 1px solid rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(14px);
          border-radius: 999px;
          padding: 14px 22px;
          gap: 18px;
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.18);
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
          width: 210px;
          height: 42px;
          border: 1px solid rgba(255,255,255,0.28);
          background: rgba(255,255,255,0.16);
          backdrop-filter: blur(10px);
          border-radius: 999px;
          padding: 0 16px;
          color: white;
          outline: none;
          font-size: 14px;
          font-weight: 700;
          transition: all 0.25s ease;
        }

        .navSearchInput::placeholder {
          color: rgba(255,255,255,0.78);
        }

        .navSearchInput:focus {
          border-color: rgba(249, 115, 22, 0.95);
          background: rgba(255,255,255,0.24);
          box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.16);
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
          font-weight: 800;
          opacity: 0.95;
          white-space: nowrap;
          transition: color 0.2s ease, opacity 0.2s ease;
        }

        .navLinks a:hover {
          color: #fed7aa;
          opacity: 1;
        }

        .cover {
          width: 100%;
          height: 540px;
          position: relative;
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
          background:
            linear-gradient(90deg, rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.7));
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 110px 20px 20px;
          text-align: center;
        }

        .coverBadge {
          background: rgba(249, 115, 22, 0.96);
          color: white;
          padding: 10px 17px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 900;
          margin-bottom: 18px;
          box-shadow: 0 12px 28px rgba(249, 115, 22, 0.35);
        }

        .coverTitle {
          font-size: 76px;
          font-weight: 900;
          color: white;
          margin: 0 0 14px;
          letter-spacing: -3px;
          line-height: 1;
          max-width: 900px;
          text-shadow: 0 14px 38px rgba(0, 0, 0, 0.38);
        }

        .coverText {
          font-size: 24px;
          color: #f3f4f6;
          margin: 0 0 28px;
          max-width: 720px;
          line-height: 1.45;
        }

        .coverButton {
          display: inline-block;
          background: white;
          color: #111827;
          padding: 15px 26px;
          border-radius: 999px;
          font-size: 16px;
          font-weight: 900;
          text-decoration: none;
          box-shadow: 0 16px 34px rgba(0, 0, 0, 0.28);
          transition: transform 0.25s ease, background 0.25s ease;
        }

        .coverButton:hover {
          transform: translateY(-3px);
          background: #fff7ed;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 56px 20px 76px;
        }

        .sectionTop {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 30px;
        }

        .sectionTitle {
          margin: 0;
          font-size: 36px;
          font-weight: 900;
          letter-spacing: -1.2px;
        }

        .sectionText {
          margin: 8px 0 0;
          color: #6b7280;
          font-size: 16px;
          line-height: 1.5;
        }

        .count {
          white-space: nowrap;
          background: white;
          padding: 12px 18px;
          border-radius: 999px;
          font-size: 15px;
          font-weight: 900;
          color: #374151;
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.1);
          border: 1px solid rgba(229, 231, 235, 0.9);
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .card {
          background: rgba(255, 255, 255, 0.96);
          border-radius: 26px;
          overflow: hidden;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.09);
          transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
          border: 1px solid rgba(226, 232, 240, 0.95);
          position: relative;
        }

        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 52px rgba(15, 23, 42, 0.18);
          border-color: rgba(249, 115, 22, 0.34);
        }

        .imageBox {
          width: 100%;
          height: 172px;
          background: #e5e7eb;
          overflow: hidden;
          position: relative;
        }

        .imageBox::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.32));
          pointer-events: none;
        }

        .imageBox img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.35s ease;
          display: block;
        }

        .card:hover .imageBox img {
          transform: scale(1.08);
        }

        .priceBadge {
          position: absolute;
          right: 12px;
          bottom: 12px;
          background: #111827;
          color: white;
          padding: 8px 12px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 900;
          z-index: 2;
          box-shadow: 0 10px 24px rgba(0,0,0,0.26);
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
          font-size: 21px;
          font-weight: 900;
          color: #111827;
          margin: 0 0 8px;
          min-height: 52px;
          line-height: 1.22;
          letter-spacing: -0.4px;
        }

        .smallText {
          font-size: 14px;
          color: #6b7280;
          margin: 0 0 17px;
          line-height: 1.45;
        }

        .button {
          display: block;
          width: 100%;
          padding: 13px;
          border: none;
          border-radius: 16px;
          background: #111827;
          color: white;
          font-size: 15px;
          font-weight: 900;
          cursor: pointer;
          transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
          text-align: center;
          text-decoration: none;
        }

        .button:hover {
          background: #f97316;
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(249, 115, 22, 0.28);
        }

        .empty {
          background: white;
          padding: 34px;
          border-radius: 24px;
          text-align: center;
          font-size: 22px;
          color: #dc2626;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.1);
          border: 1px solid rgba(229, 231, 235, 0.9);
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
          box-shadow: 0 14px 28px rgba(0,0,0,0.24);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .whatsappButton {
          background: #25D366;
        }

        .phoneButton {
          background: #111827;
        }

        .whatsappButton:hover,
        .phoneButton:hover {
          transform: scale(1.08) translateY(-2px);
          box-shadow: 0 18px 36px rgba(0,0,0,0.28);
        }

        @media (max-width: 1100px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .coverTitle {
            font-size: 58px;
          }

          .navInner {
            border-radius: 28px;
          }

          .navRight {
            gap: 12px;
          }

          .navSearchInput {
            width: 160px;
          }
        }

        @media (max-width: 700px) {
          .navbar {
            padding: 14px;
          }

          .navInner {
            border-radius: 24px;
            align-items: flex-start;
            gap: 12px;
            flex-direction: column;
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
            flex-wrap: wrap;
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
            font-size: 40px;
            letter-spacing: -1.4px;
          }

          .coverText {
            font-size: 18px;
          }

          .container {
            padding: 38px 14px 60px;
          }

          .sectionTop {
            flex-direction: column;
            align-items: flex-start;
          }

          .sectionTitle {
            font-size: 29px;
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
            height: 190px;
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
