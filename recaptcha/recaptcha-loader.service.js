"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
require("rxjs/add/observable/of");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var Observable_1 = require("rxjs/Observable");
var RecaptchaLoaderService = /** @class */ (function () {
    function RecaptchaLoaderService(
        // tslint:disable-next-line:no-any
        platformId) {
        this.platformId = platformId;
        this.init();
        this.ready = common_1.isPlatformBrowser(this.platformId) ? RecaptchaLoaderService.ready.asObservable() : Observable_1.Observable.of();
    }
    /** @internal */
    RecaptchaLoaderService.prototype.init = function () {
        if (RecaptchaLoaderService.ready) {
            return;
        }
        if (common_1.isPlatformBrowser(this.platformId)) {
            window.ng2recaptchaloaded = function () {
                RecaptchaLoaderService.ready.next(grecaptcha);
            };
            RecaptchaLoaderService.ready = new BehaviorSubject_1.BehaviorSubject(null);
            var script = document.createElement('script');
            script.innerHTML = '';
            script.src = "https://www.google.com/recaptcha/api.js?render=explicit&onload=ng2recaptchaloaded";
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
        }
    };
    /**
     * @internal
     * @nocollapse
     */
    RecaptchaLoaderService.ready = null;
    RecaptchaLoaderService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    RecaptchaLoaderService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core_1.Inject, args: [core_1.PLATFORM_ID,] },] },
    ]; };
    return RecaptchaLoaderService;
}());
exports.RecaptchaLoaderService = RecaptchaLoaderService;
