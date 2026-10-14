# Valorant Agent Randomizer

A scrolling single-page site that picks a random VALORANT agent for indecisive multi-role players.
Choose a role (or Flex), roll an agent, and customize which agents are in your pool.

## Features

- **Agent randomizer:** pick Initiator, Controller, Duelist, Sentinel or Flex. Hovering a role icon enlarges it, and clicking it turns it red and shows the agents in that role. Roll to get a random agent, then Roll again, Customize or go back to the role picker.
- **Customization:** mark which agents you own. Tap an agent to keep or remove it, or tap a role icon to switch a whole role on or off. Only the agents you keep can be rolled.
- **Agent compatibility:** opinion-based team pairings with a short reason, for example Yoru with Astra. Pairs live in the `PAIRS` list in `script.js`.
- **Music player:** a spinning CD in the bottom-right corner that appears on hover, with link, previous, play/pause, next, mute and volume controls. The background waveform reacts to the audio.
- **Sections:** Home, Agents, Teams, About Me, Projects and Contact. The nav highlights the section you are in.

## Project structure

```
agent-randomizer/
├── index.html   # page markup
├── style.css    # styles
├── script.js    # randomizer, customization, compatibility, music, waveform
└── README.md
```

## Run it

No build step. Open `index.html` in a browser, or serve the folder with any static server. Audio files work best when served over http (for example `python -m http.server`) so the waveform can read them.

## Customize it

All of these are marked with comments:

- **Logo:** add `logo.png` next to `index.html`, or change the `src` in the logo comment in `index.html`.
- **Songs:** edit the `TR` list in `script.js` (max 3). Set `t` (title), `url` (YouTube or Spotify link) and `src` (path to an audio file you host). YouTube and Spotify can't be played inside the page, so `src` is what plays and drives the waveform. If `src` is empty, a synthesized demo loop plays.
- **Role icons:** fill in `ROLE_ICONS` in `script.js`.
- **Agent icons:** fill in `AGENT_ICON` (small portraits used in the pools and the customization board).
- **Agent art:** fill in `AGENT_ART` (large image on the result screen).
- **Roster and pairings:** edit the `DATA` and `PAIRS` lists in `script.js`.

## Built with

HTML, CSS, vanilla JavaScript and the Web Audio API.

## Disclaimer

This is a fan project and is not affiliated with or endorsed by Riot Games. VALORANT and its agents, icons and artwork belong to Riot Games.
