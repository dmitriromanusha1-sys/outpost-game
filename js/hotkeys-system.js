// hotkeys-system.js
// Система горячих клавиш для Outpost

class HotkeysSystem {
    constructor() {
        this.initialized = false;
        this.currentMapIndex = 0;
        this.availableMaps = [
            'forest', 'desert', 'mountains', 'meadows', 'jungle',
            'winter', 'volcano', 'swamp', 'autumn', 'steppe',
            'coastal', 'ruins', 'canyon', 'lava',
            'cloud', 'cherry', 'dark', 'heaven'
        ];
    }

    init() {
        if (this.initialized) return;

        const currentMap = window.graphicsSystem && window.graphicsSystem.gameState
            ? window.graphicsSystem.gameState.currentMap
            : null;
        this.currentMapIndex = this.availableMaps.indexOf(currentMap);
        if (this.currentMapIndex === -1) this.currentMapIndex = 0;

        this.initialized = true;
    }

    handleHotkey(event) {
        if (!this.initialized) return false;

        const key = event.key;
        const code = event.code;
        const ctrl = event.ctrlKey;
        const shift = event.shiftKey;

        // --- Музыка ---
        // Ctrl+M — вкл/выкл музыку
        if (ctrl && key.toLowerCase() === 'm') {
            event.preventDefault();
            this.toggleMusic();
            return true;
        }

        // Ctrl+→ / Ctrl+← — следующий / предыдущий трек
        if (ctrl && key === 'ArrowRight') {
            event.preventDefault();
            window.musicSystem?.playNextTrack();
            return true;
        }
        if (ctrl && key === 'ArrowLeft') {
            event.preventDefault();
            window.musicSystem?.playPrevTrack();
            return true;
        }

        // Tab — следующий трек, Shift+Tab — предыдущий
        if (code === 'Tab' && !ctrl) {
            event.preventDefault();
            if (shift) {
                window.musicSystem?.playPrevTrack();
            } else {
                window.musicSystem?.playNextTrack();
            }
            return true;
        }

        // Ctrl+↑ / Ctrl+↓ — громкость
        if (ctrl && (key === 'ArrowUp' || key === 'ArrowDown')) {
            event.preventDefault();
            this.adjustVolume(key === 'ArrowUp');
            return true;
        }

        // --- Скорость 1-5 ---
        if (!ctrl && !shift && code >= 'Digit1' && code <= 'Digit5') {
            const spd = parseInt(code.replace('Digit', ''));
            if (window.setSpeed) window.setSpeed(spd);
            return true;
        }

        // --- Игровые действия (только когда идёт игра) ---
        const inGame = document.getElementById('game-container')?.style.display !== 'none';
        if (!inGame) return false;

        // U / Ctrl+U — улучшить ближайшее здание
        if ((key === 'u' || key === 'U' || key === 'г' || key === 'Г') && !ctrl) {
            event.preventDefault();
            if (window.upgradeNearest) window.upgradeNearest();
            return true;
        }

        // H / Н — лечиться
        if ((key === 'h' || key === 'H' || key === 'р' || key === 'Р') && !ctrl) {
            event.preventDefault();
            if (window.healPlayer) window.healPlayer();
            return true;
        }

        // Q / Й — продать ближайшее здание
        if ((key === 'q' || key === 'Q' || key === 'й' || key === 'Й') && !ctrl) {
            event.preventDefault();
            if (window.sellNearest) window.sellNearest();
            return true;
        }

        // --- Карта: F1 / F2 ---
        if (key === 'F1') {
            event.preventDefault();
            this.changeMap(false);
            return true;
        }
        if (key === 'F2') {
            event.preventDefault();
            this.changeMap(true);
            return true;
        }

        return false;
    }

    toggleMusic() {
        if (!window.musicSystem) return;
        if (window.musicSystem.audio.paused) {
            window.musicSystem.play();
            this.showNotification('🎵 Музыка включена', 'success');
        } else {
            window.musicSystem.pause();
            this.showNotification('🎵 Музыка выключена', 'warning');
        }
    }

    adjustVolume(increase) {
        if (!window.musicSystem) return;
        const step = 0.1;
        let v = window.musicSystem.audio.volume;
        v = increase ? Math.min(1, v + step) : Math.max(0, v - step);
        window.musicSystem.audio.volume = v;

        const slider = document.getElementById('music-volume');
        if (slider) {
            slider.value = v * 100;
            const label = document.getElementById('volume-value');
            if (label) label.textContent = Math.round(v * 100) + '%';
        }

        this.showNotification(`🔊 Громкость: ${Math.round(v * 100)}%`, 'info');
    }

    changeMap(next) {
        if (!window.changeMap) return;
        if (next) {
            this.currentMapIndex = (this.currentMapIndex + 1) % this.availableMaps.length;
        } else {
            this.currentMapIndex = (this.currentMapIndex - 1 + this.availableMaps.length) % this.availableMaps.length;
        }
        const mapKey = this.availableMaps[this.currentMapIndex];
        document.querySelectorAll('.map-option').forEach(opt => {
            opt.classList.remove('active');
            if (opt.onclick && opt.onclick.toString().includes(mapKey)) {
                opt.classList.add('active');
            }
        });
        window.changeMap(mapKey);
        this.showNotification(`🗺️ Карта: ${this.getMapName(mapKey)}`, 'info');
    }

    getMapName(mapKey) {
        const names = {
            forest: 'Лес', desert: 'Пустыня', mountains: 'Горы',
            meadows: 'Луга', jungle: 'Джунгли', winter: 'Зима',
            volcano: 'Вулкан', swamp: 'Болото', autumn: 'Осень',
            steppe: 'Степь', coastal: 'Побережье', ruins: 'Руины',
            canyon: 'Каньон', lava: 'Лава', cloud: 'Облака',
            cherry: 'Сакура', dark: 'Тьма', heaven: 'Рай'
        };
        return names[mapKey] || mapKey;
    }

    showNotification(message, type = 'info') {
        if (window.showNotification) window.showNotification(message, type);
    }
}

window.hotkeysSystem = new HotkeysSystem();
