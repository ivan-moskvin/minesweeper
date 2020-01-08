import React from 'react';
import AppStore from './app-store';
import { MobXProviderContext } from 'mobx-react';

export const stores = {
  AppStore,
};

export function useStores() {
  return React.useContext(MobXProviderContext)
}
