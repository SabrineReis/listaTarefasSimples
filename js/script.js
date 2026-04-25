class TodoList {
  constructor() {
    this.tasks = []; // Array para armazenar todas as tarefas
    this.taskInput = document.getElementById("taskInput"); //Input para adicionar tarefas
    this.addBtn = document.getElementById("addBtn"); //Botão para adicionar tarefas
    this.tasksList = document.getElementById("tasksList"); //Container para exibir a lista de tarefas

    this.init(); //Inicialização da aplicação
  }

  init() {
    //Adiciona um evento de clique ao botão de adicionar tarefa
    this.addBtn.addEventListener("click", () => this.addTask());

    //Adiciona um evento de tecla pressionada ao input de tarefa
    //Quando o usuário estiver digitando no input e apertar Enter, execute a função que adiciona a tarefa.”
    this.taskInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.addTask();
    });

    //Carrega as tarefas salvas
    this.loadTasks();
  }

  addTask() {
    const text = this.taskInput.value.trim(); //Pego o texto e removo os espaços em branco

    if (text === "") {
      //Se o texto for vazio não adicione a tarefa ao array
      this.taskInput.focus(); //Foca no Input se está vazio
      return;
    }

    const task = {
      id: Date.now(), //Gerando um ID único baseado em timestamp para cada tarefa
      text, //Pegando o texto digitado pelo usuário
    };

    this.tasks.unshift(task); //Adiciona a tarefa ao inicio do array
    this.taskInput.value = ""; //Limpa o input
    this.taskInput.focus(); //Foca no Input
    this.render(); //Atualiza tela
    this.saveTasks(); //Salva no localStorage
  }
}
