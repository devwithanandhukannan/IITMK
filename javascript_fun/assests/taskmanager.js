let task_ = []
let priority_ = []
let status_ = []

const task_id = document.getElementById('task')
const priority_id = document.getElementById('priority')
const task_list = document.getElementById('task_list')

function addTask() {
    console.log('clicked');

    let task = task_id.value;
    let priority_data = Number(priority_id.value);

    if (task !== '' && !isNaN(priority_data) && priority_data > 0 && priority_data < 4) {
        task_.push(task)
        priority_.push(priority_data)
        status_.push(0)
        disp()
        saveToLocalStorage();
    }
}


function search(value) {
    task_list.innerHTML = '';

    task_.forEach((task, i) => {
        if (task.toLowerCase().includes(value.toLowerCase())) {
            let li = document.createElement('li');
            li.innerHTML = `
    <div class="flex justify-between items-center p-4 rounded shadow mb-2 
                ${priority_[i] == 1 ? 'bg-red-200' : priority_[i] == 2 ? 'bg-yellow-200' : 'bg-green-200'}">
        
        <!-- Task text -->
        <span class="${status_[i] == 1 ? 'complete text-gray-500' : ''} font-medium">
            ${task_[i]} -- Priority: ${priority_[i]}
        </span>

        <!-- Buttons -->
        <div class="flex gap-2">
            <button onclick="del(${i})" 
                    class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">
                Delete
            </button>
            <button onclick="update(${i})" 
                    class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                Update
            </button>
            <button onclick="change_status(${i})" 
                    class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">
                ${status_[i] == 1 ? 'Done' : 'Complete'}
            </button>
        </div>
    </div>
`;

            task_list.appendChild(li);
        }
    });


}

function disp() {
    task_list.innerHTML = ''
    for (let i = 0; i < task_.length; i++) {
        let create_ul = document.createElement('li')
        create_ul.innerHTML = `
    <div class="flex justify-between items-center p-4 rounded shadow mb-2 
                ${priority_[i] == 1 ? 'bg-red-200' : priority_[i] == 2 ? 'bg-yellow-200' : 'bg-green-200'}">
        
        <!-- Task text -->
        <span class="${status_[i] == 1 ? 'complete text-gray-500' : ''} font-medium">
            ${task_[i]} 
        </span>

        <!-- Buttons -->
        <div class="flex gap-2">
            <button onclick="del(${i})" 
                    class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">
                Delete
            </button>
            <button onclick="update(${i})" 
                    class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                Update
            </button>
            <button onclick="change_status(${i})" 
                    class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">
                ${status_[i] == 1 ? 'Done' : 'Complete'}
            </button>
        </div>
    </div>
`;
        task_list.append(create_ul)
    }
}

function del(index) {
    console.log(index);

    // remove from arrays
    task_.splice(index, 1);
    priority_.splice(index, 1);
    status_.splice(index, 1);

    disp();
    saveToLocalStorage();
}


function update(index) {

    // ask new task name
    let updatedTask = prompt("Enter new task", task_[index]);
    if (updatedTask !== null && updatedTask.trim() !== "") {
        task_[index] = updatedTask;
    }

    // ask new priority
    let updatedPriority = prompt("Enter new priority (1–3)", priority_[index]);
    updatedPriority = Number(updatedPriority);
    if (!isNaN(updatedPriority) && updatedPriority > 0 && updatedPriority < 4) {
        priority_[index] = updatedPriority;
    }

    disp();
    saveToLocalStorage();
}


function change_status(index) {
    // 0 = pending, 1 = completed
    status_[index] = status_[index] === 0 ? 1 : 0;
    disp();
    saveToLocalStorage();
}


function saveToLocalStorage() {
    const data = {
        task: task_,
        priority: priority_,
        status: status_
    }
    localStorage.setItem('taskdata', JSON.stringify(data))
}

function loadFromLocalStroage() {
    const data = JSON.parse(localStorage.getItem('taskdata'))
    if (data) {
        task_ = data.task
        priority_ = data.priority
        status_ = data.status
    }
}
loadFromLocalStroage();
disp();
