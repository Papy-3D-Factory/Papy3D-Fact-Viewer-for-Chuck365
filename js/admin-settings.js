/**
 * papy3d-fact-viewer-for-chuck365 - Admin Settings
 */
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.nav-tab');
    const contents = document.querySelectorAll('.tab-content');
    const rangerStyles = ['texas-ranger','desert-sheriff','midnight-outlaw','gold-badge','wanted-poster','saloon-wood','prairie-sunset','black-hat','dynamite','lone-star'];
    const isRangerStyle = (style) => rangerStyles.includes(style);

    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-tab');
            tabs.forEach(t => t.classList.remove('nav-tab-active'));
            this.classList.add('nav-tab-active');
            contents.forEach(content => {
                content.style.display = content.id === `tab-content-${target}` ? 'block' : 'none';
            });
            window.location.hash = target;
        });
    });

    const titleInput = document.getElementById('papyfavi_text_title');
    const directPreview = document.querySelector('.cn-main-box');
    const styleInput = document.getElementById('papyfavi_card_style');
    const colorInputs = [
        document.getElementById('papyfavi_border_color'),
        document.getElementById('papyfavi_bg_color'),
        document.getElementById('papyfavi_text_color')
    ].filter(Boolean);

    const setColorControlsDisabled = (disabled) => {
        colorInputs.forEach(input => {
            input.disabled = disabled;
            const row = input.closest('tr');
            if (row) row.classList.toggle('papyfavi-disabled-row', disabled);
            const picker = input.closest('td')?.querySelector('.wp-picker-container');
            if (picker) picker.classList.toggle('papyfavi-disabled-picker', disabled);
        });
    };

    const updatePreview = () => {
        if (!directPreview) return;
        const borderInput = document.getElementById('papyfavi_border_color');
        const bgInput = document.getElementById('papyfavi_bg_color');
        const colorInput = document.getElementById('papyfavi_text_color');
        const selectedStyle = styleInput?.value || 'classic';
        const ranger = isRangerStyle(selectedStyle);
        const hasBadge = ranger || selectedStyle === 'classic';

        directPreview.className = directPreview.className
            .split(/\s+/)
            .filter(cls => !cls.startsWith('cn-style-'))
            .concat('cn-style-' + selectedStyle)
            .join(' ');

        let badge = directPreview.querySelector('.cn-ranger-badge');
        if (hasBadge && !badge) {
            badge = document.createElement('div');
            badge.className = 'cn-ranger-badge';
            directPreview.prepend(badge);
        } else if (!hasBadge && badge) {
            badge.remove();
        }
        if (badge) badge.innerHTML = ranger ? 'Chuck<br>Ranger' : 'Chuck<br>Fact';

        const linkBtn = directPreview.querySelector('.cn-link-btn');
        if (linkBtn) linkBtn.textContent = ranger ? 'Entrer dans le saloon' : 'Visiter le site';

        if (borderInput && bgInput && colorInput) {
            if (ranger) {
                directPreview.style.removeProperty('--chuck-border');
                directPreview.style.removeProperty('--chuck-bg');
                directPreview.style.setProperty('--chuck-text', '#ffffff');
            } else {
                directPreview.style.setProperty('--chuck-border', borderInput.value);
                directPreview.style.setProperty('--chuck-bg', bgInput.value);
                directPreview.style.setProperty('--chuck-text', colorInput.value);
            }
        }

        setColorControlsDisabled(ranger);

        const titleElement = directPreview.querySelector('.cn-title-text');
        if (titleElement) titleElement.textContent = titleInput?.value || '';
    };

    if (window.jQuery && jQuery.fn.wpColorPicker) {
        jQuery('.chuck-color-field').wpColorPicker({
            palettes: ['#ff0000', '#ff8c00', '#ffea00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#000000'],
            change: () => setTimeout(updatePreview, 50),
            clear: () => setTimeout(updatePreview, 50)
        });
    }

    titleInput?.addEventListener('input', updatePreview);
    styleInput?.addEventListener('change', updatePreview);

    updatePreview();
});
