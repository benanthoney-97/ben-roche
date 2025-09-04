import Script from "next/script";

export default function VoicePage() {
  const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || "";
  const logoUrl = process.env.NEXT_PUBLIC_BRAND_LOGO_URL || "";

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#fff", color: "#111" }}>
      {/* Header with logo */}
      <header style={{ borderBottom: "1px solid #eee", padding: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", maxWidth: "800px", margin: "0 auto" }}>
          {logoUrl ? (
            <img src={logoUrl} alt="Business logo" style={{ height: "40px", width: "auto" }} />
          ) : (
            <div style={{ height: "40px", width: "40px", borderRadius: "50%", background: "#ddd" }} />
          )}
          <h1 style={{ fontSize: "20px", fontWeight: "600" }}>Speak with our team</h1>
        </div>
      </header>

      {/* Content */}
      <section style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 16px" }}>
        <p style={{ marginBottom: "24px", fontSize: "16px", color: "#555" }}>
          Ask anything about our plumbing services. Tap the widget to start a conversation.
        </p>

        {/* ElevenLabs widget */}
        <elevenlabs-convai agent-id={agentId}></elevenlabs-convai>

        {/* Load ElevenLabs widget script */}
        <Script
          src="https://unpkg.com/@elevenlabs/convai-widget-embed"
          async
          strategy="afterInteractive"
        />
      </section>
    </main>
  );
}