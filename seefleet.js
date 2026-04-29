document.addEventListener('DOMContentLoaded', function() {

  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger) {
    hamburger.addEventListener('click', function() {
      if (mobileMenu.style.display === 'flex') {
        mobileMenu.style.display = 'none';
      } else {
        mobileMenu.style.display = 'flex';
      }
    });
  }

  document.querySelectorAll('.mobile-menu a').forEach(function(link) {
    link.addEventListener('click', function() {
      mobileMenu.style.display = 'none';
    });
  });

  var dropdownTrigger = document.querySelector('.nav-dropdown-trigger');
  if (dropdownTrigger) {
    dropdownTrigger.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('is-open');
      document.querySelector('.nav-dropdown-menu').classList.toggle('is-open');
    });
  }

  document.addEventListener('click', function() {
    var menu = document.querySelector('.nav-dropdown-menu');
    if (menu) menu.classList.remove('is-open');
  });

  window.addEventListener('pageshow', function() {
    document.querySelector('.demo-modal').style.display = 'none';
  });

  document.addEventListener('click', function(e) {
    if (mobileMenu && mobileMenu.style.display === 'flex') {
      if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        mobileMenu.style.display = 'none';
      }
    }
  });

  (function() {
    fetch("https://secure.seefleet.com/api/public/sanctions")
      .then(function(r) { return r.json(); })
      .then(function(d) {
        var countUs = d.us_sanctioned_count.toLocaleString();
        var countEu = d.eu_sanctioned_count.toLocaleString();
        var countUk = d.uk_sanctioned_count.toLocaleString();
        var pct = d.sanctioned_percent_of_world_fleet
          .toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + "%";
        document.querySelectorAll("[data-sanctions='ofac']").forEach(function(el) { el.textContent = countUs; });
        document.querySelectorAll("[data-sanctions='eu']").forEach(function(el) { el.textContent = countEu; });
        document.querySelectorAll("[data-sanctions='uk']").forEach(function(el) { el.textContent = countUk; });
        document.querySelectorAll("[data-sanctions='percent']").forEach(function(el) { el.textContent = pct; });
      })
      .catch(function(err) { console.error("sanctions fetch failed", err); });
  })();

  (function() {
    var wedge = document.getElementById('wedge-green');
    if (!wedge) return;

    var dx = -27.344;
    var dy = 21.806;
    var maxScroll = 68;
    var ticking = false;

    function update() {
      var progress = Math.min(window.scrollY / maxScroll, 1);
      wedge.setAttribute('transform', 'translate(' + (progress * dx) + ' ' + (progress * dy) + ')');
      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  })();

});