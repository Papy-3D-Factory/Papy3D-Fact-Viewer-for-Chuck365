(function (wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var useBlockProps = wp.blockEditor.useBlockProps;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var ColorPalette = wp.blockEditor.ColorPalette;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var ToggleControl = wp.components.ToggleControl;
    var SelectControl = wp.components.SelectControl;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var __ = wp.i18n.__;

    var defaults = window.papyfaviDefaults || {};
    var rangerStyles = ['texas-ranger','desert-sheriff','midnight-outlaw','gold-badge','wanted-poster','saloon-wood','prairie-sunset','black-hat','dynamite','lone-star'];
    var isRangerStyle = function(style) { return rangerStyles.indexOf(style) !== -1; };
    var cardStyleOptions = [
        { label: __('Classique', 'papy3d-fact-viewer-for-chuck365'), value: 'classic' },
        { label: __('Texas Ranger', 'papy3d-fact-viewer-for-chuck365'), value: 'texas-ranger' },
        { label: __('Desert Sheriff', 'papy3d-fact-viewer-for-chuck365'), value: 'desert-sheriff' },
        { label: __('Midnight Outlaw', 'papy3d-fact-viewer-for-chuck365'), value: 'midnight-outlaw' },
        { label: __('Gold Badge', 'papy3d-fact-viewer-for-chuck365'), value: 'gold-badge' },
        { label: __('Wanted Poster', 'papy3d-fact-viewer-for-chuck365'), value: 'wanted-poster' },
        { label: __('Saloon Wood', 'papy3d-fact-viewer-for-chuck365'), value: 'saloon-wood' },
        { label: __('Prairie Sunset', 'papy3d-fact-viewer-for-chuck365'), value: 'prairie-sunset' },
        { label: __('Black Hat', 'papy3d-fact-viewer-for-chuck365'), value: 'black-hat' },
        { label: __('Dynamite', 'papy3d-fact-viewer-for-chuck365'), value: 'dynamite' },
        { label: __('Lone Star', 'papy3d-fact-viewer-for-chuck365'), value: 'lone-star' }
    ];

    registerBlockType('papyfavi/viewer', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            var border = attributes.borderColor || defaults.borderColor || '#f39c12';
            var bg     = attributes.bgColor     || defaults.bgColor     || '#ffffff';
            var color  = attributes.textColor   || defaults.textColor   || '#222222';
            var title  = attributes.title       || defaults.title       || 'Chuck Fact';
            var style  = attributes.style       || defaults.style       || 'classic';

            var previewVars = isRangerStyle(style) ? {
                '--chuck-border': '#d3a15f',
                '--chuck-bg': '#5c361c',
                '--chuck-text': '#ffffff'
            } : {
                '--chuck-border': border,
                '--chuck-bg': bg,
                '--chuck-text': color
            };

            var blockProps = useBlockProps({
                className: 'cn-main-box cn-style-' + style,
                style: previewVars
            });

            return el(Fragment, {},
                el(InspectorControls, {},
                    el(PanelBody, { title: __('Configuration Style', 'papy3d-fact-viewer-for-chuck365') },
                        el(TextControl, {
                            label: __('Titre', 'papy3d-fact-viewer-for-chuck365'),
                            value: title,
                            onChange: function (val) { setAttributes({ title: val }); }
                        }),
                        el(SelectControl, {
                            label: __('Style de carte', 'papy3d-fact-viewer-for-chuck365'),
                            value: style,
                            options: cardStyleOptions,
                            onChange: function (val) { setAttributes({ style: val }); }
                        }),
                        isRangerStyle(style) ? el('p', { className: 'components-base-control__help' }, __('Les couleurs sont désactivées pour les cartes Ranger.', 'papy3d-fact-viewer-for-chuck365')) : el(Fragment, {},
                            el('p', {}, __('Couleur de Bordure', 'papy3d-fact-viewer-for-chuck365')),
                            el(ColorPalette, {
                                value: border,
                                onChange: function (val) { setAttributes({ borderColor: val }); }
                            }),
                            el('p', {}, __('Couleur de Fond', 'papy3d-fact-viewer-for-chuck365')),
                            el(ColorPalette, {
                                value: bg,
                                onChange: function (val) { setAttributes({ bgColor: val }); }
                            }),
                            el('p', {}, __('Couleur du Texte', 'papy3d-fact-viewer-for-chuck365')),
                            el(ColorPalette, {
                                value: color,
                                onChange: function (val) { setAttributes({ textColor: val }); }
                            })
                        ),
                        el(ToggleControl, {
                            label: __('Afficher le copyright', 'papy3d-fact-viewer-for-chuck365'),
                            checked: attributes.showCopyright,
                            onChange: function (val) { setAttributes({ showCopyright: val }); }
                        })
                    )
                ),
                el('div', blockProps,
                    (isRangerStyle(style) || style === 'classic') ? el('div', { className: 'cn-ranger-badge' }, isRangerStyle(style) ? 'Chuck Ranger' : 'Chuck Fact') : null,
                    el('div', { className: 'cn-top-label' },
                        el('span', {}, '🥋 '),
                        el('span', { className: 'cn-title-text' }, title)
                    ),
                    el('div', { className: 'cn-content-area' },
                        el('span', { className: 'cn-quote-mark' }, '"'),
                        __('Le fait de Chuck Norris s\'affichera ici.', 'papy3d-fact-viewer-for-chuck365')
                    ),
                    el('div', { className: 'cn-bottom-bar' },
                        el('div', { className: 'cn-copy-wrapper' },
                            el('span', { className: 'cn-copy-info' }, '© ' + new Date().getFullYear() + ' — Chuck365')
                        )
                    )
                )
            );
        },
        save: function () { return null; }
    });
})(window.wp);