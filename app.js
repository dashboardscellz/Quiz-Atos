import { firebaseConfig } from "./firebase-config.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  update,
  remove,
  onValue,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";

// ============================================================
// ADMS EMBUTIDOS NO SITE
// ============================================================
// As senhas não ficam escritas em texto puro no código.
// O login é local, porque o site será hospedado no GitHub Pages.
// Isso é simples de usar, mas não equivale à segurança de autenticação
// de servidor/Firebase Authentication.

const ADMIN_USERS = {
  "manasses oliveira": {
    displayName: "Manassés Oliveira",
    passwordHash: "0b0d3e3af01966ae9c3a95b46aba84288ce5fc956abd5970f6337bdf0ed94413"
  },
  "amanda almeida": {
    displayName: "Amanda Almeida",
    passwordHash: "65480bd617d0c9e5a64b054f4d8281b23dc4293d4b248b1dd963f9613a4660d3"
  }
};

// Este Firebase agora será usado exclusivamente pelo sistema financeiro ATOS.
const TRANSACTIONS_PATH = "movimentacoes";

let db = null;
let transactions = [];
let currentAdmin = null;
let balanceChart = null;
let monthlyChart = null;

const $ = (id) => document.getElementById(id);

const els = {
  setupBanner: $("setupBanner"),
  currentBalance: $("currentBalance"),
  balanceTrend: $("balanceTrend"),
  lastUpdated: $("lastUpdated"),
  totalIncome: $("totalIncome"),
  totalExpense: $("totalExpense"),
  netResult: $("netResult"),
  projection30: $("projection30"),
  projectionDescription: $("projectionDescription"),
  dailyNetAverage: $("dailyNetAverage"),
  analysisWindow: $("analysisWindow"),
  trendLabel: $("trendLabel"),
  transactionsTableBody: $("transactionsTableBody"),
  transactionSearch: $("transactionSearch"),
  transactionFilter: $("transactionFilter"),
  exportCsvBtn: $("exportCsvBtn"),
  adminAccessBtn: $("adminAccessBtn"),
  adminPanel: $("adminPanel"),
  adminIdentity: $("adminIdentity"),
  logoutBtn: $("logoutBtn"),
  adminTransactionsList: $("adminTransactionsList"),
  transactionForm: $("transactionForm"),
  transactionFormTitle: $("transactionFormTitle"),
  editingId: $("editingId"),
  transactionType: $("transactionType"),
  transactionDate: $("transactionDate"),
  transactionAmount: $("transactionAmount"),
  transactionCategory: $("transactionCategory"),
  transactionReason: $("transactionReason"),
  cancelEditBtn: $("cancelEditBtn"),
  saveTransactionBtn: $("saveTransactionBtn"),
  loginDialog: $("loginDialog"),
  loginForm: $("loginForm"),
  closeLoginBtn: $("closeLoginBtn"),
  loginEmail: $("loginEmail"),
  loginPassword: $("loginPassword"),
  loginError: $("loginError"),
  toast: $("toast")
};

function money(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(Number(value || 0));
}

function plainNumber(value) {
  return Number(value || 0);
}

function dateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseLocalDate(value) {
  if (!value) return new Date();
  const [year, month, day] = String(value).split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0, 0);
}

function toJsDate(value) {
  if (value instanceof Date) return value;
  if (typeof value === "number") return new Date(value);
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return parseLocalDate(value);
  }
  return new Date(value || Date.now());
}

function formatDate(value) {
  return new Intl.DateTimeFormat("pt-BR").format(toJsDate(value));
}

function formatDateTime(date) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(date);
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
}

function endOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}

function addDays(date, amount) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + amount);
  return copy;
}

function diffCalendarDays(a, b) {
  return Math.round((startOfDay(a) - startOfDay(b)) / 86400000);
}

function normalizeLogin(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

async function sha256(value) {
  const encoded = new TextEncoder().encode(String(value || ""));
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function showToast(message, type = "success") {
  els.toast.textContent = message;
  els.toast.className = `toast ${type === "error" ? "error" : ""}`;
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    els.toast.classList.add("hidden");
  }, 3200);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function transactionNet(transaction) {
  return transaction.type === "entrada"
    ? plainNumber(transaction.amount)
    : -plainNumber(transaction.amount);
}

function todayInputValue() {
  return dateKey(new Date());
}

// ============================================================
// CÁLCULOS
// ============================================================

function calculateMetrics(items) {
  const sorted = [...items].sort((a, b) => toJsDate(a.date) - toJsDate(b.date));

  const totalIncome = sorted
    .filter((item) => item.type === "entrada")
    .reduce((sum, item) => sum + plainNumber(item.amount), 0);

  const totalExpense = sorted
    .filter((item) => item.type === "saida")
    .reduce((sum, item) => sum + plainNumber(item.amount), 0);

  const balance = totalIncome - totalExpense;

  if (!sorted.length) {
    return {
      totalIncome, totalExpense, balance,
      dailyNetAverage: 0,
      analysisDays: 0,
      projection30: balance,
      trend: "Estável",
      trendClass: "neutral"
    };
  }

  const today = endOfDay(new Date());
  const firstTransactionDate = startOfDay(toJsDate(sorted[0].date));
  const thirtyDaysAgo = startOfDay(addDays(new Date(), -29));
  const analysisStart =
    firstTransactionDate > thirtyDaysAgo ? firstTransactionDate : thirtyDaysAgo;

  const recentItems = sorted.filter(
    (item) => toJsDate(item.date) >= analysisStart && toJsDate(item.date) <= today
  );

  const rawDays = diffCalendarDays(new Date(), analysisStart) + 1;
  const analysisDays = Math.max(7, Math.min(30, rawDays));
  const recentNet = recentItems.reduce((sum, item) => sum + transactionNet(item), 0);

  const dailyNetAverage = recentNet / analysisDays;
  const projection30 = balance + dailyNetAverage * 30;

  let trend = "Estável";
  let trendClass = "neutral";

  if (dailyNetAverage > 0.01) {
    trend = "Positiva";
    trendClass = "positive";
  } else if (dailyNetAverage < -0.01) {
    trend = "Negativa";
    trendClass = "negative";
  }

  return {
    totalIncome, totalExpense, balance,
    dailyNetAverage, analysisDays, projection30,
    trend, trendClass
  };
}

function buildBalanceSeries(items, metrics) {
  const sorted = [...items].sort((a, b) => toJsDate(a.date) - toJsDate(b.date));

  if (!sorted.length) {
    return {
      actualLabels: [dateKey(new Date())],
      actualData: [0],
      projectionLabels: [dateKey(new Date()), dateKey(addDays(new Date(), 30))],
      projectionData: [0, 0]
    };
  }

  const firstDate = startOfDay(toJsDate(sorted[0].date));
  const today = startOfDay(new Date());
  const firstVisibleDate = firstDate < addDays(today, -89)
    ? addDays(today, -89)
    : firstDate;

  let runningBalance = sorted
    .filter((item) => startOfDay(toJsDate(item.date)) < firstVisibleDate)
    .reduce((sum, item) => sum + transactionNet(item), 0);

  const byDay = new Map();

  for (const item of sorted) {
    const key = dateKey(toJsDate(item.date));
    byDay.set(key, (byDay.get(key) || 0) + transactionNet(item));
  }

  const actualLabels = [];
  const actualData = [];

  for (let cursor = new Date(firstVisibleDate); cursor <= today; cursor = addDays(cursor, 1)) {
    runningBalance += byDay.get(dateKey(cursor)) || 0;
    actualLabels.push(dateKey(cursor));
    actualData.push(Number(runningBalance.toFixed(2)));
  }

  const projectionLabels = [dateKey(today)];
  const projectionData = [Number(metrics.balance.toFixed(2))];

  for (let day = 1; day <= 30; day += 1) {
    projectionLabels.push(dateKey(addDays(today, day)));
    projectionData.push(
      Number((metrics.balance + metrics.dailyNetAverage * day).toFixed(2))
    );
  }

  return {
    actualLabels, actualData, projectionLabels, projectionData
  };
}

function buildMonthlySeries(items) {
  const labels = [];
  const income = [];
  const expense = [];
  const now = new Date();

  for (let offset = 5; offset >= 0; offset -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

    const label = new Intl.DateTimeFormat("pt-BR", {
      month: "short",
      year: "2-digit"
    }).format(date);

    const monthItems = items.filter((item) => {
      const d = toJsDate(item.date);
      const itemKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      return itemKey === key;
    });

    labels.push(label);
    income.push(
      monthItems
        .filter((item) => item.type === "entrada")
        .reduce((sum, item) => sum + plainNumber(item.amount), 0)
    );
    expense.push(
      monthItems
        .filter((item) => item.type === "saida")
        .reduce((sum, item) => sum + plainNumber(item.amount), 0)
    );
  }

  return { labels, income, expense };
}

// ============================================================
// RENDERIZAÇÃO
// ============================================================

function renderDashboard() {
  const metrics = calculateMetrics(transactions);

  els.currentBalance.textContent = money(metrics.balance);
  els.totalIncome.textContent = money(metrics.totalIncome);
  els.totalExpense.textContent = money(metrics.totalExpense);
  els.netResult.textContent = money(metrics.balance);
  els.projection30.textContent = money(metrics.projection30);
  els.dailyNetAverage.textContent = money(metrics.dailyNetAverage);
  els.analysisWindow.textContent = `${metrics.analysisDays} ${metrics.analysisDays === 1 ? "dia" : "dias"}`;
  els.trendLabel.textContent = metrics.trend;
  els.balanceTrend.className = `balance-trend ${metrics.trendClass}`;

  if (!transactions.length) {
    els.balanceTrend.textContent = "Sem movimentações";
  } else if (metrics.trendClass === "positive") {
    els.balanceTrend.textContent = `Tendência positiva: ${money(metrics.dailyNetAverage)}/dia`;
  } else if (metrics.trendClass === "negative") {
    els.balanceTrend.textContent = `Tendência negativa: ${money(metrics.dailyNetAverage)}/dia`;
  } else {
    els.balanceTrend.textContent = "Tendência estável";
  }

  els.projectionDescription.textContent = transactions.length
    ? `Estimativa usando ${metrics.analysisDays} dias de análise`
    : "Aguardando histórico para calcular tendência";

  renderCharts(metrics);
  renderPublicTable();
  renderAdminList();
  els.lastUpdated.textContent = `Última atualização: ${formatDateTime(new Date())}`;
}

function renderCharts(metrics) {
  if (typeof Chart === "undefined") return;

  const balanceSeries = buildBalanceSeries(transactions, metrics);
  const monthly = buildMonthlySeries(transactions);

  if (balanceChart) balanceChart.destroy();
  if (monthlyChart) monthlyChart.destroy();

  const allLabels = [
    ...balanceSeries.actualLabels,
    ...balanceSeries.projectionLabels.slice(1)
  ];

  const actualData = [
    ...balanceSeries.actualData,
    ...Array(balanceSeries.projectionLabels.length - 1).fill(null)
  ];

  const projectionData = [
    ...Array(Math.max(0, balanceSeries.actualData.length - 1)).fill(null),
    ...balanceSeries.projectionData
  ];

  balanceChart = new Chart($("balanceChart"), {
    type: "line",
    data: {
      labels: allLabels,
      datasets: [
        {
          label: "Saldo real",
          data: actualData,
          borderColor: "#078b70",
          backgroundColor: "rgba(7, 139, 112, 0.08)",
          pointRadius: 0,
          pointHoverRadius: 4,
          borderWidth: 3,
          fill: true,
          tension: 0.28,
          spanGaps: false
        },
        {
          label: "Projeção",
          data: projectionData,
          borderColor: "#2f7ea0",
          backgroundColor: "transparent",
          pointRadius: 0,
          pointHoverRadius: 4,
          borderWidth: 2.5,
          borderDash: [7, 7],
          tension: 0.22,
          spanGaps: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: { usePointStyle: true, boxWidth: 8 }
        },
        tooltip: {
          callbacks: {
            title(items) {
              if (!items.length) return "";
              return new Intl.DateTimeFormat("pt-BR").format(parseLocalDate(items[0].label));
            },
            label(context) {
              if (context.raw === null) return "";
              return `${context.dataset.label}: ${money(context.raw)}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            maxTicksLimit: 9,
            callback(value) {
              const raw = this.getLabelForValue(value);
              return new Intl.DateTimeFormat("pt-BR", {
                day: "2-digit",
                month: "2-digit"
              }).format(parseLocalDate(raw));
            }
          }
        },
        y: {
          beginAtZero: false,
          ticks: {
            callback(value) {
              return new Intl.NumberFormat("pt-BR", {
                notation: "compact",
                style: "currency",
                currency: "BRL"
              }).format(value);
            }
          }
        }
      }
    }
  });

  monthlyChart = new Chart($("monthlyChart"), {
    type: "bar",
    data: {
      labels: monthly.labels,
      datasets: [
        {
          label: "Entradas",
          data: monthly.income,
          backgroundColor: "#078b70",
          borderRadius: 7
        },
        {
          label: "Saídas",
          data: monthly.expense,
          backgroundColor: "#9fb5b0",
          borderRadius: 7
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: { usePointStyle: true, boxWidth: 8 }
        },
        tooltip: {
          callbacks: {
            label(context) {
              return `${context.dataset.label}: ${money(context.raw)}`;
            }
          }
        }
      },
      scales: {
        x: { grid: { display: false } },
        y: {
          beginAtZero: true,
          ticks: {
            callback(value) {
              return new Intl.NumberFormat("pt-BR", {
                notation: "compact",
                style: "currency",
                currency: "BRL"
              }).format(value);
            }
          }
        }
      }
    }
  });
}

function filteredTransactions() {
  const search = els.transactionSearch.value.trim().toLowerCase();
  const filter = els.transactionFilter.value;

  return [...transactions]
    .filter((item) => (filter === "all" ? true : item.type === filter))
    .filter((item) => {
      if (!search) return true;
      return [item.reason, item.category, item.type]
        .some((field) => String(field || "").toLowerCase().includes(search));
    })
    .sort((a, b) => toJsDate(b.date) - toJsDate(a.date));
}

function renderPublicTable() {
  const rows = filteredTransactions();

  if (!rows.length) {
    els.transactionsTableBody.innerHTML = `
      <tr>
        <td colspan="5" class="empty-state">Nenhuma movimentação encontrada.</td>
      </tr>
    `;
    return;
  }

  els.transactionsTableBody.innerHTML = rows
    .map((item) => {
      const signal = item.type === "entrada" ? "+" : "−";
      return `
        <tr>
          <td>${escapeHtml(formatDate(item.date))}</td>
          <td>
            <span class="type-badge ${escapeHtml(item.type)}">
              ${item.type === "entrada" ? "Entrada" : "Saída"}
            </span>
          </td>
          <td>${escapeHtml(item.category)}</td>
          <td>${escapeHtml(item.reason)}</td>
          <td class="align-right money ${escapeHtml(item.type)}">
            ${signal} ${escapeHtml(money(item.amount))}
          </td>
        </tr>
      `;
    })
    .join("");
}

function renderAdminList() {
  if (!currentAdmin) {
    els.adminTransactionsList.innerHTML = "";
    return;
  }

  const rows = [...transactions].sort((a, b) => toJsDate(b.date) - toJsDate(a.date));

  if (!rows.length) {
    els.adminTransactionsList.innerHTML = `<p class="empty-state">Nenhum lançamento cadastrado.</p>`;
    return;
  }

  els.adminTransactionsList.innerHTML = rows
    .map((item) => `
      <div class="admin-transaction">
        <div class="admin-transaction-main">
          <strong>
            ${item.type === "entrada" ? "Entrada" : "Saída"} • ${escapeHtml(money(item.amount))}
          </strong>
          <span>
            ${escapeHtml(formatDate(item.date))} •
            ${escapeHtml(item.category)} •
            ${escapeHtml(item.reason)}
          </span>
        </div>
        <div class="admin-transaction-actions">
          <button class="btn btn-secondary" type="button" data-edit="${escapeHtml(item.id)}">Editar</button>
          <button class="btn btn-danger" type="button" data-delete="${escapeHtml(item.id)}">Excluir</button>
        </div>
      </div>
    `)
    .join("");

  els.adminTransactionsList.querySelectorAll("[data-edit]").forEach((button) => {
    button.addEventListener("click", () => beginEdit(button.dataset.edit));
  });

  els.adminTransactionsList.querySelectorAll("[data-delete]").forEach((button) => {
    button.addEventListener("click", () => removeTransaction(button.dataset.delete));
  });
}

// ============================================================
// REALTIME DATABASE
// ============================================================

function initializeFirebase() {
  const app = initializeApp(firebaseConfig);
  db = getDatabase(app);

  const txRef = ref(db, TRANSACTIONS_PATH);

  onValue(
    txRef,
    (snapshot) => {
      const raw = snapshot.val() || {};

      transactions = Object.entries(raw).map(([id, data]) => ({
        id,
        ...data
      }));

      renderDashboard();
    },
    (error) => {
      console.error(error);
      els.setupBanner.classList.remove("hidden");
      els.setupBanner.innerHTML = `
        <strong>Firebase conectado, mas sem acesso ao banco.</strong>
        Publique as regras do arquivo <code>database.rules.json</code>.
      `;
      showToast("O Firebase bloqueou o acesso. Precisamos ajustar as regras do Realtime Database.", "error");
    }
  );
}

// ============================================================
// LOGIN LOCAL
// ============================================================

els.adminAccessBtn.addEventListener("click", () => {
  if (currentAdmin) {
    els.adminPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  els.loginError.classList.add("hidden");
  els.loginDialog.showModal();
});

els.loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const loginKey = normalizeLogin(els.loginEmail.value);
  const admin = ADMIN_USERS[loginKey];

  if (!admin) {
    els.loginError.textContent = "Login não reconhecido.";
    els.loginError.classList.remove("hidden");
    return;
  }

  const typedHash = await sha256(els.loginPassword.value);

  if (typedHash !== admin.passwordHash) {
    els.loginError.textContent = "Senha incorreta.";
    els.loginError.classList.remove("hidden");
    return;
  }

  currentAdmin = {
    loginKey,
    displayName: admin.displayName
  };

  sessionStorage.setItem("atosAdmin", loginKey);
  els.loginPassword.value = "";
  els.loginDialog.close();
  updateAdminUi();
  showToast(`Bem-vindo, ${admin.displayName}.`);
});

function restoreAdminSession() {
  const loginKey = sessionStorage.getItem("atosAdmin");
  if (!loginKey || !ADMIN_USERS[loginKey]) return;

  currentAdmin = {
    loginKey,
    displayName: ADMIN_USERS[loginKey].displayName
  };

  updateAdminUi();
}

function updateAdminUi() {
  const isAdmin = Boolean(currentAdmin);

  els.adminPanel.classList.toggle("hidden", !isAdmin);
  els.adminAccessBtn.textContent = isAdmin ? "Painel ADM" : "Área ADM";

  if (isAdmin) {
    els.adminIdentity.textContent = currentAdmin.displayName;
    renderAdminList();
  } else {
    resetTransactionForm();
  }
}

els.closeLoginBtn.addEventListener("click", () => {
  els.loginDialog.close();
});

els.logoutBtn.addEventListener("click", () => {
  currentAdmin = null;
  sessionStorage.removeItem("atosAdmin");
  updateAdminUi();
  showToast("Sessão administrativa encerrada.");
});

// ============================================================
// CRUD
// ============================================================

els.transactionForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!currentAdmin || !db) {
    showToast("Acesso administrativo necessário.", "error");
    return;
  }

  const amount = Number(els.transactionAmount.value);

  if (!Number.isFinite(amount) || amount <= 0) {
    showToast("Informe um valor válido.", "error");
    return;
  }

  const payload = {
    type: els.transactionType.value,
    amount: Number(amount.toFixed(2)),
    category: els.transactionCategory.value.trim(),
    reason: els.transactionReason.value.trim(),
    date: els.transactionDate.value,
    updatedAt: serverTimestamp(),
    updatedBy: currentAdmin.displayName
  };

  try {
    els.saveTransactionBtn.disabled = true;

    if (els.editingId.value) {
      const existing = transactions.find((item) => item.id === els.editingId.value);

      await update(
        ref(db, `${TRANSACTIONS_PATH}/${els.editingId.value}`),
        {
          ...payload,
          createdAt: existing?.createdAt ?? Date.now(),
          createdBy: existing?.createdBy ?? currentAdmin.displayName
        }
      );

      showToast("Lançamento atualizado.");
    } else {
      const newRef = push(ref(db, TRANSACTIONS_PATH));

      await set(newRef, {
        ...payload,
        createdAt: serverTimestamp(),
        createdBy: currentAdmin.displayName
      });

      showToast("Lançamento publicado.");
    }

    resetTransactionForm();
  } catch (error) {
    console.error(error);
    showToast("O Firebase bloqueou a gravação. Precisamos ajustar as regras apenas do financeiro.", "error");
  } finally {
    els.saveTransactionBtn.disabled = false;
  }
});

function beginEdit(id) {
  const item = transactions.find((transaction) => transaction.id === id);
  if (!item) return;

  els.editingId.value = item.id;
  els.transactionType.value = item.type;
  els.transactionDate.value = item.date || todayInputValue();
  els.transactionAmount.value = plainNumber(item.amount).toFixed(2);
  els.transactionCategory.value = item.category || "";
  els.transactionReason.value = item.reason || "";
  els.transactionFormTitle.textContent = "Editar lançamento";
  els.saveTransactionBtn.textContent = "Salvar alterações";
  els.cancelEditBtn.classList.remove("hidden");

  els.transactionForm.scrollIntoView({ behavior: "smooth", block: "center" });
}

function resetTransactionForm() {
  els.transactionForm.reset();
  els.editingId.value = "";
  els.transactionDate.value = todayInputValue();
  els.transactionType.value = "entrada";
  els.transactionFormTitle.textContent = "Novo lançamento";
  els.saveTransactionBtn.textContent = "Salvar lançamento";
  els.cancelEditBtn.classList.add("hidden");
}

els.cancelEditBtn.addEventListener("click", resetTransactionForm);

async function removeTransaction(id) {
  if (!currentAdmin || !db) return;

  const item = transactions.find((transaction) => transaction.id === id);
  if (!item) return;

  const confirmed = window.confirm(
    `Excluir ${item.type === "entrada" ? "a entrada" : "a saída"} de ${money(item.amount)}?\n\nEssa ação não pode ser desfeita.`
  );

  if (!confirmed) return;

  try {
    await remove(ref(db, `${TRANSACTIONS_PATH}/${id}`));
    showToast("Lançamento excluído.");
    if (els.editingId.value === id) resetTransactionForm();
  } catch (error) {
    console.error(error);
    showToast("O Firebase bloqueou a exclusão. Precisamos ajustar as regras do financeiro.", "error");
  }
}

// ============================================================
// FILTROS E CSV
// ============================================================

els.transactionSearch.addEventListener("input", renderPublicTable);
els.transactionFilter.addEventListener("change", renderPublicTable);

els.exportCsvBtn.addEventListener("click", () => {
  const rows = filteredTransactions();

  if (!rows.length) {
    showToast("Não há dados para exportar.", "error");
    return;
  }

  const header = ["Data", "Tipo", "Categoria", "Motivo", "Valor"];

  const csvRows = rows.map((item) => [
    formatDate(item.date),
    item.type === "entrada" ? "Entrada" : "Saída",
    item.category,
    item.reason,
    plainNumber(item.amount).toFixed(2).replace(".", ",")
  ]);

  const escapeCsv = (value) =>
    `"${String(value ?? "").replaceAll('"', '""')}"`;

  const csv = [
    header.map(escapeCsv).join(";"),
    ...csvRows.map((row) => row.map(escapeCsv).join(";"))
  ].join("\n");

  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `atos-prestacao-contas-${dateKey(new Date())}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
});

// ============================================================
// START
// ============================================================

resetTransactionForm();
restoreAdminSession();
initializeFirebase();
