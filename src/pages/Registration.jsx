// inside your Box component wrapper
<Box style={{ gap: 48 }}>

// Theo panel
<aside
  style={{
    flex: 1,
    textAlign: "center",
    marginLeft: 40,   // <- forces a clear gap
    borderLeft: "1px solid rgba(0,0,0,.08)",
    paddingLeft: 28,
    minWidth: 240
  }}
>
  <img src="/assets/theo-write.png" alt="Theo" style={{ maxWidth: 160 }} />
  <p style={{ color: "var(--blue)", fontWeight: 700 }}>
    Register to earn <span style={{ color: "var(--orange)" }}>SnapCoins</span> and{" "}
    <span style={{ color: "var(--orange)" }}>SnapCharms</span> for rewards!
  </p>
</aside>
