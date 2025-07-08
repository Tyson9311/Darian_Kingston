let currentLevel = parseInt(new URLSearchParams(window.location.search).get("level")) || 1;
let selectedTube = null;
let tubes = [];

function startLevel(level) {
  // Sample tubes for testing (replace with real level generator)
  tubes = [
    ["red", "blue", "green", "green"],
    ["blue", "red", "green", "blue"],
    ["red", "blue", "red"],
    [],
    []
  ];

  renderTubes(tubes);
}

function renderTubes(tubes) {
  const container = document.getElementById("tubeContainer");
  container.innerHTML = "";

  tubes.forEach((tube, index) => {
    const tubeDiv = document.createElement("div");
    tubeDiv.classList.add("tube");
    tubeDiv.dataset.index = index;

    tube.forEach((color) => {
      const slot = document.createElement("div");
      slot.classList.add("tube-slot");
      slot.style.background = color;
      tubeDiv.appendChild(slot);
    });

    tubeDiv.onclick = () => {
      if (!selectedTube) {
        selectedTube = tubeDiv;
        tubeDiv.classList.add("selected");
      } else {
        if (tubeDiv !== selectedTube) {
          const fromIndex = parseInt(selectedTube.dataset.index);
          const toIndex = parseInt(tubeDiv.dataset.index);

          const success = pour(fromIndex, toIndex);
          if (success) {
            animatePour(selectedTube, tubeDiv);
          }
        }
        selectedTube.classList.remove("selected");
        selectedTube = null;
      }
    };

    container.appendChild(tubeDiv);
  });
}

function pour(from, to) {
  const fromIndex = parseInt(from.dataset.index);
  const toIndex = parseInt(to.dataset.index);

  if (!tubes[fromIndex].length) return false;
  if (tubes[toIndex].length >= 4) return false;

  const color = tubes[fromIndex].pop();
  tubes[toIndex].push(color);
  renderTubes(tubes);
  return true;
}

function animatePour(from, to) {
  const anim = document.createElement('div');
  anim.classList.add('pour-effect');
  document.body.appendChild(anim);

  const fromRect = from.getBoundingClientRect();
  const toRect = to.getBoundingClientRect();

  anim.style.left = `${fromRect.left + fromRect.width / 2}px`;
  anim.style.top = `${fromRect.top}px`;

  const xDiff = toRect.left - fromRect.left;
  const yDiff = toRect.top - fromRect.top;

  anim.style.setProperty('--dx', `${xDiff}px`);
  anim.style.setProperty('--dy', `${yDiff}px`);

  setTimeout(() => anim.remove(), 600);
}

function goHome() {
  window.location.href = "index.html";
}

// 🚀 Start the level
startLevel(currentLevel);
