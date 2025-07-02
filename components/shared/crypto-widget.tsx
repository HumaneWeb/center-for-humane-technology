'use client';
import { useEffect } from 'react';

interface GivingBlockWidgetProps {
  apiUserUuid?: string;
  domain?: string;
  buttonId?: string;
  scriptId?: string;
  uiVersion?: string;
  donationFlow?: string;
  fundraiserId?: string;
  campaignId?: string;
  id?: string;
}

export default function GivingBlockWidgetAlternative({
  apiUserUuid = 'e6cf7d18-41b6-4a6c-954a-338578fd90b0',
  domain = 'https://widget.thegivingblock.com',
  buttonId = 'tgb-widget-button',
  scriptId = 'tgb-widget-script',
  uiVersion = '2',
  donationFlow = 'crypto,stock,daf',
  fundraiserId = '',
  campaignId = '',
  id = '1189134835',
}: GivingBlockWidgetProps) {
  return null;

  // useEffect(() => {
  //   const initWidget = (
  //     window: Window,
  //     document: Document,
  //     scriptTag: string,
  //     domain: string,
  //     apiUserUuid: string,
  //     id: string,
  //     scriptId: string,
  //     buttonId: string,
  //     uiVersion: string,
  //     donationFlow: string,
  //     fundraiserId: string,
  //     campaignId: string,
  //   ) => {
  //     const p = 'widgetOptions';
  //     const widgetConfig = {
  //       id,
  //       apiUserUuid,
  //       domain,
  //       buttonId,
  //       scriptId,
  //       uiVersion,
  //       donationFlow,
  //       fundraiserId,
  //       campaignId,
  //     };

  //     if ((window as any)[p]) {
  //       const existing = (window as any)[p];
  //       if (Array.isArray(existing)) {
  //         existing.push(widgetConfig);
  //       } else {
  //         (window as any)[p] = [existing, widgetConfig];
  //       }
  //     } else {
  //       (window as any)[p] = widgetConfig;
  //     }

  //     // Crear y cargar el script
  //     const script = document.createElement(scriptTag);
  //     script.src = `${domain}/widget/script.js`;
  //     script.async = true;

  //     const existingScript = document.getElementById(scriptId);
  //     if (existingScript && existingScript.parentNode) {
  //       existingScript.parentNode.insertBefore(script, existingScript);
  //     } else {
  //       document.head.appendChild(script);
  //     }
  //   };

  //   initWidget(
  //     window,
  //     document,
  //     'script',
  //     domain,
  //     apiUserUuid,
  //     id,
  //     scriptId,
  //     buttonId,
  //     uiVersion,
  //     donationFlow,
  //     fundraiserId,
  //     campaignId,
  //   );

  //   return () => {
  //     const scripts = document.querySelectorAll(`script[src*="${domain}"]`);
  //     scripts.forEach((script) => script.remove());
  //   };
  // }, [
  //   apiUserUuid,
  //   domain,
  //   buttonId,
  //   scriptId,
  //   uiVersion,
  //   donationFlow,
  //   fundraiserId,
  //   campaignId,
  //   id,
  // ]);

  // return (
  //   <>
  //     <div id={scriptId} style={{ display: 'none' }} />
  //     <div id={buttonId} className="tgb-widget-container" />
  //   </>
  // );
}
