
document.addEventListener('DOMContentLoaded', () => {
    const adicionar_tarefas = document.getElementById('tarefas');
    const botao_adicionar = document.getElementById('botao_adicionar');
    const lista_tarefas = document.getElementById('lista');

    const loadTarefas = async () => {
        const response = await fetch('http://localhost:3000/tarefas');
        const tarefas = await response.json();
        lista_tarefas.innerHTML = '';  // Limpar a lista antes de exibir
        tarefas.forEach(Tarefas => {
            const li = document.createElement('li');
            li.textContent = `${Tarefas.nome} - ${Tarefas.status}`;
            li.addEventListener('click', () => deleteTarefas(Tarefas.id));  // Excluir tarefa ao clicar
            lista_tarefas.appendChild(li);
        });
    };

    // adicionar nova tarefa
    botao_adicionar.addEventListener('click', async () => {
        const TarefasName = adicionar_tarefas.value;
        if (TarefasName) {
            await fetch('http://localhost:3000/tarefas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome: TarefasName, status: 'pendente' })
            });
            adicionar_tarefas.value = '';  // Limpar o campo de entrada
            loadTarefas();  // Recarregar a lista de tarefas
        }
    });

    // excluir tarefa
    const deleteTarefas = async (id) => {
        await fetch(`http://localhost:3000/tarefas/${id}`, { method: 'DELETE' });
        loadTarefas();  // Recarregar a lista após a exclusão
    };

    loadTarefas();
});

