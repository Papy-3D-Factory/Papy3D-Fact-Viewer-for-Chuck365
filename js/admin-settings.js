/**
 * Chuck365 - Admin Settings (Vanilla JS Edition 2026)
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // --- GESTION DES ONGLETS DYNAMIQUE ---
    const tabs = document.querySelectorAll('.nav-tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Récupération de l'identifiant cible (settings, project ou about)
            const target = this.getAttribute('data-tab');

            // 1. Mise à jour visuelle des onglets (classe active)
            tabs.forEach(t => t.classList.remove('nav-tab-active'));
            this.classList.add('nav-tab-active');

            // 2. Bascule des contenus : on affiche uniquement celui qui correspond
            contents.forEach(content => {
                if (content.id === `tab-content-${target}`) {
                    content.style.display = 'block';
                } else {
                    content.style.display = 'none';
                }
            });
            
            // Optionnel : mise à jour de l'ancre dans l'URL
            window.location.hash = target;
        });
    });

    // --- LOGIQUE DE PREVIEW ET RÉGLAGES ---
    const titleInput = document.getElementById('chuck365_text_title');
    const presets = document.querySelectorAll('.chuck-preset');
    const resetBtn = document.getElementById('chuck-reset');
    
    // On cible le bloc de rendu généré par la fonction render() du plugin
    const directPreview = document.querySelector('.cn-main-box');

    /**
     * Met à jour l'aperçu dynamique en direct via les variables CSS
     */
    const updatePreview = () => {
        if (!directPreview) return;

        const borderInput = document.getElementById('chuck365_border_color');
        const bgInput = document.getElementById('chuck365_bg_color');
        const colorInput = document.getElementById('chuck365_text_color');

        if (!borderInput || !bgInput || !colorInput) return;

        // Mise à jour des variables CSS (Custom Properties) sur le conteneur
        directPreview.style.setProperty('--chuck-border', borderInput.value);
        directPreview.style.setProperty('--chuck-bg', bgInput.value);
        directPreview.style.setProperty('--chuck-text', colorInput.value);
        
        // Mise à jour du titre en temps réel
        const titleElement = directPreview.querySelector('.cn-title-text');
        if (titleElement) {
            titleElement.textContent = titleInput?.value || '';
        }
    };

    /**
     * Initialisation du WP Color Picker (Bridge jQuery)
     */
    if (window.jQuery && jQuery.fn.wpColorPicker) {
        jQuery('.chuck-color-field').wpColorPicker({
            change: () => {
                // Petit délai pour laisser le widget mettre à jour la valeur de l'input
                setTimeout(updatePreview, 50);
            },
            clear: () => {
                setTimeout(updatePreview, 50);
            }
        });
    }

    // Listener sur le champ texte du titre
    titleInput?.addEventListener('input', updatePreview);

    // Gestion des clics sur les boutons de Presets (Fire, Dark, Ocean, etc.)
    presets.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const { b, bg, c } = e.currentTarget.dataset;
            
            if (window.jQuery) {
                jQuery('#chuck365_border_color').wpColorPicker('color', b);
                jQuery('#chuck365_bg_color').wpColorPicker('color', bg);
                jQuery('#chuck365_text_color').wpColorPicker('color', c);
            }
            // On force la mise à jour après l'application du preset
            setTimeout(updatePreview, 100);
        });
    });

    // Bouton de réinitialisation aux valeurs "Original"
    resetBtn?.addEventListener('click', () => {
        if (window.jQuery) {
            jQuery('#chuck365_border_color').wpColorPicker('color', '#f39c12');
            jQuery('#chuck365_bg_color').wpColorPicker('color', '#ffffff');
            jQuery('#chuck365_text_color').wpColorPicker('color', '#222222');
        }
        if (titleInput) {
            titleInput.value = 'Chuck Norris Fact du jour';
        }
        setTimeout(updatePreview, 100);
    });

    // Initialisation immédiate de l'aperçu au chargement de la page
    updatePreview();
});