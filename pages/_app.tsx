import App from 'next/app';
import React from 'react';

import '../styles/main.css';

class Client extends App<{}> {
  render() {
    const {Component, pageProps} = this.props;

    return (
      <>
        <Component {...pageProps} />
      </>
    );
  }
}

export default Client;
