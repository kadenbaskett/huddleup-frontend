import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import LoginPage from './pages/login/login';
import HomePage from './pages/homePage/homePage';
import { AppShell, Navbar, Header, Burger, Anchor } from '@mantine/core';

function App() {
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      fixed
      header={
        <Header height={50}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="lg"
            mr="lg"
            ml="lg"
          />
        </Header>
      }
      navbar={
        <Navbar hiddenBreakpoint="xl" width={{ base: '100%' }} hidden={!opened}>
          <Anchor>Home</Anchor>
          <Anchor>Features</Anchor>
          <Anchor>Pricing</Anchor>
        </Navbar>
      }
    >
      App
    </AppShell>
  );
}

export default App;
