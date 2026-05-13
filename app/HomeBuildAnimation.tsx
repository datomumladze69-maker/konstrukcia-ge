"use client"

import { useEffect, useState } from "react"

const stages = [
  "ცარიელი მიწა",
  "საძირკველი და კედლები",
  "დასრულებული სახლი",
  "მოპირკეთებული ეზო",
]

export default function HomeBuildAnimation() {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((current) => (current + 1) % 4)
    }, 2800)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="isoSection">
      <style>{`
        .isoSection {
          max-width: 1200px;
          margin: 60px auto 20px;
          padding: 0 20px;
        }

        .isoTitle {
          text-align: center;
          font-size: 34px;
          font-weight: 900;
          margin: 0 0 12px;
          color: #111827;
        }

        .isoText {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 28px;
          color: #6b7280;
          font-weight: 700;
          line-height: 1.6;
        }

        .isoScene {
          position: relative;
          height: 460px;
          border-radius: 34px;
          overflow: hidden;
          background:
            radial-gradient(circle at 70% 20%, rgba(255,255,255,0.95), transparent 16%),
            linear-gradient(180deg, #bfdbfe 0%, #e0f2fe 45%, #dbeafe 100%);
          box-shadow: 0 26px 70px rgba(15, 23, 42, 0.22);
        }

        .stageBadge {
          position: absolute;
          top: 24px;
          left: 24px;
          z-index: 30;
          background: rgba(17,24,39,0.9);
          color: white;
          padding: 12px 18px;
          border-radius: 999px;
          font-weight: 900;
        }

        .stageName {
          position: absolute;
          left: 50%;
          bottom: 24px;
          transform: translateX(-50%);
          z-index: 30;
          background: rgba(255,255,255,0.96);
          color: #111827;
          padding: 13px 22px;
          border-radius: 999px;
          font-weight: 900;
          box-shadow: 0 12px 28px rgba(0,0,0,0.2);
        }

        .dots {
          position: absolute;
          top: 28px;
          right: 28px;
          display: flex;
          gap: 9px;
          z-index: 30;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.55);
          border: 1px solid white;
        }

        .dot.active {
          background: #f97316;
        }

        .isoWorld {
          position: absolute;
          left: 50%;
          top: 54%;
          width: 620px;
          height: 420px;
          transform-style: preserve-3d;
          transform:
            translate(-50%, -50%)
            rotateX(62deg)
            rotateZ(-38deg);
        }

        .land {
          position: absolute;
          left: 60px;
          top: 100px;
          width: 500px;
          height: 300px;
          background:
            linear-gradient(45deg, rgba(255,255,255,0.14) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(0,0,0,0.08) 25%, transparent 25%),
            linear-gradient(135deg, #a16207, #854d0e);
          background-size: 42px 42px;
          border-radius: 22px;
          box-shadow:
            24px 28px 0 #713f12,
            0 40px 70px rgba(0,0,0,0.28);
        }

        .yard {
          position: absolute;
          left: 80px;
          top: 118px;
          width: 460px;
          height: 260px;
          border-radius: 20px;
          opacity: ${stage >= 3 ? 1 : 0};
          transform: translateZ(${stage >= 3 ? "4px" : "-30px"});
          transition: 900ms ease;
        }

        .grass {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background:
            linear-gradient(45deg, rgba(255,255,255,0.12) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(0,0,0,0.08) 25%, transparent 25%),
            linear-gradient(135deg, #22c55e, #15803d);
          background-size: 38px 38px;
        }

        .path {
          position: absolute;
          left: 172px;
          top: 132px;
          width: 120px;
          height: 128px;
          background:
            linear-gradient(45deg, rgba(75,85,99,0.2) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(75,85,99,0.2) 25%, transparent 25%),
            #d6d3d1;
          background-size: 24px 24px;
          border-radius: 12px;
          box-shadow: 0 8px 0 #a8a29e;
        }

        .foundation {
          position: absolute;
          left: 205px;
          top: 170px;
          width: 210px;
          height: 140px;
          background: #71717a;
          border-radius: 12px;
          box-shadow: 12px 14px 0 #52525b;
          opacity: ${stage >= 1 ? 1 : 0};
          transform: translateZ(${stage >= 1 ? "12px" : "-30px"});
          transition: 800ms ease;
        }

        .house {
          position: absolute;
          left: 215px;
          top: 150px;
          width: 190px;
          height: 145px;
          transform-style: preserve-3d;
          opacity: ${stage >= 1 ? 1 : 0};
          transform: translateZ(${stage >= 1 ? "35px" : "-40px"});
          transition: 1000ms ease;
        }

        .wallFront {
          position: absolute;
          left: 0;
          top: 55px;
          width: 190px;
          height: 110px;
          background: ${stage >= 2 ? "#f8fafc" : "#d1d5db"};
          border: 3px solid #cbd5e1;
          box-shadow: 9px 12px 0 rgba(0,0,0,0.16);
        }

        .wallSide {
          position: absolute;
          left: 190px;
          top: 55px;
          width: 90px;
          height: 110px;
          background: ${stage >= 2 ? "#e5e7eb" : "#9ca3af"};
          transform-origin: left;
          transform: skewY(38deg);
          border: 3px solid #cbd5e1;
        }

        .roofFront {
          position: absolute;
          left: -12px;
          top: 0;
          width: 214px;
          height: 70px;
          background: ${stage >= 2 ? "#991b1b" : "#6b7280"};
          clip-path: polygon(50% 0, 100% 100%, 0 100%);
          box-shadow: 0 14px 0 rgba(0,0,0,0.18);
          opacity: ${stage >= 2 ? 1 : 0.7};
          transition: 800ms ease;
        }

        .roofSide {
          position: absolute;
          left: 190px;
          top: 23px;
          width: 104px;
          height: 70px;
          background: ${stage >= 2 ? "#7f1d1d" : "#4b5563"};
          transform-origin: left;
          transform: skewY(38deg);
          clip-path: polygon(0 0, 100% 55%, 100% 100%, 0 100%);
          opacity: ${stage >= 2 ? 1 : 0.7};
          transition: 800ms ease;
        }

        .door {
          position: absolute;
          left: 76px;
          top: 100px;
          width: 38px;
          height: 65px;
          background: #7c2d12;
          border: 3px solid #431407;
          opacity: ${stage >= 2 ? 1 : 0};
          transition: 600ms ease;
        }

        .window {
          position: absolute;
          top: 88px;
          width: 34px;
          height: 30px;
          background: linear-gradient(135deg, #bfdbfe, #eff6ff);
          border: 3px solid #334155;
          opacity: ${stage >= 2 ? 1 : 0};
          transition: 600ms ease;
        }

        .w1 { left: 28px; }
        .w2 { right: 28px; }

        .worker {
          position: absolute;
          left: 135px;
          top: 230px;
          width: 42px;
          height: 76px;
          transform: translateZ(50px) rotateZ(38deg);
          z-index: 20;
          animation: workerFloat 2s ease-in-out infinite;
        }

        @keyframes workerFloat {
          0%, 100% { margin-top: 0; }
          50% { margin-top: -8px; }
        }

        .helmet {
          position: absolute;
          left: 10px;
          top: 0;
          width: 22px;
          height: 13px;
          background: #facc15;
          border-radius: 14px 14px 4px 4px;
        }

        .head {
          position: absolute;
          left: 12px;
          top: 12px;
          width: 18px;
          height: 20px;
          background: #c08457;
          border-radius: 50%;
        }

        .body {
          position: absolute;
          left: 8px;
          top: 34px;
          width: 26px;
          height: 34px;
          background: #f97316;
          border-radius: 8px;
        }

        .shadow {
          position: absolute;
          left: 150px;
          top: 305px;
          width: 300px;
          height: 70px;
          background: rgba(0,0,0,0.16);
          border-radius: 50%;
          filter: blur(8px);
          transform: translateZ(-8px);
        }

        .tree {
          position: absolute;
          width: 42px;
          height: 82px;
          transform: translateZ(48px);
          opacity: ${stage >= 3 ? 1 : 0};
          transition: 800ms ease;
        }

        .tree1 {
          left: 120px;
          top: 135px;
        }

        .tree2 {
          right: 100px;
          top: 250px;
        }

        .trunk {
          position: absolute;
          left: 18px;
          top: 38px;
          width: 8px;
          height: 38px;
          background: #7c2d12;
        }

        .crown {
          position: absolute;
          left: 0;
          top: 0;
          width: 42px;
          height: 42px;
          background: #15803d;
          border-radius: 50%;
          box-shadow:
            13px 12px 0 #16a34a,
            -9px 13px 0 #22c55e;
        }

        @media (max-width: 800px) {
          .isoTitle {
            font-size: 26px;
          }

          .isoScene {
            height: 360px;
          }

          .isoWorld {
            transform:
              translate(-50%, -50%)
              scale(0.72)
              rotateX(62deg)
              rotateZ(-38deg);
          }

          .stageName {
            width: calc(100% - 40px);
            text-align: center;
            font-size: 13px;
          }
        }
      `}</style>

      <h2 className="isoTitle">
        მშენებლობა იდეიდან დასრულებულ სახლამდე
      </h2>

      <p className="isoText">
        ცარიელი მიწა ავტომატურად გადაიქცევა მშენებლობის პროცესად,
        დასრულებულ სახლად და ბოლოს მოწესრიგებულ ეზოდ.
      </p>

      <div className="isoScene">
        <div className="stageBadge">{stage + 1}/4</div>

        <div className="dots">
          {[0, 1, 2, 3].map((item) => (
            <span
              key={item}
              className={`dot ${stage === item ? "active" : ""}`}
            />
          ))}
        </div>

        <div className="isoWorld">
          <div className="shadow" />
          <div className="land" />

          <div className="yard">
            <div className="grass" />
            <div className="path" />
          </div>

          <div className="foundation" />

          <div className="house">
            <div className="roofFront" />
            <div className="roofSide" />
            <div className="wallFront">
              <div className="window w1" />
              <div className="window w2" />
              <div className="door" />
            </div>
            <div className="wallSide" />
          </div>

          <div className="worker">
            <div className="helmet" />
            <div className="head" />
            <div className="body" />
          </div>

          <div className="tree tree1">
            <div className="trunk" />
            <div className="crown" />
          </div>

          <div className="tree tree2">
            <div className="trunk" />
            <div className="crown" />
          </div>
        </div>

        <div className="stageName">{stages[stage]}</div>
      </div>
    </section>
  )
}
