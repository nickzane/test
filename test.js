// <--- Begin Docker ---> //

    const icons = ['coin', 'd2', 'd2-1', 'd2-0', 'd4', 'd6-1', 'd6-2', 'd6-3', 'd6-4', 'd6-5', 'd6-6', 'd8', 'd10', 'd10-2', 'd12', 'd20', 'd100', 'd200', 'rsb1', 'rsb2', 'rsb3', 'rsb4', 'rsb5', 'circle', 'circle-half', 'circle-down', 'circle-up', 'circle-left', 'circle-right', 'circle-add', 'circle-sub', 'circle-multiply', 'circle-division', 'circle-equals', 'circle-x', 'chess-circle', 'chess-pawn', 'chess-king', 'chess-queen', 'chess-knight', 'chess-bishop', 'chess-rook', 'chess-pieces', 'chess-board', 'calculator', 'weather-0', 'weather-1', 'weather-2', 'weather-3', 'weather-4', 'weather-5', 'weather-6', 'weather-7', 'weather-8', 'weather-9', 'weather-a', 'weather-b', 'weather-c', 'weather-d', 'weather-e', 'weather-f', 'weather-g', 'battery0', 'battery1', 'battery2', 'battery3', 'battery4', 'temp-indicator', 'bullseye', 'bullseye-arrow', 'clone', 'hand', 'heart-full', 'heart-half', 'heart-empty', 'heart-broken', 'floppy-disk', 'down-square', 'people-down', 'arrow-down', 'arrow-up', 'file-box', 'trash', 'deckcard', 'discard', 'eye', 'eye-red', 'bomb', 'clock-hour', 'full-rest', 'move0', 'move1', 'move2', 'move3', 'label-str', 'label-dex', 'label-con', 'label-int', 'label-cha', 'label-basic', 'label-standard', 'label-enhanced', 'label-advanced', 'label-ultimate', 'label-defense', 'yin-yang', 'npc', 'arcane-scroll', 'arcane-scroll-read', 'arcane-spell-book', 'arcane-sceptre', 'arcane-boon', 'arcane-cloak', 'arcane-enhanced', 'arcane-focus', 'arcane-shield', 'arcane-weapon', 'arcane-bonus', 'condition-torment', 'condition-stress', 'condition-droplet', 'condition-exhaustion', 'condition-boon', 'condition-bane', 'condition-incapacitate', 'condition-paralyze', 'condition-petrify', 'condition-grapple', 'condition-restrain', 'condition-charm', 'condition-surprised', 'condition-fright', 'condition-blind', 'condition-hide', 'condition-invisible', 'condition-fatigue', 'condition-stun', 'condition-fury', 'condition-sleep', 'condition-focus', 'condition-dead', 'condition-prone', 'condition-flying', 'condition-falling', 'actions', 'star', 'star-reverse', 'heart-red', 'status-skull', 'status-compass', 'status-milestone', 'status-marker', 'status-fire', 'status-crown', 'status-authority', 'status-bolt', 'status-cat', 'status-pie-full', 'status-pie-half', 'status-pie-quarter', 'status-cover1', 'status-cover2', 'status-cover3', 'status-shield', 'status-timer', 'status-egg', 'status-dragon', 'status-dungeon', 'status-target', 'gear-ammo0', 'gear-ammo1', 'gear-ammo2', 'gear-swords', 'gear-axe', 'gear-battle-axe', 'gear-ring', 'gear-torch', 'gear-ration', 'gear-sack', 'gear-pack', 'gear-potion', 'gear-poison', 'skill-acrobatic', 'skill-might', 'skill-crystal-ball', 'skill-divine', 'skill-deception', 'skill-defense', 'skill-battery', 'skill-intimidation', 'skill-insight', 'skill-magnify', 'skill-book', 'skill-heal', 'skill-leaf', 'skill-perceptive', 'skill-performant', 'skill-persuasion', 'skill-purity', 'skill-legerdemain', 'skill-conceal', 'skill-survivalist', 'skill-tamer', 'skill-wealth', 'skill-helping', 'skill-command', 'skill-encumbrance', 'skill-fortitude', 'skill-halfprof', 'skill-ammo', 'skill-armor', 'skill-trap', 'skill-abacus', 'skill-potionkit', 'skill-artsupplies', 'skill-anvil', 'skill-fork', 'skill-inkwell', 'skill-disguisekit', 'skill-firearm', 'skill-medicalbag', 'skill-miner', 'skill-picks', 'skill-tool', 'skill-tools', 'skill-vehicle', 'skill-goggles', 'skill-wheel', 'skill-sextant', 'skill-fort', 'skill-mansion', 'skill-blimp', 'skill-cart', 'skill-ship', 'skill-broom', 'skill-parachute', 'skill-decoy', 'skill-house', 'skill-property', 'skill-museum', 'skill-mill', 'skill-shop', 'skill-stall', 'skill-tent', 'skill-place', 'skill-sign', 'skill-default', 'status-pentacle', 'status-hero-coin', 'status-inspiration', 'dice0-red', 'dice1-orange', 'dice2-yellow', 'dice3-green', 'dice4-blue', 'dice5-paleblue', 'dice6-purple', 'dice7-pink', 'dice8-light', 'dice9-dark', 'circle-add-reverse'];
    
    const dock = document.getElementById('dock');
    const iconSize = 48;
    const maxScale = 2;
    let buttonIconState = {};

    const inputIds = ['st1', 'st2', 'st3', 'st4', 'st5', 'st6', 'st7', 'st8'];

    const inputToIconMap = {
      st1: 'status-skull',
      st2: 'condition-stress',
      st3: 'condition-droplet',
      st4: 'condition-exhaustion',
      st5: 'condition-torment',
      st6: 'status-compass',
      st7: 'status-milestone',
    };

    function updateDockFromInputs() {
      Object.keys(buttonIconState).forEach(k => delete buttonIconState[k]);
      inputIds.forEach(id => {
        if (id === 'st8') return;
        const input = document.getElementById(id);
        if (!input) return;
        const value = parseInt(input.value) || 0;
        const iconName = inputToIconMap[id];
        if (value > 0) buttonIconState[iconName] = value;
      });
      rebuildDockFromState();
      onDockUpdated();
    }

    function updateInputsFromDock() {
      inputIds.forEach(id => {
        if (id === 'st8') {
          const total = Object.values(buttonIconState).reduce((sum, c) => sum + c, 0);
          const input = document.getElementById(id);
          if (input) input.value = total || '';
        } else {
          const iconName = inputToIconMap[id];
          const count = buttonIconState[iconName] || '';
          const input = document.getElementById(id);
          if (input) input.value = count;
        }
      });
    }

    function updateSVGFromInputs() {
      inputIds.forEach(id => {
        const input = document.getElementById(id);
        const svgText = document.getElementById('char' + id.charAt(0).toUpperCase() + id.slice(1));
        if (input && svgText) {
          svgText.textContent = input.value || '';
        }
      });
    }

    function onDockUpdated() {
      updateInputsFromDock();
      updateSVGFromInputs();
    }

    function setupInputListeners() {
      inputIds.forEach(id => {
        const input = document.getElementById(id);
        if (!input) return;
        input.addEventListener('input', () => {
          updateSVGFromInputs();

          if (id !== 'st8') {
            const iconName = inputToIconMap[id];
            const value = parseInt(input.value) || '';
            buttonIconState[iconName] = value;
            rebuildDockFromState();
          }
        });
      });
    }

    setupInputListeners();

    function addToDock(iconName, count = 1, forceSet = false, rebuild = true) {
      console.log(`addToDock called - icon: ${iconName}, count: ${count}, forceSet: ${forceSet}`);
      if (forceSet) {
        buttonIconState[iconName] = count;
      } else {
        buttonIconState[iconName] = (buttonIconState[iconName] || 0) + count;
      }
      console.log('buttonIconState now:', JSON.stringify(buttonIconState));
      if (rebuild) {
        rebuildDockFromState();
      }
    }

    function rebuildDockFromState() {
      dock.innerHTML = '';

      Object.entries(buttonIconState).forEach(([iconName, count]) => {
        if (count <= 0) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'icon-wrapper';
        wrapper.dataset.source = 'button';

        const icon = document.createElement('div');
        icon.className = `dock-icon bs svgIcon ${iconName}`;

        const counter = document.createElement('div');
        counter.className = 'counter';
        counter.textContent = count;

        icon.appendChild(counter);
        wrapper.appendChild(icon);
        dock.appendChild(wrapper);

        icon.addEventListener('click', e => {
          const rect = icon.getBoundingClientRect();
          const clickY = e.clientY - rect.top;
          const clickedTopHalf = clickY < rect.height / 2;

          buttonIconState[iconName] = buttonIconState[iconName] || 0;
          buttonIconState[iconName] += clickedTopHalf ? 1 : -1;
          buttonIconState[iconName] = Math.max(0, buttonIconState[iconName]);
          counter.textContent = buttonIconState[iconName];
          wrapper.style.display = buttonIconState[iconName] > 0 ? 'block' : 'none';

          updateitAll();
        });
      });

      updateDockDisplay();
    }

    function updateDockDisplay() {
      const anyVisible = [...dock.children].some(w => w.style.display !== 'none');
      dock.style.display = anyVisible ? 'flex' : 'none';
    }

    function loadDockFromURL(obj) {
      Object.keys(buttonIconState).forEach(k => delete buttonIconState[k]);

      if (obj.dock) {
        Object.entries(obj.dock).forEach(([iconName, count]) => {
          buttonIconState[iconName] = count;
        });
      }

      rebuildDockFromState();
    }

    document.addEventListener('mousemove', e => {
      const rect = dock.getBoundingClientRect();
      const icons = [...dock.children];
      icons.forEach(icon => {
        const iconRect = icon.getBoundingClientRect();
        const distance = Math.abs(e.clientX - (iconRect.left + iconRect.width / 2));
        const scale = Math.max(1, maxScale - distance / 100);
        icon.style.transform = `scale(${scale.toFixed(2)})`;
      });
    });

    function addIconCSS() {
      const styleEl = document.createElement('style');
      let css = '';

      icons.forEach(name => {
        const baseName = name.replace('-reverse', '');
        css += `
.${name} {
  background-image: url('img/icon/${baseName}.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
`;
        if (name.includes('-reverse')) {
          css += `
.${name} {
  filter: invert(1);
}
`;
        }
      });

      styleEl.textContent = css;
      document.head.appendChild(styleEl);
    }

    function populateIconBox() {
      const container = document.getElementById('iconBox');
      if (!container) return;

      container.innerHTML = '';

      icons.forEach(iconName => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `${iconName} bs svgIcon`;
        btn.title = iconName;
        btn.innerHTML = '&nbsp;';

        btn.addEventListener('click', () => {
          addToDock(iconName, 1, true);
          updateCharacter({ ...character });
        });

        container.appendChild(btn);
      });
    }



    function getUrlParams() {
      const params = new URLSearchParams(window.location.search);
      const compressedData = params.get('data');

      if (compressedData) {
        try {
          const json = LZString.decompressFromEncodedURIComponent(compressedData);
          const obj = JSON.parse(json);
          currentDieSides = Number(obj.die) || 20;
          postProcessCharacter(obj);

          Object.keys(buttonIconState).forEach(k => delete buttonIconState[k]);

          if (obj.dock) {
            Object.entries(obj.dock).forEach(([iconName, count]) => {
              if (count > 0) addToDock(iconName, count, true);
            });
          }

          updateDockDisplay();

          return obj;
        } catch (e) {
          console.error("Failed to decompress or parse character data:", e);
        }
      }

      let obj = {};
      fields.forEach(field => {
        obj[field] = params.get(field) || getRandomValue(field, obj);
      });
      currentDieSides = Number(obj.die) || 20;
      postProcessCharacter(obj);
      return obj;
    }

    function updateURL(character) {
      const url = new URL(window.location);

      character.dock = { ...buttonIconState };

      const json = JSON.stringify(character);
      const compressed = LZString.compressToEncodedURIComponent(json);
      url.searchParams.set('data', compressed);
      url.searchParams.set('id', generateTimestampID());
      history.replaceState(null, '', url);
    }

    function updateitAll() {
      const formData = new FormData(form);
      const updated = {};

      fields.forEach(f => {
        updated[f] = resolveCustomValue(formData, f);
      });
      updateCharacter(updated);
    }

    function updateCharacter(newData) {
      //console.trace("🔄 updateCharacter", newData.name, newData.id);
      if (!newData.id) {
        newData.id = generateTimestampID();
      }
      character.dock = { ...buttonIconState };
      postProcessCharacter(newData);

      character = { ...character, ...newData };
      currentDieSides = Number(character.die) || 20;
      updateSVG(character);
      populateForm(character);
      updateURL(character);
      handleGoldChange();
      document.title = `Spice TTRPG - ${character.name} - ${character.id}`;
    }
