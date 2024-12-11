let hospedes = []
let quartos = []
let reservas = []


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


