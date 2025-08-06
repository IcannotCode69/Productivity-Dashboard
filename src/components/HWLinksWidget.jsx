import React, { useState, useEffect } from "react";

const STORAGE_KEY = "hw-links";

function getInitialLinks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);
  return [
    { name: "MATLAB", url: "https://matlab.mathworks.com/", icon: "https://matlab.mathworks.com/favicon.ico" },
    { name: "Pearson", url: "https://www.pearson.com/", icon: "https://www.pearson.com/etc/designs/pearson/favicon.ico" }
  ];
}

export default function HWLinksWidget() {
  const [links, setLinks] = useState(getInitialLinks);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  }, [links]);

  function addLink(e) {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;
    setLinks([...links, { name: name.trim(), url: url.trim(), icon: icon.trim() }]);
    setName(""); setUrl(""); setIcon("");
  }

  function removeLink(idx) {
    setLinks(links.filter((_, i) => i !== idx));
  }

  return (
    <div className="bg-gradient-to-br from-[#232a36]/90 to-[#1a1f2b]/90 rounded-3xl shadow-xl border border-[#2d3440] p-6 mb-6">
      <h3 className="text-xl font-semibold text-blue-200 mb-4 tracking-tight">Homework Links</h3>
      <form onSubmit={addLink} className="flex flex-wrap gap-2 mb-4 items-end">
        <input
          className="px-3 py-2 rounded-lg bg-[#181c24] text-blue-100 border border-[#2d3440] focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
          placeholder="Site Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className="px-3 py-2 rounded-lg bg-[#181c24] text-blue-100 border border-[#2d3440] focus:outline-none focus:ring-2 focus:ring-blue-500 w-56"
          placeholder="https://site.com"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <input
          className="px-3 py-2 rounded-lg bg-[#181c24] text-blue-100 border border-[#2d3440] focus:outline-none focus:ring-2 focus:ring-blue-500 w-40"
          placeholder="Favicon URL (optional)"
          value={icon}
          onChange={e => setIcon(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-semibold"
        >
          Add
        </button>
      </form>
      <div className="flex flex-wrap gap-4">
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center justify-center w-40 h-32 rounded-2xl bg-[#181c24] border border-[#2d3440] shadow hover:shadow-blue-900/40 hover:border-blue-500/60 transition cursor-pointer overflow-hidden"
            style={{ textDecoration: 'none' }}
          >
            <button
              className="absolute top-2 right-2 text-xs text-red-400 hover:text-red-600 bg-[#232a36] rounded-full px-2 py-0.5 shadow z-10"
              onClick={e => { e.preventDefault(); removeLink(idx); }}
              title="Remove link"
            >
              ×
            </button>
            <img
              src={link.icon || `https://www.google.com/s2/favicons?domain=${link.url}`}
              alt="icon"
              className="w-10 h-10 mb-2 rounded shadow group-hover:scale-110 transition"
              onError={e => { e.target.style.display = 'none'; }}
            />
            <span className="text-blue-100 font-semibold text-lg text-center truncate w-32 group-hover:text-blue-400 transition">
              {link.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
