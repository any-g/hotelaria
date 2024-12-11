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

function showImage(idx) {
    const width = images[0].clientWidth;
    carouselImages.style.transform = `translateX(${-width * idx}px)`;
}

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
