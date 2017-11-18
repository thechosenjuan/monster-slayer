new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    damageByMonster: -1,
    damageByPlayer: -1,
    minDamage: 3,
    maxDamage: 8,
    logs: [],
  },
  methods: {
    attack() {
      this.generateMstTurn();

      this.damageByPlayer = this.calculateBasicDamage();
      this.monsterHealth -= this.damageByPlayer;
      this.playerHealth -= this.damageByMonster;

      this.enterLog('attack');
    },
    specialAttack() {
      this.generateMstTurn();

      this.damageByPlayer = this.calculateSpecialDamage();
      this.monsterHealth -= this.damageByPlayer;
      this.playerHealth -= this.damageByMonster;

      this.enterLog('attack');
    },
    heal() {
      this.generateMstTurn();

      let healPoints = this.calculateHealing();
      this.playerHealth += healPoints;
      this.playerHealth -= this.damageByMonster;

      this.enterLog('heal', healPoints);
    },
    calculateBasicDamage() {
      return Math.floor(Math.random() * (8 - 4)) + 3;
    },
    calculateHealing() {
      return Math.floor(Math.random() * (5 - 2)) + 1;
    },
    calculateSpecialDamage() {
      return Math.floor(Math.random() * (8 - 2)) + 3;
    },
    reset() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.gameIsRunning = false;
      this.logs = [];
    },
    generateMstTurn() {
      switch (Math.round(Math.random())) {
        case 0:
          this.damageByMonster = this.calculateBasicDamage();
          break;
        case 1:
          this.damageByMonster = this.calculateSpecialDamage();
          break;
      }
    },
    enterLog(action, healPoints) {
      switch (action) {
        case 'attack':
          this.logs.push(
            {
              text: `PLAYER HITS MONSTER BY ${this.damageByPlayer}`,
              class: 'player-turn',
            },
            {
              text: `MONSTER HITS PLAYER BY ${this.damageByMonster}`,
              class: 'monster-turn',
            }
          );
          break;
        case 'heal':
          this.logs.push(
            {
              text: `PLAYER HEALED BY ${healPoints}`,
              class: 'player-turn',
            },
            {
              text: `MONSTER HITS PLAYER BY ${this.damageByMonster}`,
              class: 'monster-turn',
            }
          );
          break;
      }
    },
  },
  computed: {
    playerHealthSize() {
      return {
        width: this.playerHealth * 3.76 + 'px',
      };
    },
    monsterHealthSize() {
      return {
        width: this.monsterHealth * 3.76 + 'px',
      };
    },
  },
  watch: {
    playerHealth() {
      if (this.playerHealth <= 0) {
        alert('You lose!');
        this.reset();
      }
    },
    monsterHealth() {
      if (this.monsterHealth <= 0) {
        alert('You win!!');
        this.reset();
      }
    },
  },
});
