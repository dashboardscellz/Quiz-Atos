/* ============================================
   MANA E KELINHA - UTILITÁRIOS
   ============================================ */

// ============================================
// FORMATAÇÃO DE DADOS
// ============================================
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });
};

const formatTime = (totalSeconds) => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const formatDuration = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}min`;
};

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

// Calcular dias até a prova
const getDaysUntilExam = () => {
  const now = new Date();
  const diff = EXAM_DATE - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

// ============================================
// ÍCONES SVG
// ============================================
const Icons = {
  home: (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('path', { d: 'm3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }), React.createElement('polyline', { points: '9 22 9 12 15 12 15 22' })),
  plus: (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('path', { d: 'M5 12h14' }), React.createElement('path', { d: 'M12 5v14' })),
  radio: (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('path', { d: 'M4.9 19.1C1 15.2 1 8.8 4.9 4.9' }), React.createElement('path', { d: 'M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5' }), React.createElement('circle', { cx: '12', cy: '12', r: '2' }), React.createElement('path', { d: 'M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5' }), React.createElement('path', { d: 'M19.1 4.9C23 8.8 23 15.1 19.1 19' })),
  calendar: (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('path', { d: 'M8 2v4' }), React.createElement('path', { d: 'M16 2v4' }), React.createElement('rect', { width: '18', height: '18', x: '3', y: '4', rx: '2' }), React.createElement('path', { d: 'M3 10h18' })),
  'bar-chart-3': (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('path', { d: 'M3 3v18h18' }), React.createElement('path', { d: 'M18 17V9' }), React.createElement('path', { d: 'M13 17V5' }), React.createElement('path', { d: 'M8 17v-3' })),
  target: (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('circle', { cx: '12', cy: '12', r: '10' }), React.createElement('circle', { cx: '12', cy: '12', r: '6' }), React.createElement('circle', { cx: '12', cy: '12', r: '2' })),
  bell: (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('path', { d: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9' }), React.createElement('path', { d: 'M10.3 21a1.94 1.94 0 0 0 3.4 0' })),
  x: (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('path', { d: 'M18 6 6 18' }), React.createElement('path', { d: 'm6 6 12 12' })),
  user: (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('path', { d: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' }), React.createElement('circle', { cx: '12', cy: '7', r: '4' })),
  users: (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }), React.createElement('circle', { cx: '9', cy: '7', r: '4' }), React.createElement('path', { d: 'M22 21v-2a4 4 0 0 0-3-3.87' }), React.createElement('path', { d: 'M16 3.13a4 4 0 0 1 0 7.75' })),
  crown: (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('path', { d: 'm2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14' })),
  'trending-up': (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('polyline', { points: '22 7 13.5 15.5 8.5 10.5 2 17' }), React.createElement('polyline', { points: '16 7 22 7 22 13' })),
  clock: (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('circle', { cx: '12', cy: '12', r: '10' }), React.createElement('polyline', { points: '12 6 12 12 16 14' })),
  play: (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('polygon', { points: '5 3 19 12 5 21 5 3' })),
  pause: (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('rect', { width: '4', height: '16', x: '6', y: '4' }), React.createElement('rect', { width: '4', height: '16', x: '14', y: '4' })),
  'rotate-ccw': (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('path', { d: 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' }), React.createElement('path', { d: 'M3 3v5h5' })),
  'book-open': (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('path', { d: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z' }), React.createElement('path', { d: 'M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' })),
  'check-circle': (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('path', { d: 'M22 11.08V12a10 10 0 1 1-5.93-9.14' }), React.createElement('polyline', { points: '22 4 12 14.01 9 11.01' })),
  'alert-circle': (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('circle', { cx: '12', cy: '12', r: '10' }), React.createElement('line', { x1: '12', x2: '12', y1: '8', y2: '12' }), React.createElement('line', { x1: '12', x2: '12.01', y1: '16', y2: '16' })),
  brain: (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('path', { d: 'M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z' }), React.createElement('path', { d: 'M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z' })),
  'trash-2': (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('path', { d: 'M3 6h18' }), React.createElement('path', { d: 'M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' }), React.createElement('path', { d: 'M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' }), React.createElement('line', { x1: '10', x2: '10', y1: '11', y2: '17' }), React.createElement('line', { x1: '14', x2: '14', y1: '11', y2: '17' })),
  zap: (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('polygon', { points: '13 2 3 14 12 14 11 22 21 10 12 10 13 2' })),
  eye: (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('path', { d: 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z' }), React.createElement('circle', { cx: '12', cy: '12', r: '3' })),
  'eye-off': (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('path', { d: 'M9.88 9.88a3 3 0 1 0 4.24 4.24' }), React.createElement('path', { d: 'M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68' }), React.createElement('path', { d: 'M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61' }), React.createElement('line', { x1: '2', x2: '22', y1: '2', y2: '22' })),
  edit: (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('path', { d: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' }), React.createElement('path', { d: 'M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z' })),
  download: (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }), React.createElement('polyline', { points: '7 10 12 15 17 10' }), React.createElement('line', { x1: '12', x2: '12', y1: '15', y2: '3' })),
  upload: (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }), React.createElement('polyline', { points: '17 8 12 3 7 8' }), React.createElement('line', { x1: '12', x2: '12', y1: '3', y2: '15' })),
  search: (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('circle', { cx: '11', cy: '11', r: '8' }), React.createElement('path', { d: 'm21 21-4.3-4.3' })),
  filter: (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('polygon', { points: '22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3' })),
  'more-vertical': (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('circle', { cx: '12', cy: '12', r: '1' }), React.createElement('circle', { cx: '12', cy: '5', r: '1' }), React.createElement('circle', { cx: '12', cy: '19', r: '1' })),
  flag: (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('path', { d: 'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z' }), React.createElement('line', { x1: '4', x2: '4', y1: '22', y2: '15' })),
  award: (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('circle', { cx: '12', cy: '8', r: '7' }), React.createElement('polyline', { points: '8.21 13.89 7 23 12 20 17 23 15.79 13.88' })),
  list: (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('line', { x1: '8', x2: '21', y1: '6', y2: '6' }), React.createElement('line', { x1: '8', x2: '21', y1: '12', y2: '12' }), React.createElement('line', { x1: '8', x2: '21', y1: '18', y2: '18' }), React.createElement('line', { x1: '3', x2: '3.01', y1: '6', y2: '6' }), React.createElement('line', { x1: '3', x2: '3.01', y1: '12', y2: '12' }), React.createElement('line', { x1: '3', x2: '3.01', y1: '18', y2: '18' })),
  star: (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('polygon', { points: '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' })),
  trophy: (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('path', { d: 'M6 9H4.5a2.5 2.5 0 0 1 0-5H6' }), React.createElement('path', { d: 'M18 9h1.5a2.5 2.5 0 0 0 0-5H18' }), React.createElement('path', { d: 'M4 22h16' }), React.createElement('path', { d: 'M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22' }), React.createElement('path', { d: 'M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22' }), React.createElement('path', { d: 'M18 2H6v7a6 6 0 0 0 12 0V2Z' })),
  'cpu': (props) => React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ...props }, 
    React.createElement('rect', { x: '4', y: '4', width: '16', height: '16', rx: '2' }), React.createElement('rect', { x: '9', y: '9', width: '6', height: '6' }), React.createElement('path', { d: 'M15 2v2' }), React.createElement('path', { d: 'M15 20v2' }), React.createElement('path', { d: 'M2 15h2' }), React.createElement('path', { d: 'M2 9h2' }), React.createElement('path', { d: 'M20 15h2' }), React.createElement('path', { d: 'M20 9h2' }), React.createElement('path', { d: 'M9 2v2' }), React.createElement('path', { d: 'M9 20v2' })),
};
