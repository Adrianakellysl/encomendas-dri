const modal = document.getElementById('modal-detalhesEncomenda')
const btnFechar = document.getElementById('fecharModal')

let encomendas = []
const buttonAdicionar = document.getElementById('btnAdicionar')


const dadosSalvos = localStorage.getItem('encomendas');
if (dadosSalvos) {
  encomendas = JSON.parse(dadosSalvos);
  mostrarEncomendasNaTela();
}

function AdicionarNovaEncomenda() {
  //recebe valor do usuário
  const valorInput = document.getElementById('inputAdicionarEncomenda')
  let valor = {
  Nome: valorInput.value.trim()
}


  const mensagem = document.getElementById('mensagem')
  //se o valor do input for vazio, mostre a msg de erro
  if (valorInput.value.trim() == "") {
    const msgErro = "O campo está vazio, favor adicione uma nova encomenda!"
    mensagem.textContent = msgErro
    mensagem.className = "erro"
      setTimeout(() => {
      mensagem.textContent = ""; }, 2000)

  } else {
    const msgSucesso = "Encomenda adicionada com sucesso!"
    mensagem.textContent = msgSucesso
    mensagem.className = "sucesso"
    setTimeout(() => {
      mensagem.textContent = ""; }, 2000)

    encomendas.push(valor)
    mostrarEncomendasNaTela();
  }

  //limpa o input do usuário
  valorInput.value = ""
}

function mostrarEncomendasNaTela() {
//cria um li para um novo item da lista e insere na ul
  const listEncomendas = document.getElementById('listaEncomendas')

  listEncomendas.innerHTML = "";

  for(let i = 0; i < encomendas.length; i++) {
    let iconChek = document.createElement('i')
    iconChek.className = 'bi bi-check-circle-fill';
    iconChek.style.display = 'block';
    iconChek.style.cursor = 'pointer';
    iconChek.onclick = () => marcarComoConcluido(iconChek, spanTexto)
    

    let novaEncomenda = document.createElement('li')
    // Cria o texto separado em um span
    let spanTexto = document.createElement('span')
    spanTexto.textContent = encomendas[i]
    spanTexto.className = 'spanTexto';
    spanTexto.classList.add('texto-encomenda');
    spanTexto.onclick = () => mostrarModal(encomendas[i]);
    

    let btneditarEncomenda = document.createElement('i')
    btneditarEncomenda.className = 'bi bi-pencil';
    btneditarEncomenda.style.display = 'block';
    btneditarEncomenda.style.cursor = 'pointer';
    btneditarEncomenda.onclick = () => editarEncomenda(i)
    

    let btnexcluirEncomenda = document.createElement('i')
    btnexcluirEncomenda.className = 'bi bi-trash';
    btnexcluirEncomenda.style.display = 'block';
    btnexcluirEncomenda.style.cursor = 'pointer';
    btnexcluirEncomenda.onclick = () => excluirEncomenda(i)

    novaEncomenda.appendChild(spanTexto)
    novaEncomenda.appendChild(iconChek)
    novaEncomenda.appendChild(btneditarEncomenda)
    novaEncomenda.appendChild(btnexcluirEncomenda)
    listEncomendas.appendChild(novaEncomenda)

    spanTexto.textContent = encomendas[i].Nome
    spanTexto.onclick = () => mostrarModal(encomendas[i])
  }

  localStorage.setItem('encomendas', JSON.stringify(encomendas));
}

function editarEncomenda(i){
  let encomendaEditada = prompt("Edite sua encomenda:", encomendas[i].Nome)
  if (encomendaEditada.trim() !== "") {
    encomendas[i].Nome = encomendaEditada.trim()

    mostrarEncomendasNaTela()
  }
  localStorage.setItem('encomendas', JSON.stringify(encomendas));
}

function excluirEncomenda(i){
  encomendas.splice(i, 1)

  mostrarEncomendasNaTela()
  localStorage.setItem('encomendas', JSON.stringify(encomendas));
}

function marcarComoConcluido(icone, texto) {
  icone.classList.toggle('concluido')
  texto.classList.toggle('tarefa-concluida')
}

function mostrarModal(encomenda) {
  document.getElementById('modalNomeEncomenda').innerText = encomenda.Nome;

  modal.classList.remove('hidden')
}

btnFechar.addEventListener('click', function (){
  modal.classList.add('hidden')
})

buttonAdicionar.addEventListener('click', function(event) {
  event.preventDefault()
  AdicionarNovaEncomenda()
})


