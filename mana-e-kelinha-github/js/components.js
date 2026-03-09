/* ============================================
   MANA E KELINHA - COMPONENTES REACT
   ============================================ */

const { useState, useEffect, useMemo, useRef, useCallback } = React;

// ============================================
// COMPONENTE: TOAST NOTIFICATIONS
// ============================================
const Toast = ({ message, type = 'info', xp = 0, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);
  
  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️',
    xp: '✨',
    badge: '🏆',
    online: '🟢'
  };
  
  return React.createElement('div', { className: `toast ${type}` },
    React.createElement('span', { className: 'toast-icon' }, icons[type] || 'ℹ️'),
    React.createElement('span', { className: 'toast-message' }, message),
    xp > 0 && React.createElement('span', { className: 'toast-xp' }, `+${xp} XP`)
  );
};

// ============================================
// COMPONENTE: GLASS CARD
// ============================================
const GlassCard = ({ children, className = '', style = {}, onClick }) => {
  return React.createElement('div', { 
    className: `card ${className}`, 
    style,
    onClick 
  }, children);
};

// ============================================
// COMPONENTE: PROGRESS RING
// ============================================
const ProgressRing = ({ value, max = 100, size = 120, color = 'violet', children }) => {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = (size - 10) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  
  const colorMap = { 
    violet: '#8b5cf6', 
    pink: '#ec4899', 
    green: '#22c55e', 
    yellow: '#eab308', 
    red: '#ef4444',
    blue: '#3b82f6',
    cyan: '#06b6d4'
  };
  
  return React.createElement('div', { 
    className: 'progress-ring', 
    style: { width: size, height: size } 
  },
    React.createElement('svg', { width: size, height: size },
      React.createElement('circle', { cx: size/2, cy: size/2, r: radius, className: 'bg' }),
      React.createElement('circle', { 
        cx: size/2, cy: size/2, r: radius, 
        className: 'progress', 
        stroke: colorMap[color],
        strokeDasharray: circumference,
        strokeDashoffset: offset,
        style: { filter: `drop-shadow(0 0 10px ${colorMap[color]}60)` }
      })
    ),
    React.createElement('div', { 
      className: 'value', 
      style: { color: colorMap[color] } 
    }, children || `${Math.round(percentage)}%`)
  );
};

// ============================================
// COMPONENTE: MODAL
// ============================================
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return React.createElement('div', { 
    className: 'modal-overlay',
    onClick: (e) => e.target === e.currentTarget && onClose()
  },
    React.createElement('div', { className: 'modal-content card' },
      title && React.createElement('div', { className: 'modal-header' },
        React.createElement('h3', null, title),
        React.createElement('button', { 
          className: 'icon-btn',
          onClick: onClose,
          style: { width: '36px', height: '36px' }
        }, Icons.x({ width: 18, height: 18 }))
      ),
      React.createElement('div', { className: 'modal-body' }, children)
    )
  );
};

// ============================================
// COMPONENTE: LOGIN SCREEN
// ============================================
const LoginScreen = ({ onLogin, addToast }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = async () => {
    if (!selectedUser || !password) {
      setError('Selecione um usuário e digite a senha');
      return;
    }
    setIsLoading(true);
    setError('');
    
    await new Promise(r => setTimeout(r, 600));
    
    if (password === DEFAULT_PASSWORD) {
      onLogin(selectedUser);
      addToast(`Bem-vindo, ${USERS[selectedUser].name}! 💕`, 'success');
    } else {
      setError('Senha incorreta');
      addToast('Senha incorreta. Tente novamente.', 'error');
      setIsLoading(false);
    }
  };
  
  return React.createElement('div', { className: 'login-container' },
    React.createElement('div', { className: 'login-box' },
      React.createElement('div', { className: 'text-center mb-6' },
        React.createElement('div', { className: 'logo-box' }, '💕'),
        React.createElement('h1', { className: 'text-3xl font-bold text-gradient mb-2' }, 'Mana e Kelinha'),
        React.createElement('p', { className: 'text-white-60' }, 'Seu diário de estudos gamificado')
      ),
      
      React.createElement(GlassCard, { className: 'mb-4' },
        React.createElement('div', { className: 'p-5' },
          React.createElement('h2', { className: 'text-lg font-semibold mb-4' }, 'Quem está estudando?'),
          React.createElement('div', { className: 'user-grid' },
            Object.values(USERS).map(user => 
              React.createElement('button', {
                key: user.id,
                className: `user-btn ${selectedUser === user.id ? 'selected ' + user.color : ''}`,
                onClick: () => { setSelectedUser(user.id); setError(''); }
              },
                React.createElement('span', { className: 'emoji' }, user.emoji),
                React.createElement('span', { className: 'name' }, user.name),
                React.createElement('span', { className: 'profile' }, user.profile)
              )
            )
          )
        )
      ),
      
      selectedUser && React.createElement(GlassCard, null,
        React.createElement('div', { className: 'p-5' },
          React.createElement('label', { className: 'form-label' }, 'Senha'),
          React.createElement('div', { style: { position: 'relative' } },
            React.createElement('input', {
              type: showPassword ? 'text' : 'password',
              value: password,
              onChange: (e) => { setPassword(e.target.value); setError(''); },
              onKeyDown: (e) => e.key === 'Enter' && handleLogin(),
              placeholder: 'Digite sua senha...',
              className: 'input',
              style: { paddingRight: '50px' }
            }),
            React.createElement('button', {
              onClick: () => setShowPassword(!showPassword),
              style: { 
                position: 'absolute', 
                right: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                background: 'none', 
                border: 'none', 
                color: 'rgba(255,255,255,0.4)', 
                cursor: 'pointer' 
              }
            }, showPassword ? Icons['eye-off']({ width: 18, height: 18 }) : Icons.eye({ width: 18, height: 18 }))
          ),
          error && React.createElement('p', { className: 'text-red text-sm mt-3' }, '⚠️ ' + error),
          React.createElement('button', {
            className: `btn mt-4 ${USERS[selectedUser]?.color === 'kelinha' ? 'btn-gleici' : 'btn-primary'}`,
            onClick: handleLogin,
            disabled: isLoading
          }, isLoading ? 'Entrando...' : React.createElement(React.Fragment, null, Icons['book-open']({ width: 16, height: 16 }), ' Entrar'))
        )
      ),
      
      React.createElement('p', { className: 'text-center text-white-40 text-sm mt-6' },
        'Senha padrão: ', 
        React.createElement('code', { 
          style: { 
            background: 'rgba(255,255,255,0.1)', 
            padding: '4px 8px', 
            borderRadius: '6px' 
          } 
        }, 'estudo123')
      )
    )
  );
};

// ============================================
// COMPONENTE: SESSÃO ITEM (LISTA)
// ============================================
const SessionItem = ({ session, userColor, onEdit, onDelete }) => {
  const difficultyIcons = {
    facil: '✅',
    medio: '⚡',
    dificil: '🔥'
  };
  
  const totalMinutes = (session.h || 0) * 60 + (session.m || 0);
  
  return React.createElement('div', { className: 'session-item' },
    React.createElement('div', { className: `icon ${session.diff}` },
      difficultyIcons[session.diff]
    ),
    React.createElement('div', { className: 'content' },
      React.createElement('div', { className: 'subject' }, session.subject),
      React.createElement('div', { className: 'meta' },
        React.createElement('span', null, '📅 ', formatDate(session.date)),
        React.createElement('span', null, '⏱️ ', formatDuration(totalMinutes)),
        session.qT > 0 && React.createElement('span', null, 
          '📝 ', session.qC, '/', session.qT, ' acertos'
        )
      )
    ),
    React.createElement('div', { className: 'actions' },
      React.createElement('button', {
        className: 'action-btn',
        onClick: () => onEdit(session),
        title: 'Editar sessão'
      }, Icons.edit({ width: 16, height: 16 })),
      React.createElement('button', {
        className: 'action-btn delete',
        onClick: () => onDelete(session),
        title: 'Excluir sessão'
      }, Icons['trash-2']({ width: 16, height: 16 }))
    )
  );
};

// ============================================
// COMPONENTE: ADD/EDIT SESSION SCREEN
// ============================================
const SessionForm = ({ 
  userId, 
  existingSessions, 
  editingSession = null,
  onSave, 
  onCancel,
  addToast 
}) => {
  const user = USERS[userId];
  const isEditing = !!editingSession;
  
  const [subject, setSubject] = useState(editingSession?.subject || '');
  const [body, setBody] = useState(editingSession?.body || '');
  const [hours, setHours] = useState(editingSession?.h || 0);
  const [minutes, setMinutes] = useState(editingSession?.m || 0);
  const [difficulty, setDifficulty] = useState(editingSession?.diff || 'facil');
  const [questionsTotal, setQuestionsTotal] = useState(editingSession?.qT || 0);
  const [questionsCorrect, setQuestionsCorrect] = useState(editingSession?.qC || 0);
  const [observations, setObservations] = useState(editingSession?.obs || '');
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const timerRef = useRef(null);
  
  const uniqueSubjects = [...new Set(existingSessions.map(s => s.subject))];
  
  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => setTimerSeconds(prev => prev + 1), 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerRunning]);
  
  useEffect(() => {
    if (timerSeconds > 0) {
      setHours(Math.floor(timerSeconds / 3600));
      setMinutes(Math.floor((timerSeconds % 3600) / 60));
    }
  }, [timerSeconds]);
  
  const handleSave = async () => {
    if (!subject.trim()) {
      addToast('Informe a matéria estudada', 'error');
      return;
    }
    if (questionsCorrect > questionsTotal) {
      addToast('Acertos não podem ser maiores que o total', 'error');
      return;
    }
    
    setIsSaving(true);
    
    const session = {
      id: editingSession?.id || generateId(),
      subject: subject.trim(),
      body: body.trim(),
      h: hours,
      m: minutes,
      obs: observations.trim(),
      diff: difficulty,
      date: editingSession?.date || new Date().toISOString().slice(0, 10),
      dayLabel: editingSession?.dayLabel || new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
      qDone: questionsTotal > 0,
      qC: questionsCorrect,
      qT: questionsTotal
    };
    
    await new Promise(r => setTimeout(r, 400));
    onSave(session);
    
    if (questionsTotal > 0 && questionsCorrect === questionsTotal) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    
    addToast(
      isEditing ? 'Sessão atualizada com sucesso! ✏️' : 'Sessão salva com sucesso! 🎉',
      'success'
    );
    
    setIsSaving(false);
  };
  
  const accuracy = questionsTotal > 0 
    ? Math.round((questionsCorrect / questionsTotal) * 100) 
    : 0;
  
  return React.createElement('div', null,
    React.createElement('div', { className: 'mb-6' },
      React.createElement('h2', { className: 'text-2xl font-bold mb-1' }, 
        isEditing ? 'Editar Sessão' : 'Nova Sessão'
      ),
      React.createElement('p', { className: 'text-white-60' }, 
        isEditing ? 'Atualize os dados da sessão' : 'Registre o que você estudou'
      )
    ),
    
    !isEditing && React.createElement(GlassCard, { className: 'mb-4' },
      React.createElement('div', { className: 'p-5' },
        React.createElement('div', { className: 'flex items-center justify-between mb-4' },
          React.createElement('h3', { className: 'text-lg font-semibold flex items-center gap-2' }, 
            Icons.clock({ width: 20, height: 20, style: { color: '#8b5cf6' } }), 
            'Cronômetro'
          ),
          React.createElement('span', { 
            className: `timer-status ${timerRunning ? 'running' : 'paused'}` 
          }, timerRunning ? '● Rodando' : '○ Pausado')
        ),
        React.createElement('div', { 
          className: `timer-display mb-4 ${!timerRunning ? 'paused' : ''}` 
        }, formatTime(timerSeconds)),
        React.createElement('div', { className: 'flex gap-3' },
          React.createElement('button', { 
            className: `btn flex-1 ${timerRunning ? 'btn-outline' : user.color === 'kelinha' ? 'btn-gleici' : 'btn-primary'}`, 
            onClick: () => setTimerRunning(!timerRunning) 
          }, timerRunning 
            ? React.createElement(React.Fragment, null, Icons.pause({ width: 16, height: 16 }), ' Pausar') 
            : React.createElement(React.Fragment, null, Icons.play({ width: 16, height: 16 }), timerSeconds > 0 ? ' Continuar' : ' Iniciar')
          ),
          React.createElement('button', { 
            className: 'btn btn-outline', 
            style: { width: 'auto', padding: '14px' }, 
            onClick: () => { 
              setTimerRunning(false); 
              setTimerSeconds(0); 
              setHours(0); 
              setMinutes(0); 
            } 
          }, Icons['rotate-ccw']({ width: 16, height: 16 }))
        )
      )
    ),
    
    React.createElement(GlassCard, null,
      React.createElement('div', { className: 'p-5 space-y-5' },
        React.createElement('div', null,
          React.createElement('label', { className: 'form-label' }, 'Matéria *'),
          React.createElement('input', { 
            type: 'text', 
            value: subject, 
            onChange: (e) => setSubject(e.target.value), 
            placeholder: 'Ex: Direito Constitucional, Biologia...', 
            list: 'subjects-list', 
            className: 'input' 
          }),
          React.createElement('datalist', { id: 'subjects-list' }, 
            uniqueSubjects.map(s => React.createElement('option', { key: s, value: s }))
          )
        ),
        
        React.createElement('div', null,
          React.createElement('label', { className: 'form-label' }, 
            'Conteúdo estudado ', 
            React.createElement('span', { className: 'optional' }, '(opcional)')
          ),
          React.createElement('textarea', { 
            value: body, 
            onChange: (e) => setBody(e.target.value), 
            placeholder: 'Descreva o que você estudou...', 
            className: 'input' 
          }),
          React.createElement('p', { className: 'text-right text-xs text-white-40 mt-1' }, 
            `${body.length} caracteres`
          )
        ),
        
        React.createElement('div', { className: 'grid grid-cols-2 gap-4' },
          React.createElement('div', null, 
            React.createElement('label', { className: 'form-label' }, 'Horas'), 
            React.createElement('input', { 
              type: 'number', 
              min: 0, 
              max: 12, 
              value: hours, 
              onChange: (e) => setHours(parseInt(e.target.value) || 0), 
              className: 'input' 
            })
          ),
          React.createElement('div', null, 
            React.createElement('label', { className: 'form-label' }, 'Minutos'), 
            React.createElement('input', { 
              type: 'number', 
              min: 0, 
              max: 59, 
              step: 5, 
              value: minutes, 
              onChange: (e) => setMinutes(parseInt(e.target.value) || 0), 
              className: 'input' 
            })
          )
        ),
        
        React.createElement('div', null,
          React.createElement('label', { className: 'form-label' }, 'Dificuldade'),
          React.createElement('div', { className: 'diff-grid' },
            ['facil', 'medio', 'dificil'].map(d => 
              React.createElement('button', { 
                key: d, 
                type: 'button', 
                onClick: () => setDifficulty(d), 
                className: `diff-btn ${difficulty === d ? 'active ' + d : ''}` 
              },
                Icons[d === 'facil' ? 'check-circle' : d === 'medio' ? 'alert-circle' : 'brain']({ width: 18, height: 18 }),
                d === 'facil' ? 'Fácil' : d === 'medio' ? 'Médio' : 'Difícil'
              )
            )
          )
        ),
        
        React.createElement('div', { 
          className: 'p-4 rounded-xl', 
          style: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' } 
        },
          React.createElement('h4', { className: 'text-sm text-white-60 mb-3 flex items-center gap-2' }, 
            Icons['trending-up']({ width: 16, height: 16 }), 
            'Questões resolvidas'
          ),
          React.createElement('div', { className: 'grid grid-cols-2 gap-4' },
            React.createElement('div', null, 
              React.createElement('label', { className: 'block text-xs text-white-50 mb-1' }, 'Total'), 
              React.createElement('input', { 
                type: 'number', 
                min: 0, 
                max: 999, 
                value: questionsTotal, 
                onChange: (e) => { 
                  const val = parseInt(e.target.value) || 0; 
                  setQuestionsTotal(val); 
                  if (questionsCorrect > val) setQuestionsCorrect(val); 
                }, 
                className: 'input', 
                style: { padding: '10px 12px' } 
              })
            ),
            React.createElement('div', null, 
              React.createElement('label', { className: 'block text-xs text-white-50 mb-1' }, 'Acertos'), 
              React.createElement('input', { 
                type: 'number', 
                min: 0, 
                max: questionsTotal, 
                value: questionsCorrect, 
                onChange: (e) => setQuestionsCorrect(Math.min(parseInt(e.target.value) || 0, questionsTotal)), 
                className: 'input', 
                style: { padding: '10px 12px' } 
              })
            )
          ),
          questionsTotal > 0 && React.createElement('div', { className: 'mt-3' },
            React.createElement('div', { className: 'progress-bar' }, 
              React.createElement('div', { 
                className: 'progress-bar-fill', 
                style: { 
                  width: `${accuracy}%`, 
                  background: accuracy >= 70 ? '#22c55e' : accuracy >= 40 ? '#eab308' : '#ef4444' 
                } 
              })
            ),
            React.createElement('p', { 
              className: `text-right text-xs mt-2 ${accuracy >= 70 ? 'text-green' : accuracy >= 40 ? 'text-yellow' : 'text-red'}` 
            }, `${questionsCorrect}/${questionsTotal} acertos — ${accuracy}%`)
          )
        ),
        
        React.createElement('div', null,
          React.createElement('label', { className: 'form-label' }, 
            'Observações ', 
            React.createElement('span', { className: 'optional' }, '(opcional)')
          ),
          React.createElement('input', { 
            type: 'text', 
            value: observations, 
            onChange: (e) => setObservations(e.target.value), 
            placeholder: 'Ex: Fiquei em dúvida sobre...', 
            className: 'input' 
          })
        ),
        
        React.createElement('div', { className: 'flex gap-3' },
          React.createElement('button', { 
            className: `btn flex-1 ${user.color === 'kelinha' ? 'btn-gleici' : 'btn-primary'}`, 
            onClick: handleSave, 
            disabled: !subject.trim() || isSaving 
          }, isSaving ? 'Salvando...' : isEditing ? 'Atualizar sessão' : 'Salvar sessão'),
          
          isEditing && React.createElement('button', {
            className: 'btn btn-outline',
            onClick: onCancel,
            style: { flex: '0 0 auto', padding: '14px 24px' }
          }, 'Cancelar')
        )
      )
    ),
    
    showConfetti && React.createElement('div', { 
      style: { position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 } 
    },
      Array.from({ length: 50 }).map((_, i) => 
        React.createElement('div', {
          key: i,
          className: 'confetti',
          style: {
            backgroundColor: ['#8b5cf6', '#ec4899', '#22c55e', '#eab308'][i % 4],
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.5}s`
          }
        })
      )
    )
  );
};
