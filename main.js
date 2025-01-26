document.addEventListener('DOMContentLoaded', () => {
    // Referencing the necessary elements of the DOM.
    const inputAdd = document.getElementById('input-add');
    const btnAdd = document.getElementById('btn-add');
    const pendingTasks = document.getElementById('pending-tasks');
    const completedTasks = document.getElementById('Completed-tasks');

    // Declaring and initializing variables.
    let toDoList = [];
    let editing = false;
    let pendings = 0;
    let completeds = 0;
    let objTask = {
        id: '',
        name: ''
    }

    // Function to clean up the task object.
    function cleanObject() {
        objTask.id = '';
        objTask.name = '';
    }

    // Function to clear the task list in the DOM.
    function clearList() {
        const wrapperTask = document.querySelector('.wrapper__task');

        while (wrapperTask.firstChild) {
            wrapperTask.removeChild(wrapperTask.firstChild);
        }
    }

    // Function to delete a task.
    function deleteTask(id, status) {
        toDoList = toDoList.filter(task => task.id !== id);
        if (status == true) {
            completeds--;
            completedTasks.textContent = completeds;
        }
        showTasks();
    }

    // Function to edit a task
    function editingTask() {
        objTask.name = inputAdd.value;
        toDoList.map(task => {
            if (task.id === objTask.id) {
                task.id = objTask.id;
                task.name = objTask.name;
            }
        });
        inputAdd.value = '';
        btnAdd.textContent = '+';
        editing = false;
        showTasks();
    }

    // Function to load a task into the input for editing and into the task object.
    function uploadTask(task) {
        const {id, name} = task;
        objTask.id = id;
        inputAdd.value = name;
        btnAdd.textContent = '✓';
        editing = true;
    }

    // Function to update counters in the DOM.
    function updateCounters() {
        completedTasks.textContent = completeds;
        pendingTasks.textContent = pendings;
    }

    // Function to update the status of a task (pending/completed).
    function taskStatus(status) {
        if (status == true) {
            completeds++;
            pendings--;
            updateCounters();
        } else {
            completeds--;
            pendings++;
            updateCounters();
        }
    }

    // Function to display tasks in the DOM.
    function showTasks() {
        clearList();
        pendings = 0;

        const wrapperTask = document.querySelector('.wrapper__task');

        toDoList.forEach(task => {
            const {id, name} = task;

            const div = document.createElement('div');
            div.classList.add('task');
            div.innerHTML = `
            <div class="task__separator">
                <input id="input-status" type="checkbox">
                <p id="task-description">${name}</p>
            </div>
            <div class="task__buttons">
                <button id="btn-edit"><span class="line-md--edit"></span></button>
                <button id="btn-delete"><span class="line-md--beer-alt-filled-loop"></span></button>
            </div>
            `;

            const inputStatus = div.querySelector('#input-status');
            inputStatus.addEventListener('change', () => {
                taskStatus(inputStatus.checked);
            });

            const btnEdit = div.querySelector('#btn-edit');
            btnEdit.addEventListener('click', () => {
                uploadTask(task);
            });

            const btnDelete = div.querySelector('#btn-delete');
            btnDelete.addEventListener('click', () => {
                deleteTask(id, inputStatus.checked);
            });

            wrapperTask.appendChild(div);
            pendings++;
            pendingTasks.textContent = pendings;
        });
    }

    // Function to add a new task.
    function addTask() {
        toDoList.push({...objTask});
        showTasks();
        cleanObject();
    }

    // Function to check the input and manage the adding or adding of tasks.
    function CheckInput() {
        if (inputAdd.value === '') {
            alert('ERROR, ADD TASK PLEASE');
            return;
        }

        if (editing) {
            editingTask();
        } else {
            objTask.id = Date.now();
            objTask.name = inputAdd.value;
            inputAdd.value = '';
            addTask();
        }
    }

    btnAdd.addEventListener('click', CheckInput);
});
