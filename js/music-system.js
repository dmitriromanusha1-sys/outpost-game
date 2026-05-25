// ======================= СИСТЕМА МУЗЫКИ =======================
class MusicSystem {
    constructor() {
        this.musicTracks = {
            // Эпическая
            heroic_charge:      { path: "music/heroic_charge.mp3",      category: "epic",     icon: "⚔️", name: "Героическая атака",       desc: "Героическая атака войск" },
            dragon_slayer:      { path: "music/dragon_slayer.mp3",      category: "epic",     icon: "🐉", name: "Битва с драконом",        desc: "Битва с могучим драконом" },
            victory_march:      { path: "music/victory_march.mp3",      category: "epic",     icon: "🎖️", name: "Торжественный марш",     desc: "Торжественный победный марш" },
            final_confrontation:{ path: "music/final_confrontation.mp3",category: "epic",     icon: "👑", name: "Финальная битва",         desc: "Финальная битва с боссом" },
            realm_defenders:    { path: "music/realm_defenders.mp3",    category: "epic",     icon: "🏰", name: "Защитники королевства",   desc: "Эпичная оборонительная тема" },
            // Боевая
            battle_theme:       { path: "music/battle_theme.mp3",       category: "battle",   icon: "🛡️", name: "Боевая тема",            desc: "Основная боевая тема" },
            siege_warfare:      { path: "music/siege_warfare.mp3",      category: "battle",   icon: "🏹", name: "Осада замка",             desc: "Музыка для осады замка" },
            orc_raid:           { path: "music/orc_raid.mp3",           category: "battle",   icon: "👹", name: "Набег орков",             desc: "Быстрая агрессивная музыка" },
            cavalry_charge:     { path: "music/cavalry_charge.mp3",     category: "battle",   icon: "🐎", name: "Атака кавалерии",        desc: "Стремительная атака кавалерии" },
            arrow_storm:        { path: "music/arrow_storm.mp3",        category: "battle",   icon: "🎯", name: "Град стрел",              desc: "Быстрые и резкие мелодии" },
            giants_awakening:   { path: "music/giants_awakening.mp3",   category: "battle",   icon: "👊", name: "Пробуждение великанов",   desc: "Тяжёлая мощная боевая тема" },
            // Атмосферная
            dark_forest:        { path: "music/dark_forest.mp3",        category: "ambient",  icon: "🌳", name: "Темный лес",              desc: "Таинственный темный лес" },
            mystic_caves:       { path: "music/mystic_caves.mp3",       category: "ambient",  icon: "🕳️", name: "Таинственные пещеры",   desc: "Загадочные пещеры" },
            haunted_ruins:      { path: "music/haunted_ruins.mp3",      category: "ambient",  icon: "👻", name: "Проклятые руины",        desc: "Мрачные древние руины" },
            foggy_mountains:    { path: "music/foggy_mountains.mp3",    category: "ambient",  icon: "🏔️", name: "Туманные горы",         desc: "Высокие туманные горы" },
            enchanted_lake:     { path: "music/enchanted_lake.mp3",     category: "ambient",  icon: "🌊", name: "Зачарованное озеро",     desc: "Магическое озеро" },
            // Фэнтези
            elven_kingdom:      { path: "music/elven_kingdom.mp3",      category: "fantasy",  icon: "🧝", name: "Королевство эльфов",     desc: "Эльфийские мелодии" },
            magic_academy:      { path: "music/magic_academy.mp3",      category: "fantasy",  icon: "📚", name: "Академия магии",          desc: "Магическая академия" },
            fairy_glade:        { path: "music/fairy_glade.mp3",        category: "fantasy",  icon: "🧚", name: "Поляна фей",              desc: "Лёгкие и воздушные мелодии" },
            wizard_tower:       { path: "music/wizard_tower.mp3",       category: "fantasy",  icon: "🧙", name: "Башня волшебника",        desc: "Таинственная магическая башня" },
            // Средневековая
            medieval_town:      { path: "music/medieval_town.mp3",      category: "medieval", icon: "🏘️", name: "Средневековый город",   desc: "Музыка средневекового города" },
            royal_court:        { path: "music/royal_court.mp3",        category: "medieval", icon: "🏰", name: "Королевский двор",       desc: "Торжественная королевская музыка" },
            tavern_night:       { path: "music/tavern_night.mp3",       category: "medieval", icon: "🍻", name: "Вечер в таверне",        desc: "Весёлая таверная музыка" },
            knight_training:    { path: "music/knight_training.mp3",    category: "medieval", icon: "⚔️", name: "Тренировка рыцарей",    desc: "Рыцарские тренировки" },
            castle_defense:     { path: "music/castle_defense.mp3",     category: "medieval", icon: "🛡️", name: "Оборона замка",         desc: "Музыка для обороны замка" },
            // Спокойная
            peaceful_village:   { path: "music/peaceful_village.mp3",   category: "calm",     icon: "🏡", name: "Мирная деревня",          desc: "Спокойная деревенская музыка" },
            sunrise_fields:     { path: "music/sunrise_fields.mp3",     category: "calm",     icon: "🌅", name: "Рассветные поля",        desc: "Мелодия рассвета" },
            quiet_river:        { path: "music/quiet_river.mp3",        category: "calm",     icon: "🌊", name: "Тихая река",              desc: "Плавная речная музыка" },
            autumn_forest:      { path: "music/autumn_forest.mp3",      category: "calm",     icon: "🍂", name: "Осенний лес",             desc: "Осенняя лесная мелодия" },
            starry_night:       { path: "music/starry_night.mp3",       category: "calm",     icon: "🌌", name: "Звёздная ночь",          desc: "Тихое звёздное небо" }
        };

        this.trackList = Object.keys(this.musicTracks);
        this.currentTrackIndex = 0;
        this.currentTrack = this.trackList[0];

        // Какие файлы реально существуют (заполняется при checkLocalFiles)
        this.availableTracks = new Set();

        this.audio = new Audio();
        this.audio.loop = false; // авто-переход на следующий трек через событие ended
        this.audio.volume = 0.5;

        this.enabled = true;
        this.isPlaying = false;
        this.shuffle = false;
        this.lastVolume = 0.5;

        // Состояние фильтра
        this._filterCategory = 'all';
        this._filterSearch = '';

        this.audio.addEventListener('ended', () => { if (this.enabled) this._advance(); });
        this.audio.addEventListener('error', () => { setTimeout(() => this._advance(), 1000); });
    }

    // ── Воспроизведение ──────────────────────────────────────────────

    async play(trackId = null) {
        if (!this.enabled || trackId === null) return;
        const track = this.musicTracks[trackId];
        if (!track) return;

        this.audio.src = track.path;
        this.currentTrack = trackId;
        this.currentTrackIndex = this.trackList.indexOf(trackId);
        if (this.currentTrackIndex === -1) this.currentTrackIndex = 0;

        try {
            await this.audio.play();
            this.isPlaying = true;
        } catch {
            this.isPlaying = false;
            this.showNotification('❌ Не удалось загрузить трек', 'warning');
            return;
        }

        this.updateUI();
        this.highlightCurrentTrack();
        this.updateNowPlaying();
        this.showNotification(`🎵 ${track.name}`, 'success');
    }

    pause() {
        if (!this.isPlaying) return;
        this.audio.pause();
        this.isPlaying = false;
        this.updateUI();
    }

    resume() {
        if (this.isPlaying || !this.enabled || !this.audio.src) return;
        this.audio.play().catch(() => {});
        this.isPlaying = true;
        this.updateUI();
    }

    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.audio.src ? this.resume() : this.play(this.currentTrack);
        }
    }

    // Авто-переход: следующий (или случайный при shuffle)
    _advance() {
        if (this.shuffle) {
            this._playRandom();
        } else {
            this.playNextTrack();
        }
    }

    _playRandom() {
        const pool = this.availableTracks.size > 0
            ? [...this.availableTracks]
            : this.trackList;
        const next = pool[Math.floor(Math.random() * pool.length)];
        this.play(next);
    }

    playNextTrack() {
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.trackList.length;
        this.play(this.trackList[this.currentTrackIndex]);
    }

    playPrevTrack() {
        this.currentTrackIndex = (this.currentTrackIndex - 1 + this.trackList.length) % this.trackList.length;
        this.play(this.trackList[this.currentTrackIndex]);
    }

    selectTrack(trackId) {
        this.play(trackId);
    }

    toggleShuffle() {
        this.shuffle = !this.shuffle;
        const btn = document.getElementById('shuffle-btn');
        if (btn) btn.classList.toggle('active', this.shuffle);
        this.showNotification(this.shuffle ? '🔀 Перемешивание вкл.' : '🔀 Перемешивание выкл.', 'info');
    }

    // ── Громкость ─────────────────────────────────────────────────────

    setVolume(value) {
        const v = value / 100;
        this.audio.volume = v;
        this.lastVolume = v;
        const lbl = document.getElementById('volume-value');
        if (lbl) lbl.textContent = Math.round(v * 100) + '%';
        if (v > 0 && !this.enabled) this.enabled = true;
    }

    // ── UI ────────────────────────────────────────────────────────────

    initUI() {
        this.renderTrackList();
        this.updateUI();
        this.updateNowPlaying();

        const volSlider = document.getElementById('music-volume');
        if (volSlider) {
            volSlider.value = this.audio.volume * 100;
            volSlider.oninput = e => this.setVolume(e.target.value);
        }
        const volLabel = document.getElementById('volume-value');
        if (volLabel) volLabel.textContent = Math.round(this.audio.volume * 100) + '%';

        const searchInput = document.getElementById('music-search');
        if (searchInput) {
            searchInput.oninput = () => {
                this._filterSearch = searchInput.value.toLowerCase();
                this._applyFilter();
            };
        }

        const shuffleBtn = document.getElementById('shuffle-btn');
        if (shuffleBtn) {
            shuffleBtn.classList.toggle('active', this.shuffle);
            shuffleBtn.onclick = () => this.toggleShuffle();
        }

        document.getElementById('music-toggle')?.addEventListener('click', () => this.toggle());
        document.getElementById('music-prev')?.addEventListener('click', () => this.playPrevTrack());
        document.getElementById('music-next')?.addEventListener('click', () => this.playNextTrack());
    }

    renderTrackList() {
        const container = document.getElementById('music-tracks-grid');
        if (!container) return;
        container.innerHTML = '';

        this.trackList.forEach(trackId => {
            const track = this.musicTracks[trackId];
            const available = this.availableTracks.size === 0 || this.availableTracks.has(trackId);

            const div = document.createElement('div');
            div.className = 'music-option' + (trackId === this.currentTrack ? ' active current' : '') + (!available ? ' unavailable' : '');
            div.dataset.trackId = trackId;
            div.dataset.category = track.category;
            div.title = track.desc;
            div.onclick = () => this.selectTrack(trackId);

            div.innerHTML = `
                <div class="music-icon">${track.icon}</div>
                <div class="music-info">
                    <div class="music-name">${track.name}</div>
                    <div class="music-category-tag">${this.getCategoryName(track.category)}</div>
                </div>
                ${!available ? '<div class="music-missing">нет файла</div>' : ''}
            `;
            container.appendChild(div);
        });
    }

    updateUI() {
        const btn = document.getElementById('music-toggle');
        if (btn) {
            btn.textContent = this.isPlaying ? '⏸ Пауза' : '▶ Включить';
            btn.classList.toggle('active', this.isPlaying);
        }
        const slider = document.getElementById('music-volume');
        if (slider) slider.value = this.audio.volume * 100;
    }

    updateNowPlaying() {
        const el = document.getElementById('now-playing');
        if (!el) return;
        const track = this.musicTracks[this.currentTrack];
        if (track) {
            el.innerHTML = `${track.icon} <strong>${track.name}</strong> <span class="music-category-tag">${this.getCategoryName(track.category)}</span>`;
        }
    }

    highlightCurrentTrack() {
        document.querySelectorAll('.music-option').forEach(opt => {
            const isActive = opt.dataset.trackId === this.currentTrack;
            opt.classList.toggle('active', isActive);
            opt.classList.toggle('current', isActive);
            if (isActive) opt.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        });
    }

    // ── Фильтрация ────────────────────────────────────────────────────

    filterByCategory(category) {
        this._filterCategory = category;
        document.querySelectorAll('.music-category-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        this._applyFilter();
    }

    filterTracks() {
        this._filterSearch = document.getElementById('music-search')?.value.toLowerCase() || '';
        this._applyFilter();
    }

    _applyFilter() {
        document.querySelectorAll('.music-option').forEach(opt => {
            const trackId = opt.dataset.trackId;
            const track = this.musicTracks[trackId];
            if (!track) { opt.style.display = 'none'; return; }

            const matchCat = this._filterCategory === 'all' || track.category === this._filterCategory;
            const matchSearch = !this._filterSearch ||
                track.name.toLowerCase().includes(this._filterSearch) ||
                track.desc.toLowerCase().includes(this._filterSearch);

            opt.style.display = matchCat && matchSearch ? '' : 'none';
        });
    }

    // ── Проверка файлов ───────────────────────────────────────────────

    async checkLocalFiles() {
        const statusEl = document.getElementById('music-status');
        if (statusEl) statusEl.textContent = '🔍 Проверка треков...';

        this.availableTracks.clear();
        const checks = this.trackList.map(async trackId => {
            try {
                const r = await fetch(this.musicTracks[trackId].path, { method: 'HEAD' });
                if (r.ok) this.availableTracks.add(trackId);
            } catch {}
        });
        await Promise.all(checks);

        const found = this.availableTracks.size;
        const total = this.trackList.length;

        if (statusEl) {
            if (found === 0) {
                statusEl.textContent = '⚠️ Файлы не найдены — поместите MP3 в папку music/';
                statusEl.style.color = '#ff9800';
            } else {
                statusEl.textContent = `✅ Найдено ${found} из ${total} треков`;
                statusEl.style.color = '#4caf50';
            }
        }

        // Перерисуем список с пометками недоступных треков
        this.renderTrackList();
        this.highlightCurrentTrack();

        return found > 0;
    }

    // ── Сохранение / загрузка ─────────────────────────────────────────

    saveSettings() {
        localStorage.setItem('musicSettings', JSON.stringify({
            currentTrack: this.currentTrack,
            volume: this.audio.volume,
            enabled: this.enabled,
            trackIndex: this.currentTrackIndex,
            shuffle: this.shuffle
        }));
    }

    loadSettings() {
        const saved = localStorage.getItem('musicSettings');
        if (!saved) return;
        try {
            const s = JSON.parse(saved);
            this.currentTrack = s.currentTrack || this.trackList[0];
            this.currentTrackIndex = this.trackList.indexOf(this.currentTrack);
            if (this.currentTrackIndex === -1) this.currentTrackIndex = 0;
            this.audio.volume = s.volume ?? 0.5;
            this.enabled = s.enabled !== false;
            this.shuffle = s.shuffle || false;
        } catch {}
    }

    // ── Вспомогательное ──────────────────────────────────────────────

    getCategoryName(cat) {
        return { epic: 'Эпическая', battle: 'Боевая', ambient: 'Атмосферная', fantasy: 'Фэнтези', medieval: 'Средневековая', calm: 'Спокойная' }[cat] || cat;
    }

    showNotification(message, type = 'info') {
        if (window.showNotification) window.showNotification(message, type);
    }

    handleHotkey(e) { return false; }

    start() { if (this.enabled && !this.isPlaying) this.play(this.currentTrack); }
    stop() { this.pause(); this.audio.src = ''; this.currentTrack = this.trackList[0]; this.currentTrackIndex = 0; this.updateUI(); }
}

const musicSystem = new MusicSystem();

window.playNextTrack      = () => musicSystem.playNextTrack();
window.toggleMusic        = () => musicSystem.toggle();
window.setVolume          = v  => musicSystem.setVolume(v);
window.selectMusicTrack   = id => musicSystem.selectTrack(id);
window.filterMusicTracks  = () => musicSystem.filterTracks();
window.filterMusicByCategory = cat => musicSystem.filterByCategory(cat);
