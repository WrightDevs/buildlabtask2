import { useState } from "react";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const tokens = {
  colors: {
    primary: "#FF5C00",
    primaryHover: "#E04E00",
    primaryLight: "#FFF0E8",
    dark: "#111111",
    darkMid: "#222222",
    muted: "#6B6B6B",
    border: "#E8E3DC",
    cream: "#FFF5EB",
    white: "#FFFFFF",
    success: "#1A7A4A",
    successLight: "#E6F4EC",
    warning: "#B45309",
    warningLight: "#FEF3C7",
    danger: "#C0392B",
    dangerLight: "#FDECEA",
  },
  fonts: {
    display: "'Cabinet Grotesk', 'Bricolage Grotesque', 'Georgia', serif",
    body: "'Satoshi', 'DM Sans', 'system-ui', sans-serif",
  },
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: ${tokens.fonts.body};
      background: ${tokens.colors.cream};
      color: ${tokens.colors.dark};
      -webkit-font-smoothing: antialiased;
    }

    .zest-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: ${tokens.fonts.body};
      font-weight: 600;
      border: none;
      cursor: pointer;
      transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
      letter-spacing: -0.01em;
      white-space: nowrap;
      text-decoration: none;
      position: relative;
      overflow: hidden;
    }
    .zest-btn::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(255,255,255,0.12);
      opacity: 0;
      transition: opacity 0.15s;
    }
    .zest-btn:hover::after { opacity: 1; }
    .zest-btn:active { transform: scale(0.97); }
    .zest-btn:disabled { opacity: 0.45; cursor: not-allowed; pointer-events: none; }

    /* Button sizes */
    .zest-btn-sm  { padding: 8px 16px;  font-size: 13px; border-radius: 8px;  }
    .zest-btn-md  { padding: 12px 22px; font-size: 15px; border-radius: 10px; }
    .zest-btn-lg  { padding: 16px 30px; font-size: 16px; border-radius: 12px; }

    /* Button variants */
    .zest-btn-primary   { background: ${tokens.colors.primary}; color: #fff; box-shadow: 0 2px 12px rgba(255,92,0,0.28); }
    .zest-btn-primary:hover { background: ${tokens.colors.primaryHover}; box-shadow: 0 4px 20px rgba(255,92,0,0.38); transform: translateY(-1px); }
    .zest-btn-secondary { background: ${tokens.colors.dark}; color: #fff; }
    .zest-btn-secondary:hover { background: #333; transform: translateY(-1px); }
    .zest-btn-outline   { background: transparent; color: ${tokens.colors.primary}; border: 2px solid ${tokens.colors.primary}; }
    .zest-btn-outline:hover { background: ${tokens.colors.primaryLight}; }
    .zest-btn-ghost     { background: transparent; color: ${tokens.colors.dark}; }
    .zest-btn-ghost:hover { background: rgba(0,0,0,0.06); }
    .zest-btn-danger    { background: ${tokens.colors.danger}; color: #fff; }
    .zest-btn-danger:hover { background: #a93226; transform: translateY(-1px); }

    /* loading spinner */
    @keyframes spin { to { transform: rotate(360deg); } }
    .zest-spinner {
      width: 15px; height: 15px;
      border: 2px solid rgba(255,255,255,0.35);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
      flex-shrink: 0;
    }
    .zest-spinner-dark {
      border-color: rgba(0,0,0,0.2);
      border-top-color: ${tokens.colors.dark};
    }

    /* Badge */
    .zest-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-family: ${tokens.fonts.body};
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 99px;
    }

    /* Input */
    .zest-input-wrapper { display: flex; flex-direction: column; gap: 6px; }
    .zest-label { font-size: 13px; font-weight: 600; color: ${tokens.colors.dark}; letter-spacing: -0.01em; }
    .zest-input-field-wrap { position: relative; display: flex; align-items: center; }
    .zest-input {
      width: 100%;
      font-family: ${tokens.fonts.body};
      font-size: 15px;
      color: ${tokens.colors.dark};
      background: #fff;
      border: 1.5px solid ${tokens.colors.border};
      border-radius: 10px;
      padding: 11px 14px;
      outline: none;
      transition: border-color 0.15s, box-shadow 0.15s;
    }
    .zest-input::placeholder { color: #B0A89E; }
    .zest-input:focus { border-color: ${tokens.colors.primary}; box-shadow: 0 0 0 3px rgba(255,92,0,0.12); }
    .zest-input-error { border-color: ${tokens.colors.danger} !important; }
    .zest-input-error:focus { box-shadow: 0 0 0 3px rgba(192,57,43,0.12) !important; }
    .zest-input-icon-left  { padding-left: 40px !important; }
    .zest-input-icon-right { padding-right: 40px !important; }
    .zest-input-icon { position: absolute; color: #B0A89E; display: flex; align-items: center; }
    .zest-input-icon-left-pos  { left: 13px; }
    .zest-input-icon-right-pos { right: 13px; }
    .zest-hint { font-size: 12px; color: ${tokens.colors.muted}; }
    .zest-error-text { font-size: 12px; color: ${tokens.colors.danger}; }

    /* Navbar */
    .zest-navbar {
      position: sticky; top: 0; z-index: 100;
      background: rgba(17,17,17,0.96);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      padding: 0 24px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .zest-navbar-logo {
      font-family: ${tokens.fonts.display};
      font-weight: 800;
      font-size: 22px;
      color: #fff;
      letter-spacing: -0.04em;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .zest-navbar-logo span { color: ${tokens.colors.primary}; }
    .zest-navbar-links { display: flex; align-items: center; gap: 4px; }
    .zest-nav-link {
      font-size: 14px;
      font-weight: 500;
      color: rgba(255,255,255,0.65);
      padding: 7px 14px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.15s;
      background: transparent;
      border: none;
      font-family: ${tokens.fonts.body};
    }
    .zest-nav-link:hover { color: #fff; background: rgba(255,255,255,0.08); }
    .zest-nav-link-active { color: #fff !important; background: rgba(255,92,0,0.15) !important; }
    .zest-navbar-actions { display: flex; align-items: center; gap: 10px; }
    .zest-cart-btn {
      position: relative;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.12);
      color: #fff;
      border-radius: 10px;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.15s;
    }
    .zest-cart-btn:hover { background: rgba(255,255,255,0.14); }
    .zest-cart-count {
      position: absolute;
      top: -5px; right: -5px;
      background: ${tokens.colors.primary};
      color: #fff;
      font-size: 10px;
      font-weight: 700;
      width: 17px;
      height: 17px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Cards */
    .zest-restaurant-card {
      background: #fff;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid ${tokens.colors.border};
      transition: transform 0.2s, box-shadow 0.2s;
      cursor: pointer;
    }
    .zest-restaurant-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.1); }
    .zest-card-img-wrap { position: relative; overflow: hidden; }
    .zest-card-img { width: 100%; height: 180px; object-fit: cover; display: block; transition: transform 0.4s; }
    .zest-restaurant-card:hover .zest-card-img { transform: scale(1.04); }
    .zest-card-img-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%);
    }
    .zest-card-badge-wrap { position: absolute; top: 12px; left: 12px; display: flex; gap: 6px; }
    .zest-card-body { padding: 16px; }
    .zest-card-title {
      font-family: ${tokens.fonts.display};
      font-size: 17px;
      font-weight: 700;
      color: ${tokens.colors.dark};
      letter-spacing: -0.03em;
      margin-bottom: 4px;
    }
    .zest-card-meta { font-size: 13px; color: ${tokens.colors.muted}; display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
    .zest-card-dot { width: 3px; height: 3px; border-radius: 50%; background: ${tokens.colors.border}; }
    .zest-card-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 12px; border-top: 1px solid ${tokens.colors.border}; }
    .zest-card-stat { display: flex; align-items: center; gap: 5px; font-size: 13px; font-weight: 600; color: ${tokens.colors.dark}; }

    /* Food Item Card */
    .zest-food-card {
      background: #fff;
      border-radius: 14px;
      border: 1px solid ${tokens.colors.border};
      display: flex;
      gap: 14px;
      padding: 14px;
      transition: box-shadow 0.2s;
      cursor: pointer;
      align-items: center;
    }
    .zest-food-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
    .zest-food-img { width: 80px; height: 80px; border-radius: 10px; object-fit: cover; flex-shrink: 0; }
    .zest-food-info { flex: 1; min-width: 0; }
    .zest-food-name { font-family: ${tokens.fonts.display}; font-size: 15px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 4px; }
    .zest-food-desc { font-size: 12px; color: ${tokens.colors.muted}; line-height: 1.5; margin-bottom: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .zest-food-footer { display: flex; align-items: center; justify-content: space-between; }
    .zest-food-price { font-size: 16px; font-weight: 700; color: ${tokens.colors.dark}; }
    .zest-add-btn {
      width: 32px; height: 32px;
      background: ${tokens.colors.primary};
      color: #fff;
      border: none;
      border-radius: 8px;
      font-size: 20px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.15s;
      flex-shrink: 0;
    }
    .zest-add-btn:hover { background: ${tokens.colors.primaryHover}; transform: scale(1.08); }

    /* Rating */
    .zest-rating { display: flex; align-items: center; gap: 4px; }
    .zest-star { transition: transform 0.15s; cursor: pointer; }
    .zest-star:hover { transform: scale(1.2); }
    .zest-rating-value { font-size: 13px; font-weight: 700; color: ${tokens.colors.dark}; }
    .zest-rating-count { font-size: 12px; color: ${tokens.colors.muted}; }

    /* Modal */
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
    .zest-modal-backdrop {
      position: fixed; inset: 0; z-index: 999;
      background: rgba(0,0,0,0.55);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      animation: fadeIn 0.18s ease;
    }
    .zest-modal {
      background: #fff;
      border-radius: 20px;
      width: 100%;
      max-width: 480px;
      box-shadow: 0 32px 80px rgba(0,0,0,0.2);
      animation: slideUp 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
      overflow: hidden;
    }
    .zest-modal-header {
      padding: 24px 24px 0;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }
    .zest-modal-title {
      font-family: ${tokens.fonts.display};
      font-size: 20px;
      font-weight: 800;
      letter-spacing: -0.04em;
      color: ${tokens.colors.dark};
    }
    .zest-modal-close {
      background: ${tokens.colors.cream};
      border: none;
      border-radius: 8px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      color: ${tokens.colors.muted};
      font-size: 18px;
      transition: all 0.15s;
    }
    .zest-modal-close:hover { background: ${tokens.colors.border}; color: ${tokens.colors.dark}; }
    .zest-modal-body { padding: 16px 24px 24px; }
    .zest-modal-footer { padding: 0 24px 24px; display: flex; gap: 10px; justify-content: flex-end; }

    /* Form */
    .zest-form { display: flex; flex-direction: column; gap: 18px; }
    .zest-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

    /* Demo layout */
    .demo-root { min-height: 100vh; background: ${tokens.colors.cream}; }
    .demo-section {
      padding: 64px 32px;
      max-width: 960px;
      margin: 0 auto;
    }
    .demo-section + .demo-section { border-top: 1px solid ${tokens.colors.border}; }
    .demo-section-label {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: ${tokens.colors.primary};
      margin-bottom: 8px;
    }
    .demo-section-title {
      font-family: ${tokens.fonts.display};
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -0.04em;
      color: ${tokens.colors.dark};
      margin-bottom: 32px;
    }
    .demo-row { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
    .demo-grid-2 { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
    .demo-grid-3 { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
    .demo-inputs { display: flex; flex-direction: column; gap: 16px; max-width: 400px; }

    /* Hero banner */
    .demo-hero {
      background: ${tokens.colors.dark};
      padding: 80px 32px 60px;
      position: relative;
      overflow: hidden;
    }
    .demo-hero-bg {
      position: absolute; inset: 0;
      background: radial-gradient(ellipse at 70% 50%, rgba(255,92,0,0.18) 0%, transparent 60%),
                  radial-gradient(ellipse at 10% 80%, rgba(255,92,0,0.08) 0%, transparent 50%);
    }
    .demo-hero-content { position: relative; max-width: 960px; margin: 0 auto; }
    .demo-hero-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(255,92,0,0.15);
      border: 1px solid rgba(255,92,0,0.3);
      border-radius: 99px;
      padding: 4px 12px;
      font-size: 12px;
      font-weight: 600;
      color: ${tokens.colors.primary};
      letter-spacing: 0.04em;
      text-transform: uppercase;
      margin-bottom: 20px;
    }
    .demo-hero-title {
      font-family: ${tokens.fonts.display};
      font-size: clamp(36px, 5vw, 56px);
      font-weight: 800;
      color: #fff;
      letter-spacing: -0.05em;
      line-height: 1.05;
      margin-bottom: 12px;
    }
    .demo-hero-title span { color: ${tokens.colors.primary}; }
    .demo-hero-sub {
      font-size: 16px;
      color: rgba(255,255,255,0.5);
      margin-bottom: 4px;
      font-weight: 400;
      max-width: 480px;
    }
    .demo-file-tree {
      background: ${tokens.colors.dark};
      border-radius: 14px;
      padding: 24px;
      font-family: 'Courier New', monospace;
      font-size: 13px;
      line-height: 1.9;
      color: rgba(255,255,255,0.75);
      border: 1px solid rgba(255,255,255,0.08);
    }
    .tree-folder { color: #FFD580; font-weight: 600; }
    .tree-file   { color: rgba(255,255,255,0.55); }
    .tree-comment{ color: rgba(255,255,255,0.3); }
    .tree-orange { color: ${tokens.colors.primary}; }
  `}</style>
);

// ─── BUTTON ──────────────────────────────────────────────────────────────────
/**
 * Button
 * @prop {string} variant   - primary | secondary | outline | ghost | danger
 * @prop {string} size      - sm | md | lg
 * @prop {boolean} loading  - show spinner
 * @prop {boolean} disabled
 * @prop {ReactNode} iconLeft  - element before label
 * @prop {ReactNode} iconRight - element after label
 * @prop {function} onClick
 */
const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
  onClick,
  style,
}) => {
  const spinnerClass =
    variant === "outline" || variant === "ghost"
      ? "zest-spinner zest-spinner-dark"
      : "zest-spinner";
  return (
    <button
      className={`zest-btn zest-btn-${size} zest-btn-${variant}`}
      disabled={disabled || loading}
      onClick={onClick}
      style={style}
    >
      {loading ? <span className={spinnerClass} /> : iconLeft}
      {children}
      {!loading && iconRight}
    </button>
  );
};

// ─── BADGE ───────────────────────────────────────────────────────────────────
/**
 * Badge
 * @prop {string} variant  - success | warning | danger | primary | neutral
 * @prop {ReactNode} icon
 */
const badgeStyles = {
  primary: { background: "#FFF0E8", color: "#FF5C00" },
  success: { background: "#E6F4EC", color: "#1A7A4A" },
  warning: { background: "#FEF3C7", color: "#B45309" },
  danger:  { background: "#FDECEA", color: "#C0392B" },
  neutral: { background: "#F4F4F4", color: "#555" },
  dark:    { background: "#111", color: "#fff" },
};
const Badge = ({ children, variant = "primary", icon }) => (
  <span className="zest-badge" style={badgeStyles[variant]}>
    {icon && <span style={{ fontSize: "10px" }}>{icon}</span>}
    {children}
  </span>
);

// ─── INPUT ───────────────────────────────────────────────────────────────────
/**
 * Input
 * @prop {string} label
 * @prop {string} type
 * @prop {string} placeholder
 * @prop {string} value
 * @prop {function} onChange
 * @prop {string} hint
 * @prop {string} error
 * @prop {ReactNode} iconLeft
 * @prop {ReactNode} iconRight
 */
const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  hint,
  error,
  iconLeft,
  iconRight,
  name,
}) => (
  <div className="zest-input-wrapper">
    {label && <label className="zest-label">{label}</label>}
    <div className="zest-input-field-wrap">
      {iconLeft && (
        <span className="zest-input-icon zest-input-icon-left-pos">{iconLeft}</span>
      )}
      <input
        type={type}
        name={name}
        className={[
          "zest-input",
          iconLeft ? "zest-input-icon-left" : "",
          iconRight ? "zest-input-icon-right" : "",
          error ? "zest-input-error" : "",
        ].join(" ")}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {iconRight && (
        <span className="zest-input-icon zest-input-icon-right-pos">{iconRight}</span>
      )}
    </div>
    {error && <span className="zest-error-text">⚠ {error}</span>}
    {hint && !error && <span className="zest-hint">{hint}</span>}
  </div>
);

// ─── RATING ──────────────────────────────────────────────────────────────────
/**
 * Rating
 * @prop {number} value     - 0–5
 * @prop {boolean} interactive
 * @prop {number} count     - review count
 * @prop {function} onChange
 */
const Rating = ({ value = 0, count, interactive = false, onChange }) => {
  const [hovered, setHovered] = useState(null);
  const display = hovered ?? value;
  return (
    <div className="zest-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className="zest-star"
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill={display >= star ? "#FF5C00" : "#E8E3DC"}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(null)}
          onClick={() => interactive && onChange?.(star)}
        >
          <path d="M10 1l2.39 4.84L18 6.83l-4 3.9.94 5.51L10 13.77l-4.94 2.47L6 10.73 2 6.83l5.61-.99L10 1z" />
        </svg>
      ))}
      <span className="zest-rating-value">{value.toFixed(1)}</span>
      {count && <span className="zest-rating-count">({count.toLocaleString()})</span>}
    </div>
  );
};

// ─── RESTAURANT CARD ─────────────────────────────────────────────────────────
/**
 * RestaurantCard
 * @prop {string} name
 * @prop {string} cuisine
 * @prop {string} image       - URL
 * @prop {number} rating
 * @prop {number} reviewCount
 * @prop {string} deliveryTime - e.g. "20–35 min"
 * @prop {string} deliveryFee  - e.g. "Free" | "$1.99"
 * @prop {boolean} isNew
 * @prop {boolean} isPopular
 * @prop {string} priceRange  - e.g. "$$"
 */
const RestaurantCard = ({
  name = "The Burger Spot",
  cuisine = "American, Burgers",
  image,
  rating = 4.5,
  reviewCount = 320,
  deliveryTime = "25–40 min",
  deliveryFee = "Free",
  isNew = false,
  isPopular = false,
  priceRange = "$$",
}) => {
  const imgSrc =
    image ||
    `https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80`;
  return (
    <div className="zest-restaurant-card">
      <div className="zest-card-img-wrap">
        <img className="zest-card-img" src={imgSrc} alt={name} />
        <div className="zest-card-img-overlay" />
        <div className="zest-card-badge-wrap">
          {isPopular && <Badge variant="dark" icon="🔥">Popular</Badge>}
          {isNew && <Badge variant="primary" icon="✦">New</Badge>}
        </div>
      </div>
      <div className="zest-card-body">
        <div className="zest-card-title">{name}</div>
        <div className="zest-card-meta">
          <span>{cuisine}</span>
          <span className="zest-card-dot" />
          <span>{priceRange}</span>
        </div>
        <Rating value={rating} count={reviewCount} />
        <div className="zest-card-footer">
          <div className="zest-card-stat">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF5C00" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {deliveryTime}
          </div>
          <div className="zest-card-stat">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={deliveryFee === "Free" ? "#1A7A4A" : "#6B6B6B"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            <span style={{ color: deliveryFee === "Free" ? "#1A7A4A" : "inherit" }}>
              {deliveryFee} delivery
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── FOOD ITEM CARD ──────────────────────────────────────────────────────────
/**
 * FoodItemCard
 * @prop {string} name
 * @prop {string} description
 * @prop {number} price
 * @prop {string} image
 * @prop {boolean} isVeg
 * @prop {boolean} isBestseller
 * @prop {function} onAdd
 */
const FoodItemCard = ({
  name = "Classic Cheeseburger",
  description = "Beef patty, cheddar, lettuce, tomato, pickles, special sauce",
  price = 12.99,
  image,
  isVeg = false,
  isBestseller = false,
  onAdd,
}) => {
  const [added, setAdded] = useState(false);
  const imgSrc =
    image ||
    `https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=200&q=80`;

  const handleAdd = () => {
    setAdded(true);
    onAdd?.();
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="zest-food-card">
      <img className="zest-food-img" src={imgSrc} alt={name} />
      <div className="zest-food-info">
        <div style={{ display: "flex", gap: "6px", marginBottom: "4px", flexWrap: "wrap" }}>
          {isBestseller && <Badge variant="warning" icon="⭐">Bestseller</Badge>}
          {isVeg && <Badge variant="success" icon="🌿">Veg</Badge>}
        </div>
        <div className="zest-food-name">{name}</div>
        <div className="zest-food-desc">{description}</div>
        <div className="zest-food-footer">
          <div className="zest-food-price">${price.toFixed(2)}</div>
          <button
            className="zest-add-btn"
            onClick={handleAdd}
            title="Add to cart"
            style={added ? { background: "#1A7A4A" } : {}}
          >
            {added ? "✓" : "+"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── MODAL ───────────────────────────────────────────────────────────────────
/**
 * Modal
 * @prop {boolean} isOpen
 * @prop {function} onClose
 * @prop {string} title
 * @prop {ReactNode} children
 * @prop {ReactNode} footer
 */
const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;
  return (
    <div className="zest-modal-backdrop" onClick={onClose}>
      <div className="zest-modal" onClick={(e) => e.stopPropagation()}>
        <div className="zest-modal-header">
          <div className="zest-modal-title">{title}</div>
          <button className="zest-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="zest-modal-body">{children}</div>
        {footer && <div className="zest-modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
/**
 * Navbar
 * @prop {string[]} links
 * @prop {string} activeLink
 * @prop {number} cartCount
 * @prop {function} onCartClick
 */
const Navbar = ({ links = ["Explore", "Orders", "Favourites"], activeLink = "Explore", cartCount = 2, onCartClick }) => (
  <nav className="zest-navbar">
    <div className="zest-navbar-logo">
      <span style={{ color: "#FF5C00" }}>⬡</span> ZEST<span>.</span>
    </div>
    <div className="zest-navbar-links">
      {links.map((link) => (
        <button key={link} className={`zest-nav-link ${link === activeLink ? "zest-nav-link-active" : ""}`}>
          {link}
        </button>
      ))}
    </div>
    <div className="zest-navbar-actions">
      <button className="zest-cart-btn" onClick={onCartClick}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        {cartCount > 0 && <span className="zest-cart-count">{cartCount}</span>}
      </button>
      <Button size="sm" variant="primary">Sign in</Button>
    </div>
  </nav>
);

// ─── SIGNUP FORM ─────────────────────────────────────────────────────────────
/**
 * SignupForm — standalone form component
 * @prop {function} onSubmit
 */
const SignupForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.firstName) e.firstName = "First name required";
    if (!form.email.includes("@")) e.email = "Enter a valid email";
    if (form.password.length < 8) e.password = "Minimum 8 characters";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setDone(true);
    onSubmit?.(form);
  };

  if (done)
    return (
      <div style={{ textAlign: "center", padding: "32px 0" }}>
        <div style={{ fontSize: "40px", marginBottom: "12px" }}>🎉</div>
        <div style={{ fontFamily: tokens.fonts.display, fontSize: "20px", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "6px" }}>
          Welcome to ZEST!
        </div>
        <div style={{ fontSize: "14px", color: tokens.colors.muted }}>Your account is ready. Start exploring.</div>
      </div>
    );

  return (
    <div className="zest-form">
      <div className="zest-form-row">
        <Input label="First Name" placeholder="Jane" value={form.firstName} onChange={set("firstName")} error={errors.firstName} />
        <Input label="Last Name" placeholder="Doe" value={form.lastName} onChange={set("lastName")} />
      </div>
      <Input
        label="Email"
        type="email"
        placeholder="jane@example.com"
        value={form.email}
        onChange={set("email")}
        error={errors.email}
        iconLeft={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>}
      />
      <Input
        label="Phone (optional)"
        type="tel"
        placeholder="+1 555 000 0000"
        value={form.phone}
        onChange={set("phone")}
        iconLeft={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Min. 8 characters"
        value={form.password}
        onChange={set("password")}
        error={errors.password}
        hint="Use a mix of letters, numbers, and symbols"
        iconLeft={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
      />
      <Button variant="primary" size="lg" loading={loading} onClick={handleSubmit} style={{ width: "100%", justifyContent: "center" }}>
        Create My Account
      </Button>
    </div>
  );
};

// ─── DEMO APP ─────────────────────────────────────────────────────────────────
export default function ZestDemo() {
  const [modalOpen, setModalOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [interactiveRating, setInteractiveRating] = useState(3);
  const [cartCount, setCartCount] = useState(2);

  const restaurants = [
    { name: "Smoke & Barrel", cuisine: "BBQ, American", rating: 4.8, reviewCount: 1240, deliveryTime: "20–35 min", deliveryFee: "Free", isPopular: true, priceRange: "$$", image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=500&q=80" },
    { name: "Sakura Ramen", cuisine: "Japanese, Noodles", rating: 4.6, reviewCount: 870, deliveryTime: "30–45 min", deliveryFee: "$1.99", isNew: true, priceRange: "$$$", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80" },
    { name: "Naan Stop", cuisine: "Indian, Vegetarian", rating: 4.4, reviewCount: 504, deliveryTime: "25–40 min", deliveryFee: "Free", priceRange: "$", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&q=80" },
  ];

  const foods = [
    { name: "Smash Burger", description: "Double smash patty, American cheese, caramelised onions, pickles, special sauce on a brioche bun", price: 14.50, isBestseller: true, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80" },
    { name: "Truffle Fries", description: "Crispy fries tossed in truffle oil, parmesan and fresh herbs", price: 7.99, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&q=80" },
    { name: "Garden Bowl", description: "Quinoa, roasted chickpeas, avocado, cherry tomatoes, lemon tahini dressing", price: 13.00, isVeg: true, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&q=80" },
  ];

  return (
    <div className="demo-root">
      <GlobalStyles />

      {/* NAVBAR */}
      <Navbar cartCount={cartCount} onCartClick={() => setModalOpen(true)} />

      {/* HERO */}
      <div className="demo-hero">
        <div className="demo-hero-bg" />
        <div className="demo-hero-content">
          <div className="demo-hero-eyebrow">⬡ ZEST UI — Component Library</div>
          <div className="demo-hero-title">
            Food delivery,<br />
            <span>beautifully</span> built.
          </div>
          <div className="demo-hero-sub">
            A React component library for the ZEST food delivery platform. Modular, typed, and production-ready.
          </div>
        </div>
      </div>

      {/* ── BUTTONS ── */}
      <section className="demo-section">
        <div className="demo-section-label">Component 01</div>
        <div className="demo-section-title">Button</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: tokens.colors.muted, marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Variants</div>
            <div className="demo-row">
              <Button variant="primary">Order Now</Button>
              <Button variant="secondary">Track Order</Button>
              <Button variant="outline">See Menu</Button>
              <Button variant="ghost">Learn More</Button>
              <Button variant="danger">Cancel Order</Button>
            </div>
          </div>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: tokens.colors.muted, marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Sizes</div>
            <div className="demo-row">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: tokens.colors.muted, marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.06em" }}>States</div>
            <div className="demo-row">
              <Button loading>Processing</Button>
              <Button disabled>Unavailable</Button>
              <Button
                iconLeft={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── BADGES ── */}
      <section className="demo-section">
        <div className="demo-section-label">Component 02</div>
        <div className="demo-section-title">Badge</div>
        <div className="demo-row">
          <Badge variant="primary" icon="✦">New</Badge>
          <Badge variant="success" icon="🌿">Veg</Badge>
          <Badge variant="warning" icon="⭐">Bestseller</Badge>
          <Badge variant="danger" icon="⚡">Sold Out</Badge>
          <Badge variant="neutral">$$</Badge>
          <Badge variant="dark" icon="🔥">Popular</Badge>
        </div>
      </section>

      {/* ── INPUTS ── */}
      <section className="demo-section">
        <div className="demo-section-label">Component 03</div>
        <div className="demo-section-title">Input</div>
        <div className="demo-inputs">
          <Input
            label="Search restaurants"
            placeholder="Pizza, sushi, burgers..."
            iconLeft={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>}
          />
          <Input label="Delivery address" placeholder="123 Main St" hint="We'll find restaurants near you" />
          <Input label="Promo code" placeholder="ZEST20" iconRight={<span style={{ fontSize: "12px", fontWeight: 700, color: "#FF5C00", cursor: "pointer" }}>Apply</span>} />
          <Input label="Email" type="email" placeholder="you@example.com" error="Please enter a valid email address" />
        </div>
      </section>

      {/* ── RATING ── */}
      <section className="demo-section">
        <div className="demo-section-label">Component 04</div>
        <div className="demo-section-title">Rating</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: tokens.colors.muted, marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Display</div>
            <Rating value={4.8} count={1240} />
          </div>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: tokens.colors.muted, marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Interactive — click to rate</div>
            <Rating value={interactiveRating} interactive onChange={setInteractiveRating} />
          </div>
        </div>
      </section>

      {/* ── RESTAURANT CARDS ── */}
      <section className="demo-section">
        <div className="demo-section-label">Component 05</div>
        <div className="demo-section-title">Restaurant Card</div>
        <div className="demo-grid-2">
          {restaurants.map((r) => <RestaurantCard key={r.name} {...r} />)}
        </div>
      </section>

      {/* ── FOOD ITEM CARDS ── */}
      <section className="demo-section">
        <div className="demo-section-label">Component 06</div>
        <div className="demo-section-title">Food Item Card</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "520px" }}>
          {foods.map((f) => (
            <FoodItemCard
              key={f.name}
              {...f}
              onAdd={() => setCartCount((c) => c + 1)}
            />
          ))}
        </div>
        <div style={{ marginTop: "12px", fontSize: "13px", color: tokens.colors.muted }}>
          Cart count updates in the navbar ↑ tap "+" to add items
        </div>
      </section>

      {/* ── NAVBAR ── */}
      <section className="demo-section">
        <div className="demo-section-label">Component 07</div>
        <div className="demo-section-title">Navbar</div>
        <div style={{ borderRadius: "14px", overflow: "hidden", border: `1px solid ${tokens.colors.border}` }}>
          <Navbar cartCount={3} />
        </div>
        <div style={{ marginTop: "12px", fontSize: "13px", color: tokens.colors.muted }}>
          Sticky, dark, glassmorphic. Cart icon opens the modal below.
        </div>
      </section>

      {/* ── MODAL ── */}
      <section className="demo-section">
        <div className="demo-section-label">Component 08</div>
        <div className="demo-section-title">Modal</div>
        <div className="demo-row">
          <Button onClick={() => setModalOpen(true)}>Open Cart Modal</Button>
          <Button variant="outline" onClick={() => setSignupOpen(true)}>Open Signup Modal</Button>
        </div>
      </section>

      {/* ── SIGNUP FORM ── */}
      <section className="demo-section">
        <div className="demo-section-label">Component 09</div>
        <div className="demo-section-title">Signup Form</div>
        <div style={{ maxWidth: "460px", background: "#fff", borderRadius: "20px", padding: "32px", border: `1px solid ${tokens.colors.border}` }}>
          <div style={{ fontFamily: tokens.fonts.display, fontSize: "22px", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "6px" }}>
            Create your account
          </div>
          <div style={{ fontSize: "14px", color: tokens.colors.muted, marginBottom: "24px" }}>
            Join ZEST and get your first delivery free.
          </div>
          <SignupForm />
        </div>
      </section>

      {/* MODALS */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Your Cart 🛒"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Continue Shopping</Button>
            <Button variant="primary">Checkout — ${(cartCount * 14.5).toFixed(2)}</Button>
          </>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {cartCount === 0 ? (
            <div style={{ textAlign: "center", padding: "24px 0", color: tokens.colors.muted }}>Your cart is empty</div>
          ) : (
            Array.from({ length: Math.min(cartCount, 3) }).map((_, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", background: tokens.colors.cream, borderRadius: "10px" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "14px" }}>Smash Burger</div>
                  <div style={{ fontSize: "12px", color: tokens.colors.muted }}>x1</div>
                </div>
                <div style={{ fontWeight: 700 }}>$14.50</div>
              </div>
            ))
          )}
        </div>
      </Modal>

      <Modal
        isOpen={signupOpen}
        onClose={() => setSignupOpen(false)}
        title="Join ZEST 🎉"
      >
        <SignupForm onSubmit={() => setTimeout(() => setSignupOpen(false), 2000)} />
      </Modal>
    </div>
  );
}
