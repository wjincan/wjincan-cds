const segments = document.querySelectorAll('.segment');
const spinButton = document.getElementById('spin-button');

let isSpinning = false;
let highlightInterval = null;
let currentHighlight = null; // 当前高亮选项

// 随机高亮动画
function startHighlight() {
    let current = 0;
    highlightInterval = setInterval(() => {
        // 清除所有高亮
        segments.forEach(seg => seg.classList.remove('active'));
        // 高亮当前选项
        current = (current + 1) % 8; // 循环0~7
        segments[current].classList.add('active');
    }, 75); // 每50ms切换一次
}

spinButton.addEventListener('click', () => {
    if (isSpinning) return;
    isSpinning = true;
    spinButton.disabled = true;

    // 清除旧高亮
    if (currentHighlight !== null) {
        segments[currentHighlight].classList.remove('active');
    }

    // 启动高亮动画
    startHighlight();

    // 3秒后停止
    setTimeout(() => {
        clearInterval(highlightInterval);
        
        // 随机生成最终选项
        const finalIndex = Math.floor(Math.random() * 8);
        segments.forEach(seg => seg.classList.remove('active')); // 清除所有高亮
        segments[finalIndex].classList.add('active'); // 高亮最终选项
        currentHighlight = finalIndex; // 记录当前高亮项
        
        // 恢复按钮状态
        spinButton.disabled = false;
        isSpinning = false;
    }, 2000);
});