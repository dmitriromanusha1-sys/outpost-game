// ======================= СИСТЕМА УРОВНЕЙ =======================
class LevelSystem {
    constructor() {
        this.currentLevel = 1;
        this.levels = {
            1: {
                name: "Новичок",
                map: "forest",
                startCoins: 100,
                bossCount: 2,
                enemyMultiplier: 0.7,
                bossHpMultiplier: 0.5,
                enemySpeedMultiplier: 0.8,
                waveInterval: 20000,
                spawnRate: 300,
                waveDifficultyMultiplier: 0.5,
                enemySpawnMultiplier: 1.0,
                description: "Легкий старт, лесная карта"
            },
            2: {
                name: "Воин",
                map: "desert",
                startCoins: 100,
                bossCount: 3,
                enemyMultiplier: 1.0,
                bossHpMultiplier: 0.8,
                enemySpeedMultiplier: 1.0,
                waveInterval: 18000,
                spawnRate: 250,
                waveDifficultyMultiplier: 0.8,
                enemySpawnMultiplier: 1.2,
                description: "Пустынные пески, средняя сложность"
            },
            3: {
                name: "Защитник",
                map: "mountains",
                startCoins: 100,
                bossCount: 4,
                enemyMultiplier: 1.3,
                bossHpMultiplier: 1.1,
                enemySpeedMultiplier: 1.1,
                waveInterval: 16000,
                spawnRate: 220,
                waveDifficultyMultiplier: 1.1,
                enemySpawnMultiplier: 1.4,
                description: "Скалистые горы, повышенная сложность"
            },
            4: {
                name: "Победитель",
                map: "meadows",
                startCoins: 100,
                bossCount: 5,
                enemyMultiplier: 1.6,
                bossHpMultiplier: 1.4,
                enemySpeedMultiplier: 1.2,
                waveInterval: 14000,
                spawnRate: 190,
                waveDifficultyMultiplier: 1.4,
                enemySpawnMultiplier: 1.6,
                description: "Цветущие луга, серьезные испытания"
            },
            5: {
                name: "Герой",
                map: "jungle",
                startCoins: 100,
                bossCount: 6,
                enemyMultiplier: 1.9,
                bossHpMultiplier: 1.7,
                enemySpeedMultiplier: 1.3,
                waveInterval: 12000,
                spawnRate: 160,
                waveDifficultyMultiplier: 1.7,
                enemySpawnMultiplier: 1.8,
                description: "Густые джунгли, героический уровень"
            },
            6: {
                name: "Легенда",
                map: "winter",
                startCoins: 100,
                bossCount: 7,
                enemyMultiplier: 2.2,
                bossHpMultiplier: 2.0,
                enemySpeedMultiplier: 1.4,
                waveInterval: 10000,
                spawnRate: 130,
                waveDifficultyMultiplier: 2.0,
                enemySpawnMultiplier: 2.0,
                description: "Ледяные просторы, легендарная сложность"
            },
            7: {
                name: "Мастер",
                map: "volcano",
                startCoins: 100,
                bossCount: 8,
                enemyMultiplier: 2.5,
                bossHpMultiplier: 2.3,
                enemySpeedMultiplier: 1.5,
                waveInterval: 8000,
                spawnRate: 100,
                waveDifficultyMultiplier: 2.3,
                enemySpawnMultiplier: 2.2,
                description: "Огненные земли, мастерский уровень"
            },
            8: {
                name: "Титан",
                map: "swamp",
                startCoins: 100,
                bossCount: 9,
                enemyMultiplier: 2.8,
                bossHpMultiplier: 2.6,
                enemySpeedMultiplier: 1.6,
                waveInterval: 6000,
                spawnRate: 70,
                waveDifficultyMultiplier: 2.6,
                enemySpawnMultiplier: 2.4,
                description: "Топи и туманы, титаническая сложность"
            },
            9: {
                name: "Император",
                map: "autumn",
                startCoins: 100,
                bossCount: 10,
                enemyMultiplier: 3.1,
                bossHpMultiplier: 2.9,
                enemySpeedMultiplier: 1.7,
                waveInterval: 5000,
                spawnRate: 50,
                waveDifficultyMultiplier: 2.9,
                enemySpawnMultiplier: 2.6,
                description: "Золотой лес, императорский уровень"
            },
            10: {
                name: "Бог Войны",
                map: "ruins",
                startCoins: 100,
                bossCount: 12,
                enemyMultiplier: 3.5,
                bossHpMultiplier: 3.3,
                enemySpeedMultiplier: 1.8,
                waveInterval: 4000,
                spawnRate: 30,
                waveDifficultyMultiplier: 3.2,
                enemySpawnMultiplier: 2.8,
                description: "Древние руины, божественная сложность"
            }
        };
    }

    getCurrentLevel() {
        return this.currentLevel;
    }

    getLevelData(level = null) {
        const levelToGet = level || this.currentLevel;
        return this.levels[levelToGet] || this.levels[1];
    }

    setLevel(level) {
        if (this.levels[level]) {
            this.currentLevel = level;
            return true;
        }
        return false;
    }

    initLevelsMenu() {
        const dropdown = document.getElementById('levels-dropdown');
        if (!dropdown) return;
        
        dropdown.innerHTML = '';
        
        for (let level = 1; level <= 10; level++) {
            const levelData = this.levels[level];
            const div = document.createElement('div');
            div.className = 'level-option';
            if (level === this.currentLevel) {
                div.classList.add('active');
            }
            div.onclick = () => this.selectLevel(level);
            div.innerHTML = `
                <div class="level-number">${level}</div>
                <div class="level-name">${levelData.name}</div>
                <div class="level-details">
                    <div class="level-map">🗺 ${this.getMapName(levelData.map)}</div>
                    <div class="level-difficulty">⚔ ${levelData.bossCount} босс.</div>
                </div>
            `;
            dropdown.appendChild(div);
        }
    }

    selectLevel(level) {
        if (this.setLevel(level)) {
            document.querySelectorAll('.level-option').forEach(opt => {
                opt.classList.remove('active');
            });
            
            const dropdown = document.getElementById('levels-dropdown');
            const levelOptions = dropdown.querySelectorAll('.level-option');
            levelOptions[level - 1].classList.add('active');
            
            const levelData = this.levels[level];
            if (window.showNotification) {
                window.showNotification(`Выбран уровень ${level}: ${levelData.name}`, "info");
            }
        }
    }

    getMapName(mapKey) {
        const mapNames = {
            'forest': 'Лес',
            'desert': 'Пустыня',
            'mountains': 'Горы',
            'meadows': 'Луга',
            'jungle': 'Джунгли',
            'winter': 'Зима',
            'volcano': 'Вулкан',
            'swamp': 'Болото',
            'autumn': 'Осень',
            'steppe': 'Степь',
            'coastal': 'Побережье',
            'ruins': 'Руины',
            'canyon': 'Каньон',
            'magic': 'Магия',
            'lava': 'Лава',
            'crystal': 'Кристаллы',
            'underwater': 'Подводный',
            'cloud': 'Облака',
            'mushroom': 'Грибной',
            'graveyard': 'Кладбище',
            'bamboo': 'Бамбук',
            'cherry': 'Сакура',
            'dark': 'Тьма',
            'heaven': 'Рай'
        };
        return mapNames[mapKey] || mapKey;
    }

    getMapKey(level = null) {
        const levelData = this.getLevelData(level);
        return levelData.map;
    }

    getTotalBosses(level = null) {
        const levelData = this.getLevelData(level);
        return levelData.bossCount;
    }

    getEnemyMultiplier(level = null) {
        const levelData = this.getLevelData(level);
        return levelData.enemyMultiplier;
    }

    getBossHpMultiplier(level = null) {
        const levelData = this.getLevelData(level);
        return levelData.bossHpMultiplier;
    }

    getEnemySpeedMultiplier(level = null) {
        const levelData = this.getLevelData(level);
        return levelData.enemySpeedMultiplier;
    }

    getWaveInterval(level = null) {
        const levelData = this.getLevelData(level);
        return levelData.waveInterval;
    }

    getSpawnRate(level = null) {
        const levelData = this.getLevelData(level);
        return levelData.spawnRate;
    }

    getWaveDifficultyMultiplier(level = null) {
        const levelData = this.getLevelData(level);
        return levelData.waveDifficultyMultiplier;
    }

    getEnemySpawnMultiplier(level = null) {
        const levelData = this.getLevelData(level);
        return levelData.enemySpawnMultiplier;
    }

    getStartCoins(level = null) {
        const levelData = this.getLevelData(level);
        return levelData.startCoins;
    }

    getLevelName(level = null) {
        const levelData = this.getLevelData(level);
        return levelData.name;
    }

    getLevelDescription(level = null) {
        const levelData = this.getLevelData(level);
        return levelData.description;
    }

    getAllLevels() {
        return this.levels;
    }
}

// Создаем глобальный экземпляр системы уровней
const levelSystem = new LevelSystem();
