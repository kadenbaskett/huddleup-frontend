import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import LoginPage from './pages/loginPage/loginPage';
import HomePage from './pages/homePage/homePage';
import { AppShell, Navbar, Header, Burger, Anchor } from '@mantine/core';

function App() {
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      fixed
      //navbarOffsetBreakpoint="sm"
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
          // className={classes.navbar}
          width={{ base: '100%' }}
          hidden={!opened}
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
