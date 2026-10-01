import React, { useState, useEffect } from 'react';

/**
 * TransparentBadge Component
 * Displays the league badge strictly WITHOUT any background.
 * Uses a Canvas chromakey processor to remove black/dark backgrounds from JPGs,
 * with adaptive blend mode for pristine rendering in both Light and Dark themes.
 */
export const TransparentBadge = ({
  src,
  alt = 'League Badge',
  size = 56,
  glowColor = '#8B5CF6',
  isLocked = false,
  className = '',
  style = {}
}) => {
  const [processedSrc, setProcessedSrc] = useState(null);

  useEffect(() => {
    if (!src || isLocked) {
      setProcessedSrc(null);
      return;
    }

    let isMounted = true;
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || 256;
        canvas.height = img.naturalHeight || 256;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          if (isMounted) setProcessedSrc(src);
          return;
        }

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imgData.data;

        // Strip dark/black background pixels (chromakey black to transparent)
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i];
          const g = d[i + 1];
          const b = d[i + 2];
          const brightness = Math.max(r, g, b);

          if (brightness < 40) {
            d[i + 3] = 0; // 100% transparent
          } else if (brightness < 80) {
            // Feather edge pixels
            const alphaFactor = (brightness - 40) / 40;
            d[i + 3] = Math.round(d[i + 3] * alphaFactor);
          }
        }

        ctx.putImageData(imgData, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        if (isMounted) {
          setProcessedSrc(dataUrl);
        }
      } catch {
        // Fallback to original
        if (isMounted) {
          setProcessedSrc(src);
        }
      }
    };

    img.onerror = () => {
      if (isMounted) setProcessedSrc(src);
    };

    img.src = src;

    return () => {
      isMounted = false;
    };
  }, [src, isLocked]);

  if (isLocked) {
    return (
      <div
        className={`locked-badge-silhouette ${className}`}
        style={{
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          ...style
        }}
      >
        {/* Light Theme Silhouette trophy shape */}
        <svg
          width={size * 0.85}
          height={size * 0.85}
          viewBox="0 0 48 48"
          fill="none"
          style={{ opacity: 0.55 }}
        >
          <path
            d="M12 6H36V18C36 24.6274 30.6274 30 24 30C17.3726 30 12 24.6274 12 18V6Z"
            fill="#CBD5E1"
          />
          <path
            d="M6 10C6 14.4183 9.58172 18 14 18V14C11.7909 14 10 12.2091 10 10H6Z"
            fill="#CBD5E1"
          />
          <path
            d="M42 10C42 14.4183 38.4183 18 34 18V14C36.2091 14 38 12.2091 38 10H42Z"
            fill="#CBD5E1"
          />
          <path d="M22 30H26V38H22V30Z" fill="#94A3B8" />
          <path
            d="M16 38H32V42H16V38Z"
            fill="#64748B"
            rx="2"
          />
        </svg>

        {/* Lock icon overlay */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#64748B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg width={size * 0.38} height={size * 0.38} viewBox="0 0 24 24" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.25 10.0546V8C5.25 4.27208 8.27208 1.25 12 1.25C15.7279 1.25 18.75 4.27208 18.75 8V10.0546C19.8648 10.1379 20.5907 10.348 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.40931 10.348 4.13525 10.1379 5.25 10.0546ZM6.75 8C6.75 5.10051 9.10051 2.75 12 2.75C14.8995 2.75 17.25 5.10051 17.25 8V10.0036C16.867 10 16.4515 10 16 10H8C7.54849 10 7.13301 10 6.75 10.0036V8Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    );
  }

  const isProcessed = Boolean(processedSrc);
  const isPng = typeof src === 'string' && src.toLowerCase().includes('.png');
  const hasPureTransparency = isProcessed || isPng;
  const finalSrc = processedSrc || src;

  return (
    <div
      className={`transparent-badge-container ${className}`}
      style={{
        width: size,
        height: size,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
    >
      {/* If raw JPG before canvas completes, sleek dark jewel aperture prevents ugly square box */}
      {!hasPureTransparency && (
        <div
          style={{
            position: 'absolute',
            width: '90%',
            height: '90%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #0F172A 0%, rgba(15, 23, 42, 0.9) 65%, transparent 100%)',
            zIndex: 1
          }}
        />
      )}

      {/* Ambient Crystal Backlight Glow */}
      <div
        className="badge-backlight-glow"
        style={{
          position: 'absolute',
          width: '75%',
          height: '75%',
          borderRadius: '50%',
          background: glowColor,
          filter: 'blur(10px)',
          opacity: 0.35,
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Badge graphic with background removal */}
      <img
        src={finalSrc}
        alt={alt}
        className="transparent-badge-img"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          position: 'relative',
          zIndex: 2,
          mixBlendMode: hasPureTransparency ? 'normal' : 'screen',
          filter: `drop-shadow(0 4px 10px ${glowColor}66)`
        }}
      />
    </div>
  );
};
