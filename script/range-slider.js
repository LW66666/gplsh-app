(function () {
    var RangeSlider = function (cfg) {
        if (!cfg.el) return;
        var uu = cfg.el;
        uu.sliderCfg = {
            min: cfg && !isNaN(parseFloat(cfg.min)) ? Number(cfg.min) : null,
            max: cfg && !isNaN(parseFloat(cfg.max)) ? Number(cfg.max) : null,
            step: cfg && Number(cfg.step) ? cfg.step : 1,
            callback: cfg && cfg.callback ? cfg.callback : null
        };
        var min = uu.sliderCfg.min;
        var max = uu.sliderCfg.max;
        var step = uu.sliderCfg.step;
        var callback = uu.sliderCfg.callback;

        uu.setAttribute('min', min);
        uu.setAttribute('max', max);
        uu.setAttribute('step', step);
        uu.style.backgroundSize = uu.value / max * 100 + '% 100%';
        uu.oninput = function (e) {
            uu.setAttribute('value', this.value);
            var a = this.value / max * 100;
            uu.style.backgroundSize = a + '% 100%';
            callback && callback(this);
        };
    };
    window.RangeSlider = RangeSlider;
})();