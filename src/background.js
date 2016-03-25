import config from 'src/config';
import store from 'src/redux/backgroundStore';
import { selectState } from 'src/actions/location';
import storage from 'src/lib/storage';


const regex = /^(https:\/\/(?:[a-z0-9-]+\.)?tv-api\.9now\.com\.au\/v[^\/]+\/pages\/livestreams)(?:\/([a-z]+))?(\?.+)$/;

chrome.webRequest.onBeforeRequest.addListener(
  ({ url }) => {
    if (!regex.test(url)) return;

    const reduxState = store.getState();
    const { state } = reduxState.location;

    const [, before, detectedState, after] = url.match(regex);

    if (!state && detectedState) {
      store.dispatch(selectState(detectedState));
      return;
    }
    if (!state || detectedState) return;

    return { // eslint-disable-line consistent-return
      redirectUrl: `${before}/${state}${after}`,
    };
  },
  {
    urls: ['https://*.9now.com.au/v*/pages/livestreams*'],
  },
  ['blocking']);

store.subscribe(() => {
  const state = store.getState();
  storage.set(state);
  chrome.tabs.query({
    url: 'https://www.9now.com.au/*',
  }, tabs => {
    tabs.forEach(tab => chrome.tabs.reload(tab.id));
  });
});

fetch(config.endpoint);
