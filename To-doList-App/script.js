const STORAGE_KEY ='todotask.tasks.v1';
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const filters = document.querySelectorAll('.filter');
const clearCompletedBtn = document.getElementById('clear-completed');
const countEl = document.getElementById('count');

let tasks = [];
let currentFilter = 'all';

function uid(){return Date.now().toString(36) + Math.random().toString(36).slice(2,9);}
function save(){localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));}
function load(){tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');}
function updateCount(){
    const left = tasks.filter(t => !t.completed).length;
    countEl.textContent = `${left} task${left !== 1 ? 's' : ''} left`;
}

function render(){
    const filtered = tasks.filter(t => {
    if(currentFilter === 'all') return true;
    if(currentFilter === 'active') return !t.completed;
    return t.completed;
    });
    taskList.innerHTML = filtered.map(t => `
    <li class="task ${t.completed ? 'completed' : ''}" data-id="${t.id}">
    <label>
        <input class="toggle" type="checkbox" ${t.completed ? 'checked' : ''}/>
        <span class="task-text">${t.text}</span>
    </label>
    ${t.date ? `<span class="date">📅 ${t.date}</span>` : ''}
    <div class="task-actions">
        <button class="edit">✎</button>
        <button class="delete">🗑</button>
    </div>
</li>
`).join('');

updateCount();
};

function addTask(text, date, priority){
    tasks.unshift({ id: uid(), text, date, priority, completed: false });
    save(); render();
}

taskForm.addEventListener('submit', e => {
    e.preventDefault();
    const text = taskInput.value.trim();
    const date = document.getElementById('task-date').value;
    if (text) {
        addTask(text, date);
        taskInput.value = '';
        document.getElementById('task-date').value = '';
    }
});

function toggleTask(id){ const t = tasks.find(x => x.id===id); t.completed=!t.completed; save(); render(); }
function deleteTask(id){ tasks = tasks.filter(x => x.id!==id); save(); render(); }
function updateTaskText(id, newText){ const t = tasks.find(x=>x.id===id); t.text=newText; save(); render(); }
function clearCompleted(){ tasks = tasks.filter(t=>!t.completed); save(); render(); }
function setFilter(name){ currentFilter=name; filters.forEach(b=>b.classList.toggle('active',b.dataset.filter===name)); render(); }

// Edit inline
function startEdit(li){
const id = li.dataset.id;
const task = tasks.find(t=>t.id===id);
const span = li.querySelector('.task-text');
const input = document.createElement('input');
input.type='text'; input.value=task.text; input.className='edit-input';
span.replaceWith(input); input.focus();
input.addEventListener('blur',()=>{ updateTaskText(id,input.value.trim()); });
input.addEventListener('keydown',e=>{ if(e.key==='Enter'){ input.blur(); } });
}

taskForm.addEventListener('submit',e=>{
    e.preventDefault();
    const val=taskInput.value.trim();
    if(val){ addTask(val); taskInput.value=''; }
});

taskList.addEventListener('click',e=>{
    const li=e.target.closest('.task'); if(!li)return; const id=li.dataset.id;
    if(e.target.matches('.toggle')) toggleTask(id);
    if(e.target.matches('.delete')) deleteTask(id);
    if(e.target.matches('.edit')) startEdit(li);
});

filters.forEach(btn=>btn.addEventListener('click',()=>setFilter(btn.dataset.filter)));
clearCompletedBtn.addEventListener('click',()=>clearCompleted());

const themeBtn = document.getElementById('toggle-theme');
themeBtn.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
    themeBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});


document.addEventListener('DOMContentLoaded',()=>{ load(); render(); });