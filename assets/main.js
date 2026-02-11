(() => {
  const form = document.querySelector('[data-demo-form]');
  if (form) {
    const msg = form.querySelector('.inline-msg');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (msg) {
        msg.textContent = form.dataset.message || 'Demo form — submission disabled';
      }
    });
  }

  const amount = document.querySelector('#investmentAmount');
  const horizon = document.querySelector('#timeHorizon');
  const projection = document.querySelector('#projectionOutput');
  const range = document.querySelector('#rangeOutput');
  const amountValue = document.querySelector('#amountValue');
  const horizonValue = document.querySelector('#horizonValue');

  const formatMoney = (value) =>
    new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

  const updateScenario = () => {
    if (!amount || !horizon || !projection || !range) return;
    const principal = Number(amount.value);
    const years = Number(horizon.value);
    const lowGrowth = 0.04;
    const midGrowth = 0.075;
    const highGrowth = 0.11;

    const projected = principal * Math.pow(1 + midGrowth, years);
    const low = principal * Math.pow(1 + lowGrowth, years);
    const high = principal * Math.pow(1 + highGrowth, years);

    projection.textContent = `${formatMoney(projected)} (illustrative)`;
    range.textContent = `${formatMoney(low)} – ${formatMoney(high)} estimated range (illustrative)`;
    if (amountValue) amountValue.textContent = formatMoney(principal);
    if (horizonValue) horizonValue.textContent = `${years}y`;
  };

  [amount, horizon].forEach((input) => {
    if (input) input.addEventListener('input', updateScenario);
  });
  updateScenario();

  document.querySelectorAll('.faq-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      if (!content) return;
      const opened = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!opened));
      content.style.maxHeight = opened ? '0px' : `${content.scrollHeight}px`;
    });
  });

  const modal = document.querySelector('#privacyModal');
  const openBtn = document.querySelector('[data-open-privacy]');
  const closeBtn = document.querySelector('[data-close-privacy]');

  const closeModal = () => modal?.classList.remove('open');

  openBtn?.addEventListener('click', () => modal?.classList.add('open'));
  closeBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  const langSelect = document.querySelector('#languageSelect');
  if (langSelect) {
    langSelect.addEventListener('change', () => {
      window.location.href = langSelect.value;
    });
  }
})();
