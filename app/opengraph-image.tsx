import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "SevaSetu: NGO registrations in plain English";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#14464D",
          padding: 72,
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 18 }}>
              <div style={{ width: 7, height: 30, backgroundColor: "#C1861F" }} />
              <div style={{ width: 7, height: 40, backgroundColor: "#C1861F" }} />
              <div style={{ width: 7, height: 30, backgroundColor: "#C1861F" }} />
            </div>
            <div style={{ width: 180, height: 7, backgroundColor: "#C1861F" }} />
          </div>
          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: -1,
            }}
          >
            SevaSetu
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: -2,
            maxWidth: 940,
          }}
        >
          Cut through NGO paperwork before it slows you down
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(255,255,255,0.25)",
            paddingTop: 28,
          }}
        >
          <div style={{ fontSize: 26, opacity: 0.85 }}>
            Your exact registrations, in order and in plain English
          </div>
          <div style={{ fontSize: 20, opacity: 0.6, letterSpacing: 2 }}>PROTOTYPE</div>
        </div>
      </div>
    ),
    size
  );
}
