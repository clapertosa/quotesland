import App, { Container } from "next/app";
import Head from "next/head";
import React from "react";
import withReduxStore from "../lib/with-redux-store";
import { Provider } from "react-redux";
import Layout from "../hoc/Layout/Layout";

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Head>
          <meta
            name="description"
            content="Quotesland give you the chance to search for your favourite author or character and get his/her quotes!"
          />
          <meta name="keywords" content="quotes, quote, authors, characters" />
          <meta name="og:title" property="og:title" content="Quotesland 🗣" />
          <meta property="og:type" content="website" />
          <meta
            property="og:description"
            content="Quotesland give you the chance to search for your favourite author or character and get his/her quotes!"
          />
          <meta property="og:image" content="https://i.imgur.com/3i2UnCG.jpg" />
          <link rel="icon" href="/static/favicon.ico" />
          <title>Quotesland - Search your favorite character's quote! 🗣</title>
        </Head>
        <Provider store={reduxStore}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
