import React, {useState, useEffect} from "react";

import "./styles.css";

import api from './services/api';


function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
      api.get('repositories').then((response) => {
        setRepositories(response.data);
        console.log(response.data)
      })

    }, []);



  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title : `Novo repositorio ${Date.now()}`,
      ulr : 'github.com',
      techs: ['Javascript', 'React']
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {

    await api.delete('repositories/' + id);

    const removeIndex = repositories.findIndex(p => p.id === id);

    const aux = [...repositories];
    aux.splice(removeIndex, 1);

    setRepositories(aux);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (<li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>);
        })}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
