import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';

import theme from 'theme';
import Fonts from 'components/Fonts';
import Navbar from 'components/Navbar';
import LightBox from 'components/LightBox';
import Home from 'pages/Home';
import Movie from 'pages/Movie';
import { resetPreview } from 'store/actions';

function App() {
  const dispatch = useDispatch();
  const { preview } = useSelector(state => state);

  return (
    <ChakraProvider theme={theme}>
      <Fonts />

      <Router>
        <Navbar />

        <Switch>
          <Route path="/:id">
            <Movie />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>

      {preview && <LightBox
        image={preview}
        isOpen={preview}
        onClose={() => dispatch(resetPreview())}
      />}
    </ChakraProvider>
  );
}

export default App;
