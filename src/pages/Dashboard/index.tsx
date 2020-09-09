/* eslint-disable camelcase */
import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import { Title, Form, Repositories, Error } from './styles';
import logoImg from '../../assets/logo.svg';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

// FC - function component
const Dashboard: React.FC = () => {
  const [newRepository, setNewRepository] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storageRepositories = localStorage.getItem(
      '@GitHubExplorer:repositories',
    );

    if (storageRepositories) {
      return JSON.parse(storageRepositories);
    }
    return [];
  });

  // smp q eu tiver uma mudança na variável [repositories] eu irei salvar no localStorage
  useEffect(() => {
    localStorage.setItem(
      '@GitHubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!newRepository) {
      setInputError('Você precisa digitar autor/nome do repositório');
      return;
    }

    // adc novo repositório by consumindo a api e salvando no novo estado
    try {
      const response = await api.get<Repository>(`repos/${newRepository}`);

      const repository = response.data;
      setRepositories([...repositories, repository]);
      setNewRepository('');
      setInputError('');
    } catch (err) {
      setInputError('Hmm... algo deu errado ao buscar esse repositório');
    }
  }

  return (
    <>
      <img src={logoImg} alt="GitHub Explorer" />
      <Title>Explore repositórios no GitHub</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepository}
          // qnd alterar, receberemos um evento:
          onChange={e => setNewRepository(e.target.value)}
          placeholder="Digite o nome do repositório aqui"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {/* if... a variável error foi preenchida, aí sim mostro o erro */}
      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repository => (
          <Link
            key={repository.full_name}
            to={`/repositories/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
