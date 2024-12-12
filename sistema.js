// Model

class Hospede{
    
    //metodo constructor
    constructor(nome, email, fone, senha){
        this.nome = nome
        this.fone = fone
        this.email = email
        this.senha = senha
    }

    //metodo setters
    setNome(nome){
        this.nome = nome
    }

    setNome(fone){
        this.fone = fone
    }

    setNome(email){
        this.fone = fone
    }

    setNome(senha){
        this.fone = fone
    }

    //metodo getters
    getNome(){
        return this.nome
    }

    getFone(){
        return this.fone
    }

    getEmail(){
        return this.fone
    }

    getSenha(){
        return this.fone
    }

}


// Garantia do modo debug
const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
    console.log('Modo Debug está ativado');
}

// Limite de Dispositivos
const loggedDevices = JSON.parse(localStorage.getItem('loggedDevices')) || [];
if (loggedDevices.length >= 2) {
    alert('Você atingiu o limite de dispositivos conectados.');
} else {
    loggedDevices.push({ deviceId: Date.now() });
    localStorage.setItem('loggedDevices', JSON.stringify(loggedDevices));
}

// Evitar captura de sessão
const session = JSON.parse(localStorage.getItem('sessionToken'));
if (!session || Date.now() > session.expiresAt) {
    localStorage.removeItem('sessionToken');
    alert('Sessão expirada. Faça login novamente.');
}



// Secret Key
const SECRET_KEY = 'hPtWIaR0a-suNshINW';

// Carrossel de Imagens
const carouselImages = document.querySelector('.carrossel-images');
const images = document.querySelectorAll('.carrossel-images img');
let index = 0;
=======
let hospedes = []
let quartos = []
let reservas = []

>>>>>>> main

const formHospedes = document.getElementById('form-hospedes')
const tabelaHospedes = document.getElementById('tabela-hospedes')


const formQuartos = document.getElementById('form-quartos')
const tabelaQuartos = document.getElementById('tabela-quartos')


const formReservas = document.getElementById('form-reservas')
const tabelaReservas = document.getElementById('tabela-reservas')


const selectHospedeReserva = document.getElementById('hospedeReserva')
const selectQuartoReserva = document.getElementById('quartoReserva')


formHospedes.addEventListener('submit', function(event) {
   event.preventDefault()


   const nome = document.getElementById('nomeHospede').value.trim()
   const documento = document.getElementById('documentoHospede').value.trim()
   const endereco = document.getElementById('enderecoHospede').value.trim()
   const contato = document.getElementById('contatoHospede').value.trim()


   const existe = hospedes.find(h => h.documento === documento)
   if (existe) {
       existe.nome = nome
       existe.endereco = endereco
       existe.contato = contato
       alert('Hóspede atualizado com sucesso!')
   } else {
       hospedes.push({ nome, documento, endereco, contato })
       alert('Hóspede cadastrado com sucesso!')
   }


   formHospedes.reset()
   atualizarTabelaHospedes()
   atualizarSelectHospedeReserva()
})


function atualizarTabelaHospedes() {
   tabelaHospedes.innerHTML = ''
   hospedes.forEach(h => {
       const tr = document.createElement('tr')
       tr.innerHTML = `
           <td>${h.nome}</td>
           <td>${h.documento}</td>
           <td>${h.endereco}</td>
           <td>${h.contato}</td>
       `
       tabelaHospedes.appendChild(tr)
   })
}


formQuartos.addEventListener('submit', function(event) {
   event.preventDefault()


   const numero = parseInt(document.getElementById('numeroQuarto').value)
   const tipo = document.getElementById('tipoQuarto').value
   const preco = parseFloat(document.getElementById('precoQuarto').value).toFixed(2)


   const existe = quartos.find(q => q.numero == numero)
   if (existe) {
       alert('Quarto já cadastrado!')
       return
   }


   quartos.push({ numero, tipo, preco })
   alert('Quarto adicionado com sucesso!')


   formQuartos.reset()
   atualizarTabelaQuartos()
   atualizarSelectQuartoReserva()
})


function atualizarTabelaQuartos() {
   tabelaQuartos.innerHTML = ''
   quartos.forEach(q => {
       const tr = document.createElement('tr')
       tr.innerHTML = `
           <td>${q.numero}</td>
           <td>${q.tipo}</td>
           <td>R$ ${q.preco}</td>
       `
       tabelaQuartos.appendChild(tr)
   })
}


formReservas.addEventListener('submit', function(event) {
   event.preventDefault()


   const hospedeDocumento = selectHospedeReserva.value
   const quartoNumero = parseInt(selectQuartoReserva.value)
   const checkin = document.getElementById('checkinReserva').value
   const checkout = document.getElementById('checkoutReserva').value


   if (new Date(checkin) >= new Date(checkout)) {
       alert('A data de Check-Out deve ser depois do Check-In.')
       return
   }


   const quartoReservado = reservas.find(r => r.quarto == quartoNumero &&
       ((new Date(checkin) >= new Date(r.checkin) && new Date(checkin) < new Date(r.checkout)) ||
        (new Date(checkout) > new Date(r.checkin) && new Date(checkout) <= new Date(r.checkout)) ||
        (new Date(checkin) <= new Date(r.checkin) && new Date(checkout) >= new Date(r.checkout)))
   )


   if (quartoReservado) {
       alert('Quarto já reservado neste período.')
       return
   }


   const hospede = hospedes.find(h => h.documento === hospedeDocumento)
   const quarto = quartos.find(q => q.numero === quartoNumero)


   reservas.push({
       hospede: hospede.nome,
       quarto: quarto.numero,
       checkin,
       checkout,
       data,
       hora,
       lugar
   })


   alert('Reserva realizada com sucesso!')


   formReservas.reset()
   atualizarTabelaReservas()
})


function atualizarTabelaReservas() {
   tabelaReservas.innerHTML = ''
   reservas.forEach(r => {
       const tr = document.createElement('tr')
       tr.innerHTML = `
           <td>${r.hospede}</td>
           <td>${r.quarto}</td>
           <td>${r.checkin}</td>
           <td>${r.checkout}</td>
       `
       tabelaReservas.appendChild(tr)
   })
}
function listarReservas(listaReservas) {
    if (listaReservas.length === 0) {
        console.log("Não há reservas cadastradas.");
        return;
    }

    console.log("Lista de Reservas:");
    listaReservas.forEach((reserva, index) => {
        console.log(`${index + 1}. Nome: ${reserva.lugar}, Data: ${reserva.data}, Hora: ${reserva.hora}, Quarto: ${reserva.quarto}, Check in: ${reserva.checkin}
            Check out: ${reserva.checkout}`);
    });
}

document.getElementById("exibirReservas").addEventListener("click", () => {
    listarReservas(reservas);
})

function atualizarSelectHospedeReserva() {
   selectHospedeReserva.innerHTML = '<option value="">Selecione</option>'
   hospedes.forEach(h => {
       const option = document.createElement('option')
       option.value = h.documento
       option.textContent = `${h.nome} (${h.documento})`
       selectHospedeReserva.appendChild(option)
   })
}


function atualizarSelectQuartoReserva() {
   selectQuartoReserva.innerHTML = '<option value="">Selecione</option>'
   quartos.forEach(q => {
       const option = document.createElement('option')
       option.value = q.numero
       option.textContent = `Quarto ${q.numero} - ${q.tipo}`
       selectQuartoReserva.appendChild(option)
   })
}


window.onload = function() {
   atualizarTabelaHospedes()
   atualizarTabelaQuartos()
   atualizarTabelaReservas()
   atualizarSelectHospedeReserva()
   atualizarSelectQuartoReserva()
}

<<<<<<< patch-1
// Avançar automaticamente no carrossel
setInterval(() => {
    index = (index < images.length - 1) ? index + 1 : 0;
    showImage(index);
}, 3000);

// Simulação de banco de dados
const hospedes = [];
const quartos = [
    { id: 1, tipo: "Casal", preco: 90, status: "disponível" },
    { id: 2, tipo: "Solteiro", preco: 100, status: "disponível" },
    { id: 3, tipo: "Família", preco: 120, status: "disponível" },
];
const reservas = [];
let consumos = []; // Foi transformado em `let` para permitir alterações

// Funções auxiliares de segurança
function validarSenhaForte(senha) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(senha);
}

// Gerar hash para senha
async function gerarHashSenha(senha) {
    const encoder = new TextEncoder();
    const data = encoder.encode(senha);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
}

// Cadastro de Hóspedes (com senha)
async function cadastrarHospede(nome, email, telefone, senha) {
    if (!validarSenhaForte(senha)) {
        alert("Senha fraca. Deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números.");
        return;
    }
    const senhaHash = await gerarHashSenha(senha);

    let hospede = new Hospede(nome, email, telefone, senhaHash)

    const existente = hospedes.find(h => h.getNome() === nome);
    if (existente) {
        alert("Hóspede já cadastrado!");
    } else {
        hospedes.push(hospede);
        alert("Hóspede cadastrado com sucesso!");
    }

    localStorage.setItem('sessionToken', JSON.stringify({ username: nome, expiresAt: Date.now() + 3600000 }));
}

// Realizar Reserva
function reservarQuarto(hospedeNome, quartoId, checkIn, checkOut) {
    const hospede = hospedes.find(h => h.getNome === hospedeNome);
    if (!hospede) {
        alert("Hóspede não encontrado!");
        return;
    }
    const quarto = quartos.find(q => q.id === quartoId && q.status === "disponível");
    if (!quarto) {
        alert("Quarto não disponível!");
        return;
    }
    const dias = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const total = dias * quarto.preco;
    reservas.push({ hospede, quarto, checkIn, checkOut, total });
    quarto.status = "reservado";
    alert(`Reserva realizada! Total: R$${total}`);
}
=======
>>>>>>> main

// Registrar Consumo do Frigobar
function registrarConsumo(hospedeNome, item, preco) {
    const hospede = hospedes.find(h => h.getNome === hospedeNome);
    if (!hospede) {
        alert("Hóspede não encontrado!");
        return;
    }
    consumos.push({ hospede, item, preco });
    alert(`Consumo registrado: ${item} - R$${preco}`);
}

// Check-out
function realizarCheckout(hospedeNome) {
    const reserva = reservas.find(r => r.hospede.getNome === hospedeNome);
    if (!reserva) {
        alert("Nenhuma reserva encontrada!");
        return;
    }
    const consumoTotal = consumos
        .filter(c => c.hospede.documento === hospedeDocumento)
        .reduce((total, c) => total + c.preco, 0);
    const totalAPagar = reserva.total + consumoTotal;

    alert(`Check-out realizado. Total a pagar: R$${totalAPagar}`);
    reservas.splice(reservas.indexOf(reserva), 1);
    consumos = consumos.filter(c => c.hospede.getNome !== hospedeNome);
    reserva.quarto.status = "disponível";
}

// Validação de Formulário (Cadastro)
const input = userInput.replace(/[^a-zA-Z0-9 ]/g, '');

function validateInput(input) {
    return /^[a-zA-Z0-9@.]+$/.test(input);
}

const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevenção do envio do formulário
        const name = document.getElementById('name').value.trim();
        const endereco = document.getElementById('address').value.trim();
        const telefone = document.getElementById('phone').value.trim();
        const senha = document.getElementById('password').value.trim();

        if (!name || !endereco || !telefone || !senha) {
            alert('Por favor, preencha todos os campos corretamente.');
        } else {
            if (!validateInput(username)) {
                alert('Entrada inválida. Use apenas caracteres permitidos.');
            } else{
                await cadastrarHospede(name, endereco, telefone, senha);
            }
        }
    });
}

// Navegação ativa no menu
const navLinks = document.querySelectorAll('.menu nav a');
if (navLinks) {
    const currentUrl = window.location.pathname;
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentUrl) {
            link.style.backgroundColor = '#0226c7'; // Destaque na cor do menu
        }
    });
}

// Mensagem de boas-vindas
document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName');
    if (userName) {
        alert(`Bem-vindo de volta, ${userName}!`);
    }
});

