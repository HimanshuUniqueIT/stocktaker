/**
 * StockTakingAdmin Application JS
 */

document.addEventListener('DOMContentLoaded', function () {
  // Client Table Accordion Handler
  const clientRows = document.querySelectorAll('.client-row');

  clientRows.forEach(function (row) {
    row.addEventListener('click', function (e) {
      // Don't toggle accordion if user clicked an action button or link
      if (e.target.closest('a') || e.target.closest('button:not(.accordion-toggle-btn)')) {
        return;
      }

      const targetId = row.getAttribute('data-target');
      if (!targetId) return;

      const detailRow = document.getElementById(targetId);
      const chevron = row.querySelector('.chevron-icon');

      if (detailRow) {
        const isHidden = detailRow.classList.contains('hidden');
        if (isHidden) {
          detailRow.classList.remove('hidden');
          row.classList.add('bg-blue-50/40');
          if (chevron) chevron.classList.add('rotate-180');
        } else {
          detailRow.classList.add('hidden');
          row.classList.remove('bg-blue-50/40');
          if (chevron) chevron.classList.remove('rotate-180');
        }
      }
    });
  });
});

