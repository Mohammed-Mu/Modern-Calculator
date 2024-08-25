const lightTheme = "styles/light.css";
const darkTheme = "styles/dark.css";
const sunIcon = "assets/SunIcon.svg";
const moonIcon = "assets/MoonIcon.svg";
const themeIcon = document.getElementById("theme-icon");
const res = document.getElementById("result");
const toast = document.getElementById("toast");
let isScientificMode = false; // Flag to track the mode

function playSound() {
  const audio = new Audio('assets/beep.mp3');
  audio.play();
}

function calculate(value) {
  try {
    if (value.includes('sqrt')) {
      value = value.replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt($1)');
    }
    if (value.includes('sin')) {
      value = value.replace(/sin\(([^)]+)\)/g, 'Math.sin($1 * Math.PI / 180)');
    }
    if (value.includes('cos')) {
      value = value.replace(/cos\(([^)]+)\)/g, 'Math.cos($1 * Math.PI / 180)');
    }
    if (value.includes('tan')) {
      value = value.replace(/tan\(([^)]+)\)/g, 'Math.tan($1 * Math.PI / 180)');
    }
    if (value.includes('log')) {
      value = value.replace(/log\(([^)]+)\)/g, 'Math.log10($1)');
    }
    if (value.includes('^')) {
      value = value.replace(/(\d+)\^(\d+)/g, 'Math.pow($1, $2)');
    }
    const calculatedValue = eval(value || null);
    if (isNaN(calculatedValue)) {
      res.value = "Error";
      setTimeout(() => {
        res.value = "";
      }, 1300);
    } else {
      res.value = calculatedValue;
    }
  } catch (error) {
    res.value = "Error";
    setTimeout(() => {
      res.value = "";
    }, 1300);
  }
}

function clearScreen() {
  res.value = "";
  playSound();
}

function handleClick(enteredValue) {
  if (!res.value) {
    res.value = "";
  }
  if (enteredValue === '=') {
    calculate(res.value);
  } else if (enteredValue === '^2') {
    res.value += '**2';
  } else {
    res.value += enteredValue;
  }
  playSound();
}

function changeTheme() {
  const theme = document.getElementById("theme");
  setTimeout(() => {
    toast.innerHTML = "Integrated Calculator";
  }, 1500);
  if (theme.getAttribute("href") === lightTheme) {
    theme.setAttribute("href", darkTheme);
    themeIcon.setAttribute("src", sunIcon);
    toast.innerHTML = "Dark Mode 🌙";
  } else {
    theme.setAttribute("href", lightTheme);
    themeIcon.setAttribute("src", moonIcon);
    toast.innerHTML = "Light Mode ☀️";
  }
}

function toggleMode() {
  const scientificRow = document.getElementById('scientific-row');
  const toggleButton = document.getElementById('toggle-mode-button');

  if (isScientificMode) {
    scientificRow.style.display = 'none';
    toggleButton.innerText = 'Switch to Scientific';
    toast.innerHTML = "Normal Calculator";
  } else {
    scientificRow.style.display = 'flex';
    toggleButton.innerText = 'Switch to Normal';
    toast.innerHTML = "Scientific Calculator";
  }

  isScientificMode = !isScientificMode;
}

document.addEventListener("keydown", keyboardInputHandler);

function keyboardInputHandler(e) {
  e.preventDefault();
  if (e.key >= 0 && e.key <= 9) {
    res.value += e.key;
  }
  if (['+', '-', '*', '/', '.', '(', ')'].includes(e.key)) {
    res.value += e.key;
  }
  if (e.key === "Enter") {
    calculate(res.value);
  }
  if (e.key === "Backspace") {
    res.value = res.value.slice(0, -1);
  }
  playSound();
}
