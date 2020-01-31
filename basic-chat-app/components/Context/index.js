import React from 'react';

const UserContext = React.createContext();
const ChatContext = React.createContext();

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;

export const ChatProvider = ChatContext.Provider;
export const ChatConsumer = ChatContext.Consumer;