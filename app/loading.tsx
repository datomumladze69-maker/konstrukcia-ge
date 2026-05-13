export default function Loading() {
  return (
    <main>
      <style>{`
        body {
          margin: 0;
        }

        .loaderPage {
          min-height: 100vh;
          background: #0f172a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Arial, sans-serif;
        }

        .loaderBox {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
        }

        .spinner {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          border: 5px solid rgba(255, 255, 255, 0.22);
          border-top-color: #f97316;
          animation: spin 0.8s linear infinite;
        }

        .title {
          color: white;
          font-size: 28px;
          font-weight: 900;
          letter-spacing: -1px;
        }

        .text {
          color: #cbd5e1;
          font-size: 15px;
          font-weight: 700;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <div className="loaderPage">
        <div className="loaderBox">
          <div className="spinner" />
          <div className="title">KONSTRUKCIA.GE</div>
          <div className="text">იტვირთება...</div>
        </div>
      </div>
    </main>
  )
}
