'use client';

import { Provider } from 'react-redux';
import store from '../redux';
import Navigation from './Navigation';

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <Navigation />
      {children}
    </Provider>
  );
}
