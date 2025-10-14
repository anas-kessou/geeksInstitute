const colors = [
    'red', 'orangered', 'orange',
    'yellow', 'greenyellow', 'lightgreen',
    'green', 'turquoise', 'cyan',
    'lightskyblue', 'royalblue', 'blueviolet',
    'indigo', 'purple', 'mediumvioletred',
    'fuchsia', 'pink', 'lightgray',
    'gray', 'black', 'white'
  ];
  
  const palette = document.getElementById('color-palette');
  const board = document.getElementById('drawing-board');
  const clearBtn = document.getElementById('clear-btn');
  
  let activeColor = null;
  let isDrawing = false;
  
  // Create the color swatches
  colors.forEach(color => {
    const swatch = document.createElement('div');
    swatch.classList.add('color-swatch');
    swatch.style.backgroundColor = color;
    palette.appendChild(swatch);
  });
  
  // Handle color selection
  palette.addEventListener('click', (e) => {
    if (!e.target.classList.contains('color-swatch')) return;
  
    document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
    e.target.classList.add('selected');
    activeColor = e.target.style.backgroundColor;
  });
  
  // Create the drawing board
  for (let i = 0; i < 30 * 20; i++) { // 30 columns × 20 rows
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    board.appendChild(pixel);
  }
  
  // Handle drawing
  board.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('pixel') && activeColor) {
      e.target.style.backgroundColor = activeColor;
      isDrawing = true;
    }
  });
  
  board.addEventListener('mouseover', (e) => {
    if (isDrawing && e.target.classList.contains('pixel') && activeColor) {
      e.target.style.backgroundColor = activeColor;
    }
  });
  
  document.addEventListener('mouseup', () => {
    isDrawing = false;
  });
  
  // Clear button
  clearBtn.addEventListener('click', () => {
    document.querySelectorAll('.pixel').forEach(pixel => {
      pixel.style.backgroundColor = 'white';
    });
  });
  