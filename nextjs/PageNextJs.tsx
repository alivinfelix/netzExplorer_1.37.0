import Head from 'next/head';
import React from 'react';

import type { Route } from 'nextjs-routes';
import type { Props as PageProps } from 'nextjs/getServerSideProps';

import config from 'configs/app';
import useAdblockDetect from 'lib/hooks/useAdblockDetect';
import useGetCsrfToken from 'lib/hooks/useGetCsrfToken';
import * as metadata from 'lib/metadata';
import * as mixpanel from 'lib/mixpanel';

interface Props<Pathname extends Route['pathname']> {
  pathname: Pathname;
  children: React.ReactNode;
  query?: PageProps<Pathname>['query'];
  apiData?: PageProps<Pathname>['apiData'];
}

const PageNextJs = <Pathname extends Route['pathname']>(props: Props<Pathname>) => {
  const { title, description, opengraph, canonical } = metadata.generate(props, props.apiData);

  useGetCsrfToken();
  useAdblockDetect();

  const isMixpanelInited = mixpanel.useInit();
  mixpanel.useLogPageView(isMixpanelInited);

  return (
    <>
      <Head>
      <title>{title}</title>
        <meta name="description" content={description} />
        {canonical && <link rel="canonical" href={canonical} />}

        {/* OG TAGS */}
        {/* <meta property="og:title" content={ opengraph.title }/> */}
        {opengraph.description && (
          <meta property="og:description" content={opengraph.description} />
        )}
        <meta property="og:image" content={opengraph.imageUrl} />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content={config.app.host} />
        <meta name="twitter:title" content={opengraph.title} />
        {opengraph.description && (
          <meta name="twitter:description" content={opengraph.description} />
        )}
        <meta property="twitter:image" content={opengraph.imageUrl} />
        <meta property="og:type" content="website" />
        <meta
          name="description"
          content={
            "Discover MainnetZ with Netzexplorer, the definitive blockchain explorer for real-time insights. Track transactions, decode smart contracts, and analyze network trends with our intuitive platform. Designed for transparency and ease, Netzexplorer is the essential tool for users and developers navigating the MainnetZ ecosystem."
          }
        />
        <meta
          property="og:title"
          content={"Netzexplorer: Your MainnetZ Blockchain Lens"}
        />
        <meta
          property="og:description"
          content={
            "Discover MainnetZ with Netzexplorer, the definitive blockchain explorer for real-time insights. Track transactions, decode smart contracts, and analyze network trends with our intuitive platform. Designed for transparency and ease, Netzexplorer is the essential tool for users and developers navigating the MainnetZ ecosystem."
          }
        />
        <meta
          property="og:image"
          content={
            "https://raw.githubusercontent.com/Dev4Crypto/mainnetz/main/images/logo.png"
          }
        />
        <meta
          property="og:image:secure_url"
          content="https://raw.githubusercontent.com/Dev4Crypto/mainnetz/main/images/logo.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="640" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:image"
          content={
            "https://raw.githubusercontent.com/Dev4Crypto/mainnetz/main/images/logo.png"
          }
        />
        <meta property="og:type" content="website" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap"
          rel="stylesheet"
        ></link>
        <style>
          {`
            * {
              font-family: 'Quicksand', sans-serif !important;
            }
          `}
        </style>
      </Head>
      { props.children }
    </>
  );
};

export default React.memo(PageNextJs);
