/* Hand-drawn SVG scenery for the marketing surfaces: the night meadow
   at the base of the hero, the parallax flora clusters, and the orbit
   globe. All vectors — no raster assets. */

export function Meadow() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-[-2px] z-[3] w-full"
      style={{ height: "clamp(170px, 24vw, 300px)" }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 300" preserveAspectRatio="xMidYMax slice" fill="none" className="h-full w-full">
        <defs>
          <linearGradient id="hillA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0a2419" />
            <stop offset="1" stopColor="#03100a" />
          </linearGradient>
          <linearGradient id="hillB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#071a12" />
            <stop offset="1" stopColor="#020a06" />
          </linearGradient>
          <radialGradient id="bloomO" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#ff9a4d" stopOpacity=".9" />
            <stop offset=".4" stopColor="#ff9a4d" stopOpacity=".35" />
            <stop offset="1" stopColor="#ff9a4d" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bloomW" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#dfffe9" stopOpacity=".9" />
            <stop offset=".45" stopColor="#bdf5d6" stopOpacity=".3" />
            <stop offset="1" stopColor="#bdf5d6" stopOpacity="0" />
          </radialGradient>
          <g id="blade">
            <path d="M0 0 C -2 -34, 9 -62, 5 -96 C 5 -62, -3 -34, -6 0 Z" fill="#0c2b1c" />
          </g>
          <g id="blade2">
            <path d="M0 0 C 3 -28, -8 -50, -3 -78 C -4 -50, 4 -28, 7 0 Z" fill="#082114" />
          </g>
          <g id="daisy">
            <g opacity=".92">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <ellipse key={deg} cx="0" cy="-11" rx="3.4" ry="10" fill="#eef9f0" transform={`rotate(${deg})`} />
              ))}
            </g>
            <circle r="4.6" fill="#ffcf7d" />
          </g>
        </defs>

        {/* back hill */}
        <path d="M0 190 C 220 150, 420 200, 720 175 C 1020 150, 1240 195, 1440 165 L1440 300 L0 300 Z" fill="url(#hillA)" />

        {/* glowing blooms */}
        <circle cx="150" cy="196" r="26" fill="url(#bloomO)" className="bloom-tw" />
        <circle cx="150" cy="196" r="4" fill="#ffab60" />
        <circle cx="365" cy="210" r="18" fill="url(#bloomO)" className="bloom-tw" style={{ animationDelay: "-1.2s" }} />
        <circle cx="365" cy="210" r="3" fill="#ffab60" />
        <circle cx="1105" cy="205" r="22" fill="url(#bloomO)" className="bloom-tw" style={{ animationDelay: "-2.1s" }} />
        <circle cx="1105" cy="205" r="3.4" fill="#ffab60" />
        <circle cx="1320" cy="188" r="26" fill="url(#bloomO)" className="bloom-tw" style={{ animationDelay: "-.6s" }} />
        <circle cx="1320" cy="188" r="4" fill="#ffab60" />
        <circle cx="590" cy="228" r="14" fill="url(#bloomW)" className="bloom-tw" style={{ animationDelay: "-1.7s" }} />
        <circle cx="880" cy="225" r="14" fill="url(#bloomW)" className="bloom-tw" style={{ animationDelay: "-2.6s" }} />

        {/* daisies on stems */}
        <g className="sway s2">
          <path d="M262 232 C 258 200, 266 178, 260 152" stroke="#0e3020" strokeWidth="2.4" fill="none" />
          <use href="#daisy" x="260" y="150" />
        </g>
        <g className="sway s3">
          <path d="M1198 238 C 1202 208, 1192 186, 1200 158" stroke="#0e3020" strokeWidth="2.4" fill="none" />
          <use href="#daisy" x="1200" y="156" />
        </g>
        <g className="sway">
          <path d="M985 244 C 982 220, 990 202, 986 182" stroke="#0d2c1e" strokeWidth="2" fill="none" />
          <use href="#daisy" x="986" y="180" opacity=".85" />
        </g>

        {/* mid grass */}
        <g>
          {[
            [40, 252, "sway"], [95, 256, "sway s2"], [205, 258, "sway s3"], [330, 260, "sway"],
            [450, 262, "sway s2"], [560, 258, "sway s3"], [700, 264, "sway"], [820, 260, "sway s2"],
            [930, 262, "sway s3"], [1060, 258, "sway"], [1180, 262, "sway s2"], [1290, 258, "sway s3"],
            [1400, 260, "sway"],
          ].map(([x, y, cls], i) => (
            <use key={i} href={i % 2 === 0 ? "#blade" : "#blade2"} x={x} y={y} className={cls as string} />
          ))}
        </g>

        {/* front hill */}
        <path d="M0 246 C 260 216, 520 258, 780 240 C 1040 222, 1240 256, 1440 232 L1440 300 L0 300 Z" fill="url(#hillB)" />

        {/* front grass */}
        <g opacity=".95">
          {[20, 150, 280, 395, 505, 640, 760, 885, 1010, 1135, 1250, 1370].map((x, i) => (
            <use
              key={x}
              href={i % 2 === 0 ? "#blade2" : "#blade"}
              x={x}
              y={300}
              className={["sway s2", "sway", "sway s3"][i % 3]}
            />
          ))}
        </g>

        {/* fireflies in the grass */}
        <circle cx="480" cy="252" r="2" fill="#ffcf8a" className="bloom-tw" />
        <circle cx="742" cy="246" r="1.6" fill="#ffcf8a" className="bloom-tw" style={{ animationDelay: "-1.4s" }} />
        <circle cx="1032" cy="250" r="2" fill="#ffcf8a" className="bloom-tw" style={{ animationDelay: "-2.4s" }} />
      </svg>
    </div>
  );
}

export function FloraLeft() {
  return (
    <div
      className="pointer-events-none absolute bottom-[-10px] left-[-30px] z-[4] max-md:opacity-55"
      style={{ width: "clamp(180px, 20vw, 300px)" }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 300 460" fill="none" className="h-auto w-full overflow-visible">
        <path d="M150 460 C 138 380, 160 320, 148 240 C 144 200, 152 160, 148 128" stroke="#0f3322" strokeWidth="4" strokeLinecap="round" />
        <g className="sway s2" opacity=".95">
          <g transform="translate(148 120)">
            <circle r="4" fill="#e8f7ec" />
            <g stroke="#cfe9d8" strokeWidth="1" opacity=".65">
              {[[0, -58], [28, -51], [50, -30], [58, -2], [51, 26], [29, 50], [-1, 57], [-29, 50], [-51, 27], [-58, 0], [-51, -28], [-28, -51]].map(([x, y]) => (
                <path key={`${x},${y}`} d={`M0 0 L${x} ${y}`} />
              ))}
            </g>
            <g fill="#eef9f0" opacity=".9">
              {[[0, -58], [28, -51], [50, -30], [58, -2], [51, 26], [29, 50], [-1, 57], [-29, 50], [-51, 27], [-58, 0], [-51, -28], [-28, -51]].map(([x, y]) => (
                <circle key={`${x},${y}`} cx={x} cy={y} r="1.8" />
              ))}
            </g>
          </g>
        </g>
        <path d="M96 460 C 100 420, 82 396, 90 356" stroke="#0c2a1b" strokeWidth="3" strokeLinecap="round" className="sway" />
        <path d="M210 460 C 204 428, 222 402, 214 372" stroke="#0c2a1b" strokeWidth="3" strokeLinecap="round" className="sway s3" />
        <circle cx="90" cy="352" r="16" fill="url(#bloomO)" className="bloom-tw" />
        <circle cx="90" cy="352" r="3" fill="#ffab60" />
      </svg>
    </div>
  );
}

export function FloraRight() {
  return (
    <div
      className="pointer-events-none absolute bottom-[-16px] right-[-40px] z-[4] max-md:opacity-55"
      style={{ width: "clamp(200px, 22vw, 330px)" }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 330 460" fill="none" className="h-auto w-full overflow-visible">
        <path d="M170 460 C 180 396, 158 350, 170 292" stroke="#0f3322" strokeWidth="4" strokeLinecap="round" />
        <g className="sway s3">
          <use href="#daisy" x="170" y="282" transform="scale(1.7)" style={{ transformOrigin: "170px 282px" }} />
        </g>
        <path d="M240 460 C 232 410, 252 380, 242 336" stroke="#0d2d1d" strokeWidth="3.4" strokeLinecap="round" />
        <g className="sway">
          <use href="#daisy" x="242" y="328" transform="scale(1.25)" style={{ transformOrigin: "242px 328px" }} />
        </g>
        <path d="M96 460 C 102 424, 86 400, 94 366" stroke="#0c2a1b" strokeWidth="3" strokeLinecap="round" className="sway s2" />
        <circle cx="94" cy="360" r="18" fill="url(#bloomO)" className="bloom-tw" style={{ animationDelay: "-1.8s" }} />
        <circle cx="94" cy="360" r="3.2" fill="#ffab60" />
        <path d="M300 460 C 296 430, 310 410, 304 384" stroke="#0c2a1b" strokeWidth="2.6" strokeLinecap="round" className="sway s3" />
      </svg>
    </div>
  );
}

export function GlobeViz() {
  return (
    <svg viewBox="0 0 560 560" fill="none" className="h-auto w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id="sphere" cx=".38" cy=".3" r=".85">
          <stop offset="0" stopColor="#175a54" />
          <stop offset=".45" stopColor="#0b3438" />
          <stop offset="1" stopColor="#041318" />
        </radialGradient>
        <radialGradient id="gGlow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#2fae8e" stopOpacity=".35" />
          <stop offset="1" stopColor="#2fae8e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="orbWarm" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff9a4d" stopOpacity="0" />
          <stop offset=".6" stopColor="#ff9a4d" stopOpacity=".8" />
          <stop offset="1" stopColor="#ffc98f" />
        </linearGradient>
        <linearGradient id="orbCool" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#8cf5c3" stopOpacity="0" />
          <stop offset=".6" stopColor="#8cf5c3" stopOpacity=".8" />
          <stop offset="1" stopColor="#d2ffe9" />
        </linearGradient>
        <pattern id="dots" width="11" height="11" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.35" fill="#8cf5c3" />
        </pattern>
        <clipPath id="sphereClip">
          <circle cx="280" cy="285" r="188" />
        </clipPath>
        <marker id="arrowW" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill="#ffc98f" />
        </marker>
        <marker id="arrowC" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill="#d2ffe9" />
        </marker>
      </defs>

      <circle cx="280" cy="285" r="270" fill="url(#gGlow)" />
      <circle cx="280" cy="285" r="188" fill="url(#sphere)" />
      <circle cx="280" cy="285" r="188" stroke="rgba(140,245,195,.25)" strokeWidth="1" />

      <g clipPath="url(#sphereClip)" opacity=".8">
        <path d="M150 220 C 170 190, 215 185, 232 210 C 246 230, 238 260, 218 276 C 200 292, 196 318, 180 330 C 160 344, 138 330, 134 302 C 130 272, 134 244, 150 220 Z" fill="url(#dots)" />
        <path d="M262 190 C 288 168, 330 170, 352 190 C 372 208, 380 238, 366 260 C 350 284, 318 282, 300 264 C 280 246, 248 240, 250 218 C 251 206, 254 197, 262 190 Z" fill="url(#dots)" />
        <path d="M300 300 C 322 288, 352 294, 362 316 C 372 338, 360 366, 338 374 C 316 382, 292 370, 288 346 C 285 326, 286 308, 300 300 Z" fill="url(#dots)" />
        <path d="M380 224 C 400 210, 428 216, 438 236 C 448 256, 438 280, 418 288 C 398 296, 378 284, 374 262 C 371 246, 370 232, 380 224 Z" fill="url(#dots)" />
        <path d="M196 356 C 212 348, 232 354, 238 370 C 244 386, 234 402, 218 406 C 202 410, 188 398, 186 382 C 185 372, 188 362, 196 356 Z" fill="url(#dots)" />
      </g>

      <circle cx="212" cy="242" r="4" fill="#d2ffe9" className="tw" />
      <circle cx="318" cy="222" r="4.5" fill="#d2ffe9" className="tw" style={{ animationDelay: "-.8s" }} />
      <circle cx="336" cy="330" r="3.6" fill="#d2ffe9" className="tw" style={{ animationDelay: "-1.6s" }} />
      <circle cx="412" cy="252" r="3.4" fill="#d2ffe9" className="tw" style={{ animationDelay: "-2.2s" }} />
      <circle cx="176" cy="300" r="3" fill="#ffcf8a" className="tw" style={{ animationDelay: "-1.1s" }} />
      <circle cx="216" cy="382" r="3" fill="#ffcf8a" className="tw" style={{ animationDelay: "-2.7s" }} />

      <ellipse cx="216" cy="196" rx="120" ry="72" fill="rgba(234,246,238,.06)" transform="rotate(-24 216 196)" />

      <path id="orbA" d="M52 330 A 252 96 -16 0 1 508 240" stroke="url(#orbWarm)" strokeWidth="3.5" markerEnd="url(#arrowW)" />
      <path id="orbB" d="M520 350 A 252 90 12 0 1 60 260" stroke="url(#orbCool)" strokeWidth="3.5" markerEnd="url(#arrowC)" />

      <circle r="5.5" fill="#ffc98f" style={{ filter: "drop-shadow(0 0 8px #ff9a4d)" }}>
        <animateMotion dur="8s" repeatCount="indefinite">
          <mpath href="#orbA" />
        </animateMotion>
      </circle>
      <circle r="5.5" fill="#d2ffe9" style={{ filter: "drop-shadow(0 0 8px #8cf5c3)" }}>
        <animateMotion dur="10s" repeatCount="indefinite">
          <mpath href="#orbB" />
        </animateMotion>
      </circle>

      <circle cx="80" cy="120" r="1.8" fill="#dfeee6" className="tw" />
      <circle cx="480" cy="96" r="2.2" fill="#dfeee6" className="tw" style={{ animationDelay: "-1.3s" }} />
      <circle cx="520" cy="470" r="1.8" fill="#dfeee6" className="tw" style={{ animationDelay: "-2s" }} />
      <circle cx="60" cy="450" r="1.6" fill="#dfeee6" className="tw" style={{ animationDelay: "-.7s" }} />
      <path d="M508 148 l3.2 7.2 7.2 3.2 -7.2 3.2 -3.2 7.2 -3.2-7.2 -7.2-3.2 7.2-3.2z" fill="#8cf5c3" opacity=".7" className="tw" style={{ animationDelay: "-1.9s" }} />
      <path d="M96 88 l2.4 5.4 5.4 2.4 -5.4 2.4 -2.4 5.4 -2.4-5.4 -5.4-2.4 5.4-2.4z" fill="#ffcf8a" opacity=".7" className="tw" style={{ animationDelay: "-.4s" }} />
    </svg>
  );
}
