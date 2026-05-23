// ======================= СИСТЕМА НАВЫКОВ =======================
class SkillSystem {
    constructor() {
        // Очки навыков игрока
        this.skillPoints = 0;
        this.totalSkillPoints = 0;
        this.spentSkillPoints = 0;
        
        // Ветка навыков "Экономика"
        this.economySkills = {
            // Основные навыки
            basicIncome: {
                id: 'basicIncome',
                name: 'Основной доход',
                description: 'Увеличивает базовый доход от всех зданий',
                icon: '💰',
                maxLevel: 5,
                currentLevel: 0,
                cost: 1,
                effect: 0.05, // 5% увеличения дохода за уровень
                unlocked: true,
                requirements: []
            },
            
            resourceManagement: {
                id: 'resourceManagement',
                name: 'Управление ресурсами',
                description: 'Снижает стоимость улучшения зданий',
                icon: '📊',
                maxLevel: 3,
                currentLevel: 0,
                cost: 1,
                effect: 0.10, // 10% снижение стоимости за уровень
                unlocked: true,
                requirements: []
            },
            
            // Промежуточные навыки (требуют базовые)
            efficientProduction: {
                id: 'efficientProduction',
                name: 'Эффективное производство',
                description: 'Увеличивает производство ресурсов от лесопилок и каменоломен',
                icon: '⚙️',
                maxLevel: 4,
                currentLevel: 0,
                cost: 2,
                effect: 0.15, // 15% увеличения за уровень
                unlocked: false,
                requirements: ['basicIncome', 'resourceManagement']
            },
            
            // Продвинутые навыки
            investmentStrategy: {
                id: 'investmentStrategy',
                name: 'Инвестиционная стратегия',
                description: 'Увеличивает доход от банков',
                icon: '📈',
                maxLevel: 3,
                currentLevel: 0,
                cost: 3,
                effect: 0.25, // 25% увеличения за уровень
                unlocked: false,
                requirements: ['efficientProduction']
            },
            
            taxOptimization: {
                id: 'taxOptimization',
                name: 'Оптимизация налогов',
                description: 'Увеличивает продажную стоимость зданий',
                icon: '💸',
                maxLevel: 2,
                currentLevel: 0,
                cost: 3,
                effect: 0.10, // 10% увеличения стоимости продажи за уровень
                unlocked: false,
                requirements: ['efficientProduction']
            },
            
            // Экспертные навыки
            economicDominance: {
                id: 'economicDominance',
                name: 'Экономическое доминирование',
                description: 'Увеличивает все доходы и снижает все затраты',
                icon: '👑',
                maxLevel: 1,
                currentLevel: 0,
                cost: 5,
                effect: 0.30, // 30% бонус ко всем экономическим показателям
                unlocked: false,
                requirements: ['investmentStrategy', 'taxOptimization']
            }
        };
        
        // ======================= НОВАЯ ВЕТКА: ВОЕННОЕ ДЕЛО =======================
        this.militarySkills = {
            // Основные навыки
            basicTraining: {
                id: 'basicTraining',
                name: 'Базовая подготовка',
                description: 'Увеличивает урон игрока и союзников',
                icon: '⚔️',
                maxLevel: 5,
                currentLevel: 0,
                cost: 1,
                effect: 0.10, // 10% увеличения урона за уровень
                unlocked: true,
                requirements: []
            },
            
            defensiveTactics: {
                id: 'defensiveTactics',
                name: 'Оборонительная тактика',
                description: 'Увеличивает здоровье игрока и союзников',
                icon: '🛡️',
                maxLevel: 3,
                currentLevel: 0,
                cost: 1,
                effect: 0.15, // 15% увеличения здоровья за уровень
                unlocked: true,
                requirements: []
            },
            
            // Промежуточные навыки
            archeryMastery: {
                id: 'archeryMastery',
                name: 'Мастерство стрельбы',
                description: 'Увеличивает дальность и точность атак лучников',
                icon: '🏹',
                maxLevel: 4,
                currentLevel: 0,
                cost: 2,
                effect: 0.20, // 20% увеличения эффективности за уровень
                unlocked: false,
                requirements: ['basicTraining']
            },
            
            siegeWarfare: {
                id: 'siegeWarfare',
                name: 'Осадное дело',
                description: 'Увеличивает урон по укреплениям и боссам',
                icon: '🎯',
                maxLevel: 3,
                currentLevel: 0,
                cost: 2,
                effect: 0.25, // 25% увеличения урона по боссам за уровень
                unlocked: false,
                requirements: ['defensiveTactics']
            },
            
            // Продвинутые навыки
            leadership: {
                id: 'leadership',
                name: 'Лидерство',
                description: 'Увеличивает количество и силу союзников',
                icon: '👑',
                maxLevel: 3,
                currentLevel: 0,
                cost: 3,
                effect: 0.15, // 15% увеличения силы союзников за уровень
                unlocked: false,
                requirements: ['archeryMastery', 'siegeWarfare']
            },
            
            combatMedicine: {
                id: 'combatMedicine',
                name: 'Боевая медицина',
                description: 'Увеличивает эффективность лечения и регенерацию',
                icon: '❤️‍🩹',
                maxLevel: 2,
                currentLevel: 0,
                cost: 3,
                effect: 0.30, // 30% увеличения лечения за уровень
                unlocked: false,
                requirements: ['archeryMastery', 'siegeWarfare']
            },
            
            // Экспертные навыки
            warMastery: {
                id: 'warMastery',
                name: 'Мастерство войны',
                description: 'Увеличивает все боевые характеристики и даёт шанс критического удара',
                icon: '⚔️',
                maxLevel: 1,
                currentLevel: 0,
                cost: 5,
                effect: {
                    damageBonus: 0.40, // 40% увеличения урона
                    healthBonus: 0.30,  // 30% увеличения здоровья
                    critChance: 0.15    // 15% шанс критического удара
                },
                unlocked: false,
                requirements: ['leadership', 'combatMedicine']
            }
        };
        
        // Активные бонусы
        this.activeBonuses = {
            // Экономические бонусы
            buildingIncomeMultiplier: 1.0,
            upgradeCostMultiplier: 1.0,
            resourceProductionMultiplier: 1.0,
            bankIncomeMultiplier: 1.0,
            sellPriceMultiplier: 1.0,
            globalEconomicMultiplier: 1.0,
            
            // Военные бонусы
            playerDamageMultiplier: 1.0,
            playerHealthMultiplier: 1.0,
            allyDamageMultiplier: 1.0,
            allyHealthMultiplier: 1.0,
            archerEfficiencyMultiplier: 1.0,
            bossDamageMultiplier: 1.0,
            allyCountBonus: 0,
            healingMultiplier: 1.0,
            critChance: 0.0,
            globalMilitaryMultiplier: 1.0
        };
        
        // Опыт и уровни игрока
        this.playerLevel = 1;
        this.playerXP = 0;
        this.xpToNextLevel = 100;
        
        // Текущая активная ветка для мобильных устройств
        this.activeTreeOnMobile = 'economy';
        
        this.init();
    }
    
    init() {
        this.loadSkills();
        this.calculateBonuses();
    }
    
    // Добавление очков навыков
    addSkillPoints(points) {
        this.skillPoints += points;
        this.totalSkillPoints += points;
        this.updateSkillUI();
    }
    
    // Прокачка навыка
    upgradeSkill(skillId) {
        let skill = this.economySkills[skillId];
        let skillTree = 'economy';
        
        if (!skill) {
            skill = this.militarySkills[skillId];
            skillTree = 'military';
        }
        
        if (!skill) {
            console.error(`Навык ${skillId} не найден`);
            return false;
        }
        
        // Проверка доступности
        if (!this.canUpgradeSkill(skillId)) {
            showNotification("Нельзя улучшить этот навык!", "warning");
            return false;
        }
        
        // Проверка очков навыков
        if (this.skillPoints < skill.cost) {
            showNotification("Недостаточно очков навыков!", "danger");
            return false;
        }
        
        // Проверка максимального уровня
        if (skill.currentLevel >= skill.maxLevel) {
            showNotification("Навык уже достиг максимального уровня!", "warning");
            return false;
        }
        
        // Прокачка навыка
        skill.currentLevel++;
        this.skillPoints -= skill.cost;
        this.spentSkillPoints += skill.cost;
        
        // Разблокировка зависимых навыков
        this.checkUnlockedSkills();
        
        // Пересчет бонусов
        this.calculateBonuses();
        
        // Сохранение
        this.saveSkills();
        
        // Обновление UI
        this.updateSkillUI();
        this.renderSkillTree();
        
        // Добавляем индикатор доступности для связанных навыков
        this.updateAvailableSkillsIndicators();
        
        showNotification(`Навык "${skill.name}" улучшен до уровня ${skill.currentLevel}!`, "success");
        return true;
    }
    
    // Проверка возможности прокачки
    canUpgradeSkill(skillId) {
        let skill = this.economySkills[skillId];
        if (!skill) {
            skill = this.militarySkills[skillId];
        }
        
        if (!skill) return false;
        if (skill.currentLevel >= skill.maxLevel) return false;
        if (!skill.unlocked) return false;
        
        // Проверка требований
        for (const reqId of skill.requirements) {
            let reqSkill = this.economySkills[reqId] || this.militarySkills[reqId];
            if (!reqSkill || reqSkill.currentLevel < 1) {
                return false;
            }
        }
        
        return true;
    }
    
    // Проверка разблокированных навыков
    checkUnlockedSkills() {
        // Проверка экономических навыков
        for (const skillId in this.economySkills) {
            const skill = this.economySkills[skillId];
            
            if (skill.unlocked) continue;
            
            let canUnlock = true;
            for (const reqId of skill.requirements) {
                const reqSkill = this.economySkills[reqId] || this.militarySkills[reqId];
                if (!reqSkill || reqSkill.currentLevel < 1) {
                    canUnlock = false;
                    break;
                }
            }
            
            if (canUnlock) {
                skill.unlocked = true;
            }
        }
        
        // Проверка военных навыков
        for (const skillId in this.militarySkills) {
            const skill = this.militarySkills[skillId];
            
            if (skill.unlocked) continue;
            
            let canUnlock = true;
            for (const reqId of skill.requirements) {
                const reqSkill = this.economySkills[reqId] || this.militarySkills[reqId];
                if (!reqSkill || reqSkill.currentLevel < 1) {
                    canUnlock = false;
                    break;
                }
            }
            
            if (canUnlock) {
                skill.unlocked = true;
            }
        }
    }
    
    // Обновление индикаторов доступных навыков
    updateAvailableSkillsIndicators() {
        // Удаляем старые индикаторы
        document.querySelectorAll('.skill-node-available-indicator').forEach(indicator => {
            indicator.remove();
        });
        
        // Добавляем индикаторы для доступных навыков
        for (const skillId in this.economySkills) {
            if (this.canUpgradeSkill(skillId)) {
                const node = document.getElementById(`skill-node-${skillId}`);
                if (node) {
                    const indicator = document.createElement('div');
                    indicator.className = 'skill-node-available-indicator';
                    indicator.title = 'Доступно для улучшения';
                    node.appendChild(indicator);
                }
            }
        }
        
        for (const skillId in this.militarySkills) {
            if (this.canUpgradeSkill(skillId)) {
                const node = document.getElementById(`skill-node-${skillId}`);
                if (node) {
                    const indicator = document.createElement('div');
                    indicator.className = 'skill-node-available-indicator';
                    indicator.title = 'Доступно для улучшения';
                    node.appendChild(indicator);
                }
            }
        }
    }
    
    // Расчет активных бонусов
    calculateBonuses() {
        this.activeBonuses = {
            // Экономические бонусы
            buildingIncomeMultiplier: 1.0,
            upgradeCostMultiplier: 1.0,
            resourceProductionMultiplier: 1.0,
            bankIncomeMultiplier: 1.0,
            sellPriceMultiplier: 1.0,
            globalEconomicMultiplier: 1.0,
            
            // Военные бонусы
            playerDamageMultiplier: 1.0,
            playerHealthMultiplier: 1.0,
            allyDamageMultiplier: 1.0,
            allyHealthMultiplier: 1.0,
            archerEfficiencyMultiplier: 1.0,
            bossDamageMultiplier: 1.0,
            allyCountBonus: 0,
            healingMultiplier: 1.0,
            critChance: 0.0,
            globalMilitaryMultiplier: 1.0
        };
        
        // ========== ЭКОНОМИЧЕСКИЕ БОНУСЫ ==========
        
        // Базовый доход
        if (this.economySkills.basicIncome.currentLevel > 0) {
            this.activeBonuses.buildingIncomeMultiplier += 
                this.economySkills.basicIncome.currentLevel * this.economySkills.basicIncome.effect;
        }
        
        // Стоимость улучшений
        if (this.economySkills.resourceManagement.currentLevel > 0) {
            this.activeBonuses.upgradeCostMultiplier = Math.max(0.1, 
                1.0 - (this.economySkills.resourceManagement.currentLevel * this.economySkills.resourceManagement.effect));
        }
        
        // Производство ресурсов
        if (this.economySkills.efficientProduction.currentLevel > 0) {
            this.activeBonuses.resourceProductionMultiplier += 
                this.economySkills.efficientProduction.currentLevel * this.economySkills.efficientProduction.effect;
        }
        
        // Доход от банков
        if (this.economySkills.investmentStrategy.currentLevel > 0) {
            this.activeBonuses.bankIncomeMultiplier += 
                this.economySkills.investmentStrategy.currentLevel * this.economySkills.investmentStrategy.effect;
        }
        
        // Стоимость продажи
        if (this.economySkills.taxOptimization.currentLevel > 0) {
            this.activeBonuses.sellPriceMultiplier += 
                this.economySkills.taxOptimization.currentLevel * this.economySkills.taxOptimization.effect;
        }
        
        // Глобальный экономический бонус
        if (this.economySkills.economicDominance.currentLevel > 0) {
            this.activeBonuses.globalEconomicMultiplier += this.economySkills.economicDominance.effect;
        }
        
        // ========== ВОЕННЫЕ БОНУСЫ ==========
        
        // Базовая подготовка (урон)
        if (this.militarySkills.basicTraining.currentLevel > 0) {
            this.activeBonuses.playerDamageMultiplier += 
                this.militarySkills.basicTraining.currentLevel * this.militarySkills.basicTraining.effect;
            this.activeBonuses.allyDamageMultiplier += 
                this.militarySkills.basicTraining.currentLevel * this.militarySkills.basicTraining.effect * 0.5;
        }
        
        // Оборонительная тактика (здоровье)
        if (this.militarySkills.defensiveTactics.currentLevel > 0) {
            this.activeBonuses.playerHealthMultiplier += 
                this.militarySkills.defensiveTactics.currentLevel * this.militarySkills.defensiveTactics.effect;
            this.activeBonuses.allyHealthMultiplier += 
                this.militarySkills.defensiveTactics.currentLevel * this.militarySkills.defensiveTactics.effect * 0.5;
        }
        
        // Мастерство стрельбы
        if (this.militarySkills.archeryMastery.currentLevel > 0) {
            this.activeBonuses.archerEfficiencyMultiplier += 
                this.militarySkills.archeryMastery.currentLevel * this.militarySkills.archeryMastery.effect;
        }
        
        // Осадное дело
        if (this.militarySkills.siegeWarfare.currentLevel > 0) {
            this.activeBonuses.bossDamageMultiplier += 
                this.militarySkills.siegeWarfare.currentLevel * this.militarySkills.siegeWarfare.effect;
        }
        
        // Лидерство
        if (this.militarySkills.leadership.currentLevel > 0) {
            this.activeBonuses.allyCountBonus += this.militarySkills.leadership.currentLevel;
            this.activeBonuses.allyDamageMultiplier += 
                this.militarySkills.leadership.currentLevel * this.militarySkills.leadership.effect;
            this.activeBonuses.allyHealthMultiplier += 
                this.militarySkills.leadership.currentLevel * this.militarySkills.leadership.effect;
        }
        
        // Боевая медицина
        if (this.militarySkills.combatMedicine.currentLevel > 0) {
            this.activeBonuses.healingMultiplier += 
                this.militarySkills.combatMedicine.currentLevel * this.militarySkills.combatMedicine.effect;
        }
        
        // Мастерство войны
        if (this.militarySkills.warMastery.currentLevel > 0) {
            this.activeBonuses.playerDamageMultiplier += this.militarySkills.warMastery.effect.damageBonus;
            this.activeBonuses.playerHealthMultiplier += this.militarySkills.warMastery.effect.healthBonus;
            this.activeBonuses.critChance = this.militarySkills.warMastery.effect.critChance;
            this.activeBonuses.globalMilitaryMultiplier += 0.25; // 25% глобальный бонус
        }
        
        // Применяем глобальные бонусы
        for (const key in this.activeBonuses) {
            if (key.startsWith('economic') || key.includes('Income') || key.includes('Cost') || 
                key.includes('Production') || key.includes('Price')) {
                this.activeBonuses[key] *= this.activeBonuses.globalEconomicMultiplier;
            } else if (key.startsWith('military') || key.includes('Damage') || key.includes('Health') || 
                       key.includes('Ally') || key.includes('Archer') || key.includes('Boss') || 
                       key.includes('Healing') || key.includes('Crit')) {
                this.activeBonuses[key] *= this.activeBonuses.globalMilitaryMultiplier;
            }
        }
    }
    
    // Получение бонусов для игровых механик
    getBuildingIncomeBonus() {
        return this.activeBonuses.buildingIncomeMultiplier;
    }
    
    getUpgradeCostReduction() {
        return this.activeBonuses.upgradeCostMultiplier;
    }
    
    getResourceProductionBonus() {
        return this.activeBonuses.resourceProductionMultiplier;
    }
    
    getBankIncomeBonus() {
        return this.activeBonuses.bankIncomeMultiplier;
    }
    
    getSellPriceBonus() {
        return this.activeBonuses.sellPriceMultiplier;
    }
    
    // Военные бонусы
    getPlayerDamageBonus() {
        return this.activeBonuses.playerDamageMultiplier;
    }
    
    getPlayerHealthBonus() {
        return this.activeBonuses.playerHealthMultiplier;
    }
    
    getAllyDamageBonus() {
        return this.activeBonuses.allyDamageMultiplier;
    }
    
    getAllyHealthBonus() {
        return this.activeBonuses.allyHealthMultiplier;
    }
    
    getArcherEfficiencyBonus() {
        return this.activeBonuses.archerEfficiencyMultiplier;
    }
    
    getBossDamageBonus() {
        return this.activeBonuses.bossDamageMultiplier;
    }
    
    getAllyCountBonus() {
        return this.activeBonuses.allyCountBonus;
    }
    
    getHealingBonus() {
        return this.activeBonuses.healingMultiplier;
    }
    
    getCritChance() {
        return this.activeBonuses.critChance;
    }
    
    // Добавление опыта
    addXP(amount) {
        this.playerXP += amount;
        
        // Проверка повышения уровня
        while (this.playerXP >= this.xpToNextLevel) {
            this.playerXP -= this.xpToNextLevel;
            this.playerLevel++;
            
            // Награда за уровень
            this.addSkillPoints(1);
            
            // Увеличение XP для следующего уровня
            this.xpToNextLevel = Math.floor(100 * Math.pow(1.2, this.playerLevel - 1));
            
            showNotification(`🎉 Новый уровень! Теперь у вас ${this.playerLevel} уровень`, "success");
        }
        
        this.saveSkills();
        this.updateSkillUI();
    }
    
    // Получение XP за действия
    awardXPForAction(action, amount = 1) {
        const xpRewards = {
            'build': 10,
            'upgrade': 25,
            'sell': 5,
            'kill_enemy': 15,
            'kill_boss': 100,
            'complete_wave': 150,
            'heal': 20,
            'kill_with_crit': 30,
            'ally_kill': 5
        };
        
        const baseXP = xpRewards[action] || 5;
        const totalXP = baseXP * amount;
        
        this.addXP(totalXP);
        return totalXP;
    }
    
    // Сохранение навыков
    saveSkills() {
        const saveData = {
            skillPoints: this.skillPoints,
            totalSkillPoints: this.totalSkillPoints,
            spentSkillPoints: this.spentSkillPoints,
            playerLevel: this.playerLevel,
            playerXP: this.playerXP,
            xpToNextLevel: this.xpToNextLevel,
            economySkills: {},
            militarySkills: {}
        };
        
        // Сохраняем уровни экономических навыков
        for (const skillId in this.economySkills) {
            saveData.economySkills[skillId] = this.economySkills[skillId].currentLevel;
        }
        
        // Сохраняем уровни военных навыков
        for (const skillId in this.militarySkills) {
            saveData.militarySkills[skillId] = this.militarySkills[skillId].currentLevel;
        }
        
        localStorage.setItem('villageDefenseSkills', JSON.stringify(saveData));
    }
    
    // Загрузка навыков
    loadSkills() {
        const savedData = localStorage.getItem('villageDefenseSkills');
        
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                
                this.skillPoints = data.skillPoints || 0;
                this.totalSkillPoints = data.totalSkillPoints || 0;
                this.spentSkillPoints = data.spentSkillPoints || 0;
                this.playerLevel = data.playerLevel || 1;
                this.playerXP = data.playerXP || 0;
                this.xpToNextLevel = data.xpToNextLevel || 100;
                
                // Загружаем уровни экономических навыков
                if (data.economySkills) {
                    for (const skillId in data.economySkills) {
                        if (this.economySkills[skillId]) {
                            this.economySkills[skillId].currentLevel = data.economySkills[skillId] || 0;
                        }
                    }
                }
                
                // Загружаем уровни военных навыков
                if (data.militarySkills) {
                    for (const skillId in data.militarySkills) {
                        if (this.militarySkills[skillId]) {
                            this.militarySkills[skillId].currentLevel = data.militarySkills[skillId] || 0;
                        }
                    }
                } else if (data.skills) { // Совместимость со старой версией
                    for (const skillId in data.skills) {
                        if (this.economySkills[skillId]) {
                            this.economySkills[skillId].currentLevel = data.skills[skillId] || 0;
                        }
                    }
                }
                
                // Обновляем разблокированные навыки
                this.checkUnlockedSkills();
                this.calculateBonuses();
                
            } catch (e) {
                console.error("❌ Ошибка загрузки навыков:", e);
            }
        }
    }
    
    // Сброс навыков (за определенную цену)
    resetSkills() {
        if (this.spentSkillPoints === 0) {
            showNotification("Нет прокачанных навыков для сброса", "warning");
            return false;
        }
        
        if (coins < 500) {
            showNotification("Недостаточно монет для сброса навыков (требуется 500💰)", "danger");
            return false;
        }
        
        // Подтверждение
        if (!confirm("Сбросить все навыки за 500 монет? Вы получите все очки навыков обратно.")) {
            return false;
        }
        
        coins -= 500;
        
        // Сброс всех экономических навыков
        for (const skillId in this.economySkills) {
            this.economySkills[skillId].currentLevel = 0;
            this.economySkills[skillId].unlocked = skillId === 'basicIncome' || skillId === 'resourceManagement';
        }
        
        // Сброс всех военных навыков
        for (const skillId in this.militarySkills) {
            this.militarySkills[skillId].currentLevel = 0;
            this.militarySkills[skillId].unlocked = skillId === 'basicTraining' || skillId === 'defensiveTactics';
        }
        
        // Возврат очков навыков
        this.skillPoints = this.spentSkillPoints;
        this.spentSkillPoints = 0;
        
        // Пересчет бонусов
        this.calculateBonuses();
        
        // Сохранение
        this.saveSkills();
        
        // Обновление UI
        this.updateSkillUI();
        this.renderSkillTree();
        this.updateAvailableSkillsIndicators();
        
        showNotification("Навыки сброшены! Очки навыков возвращены.", "success");
        updateUI();
        
        return true;
    }
    
    // ======================= UI МЕТОДЫ =======================
    
    // Создание UI системы навыков
    createSkillsUI() {
        // Создаем меню навыков
        const skillsMenu = document.createElement('div');
        skillsMenu.id = 'skills-menu';
        skillsMenu.className = 'skills-menu';
        
        skillsMenu.innerHTML = `
            <div class="skills-container">
                <div class="skills-title">
                    <span>🌳 Древо навыков</span>
                </div>
                
                <div class="skills-header">
                    <div class="skill-points-display">
                        <span>Очки навыков:</span>
                        <span class="skill-points-value" id="skill-points-value">${this.skillPoints}</span>
                        <span class="skill-points-cost">(Использовано: ${this.spentSkillPoints})</span>
                    </div>
                    <div>
                        <span style="color: #4fc3f7;">Уровень: ${this.playerLevel}</span>
                        <div style="font-size: 14px; color: #aaa; margin-top: 5px;">
                            XP: ${this.playerXP}/${this.xpToNextLevel}
                        </div>
                    </div>
                </div>
                
                <div class="skill-tree-tabs" id="skill-tree-tabs" style="display: none;">
                    <button class="skill-tree-tab active" data-tree="economy">💰 Экономика</button>
                    <button class="skill-tree-tab" data-tree="military">⚔️ Военное дело</button>
                </div>
                
                <div class="skills-trees">
                    <div class="skill-tree active" id="economy-tree">
                        <div class="skill-tree-title">
                            <span>💰 Экономика</span>
                            <span class="skill-tree-badge">Ур. ${this.getEconomySkillLevel()}/18</span>
                        </div>
                        <div class="skill-tree-description">
                            Улучшайте экономические показатели: увеличивайте доходы, снижайте затраты и оптимизируйте производство
                        </div>
                        <div class="skill-nodes" id="economy-skill-nodes">
                            <!-- Навыки будут добавлены через JavaScript -->
                        </div>
                    </div>
                    
                    <div class="skill-tree" id="military-tree">
                        <div class="skill-tree-title">
                            <span>⚔️ Военное дело</span>
                            <span class="skill-tree-badge">Ур. ${this.getMilitarySkillLevel()}/21</span>
                        </div>
                        <div class="skill-tree-description">
                            Улучшайте боевые характеристики: увеличивайте урон, здоровье и эффективность в бою
                        </div>
                        <div class="skill-nodes" id="military-skill-nodes">
                            <!-- Навыки будут добавлены через JavaScript -->
                        </div>
                    </div>
                </div>
                
                <div class="bonus-stats" id="bonus-stats">
                    <!-- Статистика бонусов будет добавлена через JavaScript -->
                </div>
                
                <div class="skill-buttons">
                    <button class="btn btn-danger" onclick="skillSystem.resetSkills()">
                        🔄 Сбросить навыки (500💰)
                    </button>
                    <button class="btn" onclick="hideSkillsMenu()">
                        ❌ Закрыть
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(skillsMenu);
        
        // Инициализация переключения веток на мобильных устройствах
        this.initMobileTreeSwitcher();
        
        const hotkeyHint = document.createElement('div');
        hotkeyHint.className = 'skills-hotkey';
        hotkeyHint.id = 'skills-hotkey';
        document.body.appendChild(hotkeyHint);
        
        // Добавляем кнопку навыков в игровой интерфейс
        this.addSkillButtonToGameUI();
        
        // Инициализация древа навыков
        this.renderSkillTree();
        this.updateBonusStats();
        this.updateAvailableSkillsIndicators();
    }
    
    // Получение общего уровня экономических навыков
    getEconomySkillLevel() {
        let total = 0;
        for (const skillId in this.economySkills) {
            total += this.economySkills[skillId].currentLevel;
        }
        return total;
    }
    
    // Получение общего уровня военных навыков
    getMilitarySkillLevel() {
        let total = 0;
        for (const skillId in this.militarySkills) {
            total += this.militarySkills[skillId].currentLevel;
        }
        return total;
    }
    
    // Инициализация переключателя веток для мобильных устройств
    initMobileTreeSwitcher() {
        const tabsContainer = document.getElementById('skill-tree-tabs');
        const economyTree = document.getElementById('economy-tree');
        const militaryTree = document.getElementById('military-tree');
        
        if (window.innerWidth <= 768) {
            tabsContainer.style.display = 'flex';
            
            // Скрываем военную ветку по умолчанию на мобильных
            militaryTree.classList.remove('active');
            
            // Обработчики для вкладок
            document.querySelectorAll('.skill-tree-tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    // Обновляем активную вкладку
                    document.querySelectorAll('.skill-tree-tab').forEach(t => {
                        t.classList.remove('active');
                    });
                    tab.classList.add('active');
                    
                    // Показываем соответствующую ветку
                    const treeType = tab.getAttribute('data-tree');
                    economyTree.classList.remove('active');
                    militaryTree.classList.remove('active');
                    
                    if (treeType === 'economy') {
                        economyTree.classList.add('active');
                        this.activeTreeOnMobile = 'economy';
                    } else {
                        militaryTree.classList.add('active');
                        this.activeTreeOnMobile = 'military';
                    }
                });
            });
        }
        
        // Обработчик изменения размера окна
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                tabsContainer.style.display = 'flex';
                
                // Показываем активную ветку на мобильных
                if (this.activeTreeOnMobile === 'economy') {
                    economyTree.classList.add('active');
                    militaryTree.classList.remove('active');
                    document.querySelector('.skill-tree-tab[data-tree="economy"]').classList.add('active');
                    document.querySelector('.skill-tree-tab[data-tree="military"]').classList.remove('active');
                } else {
                    militaryTree.classList.add('active');
                    economyTree.classList.remove('active');
                    document.querySelector('.skill-tree-tab[data-tree="military"]').classList.add('active');
                    document.querySelector('.skill-tree-tab[data-tree="economy"]').classList.remove('active');
                }
            } else {
                tabsContainer.style.display = 'none';
                // На десктопе показываем обе ветки
                economyTree.classList.add('active');
                militaryTree.classList.add('active');
            }
        });
    }
    
    // Добавление кнопки в игровой интерфейс
    addSkillButtonToGameUI() {
        // Добавляем в правую панель
        const rightPanel = document.querySelector('.right-panel .control-panel');
        if (rightPanel) {
            const skillButton = document.createElement('button');
            skillButton.className = 'btn btn-success';
            skillButton.innerHTML = '🌳 Навыки (K)';
            skillButton.onclick = showSkillsMenu;
            skillButton.style.marginTop = '10px';
            
            // Находим место перед кнопкой возврата в меню
            const returnButton = rightPanel.querySelector('button[onclick="returnToMenu()"]');
            if (returnButton) {
                rightPanel.insertBefore(skillButton, returnButton);
            } else {
                rightPanel.appendChild(skillButton);
            }
        }
        
        // Добавляем в нижнюю панель
        const bottomPanel = document.querySelector('.bottom-panel .action-buttons');
        if (bottomPanel) {
            const skillButton = document.createElement('button');
            skillButton.className = 'btn';
            skillButton.innerHTML = '🌳';
            skillButton.title = 'Навыки (K)';
            skillButton.onclick = showSkillsMenu;
            skillButton.style.marginLeft = '5px';
            
            // Добавляем перед кнопкой настроек
            const settingsButton = bottomPanel.querySelector('button[onclick="showSettings()"]');
            if (settingsButton) {
                bottomPanel.insertBefore(skillButton, settingsButton);
            } else {
                bottomPanel.appendChild(skillButton);
            }
        }
    }
    
    // Обновление UI навыков
    updateSkillUI() {
        const pointsElement = document.getElementById('skill-points-value');
        const hotkeyElement = document.getElementById('skills-hotkey');
        
        if (pointsElement) {
            pointsElement.textContent = this.skillPoints;
        }
        
        if (hotkeyElement) {
            hotkeyElement.innerHTML = `<span>⭐ Ур. ${this.playerLevel}</span><span class="skills-xp-bar-wrap"><span class="skills-xp-bar-fill" style="width:${Math.round(this.playerXP/this.xpToNextLevel*100)}%"></span></span><span>${this.playerXP}/${this.xpToNextLevel} XP</span><span><kbd>K</kbd> Навыки</span>`;
        }
        
        // Обновляем бейджи с уровнями веток
        const economyBadge = document.querySelector('#economy-tree .skill-tree-badge');
        const militaryBadge = document.querySelector('#military-tree .skill-tree-badge');
        
        if (economyBadge) {
            economyBadge.textContent = `Ур. ${this.getEconomySkillLevel()}/18`;
        }
        
        if (militaryBadge) {
            militaryBadge.textContent = `Ур. ${this.getMilitarySkillLevel()}/21`;
        }
        
        // Обновляем прогресс уровня в игровом интерфейсе
        this.updateLevelProgressInGameUI();
        
        // Обновляем статистику бонусов
        this.updateBonusStats();
    }
    
    // Обновление статистики бонусов
    updateBonusStats() {
        const bonusStats = document.getElementById('bonus-stats');
        if (!bonusStats) return;
        
        bonusStats.innerHTML = `
            <div class="bonus-stat-item">
                <div class="bonus-stat-label">Доход от зданий</div>
                <div class="bonus-stat-value economy">${(this.activeBonuses.buildingIncomeMultiplier * 100).toFixed(1)}%</div>
            </div>
            <div class="bonus-stat-item">
                <div class="bonus-stat-label">Стоимость улучшений</div>
                <div class="bonus-stat-value economy">${(this.activeBonuses.upgradeCostMultiplier * 100).toFixed(1)}%</div>
            </div>
            <div class="bonus-stat-item">
                <div class="bonus-stat-label">Урон игрока</div>
                <div class="bonus-stat-value military">${(this.activeBonuses.playerDamageMultiplier * 100).toFixed(1)}%</div>
            </div>
            <div class="bonus-stat-item">
                <div class="bonus-stat-label">Здоровье игрока</div>
                <div class="bonus-stat-value military">${(this.activeBonuses.playerHealthMultiplier * 100).toFixed(1)}%</div>
            </div>
            <div class="bonus-stat-item">
                <div class="bonus-stat-label">Кол-во союзников</div>
                <div class="bonus-stat-value military">+${this.activeBonuses.allyCountBonus}</div>
            </div>
            <div class="bonus-stat-item">
                <div class="bonus-stat-label">Шанс крита</div>
                <div class="bonus-stat-value military">${(this.activeBonuses.critChance * 100).toFixed(1)}%</div>
            </div>
        `;
    }
    
    // Обновление прогресса уровня в основном интерфейсе
    updateLevelProgressInGameUI() {
        // Добавляем информацию об уровне в верхнюю панель
        const statsRow = document.querySelector('.stats-row');
        if (statsRow) {
            let levelStat = document.getElementById('player-level-stat');
            
            if (!levelStat) {
                levelStat = document.createElement('div');
                levelStat.className = 'stat-item';
                levelStat.id = 'player-level-stat';
                levelStat.innerHTML = `🌳 <span class="stat-value" id="player-level-value">${this.playerLevel}</span>`;
                statsRow.appendChild(levelStat);
            } else {
                document.getElementById('player-level-value').textContent = this.playerLevel;
            }
        }
    }
    
    // Отрисовка древа навыков
    renderSkillTree() {
        // Отрисовка экономической ветки
        this.renderSkillBranch('economy', this.economySkills, [
            'basicIncome',
            'resourceManagement',
            'efficientProduction',
            'investmentStrategy',
            'taxOptimization',
            'economicDominance'
        ]);
        
        // Отрисовка военной ветки
        this.renderSkillBranch('military', this.militarySkills, [
            'basicTraining',
            'defensiveTactics',
            'archeryMastery',
            'siegeWarfare',
            'leadership',
            'combatMedicine',
            'warMastery'
        ]);
    }
    
    // Отрисовка ветки навыков
    renderSkillBranch(branchId, skills, skillOrder) {
        const container = document.getElementById(`${branchId}-skill-nodes`);
        if (!container) return;
        
        container.innerHTML = '';
        
        // Функция для получения статуса навыка
        const getSkillStatus = (skill) => {
            if (skill.currentLevel >= skill.maxLevel) return 'max';
            if (!skill.unlocked) return 'locked';
            if (this.canUpgradeSkill(skill.id)) return 'available';
            return 'unavailable';
        };
        
        // Создаем узлы навыков
        skillOrder.forEach(skillId => {
            const skill = skills[skillId];
            if (!skill) return;
            
            const status = getSkillStatus(skill);
            const progressPercent = (skill.currentLevel / skill.maxLevel) * 100;
            const isAvailable = this.canUpgradeSkill(skill.id);
            
            const node = document.createElement('div');
            node.className = `skill-node ${status} ${isAvailable ? 'available' : ''}`;
            node.id = `skill-node-${skill.id}`;
            node.title = status === 'available' ? 'Нажмите для улучшения' : '';
            
            if (status === 'available') {
                node.onclick = () => this.upgradeSkill(skill.id);
                node.style.cursor = 'pointer';
            } else if (status === 'locked') {
                node.style.cursor = 'not-allowed';
            } else {
                node.style.cursor = 'default';
            }
            
            // Описание эффекта
            let effectDescription = '';
            switch(skill.id) {
                // Экономические навыки
                case 'basicIncome':
                    effectDescription = `+${(skill.effect * 100).toFixed(0)}% доход от зданий за уровень`;
                    break;
                case 'resourceManagement':
                    effectDescription = `-${(skill.effect * 100).toFixed(0)}% стоимость улучшений за уровень`;
                    break;
                case 'efficientProduction':
                    effectDescription = `+${(skill.effect * 100).toFixed(0)}% производство ресурсов за уровень`;
                    break;
                case 'investmentStrategy':
                    effectDescription = `+${(skill.effect * 100).toFixed(0)}% доход от банков за уровень`;
                    break;
                case 'taxOptimization':
                    effectDescription = `+${(skill.effect * 100).toFixed(0)}% стоимость продажи за уровень`;
                    break;
                case 'economicDominance':
                    effectDescription = `+${(skill.effect * 100).toFixed(0)}% ко всем экономическим показателям`;
                    break;
                
                // Военные навыки
                case 'basicTraining':
                    effectDescription = `+${(skill.effect * 100).toFixed(0)}% урон игрока и союзников за уровень`;
                    break;
                case 'defensiveTactics':
                    effectDescription = `+${(skill.effect * 100).toFixed(0)}% здоровье игрока и союзников за уровень`;
                    break;
                case 'archeryMastery':
                    effectDescription = `+${(skill.effect * 100).toFixed(0)}% эффективность лучников за уровень`;
                    break;
                case 'siegeWarfare':
                    effectDescription = `+${(skill.effect * 100).toFixed(0)}% урон по боссам за уровень`;
                    break;
                case 'leadership':
                    effectDescription = `+${(skill.effect * 100).toFixed(0)}% сила союзников и +1 союзник за уровень`;
                    break;
                case 'combatMedicine':
                    effectDescription = `+${(skill.effect * 100).toFixed(0)}% эффективность лечения за уровень`;
                    break;
                case 'warMastery':
                    effectDescription = `+${(skill.effect.damageBonus * 100).toFixed(0)}% урон, +${(skill.effect.healthBonus * 100).toFixed(0)}% здоровье, ${(skill.effect.critChance * 100).toFixed(0)}% крит`;
                    break;
            }
            
            // Требования
            let requirementsText = '';
            if (skill.requirements.length > 0) {
                const reqNames = skill.requirements.map(reqId => {
                    let reqSkill = this.economySkills[reqId] || this.militarySkills[reqId];
                    return reqSkill ? reqSkill.name : reqId;
                });
                requirementsText = `Требуется: ${reqNames.join(', ')}`;
            }
            
            // Иконка статуса
            let statusIcon = '🔓';
            if (status === 'max') statusIcon = '✅';
            else if (status === 'locked') statusIcon = '🔒';
            else if (status === 'unavailable') statusIcon = '⏳';
            
            node.innerHTML = `
                <div class="skill-node-header">
                    <div class="skill-node-name">
                        <span>${skill.icon}</span>
                        <span>${skill.name}</span>
                    </div>
                    <div class="skill-node-level">
                        Ур. ${skill.currentLevel}/${skill.maxLevel}
                    </div>
                </div>
                
                <div class="skill-node-description">
                    ${skill.description}
                </div>
                
                <div class="skill-node-stats">
                    <div class="skill-node-effect">
                        ${effectDescription}
                    </div>
                    <div class="skill-node-cost">
                        ${statusIcon} ${skill.cost} очк.
                    </div>
                </div>
                
                ${skill.currentLevel > 0 ? `
                    <div class="skill-node-progress">
                        <div class="skill-node-progress-bar" style="width: ${progressPercent}%"></div>
                    </div>
                ` : ''}
                
                ${requirementsText ? `
                    <div class="skill-node-requirements">
                        ${requirementsText}
                    </div>
                ` : ''}
                
                ${status === 'available' ? `
                    <div style="font-size: 12px; color: #4fc3f7; margin-top: 8px; text-align: center;">
                        🔼 Нажмите для улучшения
                    </div>
                ` : ''}
            `;
            
            container.appendChild(node);
        });
    }
}

// ======================= ГЛОБАЛЬНЫЕ ФУНКЦИИ =======================

// Глобальная переменная системы навыков
let skillSystem = new SkillSystem();

// Показать меню навыков
function showSkillsMenu() {
    if (gamePaused) {
        showNotification("Сначала снимите игру с паузы!", "warning");
        return;
    }
    
    const skillsMenu = document.getElementById('skills-menu');
    if (!skillsMenu) return;
    
    skillsMenu.classList.add('active');
    skillSystem.renderSkillTree();
    skillSystem.updateSkillUI();
    skillSystem.updateAvailableSkillsIndicators();
}

// Скрыть меню навыков
function hideSkillsMenu() {
    const skillsMenu = document.getElementById('skills-menu');
    if (skillsMenu) {
        skillsMenu.classList.remove('active');
    }
}

// Обработка горячих клавиш для навыков
function handleSkillsHotkey(e) {
    if (e.key === 'k' || e.key === 'K' || e.key === 'л' || e.key === 'Л') {
        e.preventDefault();
        const skillsMenu = document.getElementById('skills-menu');
        if (skillsMenu && skillsMenu.classList.contains('active')) {
            hideSkillsMenu();
        } else {
            showSkillsMenu();
        }
        return true;
    }
    return false;
}

// Модификация игровых функций для учета навыков

// Модифицированная функция улучшения здания
function upgradeNearestWithSkills() {
    if (gamePaused) {
        showNotification("Игра на паузе!", "warning");
        return;
    }
    
    if (buildings.length === 0) {
        showNotification("Нет зданий для улучшения", "warning");
        return;
    }
    
    let nearest = buildings[0];
    let minDist = Math.hypot(player.x - nearest.x, player.y - nearest.y);
    
    for (const b of buildings) {
        const dist = Math.hypot(player.x - b.x, player.y - b.y);
        if (dist < minDist) {
            minDist = dist;
            nearest = b;
        }
    }
    
    if (nearest.lvl >= 3) {
        showNotification("Здание уже максимального уровня", "warning");
        return;
    }
    
    const building = balance.buildings[nearest.type];
    
    // Применяем бонусы от навыков
    const upgradeCostMultiplier = skillSystem.getUpgradeCostReduction();
    
    const upgradeCost = {
        coins: Math.floor((building.upgradeCost.coins || 0) * nearest.lvl * upgradeCostMultiplier),
        wood: Math.floor((building.upgradeCost.wood || 0) * nearest.lvl * upgradeCostMultiplier),
        stone: Math.floor((building.upgradeCost.stone || 0) * nearest.lvl * upgradeCostMultiplier),
        iron: Math.floor((building.upgradeCost.iron || 0) * nearest.lvl * upgradeCostMultiplier)
    };

    if (coins >= upgradeCost.coins && wood >= upgradeCost.wood && stone >= upgradeCost.stone && iron >= upgradeCost.iron) {
        coins -= upgradeCost.coins;
        wood -= upgradeCost.wood;
        stone -= upgradeCost.stone;
        iron -= upgradeCost.iron;
        nearest.lvl++;
        updateUI();
        
        // Награда XP
        skillSystem.awardXPForAction('upgrade');
        
        showNotification(`${building.name} улучшена до уровня ${nearest.lvl}!`, "success");
        
        if (graphicsSystem.settings.particles && document.getElementById('particles-enabled').checked) {
            for (let i = 0; i < 15; i++) {
                createParticle(nearest.x, nearest.y, 'magic');
            }
        }
    } else {
        showNotification("Недостаточно ресурсов для улучшения", "danger");
    }
}

// Модифицированная функция продажи здания
function sellNearestWithSkills() {
    if (gamePaused) {
        showNotification("Игра на паузе!", "warning");
        return;
    }
    
    if (buildings.length === 0) {
        showNotification("Нет зданий для продажи", "warning");
        return;
    }
    
    let nearest = buildings[0];
    let minDist = Math.hypot(player.x - nearest.x, player.y - nearest.y);
    
    for (const b of buildings) {
        const dist = Math.hypot(player.x - b.x, player.y - b.y);
        if (dist < minDist) {
            minDist = dist;
            nearest = b;
        }
    }
    
    const building = balance.buildings[nearest.type];
    const baseRefund = building.baseCost * Math.pow(building.costIncrease, 
        buildings.filter(b => b.type === nearest.type).length - 1);
    
    // Применяем бонусы от навыков
    const sellBonus = skillSystem.getSellPriceBonus();
    const refund = Math.floor(baseRefund * nearest.lvl * balance.player.sellRefund * sellBonus);
    
    coins += refund;
    buildings = buildings.filter(b => b !== nearest);
    
    updateUI();
    
    // Награда XP
    skillSystem.awardXPForAction('sell');
    
    showNotification(`Продано за ${refund} монет!`, "success");
}

// Модификация функции производства ресурсов
function applySkillBonusesToProduction(buildingType, baseProduction) {
    let production = baseProduction;
    
    // Бонус к доходу от зданий
    production *= skillSystem.getBuildingIncomeBonus();
    
    // Бонус к производству ресурсов
    if (buildingType === 'sawmill' || buildingType === 'quarry') {
        production *= skillSystem.getResourceProductionBonus();
    }
    
    // Бонус к доходу от банков
    if (buildingType === 'bank') {
        production *= skillSystem.getBankIncomeBonus();
    }
    
    return production;
}

// ======================= НОВЫЕ ВОЕННЫЕ ФУНКЦИИ =======================

// Модификация урона игрока с учетом навыков
function applyPlayerDamageBonuses(baseDamage) {
    let damage = baseDamage;
    
    // Бонус к урону игрока
    damage *= skillSystem.getPlayerDamageBonus();
    
    // Шанс критического удара
    const critChance = skillSystem.getCritChance();
    if (Math.random() < critChance) {
        damage *= 2.0; // Критический удар удваивает урон
        skillSystem.awardXPForAction('kill_with_crit');
        
        if (graphicsSystem.settings.particles && document.getElementById('particles-enabled').checked) {
            createParticle(player.x, player.y, 'critical');
        }
    }
    
    return damage;
}

// Модификация здоровья игрока с учетом навыков
function applyPlayerHealthBonuses(baseHealth) {
    let health = baseHealth;
    
    // Бонус к здоровью игрока
    health *= skillSystem.getPlayerHealthBonus();
    
    return health;
}

// Модификация эффективности лечения
function applyHealingBonuses(baseHealing) {
    let healing = baseHealing;
    
    // Бонус к эффективности лечения
    healing *= skillSystem.getHealingBonus();
    
    return healing;
}

// Модификация характеристик союзников
function applyAllyBonuses(ally) {
    // Бонус к урону союзников
    if (ally.damage) {
        ally.damage *= skillSystem.getAllyDamageBonus();
    }
    
    // Бонус к здоровью союзников
    if (ally.maxHealth) {
        ally.maxHealth *= skillSystem.getAllyHealthBonus();
        if (ally.health) {
            ally.health = ally.maxHealth;
        }
    }
    
    // Бонус к эффективности лучников
    if (ally.type === 'archer') {
        ally.range *= skillSystem.getArcherEfficiencyBonus();
        ally.attackSpeed *= skillSystem.getArcherEfficiencyBonus();
    }
    
    return ally;
}

// Модификация урона по боссам
function applyBossDamageBonuses(baseDamage, target) {
    let damage = baseDamage;
    
    // Бонус к урону по боссам
    if (target && target.isBoss) {
        damage *= skillSystem.getBossDamageBonus();
    }
    
    return damage;
}

// Получение максимального количества союзников
function getMaxAllies() {
    const baseAllies = 3; // Базовое количество союзников
    const bonusAllies = skillSystem.getAllyCountBonus();
    
    return baseAllies + bonusAllies;
}

// Инициализация системы навыков при загрузке игры
function initSkillSystem() {
    // Создаем UI системы навыков
    skillSystem.createSkillsUI();
    
    window.upgradeNearest = upgradeNearestWithSkills;
    window.sellNearest = sellNearestWithSkills;
}

// Автоматическая инициализация при загрузке
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSkillSystem);
} else {
    initSkillSystem();
}