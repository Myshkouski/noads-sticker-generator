import { Client } from 'appwrite';

export const createClient = () => {
  const client = new Client();

  client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('649e961c38e05383c23d');

  return client
}

export const injectionKey: InjectionKey<Client> = Symbol("appwrite-client")

export const provideClient = () => {
  provide(injectionKey, createClient())
}

export const injectClient = () => inject(injectionKey)
