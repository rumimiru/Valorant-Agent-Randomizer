// Role descriptions used on the picker and result screens.
const ROLES = {
  Initiator: "Sets up plays and gathers info to open sites.",
  Controller: "Shapes the map with smokes and zone control.",
  Duelist: "Takes fights first and creates entry for the team.",
  Sentinel: "Locks down sites and holds flanks.",
};

// Agent membership, grouped by in-game role.
const DATA = {
  Initiator: "Sova,Breach,Skye,KAY/O,Fade,Gekko,Tejo",
  Controller: "Brimstone,Omen,Viper,Astra,Harbor,Clove",
  Duelist: "Jett,Reyna,Raze,Phoenix,Yoru,Neon,Iso,Waylay",
  Sentinel: "Sage,Cypher,Killjoy,Chamber,Deadlock,Vyse,Veto",
};

const AG = [];
for (const r in DATA) DATA[r].split(",").forEach(n => AG.push({ n, r }));

// Each entry stores the two agents in a pairing and its description.
const PAIRS = [
  ["Yoru", "Astra", "Astra's smokes hide Yoru's flash and teleport fakes."],
  ["Sova", "Killjoy", "Sova's recon darts find targets while Killjoy's setup holds the site."],
  ["Raze", "Skye", "Skye's flashes clear a path for Raze's satchel entries."],
  ["Jett", "Sova", "Sova reveals the angle, Jett dashes in and trades."],
  ["Viper", "Cypher", "Viper's wall buys time for Cypher's traps and camera."],
  ["Omen", "Reyna", "Omen's blinds let Reyna take the duel she wants."],
  ["Phoenix", "Brimstone", "Brimstone's smokes cover Phoenix's flash-and-swing style."],
  ["Breach", "Neon", "Breach stuns the site and Neon sprints in behind it."],
  ["Fade", "Chamber", "Fade's haunt shows positions, Chamber punishes from range."],
  ["Gekko", "Clove", "Both recover utility, so they keep trading and re-taking space."],
  ["Harbor", "Iso", "Harbor's water wall shields Iso's duel shield timing."],
  ["Sage", "Jett", "Sage heals and walls while Jett takes aggressive picks."],
  ["Deadlock", "Astra", "Astra's stars pull enemies into Deadlock's trap lines."],
  ["KAY/O", "Raze", "KAY/O suppresses abilities so Raze's explosives land."],
  ["Vyse", "Omen", "Vyse locks down flanks while Omen controls vision up front."],
  ["Tejo", "Waylay", "Tejo scouts targets, Waylay darts in once the info lands."],
];

// Shared DOM query and HTML-escaping helpers.
const $ = s => document.querySelector(s);
const H = s =>
  s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

// Local role icons. An empty path uses the built-in vector icon.
const ROLE_ICONS = {
  Initiator: "assets/images/roles/initiator.png",
  Controller: "assets/images/roles/controller.png",
  Flex: "",
  Duelist: "assets/images/roles/duelist.webp",
  Sentinel: "assets/images/roles/sentinel.webp",
};

// Small portraits used in the role picker, customization panel, and compatibility cards.
const AGENT_ICON = {
  Sova: "assets/images/agents/Sova_icon.png",
  Breach: "assets/images/agents/Breach_icon.png",
  Skye: "assets/images/agents/Skye_icon.png",
  "KAY/O": "assets/images/agents/KAYO_icon.png",
  Fade: "assets/images/agents/Fade_icon.png",
  Gekko: "assets/images/agents/Gekko_icon.png",
  Tejo: "assets/images/agents/Tejo_icon.png",
  Brimstone: "assets/images/agents/Brimstone_icon.png",
  Omen: "assets/images/agents/Omen_icon.png",
  Viper: "assets/images/agents/Viper_icon.png",
  Astra: "assets/images/agents/Astra_icon.png",
  Harbor: "assets/images/agents/Harbor_icon.webp",
  Clove: "assets/images/agents/Clove_icon.webp",
  Jett: "assets/images/agents/Jett_icon.png",
  Reyna: "assets/images/agents/Reyna_icon.png",
  Raze: "assets/images/agents/Raze_icon.png",
  Phoenix: "assets/images/agents/Phoenix_icon.png",
  Yoru: "assets/images/agents/Yoru_icon.png",
  Neon: "assets/images/agents/Neon_icon.png",
  Iso: "assets/images/agents/Iso_icon.webp",
  Waylay: "assets/images/agents/Waylay_icon.webp",
  Sage: "assets/images/agents/Sage_icon.png",
  Cypher: "assets/images/agents/Cypher_icon.png",
  Killjoy: "assets/images/agents/Killjoy_icon.png",
  Chamber: "assets/images/agents/Chamber_icon.png",
  Deadlock: "assets/images/agents/Deadlock_icon.png",
  Vyse: "assets/images/agents/Vyse_icon.png",
  Veto: "assets/images/agents/Veto_icon.webp",
};

// Optional large agent artwork; empty values fall back to the small portrait above.
const AGENT_ART = {
  Sova: "",
  Breach: "",
  Skye: "",
  "KAY/O": "",
  Fade: "",
  Gekko: "",
  Tejo: "",
  Brimstone: "",
  Omen: "",
  Viper: "",
  Astra: "",
  Harbor: "",
  Clove: "",
  Jett: "",
  Reyna: "",
  Raze: "",
  Phoenix: "",
  Yoru: "",
  Neon: "",
  Iso: "",
  Waylay: "",
  Sage: "",
  Cypher: "",
  Killjoy: "",
  Chamber: "",
  Deadlock: "",
  Vyse: "",
  Veto: "",
};

// Render the configured role image or its built-in SVG symbol.
function ico(r) {
  if (ROLE_ICONS[r]) return `<img src="${ROLE_ICONS[r]}" alt="">`;

  const p = {
    Initiator:
      '<path d="M8 12l9-3-3 5h8M24 20l-9 3 3-5H10" fill="none"/>',
    Controller: '<path d="M8 20l8-8 8 8M8 26l8-8 8 8" fill="none"/>',
    Flex: '<circle cx="16" cy="16" r="8" fill="none"/><circle cx="13" cy="14" r="1.5" fill="#111"/><circle cx="19" cy="14" r="1.5" fill="#111"/>',
    Duelist: '<path d="M9 9l14 14M23 9L9 23" fill="none"/>',
    Sentinel: '<path d="M8 10h16l-8 14z" fill="none"/>',
  }[r];

  return `<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#fff"/><g stroke="#111" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">${p}</g></svg>`;
}

// Render an agent portrait when available, otherwise use a deterministic letter tile.
function mono(n, r, big) {
  const art = big && AGENT_ART[n];
  const src = art || AGENT_ICON[n];

  if (src) {
    return `<div class="mono" style="background:none;border:0;overflow:hidden"><img src="${src}" alt="${n}" style="width:100%;height:100%;object-fit:${art ? "contain" : "cover"}"></div>`;
  }

  const h = [...n].reduce((a, c) => a * 31 + c.charCodeAt(0), 7) % 360;
  return `<div class="mono" style="background:linear-gradient(135deg,hsl(${h} 45% 32%),hsl(${(h + 50) % 360} 40% 18%))">${n[0]}</div>`;
}

// Randomizer state: selected role, screen, result, validation, and enabled agents.
const S = {
  view: "pick",
  role: null,
  agent: null,
  error: "",
  instantPick: false,
  roulette: [],
  on: new Set(AG.map(a => a.n)),
};

const scope = () => (S.role === "Flex" ? Object.keys(DATA) : [S.role]);

// Build the role picker and keep the active role in sync with the current state.
function drawRoles() {
  $("#roleList").innerHTML = ["Initiator", "Controller", "Flex", "Duelist", "Sentinel"]
    .map(r => {
      const off = r !== "Flex" && !AG.some(a => a.r === r && S.on.has(a.n));
      return `<button class="role${S.role === r ? " on" : ""}${off ? " off" : ""}" data-r="${r}">${ico(r)}${r}</button>`;
    })
    .join("");

  document.querySelectorAll("#roleList .role").forEach(b => {
    b.onclick = () => {
      S.role = b.dataset.r;
      S.error = "";
      S.view = S.view === "custom" ? "custom" : "pick";
      draw();
    };
  });
}

// Return the enabled agents available to roll for the selected role.
function pool() {
  return AG.filter(a => scope().includes(a.r) && S.on.has(a.n));
}

function roll() {
  const p = pool();

  if (p.length < 1) {
    S.agent = null;
    S.error = "Select at least one agent to roll.";
    S.view = "pick";
    return draw();
  }

  S.error = "";
  S.agent = p[Math.floor(Math.random() * p.length)];
  if (S.instantPick || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    S.view = "result";
    return draw();
  }

  const cycles = Math.ceil(35 / p.length);
  S.roulette = Array.from({ length: cycles }, (_, index) => {
    if (index < cycles - 1) return shuffle(p);
    return [...shuffle(p.filter(agent => agent.n !== S.agent.n)), S.agent];
  }).flat();
  S.view = "rolling";
  draw();
  spinToAgent(S.roulette, S.agent);
}

function rouletteCard(agent, selected = false) {
  if (!agent) return '<div class="roulette-spacer" aria-hidden="true"></div>';
  return `<div class="roulette-card${selected ? " selected" : ""}"${selected ? ' aria-current="true"' : ""}>${mono(agent.n, agent.r)}<span>${H(agent.n)}</span></div>`;
}

function rouletteMarkup(agents, selectedIndex = -1, rolling = false) {
  if (!agents.length) {
    return '<p class="mut roulette-empty">No agents are enabled for this role. Customize your pool to add some.</p>';
  }

  const placeholders = rolling ? `${rouletteCard(null)}${rouletteCard(null)}` : "";
  const trailing = rolling ? `${rouletteCard(null)}${rouletteCard(null)}` : "";
  return `<div class="roulette-window${rolling ? " rolling" : ""}"${rolling ? ' id="rouletteWindow"' : ""} role="group" aria-label="Agent roulette"><div class="roulette-track"${rolling ? ' id="rouletteTrack"' : ""}>${placeholders}${agents.map((agent, index) => rouletteCard(agent, index === selectedIndex)).join("")}${trailing}</div></div>`;
}

function shuffle(items) {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function sampleWithoutReplacement(items, count) {
  return shuffle(items).slice(0, count);
}

function spinToAgent(sequence, winner) {
  const track = $("#rouletteTrack");
  const windowElement = $("#rouletteWindow");
  let winnerIndex = -1;
  for (let i = sequence.length - 1; i >= 0; i--) {
    if (sequence[i].n === winner.n) {
      winnerIndex = i;
      break;
    }
  }
  const cardWidth = track.querySelector(".roulette-card").getBoundingClientRect().width;
  const gap = parseFloat(getComputedStyle(track).columnGap);
  const step = cardWidth + gap;
  const startOffset = -2 * step;
  const targetOffset = -winnerIndex * step;
  let timeout;

  const finish = () => {
    if (S.view !== "rolling") return;
    clearTimeout(timeout);
    S.view = "result";
    draw();
  };

  track.addEventListener("transitionend", event => {
    if (event.propertyName === "transform") finish();
  }, { once: true });
  timeout = setTimeout(finish, 4500);
  track.style.transition = "none";
  track.style.transform = `translateX(${startOffset}px)`;
  windowElement.offsetWidth;
  track.style.transition = "";
  requestAnimationFrame(() => {
    track.style.transform = `translateX(${targetOffset}px)`;
  });
}

// Restore the initial randomizer state and enabled-agent pool.
function resetRandomizer() {
  S.on = new Set(AG.map(a => a.n));
  S.role = null;
  S.agent = null;
  S.error = "";
  S.instantPick = false;
  S.roulette = [];
  S.view = "pick";
  draw();
}

function drawPanel() {
  const P = $("#panel");
  if (!S.role && S.view !== "custom") {
    P.innerHTML =
      '<h2>Choose a role</h2><p class="mut">Get ready to gaaamble! Pick Flex to roll from every role.</p><div><button class="btn" id="flex">I\'m flexible</button></div>';
    $("#flex").onclick = () => {
      S.role = "Flex";
      S.error = "";
      draw();
    };
    return;
  }

  if (S.view === "pick") {
    const p = pool();
    const preview = sampleWithoutReplacement(p, Math.min(5, p.length));
    P.innerHTML = `<h2><span class="tag">${S.role}</span></h2><p class="mut">${S.role === "Flex" ? "Every role is in the pool." : ROLES[S.role]}</p>${S.error ? `<p class="validation" role="alert">${H(S.error)}</p>` : ""}${rouletteMarkup(preview, Math.floor(preview.length / 2))}<div class="row"><button class="btn" id="go">Roll</button><button class="btn" id="cu">Customize</button></div><label class="instant-toggle"><input id="instantPick" type="checkbox"${S.instantPick ? " checked" : ""}> Pick instantly</label>`;
    $("#go").onclick = roll;
    $("#instantPick").onchange = event => (S.instantPick = event.target.checked);
    $("#cu").onclick = () => {
      S.error = "";
      S.view = "custom";
      draw();
    };
  } else if (S.view === "rolling") {
    P.innerHTML = `<h2><span class="tag">${S.role}</span></h2><p class="mut">${S.role === "Flex" ? "Every role is in the pool." : ROLES[S.role]}</p><p class="rolling-status" role="status" aria-live="polite">Rolling...</p>${rouletteMarkup(S.roulette, -1, true)}<div class="row"><button class="btn" id="go" disabled>Rolling...</button><button class="btn" id="cu">Customize</button><button class="btn" id="rp">Role picker</button></div><label class="instant-toggle"><input id="instantPick" type="checkbox"${S.instantPick ? " checked" : ""}> Pick instantly</label>`;
    $("#instantPick").onchange = event => (S.instantPick = event.target.checked);
    $("#cu").onclick = () => {
      S.view = "custom";
      draw();
    };
    $("#rp").onclick = () => {
      S.view = "pick";
      S.role = null;
      draw();
    };
  } else if (S.view === "result") {
    const a = S.agent;
    const p = pool();
    const extras = sampleWithoutReplacement(p.filter(agent => agent.n !== a.n), 4);
    const resultLineup = [null, null, null, null, null];
    resultLineup[2] = a;
    [1, 3, 0, 4].forEach((index, i) => {
      if (extras[i]) resultLineup[index] = extras[i];
    });
    P.innerHTML = `<h2>Agent selected</h2>${rouletteMarkup(resultLineup, 2)}<div class="selected-copy"><h3>${H(a.n).toUpperCase()}</h3><span class="result-role">${a.r}</span><p>${H(a.n)} is a ${a.r} in VALORANT. ${ROLES[a.r]}</p></div><div class="row"><button class="btn" id="go">Roll again?</button><button class="btn" id="cu">Customize</button><button class="btn" id="rp">Role picker</button></div><label class="instant-toggle"><input id="instantPick" type="checkbox"${S.instantPick ? " checked" : ""}> Pick instantly</label>`;
    $("#go").onclick = roll;
    $("#instantPick").onchange = event => (S.instantPick = event.target.checked);
    $("#cu").onclick = () => {
      S.view = "custom";
      draw();
    };
    $("#rp").onclick = () => {
      S.view = "pick";
      S.role = null;
      draw();
    };
  } else {
    const rs = Object.keys(DATA);
    P.innerHTML =
      `<h2>Customization</h2><p class="mut">All agents are shown here. Tap an agent to keep or remove it, or tap a role icon to switch a whole role on or off.</p>` +
      rs
        .map(r => {
          const all = AG.filter(a => a.r === r);
          const off = !all.some(a => S.on.has(a.n));
          return `<div class="rowline${off ? " off" : ""}"><button class="role${off ? " off" : ""}" data-rt="${r}" aria-label="Toggle ${r}">${ico(r)}<span>${r}</span></button><div class="pool">${all.map(a => `<button class="ag${S.on.has(a.n) ? "" : " out"}" data-a="${H(a.n)}" aria-pressed="${S.on.has(a.n)}"><span class="badge">${S.on.has(a.n) ? "✓" : "✕"}</span>${mono(a.n, a.r)}${H(a.n)}</button>`).join("")}</div></div>`;
        })
        .join("") +
      `<div class="row"><button class="btn" id="dn">Done</button><button class="btn" id="reset">Reset</button></div>`;

    P.querySelectorAll("[data-a]").forEach(b => {
      b.onclick = () => {
        const n = b.dataset.a;
        S.on.has(n) ? S.on.delete(n) : S.on.add(n);
        S.error = "";
        draw();
      };
    });

    P.querySelectorAll("[data-rt]").forEach(b => {
      b.onclick = () => {
        const all = AG.filter(a => a.r === b.dataset.rt);
        const off = !all.some(a => S.on.has(a.n));
        all.forEach(a => (off ? S.on.add(a.n) : S.on.delete(a.n)));
        S.error = "";
        draw();
      };
    });

    $("#dn").onclick = () => {
      S.view = "pick";
      draw();
    };
    $("#reset").onclick = resetRandomizer;
  }
}

function draw() {
  $("#agents .stage").classList.toggle("focused", S.view !== "pick");
  drawRoles();
  drawPanel();
}

draw();

// Build compatibility pairings for the selected agent.
$("#teamSel").innerHTML = AG.map(a => `<option>${a.n}</option>`).join("");

function team() {
  const n = $("#teamSel").value;
  const m = PAIRS.filter(p => p[0] === n || p[1] === n);

  $("#teamOut").classList.add("compatibility");
  $("#teamOut").innerHTML = m.length
    ? m
        .map(
          p =>
            `<article class="compat-card"><div class="pair-art">${p
              .slice(0, 2)
              .map(
                a =>
                  `<figure class="pair-agent"><figcaption>${H(a)}</figcaption>${AGENT_ICON[a] ? `<img src="${AGENT_ICON[a]}" alt="${H(a)} portrait">` : `<div class="pair-fallback" role="img" aria-label="${H(a)} portrait">${H(a[0])}</div>`}</figure>`,
              )
              .join("")}</div><p>${H(p[2])}</p></article>`,
        )
        .join("")
    : '<p class="mut">No pairing written for this agent yet.</p>';
}

$("#teamSel").onchange = team;
team();

// Update the active navigation item as page sections enter the viewport.
const links = [...document.querySelectorAll("#nav a")];
const navObserver = new IntersectionObserver(
  es =>
    es.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle("on", l.hash === "#" + e.target.id));
      }
    }),
  { threshold: 0.5 },
);

document.querySelectorAll("section, footer[id]").forEach(s => navObserver.observe(s));

// Local tracks play through Web Audio to support volume and the audio visualizer.
const TR = [
  { t: "Never Gonna Give You Up", src: "assets/audio/Never Gonna Give You Up.mp3" },
  {
    t: "VALORANT Main Menu — Episode 7 Act II",
    src: "assets/audio/Valorant Main Menu - Official Theme Episode 7 Act II.mp3",
  },
  {
    t: "VALORANT Main Menu — Episode 4 Act II",
    src: "assets/audio/Valorant Main Menu Lobby - Official Theme Episode 4 Act II.mp3",
  },
];

let ac, an, mg, source, cur = 0, playing = false, muted = false, data;
const el = new Audio();
el.preload = "metadata";

function init() {
  if (ac) return;

  ac = new (window.AudioContext || window.webkitAudioContext)();
  mg = ac.createGain();
  an = ac.createAnalyser();
  an.fftSize = 1024;
  data = new Uint8Array(an.fftSize);
  source = ac.createMediaElementSource(el);
  source.connect(mg);
  mg.connect(an);
  an.connect(ac.destination);
  setVol();
}

function setVol() {
  if (mg) mg.gain.value = muted ? 0 : +$("#vol").value * 0.6;
}

async function startPlayback() {
  init();

  try {
    await ac.resume();
    await el.play();
    playing = true;
    ui();
  } catch (error) {
    playing = false;
    ui();
    $("#ttl").textContent = `Unable to play ${TR[cur].t}. Check the music file.`;
    console.error("Audio playback failed:", error);
  }
}

function load(i) {
  cur = (i + TR.length) % TR.length;
  el.pause();
  el.src = TR[cur].src;
  el.load();
  $("#ttl").textContent = TR[cur].t;
  $("#track").href = TR[cur].src;
  if (playing) startPlayback();
}

el.addEventListener("ended", () => load(cur + 1));
el.addEventListener("error", () => {
  if (el.error) {
    playing = false;
    ui();
    $("#ttl").textContent = `Unable to load ${TR[cur].t}. Check the music file.`;
    console.error("Audio file failed to load:", TR[cur].src, el.error);
  }
});

async function play() {
  await startPlayback();
}

function pause() {
  playing = false;
  el.pause();
  ui();
}

function ui() {
  $("#pp").innerHTML = playing ? "&#9208;" : "&#9654;";
  $("#cd").classList.toggle("spin", playing);
}

$("#pp").onclick = () => (playing ? pause() : play());
$("#next").onclick = () => load(cur + 1);
$("#prev").onclick = () => load(cur - 1);

$("#mute").onclick = () => {
  muted = !muted;
  $("#mute").innerHTML = muted ? "&#128263;" : "&#128266;";
  setVol();
};

$("#vol").oninput = () => {
  muted = false;
  $("#mute").innerHTML = "&#128266;";
  setVol();
};

$("#lbl").onclick = () => $("#player").classList.toggle("open");
load(0);

// Draw the idle wave and switch to live audio data while a track is playing.
const cv = $("#wave");
const cx = cv.getContext("2d");
let W, Hh;

function rs() {
  W = cv.width = innerWidth;
  Hh = cv.height = innerHeight;
}

rs();
addEventListener("resize", rs);

let mx = 0.5;
addEventListener("pointermove", e => (mx = e.clientX / W));

function frame(ts) {
  cx.clearRect(0, 0, W, Hh);
  cx.strokeStyle = "rgba(196,80,79,.28)";
  cx.lineWidth = 3;
  cx.beginPath();

  const mid = Hh / 2;
  const N = 220;
  if (playing && an) an.getByteTimeDomainData(data);

  for (let i = 0; i <= N; i++) {
    const x = (i / N) * W;
    const env = Math.exp(-((x / W - mx) ** 2) * 9);
    let y;

    if (playing && an) {
      const s = (data[Math.floor((i / N) * (data.length - 1))] - 128) / 128;
      y = s * Hh * 0.45 * (0.4 + env);
    } else {
      y = Math.sin(i * 0.35 + ts / 700) * Hh * 0.1 * (0.3 + env);
    }

    i ? cx.lineTo(x, mid + y) : cx.moveTo(x, mid + y);
  }

  cx.stroke();
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
