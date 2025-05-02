
const containerCard = document.getElementById('cardContainer')

const createCard = (contato) => {

    

    const card = document.createElement('div')
    card.className = "card"

    const imgContato = document.createElement('img')
    imgContato.src = contato.foto
    imgContato.alt = contato.nome

    const nomeContato = document.createElement('h2')
    nomeContato.textContent = contato.nome

    const telefoneContato = document.createElement('p')
    telefoneContato.textContent = contato.telefone

    const emailContato = document.createElement('p')
    emailContato.textContent = contato.email

    const containerButton = document.createElement('div')
    containerButton.className = "gridButton"

    const buttonFavorito = document.createElement('button')
    buttonFavorito.className = "favorite-button"
    buttonFavorito.id = "favorite"
    buttonFavorito.textContent = contato.favorito ? 'Desfavoritar' : 'Favoritar'

    const buttonEditar = document.createElement('button')
    buttonEditar.className = "buttonSet"
    buttonEditar.id = "setCard"
    buttonEditar.textContent = "Editar"
    
    const buttonRemover = document.createElement('button')
    buttonRemover.className = "buttonRemove"
    buttonRemover.id = "removeCard"
    buttonRemover.textContent = "Deletar"
    buttonRemover.onclick = () => deleteCard(contato.id);

    containerButton.appendChild(buttonFavorito)
    containerButton.appendChild(buttonEditar)
    containerButton.appendChild(buttonRemover)



    card.appendChild(imgContato)
    card.appendChild(nomeContato)
    card.appendChild(telefoneContato)
    card.appendChild(emailContato)
    card.appendChild(containerButton)

    containerCard.appendChild(card)



}

const loadCard = async () => {
    try {
        const response = await fetch("http://localhost:3001/contatos/listarContatos")

        if (response.status === 200) {
            const data = await response.json()

            data.Data.forEach(contato => {
                createCard(contato)
            });
        } else {
            console.error("Erro ao buscar contatos: ", response.status)
        }

    } catch (error) {
        console.error("Erro na requisição:", error)
    }
}

const deleteCard = async function (id) {
    const options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const response = await fetch(`http://localhost:3001/contatos/deletarContato/${id}`, options)

        if (response.status === 204) {
            alert("Contato deletado com Sucesso!!!")
            containerCard.replaceChildren()
            loadCard()
        } else {
            alert("Erro ao Excluir Contato!")
        }

    } catch (error) {
        console.error("Erro ao deletar:", error)
    }
}


loadCard()