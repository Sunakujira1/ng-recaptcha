"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var recaptcha_loader_service_1 = require("./recaptcha-loader.service");
var recaptcha_settings_1 = require("./recaptcha-settings");
var nextId = 0;
var RecaptchaComponent = /** @class */ (function () {
    function RecaptchaComponent(elementRef, loader, zone, settings) {
        this.elementRef = elementRef;
        this.loader = loader;
        this.zone = zone;
        this.id = "ngrecaptcha-" + nextId++;
        this.resolved = new core_1.EventEmitter();
        this.allowedLangs = [
            'ar', 'af', 'am', 'hy', 'az', 'eu', 'bn', 'bg', 'ca', 'zh-HK', 'zh-CN', 'zh-TW', 'hr', 'cs', 'da', 'nl', 'en-GB',
            'en', 'et', 'fil', 'fi', 'fr', 'fr-CA', 'gl', 'ka', 'de', 'de-AT', 'de-CH', 'el', 'gu', 'iw', 'hi', 'hu', 'is',
            'id', 'it', 'ja', 'kn', 'ko', 'lo', 'lv', 'lt', 'ms', 'ml', 'mr', 'mn', 'no', 'fa', 'pl', 'pt', 'pt-BR', 'pt-PT',
            'ro', 'ru', 'sr', 'si', 'sk', 'sl', 'es', 'es-419', 'sw', 'sv', 'ta', 'te', 'th', 'tr', 'uk', 'ur', 'vi', 'zu',
        ];
        if (settings) {
            this.siteKey = settings.siteKey;
            this.theme = settings.theme;
            this.type = settings.type;
            this.size = settings.size;
            this.badge = settings.badge;
            this.lang = settings.lang;
        }
    }
    RecaptchaComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.subscription = this.loader.ready.subscribe(function (grecaptcha) {
            if (grecaptcha != null) {
                _this.grecaptcha = grecaptcha;
                _this.renderRecaptcha();
            }
        });
    };
    RecaptchaComponent.prototype.ngOnDestroy = function () {
        // reset the captcha to ensure it does not leave anything behind
        // after the component is no longer needed
        this.grecaptchaReset();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    RecaptchaComponent.prototype.ngOnChanges = function (changes) {
        var prop = 'lang';
        if (changes != null && changes[prop] != null && changes[prop].currentValue !== changes[prop].previousValue) {
            this.useLang(changes[prop].currentValue);
        }
    };
    /**
     * Executes the invisible recaptcha.
     * Does nothing if component's size is not set to "invisible".
     */
    RecaptchaComponent.prototype.execute = function () {
        if (this.size !== 'invisible') {
            return;
        }
        if (this.widget != null) {
            this.grecaptcha.execute(this.widget);
        }
    };
    RecaptchaComponent.prototype.reset = function () {
        if (this.widget != null) {
            if (this.grecaptcha.getResponse(this.widget)) {
                // Only emit an event in case if something would actually change.
                // That way we do not trigger "touching" of the control if someone does a "reset"
                // on a non-resolved captcha.
                this.resolved.emit(null);
            }
            this.grecaptchaReset();
        }
    };
    /**
     * Change the widget language
     *
     * @internal
     */
    RecaptchaComponent.prototype.useLang = function (lang) {
        if (this.widget != null && this.elementRef != null && lang != null && this.allowedLangs.indexOf(lang) !== -1) {
            if (this.grecaptcha.getResponse(this.widget)) {
                this.resolved.emit(null);
            }
            var iframe = this.elementRef.nativeElement.querySelector('iframe');
            if (iframe && iframe.src) {
                var s = iframe.src;
                if (/[?&]hl=/.test(s)) {
                    s = s.replace(/([?&]hl=)[\w-_]+(&.*)?$/, '$1' + lang + '$2');
                }
                else {
                    s += ((s.indexOf('?') === -1) ? '?' : '&') + 'hl=' + lang;
                }
                iframe.src = s;
            }
        }
    };
    /** @internal */
    RecaptchaComponent.prototype.expired = function () {
        this.resolved.emit(null);
    };
    /** @internal */
    RecaptchaComponent.prototype.captchaReponseCallback = function (response) {
        this.resolved.emit(response);
    };
    /** @internal */
    RecaptchaComponent.prototype.grecaptchaReset = function () {
        var _this = this;
        if (this.widget != null) {
            this.zone.runOutsideAngular(function () { return _this.grecaptcha.reset(_this.widget); });
        }
    };
    /** @internal */
    RecaptchaComponent.prototype.renderRecaptcha = function () {
        var _this = this;
        this.widget = this.grecaptcha.render(this.elementRef.nativeElement, {
            badge: this.badge,
            callback: function (response) {
                _this.zone.run(function () { return _this.captchaReponseCallback(response); });
            },
            'expired-callback': function () {
                _this.zone.run(function () { return _this.expired(); });
            },
            sitekey: this.siteKey,
            size: this.size,
            tabindex: this.tabIndex,
            theme: this.theme,
            type: this.type,
        });
        this.useLang(this.lang);
    };
    RecaptchaComponent.decorators = [
        { type: core_1.Component, args: [{
                    exportAs: 'reCaptcha',
                    selector: 're-captcha',
                    template: "",
                },] },
    ];
    /** @nocollapse */
    RecaptchaComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: recaptcha_loader_service_1.RecaptchaLoaderService, },
        { type: core_1.NgZone, },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [recaptcha_settings_1.RECAPTCHA_SETTINGS,] },] },
    ]; };
    RecaptchaComponent.propDecorators = {
        'id': [{ type: core_1.Input }, { type: core_1.HostBinding, args: ['attr.id',] },],
        'siteKey': [{ type: core_1.Input },],
        'theme': [{ type: core_1.Input },],
        'type': [{ type: core_1.Input },],
        'size': [{ type: core_1.Input },],
        'tabIndex': [{ type: core_1.Input },],
        'badge': [{ type: core_1.Input },],
        'lang': [{ type: core_1.Input },],
        'resolved': [{ type: core_1.Output },],
    };
    return RecaptchaComponent;
}());
exports.RecaptchaComponent = RecaptchaComponent;
