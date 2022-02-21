import "antd/dist/antd.css";
import "../styles/vars.css";
import "../styles/global.css";
import { MoralisProvider } from "react-moralis";

export default function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId="3R0KDzW5u6fQTkJ6DnlV2VXSkSE92CNvdxL0btDr"
      serverUrl="https://jyjz4g2wg6xx.usemoralis.com:2053/server"
      // appId="aGMjbkqeVaQbKvE7HwhpN8PH32LvJbhTRiw2lOpp"
      // serverUrl="https://mfpu7ncw1w7n.usemoralis.com:2053/server"
    >
      <Component {...pageProps} />
    </MoralisProvider>
  );
}
