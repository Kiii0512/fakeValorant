class AgentSection extends HTMLElement {
  set data(value) { this._data = value; this.render(); }

  connectedCallback() { this.render(); }

  render() {
    if (!this.isConnected || !this._data) return;
    this.innerHTML = `<section class="section showcase" id="agents"><div class="showcase__heading"><div><p class="eyebrow">Field operatives // featured roster</p><h2>Choose your<br><span>operator.</span></h2></div><p class="showcase__intro">Every agent brings a different answer to the same question: how do we take space?</p></div><div class="agent-grid">${this._data.map((agent, index) => `<article class="agent-card"><div class="agent-card__image-wrap"><img class="agent-card__image" src="${agent.avatarUrl}" alt="${agent.codename} agent portrait" loading="lazy"><span class="agent-card__number">0${index + 1} // ${agent.id}</span><span class="agent-card__role">${agent.role}</span>${agent.isFeatured ? '<span class="featured-badge"><i></i> ĐÁNG CHÚ Ý // CLASSIFIED</span>' : ''}</div><div class="agent-card__body"><div class="agent-card__title"><h3>${agent.codename}</h3><span>ACTIVE</span></div><p>${agent.description}</p><div class="ability-list" aria-label="${agent.codename} abilities">${agent.abilities.map(([key, name]) => `<span class="ability-key" title="${name}">${key}</span>`).join('')}</div><a class="dossier-button" href="agents.html#${agent.id}">XEM CHI TIẾT <span>→</span></a></div></article>`).join('')}</div></section>`;
  }
}

customElements.define('agent-section', AgentSection);
