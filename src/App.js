import React, { useEffect, useState } from 'react'
import api from './services/api'

import './styles.css'

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    async function loadData() {
      const { data } = await api.get('/repositories')

      setRepositories(data)
    }

    loadData()
  }, [])
  async function handleAddRepository() {
    const repository = {
      title: 'Desafio NodeJs',
      url: 'https://github.com/RayzaOliveira/gostack-desafio-modulo1-node',
      techs: ['javascript', 'Node.Js'],
    }

    const { data } = await api.post('/repositories', repository)

    setRepositories([...repositories, data])
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`)

      const repositoriesFiltered = repositories.filter(
        (repository) => repository.id !== id
      )

      setRepositories(repositoriesFiltered)
    } catch (error) {
      console.log(error)
      alert('Ocorreu um erro inesperado ao tentar remover o repositório selecionado')
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  )
}

export default App
