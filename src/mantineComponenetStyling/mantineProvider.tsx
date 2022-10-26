import { MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
        fontFamily: 'Open Sans, sans serif',
      }}
    >
    </MantineProvider>
  );
}