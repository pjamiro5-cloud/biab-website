"use client";

import React, { useId, useState } from "react";
import "./biab-system.css";

export const defaultModules = [
  { id: 'leads', label: 'Leads', eyebrow: 'Find your opportunity', description: 'A clear starting point. Find the people and businesses that need what you offer.', metric: 'Discover your next opportunity.' },
  { id: 'crm', label: 'CRM', eyebrow: 'Keep everything moving', description: 'Every contact, conversation and next step. Organised in one simple pipeline.', metric: 'Make your next step clear.' },
  { id: 'scripts', label: 'Sales Scripts', eyebrow: 'Start the conversation', description: 'Practical conversation guides to help you reach out with clarity and confidence.', metric: 'Turn a first hello into a conversation.' },
  { id: 'templates', label: 'Templates', eyebrow: 'Make it your own', description: 'Ready-to-use foundations for your business. Adapt them, make them yours, and get started.', metric: 'Spend less time starting from scratch.' },
  { id: 'support', label: 'Support', eyebrow: 'Build with support', description: 'Get guidance when you need it, so you can keep making progress on your business.', metric: 'Your business. With a little backup.' },
];

function Icon({ type, ...props }) {
  const paths = {
    leads: <><circle cx="9" cy="7" r="3"/><path d="M3 20v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 5v2"/></>,
    crm: <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v7c0 4 16 4 16 0V5M4 12v7c0 4 16 4 16 0v-7"/></>,
    scripts: <><path d="M6 2h8l5 5v15H6zM14 2v6h5M9 12h7M9 16h7M9 19h4"/></>,
    templates: <><path d="M3 8V5h7l3 3h8v3M3 8v13h16l3-10H8l-5 10"/></>,
    support: <><path d="M4 3h16v14h-8l-5 5v-5H4z"/><path d="M8 9h.01M12 9h.01M16 9h.01"/></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[type]}</svg>;
}

/** Standalone, container-responsive component. All values are illustrative and editable. */
export default function BIABSystem({ modules = defaultModules, clientName = 'Alex Morgan', clientValue = 'CHF 2’400', brand = 'BIAB', logoSrc = '/biab-wordmark.png', showDetails = false, className = '', onModuleChange = () => {} }) {
  const [selected, setSelected] = useState(modules[0]?.id);
  const uid = useId();
  const active = modules.find(m => m.id === selected) || modules[0];
  return <section className={`biab-system ${className}`} aria-label="The BIAB business system">
    <div className="biab-scene">
      <div className="biab-note" aria-hidden="true">Everything you need.<br/><span>In one place.</span><svg viewBox="0 0 80 60"><path d="M6 4C4 34 34 43 65 43m-10-8 12 8-13 8"/></svg></div>
      <div className="biab-box">
        <div className="biab-box-back" aria-hidden="true"/>
        <div className="biab-module-stack" aria-label="Explore the five modules">
          {modules.map((module, i) => <button key={module.id} className="biab-module" style={{ '--i': i }} aria-pressed={active?.id === module.id} aria-controls={`${uid}-detail`} onClick={() => { setSelected(module.id); onModuleChange?.(module); }}>
            <span className="biab-module-icon"><Icon type={module.id}/></span><span>{module.label}</span><span className="biab-module-arrow" aria-hidden="true">↗</span>
          </button>)}
        </div>
        <div className="biab-box-left" aria-hidden="true"/>
        <div className="biab-box-front"><div className="biab-box-brand"><span className="biab-logo-crop"><img className="biab-box-logo" src={logoSrc} alt={brand}/></span><span className="biab-box-caption">BUSINESS<br/>IN A BOX</span></div><span className="biab-box-mark" aria-hidden="true">↗</span></div>
      </div>
      <div className="biab-results">
        <div className="biab-chart-card">
          <div className="biab-card-kicker"><span className="biab-dot"/> YOUR PROGRESS <span>↗</span></div>
          <h3>From opportunity<br/>to client.</h3>
          <div className="biab-chart" role="img" aria-label="Illustrative upward progress chart">
            {[12,19,26,38,31,45,58,50,68,85].map((height,i)=><span key={i} style={{'--bar-height':`${height}%`}}/>)}
          </div>
          <div className="biab-chart-footer"><span>Opportunity</span><span>Client</span></div>
        </div>
        <svg className="biab-connector" viewBox="0 0 160 110" fill="none" aria-hidden="true"><path d="M5 8C92 8 58 92 145 92m-12-11 13 11-13 10"/></svg>
        <div className="biab-client-card"><span className="biab-check" aria-hidden="true">✓</span><span className="biab-client-status">CLIENT WON</span><h3>{clientName}</h3><span className="biab-client-value">{clientValue}</span><div className="biab-client-footer"><span>Client</span><span aria-hidden="true">•••</span></div></div>
        <div className="biab-manifesto" aria-hidden="true">IDEAS.<br/>TOOLS.<br/>OPPORTUNITIES.<br/><b>REAL BUSINESSES.</b></div>
      </div>
    </div>
    {active && <div className={`biab-detail ${showDetails ? '' : 'biab-sr-only'}`} id={`${uid}-detail`} aria-live="polite"><span className="biab-detail-index">0{modules.indexOf(active)+1} / 0{modules.length}</span><div><span className="biab-detail-eyebrow">{active.eyebrow}</span><p>{active.description}</p></div><span className="biab-detail-label">{active.label} <span aria-hidden="true">↗</span></span></div>}
  </section>;
}
