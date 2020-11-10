import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
  path?: string;
}

const Header: React.FC<HeaderProps> = ({
  size = 'large',
  path = '/',
}: HeaderProps) => {
  const listagemSelected = path === '/';
  const importSelected = path === '/import';

  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <nav>
          <Link style={{ borderBottomWidth: listagemSelected ? 2 : 0 }} to="/">
            Listagem
          </Link>
          <Link
            style={{ borderBottomWidth: importSelected ? 2 : 0 }}
            to="/import"
          >
            Importar
          </Link>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
