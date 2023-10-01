// Chart.jsx

import { WidthFull } from "@mui/icons-material";
import { maxHeight } from "@mui/system";
import React, { useEffect, useRef } from "react";

let tvScriptLoadingPromise;

export default function Chart() {
  const onLoadScriptRef = useRef();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById("tradingview_1bbe6") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          width:WidthFull,
          // height: 600,
          symbol: "BINANCE:BTCUSDT",
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "in",
          // hide_side_toolbar: false,
          enable_publishing: false,
          show_popup_button: true,
          allow_symbol_change: true,
          container_id: "tradingview_1bbe6",
        });
      }
    }
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview_1bbe6" />
      {/* <div className="tradingview-widget-copyright">
        <a href="https://in.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a>
      </div> */}
    </div>
  );
}
