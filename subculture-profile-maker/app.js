document.addEventListener('DOMContentLoaded', () => {
  // --- State Configuration ---
  const DEFAULT_STATE = {
    name: 'NAME',
    pronunciation: '한글 독음',
    id: '@IDHERE',
    bio: '한줄소개 및 요약\nEX 저는 드림러고\n배려안해주시면 죽여드립니다',
    speech: '바이오나 한마디를 이곳에 적어보세요 **미키오 바보**',
    desc2: '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세',
    keyword1: 'Keyword',
    keyword2: 'Keyword',
    keyword3: 'Keyword',
    mainTitle: 'MAIN',
    credits: '@출처, 출처, 출처',
    topic1: 'Topic1',
    topic2: 'Topic2',
    topic3: 'Topic3',
    bgUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/73ea9d898dd91395444ffb97be38dae6bc9c120e?width=3000',
    theme: 'default',
    speechAlign: 'center',
    speechBubbleLeft: 535,
    
    // Style settings state
    bgOpacity: 0.7,
    headerBgColor: '#bcbcbc',
    accentColor: '#7c7c7c',
    numTensColor: '#ffffff',
    numUnitsColor: '#ffffff',
    cardBorderColor: '#747474',
    cardRibbonColor: '#bcbcbc',
    circleBorderColor: '#bcbcbc',
    badgeActiveBgColor: '#bcbcbc',
    badgeActiveBorderColor: '#4d4d4d',
    badgeActiveTextColor: '#4d4d4d',
    badgeInactiveBgColor: 'transparent',
    badgeInactiveBorderColor: '#ffffff',
    badgeInactiveTextColor: '#ffffff',
    gradStartColor: '#ffffff',
    gradEndColor: '#737373',
    gradAngle: 180,
    
    // Background Pattern properties
    patternType: 'none',
    patternFgColor: '#ffffff',
    patternBgColor: '#2d3039',
    patternSize: 20,
    
    // Badge status (active states & text values)
    badges: {
      '1차': { checked: true, text: '1차' },
      '2차': { checked: false, text: '2차' },
      '드림': { checked: true, text: '드림' },
      '일상': { checked: true, text: '일상' },
      '게시': { checked: true, text: '게시' },
      'RT': { checked: false, text: 'RT' },
      '마음': { checked: false, text: '마음' },
      '멘션': { checked: true, text: '멘션' }
    },
    
    // Base64 Images
    images: {
      avatar: null,
      avatarOriginal: null,
      subprofile1: null,
      subprofile1Original: null,
      subprofile2: null,
      subprofile2Original: null,
      subprofile3: null,
      subprofile3Original: null,
      block1: null,
      block1Original: null,
      block2: null,
      block2Original: null,
      block3: null,
      block3Original: null,
      bg: null,
      bgOriginal: null,
      headerBg: null,
      headerBgOriginal: null
    }
  };

  let state = JSON.parse(JSON.stringify(DEFAULT_STATE));

  // --- Element Cache ---
  const canvas = document.getElementById('profile-canvas');
  const canvasWrapper = document.querySelector('.canvas-wrapper');
  
  // Preview Elements
  const preview = {
    name: document.getElementById('preview-name'),
    pronunciation: document.getElementById('preview-pronunciation'),
    id: document.getElementById('preview-id'),
    bio: document.getElementById('preview-bio'),
    speech: document.getElementById('preview-speech'),
    desc2: document.getElementById('preview-desc-text-2'),
    keyword1: document.getElementById('preview-keyword-1'),
    keyword2: document.getElementById('preview-keyword-2'),
    keyword3: document.getElementById('preview-keyword-3'),
    mainTitle: document.getElementById('preview-main-title'),
    credits: document.getElementById('preview-credits'),
    topic1: document.getElementById('preview-topic-1'),
    topic2: document.getElementById('preview-topic-2'),
    topic3: document.getElementById('preview-topic-3'),
    avatar: document.getElementById('preview-avatar'),
    subprofile1: document.getElementById('preview-subprofile-1'),
    subprofile2: document.getElementById('preview-subprofile-2'),
    subprofile3: document.getElementById('preview-subprofile-3'),
    block1: document.getElementById('preview-block-1'),
    block2: document.getElementById('preview-block-2'),
    block3: document.getElementById('preview-block-3'),
    bg: document.querySelector('.canvas-bg'),
    patternOverlay: document.querySelector('.canvas-pattern-overlay')
  };

  // Editor Inputs
  const inputs = {
    name: document.getElementById('input-name'),
    pronunciation: document.getElementById('input-pronunciation'),
    id: document.getElementById('input-id'),
    bio: document.getElementById('input-bio'),
    speech: document.getElementById('input-speech'),
    desc2: document.getElementById('input-desc-2'),
    keyword1: document.getElementById('input-keyword-1'),
    keyword2: document.getElementById('input-keyword-2'),
    keyword3: document.getElementById('input-keyword-3'),
    mainTitle: document.getElementById('input-main-title'),
    credits: document.getElementById('input-credits'),
    topic1: document.getElementById('input-topic-1'),
    topic2: document.getElementById('input-topic-2'),
    topic3: document.getElementById('input-topic-3'),
    bgUrl: document.getElementById('input-bg-url'),
    bgOpacity: document.getElementById('slider-bg-opacity'),
    headerBgColor: document.getElementById('color-header-bg'),
    accentColor: document.getElementById('color-accent'),
    numTensColor: document.getElementById('color-num-tens'),
    numUnitsColor: document.getElementById('color-num-units'),
    cardBorderColor: document.getElementById('color-card-border'),
    cardRibbonColor: document.getElementById('color-card-ribbon'),
    circleBorderColor: document.getElementById('color-circle-border'),
    badgeActiveBgColor: document.getElementById('color-badge-active-bg'),
    badgeActiveBorderColor: document.getElementById('color-badge-active-border'),
    badgeActiveTextColor: document.getElementById('color-badge-active-text'),
    badgeInactiveBgColor: document.getElementById('color-badge-inactive-bg'),
    badgeInactiveBorderColor: document.getElementById('color-badge-inactive-border'),
    badgeInactiveTextColor: document.getElementById('color-badge-inactive-text'),
    gradStartColor: document.getElementById('color-grad-start'),
    gradEndColor: document.getElementById('color-grad-end'),
    gradAngle: document.getElementById('input-grad-angle'),
    speechAlign: document.getElementById('select-speech-align'),
    patternFgColor: document.getElementById('color-pattern-fg'),
    patternBgColor: document.getElementById('color-pattern-bg'),
    patternSize: document.getElementById('slider-pattern-size')
  };

  // Zoom management
  let currentZoom = 'auto';

  // --- Zoom Auto-Scale Logic ---
  function adjustZoom() {
    if (currentZoom !== 'auto') return;
    
    const wrapperWidth = canvasWrapper.clientWidth;
    const wrapperHeight = canvasWrapper.clientHeight;
    
    // Padding allowance
    const pad = 40;
    const scaleX = (wrapperWidth - pad) / 1500;
    const scaleY = (wrapperHeight - pad) / 1000;
    
    let scale = Math.min(scaleX, scaleY);
    // Boundary check
    scale = Math.max(0.15, Math.min(scale, 1.5));
    
    document.documentElement.style.setProperty('--zoom-scale', scale.toString());
    document.getElementById('zoom-level').textContent = `Auto (${Math.round(scale * 100)}%)`;
  }

  // --- Tab Navigation Setup ---
  const tabs = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      tab.classList.add('active');
      const contentId = `tab-${tab.dataset.tab}`;
      document.getElementById(contentId).classList.add('active');
    });
  });

  // --- Markdown/Speech Bubble Text Parser ---
  // Converts simple double asterisks **text** to <strong>text</strong>
  function parseSpeechText(text) {
    const boldRegex = /\*\*(.*?)\*\*/g;
    return text.replace(boldRegex, '<strong>$1</strong>');
  }

  // --- Core State Synchronization UI Updater ---
  function updatePreview() {
    // 1. Text synchronization
    preview.name.textContent = state.name;
    preview.pronunciation.textContent = state.pronunciation;
    preview.id.textContent = state.id;
    
    // Handle bio linebreaks
    preview.bio.innerHTML = state.bio.replace(/\n/g, '<br>');
    
    // Parse speech bubble formatting & alignment
    preview.speech.innerHTML = parseSpeechText(state.speech);
    canvas.style.setProperty('--speech-align', state.speechAlign);
    
    // Set speech bubble horizontal position with boundaries
    const bubbleEl = document.querySelector('.speech-bubble-wrapper');
    if (bubbleEl) {
      if (state.speechBubbleLeft === undefined) {
        state.speechBubbleLeft = 535;
      }
      bubbleEl.style.left = `${state.speechBubbleLeft}px`;
      
      const bubbleWidth = bubbleEl.offsetWidth;
      const maxAllowedRight = 1140; // circles left edge is at ~1147px
      
      if (state.speechBubbleLeft + bubbleWidth > maxAllowedRight) {
        state.speechBubbleLeft = Math.max(200, maxAllowedRight - bubbleWidth);
        bubbleEl.style.left = `${state.speechBubbleLeft}px`;
      }
    }
    
    preview.desc2.textContent = state.desc2;
    
    preview.keyword1.textContent = state.keyword1;
    preview.keyword2.textContent = state.keyword2;
    preview.keyword3.textContent = state.keyword3;
    
    preview.mainTitle.textContent = state.mainTitle;
    preview.credits.textContent = state.credits;
    
    preview.topic1.textContent = state.topic1;
    preview.topic2.textContent = state.topic2;
    preview.topic3.textContent = state.topic3;

    // 2. Background & Overlay Opacity Setup
    if (state.images.bg) {
      preview.bg.style.backgroundImage = `url('${state.images.bg}')`;
    } else if (state.bgUrl) {
      preview.bg.style.backgroundImage = `url('${state.bgUrl}')`;
    } else {
      preview.bg.style.backgroundImage = 'none';
    }
    
    // Toggle Background Recrop button
    document.getElementById('btn-recrop-bg').style.display = state.images.bgOriginal ? 'inline-block' : 'none';
    
    canvas.style.setProperty('--overlay-opacity', state.bgOpacity);

    // 2.1 Render Background Patterns
    const patternType = state.patternType;
    const patternFg = state.patternFgColor;
    const hasBgImage = !!(state.images.bg || state.bgUrl);
    const patternBg = hasBgImage ? 'transparent' : state.patternBgColor;
    const pSize = state.patternSize;
    const patternOverlay = preview.patternOverlay;
    
    if (patternType === 'none') {
      patternOverlay.style.backgroundImage = 'none';
      patternOverlay.style.backgroundColor = 'transparent';
    } else if (patternType === 'dots') {
      patternOverlay.style.backgroundImage = `radial-gradient(${patternFg} 20%, transparent 20%)`;
      patternOverlay.style.backgroundSize = `${pSize}px ${pSize}px`;
      patternOverlay.style.backgroundColor = patternBg;
    } else if (patternType === 'stripes') {
      patternOverlay.style.backgroundImage = `linear-gradient(45deg, ${patternFg} 25%, transparent 25%, transparent 50%, ${patternFg} 50%, ${patternFg} 75%, transparent 75%, transparent)`;
      patternOverlay.style.backgroundSize = `${pSize * 2}px ${pSize * 2}px`;
      patternOverlay.style.backgroundColor = patternBg;
    } else if (patternType === 'checker') {
      const half = pSize / 2;
      patternOverlay.style.backgroundImage = `
        linear-gradient(45deg, ${patternFg} 25%, transparent 25%),
        linear-gradient(-45deg, ${patternFg} 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, ${patternFg} 75%),
        linear-gradient(-45deg, transparent 75%, ${patternFg} 75%)
      `;
      patternOverlay.style.backgroundSize = `${pSize}px ${pSize}px`;
      patternOverlay.style.backgroundPosition = `0 0, 0 ${half}px, ${half}px -${half}px, -${half}px 0px`;
      patternOverlay.style.backgroundColor = patternBg;
    }

    // 3. Header Banner Customization
    const topBanner = document.querySelector('.top-banner');
    if (state.images.headerBg) {
      topBanner.style.backgroundImage = `url('${state.images.headerBg}')`;
      canvas.style.setProperty('--header-bg', 'transparent'); // show image
    } else {
      topBanner.style.backgroundImage = 'none';
      canvas.style.setProperty('--header-bg', state.headerBgColor);
    }

    // 3.1 Recrop button visibility
    document.getElementById('btn-recrop-header-bg').style.display = state.images.headerBgOriginal ? 'inline-block' : 'none';

    // 4. Custom theme CSS variables injection
    canvas.style.setProperty('--accent-color', state.accentColor);
    canvas.style.setProperty('--num-tens-color', state.numTensColor);
    canvas.style.setProperty('--num-units-color', state.numUnitsColor);
    canvas.style.setProperty('--card-border', state.cardBorderColor);
    canvas.style.setProperty('--card-ribbon', state.cardRibbonColor);
    canvas.style.setProperty('--circle-border', state.circleBorderColor);
    canvas.style.setProperty('--badge-active-bg', state.badgeActiveBgColor);
    canvas.style.setProperty('--badge-active-border', state.badgeActiveBorderColor);
    canvas.style.setProperty('--badge-active-text', state.badgeActiveTextColor);
    canvas.style.setProperty('--badge-inactive-bg', state.badgeInactiveBgColor);
    canvas.style.setProperty('--badge-inactive-border', state.badgeInactiveBorderColor);
    canvas.style.setProperty('--badge-inactive-text', state.badgeInactiveTextColor);
    canvas.style.setProperty('--grad-start', state.gradStartColor);
    canvas.style.setProperty('--grad-end', state.gradEndColor);
    canvas.style.setProperty('--grad-angle', `${state.gradAngle}deg`);

    // 5. Avatar and Circles
    if (state.images.avatar) {
      preview.avatar.style.backgroundImage = `url('${state.images.avatar}')`;
    } else {
      preview.avatar.style.backgroundImage = 'none';
    }
    document.getElementById('btn-recrop-avatar').style.display = state.images.avatarOriginal ? 'inline-block' : 'none';

    [1, 2, 3].forEach(num => {
      const imgKey = `subprofile${num}`;
      const deleteBtn = document.getElementById(`btn-delete-subprofile-${num}`);
      const recropBtn = document.getElementById(`btn-recrop-subprofile-${num}`);
      if (state.images[imgKey]) {
        preview[`subprofile${num}`].style.backgroundImage = `url('${state.images[imgKey]}')`;
        document.getElementById(`btn-sub-${num}`).textContent = '✓';
        if (deleteBtn) deleteBtn.style.display = 'flex';
        if (recropBtn) recropBtn.style.display = 'flex';
      } else {
        preview[`subprofile${num}`].style.backgroundImage = 'none';
        document.getElementById(`btn-sub-${num}`).textContent = '+';
        if (deleteBtn) deleteBtn.style.display = 'none';
        if (recropBtn) recropBtn.style.display = 'none';
      }
    });

    // 6. Grid Block Images & Labels
    [1, 2, 3].forEach(num => {
      const imgKey = `block${num}`;
      const blockEl = preview[`block${num}`];
      const labelEl = blockEl.querySelector('.block-label');
      const recropBtn = document.getElementById(`btn-recrop-block-${num}`);
      
      if (state.images[imgKey]) {
        blockEl.style.backgroundImage = `url('${state.images[imgKey]}')`;
        blockEl.style.backgroundColor = 'transparent';
        blockEl.style.backgroundBlendMode = 'normal';
        labelEl.style.display = 'none';
        blockEl.classList.add('has-image');
        if (recropBtn) recropBtn.style.display = 'inline-block';
      } else {
        blockEl.style.backgroundImage = '';
        blockEl.style.backgroundColor = '';
        blockEl.style.backgroundBlendMode = '';
        labelEl.style.display = 'block';
        blockEl.classList.remove('has-image');
        if (recropBtn) recropBtn.style.display = 'none';
        
        if (state.theme === 'custom') {
          blockEl.style.backgroundImage = `linear-gradient(${state.gradAngle}deg, ${state.gradStartColor} 0%, ${state.gradEndColor} 100%)`;
          blockEl.style.backgroundColor = '#bcbcbc';
          blockEl.style.backgroundBlendMode = 'normal';
        }
      }
    });

    // 7. Badge Tags Activation
    const badgeElements = document.querySelectorAll('.badge-tag');
    badgeElements.forEach(badge => {
      const key = badge.getAttribute('data-tag-key');
      const config = state.badges[key];
      if (config) {
        badge.textContent = config.text;
        
        if (config.checked) {
          badge.classList.add('active');
          badge.classList.remove('inactive');
        } else {
          badge.classList.add('inactive');
          badge.classList.remove('active');
        }
      }
    });

    // 8. Theme classes
    canvas.className = `profile-canvas theme-${state.theme}`;

    // Save to local storage
    localStorage.setItem('subculture_profile_state', JSON.stringify(state));
  }

  // --- Populate Editor Inputs from State ---
  function populateEditor() {
    inputs.name.value = state.name;
    inputs.pronunciation.value = state.pronunciation;
    inputs.id.value = state.id;
    inputs.bio.value = state.bio;
    inputs.speech.value = state.speech;
    inputs.desc2.value = state.desc2;
    inputs.keyword1.value = state.keyword1;
    inputs.keyword2.value = state.keyword2;
    inputs.keyword3.value = state.keyword3;
    inputs.mainTitle.value = state.mainTitle;
    inputs.credits.value = state.credits;
    inputs.topic1.value = state.topic1;
    inputs.topic2.value = state.topic2;
    inputs.topic3.value = state.topic3;
    inputs.bgUrl.value = state.bgUrl || '';

    // Populate Custom Styling Inputs
    inputs.bgOpacity.value = state.bgOpacity;
    document.getElementById('label-bg-opacity').textContent = state.bgOpacity;
    inputs.headerBgColor.value = state.headerBgColor;
    inputs.accentColor.value = state.accentColor;
    inputs.numTensColor.value = state.numTensColor;
    inputs.numUnitsColor.value = state.numUnitsColor;
    inputs.cardBorderColor.value = state.cardBorderColor;
    inputs.cardRibbonColor.value = state.cardRibbonColor;
    inputs.circleBorderColor.value = state.circleBorderColor;
    inputs.badgeActiveBgColor.value = state.badgeActiveBgColor;
    inputs.badgeActiveBorderColor.value = state.badgeActiveBorderColor;
    inputs.badgeActiveTextColor.value = state.badgeActiveTextColor;
    inputs.badgeInactiveBgColor.value = state.badgeInactiveBgColor === 'transparent' ? '#ffffff' : state.badgeInactiveBgColor;
    inputs.badgeInactiveBorderColor.value = state.badgeInactiveBorderColor;
    inputs.badgeInactiveTextColor.value = state.badgeInactiveTextColor;
    inputs.gradStartColor.value = state.gradStartColor;
    inputs.gradEndColor.value = state.gradEndColor;
    inputs.gradAngle.value = state.gradAngle;

    // Set speech bubble alignment value
    inputs.speechAlign.value = state.speechAlign;

    // Pattern preset buttons active state
    document.querySelectorAll('.pattern-preset-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.pattern === state.patternType);
    });

    // Show/hide pattern settings panel
    document.getElementById('pattern-settings-panel').style.display = state.patternType === 'none' ? 'none' : 'flex';

    // Pattern inputs
    inputs.patternFgColor.value = state.patternFgColor;
    inputs.patternBgColor.value = state.patternBgColor;
    inputs.patternSize.value = state.patternSize;
    document.getElementById('label-pattern-size').textContent = state.patternSize + 'px';

    // Set badge check and text inputs
    for (const key in state.badges) {
      const checkbox = document.getElementById(`check-${key}`);
      const textInput = document.getElementById(`text-${key}`);
      if (checkbox && textInput) {
        checkbox.checked = state.badges[key].checked;
        textInput.value = state.badges[key].text;
      }
    }

    // File name labels
    document.getElementById('name-avatar').textContent = state.images.avatar ? '업로드된 파일 사용 중' : '선택된 파일 없음';
    document.getElementById('name-bg').textContent = state.images.bg ? '업로드된 파일 사용 중' : '선택된 파일 없음';
    document.getElementById('name-header-bg').textContent = state.images.headerBg ? '업로드된 파일 사용 중' : '선택된 파일 없음';
    [1, 2, 3].forEach(num => {
      const blockLabel = document.getElementById(`name-block-${num}`);
      if (blockLabel) {
        blockLabel.textContent = state.images[`block${num}`] ? '업로드된 파일 사용 중' : '선택된 파일 없음';
      }
    });
  }

  // --- State Input Event Binding ---
  function bindInputEvents() {
    // Text bindings
    const textMappings = [
      { element: inputs.name, key: 'name' },
      { element: inputs.pronunciation, key: 'pronunciation' },
      { element: inputs.id, key: 'id' },
      { element: inputs.bio, key: 'bio' },
      { element: inputs.speech, key: 'speech' },
      { element: inputs.desc2, key: 'desc2' },
      { element: inputs.keyword1, key: 'keyword1' },
      { element: inputs.keyword2, key: 'keyword2' },
      { element: inputs.keyword3, key: 'keyword3' },
      { element: inputs.mainTitle, key: 'mainTitle' },
      { element: inputs.credits, key: 'credits' },
      { element: inputs.topic1, key: 'topic1' },
      { element: inputs.topic2, key: 'topic2' },
      { element: inputs.topic3, key: 'topic3' },
      { element: inputs.bgUrl, key: 'bgUrl' }
    ];

    textMappings.forEach(map => {
      map.element.addEventListener('input', (e) => {
        state[map.key] = e.target.value;
        updatePreview();
      });
    });

    // Slider range listener for bgOpacity
    inputs.bgOpacity.addEventListener('input', (e) => {
      state.bgOpacity = e.target.value;
      document.getElementById('label-bg-opacity').textContent = e.target.value;
      updatePreview();
    });

    // Custom color pickers listeners
    const colorMappings = [
      { element: inputs.headerBgColor, key: 'headerBgColor' },
      { element: inputs.accentColor, key: 'accentColor' },
      { element: inputs.numTensColor, key: 'numTensColor' },
      { element: inputs.numUnitsColor, key: 'numUnitsColor' },
      { element: inputs.cardBorderColor, key: 'cardBorderColor' },
      { element: inputs.cardRibbonColor, key: 'cardRibbonColor' },
      { element: inputs.circleBorderColor, key: 'circleBorderColor' },
      { element: inputs.badgeActiveBgColor, key: 'badgeActiveBgColor' },
      { element: inputs.badgeActiveBorderColor, key: 'badgeActiveBorderColor' },
      { element: inputs.badgeActiveTextColor, key: 'badgeActiveTextColor' },
      { element: inputs.badgeInactiveBgColor, key: 'badgeInactiveBgColor' },
      { element: inputs.badgeInactiveBorderColor, key: 'badgeInactiveBorderColor' },
      { element: inputs.badgeInactiveTextColor, key: 'badgeInactiveTextColor' },
      { element: inputs.gradStartColor, key: 'gradStartColor' },
      { element: inputs.gradEndColor, key: 'gradEndColor' }
    ];

    colorMappings.forEach(map => {
      map.element.addEventListener('input', (e) => {
        state[map.key] = e.target.value;
        if (map.key === 'gradStartColor' || map.key === 'gradEndColor') {
          state.theme = 'custom';
        }
        updatePreview();
      });
    });

    // Gradient Angle listener
    inputs.gradAngle.addEventListener('input', (e) => {
      state.gradAngle = parseInt(e.target.value) || 180;
      state.theme = 'custom';
      updatePreview();
    });

    // Speech Bubble Align change listener
    inputs.speechAlign.addEventListener('change', (e) => {
      state.speechAlign = e.target.value;
      updatePreview();
    });

    // Background Pattern Preset button clicks
    document.querySelectorAll('.pattern-preset-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        state.patternType = btn.dataset.pattern;
        
        document.querySelectorAll('.pattern-preset-btn').forEach(b => {
          b.classList.toggle('active', b === btn);
        });
        
        document.getElementById('pattern-settings-panel').style.display = state.patternType === 'none' ? 'none' : 'flex';
        updatePreview();
      });
    });

    // Pattern Colors & Size
    inputs.patternFgColor.addEventListener('input', (e) => {
      state.patternFgColor = e.target.value;
      updatePreview();
    });
    inputs.patternBgColor.addEventListener('input', (e) => {
      state.patternBgColor = e.target.value;
      updatePreview();
    });
    inputs.patternSize.addEventListener('input', (e) => {
      state.patternSize = parseInt(e.target.value) || 20;
      document.getElementById('label-pattern-size').textContent = e.target.value + 'px';
      updatePreview();
    });

    // Badge Checkbox and Text binding
    for (const key in state.badges) {
      const checkbox = document.getElementById(`check-${key}`);
      const textInput = document.getElementById(`text-${key}`);

      checkbox.addEventListener('change', (e) => {
        state.badges[key].checked = e.target.checked;
        updatePreview();
      });

      textInput.addEventListener('input', (e) => {
        state.badges[key].text = e.target.value;
        
        const badgeTag = document.querySelector(`.badge-tag[data-tag-key="${key}"]`);
        if (badgeTag) {
          badgeTag.textContent = e.target.value;
        }
        updatePreview();
      });
    }

    // Badge Card-click toggles
    document.querySelectorAll('.badge-tag').forEach(badge => {
      badge.addEventListener('click', () => {
        const key = badge.getAttribute('data-tag-key');
        const checkbox = document.getElementById(`check-${key}`);
        if (checkbox) {
          checkbox.checked = !checkbox.checked;
          state.badges[key].checked = checkbox.checked;
          updatePreview();
        }
      });
    });

    // Keyboard arrow keys speech bubble positioning
    window.addEventListener('keydown', (e) => {
      const active = document.activeElement;
      if (active && (
        active.tagName === 'INPUT' || 
        active.tagName === 'TEXTAREA' || 
        active.tagName === 'SELECT'
      )) {
        return;
      }
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        state.speechBubbleLeft = Math.max(200, (state.speechBubbleLeft || 535) - 5);
        updatePreview();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const bubbleEl = document.querySelector('.speech-bubble-wrapper');
        const bubbleWidth = bubbleEl ? bubbleEl.offsetWidth : 517;
        const maxAllowedRight = 1140; // circles left edge is at ~1147px
        state.speechBubbleLeft = Math.min(
          maxAllowedRight - bubbleWidth,
          (state.speechBubbleLeft || 535) + 5
        );
        updatePreview();
      }
    });
  }

  // --- Image Upload (Base64 conversion) & Crop Handling ---
  let cropperInstance = null;
  let pendingCropKey = null; // e.g. 'avatar', 'subprofile1', 'block1', 'bg', 'headerBg'
  let pendingCropOriginal = null;
  
  const cropModal = document.getElementById('crop-modal');
  const cropImage = document.getElementById('crop-image');

  // Aspect ratio and output size configs for each upload slot
  const CROP_CONFIGS = {
    avatar: { aspectRatio: 149 / 178, width: 300, height: 358 },
    subprofile1: { aspectRatio: 1, width: 300, height: 300 },
    subprofile2: { aspectRatio: 1, width: 300, height: 300 },
    subprofile3: { aspectRatio: 1, width: 300, height: 300 },
    block1: { aspectRatio: 378 / 233, width: 756, height: 466 },
    block2: { aspectRatio: 1, width: 500, height: 500 },
    block3: { aspectRatio: 632 / 531, width: 1264, height: 1062 },
    bg: { aspectRatio: 1500 / 1000, width: 1500, height: 1000 },
    headerBg: { aspectRatio: 1500 / 264, width: 1500, height: 264 }
  };

  function openCropModal(imageSrc, key) {
    pendingCropKey = key;
    cropImage.src = imageSrc;
    cropModal.style.display = 'flex';
    
    if (cropperInstance) {
      cropperInstance.destroy();
    }
    
    cropImage.onload = () => {
      const config = CROP_CONFIGS[key] || { aspectRatio: NaN };
      cropperInstance = new Cropper(cropImage, {
        aspectRatio: config.aspectRatio,
        viewMode: 1,
        autoCropArea: 1,
        responsive: true,
        restore: false,
        guides: true,
        center: true,
        highlight: false,
        cropBoxMovable: true,
        cropBoxResizable: true,
        toggleDragModeOnDblclick: false
      });
    };
  }

  function closeCropModal() {
    cropModal.style.display = 'none';
    if (cropperInstance) {
      cropperInstance.destroy();
      cropperInstance = null;
    }
    // Clear all file inputs to allow re-uploading the same file
    document.getElementById('file-avatar').value = '';
    [1, 2, 3].forEach(num => {
      document.getElementById(`file-subprofile-${num}`).value = '';
      document.getElementById(`file-block-${num}`).value = '';
    });
    document.getElementById('file-bg').value = '';
    document.getElementById('file-header-bg').value = '';
  }

  document.getElementById('btn-crop-cancel').addEventListener('click', closeCropModal);
  document.getElementById('btn-crop-cancel-x').addEventListener('click', closeCropModal);

  document.getElementById('btn-crop-submit').addEventListener('click', () => {
    if (!cropperInstance || !pendingCropKey) return;
    
    const config = CROP_CONFIGS[pendingCropKey];
    const croppedCanvas = cropperInstance.getCroppedCanvas({
      width: config.width,
      height: config.height
    });
    
    if (croppedCanvas) {
      const croppedBase64 = croppedCanvas.toDataURL('image/png');
      state.images[pendingCropKey + 'Original'] = pendingCropOriginal;
      state.images[pendingCropKey] = croppedBase64;
      
      // If canvas bg was cropped, clear manual URL input
      if (pendingCropKey === 'bg') {
        state.bgUrl = '';
        inputs.bgUrl.value = '';
      }

      populateEditor();
      updatePreview();
    }
    
    closeCropModal();
  });

  function handleImageUpload(inputEl, stateKey, labelEl = null) {
    if (!inputEl) return;
    inputEl.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        pendingCropOriginal = event.target.result;
        openCropModal(event.target.result, stateKey);
      };
      reader.readAsDataURL(file);
    });
  }

  function bindImageEvents() {
    // 1. Avatar Upload
    handleImageUpload(
      document.getElementById('file-avatar'),
      'avatar',
      document.getElementById('name-avatar')
    );

    // 2. Sub profiles (overlapping circles)
    [1, 2, 3].forEach(num => {
      handleImageUpload(
        document.getElementById(`file-subprofile-${num}`),
        `subprofile${num}`
      );
      
      document.getElementById(`btn-sub-${num}`).addEventListener('click', () => {
        document.getElementById(`file-subprofile-${num}`).click();
      });
    });

    // 3. Grid blocks
    [1, 2, 3].forEach(num => {
      handleImageUpload(
        document.getElementById(`file-block-${num}`),
        `block${num}`,
        document.getElementById(`name-block-${num}`)
      );
    });

    // 4. Background upload
    handleImageUpload(
      document.getElementById('file-bg'),
      'bg',
      document.getElementById('name-bg')
    );

    // 5. Header Background upload
    handleImageUpload(
      document.getElementById('file-header-bg'),
      'headerBg',
      document.getElementById('name-header-bg')
    );

    // --- Recrop Buttons Binding ---
    const recropKeys = ['avatar', 'subprofile1', 'subprofile2', 'subprofile3', 'block1', 'block2', 'block3', 'bg', 'headerBg'];
    recropKeys.forEach(key => {
      let btnId = `btn-recrop-${key}`;
      if (key === 'headerBg') btnId = 'btn-recrop-header-bg';
      else if (key.startsWith('subprofile')) btnId = `btn-recrop-${key.replace('subprofile', 'subprofile-')}`;
      else if (key.startsWith('block')) btnId = `btn-recrop-${key.replace('block', 'block-')}`;
      
      const btn = document.getElementById(btnId);
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const originalSrc = state.images[key + 'Original'];
          if (originalSrc) {
            pendingCropOriginal = originalSrc;
            openCropModal(originalSrc, key);
          }
        });
      }
    });

    // --- Image Delete Buttons Binding ---
    const deleteKeys = ['avatar', 'subprofile1', 'subprofile2', 'subprofile3', 'block1', 'block2', 'block3', 'bg', 'headerBg'];
    deleteKeys.forEach(key => {
      let btnId = `btn-delete-${key}`;
      if (key === 'headerBg') btnId = 'btn-delete-header-bg';
      else if (key.startsWith('subprofile')) btnId = `btn-delete-${key.replace('subprofile', 'subprofile-')}`;
      else if (key.startsWith('block')) btnId = `btn-delete-${key.replace('block', 'block-')}`;
      
      const btn = document.getElementById(btnId);
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          state.images[key] = null;
          state.images[key + 'Original'] = null;
          
          let inputId = `file-${key}`;
          if (key === 'headerBg') inputId = 'file-header-bg';
          else if (key.startsWith('subprofile')) inputId = `file-${key.replace('subprofile', 'subprofile-')}`;
          else if (key.startsWith('block')) inputId = `file-${key.replace('block', 'block-')}`;
          
          const inputEl = document.getElementById(inputId);
          if (inputEl) inputEl.value = '';
          
          updatePreview();
          populateEditor();
        });
      }
    });
  }

  // --- Zoom Manual & Autoscale Controls ---
  function bindZoomEvents() {
    window.addEventListener('resize', adjustZoom);
    
    document.getElementById('zoom-in').addEventListener('click', () => {
      let scale = parseFloat(document.documentElement.style.getPropertyValue('--zoom-scale'));
      if (isNaN(scale)) scale = 0.5;
      
      currentZoom = 'manual';
      scale = Math.min(1.5, scale + 0.1);
      
      document.documentElement.style.setProperty('--zoom-scale', scale.toString());
      document.getElementById('zoom-level').textContent = `${Math.round(scale * 100)}%`;
    });

    document.getElementById('zoom-out').addEventListener('click', () => {
      let scale = parseFloat(document.documentElement.style.getPropertyValue('--zoom-scale'));
      if (isNaN(scale)) scale = 0.5;
      
      currentZoom = 'manual';
      scale = Math.max(0.15, scale - 0.1);
      
      document.documentElement.style.setProperty('--zoom-scale', scale.toString());
      document.getElementById('zoom-level').textContent = `${Math.round(scale * 100)}%`;
    });

    // Reset zoom back to auto when clicking the label
    document.getElementById('zoom-level').addEventListener('click', () => {
      currentZoom = 'auto';
      adjustZoom();
    });
  }

  // --- Export PNG Action ---
  function exportPng() {
    const exportBtn = document.getElementById('btn-export');
    const originalText = exportBtn.textContent;
    exportBtn.textContent = '이미지 생성 중...';
    exportBtn.disabled = true;

    // html2canvas rendering hack:
    // html2canvas struggles with element scaling. We must reset scaling to 1.0,
    // position it statically, capture, and restore zoom scale.
    const originalScale = document.documentElement.style.getPropertyValue('--zoom-scale');
    
    // Temp layout restore
    canvas.style.transform = 'none';
    canvas.style.minWidth = '1500px';
    canvas.style.minHeight = '1000px';
    canvasWrapper.style.overflow = 'visible';

    // html2canvas options
    const options = {
      useCORS: true,
      scale: 2, // 2x export scale generates crisp 3000x2000 image
      backgroundColor: null, // preserve alpha
      logging: false,
      allowTaint: true
    };

    html2canvas(canvas, options).then(capturedCanvas => {
      // Revert style transforms immediately
      document.documentElement.style.setProperty('--zoom-scale', originalScale);
      canvas.style.transform = '';
      canvas.style.minWidth = '';
      canvas.style.minHeight = '';
      canvasWrapper.style.overflow = '';
      
      // Download trigger
      const link = document.createElement('a');
      link.download = `subculture_profile_${state.name || 'card'}.png`;
      link.href = capturedCanvas.toDataURL('image/png');
      link.click();
      
      exportBtn.textContent = originalText;
      exportBtn.disabled = false;
    }).catch(err => {
      console.error('Failed to export profile image:', err);
      alert('이미지 내보내기에 실패했습니다. 이미지 URL 로드나 네트워크를 확인해주세요.');
      
      // Revert styles
      document.documentElement.style.setProperty('--zoom-scale', originalScale);
      canvas.style.transform = '';
      canvas.style.minWidth = '';
      canvas.style.minHeight = '';
      canvasWrapper.style.overflow = '';
      
      exportBtn.textContent = originalText;
      exportBtn.disabled = false;
    });
  }

  // --- Init App ---
  function init() {
    // Try to load cached state
    const cached = localStorage.getItem('subculture_profile_state');
    if (cached) {
      try {
        const loadedState = JSON.parse(cached);
        // Ensure new features are merged if cache is outdated
        state = { ...DEFAULT_STATE, ...loadedState };
        state.images = { ...DEFAULT_STATE.images, ...loadedState.images };
        state.badges = { ...DEFAULT_STATE.badges, ...loadedState.badges };
      } catch (e) {
        state = JSON.parse(JSON.stringify(DEFAULT_STATE));
      }
    }

    populateEditor();
    bindInputEvents();
    bindImageEvents();
    bindZoomEvents();
    
    // Zoom auto-scaling trigger
    setTimeout(() => {
      adjustZoom();
      updatePreview();
    }, 100);

    // Export & Reset buttons triggers
    document.getElementById('btn-export').addEventListener('click', exportPng);
    document.getElementById('btn-reset').addEventListener('click', () => {
      if (confirm('프로필 설정을 모두 초기화하시겠습니까?')) {
        state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        localStorage.removeItem('subculture_profile_state');
        populateEditor();
        updatePreview();
      }
    });
  }

  init();
});
