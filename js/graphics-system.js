// graphics-system.js - Полная система графики с функциями отрисовки

// ======================= КЛАСС СИСТЕМЫ ГРАФИКИ =======================
class GraphicsSystem {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.GAME_WIDTH = canvas.width;
        this.GAME_HEIGHT = canvas.height;
        
        // Настройки графики по умолчанию
        this.settings = {
            preset: 'medium',
            tileSize: 20,
            shadows: true,
            particles: true,
            antiAliasing: true,
            textureQuality: 'medium',
            bloom: false,
            reflections: false,
            postProcessing: false,
            maxParticles: 50,
            enemyDetails: true,
            buildingDetails: true,
            weatherEffects: true,
            fogEffect: true,
            rainEffect: false,
            snowEffect: false,
            windEffect: false,
            dayNightCycle: true,
            lighting: true,
            shadowsQuality: 'medium',
            removeBackground: true
        };
        
        // Пресеты графики
        this.presets = {
            verylow: {
                name: 'Очень низкая',
                tileSize: 40,
                shadows: false,
                particles: false,
                antiAliasing: false,
                textureQuality: 'low',
                bloom: false,
                reflections: false,
                postProcessing: false,
                maxParticles: 0,
                enemyDetails: false,
                buildingDetails: false,
                weatherEffects: false,
                fogEffect: false,
                rainEffect: false,
                snowEffect: false,
                windEffect: false,
                dayNightCycle: false,
                lighting: false,
                shadowsQuality: 'off',
                removeBackground: false
            },
            low: {
                name: 'Низкая',
                tileSize: 30,
                shadows: false,
                particles: true,
                antiAliasing: false,
                textureQuality: 'low',
                bloom: false,
                reflections: false,
                postProcessing: false,
                maxParticles: 20,
                enemyDetails: true,
                buildingDetails: false,
                weatherEffects: false,
                fogEffect: false,
                rainEffect: false,
                snowEffect: false,
                windEffect: false,
                dayNightCycle: true,
                lighting: false,
                shadowsQuality: 'low',
                removeBackground: false
            },
            medium: {
                name: 'Средняя',
                tileSize: 20,
                shadows: true,
                particles: true,
                antiAliasing: true,
                textureQuality: 'medium',
                bloom: false,
                reflections: false,
                postProcessing: false,
                maxParticles: 50,
                enemyDetails: true,
                buildingDetails: true,
                weatherEffects: true,
                fogEffect: true,
                rainEffect: false,
                snowEffect: false,
                windEffect: false,
                dayNightCycle: true,
                lighting: true,
                shadowsQuality: 'medium',
                removeBackground: true
            },
            high: {
                name: 'Высокая',
                tileSize: 15,
                shadows: true,
                particles: true,
                antiAliasing: true,
                textureQuality: 'high',
                bloom: true,
                reflections: true,
                postProcessing: true,
                maxParticles: 100,
                enemyDetails: true,
                buildingDetails: true,
                weatherEffects: true,
                fogEffect: true,
                rainEffect: true,
                snowEffect: true,
                windEffect: true,
                dayNightCycle: true,
                lighting: true,
                shadowsQuality: 'high',
                removeBackground: true
            },
            ultra: {
                name: 'Ультра',
                tileSize: 10,
                shadows: true,
                particles: true,
                antiAliasing: true,
                textureQuality: 'ultra',
                bloom: true,
                reflections: true,
                postProcessing: true,
                maxParticles: 200,
                enemyDetails: true,
                buildingDetails: true,
                weatherEffects: true,
                fogEffect: true,
                rainEffect: true,
                snowEffect: true,
                windEffect: true,
                dayNightCycle: true,
                lighting: true,
                shadowsQuality: 'ultra',
                removeBackground: true
            }
        };
        
        // Текстуры игры
        this.textures = {
            player: {
                front: null,
                back: null,
                side: null
            },
            buildings: {
                sawmill: null,
                quarry: null,
                bank: null,
                tower: null,
                cannon: null,
                workshop: null,
                torture_chamber: null,
                smeltery: null,
                deep_quarry: null,
                blacksmith: null
            },
            enemies: {
                wolf: null,
                robber: null,
                marauder: null,
                boss: null
            },
            projectiles: {
                arrow: null,
                cannonball: null
            },
            maps: {},
            processed: {},
            loaded: false
        };
        
        // Статистика загрузки текстур
        this.texturesLoaded = 0;
        this.totalTextures = 0;
        this.allTexturesLoaded = false;
        
        // Система частиц
        this.particles = [];
        
        // Система погоды
        this.weather = {
            fog: {
                particles: [],
                density: 0.3,
                color: 'rgba(200, 220, 255, 0.1)',
                speed: 0.5,
                depth: 2
            },
            rain: {
                particles: [],
                density: 100,
                color: 'rgba(100, 150, 255, 0.6)',
                speed: 8,
                wind: 1.0
            },
            snow: {
                particles: [],
                density: 50,
                color: 'rgba(255, 255, 255, 0.8)',
                speed: 2,
                wind: 0.5
            },
            wind: {
                strength: 0,
                direction: 0,
                particles: []
            },
            currentEffect: 'none',
            intensity: 0.5,
            time: 0,
            temperature: 20
        };
        
        // Система освещения
        this.lighting = {
            dayColor: [255, 255, 255],
            nightColor: [100, 100, 150],
            currentColor: [255, 255, 255],
            ambient: 1.0,
            timeOfDay: 0.5,
            cycleSpeed: 0.0001,
            stars: Array.from({ length: 50 }, () => ({
                x: Math.random() * 900,
                y: Math.random() * 250,
                phase: Math.random() * Math.PI * 2
            }))
        };
        
        // Эффекты пост-обработки
        this.postProcessing = {
            bloomBuffer: null,
            blurBuffer: null,
            bloomIntensity: 0.5,
            bloomThreshold: 0.7,
            blurAmount: 2
        };
        
        // Состояние игры
        this.gameState = {
            time: 0,
            isNight: false,
            currentMap: 'forest'
        };
        
        // Баланс игры
        this.balance = {
            buildings: {
                sawmill: { color: "#8B4513" },
                quarry: { color: "#696969" },
                bank: { color: "#FFD700" },
                tower: { color: "#808080" },
                cannon: { color: "#8B0000" },
                workshop: { 
                    color: "#4A90E2",
                    production: { upgradeDiscount: [0.01, 0.04, 0.10] }
                },
                torture_chamber: { 
                    color: "#800080", 
                    radius: 300,
                    production: { slowEffect: [0.01, 0.04, 0.10] }
                },
                smeltery: { color: "#B22222" },
                deep_quarry: { color: "#2F4F4F" },
                blacksmith: { color: "#D2691E" }
            }
        };
        
        this.initPostProcessing();
    }
    
    // ======================= СИСТЕМА УДАЛЕНИЯ ФОНА =======================
    
    removeBackgroundFromTexture(image, threshold = 50, backgroundColor = [0, 0, 0]) {
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        
        tempCanvas.width = image.width;
        tempCanvas.height = image.height;
        tempCtx.drawImage(image, 0, 0);
        
        const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        const data = imageData.data;
        
        const bgR = backgroundColor[0];
        const bgG = backgroundColor[1];
        const bgB = backgroundColor[2];
        
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            const diff = Math.sqrt(
                Math.pow(r - bgR, 2) +
                Math.pow(g - bgG, 2) +
                Math.pow(b - bgB, 2)
            );
            
            if (diff < threshold) {
                data[i + 3] = 0;
            }
        }
        
        tempCtx.putImageData(imageData, 0, 0);
        return tempCanvas;
    }
    
    detectBackgroundColor(image) {
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        
        tempCanvas.width = image.width;
        tempCanvas.height = image.height;
        tempCtx.drawImage(image, 0, 0);
        
        const corners = [
            {x: 0, y: 0},
            {x: image.width - 1, y: 0},
            {x: 0, y: image.height - 1},
            {x: image.width - 1, y: image.height - 1}
        ];
        
        let totalR = 0, totalG = 0, totalB = 0;
        
        corners.forEach(corner => {
            const pixelData = tempCtx.getImageData(corner.x, corner.y, 1, 1).data;
            totalR += pixelData[0];
            totalG += pixelData[1];
            totalB += pixelData[2];
        });
        
        return [
            Math.round(totalR / corners.length),
            Math.round(totalG / corners.length),
            Math.round(totalB / corners.length)
        ];
    }
    
    processTexture(category, name, image) {
        if (!this.settings.removeBackground || this.settings.textureQuality === 'low') {
            this.textures.processed[category] = this.textures.processed[category] || {};
            this.textures.processed[category][name] = image;
            return;
        }
        
        try {
            const backgroundColor = this.detectBackgroundColor(image);
            
            let threshold = 30;
            if (this.settings.textureQuality === 'medium') threshold = 40;
            if (this.settings.textureQuality === 'high') threshold = 50;
            if (this.settings.textureQuality === 'ultra') threshold = 60;
            
            const processedCanvas = this.removeBackgroundFromTexture(
                image, 
                threshold, 
                backgroundColor
            );
            
            const processedImage = new Image();
            processedImage.src = processedCanvas.toDataURL();
            
            this.textures.processed[category] = this.textures.processed[category] || {};
            this.textures.processed[category][name] = processedImage;
            
        } catch (error) {
            console.error(`Ошибка при обработке текстуры ${category}/${name}:`, error);
            this.textures.processed[category] = this.textures.processed[category] || {};
            this.textures.processed[category][name] = image;
        }
    }
    
    getProcessedTexture(category, name) {
        if (this.textures.processed[category] && this.textures.processed[category][name]) {
            return this.textures.processed[category][name];
        }
        return null;
    }
    
    // ======================= ЗАГРУЗКА ТЕКСТУР =======================
    
    async loadAllTextures() {
        const loadingStatus = document.getElementById('texture-loading-status');
        
        this.totalTextures = 3 + 11 + 4 + 2; // player + buildings + enemies + projectiles
        
        if (loadingStatus) {
            loadingStatus.textContent = `Загрузка текстур: 0/${this.totalTextures}`;
        }
        
        await this.loadPlayerTextures();
        await this.loadBuildingTextures();
        await this.loadEnemyTextures();
        await this.loadProjectileTextures();
        
        this.allTexturesLoaded = true;

        if (loadingStatus) {
            loadingStatus.textContent = `✅ Текстуры загружены: ${this.texturesLoaded}/${this.totalTextures}`;
            loadingStatus.style.color = '#4caf50';
        }
    }
    
    async loadPlayerTextures() {
        await this.loadTexture('textures/player/player_front.png', 'player', 'front');
        await this.loadTexture('textures/player/player_back.png', 'player', 'back');
        await this.loadTexture('textures/player/player_side.png', 'player', 'side');
    }
    
    async loadBuildingTextures() {
        const buildings = [
            'sawmill', 'quarry', 'bank', 'tower', 'cannon', 'workshop', 'torture_chamber',
            'smeltery', 'deep_quarry', 'blacksmith'
        ];
        
        for (const building of buildings) {
            await this.loadTexture(`textures/buildings/${building}.png`, 'buildings', building);
        }
    }
    
    async loadEnemyTextures() {
        const enemies = ['wolf', 'robber', 'marauder', 'boss'];
        
        for (const enemy of enemies) {
            await this.loadTexture(`textures/enemies/${enemy}.png`, 'enemies', enemy);
        }
    }
    
    async loadProjectileTextures() {
        await this.loadTexture('textures/projectiles/arrow.png', 'projectiles', 'arrow');
        await this.loadTexture('textures/projectiles/cannonball.png', 'projectiles', 'cannonball');
    }
    
    loadTexture(path, category, name) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                this.texturesLoaded++;
                const loadingStatus = document.getElementById('texture-loading-status');
                if (loadingStatus) {
                    loadingStatus.textContent = `Загрузка текстур: ${this.texturesLoaded}/${this.totalTextures}`;
                }
                
                if (!this.textures[category]) this.textures[category] = {};
                this.textures[category][name] = img;
                
                this.processTexture(category, name, img);
                resolve();
            };
            img.onerror = () => {
                this.texturesLoaded++;
                const loadingStatus = document.getElementById('texture-loading-status');
                if (loadingStatus) {
                    loadingStatus.textContent = `Загрузка текстур: ${this.texturesLoaded}/${this.totalTextures}`;
                }
                
                if (!this.textures[category]) this.textures[category] = {};
                this.textures[category][name] = null;
                resolve();
            };
            img.src = path;
        });
    }
    
    // ======================= ФУНКЦИИ ОТРИСОВКИ =======================
    
    drawPlayer(player) {
        const playerTexture = this.textures.player[player.direction];
        
        if (playerTexture && playerTexture.complete && this.settings.textureQuality !== 'low') {
            this.ctx.save();
            this.ctx.translate(player.x, player.y);
            
            if (player.direction === 'left') {
                this.ctx.scale(-1, 1);
            }
            
            if (this.settings.shadows) {
                this.drawShadow(player.x - 20, player.y - 20, 40, 40, 0.4);
            }
            
            const processedTexture = this.getProcessedTexture('player', player.direction);
            const textureToUse = processedTexture || playerTexture;
            
            this.ctx.drawImage(textureToUse, -20, -20, 40, 40);
            this.ctx.restore();
        } else {
            this.ctx.fillStyle = "#3a7bd5";
            if (this.settings.textureQuality === 'ultra') {
                const gradient = this.ctx.createRadialGradient(player.x, player.y, 0, player.x, player.y, 14);
                gradient.addColorStop(0, '#4a8bd5');
                gradient.addColorStop(0.5, '#3a7bd5');
                gradient.addColorStop(1, '#2a6bb5');
                this.ctx.fillStyle = gradient;
            }
            this.ctx.beginPath();
            this.ctx.arc(player.x, player.y, 14, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.fillStyle = "#1a5bb5";
            this.ctx.beginPath();
            this.ctx.arc(player.x - 4, player.y - 4, 3, 0, Math.PI * 2);
            this.ctx.arc(player.x + 4, player.y - 4, 3, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.strokeStyle = "#ffffff";
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(player.x, player.y, 16, 0, Math.PI * 2);
            this.ctx.stroke();
            
            if (this.settings.shadows) {
                this.drawShadow(player.x - 16, player.y - 16, 32, 32, 0.4);
            }
        }
        
        const playerHealthPercent = player.hp / player.maxHp;
        this.ctx.fillStyle = "#ff0000";
        this.ctx.fillRect(player.x - 20, player.y - 35, 40, 4);
        this.ctx.fillStyle = playerHealthPercent > 0.5 ? "#00ff00" : playerHealthPercent > 0.25 ? "#ffa500" : "#ff0000";
        this.ctx.fillRect(player.x - 20, player.y - 35, 40 * playerHealthPercent, 4);
        
        this.ctx.fillStyle = "#ffffff";
        this.ctx.beginPath();
        this.ctx.arc(player.x + player.dir.x * 18, player.y + player.dir.y * 18, 5, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    drawBuilding(b) {
        let size = 20 + b.lvl * 10;
        const building = this.balance.buildings[b.type];
        const buildingTexture = this.textures.buildings[b.type];
        
        if (buildingTexture && buildingTexture.complete && this.settings.textureQuality !== 'low') {
            this.ctx.save();
            this.ctx.translate(b.x, b.y);
            
            if (this.settings.shadows) {
                this.drawShadow(b.x - size/2, b.y - size/2, size, size, 0.4);
            }
            
            const processedTexture = this.getProcessedTexture('buildings', b.type);
            const textureToUse = processedTexture || buildingTexture;
            
            this.ctx.drawImage(textureToUse, -size/2, -size/2, size, size);
            
            this.ctx.strokeStyle = b.lvl === 1 ? "#aaa" : b.lvl === 2 ? "#ff9800" : "#ff5252";
            this.ctx.lineWidth = this.settings.textureQuality === 'ultra' ? 4 : 3;
            this.ctx.strokeRect(-size/2, -size/2, size, size);
            
            this.ctx.fillStyle = "#fff";
            this.ctx.font = "bold 12px Arial";
            this.ctx.textAlign = "center";
            this.ctx.fillText(`Lvl ${b.lvl}`, 0, -size/2 - 8);
            
            if (b.type === "workshop" && this.settings.textureQuality !== 'low') {
                const pulse = Math.sin(this.gameState.time * 0.05) * 0.3 + 0.7;
                this.ctx.strokeStyle = `rgba(74, 144, 226, ${0.4 * pulse})`;
                this.ctx.lineWidth = this.settings.textureQuality === 'ultra' ? 4 : 2;
                this.ctx.beginPath();
                this.ctx.arc(0, 0, size * 0.8, 0, Math.PI * 2);
                this.ctx.stroke();

                let discountPercent = 0;
                if (building.production && building.production.upgradeDiscount && b.lvl > 0) {
                    discountPercent = building.production.upgradeDiscount[Math.min(b.lvl - 1, 2)];
                }
                
                this.ctx.fillStyle = "#4A90E2";
                this.ctx.font = "bold 10px Arial";
                this.ctx.fillText(`${(discountPercent * 100).toFixed(0)}% скидка`, 0, size/2 + 15);
            }
            
            if (b.type === "torture_chamber" && this.settings.textureQuality !== 'low') {
                const pulse = Math.sin(this.gameState.time * 0.05) * 0.3 + 0.7;
                this.ctx.strokeStyle = `rgba(128, 0, 128, ${0.4 * pulse})`;
                this.ctx.lineWidth = this.settings.textureQuality === 'ultra' ? 4 : 2;
                this.ctx.beginPath();
                this.ctx.arc(0, 0, building.radius, 0, Math.PI * 2);
                this.ctx.stroke();

                let slowPercent = 0;
                if (building.production && building.production.slowEffect && b.lvl > 0) {
                    slowPercent = building.production.slowEffect[Math.min(b.lvl - 1, 2)];
                }
                
                this.ctx.fillStyle = "#800080";
                this.ctx.font = "bold 10px Arial";
                this.ctx.fillText(`${(slowPercent * 100).toFixed(0)}% замедление`, 0, size/2 + 15);
                
                if (this.settings.textureQuality === 'ultra') {
                    this.ctx.globalAlpha = 0.3 * pulse;
                    this.ctx.strokeStyle = "#800080";
                    this.ctx.lineWidth = 2;
                    this.ctx.beginPath();
                    this.ctx.arc(0, 0, building.radius * 0.8, 0, Math.PI * 2);
                    this.ctx.stroke();
                    this.ctx.globalAlpha = 1;
                }
            }
            
            if ((b.type === "tower" || b.type === "cannon") && this.settings.textureQuality !== 'low') {
                this.ctx.strokeStyle = this.settings.textureQuality === 'ultra' ? 
                    (b.type === "cannon" ? "rgba(255, 0, 0, 0.3)" : "rgba(255, 100, 100, 0.3)") : 
                    "rgba(255, 255, 255, 0.15)";
                this.ctx.lineWidth = this.settings.textureQuality === 'ultra' ? 3 : 2;
                this.ctx.beginPath();
                this.ctx.arc(0, 0, building.attackRange || 200, 0, Math.PI * 2);
                this.ctx.stroke();
                
                if (b.type === "cannon" && this.settings.textureQuality === 'ultra') {
                    this.ctx.strokeStyle = "rgba(255, 165, 0, 0.2)";
                    this.ctx.lineWidth = 2;
                    this.ctx.beginPath();
                    this.ctx.arc(0, 0, building.splashRadius || 60, 0, Math.PI * 2);
                    this.ctx.stroke();
                }
            }
            
            if (b.type === "smeltery" && this.settings.textureQuality !== 'low') {
                const firePulse = Math.sin(this.gameState.time * 0.1) * 0.3 + 0.7;
                this.ctx.fillStyle = `rgba(255, 69, 0, ${0.3 * firePulse})`;
                this.ctx.beginPath();
                this.ctx.arc(0, 0, size/2 + 2, 0, Math.PI * 2);
                this.ctx.fill();

                const t = this.gameState.time * 0.08;
                for (let i = 0; i < 3; i++) {
                    const phase = i * 2.09; // 2π/3
                    const flameSize = size / 4 * (0.55 + Math.sin(t + phase) * 0.2);
                    const flameX = Math.cos(t * 0.7 + phase) * size / 6;
                    const flameY = Math.sin(t * 0.5 + phase) * size / 6;
                    const alpha = 0.55 + Math.sin(t * 1.3 + phase) * 0.2;
                    this.ctx.fillStyle = `rgba(255, ${80 + Math.floor(Math.sin(t + phase) * 40)}, 0, ${alpha})`;
                    this.ctx.beginPath();
                    this.ctx.arc(flameX, flameY, flameSize, 0, Math.PI * 2);
                    this.ctx.fill();
                }
            }
            
            if (b.type === "deep_quarry" && this.settings.textureQuality !== 'low') {
                const stonePulse = Math.sin(this.gameState.time * 0.05) * 0.2 + 0.8;
                this.ctx.strokeStyle = `rgba(47, 79, 79, ${0.4 * stonePulse})`;
                this.ctx.lineWidth = this.settings.textureQuality === 'ultra' ? 4 : 2;
                this.ctx.beginPath();
                this.ctx.arc(0, 0, size * 1.2, 0, Math.PI * 2);
                this.ctx.stroke();

                for (let i = 0; i < 5; i++) {
                    const angle = (this.gameState.time * 0.01 + i * 0.4) % (Math.PI * 2);
                    const stoneX = Math.cos(angle) * size * 0.8;
                    const stoneY = Math.sin(angle) * size * 0.8;
                    
                    this.ctx.fillStyle = "#696969";
                    this.ctx.beginPath();
                    this.ctx.arc(stoneX, stoneY, 3, 0, Math.PI * 2);
                    this.ctx.fill();
                }
            }
            
            if (b.type === "blacksmith" && this.settings.textureQuality !== 'low') {
                const forgePulse = Math.sin(this.gameState.time * 0.08) * 0.3 + 0.7;
                this.ctx.strokeStyle = `rgba(210, 105, 30, ${0.4 * forgePulse})`;
                this.ctx.lineWidth = this.settings.textureQuality === 'ultra' ? 4 : 2;
                this.ctx.beginPath();
                this.ctx.arc(0, 0, building.radius || 400, 0, Math.PI * 2);
                this.ctx.stroke();

                for (let i = 0; i < 3; i++) {
                    const sparkAngle = (this.gameState.time * 0.02 + i * 1.2) % (Math.PI * 2);
                    const sparkDist = size/2 + Math.sin(this.gameState.time * 0.03 + i) * 5;
                    const sparkX = Math.cos(sparkAngle) * sparkDist;
                    const sparkY = Math.sin(sparkAngle) * sparkDist;
                    
                    this.ctx.fillStyle = "#FFD700";
                    this.ctx.beginPath();
                    this.ctx.arc(sparkX, sparkY, 2, 0, Math.PI * 2);
                    this.ctx.fill();
                }
            }
            
            this.ctx.restore();
        } else {
            if (this.settings.shadows) {
                this.drawShadow(b.x - size/2, b.y - size/2, size, size, 0.4);
            }
            
            this.ctx.fillStyle = building?.color || "#8B4513";
            this.ctx.fillRect(b.x - size/2, b.y - size/2, size, size);
            
            this.ctx.fillStyle = building?.color === "#FFD700" ? "#B8860B" : building?.color || "#8B4513";
            this.ctx.fillRect(b.x - size/2 + 2, b.y - size/2 + 2, size - 4, 4);
            this.ctx.fillRect(b.x - size/2 + 2, b.y + size/2 - 6, size - 4, 4);
            
            this.ctx.fillStyle = b.type === 'bank' ? '#ffff00' : 
                               b.type === 'workshop' ? '#4A90E2' : 
                               b.type === 'torture_chamber' ? '#800080' :
                               b.type === 'smeltery' ? '#FF4500' :
                               b.type === 'deep_quarry' ? '#2F4F4F' :
                               b.type === 'blacksmith' ? '#D2691E' : '#ffffff';
            const windowCount = b.lvl + 1;
            for(let i = 0; i < windowCount; i++) {
                const windowSize = 3;
                const windowX = b.x - size/2 + 5 + (i * (size - 10) / windowCount);
                const windowY = b.type === 'workshop' || b.type === 'torture_chamber' ? b.y : b.y - size/4;
                this.ctx.fillRect(windowX, windowY, windowSize, windowSize);
            }
            
            this.ctx.strokeStyle = b.lvl === 1 ? "#aaa" : b.lvl === 2 ? "#ff9800" : "#ff5252";
            this.ctx.lineWidth = this.settings.textureQuality === 'ultra' ? 4 : 3;
            this.ctx.strokeRect(b.x - size/2, b.y - size/2, size, size);
            
            this.ctx.fillStyle = "#000";
            this.ctx.font = "bold 16px Arial";
            this.ctx.textAlign = "center";
            const symbol = this.getBuildingSymbol(b.type);
            this.ctx.fillText(symbol, b.x, b.y + 6);
            
            this.ctx.fillStyle = "#fff";
            this.ctx.font = "bold 12px Arial";
            this.ctx.fillText(`Lvl ${b.lvl}`, b.x, b.y - size/2 - 8);
            
            if (b.type === "workshop") {
                let discountPercent = 0;
                if (building.production && building.production.upgradeDiscount && b.lvl > 0) {
                    discountPercent = building.production.upgradeDiscount[Math.min(b.lvl - 1, 2)];
                }
                
                this.ctx.fillStyle = "#4A90E2";
                this.ctx.font = "bold 10px Arial";
                this.ctx.fillText(`${(discountPercent * 100).toFixed(0)}% скидка`, b.x, b.y + size/2 + 15);
            }
            
            if (b.type === "torture_chamber") {
                // Получаем замедление в зависимости от уровня здания
                let slowPercent = 0;
                if (building.production && building.production.slowEffect && b.lvl > 0) {
                    slowPercent = building.production.slowEffect[Math.min(b.lvl - 1, 2)];
                }
                
                this.ctx.fillStyle = "#800080";
                this.ctx.font = "bold 10px Arial";
                this.ctx.fillText(`${(slowPercent * 100).toFixed(0)}% замедление`, b.x, b.y + size/2 + 15);
            }
            
            if (b.type === "smeltery") {
                this.ctx.fillStyle = "#B22222";
                this.ctx.font = "bold 10px Arial";
                this.ctx.fillText(`Железо: ${b.lvl}/сек`, b.x, b.y + size/2 + 15);
            }
            
            if (b.type === "deep_quarry") {
                this.ctx.fillStyle = "#2F4F4F";
                this.ctx.font = "bold 10px Arial";
                this.ctx.fillText(`Камень: ${b.lvl * 10}/сек`, b.x, b.y + size/2 + 15);
            }
            
            if (b.type === "blacksmith") {
                this.ctx.fillStyle = "#D2691E";
                this.ctx.font = "bold 10px Arial";
                // Получаем бонус урона в зависимости от уровня здания
                let damageBonus = 0;
                if (building.production && building.production.damageBonus && b.lvl > 0) {
                    damageBonus = building.production.damageBonus[Math.min(b.lvl - 1, 2)];
                }
                this.ctx.fillText(`Урон: +${(damageBonus * 100).toFixed(0)}%`, b.x, b.y + size/2 + 15);
            }
        }
    }
    
    drawEnemy(e) {
        const enemyTexture = this.textures.enemies[e.type];
        
        if (enemyTexture && enemyTexture.complete && this.settings.textureQuality !== 'low') {
            this.ctx.save();
            this.ctx.translate(e.x, e.y);

            if (this.settings.shadows) {
                const shadowSize = e.type === 'boss' ? 50 : e.type === 'marauder' ? 32 : e.type === 'robber' ? 28 : 24;
                this.drawShadow(e.x - shadowSize/2, e.y - shadowSize/2, shadowSize, shadowSize, 0.4);
            }

            let healthPercent = e.hp / e.maxHp;
            const healthWidth = e.type === 'boss' ? 60 : 40;
            
            this.ctx.fillStyle = "#ff0000";
            this.ctx.fillRect(-healthWidth/2, -30, healthWidth, 5);
            this.ctx.fillStyle = healthPercent > 0.5 ? "#00ff00" : healthPercent > 0.25 ? "#ffa500" : "#ff0000";
            this.ctx.fillRect(-healthWidth/2, -30, healthWidth * healthPercent, 5);

            const size = e.type === 'boss' ? 50 : e.type === 'marauder' ? 32 : e.type === 'robber' ? 28 : 24;
            
            const processedTexture = this.getProcessedTexture('enemies', e.type);
            const textureToUse = processedTexture || enemyTexture;
            
            this.ctx.drawImage(textureToUse, -size/2, -size/2, size, size);
            
            if (e.type === "boss") {
                const pulse = Math.sin(this.gameState.time * 0.1) * 0.3 + 0.7;
                this.ctx.strokeStyle = `rgba(255, 215, 0, ${0.4 * pulse})`;
                this.ctx.lineWidth = 5;
                this.ctx.beginPath();
                this.ctx.arc(0, 0, 30, 0, Math.PI * 2);
                this.ctx.stroke();
            }
            
            if (e.slowEffect && e.slowEffect > 0) {
                this.ctx.globalAlpha = 0.5;
                this.ctx.fillStyle = "#800080";
                this.ctx.beginPath();
                this.ctx.arc(0, 0, size/2 + 2, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.globalAlpha = 1;
            }
            
            this.ctx.restore();
        } else {
            this.ctx.save();
            this.ctx.translate(e.x, e.y);

            if (this.settings.shadows) {
                const shadowSize = e.type === 'boss' ? 44 : e.type === 'marauder' ? 32 : e.type === 'robber' ? 28 : 24;
                this.drawShadow(e.x - shadowSize/2, e.y - shadowSize/2, shadowSize, shadowSize, 0.4);
            }

            let healthPercent = e.hp / e.maxHp;
            const healthWidth = e.type === 'boss' ? 60 : 40;
            
            this.ctx.fillStyle = "#ff0000";
            this.ctx.fillRect(-healthWidth/2, -30, healthWidth, 5);
            this.ctx.fillStyle = healthPercent > 0.5 ? "#00ff00" : healthPercent > 0.25 ? "#ffa500" : "#ff0000";
            this.ctx.fillRect(-healthWidth/2, -30, healthWidth * healthPercent, 5);

            this.ctx.fillStyle = e.type === 'wolf' ? '#6b8e23' : 
                                e.type === 'robber' ? '#b22222' : 
                                e.type === 'marauder' ? '#daa520' : 
                                '#dc143c';
            
            const size = e.type === 'boss' ? 22 : e.type === 'marauder' ? 16 : e.type === 'robber' ? 14 : 12;
            
            if (e.type === 'boss') {
                this.ctx.beginPath();
                this.ctx.arc(0, 0, size, 0, Math.PI * 2);
                this.ctx.fill();
                
                const pulse = Math.sin(this.gameState.time * 0.1) * 0.3 + 0.7;
                this.ctx.strokeStyle = `rgba(255, 215, 0, ${0.4 * pulse})`;
                this.ctx.lineWidth = 5;
                this.ctx.beginPath();
                this.ctx.arc(0, 0, 30, 0, Math.PI * 2);
                this.ctx.stroke();
            } else {
                this.ctx.beginPath();
                this.ctx.arc(0, 0, size, 0, Math.PI * 2);
                this.ctx.fill();
            }
            
            if (e.slowEffect && e.slowEffect > 0) {
                this.ctx.globalAlpha = 0.5;
                this.ctx.fillStyle = "#800080";
                this.ctx.beginPath();
                this.ctx.arc(0, 0, size + 1, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.globalAlpha = 1;
            }
            
            this.ctx.restore();
        }
    }
    
    drawArrow(a) {
        const arrowTexture = this.textures.projectiles.arrow;
        
        if (arrowTexture && arrowTexture.complete && this.settings.textureQuality !== 'low') {
            this.ctx.save();
            this.ctx.translate(a.x, a.y);
            
            const angle = Math.atan2(a.tx.y - a.y, a.tx.x - a.x);
            this.ctx.rotate(angle);
            
            const processedTexture = this.getProcessedTexture('projectiles', 'arrow');
            const textureToUse = processedTexture || arrowTexture;
            
            this.ctx.drawImage(textureToUse, -20, -6, 40, 12);
            
            if (a.color !== "#eee") {
                this.ctx.globalAlpha = 0.3;
                this.ctx.fillStyle = a.color === "#ff5252" ? "#ff0000" : a.color === "#ff9800" ? "#ff6600" : "#ccc";
                this.ctx.fillRect(-5, -5, 25, 10);
                this.ctx.globalAlpha = 1;
            }
            
            this.ctx.restore();
        } else {
            this.ctx.fillStyle = a.color || "#eee";
            this.ctx.save();
            this.ctx.translate(a.x, a.y);
            this.ctx.rotate(Math.atan2(a.tx.y - a.y, a.tx.x - a.x));
            
            this.ctx.fillRect(0, -1, 18, 2);
            this.ctx.fillStyle = a.color === "#ff5252" ? "#ff0000" : a.color === "#ff9800" ? "#ff6600" : "#ccc";
            this.ctx.beginPath();
            this.ctx.moveTo(18, -3);
            this.ctx.lineTo(24, 0);
            this.ctx.lineTo(18, 3);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.fillStyle = a.color === "#ff5252" ? "#ff4444" : a.color === "#ff9800" ? "#ffaa44" : "#ddd";
            this.ctx.fillRect(-2, -2, 4, 4);
            
            this.ctx.restore();
        }
    }
    
    drawCannonBall(cb) {
        const cannonballTexture = this.textures.projectiles.cannonball;
        
        if (cannonballTexture && cannonballTexture.complete && this.settings.textureQuality !== 'low') {
            this.ctx.save();
            this.ctx.translate(cb.x, cb.y);
            
            const processedTexture = this.getProcessedTexture('projectiles', 'cannonball');
            const textureToUse = processedTexture || cannonballTexture;
            
            this.ctx.drawImage(textureToUse, -8, -8, 16, 16);
            
            this.ctx.restore();
        } else {
            this.ctx.fillStyle = "#8B0000";
            this.ctx.save();
            this.ctx.translate(cb.x, cb.y);
            
            this.ctx.beginPath();
            this.ctx.arc(0, 0, 6, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        }
    }
    
    // ======================= СИСТЕМА ЧАСТИЦ =======================
    
    createParticle(x, y, type) {
        if (this.particles.length >= Math.min(this.settings.maxParticles, 100)) {
            if (this.particles.length > 0) {
                this.particles.shift();
            }
        }
        
        const particle = {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4 - 2,
            life: 1.0,
            decay: 0.02 + Math.random() * 0.03,
            size: Math.random() * 3 + 2,
            color: type === 'blood' ? '#ff0000' : 
                   type === 'spark' ? '#ffff00' : 
                   type === 'magic' ? '#00ffff' : 
                   type === 'explosion' ? '#ff8800' : 
                   type === 'slow' ? '#800080' : '#ffffff'
        };
        
        this.particles.push(particle);
    }
    
    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1;
            p.life -= p.decay;
            
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    drawParticles() {
        if (!this.settings.particles) return;
        
        this.particles.forEach(p => {
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = p.color;
            
            if (this.settings.textureQuality === 'ultra') {
                const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
                gradient.addColorStop(0, p.color);
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fill();
            } else {
                this.ctx.fillRect(p.x - p.size/2, p.y - p.size/2, p.size, p.size);
            }
            
            this.ctx.globalAlpha = 1;
        });
    }
    
    // ======================= ОТРИСОВКА КАРТЫ =======================
    
    drawMap() {
        this.ctx.fillStyle = '#111';
        this.ctx.fillRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
        
        const texture = this.textures.maps[this.gameState.currentMap];
        if (texture && texture.complete && texture.naturalWidth > 0) {
            this.ctx.drawImage(texture, 0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
            
            if (this.settings.textureQuality !== 'low') {
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
                this.ctx.fillRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
            }
        } else {
            const mapColors = {
                'forest': '#2e7d32',
                'desert': '#d2b48c',
                'mountains': '#708090',
                'meadows': '#90ee90',
                'jungle': '#228b22',
                'winter': '#ffffff',
                'volcano': '#ff4500',
                'swamp': '#556b2f',
                'autumn': '#d2691e',
                'steppe': '#bdb76b',
                'coastal': '#87ceeb',
                'ruins': '#a9a9a9',
                'canyon': '#8b4513',
                'lava': '#ff4500',
                'cloud': '#f0f8ff',
                'cherry': '#ffb6c1',
                'dark': '#2f4f4f',
                'heaven': '#f0f8ff'
            };
            
            this.ctx.fillStyle = mapColors[this.gameState.currentMap] || '#111';
            this.ctx.fillRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
        }
    }
    
    // ======================= ПОБЕДА/ПОРАЖЕНИЕ =======================
    
    drawVictoryScreen(waveNumber, bossKilled, totalBosses) {
        this.ctx.fillStyle = "rgba(0, 255, 0, 0.3)";
        this.ctx.fillRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
        
        this.ctx.fillStyle = "#fff";
        this.ctx.font = "bold 40px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("🎉 ПОБЕДА!", this.GAME_WIDTH/2, this.GAME_HEIGHT/2 - 40);
        this.ctx.font = "28px Arial";
        this.ctx.fillText(`Пройдено ${waveNumber} волн`, this.GAME_WIDTH/2, this.GAME_HEIGHT/2);
        this.ctx.fillText(`Убито ${bossKilled} боссов`, this.GAME_WIDTH/2, this.GAME_HEIGHT/2 + 40);
    }
    
    drawGameOverScreen(waveNumber, bossKilled, totalBosses) {
        this.ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
        this.ctx.fillRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
        
        this.ctx.fillStyle = "#fff";
        this.ctx.font = "bold 40px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("💀 ПОРАЖЕНИЕ", this.GAME_WIDTH/2, this.GAME_HEIGHT/2 - 40);
        this.ctx.font = "28px Arial";
        this.ctx.fillText(`Волна: ${waveNumber}`, this.GAME_WIDTH/2, this.GAME_HEIGHT/2);
        this.ctx.fillText(`Боссы: ${bossKilled}/${totalBosses}`, this.GAME_WIDTH/2, this.GAME_HEIGHT/2 + 40);
    }
    
    // ======================= ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =======================
    
    getBuildingSymbol(type) {
        const symbols = {
            'sawmill': '🌲',
            'quarry': '⛏',
            'bank': '💰',
            'tower': '🏹',
            'cannon': '🗡️',
            'workshop': '🔧',
            'torture_chamber': '⛓️',
            'smeltery': '🔥',
            'deep_quarry': '🏭',
            'blacksmith': '🔨'
        };
        return symbols[type] || '🏠';
    }
    
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
    }
    
    // ======================= УПРАВЛЕНИЕ НАСТРОЙКАМИ =======================
    
    setPreset(preset) {
        if (this.presets[preset]) {
            this.settings = { ...this.presets[preset], preset: preset };
            this.applySettings();
            return true;
        }
        return false;
    }
    
    applySettings() {
        if (this.settings.antiAliasing) {
            this.canvas.style.imageRendering = 'auto';
        } else {
            this.canvas.style.imageRendering = 'crisp-edges';
        }
        
        this.initWeatherSystem();
        this.initPostProcessing();
        
    }
    
    updateSetting(key, value) {
        this.settings[key] = value;
        if (key === 'weatherEffects') {
            this.initWeatherSystem();
        }
    }
    
    // ======================= СИСТЕМА ПОГОДЫ =======================
    
    initWeatherSystem() {
        if (!this.settings.weatherEffects) {
            this.weather.currentEffect = 'none';
            return;
        }
        
        this.initWeatherParticles();
    }
    
    initWeatherParticles() {
        this.weather.fog.particles = [];
        this.weather.rain.particles = [];
        this.weather.snow.particles = [];
        this.weather.wind.particles = [];
        
        if (this.settings.fogEffect) {
            const fogCount = Math.floor(this.GAME_WIDTH * this.GAME_HEIGHT * 0.0001 * this.weather.fog.density);
            for (let i = 0; i < fogCount; i++) {
                this.weather.fog.particles.push({
                    x: Math.random() * this.GAME_WIDTH,
                    y: Math.random() * this.GAME_HEIGHT,
                    z: Math.random() * this.weather.fog.depth,
                    size: Math.random() * 30 + 10,
                    speed: Math.random() * 0.5 + 0.2,
                    opacity: Math.random() * 0.2 + 0.05,
                    drift: Math.random() * 0.2 - 0.1
                });
            }
        }
        
        if (this.settings.rainEffect) {
            const rainCount = this.weather.rain.density;
            for (let i = 0; i < rainCount; i++) {
                this.weather.rain.particles.push({
                    x: Math.random() * this.GAME_WIDTH,
                    y: Math.random() * this.GAME_HEIGHT * 2 - this.GAME_HEIGHT,
                    length: Math.random() * 8 + 4,
                    speed: Math.random() * 2 + this.weather.rain.speed,
                    opacity: Math.random() * 0.3 + 0.3
                });
            }
        }
        
        if (this.settings.snowEffect) {
            const snowCount = this.weather.snow.density;
            for (let i = 0; i < snowCount; i++) {
                this.weather.snow.particles.push({
                    x: Math.random() * this.GAME_WIDTH,
                    y: Math.random() * this.GAME_HEIGHT,
                    size: Math.random() * 3 + 1,
                    speed: Math.random() * 1 + this.weather.snow.speed,
                    sway: Math.random() * 0.5 - 0.25,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: Math.random() * 0.1 - 0.05,
                    opacity: Math.random() * 0.5 + 0.3
                });
            }
        }
        
        if (this.settings.windEffect) {
            this.weather.wind.strength = Math.random() * 2 - 1;
            this.weather.wind.direction = Math.random() * Math.PI * 2;
            
            const windCount = 20;
            for (let i = 0; i < windCount; i++) {
                this.weather.wind.particles.push({
                    x: Math.random() * this.GAME_WIDTH,
                    y: Math.random() * this.GAME_HEIGHT,
                    size: Math.random() * 10 + 5,
                    speed: Math.random() * 3 + 1,
                    direction: this.weather.wind.direction + (Math.random() * 0.5 - 0.25),
                    opacity: Math.random() * 0.2 + 0.1
                });
            }
        }
    }
    
    updateWeather(time) {
        this.weather.time = time;
        
        if (this.settings.dayNightCycle) {
            this.updateDayNightCycle();
        }
        
        this.weather.temperature = 15 + 10 * Math.sin(time * 0.0001);
        
        if (this.settings.weatherEffects) {
            if (this.weather.temperature < 0) {
                this.weather.currentEffect = 'snow';
                this.weather.intensity = Math.min(1, (0 - this.weather.temperature) / 10);
            } else if (this.weather.temperature < 10) {
                this.weather.currentEffect = 'rain';
                this.weather.intensity = Math.min(1, (10 - this.weather.temperature) / 10);
            } else {
                this.weather.currentEffect = Math.random() > 0.7 ? 'fog' : 'none';
                this.weather.intensity = Math.random() * 0.5;
            }
            
            this.updateWeatherParticles();
        }
    }
    
    updateDayNightCycle() {
        this.lighting.timeOfDay = (this.lighting.timeOfDay + this.lighting.cycleSpeed) % 1;
        
        const time = this.lighting.timeOfDay;
        let dayFactor;
        
        if (time < 0.25) {
            dayFactor = time * 4;
        } else if (time < 0.75) {
            dayFactor = 1;
        } else {
            dayFactor = (1 - time) * 4;
        }
        
        for (let i = 0; i < 3; i++) {
            this.lighting.currentColor[i] = 
                this.lighting.dayColor[i] * dayFactor + 
                this.lighting.nightColor[i] * (1 - dayFactor);
        }
        
        this.lighting.ambient = 0.3 + dayFactor * 0.7;
        this.gameState.isNight = time < 0.25 || time > 0.75;
    }
    
    updateWeatherParticles() {
        this.weather.fog.particles.forEach(p => {
            p.x += p.speed * 0.1 + p.drift;
            p.y += p.speed * 0.05;
            
            if (p.x > this.GAME_WIDTH + 100) p.x = -100;
            if (p.x < -100) p.x = this.GAME_WIDTH + 100;
            if (p.y > this.GAME_HEIGHT + 100) p.y = -100;
            if (p.y < -100) p.y = this.GAME_HEIGHT + 100;
            
            p.opacity = 0.05 + Math.sin(this.weather.time * 0.001 + p.x * 0.01) * 0.1;
        });
        
        if (this.weather.currentEffect === 'rain' && this.settings.rainEffect) {
            this.weather.rain.particles.forEach(p => {
                p.y += p.speed;
                p.x += this.weather.wind.strength * 2;
                
                if (p.y > this.GAME_HEIGHT + 20) {
                    p.y = Math.random() * 100 - 100;
                    p.x = Math.random() * this.GAME_WIDTH;
                }
            });
        }
        
        if (this.weather.currentEffect === 'snow' && this.settings.snowEffect) {
            this.weather.snow.particles.forEach(p => {
                p.y += p.speed * 0.5;
                p.x += Math.sin(this.weather.time * 0.001 + p.y * 0.01) * p.sway + this.weather.wind.strength;
                p.rotation += p.rotationSpeed;
                
                if (p.y > this.GAME_HEIGHT + 20) {
                    p.y = -10;
                    p.x = Math.random() * this.GAME_WIDTH;
                }
            });
        }
        
        if (this.settings.windEffect) {
            this.weather.wind.particles.forEach(p => {
                p.x += Math.cos(p.direction) * p.speed;
                p.y += Math.sin(p.direction) * p.speed;
                
                if (p.x < -50 || p.x > this.GAME_WIDTH + 50 || 
                    p.y < -50 || p.y > this.GAME_HEIGHT + 50) {
                    p.x = Math.random() * this.GAME_WIDTH;
                    p.y = Math.random() * this.GAME_HEIGHT;
                }
            });
            
            this.weather.wind.strength += (Math.random() - 0.5) * 0.05;
            this.weather.wind.strength = Math.max(-1, Math.min(1, this.weather.wind.strength));
        }
    }
    
    drawWeather() {
        if (!this.settings.weatherEffects) return;
        
        const ctx = this.ctx;
        const intensity = this.weather.intensity;
        
        if (this.settings.fogEffect && this.weather.fog.particles.length > 0) {
            ctx.save();
            this.weather.fog.particles.forEach(p => {
                ctx.globalAlpha = p.opacity * intensity;
                ctx.fillStyle = this.weather.fog.color;
                
                if (this.settings.textureQuality === 'ultra') {
                    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
                    gradient.addColorStop(0, `rgba(200, 220, 255, ${p.opacity * 0.8})`);
                    gradient.addColorStop(1, `rgba(200, 220, 255, 0)`);
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    ctx.fillRect(p.x - p.size/2, p.y - p.size/2, p.size, p.size);
                }
            });
            ctx.restore();
        }
        
        if (this.weather.currentEffect === 'rain' && this.settings.rainEffect) {
            ctx.save();
            ctx.strokeStyle = this.weather.rain.color;
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';
            
            this.weather.rain.particles.forEach(p => {
                ctx.globalAlpha = p.opacity * intensity;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x + this.weather.wind.strength * 3, p.y + p.length);
                ctx.stroke();
            });
            ctx.restore();
        }
        
        if (this.weather.currentEffect === 'snow' && this.settings.snowEffect) {
            ctx.save();
            this.weather.snow.particles.forEach(p => {
                ctx.globalAlpha = p.opacity * intensity;
                ctx.fillStyle = this.weather.snow.color;
                
                if (this.settings.textureQuality === 'ultra') {
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rotation);
                    ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
                    ctx.restore();
                } else {
                    ctx.fillRect(p.x - p.size/2, p.y - p.size/2, p.size, p.size);
                }
            });
            ctx.restore();
        }
        
        if (this.settings.windEffect && Math.abs(this.weather.wind.strength) > 0.3) {
            ctx.save();
            ctx.strokeStyle = `rgba(255, 255, 255, ${Math.abs(this.weather.wind.strength) * 0.1})`;
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 10]);
            
            for (let i = 0; i < 10; i++) {
                const y = i * (this.GAME_HEIGHT / 10);
                ctx.beginPath();
                ctx.moveTo(0, y);
                const curve = Math.sin(this.weather.time * 0.001 + i) * 20;
                ctx.bezierCurveTo(
                    this.GAME_WIDTH/4, y + curve,
                    this.GAME_WIDTH/2, y - curve,
                    this.GAME_WIDTH, y
                );
                ctx.stroke();
            }
            ctx.restore();
        }
    }
    
    // ======================= СИСТЕМА ОСВЕЩЕНИЯ =======================
    
    applyLighting() {
        if (!this.settings.lighting) return;
        
        const ctx = this.ctx;
        const [r, g, b] = this.lighting.currentColor;
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.3 * (1 - this.lighting.ambient)})`;
        ctx.fillRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
        
        if (this.settings.textureQuality !== 'low') {
            const time = this.lighting.timeOfDay;
            const sunX = time * this.GAME_WIDTH;
            const sunY = Math.sin(time * Math.PI) * 100 + 50;
            
            ctx.save();
            if (time < 0.25 || time > 0.75) {
                ctx.fillStyle = `rgba(255, 255, 200, ${0.3 * this.lighting.ambient})`;
                ctx.beginPath();
                ctx.arc(sunX, sunY, 15, 0, Math.PI * 2);
                ctx.fill();
                
                if (this.settings.textureQuality === 'ultra' && (time > 0.8 || time < 0.2)) {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                    for (const star of this.lighting.stars) {
                        const twinkle = Math.sin(this.weather.time * 0.001 + star.phase) * 0.5 + 0.5;
                        ctx.globalAlpha = twinkle * 0.5;
                        ctx.fillRect(star.x, star.y, 1, 1);
                    }
                    ctx.globalAlpha = 1;
                }
            } else {
                const gradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 40);
                gradient.addColorStop(0, `rgba(255, 255, 200, ${0.8 * this.lighting.ambient})`);
                gradient.addColorStop(1, `rgba(255, 255, 200, 0)`);
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(sunX, sunY, 40, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    }
    
    // ======================= СИСТЕМА ТЕНЕЙ =======================
    
    drawShadow(x, y, width, height, alpha = 0.3) {
        if (!this.settings.shadows || this.settings.shadowsQuality === 'off') return;
        
        const ctx = this.ctx;
        ctx.save();
        
        switch (this.settings.shadowsQuality) {
            case 'low':
                ctx.fillStyle = `rgba(0, 0, 0, ${alpha * 0.5})`;
                ctx.fillRect(x + 3, y + 3, width, height);
                break;
                
            case 'medium':
                ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
                ctx.beginPath();
                ctx.ellipse(x + width/2 + 2, y + height/2 + 2, width/2, height/4, 0, 0, Math.PI * 2);
                ctx.fill();
                break;
                
            case 'high':
            case 'ultra':
                const gradient = ctx.createRadialGradient(
                    x + width/2, y + height/2, 0,
                    x + width/2, y + height/2, width
                );
                gradient.addColorStop(0, `rgba(0, 0, 0, ${alpha})`);
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(x + width/2, y + height/2, width/2, 0, Math.PI * 2);
                ctx.fill();
                break;
        }
        
        ctx.restore();
    }
    
    // ======================= ЭФФЕКТЫ ПОСТ-ОБРАБОТКИ =======================
    
    initPostProcessing() {
        if (this.settings.bloom || this.settings.postProcessing) {
            this.postProcessing.bloomBuffer = document.createElement('canvas');
            this.postProcessing.bloomBuffer.width = this.GAME_WIDTH / 2;
            this.postProcessing.bloomBuffer.height = this.GAME_HEIGHT / 2;
            
            this.postProcessing.blurBuffer = document.createElement('canvas');
            this.postProcessing.blurBuffer.width = this.GAME_WIDTH / 2;
            this.postProcessing.blurBuffer.height = this.GAME_HEIGHT / 2;
        }
    }
    
    applyPostProcessing() {
        if (!this.settings.postProcessing && !this.settings.bloom) return;
        
        if (this.settings.bloom) {
            this.applyBloomEffect();
        }
        
        if (this.settings.postProcessing && this.settings.textureQuality === 'ultra') {
            this.applyDepthOfField();
        }
    }
    
    applyBloomEffect() {
        const buf = this.postProcessing.bloomBuffer;
        if (!buf) return;

        // Рисуем сцену в буфер 1/2 размера (быстро) и применяем blur там
        const bCtx = buf.getContext('2d');
        bCtx.clearRect(0, 0, buf.width, buf.height);
        bCtx.filter = `blur(${this.postProcessing.blurAmount}px) brightness(2)`;
        bCtx.drawImage(this.canvas, 0, 0, buf.width, buf.height);
        bCtx.filter = 'none';

        // Накладываем размытый буфер на основной canvas в режиме screen
        const ctx = this.ctx;
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.globalAlpha = this.postProcessing.bloomIntensity * 0.4;
        ctx.drawImage(buf, 0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
        ctx.restore();
    }
    
    applyDepthOfField() {
        const ctx = this.ctx;
        const gradient = ctx.createRadialGradient(
            this.GAME_WIDTH / 2, this.GAME_HEIGHT / 2, this.GAME_HEIGHT * 0.25,
            this.GAME_WIDTH / 2, this.GAME_HEIGHT / 2, this.GAME_HEIGHT * 0.85
        );
        gradient.addColorStop(0, 'rgba(0,0,0,0)');
        gradient.addColorStop(1, 'rgba(0,0,0,0.45)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
    }
    
    // ======================= УПРАВЛЕНИЕ ТЕКСТУРАМИ КАРТ =======================
    
    loadMapTexture(mapKey, texturePath) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.textures.maps[mapKey] = img;
                resolve();
            };
            img.onerror = () => {
                this.textures.maps[mapKey] = null;
                resolve();
            };
            img.src = texturePath;
        });
    }
    
    getMapTexture(mapKey) {
        return this.textures.maps[mapKey];
    }
    
    setCurrentMap(mapKey) {
        this.gameState.currentMap = mapKey;
    }
    
    // ======================= УТИЛИТЫ =======================
    
    getWeatherInfo() {
        return {
            effect: this.weather.currentEffect,
            intensity: this.weather.intensity,
            temperature: Math.round(this.weather.temperature),
            windStrength: Math.round(Math.abs(this.weather.wind.strength) * 10) / 10,
            timeOfDay: this.getTimeOfDayString()
        };
    }
    
    getTimeOfDayString() {
        const time = this.lighting.timeOfDay;
        if (time < 0.25) return 'Утро';
        if (time < 0.5) return 'День';
        if (time < 0.75) return 'Вечер';
        return 'Ночь';
    }
    
    // ======================= ОБНОВЛЕНИЕ =======================
    
    update(time) {
        this.gameState.time = time;
        this.updateWeather(time);
        this.updateParticles();
    }
    
    render() {
        this.applyLighting();
        this.drawWeather();
        this.applyPostProcessing();
    }
}

// Экспортируем систему графики
window.GraphicsSystem = GraphicsSystem;