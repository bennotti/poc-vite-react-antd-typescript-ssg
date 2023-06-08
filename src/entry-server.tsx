import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

import { App } from './App';

export function SSRRender(url: string | Partial<Location>) {
  // console.log('SSRRender', url);

  const cache = createCache();

  const styleText = extractStyle(cache);
  return {
    styleText,
    appHtml: ReactDOMServer.renderToString(
      <StyleProvider cache={cache}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </StyleProvider>
    ),
  };
}
