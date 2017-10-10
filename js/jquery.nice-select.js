/*  jQuery Nice Select - v1.2.0
    https://github.com/hernansartorio/jquery-nice-select
    Made by Hernán Sartorio
    Modified by Arsen Bespalov */

;(function ($, window, document, undefined) {

    // niceSelect Constructor

    function niceSelect() {
    }

    $.extend(niceSelect, {
        create: function (el) {
            el.after($('<div>')
                .addClass('nice-select')
                .addClass(el.attr('class') || '')
                .addClass(el.attr('disabled') ? 'disabled' : '')
                .attr('tabindex', el.attr('disabled') ? null : '0')
                .html('<span class="current"></span><ul class="list"></ul>')
            );

            var $dropdown = el.next();
            var $options = el.find('option');
            var $selected = el.find('option:selected');

            $dropdown.find('.current').html($selected.data('display') || $selected.text());

            $options.each(function () {
                var $option = $(this);
                var display = $option.data('display');

                $dropdown.find('ul').append(
                    $('<li>')
                        .attr('data-value', $option.val())
                        .attr('data-display', (display || null))
                        .addClass('option' +
                            ($option.is(':selected') ? ' selected' : '') +
                            ($option.is(':disabled') ? ' disabled' : ''))
                        .html($option.text())
                );
            });
        },
        update: function (el) {
            el.each(function() {
                var $select = $(this);
                var $dropdown = $(this).next('.nice-select');
                var open = $dropdown.hasClass('open');

                if ($dropdown.length) {
                    $dropdown.remove();
                    niceSelect['create']($select);

                    if (open) {
                        $select.next().trigger('click');
                    }
                }
            });
        },
        destroy: function (el) {
            el.each(function() {
                var $select = $(this);
                var $dropdown = $(this).next('.nice-select');

                if ($dropdown.length) {
                    $dropdown.remove();
                    $select.css('display', '');
                }
            });

            if ($('.nice-select').length === 0) {
                $(document).off('.nice_select');
            }
        }
    });

    // niceSelect Plugin Definition

    function Plugin(method) {

        if (typeof method === 'string') {
            if (method === 'update') {
                niceSelect['update'](this);
            } else if (method === 'destroy') {
                niceSelect['destroy'](this);
            } else {
                console.warning('Method "' + method + '" does not exist.');
            }
        }

        // Hide native select
        this.hide();

        // Create custom markup
        this.each(function () {
            var $select = $(this);

            if (!$select.next().hasClass('nice-select')) {
                niceSelect['create']($select);
            }
        });

        /* Event listeners */

        // Unbind existing events in case that the plugin has been initialized before
        $(document).off('.nice_select');

        // Open/close
        $(document).on('click.nice_select', '.nice-select', function () {
            var $dropdown = $(this);

            $('.nice-select').not($dropdown).removeClass('open');
            $dropdown.toggleClass('open');

            if ($dropdown.hasClass('open')) {
                $dropdown.find('.option');
                $dropdown.find('.focus').removeClass('focus');
                $dropdown.find('.selected').addClass('focus');
            } else {
                $dropdown.focus();
            }
        });

        // Close when clicking outside
        $(document).on('click.nice_select', function (event) {
            if ($(event.target).closest('.nice-select').length === 0) {
                $('.nice-select').removeClass('open').find('.option');
            }
        });

        // Option click
        $(document).on('click.nice_select', '.nice-select .option:not(.disabled)', function () {
            var $option = $(this);
            var $dropdown = $option.closest('.nice-select');

            $dropdown.find('.selected').removeClass('selected');
            $option.addClass('selected');

            var text = $option.data('display') || $option.text();
            $dropdown.find('.current').text(text);

            var $select = $dropdown.prev('select');
            $select.val($option.data('value'));

            var e = document.createEvent('HTMLEvents');
            e.initEvent('change', true, true);
            $select[0].dispatchEvent(e);
        });

        // Keyboard events
        $(document).on('keydown.nice_select', '.nice-select', function (event) {
            var $dropdown = $(this);
            var $focused_option = $($dropdown.find('.focus') || $dropdown.find('.list .option.selected'));

            // Space or Enter
            if (event.keyCode === 32 || event.keyCode === 13) {
                if ($dropdown.hasClass('open')) {
                    $focused_option.trigger('click');
                } else {
                    $dropdown.trigger('click');
                }
                return false;
                // Down
            } else if (event.keyCode === 40) {
                if (!$dropdown.hasClass('open')) {
                    $dropdown.trigger('click');
                } else {
                    var $next = $focused_option.nextAll('.option:not(.disabled)').first();
                    if ($next.length > 0) {
                        $dropdown.find('.focus').removeClass('focus');
                        $next.addClass('focus');
                    }
                }
                return false;
                // Up
            } else if (event.keyCode === 38) {
                if (!$dropdown.hasClass('open')) {
                    $dropdown.trigger('click');
                } else {
                    var $prev = $focused_option.prevAll('.option:not(.disabled)').first();
                    if ($prev.length > 0) {
                        $dropdown.find('.focus').removeClass('focus');
                        $prev.addClass('focus');
                    }
                }
                return false;
                // Esc
            } else if (event.keyCode === 27) {
                if ($dropdown.hasClass('open')) {
                    $dropdown.trigger('click');
                }
                // Tab
            } else if (event.keyCode === 9) {
                if ($dropdown.hasClass('open')) {
                    return false;
                }
            }
        });

        // Detect CSS pointer-events support, for IE <= 10. From Modernizr.
        var style = document.createElement('a').style;
        style.cssText = 'pointer-events:auto';
        if (style.pointerEvents !== 'auto') {
            $('html').addClass('no-csspointerevents');
        }

        return this;
    };

    var old = $.fn.niceSelect;

    $.fn.niceSelect = Plugin;
    $.fn.niceSelect.Constructor = niceSelect;

    // niceSelect No Conflict

    $.fn.niceSelect.noConflict = function () {
        $.fn.niceSelect = old;
        return this;
    };

}(jQuery, window, document));