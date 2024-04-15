document.addEventListener('DOMContentLoaded', function() {
    const isDesktop = window.innerWidth >= 768;
    const scrollSpeed = parseInt(document.querySelector('.adedayo-scrolling-collection-grid').dataset.scrollSpeed, 10);
    const scrollStep = Math.max(1, Math.floor(scrollSpeed / 2));

    function autoScrollColumns(columns) {
        columns.forEach((column, index) => {
            let direction = (index % 2 === 0) ? -scrollStep : scrollStep;
            let isPaused = false;

            function scrollColumn() {
                if (!isPaused) {
                    let currentScroll = column.scrollTop;
                    let maxScroll = column.scrollHeight - column.clientHeight;

                    if (direction > 0 && currentScroll >= maxScroll) {
                        direction = -scrollStep;
                    } else if (direction < 0 && currentScroll <= 0) {
                        direction = scrollStep;
                    }

                    column.scrollTop += direction;
                    requestAnimationFrame(scrollColumn);
                }
            }

            column.addEventListener('mouseenter', () => {
                isPaused = true;
            });

            column.addEventListener('mouseleave', () => {
                isPaused = false;
                requestAnimationFrame(scrollColumn);
            });

            requestAnimationFrame(scrollColumn);
        });
    }

    function autoScrollRows(rows) {
        rows.forEach((row, index) => {
            duplicateRowContent(row);
            let direction = (index % 2 === 0) ? -scrollStep : scrollStep;
            let isPaused = false;

            function scrollRow() {
                if (!isPaused) {
                    row.scrollLeft += direction;

                    if ((direction < 0 && row.scrollLeft <= 0) ||
                        (direction > 0 && row.scrollLeft >= row.scrollWidth / 2)) {
                        direction = -direction;
                    }

                    requestAnimationFrame(scrollRow);
                }
            }

            row.addEventListener('touchstart', () => {
                isPaused = true;
            });

            row.addEventListener('touchend', () => {
                isPaused = false;
                requestAnimationFrame(scrollRow);
            });

            requestAnimationFrame(scrollRow);
        });
    }

    function duplicateRowContent(row) {
        row.innerHTML += row.innerHTML;
    }

    if (isDesktop) {
        const columns = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-column');
        autoScrollColumns(columns);
    } else {
        const rows = document.querySelectorAll('.adedayo-scrolling-collection-grid-products-row');
        autoScrollRows(rows);
    }
});