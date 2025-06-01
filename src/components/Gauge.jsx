// src/components/Gauge.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Gauge = ({
  value = 0,
  max = 100,
  label = "Gauge",
  unit = "",
  warningThreshold = 0.7,   // fallback thresholds
  criticalThreshold = 0.9,
  zones, // optional zones prop: array of { min, max, color }
}) => {
  const size = 250;
  const center = size / 2;
  const radius = center - 20;
  const angleStart = -225;  // start angle in degrees
  const angleEnd = 45;      // end angle in degrees
  const angleRange = angleEnd - angleStart;

  // Ensure value is within [0, max]
  const clamp = (val, min, mx) => Math.max(min, Math.min(val, mx));
  const clampedValue = clamp(value, 0, max);

  // Calculate the needle angle for the current value.
  const angle = angleStart + (clampedValue / max) * angleRange;
  const angleRad = (angle * Math.PI) / 180;
  const pointerLength = radius - 15;

  // Determine the readout color.
  let readoutColor;
  if (zones && zones.length > 0) {
    // Use zones: choose the zone where clampedValue fits.
    const zone = zones.find(z => clampedValue >= z.min && clampedValue <= z.max);
    readoutColor = zone ? zone.color : "#22c55e";
  } else {
    // Fallback thresholds.
    const ratio = clampedValue / max;
    if (ratio >= criticalThreshold) {
      readoutColor = "#ef4444"; // red
    } else if (ratio >= warningThreshold) {
      readoutColor = "#f59e0b"; // orange
    } else {
      readoutColor = "#22c55e"; // green
    }
  }

  // Generate tick marks.
  const step = max <= 30 ? 5 : Math.round(max / 10);
  const marks = [];
  for (let i = 0; i <= max; i += step) {
    const markAngle = angleStart + (i / max) * angleRange;
    const rad = (markAngle * Math.PI) / 180;
    const x1 = center + (radius - 8) * Math.cos(rad);
    const y1 = center + (radius - 8) * Math.sin(rad);
    const x2 = center + radius * Math.cos(rad);
    const y2 = center + radius * Math.sin(rad);
    const tx = center + (radius - 20) * Math.cos(rad);
    const ty = center + (radius - 20) * Math.sin(rad);
    marks.push({ x1, y1, x2, y2, tx, ty, label: i });
  }

  // Build the colored arc segments (if zones are provided).
  const renderZones = () => {
    if (!zones || zones.length === 0) {
      // Fallback: draw one arc in the readout color.
      return (
        <path
          d={describeArc(center, center, radius, angleStart, angleEnd)}
          fill="none"
          stroke={readoutColor}
          strokeWidth="12"
          style={{ transition: 'stroke 0.5s ease-in-out' }}
        />
      );
    }
    // Map each zone to an arc segment.
    return zones.map((zone, idx) => {
      // Clamp zone boundaries.
      const zoneMin = clamp(zone.min, 0, max);
      const zoneMax = clamp(zone.max, 0, max);
      const zoneAngleStart = angleStart + (zoneMin / max) * angleRange;
      const zoneAngleEnd = angleStart + (zoneMax / max) * angleRange;
      return (
        <path
          key={idx}
          d={describeArc(center, center, radius, zoneAngleStart, zoneAngleEnd)}
          fill="none"
          stroke={zone.color}
          strokeWidth="12"
          style={{ transition: 'stroke 0.5s ease-in-out' }}
        />
      );
    });
  };

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Enclosure circle */}
        <circle
          cx={center}
          cy={center}
          r={radius + 15}
          fill="#000"
          stroke="#374151"
          strokeWidth="4"
        />

        {/* Colored arc segments */}
        {renderZones()}

        {/* Tick marks and numeric labels */}
        {marks.map((mark, idx) => (
          <g key={idx}>
            <line
              x1={mark.x1}
              y1={mark.y1}
              x2={mark.x2}
              y2={mark.y2}
              stroke="#9ca3af"
              strokeWidth="2"
            />
            <text
              x={mark.tx}
              y={mark.ty}
              fill="#e5e7eb"
              fontSize="10"
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {mark.label}
            </text>
          </g>
        ))}

        {/* Needle */}
        <line
          x1={center}
          y1={center}
          x2={center + pointerLength * Math.cos(angleRad)}
          y2={center + pointerLength * Math.sin(angleRad)}
          stroke="#22d3ee"
          strokeWidth="3"
        />
        <circle cx={center} cy={center} r="6" fill="#22d3ee" />

        {/* Digital readout */}
        <text
          x={center}
          y={center + 40}
          fill={readoutColor}
          fontSize="14"
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ transition: 'fill 0.5s ease-in-out' }}
        >
          {clampedValue}{unit}
        </text>
      </svg>

      {/* Gauge label */}
      <div className="mt-1 text-sm text-slate-200 uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
};

Gauge.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  label: PropTypes.string,
  unit: PropTypes.string,
  warningThreshold: PropTypes.number,
  criticalThreshold: PropTypes.number,
  zones: PropTypes.arrayOf(
    PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
      color: PropTypes.string,
    })
  ),
};

// Helper function: converts polar coordinates to cartesian.
function polarToCartesian(cx, cy, r, angleDeg) {
  const angleRad = ((angleDeg - 0) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

// Helper function: returns an SVG arc path string.
function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(" ");
}

export default Gauge;
