import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "linear-gradient(135deg, #05070d 0%, #0b1020 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "white", fontWeight: "bold", fontSize: "48px" }}>M</span>
          </div>
          <span style={{ color: "white", fontWeight: "bold", fontSize: "64px" }}>
            MemeLaunch OS
          </span>
        </div>
        <div
          style={{
            color: "#94a3b8",
            fontSize: "32px",
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          Launch Operating System for Memecoin Teams
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
