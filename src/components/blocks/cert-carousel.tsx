"use client";

import Image from "next/image";

const CERTS = [
  {
    src: "/img/partners/cert1.jpg",
    alt: "IvorySQL Compatibility Certificate 1",
  },
  {
    src: "/img/partners/cert2.jpg",
    alt: "IvorySQL Compatibility Certificate 2",
  },
  {
    src: "/img/partners/cert3.jpg",
    alt: "IvorySQL Compatibility Certificate 3",
  },
  {
    src: "/img/partners/cert4.jpg",
    alt: "IvorySQL Compatibility Certificate 4",
  },
  {
    src: "/img/partners/cert5.png",
    alt: "IvorySQL Compatibility Certificate 5",
  },
];

const TRACK = [...CERTS, ...CERTS];

export function CertCarousel() {
  return (
    <>
      <style>{`
        @keyframes cert-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .cert-track {
          animation: cert-scroll 28s linear infinite;
        }
        .cert-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="overflow-hidden">
        <div className="cert-track flex gap-5">
          {TRACK.map((cert, i) => (
            <div
              key={i}
              className="bg-card relative flex h-52 w-72 shrink-0 items-center justify-center overflow-hidden rounded-2xl border p-5"
            >
              <Image
                src={cert.src}
                alt={cert.alt}
                fill
                sizes="288px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
