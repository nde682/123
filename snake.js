// Tạo canvas và context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Thiết lập kích thước canvas
canvas.width = 400;
canvas.height = 400;

// Tạo rắn và mồi
let snake = [
  { x: 200, y: 200 },
  { x: 220, y: 200 },
  { x: 240, y: 200 }
];
let food = { x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10 };

// Tạo biến để lưu trữ hướng di chuyển của rắn
let direction = 'right';

// Hàm vẽ rắn và mồi
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'green';
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
  }
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, 10, 10);
}

// Hàm cập nhật vị trí của rắn
function update() {
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i] = { x: snake[i - 1].x, y: snake[i - 1].y };
  }
  if (direction === 'right') {
    snake[0].x += 10;
  } else if (direction === 'left') {
    snake[0].x -= 10;
  } else if (direction === 'up') {
    snake[0].y -= 10;
  } else if (direction === 'down') {
    snake[0].y += 10;
  }
  // Kiểm tra va chạm với mồi
  if (snake[0].x === food.x && snake[0].y === food.y) {
    snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
    food = { x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10 };
  }
  // Kiểm tra va chạm với tường
  if (snake[0].x < 0 || snake[0].x > canvas.width - 10 || snake[0].y < 0 || snake[0].y > canvas.height - 10) {
    alert('Game over!');
    snake = [
      { x: 200, y: 200 },
      { x: 220, y: 200 },
      { x: 240, y: 200 }
    ];
    food = { x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10 };
  }
}

// Hàm xử lý sự kiện nhấn phím
function keyPress(event) {
  if (event.key === 'ArrowRight') {
    direction = 'right';
  } else if (event.key === 'ArrowLeft') {
    direction = 'left';
  } else if (event.key === 'ArrowUp') {
    direction = 'up';
  } else if (event.key === 'ArrowDown') {
    direction = 'down';
  }
}

// Gán sự kiện nhấn phím
document.addEventListener('keydown', keyPress);

// Vòng lặp chính
setInterval(() => {
  update();
  draw();
}, 100);

