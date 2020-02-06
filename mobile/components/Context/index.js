import React from 'react';

const ChatContext = React.createContext();

export const ChatProvider = ChatContext.Provider;
export const ChatConsumer = ChatContext.Consumer;

const APIContext = React.createContext();

export const APIProvider = APIContext.Provider;
export const APIConsumer = APIContext.Consumer;