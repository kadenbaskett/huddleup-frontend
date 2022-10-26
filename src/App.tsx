import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import LoginPage from './pages/login/login';
import HomePage from './pages/homePage/homePage';
import {
  AppShell,
  Navbar,
  Header,
  Burger,
  Anchor,
  Title,
  Group,
} from '@mantine/core';

function App() {
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      fixed
      header={
        <Header height={50}>
          <Group spacing="lg">
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="lg"
              ml="lg"
            />
            <Title size="h1">HUDDLE UP</Title>
          </Group>
        </Header>
      }
      navbar={
        <Navbar
          hiddenBreakpoint={5000}
          width={{ base: '100%' }}
          hidden={!opened}
          ml="lg"
        >
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
