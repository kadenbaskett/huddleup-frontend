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
  MantineProvider,
  Group,
  Title,
} from '@mantine/core';
import { Route, Routes } from 'react-router-dom';
import DefaultHome from './pages/defaultHome';

function App() {
  const [opened, setOpened] = useState(false);
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
      }}
    >
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
          >
            <Anchor>Home</Anchor>
            <Anchor>Default Home</Anchor>
            <Anchor>Features</Anchor>
            <Anchor>Pricing</Anchor>
          </Navbar>
        }
      >
        <Routes>
          <Route path="/default" element={<DefaultHome />} />
        </Routes>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
