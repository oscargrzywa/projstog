"use client";

/* Światło pod taflą wody — tło hero.
   Surowy WebGL (bez three.js), jeden fragment shader: domain-warped noise
   w zieleniach + miękkie zafalowanie w miejscu kursora, które wygasa.
   Zasady:
   - renderujemy w ~0.5× DPR i skalujemy CSS-em — to tło, ma być miękkie,
   - jasność maks. jak .aurora (zieleń ~20% krycia w szczycie), równo na
     całym hero — sufit krycia pilnuje kontrastu H1,
   - kolory z tokenów CSS (uniformy), żadnych hexów w shaderze,
   - pętla stoi, gdy hero poza ekranem albo karta ukryta,
   - reduced motion → jedna statyczna klatka,
   - brak WebGL / błąd shadera → nic; pod spodem zostaje .aurora. */

import { useEffect, useRef, useState } from "react";

const VERTEX = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAGMENT = `
precision mediump float;

uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;      // kursor wygładzony (px bufora)
uniform vec2 u_trail;      // kursor opóźniony — „kilwater"
uniform float u_force;     // siła zaburzenia, wygasa w JS
uniform vec3 u_signal;
uniform vec3 u_voltage;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = r * p * 2.02;
    a *= 0.5;
  }
  return v;
}

// Pierścień fali rozchodzący się od punktu, tłumiony odległością.
vec2 ripple(vec2 uv, vec2 c, float t, float amp) {
  vec2 d = uv - c;
  float r = length(d);
  float w = sin(r * 22.0 - t * 3.2) * exp(-r * 4.5);
  return (d / max(r, 1e-3)) * w * amp;
}

void main() {
  float h = u_res.y;
  vec2 uv = gl_FragCoord.xy / h;
  vec2 m = u_mouse / h;
  vec2 tr = u_trail / h;
  float t = u_time;

  // Zafalowanie od kursora zniekształca domenę — jak palec po tafli.
  uv += ripple(uv, m, t, 0.035 * u_force);
  uv += ripple(uv, tr, t * 0.8, 0.02 * u_force);

  vec2 p = uv * 1.6;
  vec2 q = vec2(
    fbm(p + vec2(0.0, t * 0.05)),
    fbm(p + vec2(5.2, 1.3) - vec2(t * 0.04, 0.0))
  );
  vec2 r = vec2(
    fbm(p + 3.2 * q + vec2(1.7, 9.2) + t * 0.03),
    fbm(p + 3.2 * q + vec2(8.3, 2.8) - t * 0.025)
  );
  float f = fbm(p + 3.0 * r);

  // Kaustyki: jasne, cienkie grzbiety tam, gdzie pole przechodzi przez 0.5.
  float caustic = pow(1.0 - abs(f * 2.0 - 1.0), 7.0);

  // Dym równo na całej wysokości hero — bez poświaty tylko od góry.
  float glow = smoothstep(0.25, 0.85, f);

  // Lekkie rozjaśnienie pod kursorem, gaśnie razem z siłą.
  float near = exp(-dot(uv - m, uv - m) * 14.0) * u_force;

  float light = glow * 0.14 + caustic * 0.07 + near * 0.05;
  float alpha = clamp(light, 0.0, 0.22);
  vec3 col = mix(u_signal, u_voltage, clamp(caustic * 0.8 + near, 0.0, 1.0));

  // Premultiplied alpha — kanwa nakłada się na obsydian i .aurora.
  gl_FragColor = vec4(col * alpha, alpha);
}
`;

// Dowolny kolor CSS (hex, rgb, oklch…) → RGB 0..1, przez piksel 2D.
function readToken(name: string): [number, number, number] | null {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  if (!value) return null;
  const c = document.createElement("canvas");
  c.width = c.height = 1;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.fillStyle = value;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r / 255, g / 255, b / 255];
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function LiquidField({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    // Kanwa tworzona tu, nie w JSX: przy cleanupie tracimy jej kontekst
    // (loseContext), a StrictMode montuje efekt dwa razy — ponowny
    // getContext na tej samej kanwie zwróciłby kontekst już utracony.
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "display:block;width:100%;height:100%";
    host.appendChild(canvas);

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) {
      canvas.remove();
      // Poza ciałem efektu — bez kaskady renderów w tej samej klatce.
      queueMicrotask(() => setFailed(true));
      return;
    }

    // Bez tokenów nie zgadujemy koloru — wtedy zostaje sama .aurora.
    const signal = readToken("--color-signal");
    const voltage = readToken("--color-voltage") ?? signal;
    if (!signal || !voltage) {
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
      queueMicrotask(() => setFailed(true));
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    // Słabszy sprzęt / dotyk: 30 kl./s wystarczy na wolne falowanie.
    const lowEnd = coarse || (navigator.hardwareConcurrency ?? 8) <= 4;
    const frameInterval = lowEnd ? 1000 / 30 : 0;

    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let u: Record<string, WebGLUniformLocation | null> = {};
    let lost = false;

    const init = () => {
      const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
      if (!vs || !fs) return false;
      const prog = gl.createProgram();
      if (!prog) return false;
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        gl.deleteProgram(prog);
        return false;
      }
      program = prog;
      gl.useProgram(prog);

      // Jeden trójkąt pokrywający cały ekran.
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW,
      );
      const loc = gl.getAttribLocation(prog, "a_pos");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      u = {};
      for (const name of [
        "u_res",
        "u_time",
        "u_mouse",
        "u_trail",
        "u_force",
        "u_signal",
        "u_voltage",
      ]) {
        u[name] = gl.getUniformLocation(prog, name);
      }
      gl.uniform3fv(u.u_signal, signal);
      gl.uniform3fv(u.u_voltage, voltage);
      return true;
    };

    if (!init()) {
      canvas.remove();
      queueMicrotask(() => setFailed(true));
      return;
    }

    // --- rozmiar: ~0.5× DPR (maks. 1.5 DPR przed podziałem) -----------------
    let scale = 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.5;
      const w = Math.max(1, Math.round(rect.width * scale));
      const h = Math.max(1, Math.round(rect.height * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      if (!running) draw(); // statyczna klatka też musi nadążyć za rozmiarem
    };

    // --- kursor: cel skokowy, pozycja w shaderze interpolowana ---------------
    const target = { x: -1e4, y: -1e4 };
    const mouse = { x: -1e4, y: -1e4 };
    const trail = { x: -1e4, y: -1e4 };
    let force = 0;
    let hasPointer = false;

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * scale;
      // WebGL liczy y od dołu.
      const y = (rect.bottom - e.clientY) * scale;
      if (!hasPointer) {
        mouse.x = trail.x = x;
        mouse.y = trail.y = y;
        hasPointer = true;
      }
      const dist = Math.hypot(x - target.x, y - target.y) / scale;
      target.x = x;
      target.y = y;
      // Im szybszy ruch, tym mocniejsza fala — z nasyceniem.
      force = Math.min(1, force + dist * 0.004);
    };

    // --- pętla -----------------------------------------------------------------
    let frame = 0;
    let running = false;
    let visible = true;
    let last = 0;
    let time = 12; // start „w trakcie" ruchu, nie od płaskiej tafli

    const draw = () => {
      if (lost || !program) return;
      gl.uniform2f(u.u_res, canvas.width, canvas.height);
      gl.uniform1f(u.u_time, time);
      gl.uniform2f(u.u_mouse, mouse.x, mouse.y);
      gl.uniform2f(u.u_trail, trail.x, trail.y);
      gl.uniform1f(u.u_force, force);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const elapsed = last ? now - last : 16;
      if (elapsed < frameInterval) return;
      last = now;
      const dt = Math.min(elapsed, 100) / 1000;

      // Wolniej na dotyku — samo falowanie, bez pośpiechu.
      time += dt * (coarse ? 0.6 : 1);
      const k = 1 - Math.pow(1 - 0.12, dt * 60);
      const kt = 1 - Math.pow(1 - 0.04, dt * 60);
      mouse.x += (target.x - mouse.x) * k;
      mouse.y += (target.y - mouse.y) * k;
      trail.x += (target.x - trail.x) * kt;
      trail.y += (target.y - trail.y) * kt;
      force *= Math.pow(0.965, dt * 60);

      draw();
    };

    const start = () => {
      if (running || lost || reduce.matches || !visible || document.hidden)
        return;
      running = true;
      last = 0;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };
    const sync = () => {
      stop();
      if (reduce.matches) {
        force = 0;
        draw();
      } else start();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(canvas);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onLost = (e: Event) => {
      e.preventDefault(); // pozwala przeglądarce przywrócić kontekst
      lost = true;
      program = null;
      stop();
    };
    const onRestored = () => {
      lost = false;
      if (!init()) {
        queueMicrotask(() => setFailed(true));
        return;
      }
      resize();
      sync();
    };

    resize();
    draw();
    // Pierwsza klatka już jest — fade-in włączamy w następnej klatce.
    requestAnimationFrame(() => setReady(true));
    sync();

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", sync);
    reduce.addEventListener("change", sync);
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", sync);
      reduce.removeEventListener("change", sync);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      if (!lost) {
        if (buffer) gl.deleteBuffer(buffer);
        if (program) gl.deleteProgram(program);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
  }, []);

  if (failed) return null;

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
        // Dym na całym hero; tylko przy samej krawędzi miękkie przejście
        // w kolejną sekcję, żeby nie było twardej linii.
        maskImage:
          "linear-gradient(180deg, #000 0%, #000 88%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(180deg, #000 0%, #000 88%, transparent 100%)",
        opacity: ready ? 1 : 0,
        transition: "opacity 1.2s var(--ease-out-expo)",
      }}
    />
  );
}
