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
          <Navbar
            hiddenBreakpoint="xl"
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
