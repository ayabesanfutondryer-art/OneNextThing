// --- Constants & Utilities ---
const STORAGE_KEY = 'single_focus_project';

const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const formatDuration = (seconds) => {
    if (seconds === undefined) return '0秒';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const parts = [];
    if (hrs > 0) parts.push(`${hrs}時間`);
    if (mins > 0) parts.push(`${mins}分`);
    if (secs > 0 || parts.length === 0) parts.push(`${secs}秒`);
    return parts.join('');
};

const formatTimeDisplay = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return [hrs, mins, secs].map(v => v < 10 ? "0" + v : v).join(":");
};

// --- Icons (SVG Strings) ---
const Icons = {
    Check: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`,
    CheckSmall: `<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>`,
    Play: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    PlayBig: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    Plus: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>`,
    Trash: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>`,
    TrashSmall: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/></svg>`,
    Back: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>`,
    BackSimple: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>`,
    Pause: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>`,
    ResumeSmall: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" /></svg>`,
    CheckComplete: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>`,
    ListCheck: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" /></svg>`,
    TotalTime: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    Return: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>`
};

// --- Application Logic ---
class App {
    constructor() {
        this.project = null;
        this.mode = 'HOME'; // HOME, ONBOARDING, SETUP, FOCUS, CELEBRATION, REVIEW
        this.root = document.getElementById('root');
        this.timerInterval = null;

        // Focus View State
        this.focusState = {
            isActive: false,
            seconds: 0,
            isAnimating: false
        };

        this.loadProject();
        this.render();
    }

    loadProject() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                this.project = JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse saved project", e);
            }
        }
    }

    saveProject() {
        if (this.project) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.project));
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    setMode(newMode) {
        this.mode = newMode;
        this.render();
    }

    // --- Handlers ---

    handleCreateProject(title) {
        this.project = {
            id: generateId(),
            title: title,
            steps: [],
            createdAt: Date.now(),
        };
        this.saveProject();
        this.setMode('SETUP');
    }

    handleResumeProject() {
        if (!this.project) return;
        const allActions = this.project.steps.flatMap(s => s.actions);
        if (allActions.length > 0 && allActions.every(a => a.isCompleted)) {
            this.setMode('CELEBRATION');
        } else if (allActions.length > 0) {
            this.setMode('FOCUS');
        } else {
            this.setMode('SETUP');
        }
    }

    handleReset() {
        this.project = null;
        this.saveProject();
        this.setMode('ONBOARDING');
    }

    // --- Renders ---

    render() {
        this.root.innerHTML = '';

        // Main Container
        const container = document.createElement('div');
        container.className = 'w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden min-h-[550px] flex flex-col transition-all duration-500';

        let content;
        switch (this.mode) {
            case 'HOME': content = this.renderHome(); break;
            case 'ONBOARDING': content = this.renderOnboarding(); break;
            case 'SETUP': content = this.renderSetup(); break;
            case 'FOCUS': content = this.renderFocus(); break;
            case 'CELEBRATION': content = this.renderCelebration(); break;
            case 'REVIEW': content = this.renderReview(); break;
            default: content = document.createElement('div');
        }

        container.appendChild(content);
        this.root.appendChild(container);

        // Back to Home Button (conditionally)
        if (this.mode !== 'HOME' && this.mode !== 'ONBOARDING') {
            const backBtn = document.createElement('button');
            backBtn.className = 'mt-8 text-slate-400 hover:text-indigo-600 text-sm transition-colors font-medium flex items-center gap-2';
            backBtn.innerHTML = `${Icons.Back} ホームに戻る`;
            backBtn.onclick = () => this.setMode('HOME');
            this.root.appendChild(backBtn);
        }
    }

    renderHome() {
        const div = document.createElement('div');
        div.className = 'flex-1 flex flex-col items-center justify-center p-8 space-y-12 fade-in';

        div.innerHTML = `
                    <div class="text-center space-y-3">
                        <h1 class="text-4xl md:text-5xl font-black tracking-tighter text-slate-900">たったひとつの<br/>次にやること</h1>
                        <p class="text-slate-500 font-medium"></p>
                    </div>
                    <div class="w-full max-w-sm flex flex-col gap-4" id="home-buttons"></div>
                    <div class="absolute bottom-8 text-center">
                        <div class="flex justify-center gap-4 opacity-20 grayscale">
                            <div class="w-10 h-10 bg-slate-200 rounded-full animate-pulse"></div>
                            <div class="w-10 h-10 bg-slate-200 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
                            <div class="w-10 h-10 bg-slate-200 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
                        </div>
                    </div>
                `;

        const btnContainer = div.querySelector('#home-buttons');

        if (this.project) {
            const resumeBtn = document.createElement('button');
            resumeBtn.className = 'w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl transition-all shadow-lg active:scale-95 text-xl flex items-center justify-center gap-3';
            resumeBtn.innerHTML = `${Icons.Play} プロジェクトを再開`;
            resumeBtn.onclick = () => this.handleResumeProject();

            const newBtn = document.createElement('button');
            newBtn.className = 'w-full bg-white border-2 border-slate-200 text-slate-600 font-bold py-4 rounded-2xl hover:bg-slate-50 transition-all active:scale-95';
            newBtn.textContent = '新しくプロジェクトを作る';
            newBtn.onclick = () => this.setMode('ONBOARDING');

            const note = document.createElement('p');
            note.className = 'text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest';
            note.textContent = '※ 新しく作ると現在のプロジェクトはリセットされます';

            btnContainer.appendChild(resumeBtn);
            btnContainer.appendChild(newBtn);
            btnContainer.appendChild(note);
        } else {
            const createBtn = document.createElement('button');
            createBtn.className = 'w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-6 rounded-2xl transition-all shadow-lg active:scale-95 text-xl flex items-center justify-center gap-3';
            createBtn.innerHTML = `${Icons.Plus} プロジェクトを作成`;
            createBtn.onclick = () => this.setMode('ONBOARDING');
            btnContainer.appendChild(createBtn);
        }

        return div;
    }

    renderOnboarding() {
        const div = document.createElement('div');
        div.className = 'flex-1 flex flex-col items-center justify-center p-8 space-y-8 fade-in';

        div.innerHTML = `
                    <div class="text-center space-y-2">
                        <h1 class="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">たったひとつの<br/>次にやること</h1>
                    </div>
                    <form id="onboarding-form" class="w-full max-w-md space-y-4">
                        <div class="space-y-2">
                            <label class="text-sm font-bold text-slate-700 block">
                                あなたが今一番取り組みたいことは何ですか？
                            </label>
                            <input
                                type="text"
                                id="project-title-input"
                                placeholder="例: 旅行の計画をする、部屋の模様替え..."
                                class="w-full px-4 py-4 rounded-xl border-2 border-slate-800 bg-slate-800 text-white font-bold text-xl outline-none ring-offset-2 focus:ring-4 focus:ring-indigo-500 transition-all placeholder:text-slate-400 shadow-inner"
                                autofocus
                            />
                        </div>
                        <button
                            type="submit"
                            id="start-btn"
                            disabled
                            class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-black py-4 rounded-xl transition-all shadow-lg active:scale-95 text-lg mt-4"
                        >
                            プロジェクトを作成する
                        </button>
                    </form>
                `;

        const form = div.querySelector('#onboarding-form');
        const input = div.querySelector('#project-title-input');
        const btn = div.querySelector('#start-btn');

        // Auto-focus logic
        setTimeout(() => input.focus(), 50);

        input.oninput = (e) => {
            btn.disabled = !e.target.value.trim();
        };

        form.onsubmit = (e) => {
            e.preventDefault();
            if (input.value.trim()) {
                this.handleCreateProject(input.value.trim());
            }
        };

        return div;
    }

    moveAction(sourceStepId, sourceActionId, targetStepId, targetActionId) {
        const sourceStep = this.project.steps.find(s => s.id === sourceStepId);
        const targetStep = this.project.steps.find(s => s.id === targetStepId);
        if (!sourceStep || !targetStep) return;

        const sourceActionIndex = sourceStep.actions.findIndex(a => a.id === sourceActionId);
        if (sourceActionIndex === -1) return;

        const [movedAction] = sourceStep.actions.splice(sourceActionIndex, 1);

        if (targetActionId) {
            const targetActionIndex = targetStep.actions.findIndex(a => a.id === targetActionId);
            if (targetActionIndex !== -1) {
                targetStep.actions.splice(targetActionIndex, 0, movedAction);
            } else {
                targetStep.actions.push(movedAction);
            }
        } else {
            targetStep.actions.push(movedAction);
        }

        this.saveProject();
        this.render();
    }

    renderSetup() {
        // Initialize default steps if empty
        if (!this.project.steps || this.project.steps.length === 0) {
            this.project.steps = [
                { id: generateId(), title: '', actions: [{ id: generateId(), text: '', isCompleted: false }] }
            ];
        }

        const div = document.createElement('div');
        div.className = 'flex-1 flex flex-col p-8 fade-in h-full overflow-hidden bg-slate-50/50';

        const header = `
                    <header class="mb-6 flex justify-between items-start">
                        <div class="flex-1">
                            <h2 class="text-xs uppercase tracking-widest text-slate-400 font-black mb-1">プロジェクト</h2>
                            <h1 class="text-2xl font-black text-slate-900 leading-tight tracking-tight">${this.project.title}</h1>
                        </div>
                    </header>
                `;

        const stepsContainer = document.createElement('div');
        stepsContainer.className = 'flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar';
        stepsContainer.id = 'steps-container';

        const renderSteps = () => {
            stepsContainer.innerHTML = '';

            this.project.steps.forEach((step, sIdx) => {
                const allActionsCompleted = step.actions.every(a => a.isCompleted);
                const stepEl = document.createElement('div');
                stepEl.className = `group bg-white p-6 rounded-3xl space-y-4 border-2 transition-all ${allActionsCompleted ? 'border-emerald-100 bg-emerald-50/20' : 'border-white shadow-sm'}`;

                // Step Header
                stepEl.innerHTML = `
                            <div class="flex items-center space-x-3">
                                <span class="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black transition-colors ${allActionsCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white'}">
                                    ${allActionsCompleted ? '✓' : sIdx + 1}
                                </span>
                                <input
                                    type="text"
                                    placeholder="ステップ名を入力(例:宿予約…)"
                                    value="${step.title}"
                                    class="step-title-input flex-1 bg-transparent outline-none font-black text-lg py-1 transition-all ${allActionsCompleted ? 'text-emerald-700/60 line-through' : 'text-slate-800 focus:text-indigo-600'}"
                                />
                                <button class="delete-step-btn opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-red-500 transition-all">
                                    ${Icons.Trash}
                                </button>
                            </div>
                            <div class="pl-9 space-y-3 actions-container"></div>
                        `;

                // Bind Step Events
                const titleInput = stepEl.querySelector('.step-title-input');
                titleInput.oninput = (e) => { step.title = e.target.value; this.saveProject(); updateFooter(); };

                const deleteBtn = stepEl.querySelector('.delete-step-btn');
                deleteBtn.onclick = () => {
                    if (this.project.steps.length > 1) {
                        this.project.steps = this.project.steps.filter(s => s.id !== step.id);
                        this.saveProject();
                        renderSteps();
                        updateFooter();
                    }
                };

                // Actions
                const actionsContainer = stepEl.querySelector('.actions-container');
                step.actions.forEach((action, aIdx) => {
                    const actionEl = document.createElement('div');
                    actionEl.className = `flex items-center gap-3 p-3 rounded-2xl border transition-all bg-white border-slate-100 hover:border-slate-200`;
                    actionEl.setAttribute('draggable', 'true');
                    actionEl.dataset.stepId = step.id;
                    actionEl.dataset.actionId = action.id;

                    // Dot Handle
                    const handle = `
                        <div class="drag-handle w-5 h-5 flex items-center justify-center text-slate-300 hover:text-slate-500 transition-colors">
                            <div class="w-1.5 h-1.5 bg-current rounded-full shadow-sm"></div>
                        </div>
                    `;

                    actionEl.innerHTML = `
                        ${handle}
                        <div class="flex-1 flex flex-col">
                            <input
                                type="text"
                                placeholder="アクションを入力(例:宿を検索、３つに絞る、予約する…)"
                                value="${action.text}"
                                class="action-text-input bg-transparent outline-none text-sm font-bold transition-all text-slate-700 focus:text-indigo-600"
                            />
                            ${action.durationSeconds !== undefined && action.durationSeconds > 0 ? `
                                <span class="text-[10px] font-black text-emerald-600 uppercase tracking-tighter mt-0.5">
                                    Time: ${formatDuration(action.durationSeconds)}
                                </span>
                            ` : ''}
                        </div>
                        <button class="delete-action-btn p-1 text-slate-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                            ${Icons.TrashSmall}
                        </button>
                    `;

                    // Bind Action Events
                    const actionInput = actionEl.querySelector('.action-text-input');
                    actionInput.oninput = (e) => { action.text = e.target.value; this.saveProject(); updateFooter(); };

                    const deleteActionBtn = actionEl.querySelector('.delete-action-btn');
                    if (deleteActionBtn) {
                        deleteActionBtn.onclick = () => {
                            if (step.actions.length > 1) {
                                step.actions = step.actions.filter(a => a.id !== action.id);
                                this.saveProject();
                                renderSteps();
                                updateFooter();
                            }
                        };
                    }

                    // D&D Events
                    actionEl.ondragstart = (e) => {
                        e.dataTransfer.effectAllowed = 'move';
                        e.dataTransfer.setData('text/plain', JSON.stringify({ stepId: step.id, actionId: action.id }));
                        setTimeout(() => actionEl.classList.add('draggable-source'), 0);
                    };

                    actionEl.ondragend = () => {
                        actionEl.classList.remove('draggable-source');
                        document.querySelectorAll('.drag-over-top, .drag-over-bottom').forEach(el => el.classList.remove('drag-over-top', 'drag-over-bottom'));
                    };

                    actionEl.ondragover = (e) => {
                        e.preventDefault();
                        const draggingData = document.querySelector('.draggable-source');
                        if (draggingData && draggingData !== actionEl) {
                            const rect = actionEl.getBoundingClientRect();
                            const offset = e.clientY - rect.top;
                            const isTop = offset < (rect.height / 2);

                            if (isTop) {
                                actionEl.classList.add('drag-over-top');
                                actionEl.classList.remove('drag-over-bottom');
                            } else {
                                actionEl.classList.add('drag-over-bottom');
                                actionEl.classList.remove('drag-over-top');
                            }
                        }
                    };

                    actionEl.ondragleave = () => {
                        actionEl.classList.remove('drag-over-top', 'drag-over-bottom');
                    };

                    actionEl.ondrop = (e) => {
                        e.preventDefault();
                        const isTop = actionEl.classList.contains('drag-over-top');
                        actionEl.classList.remove('drag-over-top', 'drag-over-bottom');

                        const data = e.dataTransfer.getData('text/plain');
                        if (!data) return;

                        try {
                            const source = JSON.parse(data);

                            // Determine target ID for insertion
                            let targetId = action.id;
                            if (!isTop) {
                                // Insert after: means insert before next sibling
                                const currentIndex = step.actions.findIndex(a => a.id === action.id);
                                if (currentIndex !== -1 && currentIndex < step.actions.length - 1) {
                                    targetId = step.actions[currentIndex + 1].id;
                                } else {
                                    targetId = null; // End of list
                                }
                            }

                            this.moveAction(source.stepId, source.actionId, step.id, targetId);
                        } catch (err) {
                            console.error("Drop error", err);
                        }
                    };

                    actionsContainer.appendChild(actionEl);
                });

                // Add Action Button
                if (!allActionsCompleted) {
                    const addActionBtn = document.createElement('button');
                    addActionBtn.className = 'text-indigo-600 text-[10px] font-black hover:text-indigo-700 flex items-center gap-1 py-1 px-2 uppercase tracking-widest';
                    addActionBtn.textContent = '+ アクションを追加';
                    addActionBtn.onclick = () => {
                        step.actions.push({ id: generateId(), text: '', isCompleted: false });
                        this.saveProject();
                        renderSteps();
                        updateFooter();
                    };
                    actionsContainer.appendChild(addActionBtn);
                }

                stepsContainer.appendChild(stepEl);
            });

            // Add Step Button
            const addStepBtn = document.createElement('button');
            addStepBtn.className = 'w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-white transition-all font-black text-sm flex items-center justify-center gap-2 uppercase tracking-widest';
            addStepBtn.textContent = '+ ステップを追加';
            addStepBtn.onclick = () => {
                this.project.steps.push({ id: generateId(), title: '', actions: [{ id: generateId(), text: '', isCompleted: false }] });
                this.saveProject();
                renderSteps();
                updateFooter();
            };
            stepsContainer.appendChild(addStepBtn);

            // Scroll to bottom after adding logic if needed, but for now simple re-render
        };

        // Footer
        const footer = document.createElement('footer');
        footer.className = 'mt-6 pt-4 border-t border-slate-100 flex flex-col gap-3';

        const updateFooter = () => {
            const isStepValid = (step) => step.title.trim() !== '' && step.actions.length > 0 && step.actions.every(a => a.text.trim() !== '');
            const isReady = this.project.steps.length > 0 && this.project.steps.every(isStepValid);

            footer.innerHTML = `
                        ${!isReady ? `<p class="text-amber-600 text-[10px] text-center font-black uppercase tracking-widest">Please fill all blanks to resume focus</p>` : ''}
                        <button
                            id="start-actions-btn"
                            ${!isReady ? 'disabled' : ''}
                            class="w-full bg-slate-900 hover:bg-black disabled:bg-slate-200 text-white py-5 rounded-3xl font-black text-lg shadow-xl active:scale-[0.98] transition-all"
                        >
                            プロジェクト開始
                        </button>
                    `;

            const btn = footer.querySelector('#start-actions-btn');
            if (btn) btn.onclick = () => {
                this.saveProject(); // Ensure saved
                this.setMode('FOCUS');
            };
        };

        div.innerHTML = header;
        div.appendChild(stepsContainer);
        div.appendChild(footer);

        // Initial Render Inner
        renderSteps();
        updateFooter();

        return div;
    }

    renderFocus() {
        // Determine next action
        let nextData = null;
        for (const step of this.project.steps) {
            const nextAction = step.actions.find(a => !a.isCompleted);
            if (nextAction) {
                nextData = { action: nextAction, stepTitle: step.title };
                break;
            }
        }

        if (!nextData) {
            // Fallback if somehow here without actions
            this.setMode('CELEBRATION');
            return document.createElement('div');
        }

        // Reset timer state if action changed
        if (this.currentActionId !== nextData.action.id) {
            this.focusState = { isActive: false, seconds: 0, isAnimating: false };
            this.currentActionId = nextData.action.id;
            if (this.timerInterval) clearInterval(this.timerInterval);
        }

        const div = document.createElement('div');
        div.className = 'flex-1 flex flex-col p-8 fade-in relative overflow-hidden h-full';

        const updateTimerDisplay = () => {
            const timerEl = document.getElementById('focus-timer-display');
            if (timerEl) timerEl.textContent = formatTimeDisplay(this.focusState.seconds);
        };

        const startTimer = () => {
            this.focusState.isActive = true;
            this.timerInterval = setInterval(() => {
                this.focusState.seconds++;
                updateTimerDisplay();
            }, 1000);
            renderContent(); // Re-render buttons
            renderBackground(); // Update background
        };

        const pauseTimer = () => {
            this.focusState.isActive = false;
            clearInterval(this.timerInterval);
            renderContent();
            renderBackground();
        };

        const completeAction = () => {
            this.focusState.isActive = false;
            this.focusState.isAnimating = true;
            clearInterval(this.timerInterval);

            // Trigger Animation CSS
            const contentDiv = document.getElementById('focus-content');
            if (contentDiv) {
                contentDiv.classList.remove('opacity-100', 'scale-100', 'translate-y-0');
                contentDiv.classList.add('opacity-0', 'scale-90', 'translate-y-[-40px]');
            }

            setTimeout(() => {
                // Update Data
                this.project.steps = this.project.steps.map(step => ({
                    ...step,
                    actions: step.actions.map(a =>
                        a.id === nextData.action.id ? { ...a, isCompleted: true, durationSeconds: this.focusState.seconds } : a
                    )
                }));
                this.saveProject();

                const allActions = this.project.steps.flatMap(s => s.actions);
                if (allActions.every(a => a.isCompleted)) {
                    this.setMode('CELEBRATION');
                } else {
                    // Reset for next action
                    this.focusState = { isActive: false, seconds: 0, isAnimating: false };
                    this.render(); // Full Re-render for next action
                }
            }, 400);
        };

        const renderBackground = () => {
            const bgContainer = document.getElementById('focus-bg-container');
            if (!bgContainer) return;

            bgContainer.innerHTML = `
                         <div class="absolute top-[-10%] right-[-10%] w-64 h-64 bg-indigo-50 rounded-full -z-10 blur-3xl opacity-30 transition-all duration-1000 ${this.focusState.isActive ? 'scale-150 animate-pulse' : 'scale-100'}"></div>
                         <div class="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-emerald-50 rounded-full -z-10 blur-3xl opacity-30 transition-all duration-1000 ${this.focusState.isActive ? 'scale-150 animate-pulse' : 'scale-100'}"></div>
                         ${this.focusState.isActive ? `<div class="absolute inset-0 pointer-events-none opacity-[0.03] -z-20"><div class="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent animate-slow-spin"></div></div>` : ''}
                    `;
        };

        const renderContent = () => {
            const container = document.getElementById('focus-view-container');
            if (!container) return;
            container.innerHTML = '';

            // Content Wrapper
            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'flex-1 flex flex-col items-center justify-between text-center py-6 z-10';

            // Animated Text Part
            const textDiv = document.createElement('div');
            textDiv.id = 'focus-content';
            textDiv.className = `space-y-4 transition-all duration-500 ease-out ${this.focusState.isAnimating ? 'opacity-0 scale-90 translate-y-[-40px]' : 'opacity-100 scale-100 translate-y-0'}`;
            textDiv.innerHTML = `
                        <div class="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-widest shadow-sm">
                            ${nextData.stepTitle}
                        </div>
                        <h3 class="text-3xl md:text-4xl font-black text-slate-900 leading-tight px-4">
                            ${nextData.action.text}
                        </h3>
                        <div class="mt-8">
                            <span id="focus-timer-display" class="text-5xl md:text-6xl font-mono font-bold tracking-tighter ${this.focusState.isActive ? 'text-indigo-600' : 'text-slate-300'}">
                                ${formatTimeDisplay(this.focusState.seconds)}
                            </span>
                        </div>
                    `;

            // Buttons Part
            const buttonsDiv = document.createElement('div');
            buttonsDiv.className = 'flex flex-col items-center gap-6 w-full max-w-xs';

            if (!this.focusState.isActive && this.focusState.seconds === 0) {
                const startBtn = document.createElement('button');
                startBtn.className = 'w-full bg-indigo-600 text-white py-6 rounded-3xl font-black text-xl shadow-[0_15px_30px_rgba(79,70,229,0.3)] hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-3';
                startBtn.innerHTML = `${Icons.PlayBig} 開始`;
                startBtn.onclick = startTimer;
                buttonsDiv.appendChild(startBtn);
            } else {
                const controlGroup = document.createElement('div');
                controlGroup.className = 'flex flex-col gap-4 w-full';
                controlGroup.innerHTML = `
                            <div class="flex gap-4">
                                <button id="toggle-timer-btn" class="flex-1 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${this.focusState.isActive ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}">
                                    ${this.focusState.isActive ? `${Icons.Pause} 一時停止` : `${Icons.Play} 再開`}
                                </button>
                                <button id="complete-action-btn" class="flex-[2] bg-emerald-500 text-white py-4 rounded-2xl font-black text-xl shadow-lg hover:bg-emerald-600 active:scale-95 transition-all flex items-center justify-center gap-2">
                                    ${Icons.CheckComplete} 完了
                                </button>
                            </div>
                        `;
                const toggleBtn = controlGroup.querySelector('#toggle-timer-btn');
                toggleBtn.onclick = this.focusState.isActive ? pauseTimer : startTimer;

                const completeBtn = controlGroup.querySelector('#complete-action-btn');
                completeBtn.disabled = this.focusState.isAnimating;
                completeBtn.onclick = completeAction;

                buttonsDiv.appendChild(controlGroup);
            }

            contentWrapper.appendChild(textDiv);
            contentWrapper.appendChild(buttonsDiv);
            container.appendChild(contentWrapper);
        };

        // Structure
        div.innerHTML = `
                    <header class="mb-4 z-10">
                        <h2 class="text-xs uppercase tracking-widest text-slate-400 font-bold">PROJECT:</h2>
                        <h1 class="text-xl font-black text-slate-800 tracking-tight">${this.project.title}</h1>
                    </header>
                    <div id="focus-view-container" class="flex-1 flex flex-col h-full"></div>
                    <footer class="mt-4 flex justify-center z-10">
                        <button id="back-setup-btn" class="text-slate-400 hover:text-indigo-600 text-xs flex items-center gap-1 font-bold transition-colors py-2">
                            ${Icons.Return} プロジェクト確認
                        </button>
                    </footer>
                    <div id="focus-bg-container" class="absolute inset-0 -z-10"></div>
                `;

        const backBtn = div.querySelector('#back-setup-btn');
        backBtn.onclick = () => {
            clearInterval(this.timerInterval);
            this.setMode('SETUP');
        };

        // Inject into DOM later, but for now we append to div
        // Need to call render functions after appending to DOM usually, but here we construct
        // We'll use a timeout 0 to render dynamic parts after main div is ready/attached
        setTimeout(() => {
            renderContent();
            renderBackground();
        }, 0);

        return div;
    }

    renderCelebration() {
        const div = document.createElement('div');
        div.className = 'flex-1 flex flex-col items-center justify-center p-8 text-center space-y-8 fade-in';

        div.innerHTML = `
                    <div class="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    
                    <div class="space-y-2">
                        <h1 class="text-4xl font-black text-slate-900 leading-tight">プロジェクト完了！</h1>
                        <p class="text-slate-500 text-lg">
                            おめでとうございます！<br>一つのプロジェクトに集中して最後までやり遂げました。<br/>
                            次は何を始めますか？
                        </p>
                    </div>

                    <div class="flex flex-col gap-3 w-full max-w-xs">
                        <button id="view-review-btn" class="w-full px-8 py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-xl hover:bg-emerald-700 transition-all active:scale-95 flex items-center justify-center gap-2">
                            ${Icons.ListCheck} プロジェクトを振り返る
                        </button>
                        <button id="reset-btn" class="w-full px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-lg hover:bg-slate-800 transition-all active:scale-95">
                            新しいプロジェクトを始める
                        </button>
                        <button id="go-home-btn" class="text-slate-400 text-sm font-bold hover:text-slate-600 transition-colors">
                            ホーム画面に戻る
                        </button>
                    </div>
                `;

        div.querySelector('#view-review-btn').onclick = () => this.setMode('REVIEW');
        div.querySelector('#reset-btn').onclick = () => this.handleReset();
        div.querySelector('#go-home-btn').onclick = () => this.setMode('HOME');

        // Confetti Logic
        setTimeout(() => {
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                if (typeof confetti !== 'undefined') {
                    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
                }
            }, 250);
        }, 100);

        return div;
    }

    renderReview() {
        const div = document.createElement('div');
        div.className = 'flex-1 flex flex-col p-8 fade-in h-full overflow-hidden';

        const totalSeconds = this.project.steps.reduce((acc, step) =>
            acc + step.actions.reduce((aAcc, action) => aAcc + (action.durationSeconds || 0), 0)
            , 0);

        div.innerHTML = `
                    <header class="mb-6 flex items-center gap-4">
                        <button id="review-back-btn" class="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            ${Icons.BackSimple}
                        </button>
                        <div>
                            <h2 class="text-xs uppercase tracking-widest text-emerald-600 font-black">COMPLETED PROJECT</h2>
                            <h1 class="text-2xl font-black text-slate-900 tracking-tight">${this.project.title}</h1>
                        </div>
                    </header>

                    <div class="bg-emerald-50 rounded-2xl p-4 mb-6 flex items-center justify-between border border-emerald-100">
                        <div class="flex items-center gap-3">
                            <div class="bg-emerald-500 p-2 rounded-lg text-white">
                                ${Icons.TotalTime}
                            </div>
                            <div>
                                <p class="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Total Focused Time</p>
                                <p class="text-xl font-black text-emerald-900">${formatDuration(totalSeconds)}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Completed On</p>
                            <p class="text-xs font-bold text-emerald-800">${new Date(this.project.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div class="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar" id="review-list"></div>

                    <footer class="mt-6">
                        <button id="review-footer-back-btn" class="w-full bg-slate-900 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-slate-800 active:scale-[0.98] transition-all">
                            完了画面に戻る
                        </button>
                    </footer>
                `;

        // Render List Items
        const listContainer = div.querySelector('#review-list');
        this.project.steps.forEach((step, sIdx) => {
            const stepSeconds = step.actions.reduce((acc, a) => acc + (a.durationSeconds || 0), 0);
            const stepDiv = document.createElement('div');
            stepDiv.className = 'space-y-3';

            let actionsHtml = '';
            step.actions.forEach(action => {
                actionsHtml += `
                            <div class="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl">
                                <div class="flex items-center gap-3">
                                    <div class="text-emerald-500">${Icons.CheckSmall}</div>
                                    <span class="text-sm font-bold text-slate-700">${action.text}</span>
                                </div>
                                <span class="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                                    ${formatDuration(action.durationSeconds)}
                                </span>
                            </div>
                        `;
            });

            stepDiv.innerHTML = `
                        <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                            <div class="flex items-center gap-2">
                                <span class="text-xs font-black text-slate-400">STEP ${sIdx + 1}</span>
                                <h3 class="font-black text-slate-800 uppercase tracking-tight">${step.title}</h3>
                            </div>
                            <span class="text-[10px] font-bold text-slate-400">${formatDuration(stepSeconds)}</span>
                        </div>
                        <div class="space-y-2">
                            ${actionsHtml}
                        </div>
                    `;
            listContainer.appendChild(stepDiv);
        });

        div.querySelector('#review-back-btn').onclick = () => this.setMode('CELEBRATION');
        div.querySelector('#review-footer-back-btn').onclick = () => this.setMode('CELEBRATION');

        return div;
    }
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
