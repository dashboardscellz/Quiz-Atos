/* ============================================
   MANA E KELINHA - DADOS E CONFIGURAÇÕES
   ============================================ */

// ============================================
// DATA LIMITE DA PROVA
// ============================================
const EXAM_DATE = new Date('2026-11-09T23:59:59');

// ============================================
// SISTEMA DE NÍVEIS E XP
// ============================================
const LEVELS = [
  { level: 1, name: 'Estudante Curioso', minXP: 0, maxXP: 500, emoji: '📚', color: '#8b5cf6' },
  { level: 2, name: 'Aprendiz Dedicado', minXP: 500, maxXP: 1200, emoji: '📖', color: '#7c3aed' },
  { level: 3, name: 'Discípulo Esforçado', minXP: 1200, maxXP: 2200, emoji: '✏️', color: '#a855f7' },
  { level: 4, name: 'Conhecedor Ativo', minXP: 2200, maxXP: 3500, emoji: '🎯', color: '#9333ea' },
  { level: 5, name: 'Estudante Avançado', minXP: 3500, maxXP: 5000, emoji: '🚀', color: '#8b5cf6' },
  { level: 6, name: 'Especialista em Formação', minXP: 5000, maxXP: 6800, emoji: '🔬', color: '#7c3aed' },
  { level: 7, name: 'Mestre do Conhecimento', minXP: 6800, maxXP: 9000, emoji: '🎓', color: '#a855f7' },
  { level: 8, name: 'Sábio Aprendiz', minXP: 9000, maxXP: 11500, emoji: '🦉', color: '#9333ea' },
  { level: 9, name: 'Guru dos Estudos', minXP: 11500, maxXP: 14500, emoji: '👑', color: '#fbbf24' },
  { level: 10, name: 'Lenda Acadêmica', minXP: 14500, maxXP: 18000, emoji: '🏆', color: '#f59e0b' },
  { level: 11, name: 'Mestre Supremo', minXP: 18000, maxXP: 22000, emoji: '💎', color: '#d946ef' },
  { level: 12, name: 'Deus do Conhecimento', minXP: 22000, maxXP: 27000, emoji: '🔱', color: '#8b5cf6' },
  { level: 13, name: 'Titã da Sabedoria', minXP: 27000, maxXP: 33000, emoji: '⚡', color: '#eab308' },
  { level: 14, name: 'Imortal Acadêmico', minXP: 33000, maxXP: 40000, emoji: '🌟', color: '#f97316' },
  { level: 15, name: 'Entidade do Saber', minXP: 40000, maxXP: Infinity, emoji: '👁️', color: '#ec4899' }
];

// ============================================
// SISTEMA DE BADGES (50+ BADGES)
// ============================================
const BADGES = {
  // BADGES DE MARCO INICIAL
  primeira_sessao: {
    id: 'primeira_sessao',
    name: 'Primeiros Passos',
    description: 'Complete sua primeira sessão de estudo',
    emoji: '🌱',
    rarity: 'bronze',
    category: 'marcos',
    condition: (stats) => stats.totalSessions >= 1,
    xpReward: 50
  },
  dez_sessoes: {
    id: 'dez_sessoes',
    name: 'Dezena de Estudos',
    description: 'Complete 10 sessões de estudo',
    emoji: '📊',
    rarity: 'bronze',
    category: 'marcos',
    condition: (stats) => stats.totalSessions >= 10,
    xpReward: 100
  },
  cinquenta_sessoes: {
    id: 'cinquenta_sessoes',
    name: 'Cinquenta Conquistas',
    description: 'Complete 50 sessões de estudo',
    emoji: '📈',
    rarity: 'prata',
    category: 'marcos',
    condition: (stats) => stats.totalSessions >= 50,
    xpReward: 250
  },
  cem_sessoes: {
    id: 'cem_sessoes',
    name: 'Centenário de Estudos',
    description: 'Complete 100 sessões de estudo',
    emoji: '💯',
    rarity: 'ouro',
    category: 'marcos',
    condition: (stats) => stats.totalSessions >= 100,
    xpReward: 500
  },
  duzentas_sessoes: {
    id: 'duzentas_sessoes',
    name: 'Mestre das Sessões',
    description: 'Complete 200 sessões de estudo',
    emoji: '🏅',
    rarity: 'platina',
    category: 'marcos',
    condition: (stats) => stats.totalSessions >= 200,
    xpReward: 1000
  },
  
  // BADGES DE TEMPO
  primeira_hora: {
    id: 'primeira_hora',
    name: 'Hora Inicial',
    description: 'Estude por 1 hora no total',
    emoji: '⏱️',
    rarity: 'bronze',
    category: 'tempo',
    condition: (stats) => stats.totalMinutes >= 60,
    xpReward: 50
  },
  dez_horas: {
    id: 'dez_horas',
    name: 'Dez Horas de Foco',
    description: 'Estude por 10 horas no total',
    emoji: '⏰',
    rarity: 'bronze',
    category: 'tempo',
    condition: (stats) => stats.totalMinutes >= 600,
    xpReward: 100
  },
  cinquenta_horas: {
    id: 'cinquenta_horas',
    name: 'Maratonista',
    description: 'Estude por 50 horas no total',
    emoji: '🏃',
    rarity: 'prata',
    category: 'tempo',
    condition: (stats) => stats.totalMinutes >= 3000,
    xpReward: 300
  },
  cem_horas: {
    id: 'cem_horas',
    name: 'Cem Horas de Glória',
    description: 'Estude por 100 horas no total',
    emoji: '🕐',
    rarity: 'ouro',
    category: 'tempo',
    condition: (stats) => stats.totalMinutes >= 6000,
    xpReward: 600
  },
  duzentas_horas: {
    id: 'duzentas_horas',
    name: 'Veterano de Estudos',
    description: 'Estude por 200 horas no total',
    emoji: '🎖️',
    rarity: 'platina',
    category: 'tempo',
    condition: (stats) => stats.totalMinutes >= 12000,
    xpReward: 1200
  },
  trezentas_horas: {
    id: 'trezentas_horas',
    name: 'Lenda do Tempo',
    description: 'Estude por 300 horas no total',
    emoji: '⏳',
    rarity: 'diamante',
    category: 'tempo',
    condition: (stats) => stats.totalMinutes >= 18000,
    xpReward: 2000
  },
  
  // BADGES DE STREAK
  streak_3: {
    id: 'streak_3',
    name: 'Começo Quente',
    description: 'Estude 3 dias seguidos',
    emoji: '🔥',
    rarity: 'bronze',
    category: 'streak',
    condition: (stats) => stats.streak >= 3,
    xpReward: 75
  },
  streak_7: {
    id: 'streak_7',
    name: 'Semana Perfeita',
    description: 'Estude 7 dias seguidos',
    emoji: '📅',
    rarity: 'prata',
    category: 'streak',
    condition: (stats) => stats.streak >= 7,
    xpReward: 200
  },
  streak_14: {
    id: 'streak_14',
    name: 'Duas Semanas de Fogo',
    description: 'Estude 14 dias seguidos',
    emoji: '🌋',
    rarity: 'ouro',
    category: 'streak',
    condition: (stats) => stats.streak >= 14,
    xpReward: 400
  },
  streak_30: {
    id: 'streak_30',
    name: 'Mês de Disciplina',
    description: 'Estude 30 dias seguidos',
    emoji: '📆',
    rarity: 'platina',
    category: 'streak',
    condition: (stats) => stats.streak >= 30,
    xpReward: 800
  },
  streak_60: {
    id: 'streak_60',
    name: 'Bimestre Impecável',
    description: 'Estude 60 dias seguidos',
    emoji: '🗓️',
    rarity: 'diamante',
    category: 'streak',
    condition: (stats) => stats.streak >= 60,
    xpReward: 1500
  },
  streak_100: {
    id: 'streak_100',
    name: 'Centena de Dias',
    description: 'Estude 100 dias seguidos',
    emoji: '💯',
    rarity: 'especial',
    category: 'streak',
    condition: (stats) => stats.streak >= 100,
    xpReward: 3000
  },
  
  // BADGES DE PERFORMANCE (QUESTÕES)
  acerto_70: {
    id: 'acerto_70',
    name: 'Bom Desempenho',
    description: 'Alcance 70% de acerto em uma sessão',
    emoji: '✅',
    rarity: 'bronze',
    category: 'performance',
    condition: (stats) => stats.bestAccuracy >= 70,
    xpReward: 75
  },
  acerto_80: {
    id: 'acerto_80',
    name: 'Muito Bem!',
    description: 'Alcance 80% de acerto em uma sessão',
    emoji: '🌟',
    rarity: 'prata',
    category: 'performance',
    condition: (stats) => stats.bestAccuracy >= 80,
    xpReward: 150
  },
  acerto_90: {
    id: 'acerto_90',
    name: 'Mestre das Questões',
    description: 'Alcance 90% de acerto em uma sessão',
    emoji: '🎯',
    rarity: 'ouro',
    category: 'performance',
    condition: (stats) => stats.bestAccuracy >= 90,
    xpReward: 300
  },
  acerto_100: {
    id: 'acerto_100',
    name: 'Perfeição Absoluta',
    description: 'Alcance 100% de acerto em uma sessão',
    emoji: '💎',
    rarity: 'diamante',
    category: 'performance',
    condition: (stats) => stats.bestAccuracy >= 100,
    xpReward: 500
  },
  cem_questoes: {
    id: 'cem_questoes',
    name: 'Cem Desafios',
    description: 'Resolva 100 questões no total',
    emoji: '📝',
    rarity: 'bronze',
    category: 'performance',
    condition: (stats) => stats.totalQuestions >= 100,
    xpReward: 100
  },
  quinhentas_questoes: {
    id: 'quinhentas_questoes',
    name: 'Quinhentas Conquistas',
    description: 'Resolva 500 questões no total',
    emoji: '📚',
    rarity: 'prata',
    category: 'performance',
    condition: (stats) => stats.totalQuestions >= 500,
    xpReward: 300
  },
  mil_questoes: {
    id: 'mil_questoes',
    name: 'Milênio de Questões',
    description: 'Resolva 1000 questões no total',
    emoji: '🏆',
    rarity: 'ouro',
    category: 'performance',
    condition: (stats) => stats.totalQuestions >= 1000,
    xpReward: 600
  },
  duas_mil_questoes: {
    id: 'duas_mil_questoes',
    name: 'Veterano de Questões',
    description: 'Resolva 2000 questões no total',
    emoji: '🎖️',
    rarity: 'platina',
    category: 'performance',
    condition: (stats) => stats.totalQuestions >= 2000,
    xpReward: 1200
  },
  
  // BADGES DE MATÉRIAS
  duas_materias: {
    id: 'duas_materias',
    name: 'Explorador',
    description: 'Estude 2 matérias diferentes',
    emoji: '🔍',
    rarity: 'bronze',
    category: 'materias',
    condition: (stats) => stats.uniqueSubjects >= 2,
    xpReward: 50
  },
  cinco_materias: {
    id: 'cinco_materias',
    name: 'Polímata',
    description: 'Estude 5 matérias diferentes',
    emoji: '📚',
    rarity: 'prata',
    category: 'materias',
    condition: (stats) => stats.uniqueSubjects >= 5,
    xpReward: 150
  },
  dez_materias: {
    id: 'dez_materias',
    name: 'Especialista Geral',
    description: 'Estude 10 matérias diferentes',
    emoji: '🎓',
    rarity: 'ouro',
    category: 'materias',
    condition: (stats) => stats.uniqueSubjects >= 10,
    xpReward: 350
  },
  
  // BADGES DE DIFICULDADE
  dificuldade_facil: {
    id: 'dificuldade_facil',
    name: 'Começo Tranquilo',
    description: 'Complete 10 sessões no modo Fácil',
    emoji: '🌸',
    rarity: 'bronze',
    category: 'dificuldade',
    condition: (stats) => stats.easySessions >= 10,
    xpReward: 75
  },
  dificuldade_media: {
    id: 'dificuldade_media',
    name: 'Desafio Médio',
    description: 'Complete 10 sessões no modo Médio',
    emoji: '⚡',
    rarity: 'prata',
    category: 'dificuldade',
    condition: (stats) => stats.mediumSessions >= 10,
    xpReward: 150
  },
  dificuldade_dificil: {
    id: 'dificuldade_dificil',
    name: 'Guerreiro do Difícil',
    description: 'Complete 10 sessões no modo Difícil',
    emoji: '🔥',
    rarity: 'ouro',
    category: 'dificuldade',
    condition: (stats) => stats.hardSessions >= 10,
    xpReward: 300
  },
  
  // BADGES ESPECIAIS
  madrugada: {
    id: 'madrugada',
    name: 'Coruja Noturna',
    description: 'Estude entre 00h e 05h',
    emoji: '🦉',
    rarity: 'prata',
    category: 'especial',
    condition: (stats) => stats.hasStudiedLateNight,
    xpReward: 200
  },
  fim_de_semana: {
    id: 'fim_de_semana',
    name: 'Guerreiro de FDS',
    description: 'Estude em um sábado ou domingo',
    emoji: '🌞',
    rarity: 'bronze',
    category: 'especial',
    condition: (stats) => stats.hasStudiedWeekend,
    xpReward: 100
  },
  sessao_longa: {
    id: 'sessao_longa',
    name: 'Maratona de Estudos',
    description: 'Uma sessão de mais de 3 horas',
    emoji: '🏃',
    rarity: 'ouro',
    category: 'especial',
    condition: (stats) => stats.longestSession >= 180,
    xpReward: 250
  },
  sessao_curta: {
    id: 'sessao_curta',
    name: 'Foco Rápido',
    description: '10 sessões de 15-25 minutos',
    emoji: '⚡',
    rarity: 'bronze',
    category: 'especial',
    condition: (stats) => stats.shortSessions >= 10,
    xpReward: 100
  },
  
  // BADGES DE CONSISTÊNCIA
  dia_completo: {
    id: 'dia_completo',
    name: 'Dia Produtivo',
    description: 'Estude mais de 4 horas em um dia',
    emoji: '📅',
    rarity: 'prata',
    category: 'consistencia',
    condition: (stats) => stats.maxHoursInDay >= 4,
    xpReward: 150
  },
  semana_intensa: {
    id: 'semana_intensa',
    name: 'Semana de Ferro',
    description: 'Estude mais de 20 horas em uma semana',
    emoji: '💪',
    rarity: 'ouro',
    category: 'consistencia',
    condition: (stats) => stats.maxHoursInWeek >= 20,
    xpReward: 400
  },
  
  // BADGES DE DUO/CASAL
  ambos_estudaram: {
    id: 'ambos_estudaram',
    name: 'Dia de Casal',
    description: 'Ambos estudaram no mesmo dia',
    emoji: '💕',
    rarity: 'prata',
    category: 'duo',
    condition: (stats) => stats.bothStudiedSameDay,
    xpReward: 150
  },
  venceu_duelo: {
    id: 'venceu_duelo',
    name: 'Campeão do Duelo',
    description: 'Vença um duelo semanal',
    emoji: '🏆',
    rarity: 'ouro',
    category: 'duo',
    condition: (stats) => stats.duelsWon >= 1,
    xpReward: 300
  },
  
  // BADGES DE CONQUISTA FINAL
  prova_chegando: {
    id: 'prova_chegando',
    name: 'Pronto para a Prova',
    description: 'Estude pelo menos 100 horas antes da prova',
    emoji: '📋',
    rarity: 'platina',
    category: 'final',
    condition: (stats) => stats.totalMinutes >= 6000,
    xpReward: 1000
  },
  mestre_absoluto: {
    id: 'mestre_absoluto',
    name: 'Mestre Absoluto',
    description: 'Desbloqueie todos os outros badges',
    emoji: '👑',
    rarity: 'especial',
    category: 'final',
    condition: (stats) => stats.totalBadges >= 30,
    xpReward: 5000
  }
};

// ============================================
// DESAFIOS SEMANAIS
// ============================================
const WEEKLY_CHALLENGES = [
  {
    id: 'mais_horas',
    title: 'Quem Estuda Mais?',
    description: 'Vença quem estudar mais horas esta semana!',
    emoji: '⏱️',
    reward: { xp: 500, badge: 'Campeão Semanal' }
  },
  {
    id: 'mais_sessoes',
    title: 'Mestre da Consistência',
    description: 'Complete mais sessões de estudo esta semana',
    emoji: '📚',
    reward: { xp: 400, badge: 'Rei das Sessões' }
  },
  {
    id: 'melhor_acerto',
    title: 'Precisão Cirúrgica',
    description: 'Tenha a melhor média de acertos esta semana',
    emoji: '🎯',
    reward: { xp: 450, badge: 'Atirador de Elite' }
  },
  {
    id: 'streak_maior',
    title: 'Guerreiro do Streak',
    description: 'Mantenha o maior streak de dias seguidos',
    emoji: '🔥',
    reward: { xp: 600, badge: 'Imparável' }
  },
  {
    id: 'mais_questoes',
    title: 'Máquina de Questões',
    description: 'Resolva mais questões esta semana',
    emoji: '📝',
    reward: { xp: 500, badge: 'Resolvedor Profissional' }
  }
];

// ============================================
// DADOS DOS USUÁRIOS
// ============================================
const USERS = {
  mana: { 
    id: 'mana', 
    name: 'Mana', 
    emoji: '👨‍💼', 
    color: 'mana', 
    profile: 'OAB · Direito', 
    partner: 'kelinha', 
    exam: 'oab',
    themeColor: '#8b5cf6'
  },
  kelinha: { 
    id: 'kelinha', 
    name: 'Kelinha', 
    emoji: '👩‍🎓', 
    color: 'kelinha', 
    profile: 'ENEM · Ensino Médio', 
    partner: 'mana', 
    exam: 'enem',
    themeColor: '#ec4899'
  }
};

const DEFAULT_PASSWORD = 'estudo123';
