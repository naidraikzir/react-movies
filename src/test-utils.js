import React from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ChakraProvider, theme } from '@chakra-ui/react';
import reducer from 'store/reducer';

const customRender = (
  ui,
  {
    initialState,
    store = createStore(reducer, initialState),
    ...options
  } = {}
) => {
  const AllProviders = ({ children }) => (
    <Provider store={store}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </Provider>
  );
  return render(ui, { wrapper: AllProviders, ...options });
}

export { customRender as render };
