const modal = document.getElementById('modal-detalhesEncomenda')
const btnFechar = document.getElementById('fecharModal')
const buttonAdicionar = document.getElementById('btnAdicionar')
const dadosSalvos = localStorage.getItem('encomendas');
const valorInput = document.getElementById('inputAdicionarEncomenda')
const mensagem = document.getElementById('mensagem')//se o valor do input for vazio, mostre a msg de erro


let encomendas = JSON.parse(localStorage.getItem('encomendas')) || []

if (dadosSalvos) {
  encomendas = JSON.parse(dadosSalvos);
  mostrarEncomendasNaTela();
}

function AdicionarNovaEncomenda() {
  encomendas.innerHTML = ""
  let valor = {
  Nome: valorInput.value.trim()
  }

  if (valorInput.value.trim() == "") {
    const msgErro = "O campo está vazio, favor adicione uma nova encomenda!"
    mensagem.textContent = msgErro
    mensagem.className = "erro"

    setTimeout(() => {
    mensagem.textContent = ""; }, 2000)

  } else {
    encomendas.push(valor)
    
    const msgSucesso = "Encomenda adicionada com sucesso!"
    mensagem.textContent = msgSucesso
    mensagem.className = "sucesso"

    setTimeout(() => {
      mensagem.textContent = ""; }, 2000)   
  }
  mostrarEncomendasNaTela();
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
    

    let btnEditarEncomenda = document.createElement('i')
    btnEditarEncomenda.className = 'bi bi-pencil';
    btnEditarEncomenda.style.display = 'block';
    btnEditarEncomenda.style.cursor = 'pointer';
    btnEditarEncomenda.onclick = () => editarEncomenda(i)
    

    let btnExcluirEncomenda = document.createElement('i')
    btnExcluirEncomenda.className = 'bi bi-trash';
    btnExcluirEncomenda.style.display = 'block';
    btnExcluirEncomenda.style.cursor = 'pointer';
    btnExcluirEncomenda.onclick = () => excluirEncomenda(i)

    novaEncomenda.appendChild(spanTexto)
    novaEncomenda.appendChild(iconChek)
    novaEncomenda.appendChild(btnEditarEncomenda)
    novaEncomenda.appendChild(btnExcluirEncomenda)
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

  }
  localStorage.setItem('encomendas', JSON.stringify(encomendas));
  mostrarEncomendasNaTela()
}

function excluirEncomenda(i){
  encomendas.splice(i, 1)

  localStorage.setItem('encomendas', JSON.stringify(encomendas));
  mostrarEncomendasNaTela()
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

valorInput.addEventListener('keypress', function(event) {
  if(event.key ==='Enter') {
    event.preventDefault()
    AdicionarNovaEncomenda()

    buttonAdicionar.classList.add('animar')
    setTimeout(() => {
      buttonAdicionar.classList.remove('animar')
    }, 300);
  }
})


