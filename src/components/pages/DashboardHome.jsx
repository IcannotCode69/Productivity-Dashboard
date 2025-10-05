import React, { useState, useEffect } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import HWLinksWidget from "../HWLinksWidget";

// react-grid-layout wrapper that auto-measures width
const GridLayout = WidthProvider(RGL);

// Minimal welcome widget. Additional widgets can follow the same pattern:
// - A plain React component
// - Registered in widgetTypes with sizing constraints
function WelcomeWidget() {
  return (
    <div className="bg-gradient-to-br from-[#232a36]/90 to-[#1a1f2b]/90 backdrop-blur-md rounded-3xl shadow-xl border border-[#2d3440] p-8 w-full text-center mx-auto flex flex-col items-center justify-center min-h-[160px]">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-100 mb-2 break-words">Welcome! 🎓</h2>
      <p className="text-blue-200 text-lg md:text-xl font-medium break-words">
        All your life, in one place.<br/>
        Organize your notes, tasks, calendar, and more—with AI-powered help.
      </p>
    </div>
  );
}

// Catalog of available widgets.
// Each type defines: display name, component, and default/min grid sizes.
const widgetTypes = {
  welcome: {
    name: "Welcome",
    component: WelcomeWidget,
    minW: 3, minH: 3, w: 4, h: 4
  },
  hwlinks: {
    name: "Homework Links",
    component: HWLinksWidget,
    minW: 3, minH: 3, w: 4, h: 4
  }
};

// Default dashboard contents for first load
const initialWidgets = [
  { key: "welcome-1", type: "welcome", x: 0, y: 0 },
  { key: "hwlinks-1", type: "hwlinks", x: 4, y: 0 }
];

export default function DashboardHome() {
  // Persist widgets and layout separately to localStorage so the dashboard
  // keeps its shape across reloads.
  const [widgets, setWidgets] = useState(() => {
    const saved = localStorage.getItem("dashboard-widgets");
    if (saved) return JSON.parse(saved);
    return initialWidgets;
  });
  const [layout, setLayout] = useState(() => {
    const saved = localStorage.getItem("dashboard-layout");
    if (saved) return JSON.parse(saved);
    return initialWidgets.map(w => ({
      i: w.key,
      x: w.x,
      y: w.y,
      w: widgetTypes[w.type].w,
      h: widgetTypes[w.type].h,
      minW: widgetTypes[w.type].minW,
      minH: widgetTypes[w.type].minH
    }));
  });

  useEffect(() => {
    localStorage.setItem("dashboard-widgets", JSON.stringify(widgets));
  }, [widgets]);
  useEffect(() => {
    localStorage.setItem("dashboard-layout", JSON.stringify(layout));
  }, [layout]);

  function removeWidget(key) {
    setWidgets(ws => ws.filter(w => w.key !== key));
    setLayout(l => l.filter(item => item.i !== key));
  }
  // Add a new widget of a given type at the bottom of the grid
  function addWidget(type) {
    const key = `${type}-${Date.now()}`;
    setWidgets(ws => [...ws, { key, type }]);
    setLayout(l => [
      ...l,
      {
        i: key,
        x: 0,
        y: Infinity, // y=Infinity tells RGL to place it after existing items
        w: widgetTypes[type].w,
        h: widgetTypes[type].h,
        minW: widgetTypes[type].minW,
        minH: widgetTypes[type].minH
      }
    ]);
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#181c24] to-[#232a36] py-8 px-2" style={{ paddingTop: 96 }}>
      <div className="w-full mx-auto" style={{ maxWidth: 1600 }}>
        {/*
          Grid configuration:
          - cols: 16 columns grid for fine-grained placement
          - rowHeight: vertical unit size
          - draggableHandle: only the handle allows dragging, avoids accidental drags
        */}
        <GridLayout
          className="layout"
          layout={layout}
          cols={16}
          rowHeight={80}
          onLayoutChange={setLayout}
          draggableHandle=".widget-drag"
          isResizable
          isDraggable
        >
          {widgets.map(w => {
            const Widget = widgetTypes[w.type].component;
            return (
              <div
                key={w.key}
                className="bg-transparent flex flex-col relative overflow-visible select-none"
                style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
              >
                <div
                  className="widget-drag cursor-grab absolute top-2 right-2 text-blue-400 hover:text-blue-200 z-20 flex items-center justify-center"
                  title="Drag to move"
                  style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(36,52,80,0.5)' }}
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="5" cy="5" r="2.5"/><circle cx="12" cy="5" r="2.5"/><circle cx="19" cy="5" r="2.5"/><circle cx="5" cy="12" r="2.5"/><circle cx="12" cy="12" r="2.5"/><circle cx="19" cy="12" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="12" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/></svg>
                </div>
                {/* Remove widget button */}
                <button
                  className="absolute top-2 left-2 text-xs text-red-400 hover:text-red-600 bg-[#232a36] rounded-full px-2 py-0.5 shadow z-20"
                  onClick={() => removeWidget(w.key)}
                  title="Remove widget"
                >
                  ×
                </button>
                <Widget />
              </div>
            );
          })}
          {/* Add widget button */}
          {/* Show an "Add Widget" tile for any widget type not currently on the dashboard */}
          {Object.keys(widgetTypes).filter(type => !widgets.some(w => w.type === type)).map(type => (
            <button
              key={type}
              className="w-full h-[200px] flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-500 text-blue-400 bg-[#181c24] hover:bg-blue-900/40 hover:text-blue-300 shadow transition text-4xl font-bold"
              onClick={() => addWidget(type)}
              title="Add widget"
            >
              +
              <span className="text-xs font-semibold mt-1">Add Widget</span>
            </button>
          ))}
        </GridLayout>
      </div>
      <style>{`
        .react-grid-layout {
          min-height: 400px;
        }
        .react-grid-item {
          transition: all 0.2s;
        }
        .react-resizable-handle {
          position: absolute;
          width: 20px;
          height: 20px;
          bottom: 0;
          right: 0;
          cursor: se-resize;
          background: none;
        }
      `}</style>
    </div>
  );
}
