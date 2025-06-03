// <--- Begin ---> //
    function storageAvailable(type) {
      try {
        const storage = window[type];
        const test = '__storage_test__';
        storage.setItem(test, test);
        storage.removeItem(test);
        return true;
      } catch (e) {
        return false;
      }
    }

    const canStore = isLocalStorageAvailable();

    function getRandomInt(max) {
      return Math.floor(Math.random() * (max + 1));
    }

    function capitalizeList(list) {
      return list.map(capitalize);
    }

    function capitalize(str) {
      return typeof str === 'string' && str.length > 0
        ? str.charAt(0).toUpperCase() + str.slice(1)
        : '';
    }

    function getOutput(object) {
      if (typeof object === 'object' && object !== null && !Array.isArray(object)) {
        var keys = Object.keys(object);
        var myKey = keys[getRandomInt(keys.length - 1)];
        var myVal = object[myKey];
        if (Array.isArray(myVal)) {
          myVal = myVal[getRandomInt(myVal.length - 1)];
        }
        return myKey + ':' + myVal;
      } else if (Array.isArray(object)) {
        var myVal = object[getRandomInt(object.length - 1)];
        return myVal;
      } else if (typeof object === 'string') {
        return object;
      }
    }

    function isLocalStorageAvailable() {
      try {
        const testKey = '__test__';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
      } catch (e) {
        return false;
      }
    }

    if (!isLocalStorageAvailable()) {
      alert("Note: Invert colors won't persist because localStorage is disabled.");
    }

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    let fallbackTheme = 'light';

    function getTheme() {
      if (canStore) {
        return localStorage.getItem('theme') || 'light';
      }
      return fallbackTheme;
    }

    function setTheme(theme) {
      if (canStore) {
        localStorage.setItem('theme', theme);
      } else {
        fallbackTheme = theme;
      }
      document.documentElement.setAttribute('data-theme', theme);
    }

    function applySvgThemeTransparentRed() {
      const elements = svg.querySelectorAll('*');
      elements.forEach(el => {
        let fill = el.getAttribute('fill')?.toLowerCase();
        if (fill === 'transparent' || fill === 'rgba(0,0,0,0)') {
          el.setAttribute('fill', 'rgba(150,0,0,.75)');
        } else if (fill === 'rgba(150,0,0,.75)') {
          el.setAttribute('fill', 'transparent');
        }
      });
    }

    function applySvgTheme(theme) {
      const elements = svg.querySelectorAll('*');
      elements.forEach(el => {
        if (el.tagName.toLowerCase() === 'tspan') return;
        let fill = el.getAttribute('fill')?.toLowerCase();
        if (!fill || fill === '#000') {
          el.setAttribute('fill', '#fff');
        } else if (fill === '#fff') {
          el.setAttribute('fill', '#000');
        } else if (fill === '#e0e0e0') {
          el.setAttribute('fill', '#2F2F2F');
        } else if (fill === '#2f2f2f') {
          el.setAttribute('fill', '#e0e0e0');
        }
        let stroke = el.getAttribute('stroke');
        if (stroke) {
          stroke = stroke.toLowerCase();
          if (stroke === '#000') {
            el.setAttribute('stroke', '#fff');
          } else if (stroke === '#fff' || stroke === '#ffffff') {
            el.setAttribute('stroke', '#000');
          } else if (stroke === '#e0e0e0') {
            el.setAttribute('stroke', '#2F2F2F');
          } else if (stroke === '#2f2f2f') {
            el.setAttribute('stroke', '#e0e0e0');
          }
        }
      });
      setTheme(theme);
    }

    // <--- Begin ---> //
    let currentDieSides = 20;
    let character = {};

    const fields = ["die", "name", "type", "kind", "tier", "back", "size", "stam", "stars", "mStar", "acts", "mAct", "str", "dex", "con", "int", "wis", "cha", "gp", "hp", "mhp", "heart", "half", "broken", "basic", "usual", "heavy", "spell", "maxed", "supra", "god", "body", "block", "armor", "mind", "ethos", "aura", "mad", "walk", "dash", "swim", "clim", "fly", "dig", "cral", "soar", "glid", "hove", "vice", "virt", "flaw", "a1", "a2", "a3", "a4", "b1", "b2", "b3", "b4", "c1", "c2", "lang", "notes", "det", "post"];

    function getRandomValue(key, char = {}) {
      const kindName = char.kind || weightedKinds[Math.floor(Math.random() * weightedKinds.length)].name;
      const sizeList = getKindSize(kindName);
      const data = {
        det: [String(generateStorytime())],
        name: regularNames,
        type: allTypes.map(t => t.name),
        kind: [kindName],
        tier: ["Rookie"],
        back: backgroundDetail.map(t => t.name),
        str: ["0"],
        dex: ["0"],
        con: ["0"],
        int: ["0"],
        wis: ["0"],
        cha: ["0"],
        die: ["20"],
        size: (sizeList),
        stam: ["5"],
        stars: ["0"],
        mStar: ["0"],
        acts: ["0"],
        mAct: ["0"],
        gp: [addCommas(generateRandomGold())],
        hp: ["10"],
        mhp: ["10"],
        heart: ["1"],
        half: ["0"],
        broken: ["0"],
        basic: ["0"],
        usual: ["0"],
        heavy: ["0"],
        spell: ["0"],
        maxed: ["0"],
        supra: ["0"],
        god: ["0"],
        body: ["0"],
        block: ["0"],
        armor: ["0"],
        mind: ["0"],
        ethos: ["5"],
        aura: ["0"],
        mad: ["0"],
        walk: ["0"],
        dash: ["0"],
        swim: ["0"],
        clim: ["0"],
        fly: ["0"],
        soar: ["0"],
        glid: ["0"],
        hove: ["0"],
        dig: ["0"],
        cral: ["0"],
        vice: [...vices],
        virt: [...virtues],
        flaw: [...flaws],
        a1: [""],
        a2: [""],
        a3: [""],
        a4: [""],
        b1: [""],
        b2: [""],
        b3: [""],
        b4: [""],
        c1: [""],
        c2: [""],
        lang: [""],
        notes: [""],
        post: ["0"]
      };

      const list = data[key] || [];
      return list.length ? list[Math.floor(Math.random() * list.length)] : "";
    }

    function postProcessCharacter(char) {
      //console.trace("⚙️ postProcessCharacter called", char.name, char.post);
      const toNum = n => Number(n) || 0;
      const tierIndex = tierLevels.findIndex(t => t.name === char.tier);
      const minStar = tierIndex + 1;
      const minAct = tierIndex + 2;

      if (char.dock) {
        for (const [icon, count] of Object.entries(char.dock)) {
          if (count > 0) {
            addToDock(icon, count, false, true);
          }
        }
      }

      if (char.post === "0") {
        char.mStar = String(minStar);
        char.mAct = String(minAct);
        char.stars = char.mStar;
        char.acts = char.mAct;

        randomizeStatField('allBase', char);
        randomizeLangField(char, allKinds, allLanguages);

        char.post = "1";
      }

      if (!char.size && kindEntry && Array.isArray(kindEntry.size)) {
        let sizes = kindEntry.size.map(s => s.toLowerCase());

        const isCustomSize = document.getElementById('sizeSelect')?.value === '__custom__';
        const customSize = document.getElementById('sizeCustom')?.value;

        if (!(isCustomSize && !customSize)) {
          if (sizes.includes('any')) {
            sizes = sizeLevels.map(s => s.name.toLowerCase());
          }
          const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
          char.size = capitalize(randomSize);
        }
      }

      const bodyMin = Math.round((toNum(char.str) + toNum(char.dex) + toNum(char.con)) / 3);
      const mindMin = Math.round((toNum(char.int) + toNum(char.wis) + toNum(char.cha)) / 3);

      char.body = String(Math.max(toNum(char.body), bodyMin));
      char.mind = String(Math.max(toNum(char.mind), mindMin));

      for (let i = 1; i <= 7; i++) {
        const key = `st${i}`;
        if (char[key] === "0") {
          char[key] = "";
        }
      }

      return char;
    }

    function updateSVG(params) {
      const svgMap = {
        name: "charName",
        type: "charType",
        kind: "charKind",
        tier: "charTier",
        back: "charBack",
        stars: "charStar",
        acts: "charActs",
        str: "charSTR",
        dex: "charDEX",
        con: "charCON",
        int: "charINT",
        wis: "charWIS",
        cha: "charCHA",
        gp: "charGP",
        hp: "charHP",
        mhp: "charMaxHP",
        heart: "charHeart",
        half: "charHalf",
        broken: "charBroken",
        basic: "charBasic",
        usual: "charUsual",
        heavy: "charHeavy",
        spell: "charSpell",
        maxed: "charMaxed",
        supra: "charSupra",
        god: "charGod",
        body: "charBody",
        block: "charBlock",
        armor: "charArmor",
        mind: "charMind",
        ethos: "charEthos",
        aura: "charAura",
        mad: "charMad",
        det: "charDetails",
        notes: "charNotes",
        lang: "charLang",
        walk: "charWalk",
        dash: "charDash",
        swim: "charSwim",
        clim: "charClim",
        fly: "charFly",
        dig: "charDig",
        cral: "charCral",
        vice: "charVice",
        virt: "charVirt",
        flaw: "charFlaw",
        a1: "charProf",
        a2: "charPote",
        a3: "charMast",
        a4: "charDeve",
        b1: "charGear1a",
        b2: "charGear1b",
        b3: "charGear1c",
        b4: "charGear1d",
        c1: "charGear2a",
        c2: "charGear2b"
      };

      const entrySources = {
        kind: allKinds,
        type: allTypes,
        tier: tierLevels,
        back: backgroundDetail
      };

      const currentKindEntry = allKinds.find(kind => kind.name === params.kind);
      const validSizes = currentKindEntry ? currentKindEntry.size.map(size => size.toLowerCase()) : [];

      let currentSize = params.size;
      const isValidSize = validSizes.includes(currentSize.toLowerCase());

      if (!isValidSize) {
        currentSize = currentSize.toUpperCase();
      }

      for (const [key, id] of Object.entries(svgMap)) {
        const el = document.getElementById(id);
        if (!el) continue;

        el.textContent = params[key] || '';

        if (key === 'det') {
          updateSvgMultilineText(el, params.det, 100);
          continue;
        }

        if (key === 'notes') {
          updateSvgMultilineText(el, params.notes, 43);
          continue;
        }

        if (key === 'lang') {
          updateSvgMultilineText(el, params.lang, 20);
          continue;
        }

        if (key === 'a1') {
          updateSvgMultilineText(el, params.a1, 85);
          continue;
        }

        if (key === 'a2') {
          updateSvgMultilineText(el, params.a2, 85);
          continue;
        }

        if (key === 'a3') {
          updateSvgMultilineText(el, params.a3, 85);
          continue;
        }

        if (key === 'a4') {
          updateSvgMultilineText(el, params.a4, 90);
          continue;
        }

        if (key === 'b1') {
          updateSvgMultilineText(el, params.b1, 33);
          continue;
        }

        if (key === 'b2') {
          updateSvgMultilineText(el, params.b2, 35);
          continue;
        }

        if (key === 'b3') {
          updateSvgMultilineText(el, params.b3, 33);
          continue;
        }

        if (key === 'b4') {
          updateSvgMultilineText(el, params.b4, 35);
          continue;
        }

        if (key === 'c1') {
          updateSvgMultilineText(el, params.c1, 85);
          continue;
        }

        if (key === 'c2') {
          updateSvgMultilineText(el, params.c2, 85);
          continue;
        }

        if (!['kind', 'tier', 'type', 'back'].includes(key)) continue;

        const entryList = entrySources[key];

        if (!Array.isArray(entryList)) {
          console.error(`entrySources[${key}] is not an array or is undefined`);
          continue;
        }

        const entry = entryList.find(item => item.name === params[key]);
        if (!entry) {
          el.removeAttribute('data-tooltip');
          continue;
        }

        const tooltipParts = [];

        if (entry.desc) tooltipParts.push(entry.desc);

        if (key === 'kind' && Array.isArray(entry.size)) {
          const normalizedCurrent = currentSize.toLowerCase();
          const normalizedLevels = sizeLevels.map(s => s.name.toLowerCase());
          const currentSizeIndex = normalizedLevels.indexOf(normalizedCurrent);
          const currentSizeDesc = sizeLevels[currentSizeIndex]?.desc || '';

          const sizeList = entry.size.map(size => {
            const normalized = size.toLowerCase();
            const display = normalized === normalizedCurrent
              ? capitalize(size).toUpperCase()
              : capitalize(size);
            return display;
          });

          const normalizedEntrySizes = entry.size.map(s => s.toLowerCase());
          if (!normalizedEntrySizes.includes(normalizedCurrent)) {
            sizeList.push(capitalize(currentSize).toUpperCase());
          }

          tooltipParts.push(`Sizes: ${sizeList.join(', ')}`);

          if (currentSizeDesc) {
            tooltipParts.push(currentSizeDesc);
          }
        }

        if (key === 'type') {
          if (Array.isArray(entry.attributes)) {
            tooltipParts.push(`Skills: ${capitalizeList(entry.attributes).join(', ')}`);
          }
          if (Array.isArray(entry.value)) {
            const abilities = capitalizeList(entry.value);
            if (abilities.length > 0) {
              tooltipParts.push(`Abilities: ${abilities.join(', ')}`);
            }
          }
        }

        if (tooltipParts.length) {
          el.setAttribute('data-tooltip', tooltipParts.join(' • '));
        } else {
          el.removeAttribute('data-tooltip');
        }
      }
    }

    function populateForm(data) {
      suppressFormEvents = true;

      fields.forEach(field => {
        const input = form.elements[field];
        if (!input) return;

        if (input.tagName === 'SELECT') {
          const customInput = form.elements[`${field}Custom`];
          const value = data[field];
          applySelectOrCustom(input, customInput, value);
        } else {
          input.value = data[field] || '';
        }
      });

      suppressFormEvents = false;
    }

    function formatKindLabel(kind) {
      const sizes = kind.size?.join('/') || '';
      return `${kind.name} [${kind.rarity}, ${sizes}]`;
    }

    function buildWeightedKindList(entityData) {
      const baseKinds = ["Human (Base)", "Half-Foot (Base)", "Dwarf (Base)", "Gnome (Base)", "Elf (Base)"];

      const rarityBuckets = {
        base: baseKinds.map(name => ({ name, size: ["Medium"] })),
        common: [],
        uncommon: [],
        rare: [],
        "very rare": []
      };

      entityData.forEach(entity => {
        const rarity = entity.rarity?.toLowerCase();
        if (rarityBuckets[rarity]) {
          rarityBuckets[rarity].push(entity);
        }
      });

      const weights = {
        base: 0.55,
        common: 0.25,
        uncommon: 0.125,
        rare: 0.05,
        "very rare": 0.025
      };

      const TOTAL = 100;
      const weightedKinds = [];

      Object.entries(rarityBuckets).forEach(([rarity, entries]) => {
        const count = Math.floor(weights[rarity] * TOTAL);
        for (let i = 0; i < count; i++) {
          const entity = entries[i % entries.length];
          weightedKinds.push(entity);
        }
      });

      return weightedKinds;
    }

    const weightedKinds = buildWeightedKindList(allKinds);
    const randomKindObj = weightedKinds[Math.floor(Math.random() * weightedKinds.length)];
    const randomKind = randomKindObj.name;

    function getKindSize(kindName) {
      const match = allKinds.find(k => k.name === kindName);

      if (!match || !match.size || match.size.some(s => s.toLowerCase() === "any")) {
        const sizes = sizeLevels.map(s => s.name);
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
        return [randomSize];
      }

      return match.size.map(size => capitalize(size));
    }

    function populateSelectOptions(fieldName, optionsList, includeCustom = false) {
      const select = document.querySelector(`select[name="${fieldName}"]`);
      if (!select) return;

      const existingOptGroups = [...select.querySelectorAll('optgroup')];
      const userGroup = existingOptGroups.find(g => g.label === 'Select');
      if (userGroup) userGroup.remove();

      const group = document.createElement('optgroup');
      group.label = 'Select';

      optionsList.forEach(opt => {
        const option = document.createElement('option');
        option.value = typeof opt === 'object' ? opt.name : opt;
        option.textContent = typeof opt === 'object' ? formatKindLabel(opt) : opt;
        group.appendChild(option);
      });

      select.appendChild(group);

      if (includeCustom && !select.querySelector('optgroup[label="Customize"]')) {
        const customGroup = document.createElement('optgroup');
        customGroup.label = 'Customize';
        const customOption = document.createElement('option');
        customOption.value = '__custom__';
        customOption.textContent = 'Custom...';
        customGroup.appendChild(customOption);
        select.insertBefore(customGroup, select.firstChild);
      }
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

          iconState = obj.dock || {};

          const wrappers = dock.querySelectorAll('.icon-wrapper');
          wrappers.forEach(w => w.remove());

          Object.entries(iconState).forEach(([iconName, count]) => {
            if (count > 0) addToDock(iconName, count, false, true);
          });

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

      character.dock = { ...iconState };

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

    function generateCharacter(wild = false) {
      const data = {};

      if (wild) {
        const kindNames = allKinds.map(t => t.name);
        data.kind = kindNames[Math.floor(Math.random() * kindNames.length)];

        data.name = capitalize(allNames[Math.floor(Math.random() * allNames.length)]);
        data.tier = tierLevels[Math.floor(Math.random() * tierLevels.length)].name;
        data.size = sizeLevels[Math.floor(Math.random() * sizeLevels.length)].name;
      }

      const abilityFields = ["str", "dex", "con", "int", "wis", "cha"];

      fields.forEach(field => {
        if (!abilityFields.includes(field) && data[field] === undefined) {
          data[field] = getRandomValue(field, data);
        }
      });

      data.id = generateTimestampID();
      currentDieSides = Number(data.die) || 20;

      updateCharacter(data);
    }

    function toModifier(score) {
      return Math.floor((score - 10) / 2);
    }

    function toScore(mod) {
      return mod * 2 + 10;
    }

    function generateField(key, currentData) {
      currentData[key] = getRandomValue(key, currentData);
      updateCharacter(currentData);
    }

    function resolveCustomValue(formData, field) {
      const value = formData.get(field);
      return value === '__custom__' ? formData.get(`${field}Custom`) || '' : value;
    }

    const fieldConfig = {
      lang: {
        randomize: () => {
          randomizeLangField(character, allKinds, allLanguages);
          return character.lang;
        }
      },
      kind: {
        randomize: () => {
          const kinds = allKinds.map(k => k.name);
          const chosenKind = kinds[Math.floor(Math.random() * kinds.length)];
          const kindEntry = allKinds.find(k => k.name === chosenKind);

          if (kindEntry && kindEntry.size?.length) {
            const sizes = kindEntry.size.map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase());
            const sizePool = sizes.includes("Any") ? sizeLevels.map(s => s.name) : sizes;
            const chosenSize = sizePool[Math.floor(Math.random() * sizePool.length)];
            character.size = chosenSize;
            syncFieldToForm('size', chosenSize);
          }

          return chosenKind;
        }
      },
      size: {
        randomize: () => sizeLevels[Math.floor(Math.random() * sizeLevels.length)].name
      },
      tier: {
        randomize: () => tierLevels[Math.floor(Math.random() * tierLevels.length)].name
      },
      name: {
        randomize: () => allNames[Math.floor(Math.random() * allNames.length)]
      }
    };

    function syncFieldToForm(field, value) {
      const input = form.elements[field];
      if (!input) return;

      if (input.tagName === 'SELECT') {
        const customInput = form.elements[`${field}Custom`];
        applySelectOrCustom(input, customInput, value);
      } else {
        input.value = value;
      }
    }

    function randomizeField(field) {
      const formData = new FormData(form);
      const updated = {};

      fields.forEach(f => {
        updated[f] = resolveCustomValue(formData, f);
      });

      if (["str", "dex", "con", "int", "wis", "cha"].includes(field) || field === 'allBase') {
        randomizeStatField(field, character);
        return;
      }

      let value;
      if (fieldConfig[field]?.randomize) {
        value = fieldConfig[field].randomize();
        updated[field] = value;
        character[field] = value;
      } else {
        value = getRandomValue(field);
        updated[field] = value;
        character[field] = value;
      }

      syncFieldToForm(field, value);

      character = updated;
      updateitAll();
    }

    function randomizeLangField(char, allKinds, allLanguages) {
      const kindData = allKinds.find(k => k.name === char.kind);
      if (!kindData) {
        char.lang = "";
        return;
      }

      const rawLangs = kindData.language || [];
      const knownLangs = [];
      const passiveLangs = [];

      for (let lang of rawLangs) {
        if (lang.startsWith('(') && lang.endsWith(')')) {
          passiveLangs.push(lang);
        } else {
          knownLangs.push(lang);
        }
      }

      const selectedLangs = [];

      if (knownLangs.includes("Common")) {
        selectedLangs.push("Common");
      }

      const intMod = parseInt(char.int ?? "0", 10);
      let baseLangCount = 1;

      if (intMod <= 0) {
        const roll = Math.random();
        baseLangCount = roll < 0.33 ? 2 : (roll < 0.10 ? 3 : 1);
      } else {
        baseLangCount = 1 + Math.floor(intMod / 2);
        if (Math.random() < 0.25) baseLangCount += 1;
      }

      for (let lang of knownLangs) {
        if (!selectedLangs.includes(lang) && selectedLangs.length < baseLangCount) {
          selectedLangs.push(lang);
        }
      }

      while (selectedLangs.length < baseLangCount) {
        const filler = getRandomLanguageByRarity(selectedLangs, allLanguages);
        if (filler) selectedLangs.push(filler);
        else break;
      }

      const allLangsFinal = [...passiveLangs, ...selectedLangs];

      const result = allLangsFinal.map(lang => {
        const cleanName = lang.replace(/[()]/g, "");
        const langData = allLanguages.find(l => l.name === cleanName);
        const fluency = langData ? determineFluency(langData.literacy, intMod) : "♬";
        return `${cleanName}${fluency}`;
      });

      char.lang = result.join(", ");
    }

    function determineFluency(literacy, intMod = 0) {
      const modBonus = (intMod - 1) * 0.03;
      const roll = Math.random() + modBonus;

      switch (literacy) {
        case "Commonplace":
          return roll < 0.7 ? "★" : (roll < 0.95 ? "♬" : "✓");
        case "Moderate":
          return roll < 0.4 ? "★" : (roll < 0.75 ? "♬" : "✓");
        case "Rare":
          return roll < 0.25 ? "★" : (roll < 0.6 ? "♬" : "✓");
        case "Very Rare":
          return roll < 0.15 ? "★" : (roll < 0.5 ? "♬" : "✓");
        default:
          return roll < 0.5 ? "♬" : "✓";
      }
    }

    function getRandomLanguageByRarity(existingLangs, allLanguages) {
      const rarityWeights = {
        "Common": 5,
        "Uncommon": 3,
        "Rare": 2,
        "Very Rare": 1
      };

      const pool = allLanguages.filter(lang => !existingLangs.includes(lang.name));
      const weightedPool = [];

      for (let lang of pool) {
        const weight = rarityWeights[lang.rarity] || 1;
        for (let i = 0; i < weight; i++) {
          weightedPool.push(lang.name);
        }
      }

      if (weightedPool.length === 0) return null;

      return weightedPool[Math.floor(Math.random() * weightedPool.length)];
    }

    function randomizeStatField(field, char, post) {
      const abilityFields = ["str", "dex", "con", "int", "wis", "cha"];
      const genMethod = document.getElementById('abilityGenMethod')?.value || "3d6";
      const rerollMode = document.getElementById('rerollMode')?.value || "none";
      const usePreferred = document.getElementById('usePreferredStats')?.checked;

      if (field === "allBase") {
        let rolledStats, rollsInfo = [];

        if (usePreferred) {
          rolledStats = assignStatsByType(char.type, genMethod, rerollMode);
          rollsInfo = abilityFields.map(f => `${f.toUpperCase()}: ${rolledStats[f]}`);
        } else {
          const scores = generateStatArray(genMethod, rerollMode);
          rolledStats = {};
          scores.forEach((score, i) => {
            rolledStats[abilityFields[i]] = toModifier(score).toString();
            rollsInfo.push(`${abilityFields[i].toUpperCase()}: ${rolledStats[abilityFields[i]]}`);
          });
        }

        Object.assign(char, rolledStats);
        abilityFields.forEach(f => {
          const input = form.elements[f];
          if (input) input.value = char[f];
        });

        if (post) {
          addToHistory({
            result: `Rerolled stats: ${rollsInfo.join(', ')}`,
            firstTotal: null,
            firstMax: null,
            firstMin: null,
            timestamp: new Date().toLocaleTimeString(),
          });
        }

        updateitAll();
        return;
      }

      let score, rollDetail;

      if (usePreferred) {
        const rolledStats = assignStatsByType(char.type, genMethod, rerollMode);
        Object.assign(char, rolledStats);
        score = char[field];
      } else {
        const result = rollStat(genMethod, rerollMode);
        score = toModifier(result.total);
        char[field] = String(score);
      }

      const input = form.elements[field];
      if (input) input.value = String(score);

      addToHistory({
        result: `${field.toUpperCase()}: ${score}`,
        firstTotal: null,
        firstMax: null,
        firstMin: null,
        timestamp: new Date().toLocaleTimeString(),
      });

      updateitAll();
    }

    function getPreferredStatsForType(typeName) {
      const typeEntry = allTypes.find(t => t.name === typeName);
      if (!typeEntry) return [];

      return typeEntry.attributes.map(attr => attributeToStat[attr]).filter(Boolean);
    }

    const ARRAYS = {
      "Standard Array": STANDARD_ARRAY,
      "Low Array": LOW_ARRAY,
      "High Array": HIGH_ARRAY,
      "Spike Array": SPIKE_ARRAY,
      "Flat Array": FLAT_ARRAY,
    };

    function generateStatArray(method = "3d6", reroll = "none") {
      if (ARRAYS[method]) return [...ARRAYS[method]];
      return Array.from({ length: 6 }, () => rollStat(method, reroll).total);
    }

    function assignStatsByType(typeName, method = "3d6", reroll = "none") {
      const rawStats = generateStatArray(method, reroll).sort((a, b) => b - a);
      const abilityFields = ["str", "dex", "con", "int", "wis", "cha"];
      const preferred = getPreferredStatsForType(typeName);
      const remaining = abilityFields.filter(stat => !preferred.includes(stat));
      const statOrder = [...preferred, ...remaining];

      const stats = {};
      statOrder.forEach((stat, i) => {
        const value = rawStats[i] ?? 10;
        stats[stat] = String(toModifier(value));
      });

      return stats;
    }

    function rollDie(num, sides) {
      return Array.from({ length: num }, () => Math.floor(Math.random() * sides) + 1);
    }

    function rollStat(method = "3d6", reroll = "none") {
      let rolls = [];

      switch (method) {
        case "1d4v1d4":
          rolls = rollDie(1, 4);
          break;
        case "1d6v1d6":
        case "1d6v1d4":
        case "1d6":
          rolls = rollDie(1, 6);
          break;
        case "2d6+6":
          rolls = rollDie(2, 6);
          break;
        case "5d6":
          rolls = rollDie(5, 6);
          break;
        case "4d6":
          rolls = rollDie(4, 6);
          break;
        case "3d6":
        default:
          rolls = rollDie(3, 6);
          break;
      }

      if (reroll === "all") {
        rolls = rolls.map(v => v === 1 ? rollDie(1, 6)[0] : v);
      } else if (reroll === "one") {
        const i = rolls.indexOf(1);
        if (i !== -1) rolls[i] = rollDie(1, 6)[0];
      }

      const dropLowest = document.getElementById('dropLowest')?.checked;
      let usedRolls = [...rolls];
      if (dropLowest && rolls.length > 1) {
        const min = Math.min(...rolls);
        const index = rolls.indexOf(min);
        usedRolls.splice(index, 1);
      }

      const base = usedRolls.reduce((a, b) => a + b, 0);

      let total =
        method === "2d6+6"
          ? base + 6
          : method === "1d6v1d6"
            ? ((base - rollDie(1, 6)) * 2) + 10
            : method === "1d6v1d4"
              ? ((base - rollDie(1, 4)) * 2) + 10
              : method === "1d4v1d4"
                ? ((base - rollDie(1, 4)) * 2) + 10
                : method === "1d6"
                  ? base + 10
                  : base;
      return { total, rolls };
    }

    function getPreferredStatsForType(typeName) {
      const typeEntry = allTypes.find(t => t.name === typeName);
      if (!typeEntry) return [];
      return typeEntry.attributes.map(attr => attributeToStat[attr]).filter(Boolean);
    }

    function generateTimestampID(date = new Date()) {
      return date.toISOString().replace(/[:T]/g, '-').split('.')[0];
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

    function applySelectOrCustom(input, customInput, value) {
      const knownOptions = Array.from(input.options).map(opt => opt.value);
      const isCustom = !knownOptions.includes(value);

      input.value = isCustom ? '__custom__' : value;
      input.style.display = isCustom ? 'none' : 'inline-block';

      if (customInput) {
        customInput.style.display = isCustom ? 'inline-block' : 'none';
        customInput.value = isCustom ? value : '';
      }
    }

    const form = document.getElementById('charForm');

    form.addEventListener('input', () => {
      if (suppressFormEvents) return;

      const formData = new FormData(form);
      const data = {};

      fields.forEach(field => {
        data[field] = resolveCustomValue(formData, field);
      });

      updateCharacter(data);
      document.title = `Spice TTRPG - ${data.name} - ${data.id}`;
    });

    document.getElementById('saveDetailsBtn').addEventListener('click', () => {
      const formData = new FormData(form);
      const data = {};

      fields.forEach(field => {
        data[field] = resolveCustomValue(formData, field);
      });

      updateCharacter(data);
      document.title = `Spice TTRPG - ${data.name} - ${data.id}`;

      document.getElementById('unsavedStatus').style.display = 'none';
    });

    document.getElementById('revertDetailsBtn').addEventListener('click', () => {
      const params = new URLSearchParams(window.location.search);
      const compressed = params.get('data');

      if (compressed) {
        try {
          const json = LZString.decompressFromEncodedURIComponent(compressed);
          const obj = JSON.parse(json);
          document.getElementById('det').value = obj.det || '';
        } catch (e) {
          console.error("Error decompressing data:", e);
          document.getElementById('det').value = '';
        }
      } else {
        const originalDetails = params.get('det') || '';
        document.getElementById('det').value = originalDetails;
      }

      document.getElementById('unsavedStatus').style.display = 'none';
    });

    document.getElementById('det').addEventListener('input', () => {
      document.getElementById('unsavedStatus').style.display = 'none';
    });

    function handleCustomSelect(selectId, customId) {
      const select = document.getElementById(selectId);
      const custom = document.getElementById(customId);
      select.addEventListener('change', e => {
        const isCustom = e.target.value === '__custom__';
        select.style.display = isCustom ? 'none' : 'inline-block';
        custom.style.display = isCustom ? 'inline-block' : 'none';
        if (!isCustom) custom.value = '';
      });
    }

    function setupSVGTooltips() {
      const svgtooltip = document.createElement('div');
      Object.assign(svgtooltip.style, {
        position: 'fixed',
        pointerEvents: 'none',
        background: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        padding: '8px 12px',
        borderRadius: '12px',
        fontSize: '24px',
        display: 'none',
        zIndex: 1000,
        maxWidth: '25vw',
        wordWrap: 'break-word',
        textAlign: 'left'
      });
      cardArea.appendChild(svgtooltip);

      document.querySelectorAll('svg *[data-tooltip]').forEach(path => {
        path.addEventListener('mouseenter', () => {
          svgtooltip.textContent = path.getAttribute('data-tooltip');
          svgtooltip.style.display = 'block';
        });

        path.addEventListener('mousemove', e => {
          const { width, height } = svgtooltip.getBoundingClientRect();
          svgtooltip.style.left = `${e.clientX - width / 2}px`;
          svgtooltip.style.top = `${e.clientY + 20}px`;
        });

        path.addEventListener('mouseleave', () => {
          svgtooltip.style.display = 'none';
        });
      });
    }

    function formatKindLabel(kind) {
      const sizes = kind.size?.join('/') || '';
      return `${kind.name} [${kind.rarity}, ${sizes}]`;
    }

    document.addEventListener('DOMContentLoaded', main);

    function main() {
      let suppressFormEvents = false;

      if (getTheme() === 'dark') applySvgTheme('dark');
      document.documentElement.setAttribute('data-theme', getTheme());

      populateSelectOptions('tier', tierLevels.map(t => t.name), false);
      populateSelectOptions('size', sizeLevels.map(t => t.name), true);
      populateSelectOptions('kind', allKinds, true);
      populateSelectOptions('type', allTypes.map(t => t.name), true);
      populateSelectOptions('back', backgroundDetail.map(t => t.name), true);
      populateSelectOptions('abilityGenMethod', [
        "3d6", "4d6", "5d6", "2d6+6", "1d6", "1d6v1d6", "1d6v1d4", "1d4v1d4", "Standard Array", "Low Array", "High Array", "Spike Array", "Flat Array"
      ]);

      const initialData = getUrlParams();
      updateCharacter(initialData);

      handleCustomSelect('tierSelect', 'tierCustom');
      handleCustomSelect('sizeSelect', 'sizeCustom');
      handleCustomSelect('kindSelect', 'kindCustom');
      handleCustomSelect('backSelect', 'backCustom');
      handleCustomSelect('typeSelect', 'typeCustom');

      staminaInput.addEventListener('input', () => {
        handlePositionChange(parseInt(staminaInput.value, 10));
      });

      document.getElementById("arcaneBtn").addEventListener("click", () => {
        document.getElementById("goldHalo4").classList.toggle("hide");
      });

      document.getElementById("focusBtn").addEventListener("click", () => {
        document.getElementById("goldHalo3").classList.toggle("hide");
      });

      document.querySelectorAll('.button').forEach(btn => {
        btn.addEventListener('click', () => {
          const pos = parseInt(btn.getAttribute('data-pos'), 10);
          handlePositionChange(pos);
        });
      });

      let pos = Number(document.getElementById('stam').value);
      updatePosition(movingGroup, pos === 0 ? 1 : pos, 5, 14, 'Y');
      pos === 0 ? movingGroup.classList.add('shake') : '';
      handlePositionChange(Number(document.getElementById('stam').value));

      handleGoldChange();
      document.getElementById('gp').addEventListener('input', () => {
        handleGoldChange();
      });

      document.querySelectorAll('.number-only').forEach(input => {
        const maxLength = parseInt(input.getAttribute('maxlength'), 10);

        if (!isNaN(maxLength)) {
          input.addEventListener('input', () => {
            let value = input.value;

            value = value.replace(/[^0-9-]/g, '');

            if (value.length > maxLength) {
              value = value.slice(0, maxLength);
            }

            input.value = value;
          });
        }
      });

      const bookmarkButton = document.getElementById('reminder');

      bookmarkButton.addEventListener('click', () => {
        updateBookmarkLink();
        openOverlay('bookmarkPanel');
        bookmarkURL.focus();
      });
      bookmarkButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          bookmarkButton.click();
        }
      });

      document.querySelectorAll('.blackbar').forEach((detail) => {
        detail.addEventListener('toggle', () => {
          if (detail.open) {
            document.querySelectorAll('.blackbar').forEach((other) => {
              if (other !== detail) other.removeAttribute('open');
            });
          }
        });
      });

      document.getElementById('kindSelect').addEventListener('change', e => {
        const value = e.target.value.toLowerCase();
        const sizeSelect = document.getElementById('sizeSelect');
        const allSizes = ['tiny', 'small', 'medium', 'large', 'huge'];

        if (value.startsWith('jump:')) {
          const criteria = value.split(':')[1];

          let matches;

          if (criteria === 'any') {
            const randomKind = allKinds[Math.floor(Math.random() * allKinds.length)];
            e.target.value = randomKind.name;

            if (sizeSelect) {
              sizeSelect.value = allSizes[Math.floor(Math.random() * allSizes.length)];
            }

            e.target.dispatchEvent(new Event('change'));
            return;
          }

          if (criteria === 'indefinite') {
            matches = allKinds.filter(k => k.size?.includes('any'));
          } else {
            matches = allKinds.filter(k =>
              k.rarity?.toLowerCase() === criteria || k.size?.some(s => s.toLowerCase() === criteria)
            );
          }

          if (!matches.length) {
            alert(`No matches found for: ${criteria}`);
            return;
          }

          const randomKind = matches[Math.floor(Math.random() * matches.length)];
          e.target.value = randomKind.name;
          e.target.dispatchEvent(new Event('change'));

          return;
        }

        const selectedKind = allKinds.find(k => k.name.toLowerCase() === value);
        if (selectedKind?.size?.length && sizeSelect) {
          const match = [...sizeSelect.options].find(opt =>
            opt.value.toLowerCase() === selectedKind.size[0].toLowerCase()
          );
          if (match) sizeSelect.value = match.value;
        }

        updateitAll();
      });

      setupSVGTooltips();

      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeOverlay();
      });
      document.getElementById('clear-history').addEventListener('click', clearHistory);
      document.getElementById('lookupBtn').addEventListener('click', () => openOverlay('lookupPanel'));
      document.getElementById('moveBtn').addEventListener('click', () => openOverlay('movePanel'));
      document.getElementById('notesBtn').addEventListener('click', () => openOverlay('notesPanel'));
      document.getElementById('skillBtn').addEventListener('click', () => openOverlay('aspectPanel'));
      document.getElementById('abilityBtn').addEventListener('click', () => openOverlay('aspectPanel'));
      document.getElementById('gearBtn').addEventListener('click', () => openOverlay('aspectPanel'));
      document.getElementById('detailsBtn').addEventListener('click', () => openOverlay('detailsPanel'));
      document.getElementById('langBtn').addEventListener('click', () => openOverlay('langPanel'));
      document.getElementById('settingsBtn').addEventListener('click', () => openOverlay('cardsPanel'));

      document.getElementById('storyBtn').addEventListener('click', () => {
        document.getElementById('det').value = generateStorytime();
        updateCount(document.getElementById('det'));
        document.getElementById('unsavedStatus').style.display = 'inline';
      });

      const presetSelect = document.getElementById('presetSelect');

      Object.keys(presets).forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^\w/, c => c.toUpperCase());
        presetSelect.appendChild(option);
      });

      const characterInput = document.getElementById('customSymbols');
      const buttons = document.querySelectorAll('.card-button');

      buttons.forEach(button => {
        button.addEventListener('click', () => {
          const char = button.getAttribute('data-char');
          characterInput.value += char;
          characterInput.focus();
        });
      });

      const customInput = document.getElementById('customSymbols');

      customInput.addEventListener('input', () => {
        const filtered = Array.from(customInput.value).filter(char => allValidSymbols.has(char));
        customInput.value = filtered.join('');
      });

      addIconCSS();
      populateIconBox();
      setupInputListeners();
      updateDockFromInputs();
    }

    // <--- Begin ---> //

    const staminaInput = document.getElementById('stam');
    const movingGroup = document.getElementById('movingGroup');

    function updatePosition(obj, pos, max, step, xy) {
      obj.style.transform = `translate${xy}(${(max - pos) * step}px)`;
    }

    function handlePositionChange(pos) {
      const chevron = document.getElementById('chevron');
      pos = Math.max(0, Math.min(5, pos));

      if (pos === 0) {
        staminaInput.value = Number(0);
        updatePosition(movingGroup, 1, 5, 14, 'Y');
        chevron.classList.add('colorFlash');
        movingGroup.classList.add('shake');
      } else {
        chevron.classList.remove('colorFlash');
        movingGroup.classList.remove('shake');
        staminaInput.value = Number(pos);
        updatePosition(movingGroup, pos, 5, 14, 'Y');
      }
      updateitAll();
    }

    function getGoldPosition(gp) {
      const cleaned = gp.trim().replace(/[^0-9.-]/g, '');
      const gold = Number(cleaned);
      if (isNaN(gold)) return 0;
      if (gold >= 5000000) return 7;
      if (gold >= 500000) return 6;
      if (gold >= 50000) return 5;
      if (gold >= 5000) return 4;
      if (gold >= 500) return 3;
      if (gold >= 50) return 2;
      if (gold >= 5) return 1;
      return 0;
    }

    function handleGoldChange() {
      const gp = document.getElementById('gp').value;
      const pos = getGoldPosition(gp);
      const goldHalo = document.getElementById('goldHalo2');
      updatePosition(goldHalo, pos, 7, -36.5, 'X');
    }

    function generateStorytime() {
      const selectedPersonality = getOutput(personality);
      const traitTags = traitTagMap[selectedPersonality] || ['calm'];
      const pool = metaphors.filter(m => traitTags.some(tag => m.tags.includes(tag)));
      const chosenMetaphor = pool.length > 0 ? pool[getRandomInt(pool.length - 1)].text : getOutput(personalityMetaphor);
      const sentence = `Long ago, they were ${getOutput(origins)} before they ${getOutput(events)}, which led them to the ${getOutput(connections)}, who they ${getOutput(dynamics)}. ` + `This character’s personality is ${selectedPersonality}, like ${chosenMetaphor}. ` + `They look like ${getOutput(looks)}, sound like ${getOutput(sounds)}, and feel like ${getOutput(feels)} when touched. ` + `They smell like ${getOutput(scents)}, and taste like ${getOutput(tastes)}. ` + `Their presence evokes ${getOutput(evocative)}.`
      return sentence;
    }

    function updateCount(textarea) {
      const maxLength = textarea.getAttribute("maxlength");
      const remaining = maxLength - textarea.value.length;
      const counterId = textarea.dataset.counterId;
      const counter = document.getElementById(counterId);
      if (counter) {
        counter.textContent = `${remaining} characters remaining`;
      }
    }

    function updateSvgMultilineText(textElement, rawText, maxLineLength = 40) {
      if (!textElement) {
        console.warn(`Missing SVG text element.`);
        return;
      }

      while (textElement.firstChild) {
        textElement.removeChild(textElement.firstChild);
      }

      const lines = [];
      rawText.split('\n').forEach(line => {
        let currentLine = '';
        line.split(' ').forEach(word => {
          if ((currentLine + word).length > maxLineLength) {
            lines.push(currentLine.trim());
            currentLine = word + ' ';
          } else {
            currentLine += word + ' ';
          }
        });
        if (currentLine.trim()) lines.push(currentLine.trim());
      });

      lines.forEach((line, i) => {
        const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        tspan.setAttribute("x", textElement.getAttribute("x"));
        tspan.setAttribute("dy", i === 0 ? "0" : "1.2em");
        tspan.textContent = line;
        textElement.appendChild(tspan);
      });
    }

    function openOverlay(entry = 'controlPanel') {
      const overlay = document.getElementById('overlay');
      const panels = document.querySelectorAll('.controlPanel');

      if (overlay && panels.length > 0) {
        panels.forEach(panel => {
          panel.style.display = 'none';
        });

        const panel = document.getElementById(entry);
        if (panel) {
          overlay.style.display = 'flex';
          panel.style.display = 'block';
        } else {
          console.warn('Element not found:', entry);
        }
      } else {
        console.warn('Overlay or control panels not found');
      }
    }

    function closeOverlay() {
      const overlay = document.getElementById('overlay');
      if (overlay) {
        overlay.style.display = 'none';
      }
    }

    function goToRules() {
      window.open('rules.html', '_blank');
    }

    // <--- Begin ---> //

    const diceButtons = document.querySelectorAll('.dice');
    const toggleBtn = document.getElementById('toggleButtons');
    const buttonPanel = document.getElementById('buttonPanel');

    toggleBtn.addEventListener('click', () => {
      buttonPanel.classList.toggle('open');
    });

    let buttonTimeout;
    function flashButton() {
      clearTimeout(buttonTimeout);
      buttonPanel.classList.add('open');
      buttonTimeout = setTimeout(() => buttonPanel.classList.remove('open'), 1800);
    }

    const buttonTools = document.getElementById('button-tools');
    buttonTools.addEventListener('click', () => {
      openOverlay('toolPanel');
    });

    const historyBox = document.getElementById('history');
    const toggleHistoryBtn = document.getElementById('toggle-history');
    let historyBoxToggle = false;
    let fadeTimeout = null;

    const toggleHistoryHandler = () => {
      historyBoxToggle = !historyBoxToggle;
      historyBox.classList.toggle('show', historyBoxToggle);
      if (historyBoxToggle) {
        clearTimeout(fadeTimeout);
      }
    };

    toggleHistoryBtn.addEventListener('click', toggleHistoryHandler);
    historyBox.addEventListener('click', toggleHistoryHandler);

    function flashHistory() {
      if (historyBoxToggle) return;

      clearTimeout(fadeTimeout);
      historyBox.classList.add('show');

      fadeTimeout = setTimeout(() => {
        historyBox.classList.remove('show');
      }, 4000);
    }

    function renderHistory() {
      historyBox.innerHTML = rollHistory.map(e => {
        const totalMatch = /=\s*(-?\d+)$/.exec(e.result);
        const total = totalMatch ? parseInt(totalMatch[1], 10) : null;

        let colorClass = e.firstTotal === e.firstMax ? 'max' : e.firstTotal === e.firstMin ? 'min' : 'rolls';

        const clean = e.result.replace(/^[\s\S]*?→\s*/, '');

        const highlighted = clean
          .replace(/\[(.*?)\]/g, (_, rolls) =>
            `<span class="${colorClass}">[${rolls}]</span>`
          )
          .replace(/=\s*(-?\d+)$/, (_, num) =>
            `= <span class="total">${num}</span>`
          );

        return `<div><span class="timestamp">${e.timestamp}</span> ▶ ${highlighted}</div>`;
      }).join('');
    }

    let rollHistory = [];

    function loadHistory() {
      if (canStore) {
        const saved = localStorage.getItem('diceRolls');
        if (saved) {
          rollHistory = JSON.parse(saved);
          renderHistory();
        }
      } else {
        console.warn('LocalStorage is not available, using default history.');
        rollHistory = [];
        renderHistory();
      }
    }

    function saveHistory() {
      if (canStore) {
        localStorage.setItem('diceRolls', JSON.stringify(rollHistory));
      } else {
        console.warn('LocalStorage is not available, history will not be saved.');
      }
    }

    function addToHistory(entry) {
      //console.log("📜 addToHistory:", entry.result);
      rollHistory.push(entry);
      if (rollHistory.length > 20) rollHistory.shift();
      renderHistory();
      saveHistory();
      flashHistory();
    }

    function clearHistory() {
      rollHistory = [];
      if (canStore) {
        localStorage.removeItem('diceRolls');
      } else {
        console.warn('LocalStorage is not available, history will not be cleared from storage.');
      }
      renderHistory();
    }

    // <--- Begin ---> //

    document.getElementById('buttonPanel').addEventListener('click', () => {
      flashButton();
    })

    document.getElementById('togVisBtn').addEventListener('click', () => {
      applySvgThemeTransparentRed();
    });

    document.getElementById('invertBtn').addEventListener('click', () => {
      const current = getTheme();
      const next = current === 'light' ? 'dark' : 'light';
      setTheme(next);
      applySvgTheme(next);
    });

    function countDigits(number) {
      var integerPart = Math.floor(number);
      var numberString = integerPart.toString();
      var count = 0;

      for (let i = 0; i < numberString.length; i++) {
        if (!isNaN(parseInt(numberString[i]))) {
          count++;
        }
      }
      return count;
    }

    function addCommas(number) {
      var formattedNumber = number.toString().replace(/,/g, '');
      if (formattedNumber.includes('e+')) {
        number = BigInt(number);
      }
      var parts = number.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }

    function getSelectedTierRank() {
      const selectedName = document.getElementById("tierSelect").value;
      const tier = tierLevels.find(t => t.name === selectedName);
      return tier ? tier.rank : 0;
    }

    function generateRandomGold() {
      const tier = getSelectedTierRank();
      const ranges = [10, 100, 1000, 10000, 50000, 250000];

      const probabilitiesByTier = {
        0: [0.13, 0.3, 0.3, 0.21, 0.05, 0.01],
        1: [0.07, 0.25, 0.33, 0.25, 0.08, 0.02],
        2: [0.06, 0.2, 0.34, 0.26, 0.10, 0.04],
        3: [0.05, 0.15, 0.3, 0.32, 0.12, 0.06],
        4: [0.03, 0.10, 0.28, 0.36, 0.15, 0.08],
        5: [0.02, 0.1, 0.24, 0.34, 0.2, 0.1]
      };

      const probabilities = probabilitiesByTier[tier] || probabilitiesByTier[5];
      const rand = Math.random();
      let cumulative = 0;

      for (let i = 0; i < ranges.length; i++) {
        cumulative += probabilities[i];
        if (rand <= cumulative) {
          const min = ranges[i] / 10;
          const max = ranges[i];
          return Math.floor(Math.random() * (max - min + 1) + min);
        }
      }

      return ranges[0];
    }

    const input = document.getElementById('gp');

    const MAX_POSITIVE = 99999999999999.99;
    const MAX_NEGATIVE = -999999.99;
    const MAX_DIGITS = 10;
    const MAX_TOTAL_CHARACTERS = MAX_DIGITS + 4;

    input.addEventListener('input', function () {
      let raw = this.value;

      if (raw.length > MAX_TOTAL_CHARACTERS) {
        raw = raw.slice(0, MAX_TOTAL_CHARACTERS);
      }

      const isNeg = raw.startsWith('-');
      const cleaned = raw.replace(/[^0-9.]/g, '');
      const validStr = (isNeg ? '-' : '') + cleaned;

      this.value = validStr;
    });

    input.addEventListener('blur', function () {
      let value = parseFloat(this.value.replace(/,/g, ''));

      if (isNaN(value)) {
        this.value = '';
        return;
      }

      if (value > MAX_POSITIVE) {
        value = MAX_POSITIVE;
      } else if (value < MAX_NEGATIVE) {
        value = MAX_NEGATIVE;
      }

      this.value = addCommas(value.toString());
      updateitAll();
    });

    const changes = {
      more10000Btn: 10000,
      more1000Btn: 1000,
      more100Btn: 100,
      more10Btn: 10,
      more1Btn: 1,
      less1Btn: -1,
      less10Btn: -10,
      less100Btn: -100,
      less1000Btn: -1000,
      less10000Btn: -10000,
    };

    for (const [id, delta] of Object.entries(changes)) {
      document.getElementById(id).addEventListener("click", () => {
        const gpInput = document.getElementById("gp");
        let currentValue = parseFloat(gpInput.value.replace(/,/g, "") || "0");
        const result = currentValue + delta;

        const hasDecimal = gpInput.value.includes(".") || !Number.isInteger(delta);
        gpInput.value = addCommas(hasDecimal ? result.toFixed(2) : result.toString());
        updateitAll();
      });
    }

    ['hp', 'mhp', 'heart', 'half', 'broken'].forEach(id => {
      document.getElementById(id).addEventListener('input', balanceStats);
    });

    document.querySelectorAll('[data-target][data-delta]').forEach(el => {
      el.addEventListener("click", () => {
        const targetId = el.dataset.target;
        const delta = el.dataset.delta;
        const input = document.getElementById(targetId);

        if (!input) return;
        if (delta === 'max' && targetId === 'hp') {
          const mhp = Number(document.getElementById('mhp').value);
          input.value = mhp;
        } else if (delta === 'max' && targetId === 'stars') {
          const mStar = Number(document.getElementById('mStar').value);
          input.value = mStar;
        } else if (delta === 'max' && targetId === 'acts') {
          const mAct = Number(document.getElementById('mAct').value);
          input.value = mAct;
        } else {
          input.value = Number(input.value) + Number(delta);
        }
        balanceStats();
        updateDockFromInputs();
        updateitAll();
      });
    });

    function balanceStats() {
      const hpInput = document.getElementById('hp');
      const maxhpInput = document.getElementById('mhp');
      const heartInput = document.getElementById('heart');
      const halfInput = document.getElementById('half');
      const brokenInput = document.getElementById('broken');

      let hp = Number(hpInput.value);
      let prevMaxhp = Number(maxhpInput.value);
      let heart = Number(heartInput.value);
      let half = Number(halfInput.value);
      let broken = Number(brokenInput.value);

      let proposedMax = heart * 10 + half * 5;

      if (broken > 0 && proposedMax > prevMaxhp) {
        let allowedMax = prevMaxhp;

        while ((heart * 10 + half * 5) > allowedMax) {
          if (half > 0) half--;
          else if (heart > 0) heart--;
          else break;
        }
      }

      let mhp = (heart * 10) + (half * 5);
      maxhpInput.value = mhp;
      heartInput.value = heart;
      halfInput.value = half;

      if (hp > mhp) hp = mhp;
      hpInput.value = hp;
    }

    // <--- Begin Dice Roller ---> //

    function rollDice(diceStr, label = null) {
      const parts = diceStr
        .toLowerCase()
        .replace(/\s+/g, '')
        .match(/([+-]?[^+-]+)/g);

      if (!parts) return { display: 'Invalid roll' };

      let total = 0;
      let allRolls = [];
      let displayParts = [];
      let firstMin = null, firstMax = null, firstTotal = null;
      let firstGroup = true;

      for (const part of parts) {
        const diceMatch = /^([+-]?)(\d*)d(\d+)$/.exec(part);
        const modMatch = /^([+-]?\d+)$/.exec(part);

        if (diceMatch) {
          let [, sign, numStr, sidesStr] = diceMatch;
          let num = parseInt(numStr || '1', 10);
          const sides = parseInt(sidesStr, 10);
          if (isNaN(sides) || sides <= 0) return { display: 'Invalid roll' };

          const multiplier = (sign === '-') ? -1 : 1;
          const rolls = Array.from({ length: num }, () =>
            Math.floor(Math.random() * sides) + 1
          );
          const rollSum = rolls.reduce((a, b) => a + b, 0) * multiplier;
          total += rollSum;
          allRolls.push(...rolls.map(r => r * multiplier));

          let rollStr = rolls.join(', ');
          let labelStr = label;

          if (num === 1 && sides === 2) {
            labelStr = rolls[0] === 1 ? '💎 TAILS' : '👑 HEADS';
            playSound(coinSound);
          } else {
            playSound(diceSound);
          }

          displayParts.push(`${labelStr ? ' ' + labelStr : ''}`);

          displayParts.push(`${multiplier * num}d${sides} [${rollStr}]`);

          if (firstGroup) {
            firstMin = multiplier * num * 1;
            firstMax = multiplier * num * sides;
            firstTotal = rollSum;
            firstGroup = false;
          }
        } else if (modMatch) {
          let mod = parseInt(modMatch[1], 10);
          if (currentDieSides === 100) {
            mod *= 5;
          }
          total += mod;
          displayParts.push(`${mod >= 0 ? '+' : ''}${mod}`);
        } else {
          return { display: 'Invalid roll' };
        }
      }

      const display = `${displayParts.join(' ')} = ${total}`;
      return {
        total,
        rolls: allRolls,
        display,
        firstTotal,
        firstMin,
        firstMax
      };
    }

    function rollFromButton(btn, overrideDiceStr = null) {
      let diceStr = overrideDiceStr ?? btn.dataset.dice;
      const label = btn.dataset.label || null;

      diceStr = diceStr.replace(/dX/i, `d${currentDieSides}`);
      diceStr = diceStr.replace(/#(\w+)/g, (_, varName) => {
        const el = document.getElementById(varName);
        const value = Number(el ? el.textContent : 0);
        return value < 0 ? `${value}` : `+${value}`;
      });

      const { display, firstTotal, firstMin, firstMax } = rollDice(diceStr, label);
      const timestamp = new Date().toLocaleTimeString();

      addToHistory({
        timestamp,
        result: `${diceStr} → ${display}`,
        firstTotal,
        firstMin,
        firstMax
      });
    }

    diceButtons.forEach(btn => {
      btn.addEventListener('click', () => rollFromButton(btn));
    });

    customRollBtn.addEventListener('click', () => {
      var inputVal = document.getElementById('diceNumber').value.trim() || '1dX';
      rollFromButton(customRollBtn, inputVal);
    });

    customRollBtn1.addEventListener('click', () => {
      var inputVal = document.getElementById('dnum1').value.trim() || '1dX';
      rollFromButton(customRollBtn1, inputVal);
    });

    customRollBtn2.addEventListener('click', () => {
      var inputVal = document.getElementById('dnum2').value.trim() || '1dX';
      rollFromButton(customRollBtn2, inputVal);
    });

    customRollBtn3.addEventListener('click', () => {
      var inputVal = document.getElementById('dnum3').value.trim() || '1dX';
      rollFromButton(customRollBtn3, inputVal);
    });

    customRollBtn4.addEventListener('click', () => {
      var inputVal = document.getElementById('dnum4').value.trim() || '1dX';
      rollFromButton(customRollBtn4, inputVal);
    });

    customRollBtn5.addEventListener('click', () => {
      var inputVal = document.getElementById('dnum5').value.trim() || '1dX';
      rollFromButton(customRollBtn5, inputVal);
    });

    loadHistory();

    // <--- Begin Cards ---> //
    const cardArea = document.getElementById('card-area');
    const deck = document.getElementById('deck');
    const settingsBtn = document.getElementById('settingsBtn');
    const modal = document.getElementById('modal');

    const svgElement = document.querySelector('.cardsvg');
    const cardBackSVG = svgElement.outerHTML;

    const standardDeck = [...'🂡🂢🂣🂤🂥🂦🂧🂨🂩🂪🂫🂭🂮🂱🂲🂳🂴🂵🂶🂷🂸🂹🂺🂻🂽🂾🃁🃂🃃🃄🃅🃆🃇🃈🃉🃊🃋🃍🃎🃑🃒🃓🃔🃕🃖🃗🃘🃙🃚🃛🃝🃞'];
    const knightDeck = [...'🂼🃌🂬🃜'];
    const majorArcana = [...'🃠🃡🃢🃣🃤🃥🃦🃧🃨🃩🃪🃫🃬🃭🃮🃯🃰🃱🃲🃳🃴🃵'];
    const threeJokers = [...'🂿', '🃏︎', '🃟'];
    const twoJokers = ['🂿', '🃏︎'];
    const cardback = ['🂠'];
    const subset13 = ['🂿', '🂻', '🂽', '🂾', '🃋', '🃍', '🃎', '🃛', '🃝', '🃞', '🂫', '🂭', '🂮'];
    const subset22 = [...subset13, '🃏︎', '🂱', '🂲', '🃁', '🃂', '🃑', '🃒', '🂡', '🂢'];

    const presets = {
      StandardDeck_52: [...standardDeck],
      StandardJokerDeck_54: [...standardDeck, ...twoJokers],
      NonStandardJokerDeck_55: [...standardDeck, ...threeJokers],
      StandardKnightsDeck_56: [...standardDeck, ...knightDeck],
      TarotDeck_78: [...standardDeck, ...knightDeck, ...majorArcana],
      OrakleDeck_82: [...standardDeck, ...majorArcana, ...knightDeck, ...threeJokers, ...cardback],
      MajorArcanaDeck_22: [...majorArcana],
      CursedDeck_22: [...subset22],
      CursedDeck_13: [...subset13],
      custom: [],
    };

    const allValidSymbols = new Set([
      ...standardDeck,
      ...knightDeck,
      ...majorArcana,
      ...threeJokers,
      ...twoJokers,
      ...cardback,
    ]);

    let drawPile = [];
    let wasJustDragged = false;
    let draggingCardState = {};
    let discardPile = [];
    let activeCards = [];

    function parseCustomSymbols(input) {
      if (!input) return [];
      const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
      const symbols = Array.from(segmenter.segment(input), s => s.segment);
      return symbols.filter(char => allValidSymbols.has(char));
    }

    function applySettings() {
      closeOverlay();

      const selectedPreset = document.getElementById('presetSelect').value;
      let newDeck = [...presets[selectedPreset]];

      if (document.getElementById('cardback').checked) newDeck.push(...cardback);
      if (document.getElementById('twoJokers').checked) newDeck.push(...twoJokers);
      if (document.getElementById('threeJokers').checked) newDeck.push(...threeJokers);
      if (document.getElementById('fourKnights').checked) newDeck.push(...knightDeck);
      if (document.getElementById('majorArcana').checked) newDeck.push(...majorArcana);

      const input = document.getElementById('customSymbols')?.value || '';
      const customCards = parseCustomSymbols(input);
      newDeck.push(...customCards);

      const dedupe = document.getElementById('dedupeToggle').checked;
      if (dedupe) newDeck = [...new Set(newDeck)];

      discardPile.push(...drawPile);
      drawPile = shuffle(newDeck);
      updateCardCounter();
    }

    function shuffle(array) {
      let arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    function getCardStyle(symbol) {
      return cardStyles.find(style => style.symbol === symbol) || { color: '#EFBF04', orakle: '' };
    }

    function getFaceSVG(symbol, isUp) {
      const useImages = document.getElementById('useImages')?.checked;
      const { icon, color, orakle, up, down } = getCardStyle(symbol);
      const toolTipData = `${icon} ${orakle} ${isUp ? 'UP' : 'DOWN'} ${isUp ? up : down}`;

      if (useImages) {
        const filename = symbolToFilename(symbol);
        return `
<img src="img/card/${filename}.jpg" class="cardsvg cardimg" draggable="false" data-tooltip="${toolTipData}">`;
      }

      return `
<svg class="cardsvg" viewBox="0 0 110 160" width="260" height="370"
  style="pointer-events: all; cursor: grab;" data-tooltip="${toolTipData}">
 <rect width="110" height="160" rx="10" ry="10" fill="transparent" stroke="#000" stroke-width="4"/>
 <text x="55" y="95" fill="${color}" font-size="150" text-anchor="middle" alignment-baseline="middle">${symbol}</text>
</svg>`;
    }

    function symbolToFilename(symbol) {
      const code = symbol.codePointAt(0).toString(16);
      return `${code}`;
    }

    const cardtooltip = document.createElement('div');
    cardtooltip.className = 'cardtooltip';
    document.body.appendChild(cardtooltip);

    function spawnCard(symbol) {
      const card = document.createElement('div');
      const useImages = document.getElementById('useImages')?.checked;

      card.className = 'card';
      card.style.left = `${Math.random() * (window.innerWidth - 240)}px`;
      card.style.top = `${Math.random() * (window.innerHeight - 140)}px`;
      card.style.position = 'absolute';
      card.style.width = '260px';
      card.dataset.isUp = Math.random() < 0.5 ? 'true' : 'false';
      card.dataset.side = 'back';
      card.dataset.symbol = symbol;
      card.innerHTML = cardBackSVG;

      const isCursed = symbolToFilename(symbol) === '1f0a0';
      if (isCursed) card.dataset.flipsLeft = '3';

      if (useImages) {
        card.innerHTML = `<img src="img/card/cardback.jpg" class="cardsvg cardimg" draggable="false">`;
      } else {
        card.innerHTML = cardBackSVG;
      }

      function moveTooltip(e) {
        const tooltipWidth = cardtooltip.offsetWidth;
        const tooltipHeight = cardtooltip.offsetHeight;
        const pageWidth = window.innerWidth;
        const pageHeight = window.innerHeight;

        let x = e.clientX + 10;
        let y = e.clientY + 10;

        if (x + tooltipWidth > pageWidth) {
          x = pageWidth - tooltipWidth - 10;
        }

        if (y + tooltipHeight > pageHeight) {
          y = pageHeight - tooltipHeight - 10;
        }

        cardtooltip.style.left = `${x}px`;
        cardtooltip.style.top = `${y}px`;
      }

      function discardCard(e) {
        e.preventDefault();
        if (!card.isConnected) return;

        if (draggingCardState[card.dataset.symbol]) return;

        discardPile.push(symbol);
        card.remove();
        activeCards = activeCards.filter(c => c !== card);
        cardtooltip.style.display = 'none';
      }

      card.addEventListener('mouseover', (e) => {
        const target = e.target.closest('[data-tooltip]');

        if (!target || card.dataset.side !== 'face') return;

        cardtooltip.textContent = target.dataset.tooltip;
        cardtooltip.style.display = 'block';
        moveTooltip(e);
      });

      document.addEventListener('mousemove', (e) => {
        if (cardtooltip.style.display === 'block') {
          moveTooltip(e);
        }
      });

      card.addEventListener('mouseout', (e) => {
        const to = e.relatedTarget;
        const fromCard = e.target.closest('.card');
        const toCard = to?.closest('.card');

        if (fromCard === card && toCard !== card) {
          cardtooltip.style.display = 'none';
        }
      });

      let isDraggingCard = false;
      let offsetX, offsetY;

      card.addEventListener('mousedown', (e) => {
        lastDragTime = Date.now();
        e.preventDefault();
        if (e.button !== 0) return;
        isDraggingCard = false;
        offsetX = e.offsetX;
        offsetY = e.offsetY;

        draggingCardState[card.dataset.symbol] = false;

        const onMove = (ev) => {
          if (!isDraggingCard) {
            const dx = ev.clientX - e.clientX;
            const dy = ev.clientY - e.clientY;
            if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
              isDraggingCard = true;
              draggingCardState[card.dataset.symbol] = true;
              wasJustDragged = true;
              discardZone.classList.add('active');
            }
          }

          if (isDraggingCard) {
            card.style.left = `${Math.min(Math.max(0, ev.clientX - offsetX), window.innerWidth - card.offsetWidth)}px`;
            card.style.top = `${Math.min(Math.max(0, ev.clientY - offsetY), window.innerHeight - card.offsetHeight)}px`;
            cardtooltip.style.display = 'none';
          }
        };

        const onUp = () => {
          document.removeEventListener('mousemove', onMove);
          document.removeEventListener('mouseup', onUp);

          const zoneRect = discardZone.getBoundingClientRect();
          const cardRect = card.getBoundingClientRect();
          const cardCenterX = cardRect.left + cardRect.width / 2;
          const cardCenterY = cardRect.top + cardRect.height / 2;

          const isOverDiscard = (
            cardCenterX >= zoneRect.left &&
            cardCenterX <= zoneRect.right &&
            cardCenterY >= zoneRect.top &&
            cardCenterY <= zoneRect.bottom
          );

          if (isDraggingCard && isOverDiscard && card.isConnected) {
            discardPile.push(symbol);
            card.remove();
            activeCards = activeCards.filter(c => c !== card);
          }

          discardZone.classList.remove('active');
          setTimeout(() => { draggingCardState[card.dataset.symbol] = false; }, 300);
        };

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
      });

      card.addEventListener('click', () => {
        if (isDraggingCard) return;

        const useImages = document.getElementById('useImages')?.checked;
        const isCursed = symbolToFilename(card.dataset.symbol) === '1f0a0';
        let flipsLeft = parseInt(card.dataset.flipsLeft || '0');
        if (isCursed && useImages && card.dataset.side === 'back') {
          card.classList.add('cursed');
        }
        if (card.dataset.side === 'back') {
          if (isCursed && flipsLeft > 0 && useImages) {
            card.dataset.flipsLeft = (flipsLeft - 1).toString();
            return;
          } else {
            card.classList.remove('cursed');
          }

          card.dataset.side = 'face';
          const isUp = card.dataset.isUp === 'true';
          card.innerHTML = getFaceSVG(card.dataset.symbol, isUp);
          cardtooltip.style.display = 'block';
        } else {
          card.dataset.side = 'back';
          if (useImages) {
            card.innerHTML = `<img src="img/card/cardback.jpg" class="cardsvg cardimg" draggable="false">`;
          } else {
            card.innerHTML = cardBackSVG;
          }
          cardtooltip.style.display = 'none';
        }
      });

      card.addEventListener('contextmenu', (e) => {
        if (draggingCardState[card.dataset.symbol]) return;
        discardCard(e);
      });

      cardArea.appendChild(card);
      activeCards.push(card);

      const discardZone = document.getElementById('discard-zone');
      discardZone.classList.add('hidden');

      card.addEventListener('mousedown', () => {
        discardZone.classList.remove('hidden');
      });

      card.addEventListener('mouseup', () => {
        discardZone.classList.add('hidden');
      });
    }

    let draggingDeck = false;
    let dragStart = { x: 0, y: 0 };

    deck.addEventListener('mousedown', (e) => {
      draggingDeck = false;
      dragStart = { x: e.clientX, y: e.clientY };
      const onMove = (ev) => {
        const dx = ev.clientX - dragStart.x;
        const dy = ev.clientY - dragStart.y;
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
          draggingDeck = true;
          deck.style.left = `${ev.clientX - 40}px`;
          deck.style.top = `${ev.clientY - 60}px`;
          deck.style.bottom = 'auto';
        }
      };

      const onUp = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });

    function updateCardCounter() {
      const remainingCountElement = document.getElementById('remaining-count');
      remainingCountElement.textContent = drawPile.length;
    }

    deck.addEventListener('click', () => {
      if (draggingDeck) return;
      if (drawPile.length === 0) return;
      const symbol = drawPile.pop();
      spawnCard(symbol);
      updateCardCounter();
    });

    const deckbottom = parseFloat(deck.style.bottom || '0');

    deck.addEventListener('mouseover', () => {
      deck.style.bottom = `${deckbottom + 10}px`;
    });

    deck.addEventListener('mouseout', () => {
      deck.style.bottom = `${deckbottom - 65}px`;
    });

    deck.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      reshuffle();
    });

    function reshuffle() {
      activeCards.forEach(c => c.remove());
      activeCards = [];
      discardPile = [];

      deck.style.left = '-20px';
      deck.style.bottom = '-65px';
      deck.style.top = 'auto';
      applySettings();
      updateCardCounter();
      playSound(shuffleSound);
    }

    drawPile = shuffle([...standardDeck]);

    // <--- Begin Timer ---> //

    let timerId = 0;

    const SEGMENTS = {
      0: ['a', 'b', 'c', 'd', 'e', 'f'],
      1: ['b', 'c'],
      2: ['a', 'b', 'g', 'e', 'd'],
      3: ['a', 'b', 'g', 'c', 'd'],
      4: ['f', 'g', 'b', 'c'],
      5: ['a', 'f', 'g', 'c', 'd'],
      6: ['a', 'f', 'e', 'd', 'c', 'g'],
      7: ['a', 'b', 'c'],
      8: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
      9: ['a', 'b', 'c', 'd', 'f', 'g']
    };

    const allTimers = [];

    function createSevenSegmentDigit() {
      const digit = document.createElement('div');
      digit.className = 'digit';
      ['a', 'b', 'c', 'd', 'e', 'f', 'g'].forEach(seg => {
        const s = document.createElement('div');
        s.className = `segment seg-${seg}`;
        digit.appendChild(s);
      });
      return digit;
    }

    function setDigitValue(digit, value) {
      const segments = SEGMENTS[value] || [];
      digit.querySelectorAll('.segment').forEach(seg => {
        seg.classList.toggle('on', segments.includes(seg.classList[1].split('-')[1]));
      });
    }

    function parseTimeDigits(ms) {
      const totalSec = Math.floor(ms / 1000);
      const hrs = String(Math.floor(totalSec / 3600)).padStart(2, '0');
      const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
      const secs = String(totalSec % 60).padStart(2, '0');
      return [...(hrs + mins + secs)].map(Number);
    }

    class SegmentedTimer {
      constructor(id, saved = null) {
        this.id = id;
        this.time = 0;
        this.originalTime = 0;
        this.interval = null;
        this.countUp = false;
        this.onComplete = null;
        this.color = '#F00';
        this.setColor(this.color);
        this.createElements();
        this.startTimestamp = null;
        this.elapsedTime = 0;
        this.initialized = false;

        allTimers.push(this);
        if (saved) this.restoreState(saved);
        this.updateDisplay();
        if (saved && saved.running) this.start();
      }

      remove() {
        this.pause();
        localStorage.removeItem(`timer-${this.id}`);
        this.el.remove();
        const index = allTimers.findIndex(t => t.id === this.id);
        if (index !== -1) allTimers.splice(index, 1);
        this.updateMasterDisplay();
      }

      setColor(color) {
        this.color = color;

        if (this.digits && this.digits.length) {
          this.digits.forEach(digitEl => {
            digitEl.style.filter = color === '#F00' ? '' : `drop-shadow(0 0 5px ${color})`;
            digitEl.style.color = color;
          });
        }

        const colonEls = this.el?.querySelectorAll('.colon');
        colonEls?.forEach(el => el.style.color = color);
      }

      createElements() {
        this.digits = [];
        this.el = document.createElement('div');
        this.el.className = 'timer';

        this.display = document.createElement('div');
        this.display.className = 'display';

        this.inputs = ['hrs', 'min', 'sec'].map(label => {
          const input = document.createElement('input');
          input.placeholder = label;
          input.dataset.label = label;
          input.className = 'timerInput';
          return input;
        });

        this.inputs.forEach(input => {
          input.addEventListener('input', () => {
            if (this.interval) return;
            this.dirtyInput = true;
            const [hrs, min, sec] = this.inputs.map(i => parseInt(i.value) || 0);
            this.time = ((hrs * 3600) + (min * 60) + sec) * 1000;
            this.originalTime = this.time;
            this.updateDisplay();
          });
        });

        this.messageBox = document.createElement('textarea');
        this.messageBox.placeholder = 'Message on completion...';

        const startBtn = this.makeBtn('Start', () => this.start());
        const pauseBtn = this.makeBtn('Pause', () => this.pause());
        const resetBtn = this.makeBtn('Reset', () => this.reset());
        this.toggleModeBtn = this.makeBtn(`Mode: ${this.countUp ? 'CountUp' : 'CountDown'}`, () => this.toggleMode());
        const removeBtn = this.makeBtn('Remove', () => this.remove());

        this.el.appendChild(this.display);
        this.inputs.forEach(input => this.el.appendChild(input));
        this.el.appendChild(this.messageBox);
        [this.toggleModeBtn, startBtn, pauseBtn, resetBtn].forEach(btn => this.el.appendChild(btn));
        this.el.appendChild(removeBtn);

        const colors = ['#F00', '#FD0', '#F92', '#4D0', '#0CF', '#82E', '#F0F', '#DDD'];

        const colorContainer = document.createElement('div');
        colorContainer.style.marginTop = '8px';

        document.getElementById('timerContainer').appendChild(this.el);
        this.display.innerHTML = '';
        const groups = [[0, 1], [2, 3], [4, 5]];

        groups.forEach((group, i) => {
          group.forEach(idx => {
            const d = createSevenSegmentDigit();
            this.display.appendChild(d);
            this.digits[idx] = d;
          });
          if (i < groups.length - 1) {
            const colon = document.createElement('div');
            colon.className = 'colon';
            colon.textContent = ':';
            this.display.appendChild(colon);
          }
        });

        colors.forEach(color => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.textContent = color.charAt(0).toUpperCase() + color.slice(1);
          btn.style.marginRight = '4px';
          btn.style.backgroundColor = color;
          btn.style.color = '#000';
          btn.style.border = 'none';
          btn.style.padding = '4px 8px';
          btn.style.cursor = 'pointer';
          btn.onclick = () => this.setColor(color);
          colorContainer.appendChild(btn);
        });

        this.setColor('#F00');
        this.el.appendChild(colorContainer);
      }

      makeBtn(text, fn) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = text;
        btn.onclick = fn;
        return btn;
      }

      updateDisplay() {
        const values = parseTimeDigits(this.time);
        this.digits.forEach((d, i) => setDigitValue(d, values[i]));
        this.updateMasterDisplay();
        this.saveState();
      }

      toggleMode() {
        if (this.interval) {
          this.pause();
        }

        this.countUp = !this.countUp;
        this.originalTime = this.time;
        this.elapsedTime = 0;
        this.startTimestamp = null;

        if (this.toggleModeBtn) {
          this.toggleModeBtn.textContent = `Mode: ${this.countUp ? 'CountUp' : 'CountDown'}`;
        }

        this.updateDisplay();
      }

      start() {
        if (this.interval) return;
        if (!this.initialized || this.dirtyInput) {
          if (!this.restored) {
            const [hrs, min, sec] = this.inputs.map(input => parseInt(input.value) || 0);
            const total = ((hrs * 3600) + (min * 60) + sec) * 1000;

            this.originalTime = this.countUp ? 0 : total;
            this.time = this.originalTime;
          }

          this.elapsedTime = 0;
          this.initialized = true;

          this.setOnComplete(() => {
            const timestamp = new Date().toLocaleTimeString();
            addToHistory({
              timestamp,
              result: `Timer: ${this.messageBox.value || `${this.id} finished!`}`
            });
            this.removeFromMaster();
          });
          this.dirtyInput = false;
        }

        this.startTimestamp = Date.now() - this.elapsedTime;

        this.interval = setInterval(() => {
          const now = Date.now();
          this.elapsedTime = now - this.startTimestamp;

          this.time = this.countUp
            ? this.originalTime + this.elapsedTime
            : Math.max(0, this.originalTime - this.elapsedTime);

          if (!this.countUp && this.time <= 0) {
            this.pause();
            if (this.onComplete) this.onComplete();
          }

          this.updateDisplay();
        }, 250);
      }

      pause() {
        clearInterval(this.interval);
        this.interval = null;
        this.elapsedTime = Date.now() - this.startTimestamp;
        this.saveState();
      }

      reset() {
        this.pause();
        const [hrs, min, sec] = this.inputs.map(input => parseInt(input.value) || 0);
        const total = ((hrs * 3600) + (min * 60) + sec) * 1000;
        this.time = total;
        this.originalTime = total;
        this.elapsedTime = 0;
        this.initialized = false;
        this.updateDisplay();
      }

      restoreState(state) {
        this.time = state.time;
        this.originalTime = state.originalTime;
        this.countUp = state.countUp;
        this.messageBox.value = state.message;
        this.color = state.color || '#F00';
        this.setColor(this.color);
        this.setOnComplete(() => alert(this.messageBox.value || `Timer ${this.id} finished!`));
        this.restored = true;
      }

      setOnComplete(callback) {
        this.onComplete = () => {
          callback();
          playSound(timerSound);
        };
      }

      saveState() {
        const state = {
          id: this.id,
          time: this.time,
          originalTime: this.originalTime,
          countUp: this.countUp,
          running: !!this.interval,
          message: this.messageBox.value,
          color: this.color,
          elapsedTime: this.elapsedTime
        };
        localStorage.setItem(`timer-${this.id}`, JSON.stringify(state));
      }

      restoreState(state) {
        this.time = state.time;
        this.originalTime = state.originalTime;
        this.countUp = state.countUp;
        this.elapsedTime = state.elapsedTime || 0;
        this.messageBox.value = state.message;
        this.color = state.color || '#F00';
        this.setColor(this.color);
        this.initialized = true;
      }

      updateMasterDisplay() {
        const master = document.getElementById('masterDisplay');
        const active = allTimers.filter(t => !t.countUp && t.interval);
        if (active.length === 0) {
          master.innerHTML = '';
          return;
        }

        active.sort((a, b) => a.time - b.time);
        const top = active[0];
        const digits = parseTimeDigits(top.time);

        master.innerHTML = '';
        const hoursZero = digits[0] === 0 && digits[1] === 0;

        const groups = hoursZero
          ? [[2, 3], [4, 5]]
          : [[0, 1], [2, 3], [4, 5]];

        groups.forEach((group, i) => {
          group.forEach(d => {
            const digit = createSevenSegmentDigit();
            setDigitValue(digit, digits[d]);
            digit.style.color = top.color;
            digit.style.filter = top.color === '#F00' ? '' : `drop-shadow(0 0 5px ${top.color})`;
            master.appendChild(digit);
          });
          if (i < groups.length - 1) {
            const colon = document.createElement('div');
            colon.className = 'colon';
            colon.style.color = top.color;
            colon.textContent = ':';
            master.appendChild(colon);
          }
        });
      }

      removeFromMaster() {
        this.updateMasterDisplay();
      }
    }

    function addTimer(saved = null) {
      const id = saved ? saved.id : timerId++;
      const timer = new SegmentedTimer(id, saved);
      if (!saved) timerId = Math.max(timerId, id + 1);
      return timer;
    }

    function restoreTimers() {
      const savedTimers = [];
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('timer-')) {
          savedTimers.push(JSON.parse(localStorage.getItem(key)));
        }
      });
      savedTimers.sort((a, b) => a.id - b.id);
      savedTimers.forEach(state => addTimer(state));
      if (savedTimers.length > 0) {
        timerId = savedTimers[savedTimers.length - 1].id + 1;
      }
    }

    restoreTimers();

    if (allTimers.length === 0) {
      addTimer();
    }

    function playSound(base64) {
      const isChecked = document.getElementById('noSound').checked;
      if (isChecked) return;
      const binary = atob(base64);
      const len = binary.length;
      const buffer = new Uint8Array(len);

      for (let i = 0; i < len; i++) {
        buffer[i] = binary.charCodeAt(i);
      }

      const blob = new Blob([buffer], { type: "audio/wav" });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play();
    }

    // <--- Begin Bookmarker ---> //

    const bookmarkLink = document.getElementById('bookmarkLink');
    const bookmarkURL = document.getElementById('bookmarkURL');
    const copyBtn = document.getElementById('copyBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');

    function updateBookmarkLink() {
      const url = window.location.href;
      bookmarkLink.href = url;
      bookmarkURL.value = url;
    }

    copyBtn.addEventListener('click', () => {
      const text = bookmarkURL.value;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          alert('Bookmark URL copied to clipboard!');
        }).catch(() => fallbackCopy());
      } else {
        fallbackCopy();
      }

      function fallbackCopy() {
        bookmarkURL.select();
        bookmarkURL.setSelectionRange(0, 99999);
        document.execCommand('copy');
        alert('Bookmark URL copied to clipboard!');
      }
    });

    // <--- Begin Dock ---> //

    const icons = ['coin', 'd2', 'd2-1', 'd2-0', 'd4', 'd6-1', 'd6-2', 'd6-3', 'd6-4', 'd6-5', 'd6-6', 'd8', 'd10', 'd10-2', 'd12', 'd20', 'd100', 'd200', 'rsb1', 'rsb2', 'rsb3', 'rsb4', 'rsb5', 'circle', 'circle-half', 'circle-down', 'circle-up', 'circle-left', 'circle-right', 'circle-add', 'circle-sub', 'circle-multiply', 'circle-division', 'circle-equals', 'circle-x', 'chess-circle', 'chess-pawn', 'chess-king', 'chess-queen', 'chess-knight', 'chess-bishop', 'chess-rook', 'chess-pieces', 'chess-board', 'calculator', 'weather-0', 'weather-1', 'weather-2', 'weather-3', 'weather-4', 'weather-5', 'weather-6', 'weather-7', 'weather-8', 'weather-9', 'weather-a', 'weather-b', 'weather-c', 'weather-d', 'weather-e', 'weather-f', 'weather-g', 'battery0', 'battery1', 'battery2', 'battery3', 'battery4', 'temp-indicator', 'bullseye', 'bullseye-arrow', 'clone', 'hand', 'heart-full', 'heart-half', 'heart-empty', 'heart-broken', 'floppy-disk', 'down-square', 'people-down', 'arrow-down', 'arrow-up', 'file-box', 'trash', 'deckcard', 'discard', 'eye', 'eye-red', 'bomb', 'clock-hour', 'full-rest', 'move0', 'move1', 'move2', 'move3', 'label-str', 'label-dex', 'label-con', 'label-int', 'label-cha', 'label-basic', 'label-standard', 'label-enhanced', 'label-advanced', 'label-ultimate', 'label-defense', 'yin-yang', 'npc', 'arcane-scroll', 'arcane-scroll-read', 'arcane-spell-book', 'arcane-sceptre', 'arcane-boon', 'arcane-cloak', 'arcane-enhanced', 'arcane-focus', 'arcane-shield', 'arcane-weapon', 'arcane-bonus', 'condition-torment', 'condition-stress', 'condition-droplet', 'condition-exhaustion', 'condition-boon', 'condition-bane', 'condition-incapacitate', 'condition-paralyze', 'condition-petrify', 'condition-grapple', 'condition-restrain', 'condition-charm', 'condition-surprised', 'condition-fright', 'condition-blind', 'condition-hide', 'condition-invisible', 'condition-fatigue', 'condition-stun', 'condition-fury', 'condition-sleep', 'condition-focus', 'condition-dead', 'condition-prone', 'condition-flying', 'condition-falling', 'actions', 'star', 'star-reverse', 'heart-red', 'status-skull', 'status-compass', 'status-milestone', 'status-marker', 'status-fire', 'status-crown', 'status-authority', 'status-bolt', 'status-cat', 'status-pie-full', 'status-pie-half', 'status-pie-quarter', 'status-cover1', 'status-cover2', 'status-cover3', 'status-shield', 'status-timer', 'status-egg', 'status-dragon', 'status-dungeon', 'status-target', 'gear-ammo0', 'gear-ammo1', 'gear-ammo2', 'gear-swords', 'gear-axe', 'gear-battle-axe', 'gear-ring', 'gear-torch', 'gear-ration', 'gear-sack', 'gear-pack', 'gear-potion', 'gear-poison', 'skill-acrobatic', 'skill-might', 'skill-crystal-ball', 'skill-divine', 'skill-deception', 'skill-defense', 'skill-battery', 'skill-intimidation', 'skill-insight', 'skill-magnify', 'skill-book', 'skill-heal', 'skill-leaf', 'skill-perceptive', 'skill-performant', 'skill-persuasion', 'skill-purity', 'skill-legerdemain', 'skill-conceal', 'skill-survivalist', 'skill-tamer', 'skill-wealth', 'skill-helping', 'skill-command', 'skill-encumbrance', 'skill-fortitude', 'skill-halfprof', 'skill-ammo', 'skill-armor', 'skill-trap', 'skill-abacus', 'skill-potionkit', 'skill-artsupplies', 'skill-anvil', 'skill-fork', 'skill-inkwell', 'skill-disguisekit', 'skill-firearm', 'skill-medicalbag', 'skill-miner', 'skill-picks', 'skill-tool', 'skill-tools', 'skill-vehicle', 'skill-goggles', 'skill-wheel', 'skill-sextant', 'skill-fort', 'skill-mansion', 'skill-blimp', 'skill-cart', 'skill-ship', 'skill-broom', 'skill-parachute', 'skill-decoy', 'skill-house', 'skill-property', 'skill-museum', 'skill-mill', 'skill-shop', 'skill-stall', 'skill-tent', 'skill-place', 'skill-sign', 'skill-default', 'status-pentacle', 'status-hero-coin', 'status-inspiration', 'dice0-red', 'dice1-orange', 'dice2-yellow', 'dice3-green', 'dice4-blue', 'dice5-paleblue', 'dice6-purple', 'dice7-pink', 'dice8-light', 'dice9-dark', 'circle-add-reverse'];
    const inputToIconMap = {
      st1: 'condition-torment',
      st2: 'condition-stress',
      st3: 'condition-droplet',
      st4: 'condition-exhaustion',
      st5: 'status-skull',
      st6: 'status-compass',
      st7: 'status-milestone',
    };
    const inputIds = ['st1', 'st2', 'st3', 'st4', 'st5', 'st6', 'st7', 'st8'];

    const dock = document.getElementById('dock');
    const iconSize = 48;
    const maxScale = 2;
    let iconState = {};
    let inputIconState = {};
    let buttonIconState = {};

    function addToDock(iconName, count = 1, fromInput = false, forceSet = false) {
      const state = fromInput ? inputIconState : buttonIconState;

      if (forceSet) {
        state[iconName] = count;
      } else {
        state[iconName] = (state[iconName] || 0) + count;
      }

      // Now rebuild the dock UI based on merged state:
      rebuildDockFromState();
    }

    function rebuildDockFromState() {
      dock.innerHTML = '';

      const merged = { ...inputIconState, ...buttonIconState };

      Object.entries(merged).forEach(([iconName, count]) => {
        if (count <= 0) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'icon-wrapper';
        wrapper.dataset.source = inputIconState[iconName] ? 'input' : 'button';

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

          const state = wrapper.dataset.source === 'input' ? inputIconState : buttonIconState;

          state[iconName] = state[iconName] || 0;
          state[iconName] += clickedTopHalf ? 1 : -1;
          state[iconName] = Math.max(0, state[iconName]);
          counter.textContent = state[iconName];
          wrapper.style.display = state[iconName] > 0 ? 'block' : 'none';

          if (inputIconState[iconName]) {
            const inputId = Object.keys(inputToIconMap).find(key => inputToIconMap[key] === iconName);
            if (inputId) {
              const input = document.getElementById(inputId);
              if (input) input.value = state[iconName];
            }
          }

          updateitAll();
        });
      });

      updateDockDisplay();
    }

    function updateDockFromInputs() {
      Object.keys(inputIconState).forEach(k => delete inputIconState[k]);

      inputIds.forEach(id => {
        if (id === 'st8') return;
        const input = document.getElementById(id);
        if (!input) return;

        const value = parseInt(input.value) || 0;
        const iconName = inputToIconMap[id] || id;

        if (value > 0) {
          inputIconState[iconName] = value;
        }
      });

      rebuildDockFromState();
      updateitAll();
    }

    function updateDockDisplay() {
      const anyVisible = [...dock.children].some(w => w.style.display !== 'none');
      dock.style.display = anyVisible ? 'flex' : 'none';
    }

    function setupInputListeners() {
      inputIds.forEach(id => {
        const input = document.getElementById(id);
        if (!input) return;
        if (id !== 'st8') {
          input.addEventListener('change', updateDockFromInputs);
          input.addEventListener('input', updateDockFromInputs);
        }
      });
    }

    function loadDockFromURL(obj) {
      Object.keys(inputIconState).forEach(k => delete inputIconState[k]);
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

    function getTotalCounters() {
      return Object.values(iconState).reduce((sum, val) => sum + val, 0);
    }

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
          addToDock(iconName, 1, false);
          character.dock = { ...iconState };
          updateCharacter({ ...character });
        });

        container.appendChild(btn);
      });
    }
