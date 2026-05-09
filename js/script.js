class TodoList {
  constructor() {
    this.tasks = []; // Array que armazena todas as tarefas
    this.taskInput = document.getElementById("taskInput"); // Input de texto
    this.addBtn = document.getElementById("addBtn"); // Botão adicionar
    this.tasksList = document.getElementById("tasksList"); // Container das tarefas

    this.init(); // Inicializa a aplicação
  }

  init() {
    // Event listener para botão "Adicionar"
    this.addBtn.addEventListener("click", () => this.addTask());

    // Event listener para Enter no input
    this.taskInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.addTask();
      }
    });

    // Carrega tarefas salvas
    this.loadTasks();
  }

  addTask() {
    const text = this.taskInput.value.trim(); // Pega texto e remove espaços

    if (text === "") {
      // Validação
      this.taskInput.focus(); // Foca no input se vazio
      return;
    }

    const task = {
      id: Date.now(), // ID único baseado em timestamp
      text: text,
    };

    this.tasks.unshift(task); // Adiciona no INÍCIO do array
    this.taskInput.value = ""; // Limpa input
    this.taskInput.focus(); // Mantém foco no input
    this.render(); // Atualiza tela
    this.saveTasks(); // Salva no localStorage
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id); // Filtra removendo ID
    this.render(); // Atualiza tela
    this.saveTasks(); // Salva mudanças
  }

  render() {
    if (this.tasks.length === 0) {
      // Estado vazio - mostra mensagem
      this.tasksList.innerHTML = `
            <div class="empty-state">
                Nenhuma tarefa ainda... 😴<br>
                Adicione a primeira tarefa!
            </div>
        `;
      return;
    }

    // Gera HTML para TODAS as tarefas
    this.tasksList.innerHTML = this.tasks
      .map(
        (task) => `
        <div class="task-item">
            <span class="task-text">${this.escapeHtml(task.text)}</span>
            <button class="delete-btn" onclick="todoList.deleteTask(${task.id})">
                🗑️ Remover
            </button>
        </div>
    `,
      )
      .join("");
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text; // Converte <script> em &lt;script&gt;
    return div.innerHTML; // Retorna texto seguro
  }

  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  loadTasks() {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      this.tasks = JSON.parse(saved); // Converte JSON → Array
      this.render();
    }
  }
}

// Cria instância global acessível no onclick dos botões
const todoList = new TodoList();
