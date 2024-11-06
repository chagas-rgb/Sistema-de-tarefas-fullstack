const API_URL = "https://sistema-tarefas-0be90ed52aa2.herokuapp.com"; // Substitua pelo URL do backend no Heroku

// Função para atualizar data e hora
function updateDateTime() {
  const now = new Date();
  const formattedDate = now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const formattedTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  document.getElementById('current-date').textContent = `${formattedDate} - ${formattedTime}`;
}

// Atualizar a data e hora automaticamente
document.addEventListener('DOMContentLoaded', () => {
  updateDateTime();
  setInterval(updateDateTime, 60000);
  fetchTarefas();
});

// Função para buscar tarefas do backend
async function fetchTarefas() {
  try {
    const response = await fetch(API_URL);
    const tarefas = await response.json();
    renderTarefas(tarefas);
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
  }
}

// Função para adicionar uma nova tarefa
async function addTarefa() {
  const nome = document.getElementById('nome').value;
  const custo = document.getElementById('custo').value;
  const data_limite = document.getElementById('data_limite').value;

  if (!nome || !custo || !data_limite) {
    Swal.fire('Erro', 'Todos os campos são obrigatórios!', 'error');
    return;
  }

  const novaTarefa = { nome, custo, data_limite, concluida: false };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaTarefa)
    });

    if (response.ok) {
      Swal.fire('Sucesso', 'Tarefa adicionada com sucesso!', 'success');
      fetchTarefas();
    } else {
      Swal.fire('Erro', 'Erro ao adicionar tarefa!', 'error');
    }
  } catch (error) {
    console.error("Erro ao adicionar tarefa:", error);
  }
}

// Função para renderizar as tarefas
function renderTarefas(tarefas) {
  const tarefasList = document.getElementById('tarefas');
  tarefasList.innerHTML = '';

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.setAttribute('data-id', tarefa.id);

    if (parseFloat(tarefa.custo) >= 1000) {
      li.classList.add('highlight');
    }

    if (tarefa.concluida) {
      li.classList.add('completed');
    }

    li.innerHTML = `
      <div>
        ${index + 1}. 
        <i class="fas fa-check-circle ${tarefa.concluida ? 'completed-icon' : ''} me-2" onclick="toggleComplete(${tarefa.id})"></i>
        <strong>${tarefa.nome}</strong><br>
        <span class="text-muted">Custo: R$${tarefa.custo} | Data Limite: ${tarefa.data_limite}</span>
      </div>
      <div>
        <button class="btn btn-warning btn-sm mx-1" onclick="editTarefa(${tarefa.id})"><i class="fas fa-edit"></i></button>
        <button class="btn btn-danger btn-sm" onclick="deleteTarefa(${tarefa.id})"><i class="fas fa-trash"></i></button>
      </div>
    `;

    tarefasList.appendChild(li);
  });
}

// Outras funções: editTarefa, deleteTarefa e toggleComplete...
