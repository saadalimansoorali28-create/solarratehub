/* SolarRateHub — Monetag article-page ads */
(function () {
  if (window.__solarRateHubMonetagArticleAds) return;
  window.__solarRateHubMonetagArticleAds = true;

  ['11748428', '11751863'].forEach(function (zone) {
    var script = document.createElement('script');
    script.src = 'https://n6wxm.com/vignette.min.js';
    script.async = true;
    script.dataset.zone = zone;
    document.head.appendChild(script);
  });
})();
