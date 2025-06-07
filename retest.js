    function round(value, decimals = 2) {
      return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }

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

    const fields = ["die", "name", "type", "kind", "tier", "back", "size", "stam", "stars", "mStar", "acts", "mAct", "str", "dex", "con", "int", "wis", "cha", "gp", "hp", "mhp", "heart", "half", "broken", "basic", "usual", "heavy", "spell", "maxed", "supra", "god", "body", "block", "armor", "mind", "ethos", "aura", "mad", "base", "walk", "dash", "swim", "clim", "fly", "dig", "cral", "soar", "glid", "hove", "move", "vice", "virt", "flaw", "a1", "a2", "a3", "a4", "b1", "b2", "b3", "b4", "c1", "c2", "lang", "notes", "det", "post"];

    const randomGenerators = {
      kind: () => getOutput(weightedKinds).name,
      size: (char) => {
        const kind = char.kind || randomGenerators.kind();
        return getOutput(getKindSize(kind));
      },
      name: () => capitalize(getOutput(regularNames)),
      type: () => getOutput(allTypes).name,
      tier: () => "Rookie",
      back: () => getOutput(backgroundDetail).name,
      gp: () => addCommas(generateRandomGold()),
      str: () => "0", dex: () => "0", con: () => "0",
      int: () => "0", wis: () => "0", cha: () => "0",
      die: () => "20", size: () => "Medium",
      hp: () => "10", mhp: () => "10", stam: () => "5",
      stars: () => "0", mStars: () => "0",
      acts: () => "0", mAct: () => "0",
      heart: () => "1", half: () => "0", broken: () => "0", 
      basic: () => "0", usual: () => "0", heavy: () => "0",
      spell: () => "0", maxed: () => "0", supra: () => "0",
      god: () => "0", body: () => "0", mind: () => "0",
      block: () => "0", armor: () => "0",
      ethos: () => "5", aura: () => "0", mad: () => "0", 
      mind: () => "0",
      move: () => "", base: () => "5",
      walk: () => "0", dash: () => "0",
      swim: () => "0", fly: () => "0",
      clim: () => "0", cral: () => "0",
      dig: () => "0", soar: () => "0",
      glid: () => "0", hove: () => "0",
      virt: () => getOutput(virtues),
      vice: () => getOutput(vices),
      flaw: () => getOutput(flaws),
      det: () => String(generateStorytime()),
      a1: () => "", a2: () => "", a3: () => "", a4: () => "", 
      b1: () => "", b2: () => "", b3: () => "", b4: () => "", 
      c1: () => "", c2: () => "", lang: () => "", notes: () => "", 
      post: () => "0"
    };

    function getRandomValue(field, char = {}) {
      const generator = randomGenerators[field];
      return typeof generator === 'function' ? generator(char) : "";
    }

    function getRandomCharacterData(base = {}) {
      const char = { ...base };

      fields.forEach(field => {
        if (char[field] === undefined || char[field] === "") {
          char[field] = getRandomValue(field, char);
        }
      });

      char.id = generateTimestampID();
      return char;
    }

    function generateCharacterStepwise(log = true) {
      const char = {};
      const logFn = log ? console.log : () => {};

      for (const field of fields) {
        char[field] = getRandomValue(field, char);
        logFn(`${field}: ${char[field]}`);
      }

      char.id = generateTimestampID();
      return char;
    }

    function postProcessCharacter(char) {
      //console.trace("⚙️ postProcessCharacter called", char.name, char.post);
      const toNum = n => Number(n) || 0;
      const tierIndex = tierLevels.findIndex(t => t.name === char.tier);
      const minStar = tierIndex + 1;
      const minAct = tierIndex + 2;
      const kindEntry = allKinds.find(k => k.name === char.kind);

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

      if (char.post === "0") {
        char.mStar = String(minStar);
        char.mAct = String(minAct);
        char.stars = char.mStar;
        char.acts = char.mAct;

        randomizeStatField('allBase', char);
        randomizeLangField(char, allKinds, allLanguages);
        setMovement(char.kind);
        char.post = "1";
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
      /*const isValidSize = validSizes.includes(currentSize.toLowerCase());

      if (!isValidSize) {
        currentSize = currentSize.toUpperCase();
      }*/

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
          updateSvgMultilineText(el, params.c1, 80);
          continue;
        }

        if (key === 'c2') {
          updateSvgMultilineText(el, params.c2, 80);
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

    function populateForm(data) {
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

    function getUrlParams() {
      const params = new URLSearchParams(window.location.search);
      const compressed = params.get('data');

      if (compressed) {
        try {
          const json = LZString.decompressFromEncodedURIComponent(compressed);
          const obj = JSON.parse(json);
          currentDieSides = Number(obj.die) || 20;

          if (obj.dock) loadDockFromURL(obj);
          applyFlightModes(obj);
          return obj;
        } catch (e) {
          console.error("Data parse failed:", e);
        }
      }

      const base = {};
      fields.forEach(f => {
        base[f] = params.get(f);
      });

      const final = getRandomCharacterData(base);
      applyFlightModes(final);
      currentDieSides = Number(final.die) || 20;
      return final;
    }

    window.debugStepChar = () => {
      const c = generateCharacterStepwise();
      console.table(c);
      return c;
    };

    function updateURL(character) {
      const url = new URL(window.location);

      character.soar = soarCheckbox.checked ? "1" : "0";
      character.glide = glideCheckbox.checked ? "1" : "0";
      character.hover = hoverCheckbox.checked ? "1" : "0";
      character.dock = { ...buttonIconState };
      character.move = document.getElementById('move').value;

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
      postProcessCharacter(newData);

      character = { ...character, ...newData };
      currentDieSides = Number(character.die) || 20;

      updateSVG(character);
      populateForm(character);
      updateURL(character);
      handleGoldChange();
      document.title = `Spice TTRPG - ${character.name} - ${character.id}`;
    }

    function generateCharacter(wild = false) {
      let data = {};

      if (wild) {
        data.kind = getOutput(allKinds).name;
        data.name = capitalize(getOutput(allNames));
        data.tier = getOutput(tierLevels).name;
        data.size = getOutput(sizeLevels).name;
      }

      data = getRandomCharacterData(data);
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
        const displayLang =
          lang.startsWith("(") && lang.endsWith(")") && Math.random() < 0.5
            ? lang.slice(1, -1)
            : lang;

        const langKey = displayLang.replace(/[()]/g, ""); // used only for lookup
        const langData = allLanguages.find(l => l.name === langKey);
        const fluency = langData ? determineFluency(langData.literacy, intMod) : "🔊︎";
        return `${displayLang}${fluency}`;
      });

      char.lang = result.join(", ");
    }

    function determineFluency(literacy, intMod = 0) {
      const modBonus = (intMod - 1) * 0.03;
      const roll = Math.random() + modBonus;

      switch (literacy) {
        case "Commonplace":
          return roll < 0.7 ? "★" : (roll < 0.95 ? "🔊︎" : "✎");
        case "Moderate":
          return roll < 0.4 ? "★" : (roll < 0.75 ? "🔊︎" : "✎");
        case "Rare":
          return roll < 0.25 ? "★" : (roll < 0.6 ? "🔊︎" : "✎");
        case "Very Rare":
          return roll < 0.15 ? "★" : (roll < 0.5 ? "🔊︎" : "✎");
        default:
          return roll < 0.5 ? "🔊︎" : "✎";
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
      if (getTheme() === 'dark') applySvgTheme('dark');
      document.documentElement.setAttribute('data-theme', getTheme());

      populateSelectOptions('tier', tierLevels.map(t => t.name), false);
      populateSelectOptions('size', sizeLevels.map(t => t.name), true);
      populateSelectOptions('kind', allKinds, true);
      populateSelectOptions('type', allTypes.map(t => t.name), true);
      populateSelectOptions('back', backgroundDetail.map(t => t.name), true);
      populateSelectOptions("move", generatemoveOptions(), false);
      populateSelectOptions('abilityGenMethod', [
        "3d6", "4d6", "5d6", "2d6+6", "1d6", "1d6v1d6", "1d6v1d4", "1d4v1d4", "Standard Array", "Low Array", "High Array", "Spike Array", "Flat Array"
      ]);

      const initialData = getUrlParams();
      if (initialData.kind) {
        setMovementDrop(initialData.kind);
      }
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

      const bookmarkButton = document.getElementById('reminderBtn');

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
      document.getElementById('skillBtn').addEventListener('click', () => openOverlay('abilityPanel'));
      document.getElementById('abilityBtn').addEventListener('click', () => openOverlay('abilityPanel'));
      document.getElementById('gearBtn').addEventListener('click', () => openOverlay('gearPanel'));
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
    }
