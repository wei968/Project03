// 玩家信息存储 Key
const PLAYER_KEY = "treasure_hunt_player";

// 全局变量
const tasks = [
    { name: "发现破旧图书馆", duration: 2000 },
    { name: "偶然找到宝藏线索", duration: 2000 },
    { name: "穿越永恒沙漠", duration: 2000 },
    { name: "发现古怪神庙", duration: 2000 },
    { name: "破解重重机关", duration: 2000 },
    { name: "发现迷宫守卫", duration: 2000 },
    { name: "击败守卫，得到宝藏", duration: 2000 },
    { name: "逃离古怪神庙", duration: 2000 },
];
let playerData = { id: null, name: null, history: [] };

// DOM 引用
const playerInfoDiv = document.getElementById("player-info");
const tasksContainer = document.getElementById("tasks-container");
const progressDiv = document.getElementById("progress");
const backgroundMusic = document.getElementById("background-music");
const toggleMusicButton = document.getElementById("toggle-music");

// 加载玩家信息
function loadPlayer() {
    const savedPlayer = localStorage.getItem(PLAYER_KEY);
    if (savedPlayer) {
        playerData = JSON.parse(savedPlayer);
    } else {
        playerData.id = Date.now();
        playerData.name = prompt("昵称：", "冒险者");
        playerData.history = [];
        savePlayer();
    }
    displayPlayerInfo();
}

// 保存玩家信息
function savePlayer() {
    localStorage.setItem(PLAYER_KEY, JSON.stringify(playerData));
}

// 显示玩家信息
function displayPlayerInfo() {
    playerInfoDiv.innerHTML = `
        <p>玩家ID: ${playerData.id}</p>
        <p>昵称: ${playerData.name}</p>
        <p>已完成任务数: ${playerData.history.length}/${tasks.length}</p>
    `;
}

// 显示任务列表
function displayTasks() {
    tasksContainer.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "task";
        taskDiv.innerHTML = `
            <h3>${task.name}</h3>
            <p>时长: ${task.duration / 1000} 秒</p>
            <button onclick="startTask(${index})" ${
            playerData.history.includes(task.name) ? "disabled" : ""
        }>开始任务</button>
        `;
        tasksContainer.appendChild(taskDiv);
    });
}

// 开始任务
function startTask(index) {
    const task = tasks[index];
    alert(`任务 "${task.name}" 任务已开始！请稍候...`);
    setTimeout(() => {
        completeTask(task.name);
    }, task.duration);
}

// 完成任务
function completeTask(taskName) {
    if (!playerData.history.includes(taskName)) {
        playerData.history.push(taskName);
        savePlayer();
        updateProgress();
        alert(`任务 "${taskName}" 已完成！`);
    } else {
        alert("该任务已完成！");
    }
}

// 更新任务进度
function updateProgress() {
    progressDiv.innerHTML = `任务进度: ${playerData.history.length}/${tasks.length}`;
    if (playerData.history.length === tasks.length) {
        alert("恭喜您，完成所有任务，获得宝藏！");
    }
    displayPlayerInfo();
    displayTasks();
}

// 背景音乐控制
toggleMusicButton.addEventListener("click", () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        toggleMusicButton.textContent = "🎵 暂停音乐";
    } else {
        backgroundMusic.pause();
        toggleMusicButton.textContent = "🎵 开启音乐";
    }
});

// 初始化游戏
function initGame() {
    loadPlayer();
    displayTasks();
    updateProgress();
}

// 启动游戏
initGame();
