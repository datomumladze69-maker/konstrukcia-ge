export default function Loading() {
  return (
    <main>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #f3f4f6;
        }

        .page {
          min-height: 100vh;
          background: linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%);
        }

        .hero {
          height: 540px;
          background: linear-gradient(90deg, #111827, #374151, #111827);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          text-align: center;
        }

        .heroBox {
          width: 100%;
          max-width: 700px;
        }

        .skeleton {
          background: linear-gradient(
            90deg,
            #e5e7eb 25%,
            #f3f4f6 50%,
            #e5e7eb 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.2s infinite;
        }

        .badge {
          width: 180px;
          height: 36px;
          border-radius: 999px;
          margin: 0 auto 22px;
        }

        .title {
          height: 72px;
          border-radius: 24px;
          margin-bottom: 18px;
        }

        .text {
          width: 70%;
          height: 26px;
          border-radius: 999px;
          margin: 0 auto;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 56px 20px 76px;
        }

        .sectionTop {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 30px;
        }

        .sectionLeft {
          flex: 1;
        }

        .sectionTitle {
          width: 330px;
          height: 42px;
          border-radius: 18px;
          margin-bottom: 14px;
        }

        .sectionText {
          width: 260px;
          height: 20px;
          border-radius: 999px;
        }

        .count {
          width: 220px;
          height: 46px;
          border-radius: 999px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .card {
          background: white;
          border-radius: 26px;
          overflow: hidden;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.09);
        }

        .image {
          height: 220px;
        }

        .content {
          padding: 18px;
        }

        .lineSmall {
          width: 48%;
          height: 18px;
          border-radius: 999px;
          margin-bottom: 14px;
        }

        .lineTitle {
          height: 28px;
          border-radius: 12px;
          margin-bottom: 14px;
        }

        .lineText {
          height: 16px;
          border-radius: 999px;
          margin-bottom: 10px;
        }

        .button {
          height: 48px;
          border-radius: 16px;
          margin-top: 18px;
        }

        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }

          100% {
            background-position: -200% 0;
          }
        }

        @media (max-width: 1100px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 700px) {
          .hero {
            height: 470px;
          }

          .title {
            height: 48px;
          }

          .container {
            padding: 38px 14px 60px;
          }

          .sectionTop {
            flex-direction: column;
          }

          .sectionTitle,
          .sectionText,
          .count {
            width: 100%;
          }

          .grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .image {
            height: 190px;
          }
        }
      `}</style>

      <div className="page">
        <section className="hero">
          <div className="heroBox">
            <div className="skeleton badge" />
            <div className="skeleton title" />
            <div className="skeleton text" />
          </div>
        </section>

        <section className="container">
          <div className="sectionTop">
            <div className="sectionLeft">
              <div className="skeleton sectionTitle" />
              <div className="skeleton sectionText" />
            </div>

            <div className="skeleton count" />
          </div>

          <div className="grid">
            {[1, 2, 3, 4].map((item) => (
              <div className="card" key={item}>
                <div className="skeleton image" />

                <div className="content">
                  <div className="skeleton lineSmall" />
                  <div className="skeleton lineTitle" />
                  <div className="skeleton lineText" />
                  <div className="skeleton lineText" />
                  <div className="skeleton button" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
