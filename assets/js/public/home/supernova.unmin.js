!function(a, b, c) {
    GT = {}, GT.Utils = {}, GT.Utils.dataOptions = function(b) {
        function c(a) {
            return !isNaN(a - 0) && null !== a && "" !== a && a !== !1 && a !== !0
        }

        function d(b) {
            return "string" == typeof b ? a.trim(b) : b
        }
        var e, f, g, h, i = a(b),
            j = {},
            k = i.data("options");
        for (g = (k || ":").split(";"), h = g.length, e = h - 1; e >= 0; e--) f = g[e].split(":"), /true/i.test(f[1]) && (f[1] = !0), /false/i.test(f[1]) && (f[1] = !1), c(f[1]) && (f[1] = parseFloat(f[1], 10)), 2 === f.length && f[0].length > 0 && (j[d(f[0])] = d(f[1]));
        return j
    }, GT.Utils.imgToBG = function(b) {
        var c = a(b),
            d = a.extend({
                removeImg: !0,
                holderSelector: null
            }, GT.Utils.dataOptions(c)),
            e = c.attr("src"),
            f = d.holderSelector ? a(d.holderSelector) : c.closest("[data-tobg-holder]");
        f.length && f.each(function() {
            a(this).css("background-image", "url(" + e + ")"), d.removeImg && c.remove()
        })
    }, GT.Utils.delayedCallback = function(a, b) {
        return c.setTimeout(b, 1e3 * a)
    }, a.fn.dataOptions = function() {
        return GT.Utils.dataOptions(this)
    }, a.fn.tobg = function(a) {
        return this.each(function() {
            GT.Utils.imgToBG(this, a)
        })
    }, a.wait = function(a, b) {
        return GT.Utils.delayedCallback(a, b)
    }, a(b).ready(function() {
        a("img[data-tobg]").tobg()
    })
}(jQuery, document, window),
function() {
    OM = {}
}(jQuery),
function(a, b, c, d) {
    OM.FullScreenGallery = function(b, e) {
        this.$context = a(b), this.defaults = {
            openerSelector: ".button--gallery",
            sourceURL: this.$context.data("source-url"),
            hideClass: "fsgallery--hidden",
            fotoramaOptions: {
                width: "100%",
                height: "100%",
                nav: "thumbs",
                keyboard: !0,
                shadows: !1,
                index: 0
            }
        };
        var f = this.$context.data(d + "-opts");
        this.options = a.extend(this.defaults, e, this.$context.dataOptions(), f), this.$context.data(d, this), this.$headline = this.$context.find("[data-fsgallery-headline]"), this.$fotoramaElement = this.$context.find(".fotorama"), this.$fotoramaParent = this.$fotoramaElement.parent(), this.$openers = a(this.options.openerSelector), this.$closeButton = this.$context.find("[data-fsgallery-close]"), this.$windown = a(c), this.keyCodes = [37, 38, 39, 40], this.fotorama = null, this.callbacks = {
            wheel: a.proxy(this.wheel, this),
            keydown: a.proxy(this.keydown, this),
            reflow: a.proxy(this.reflow, this)
        }, this.init()
    }, OM.FullScreenGallery.prototype.init = function() {
        var b = this;
        this.$openers.on("click", function(c) {
            c.preventDefault();
            var d = a(this).data();
            b.open(d.fsgalleryTitle, d.fsgalleryCategory)
        }), this.$closeButton.on("click", function(a) {
            a.preventDefault(), b.close()
        })
    }, OM.FullScreenGallery.prototype.open = function(b, c) {
        var d = this;
        return this.disableScroll().reflow(), this.$context.removeClass(this.options.hideClass), this.$windown.resize(this.callbacks.reflow), this.$headline.html(b), a.wait(.3, function() {
            a.getJSON(decodeURIComponent(d.options.sourceURL) + c, function(b) {
                if ("success" == b.status) {
                    var c = "";
                    b.mockups.forEach(function(a) {
                        c += '<a href="' + a.imageURL + '" data-caption="' + a.text + '"><img src="' + a.thumbURL + '" width="' + a.thumbWidth + '" height="' + a.thumbHeight + '"></a>'
                    }), d.$fotoramaElement.append(a(c)), d.fotorama = d.$fotoramaElement.fotorama(d.options.fotoramaOptions).data("fotorama"), d.reflow()
                }
            })
        }, .3), this
    }, OM.FullScreenGallery.prototype.close = function() {
        var b = this;
        this.$context.addClass(this.options.hideClass), this.enableScroll(), this.$windown.off("resize", b.reflow), this.fotorama && a.wait(.3, function() {
            b.fotorama.show({
                index: 0,
                time: 0
            }), b.fotorama.destroy(), b.$fotoramaElement.empty(), b.fotorama = null, b.$fotorama = null
        })
    }, OM.FullScreenGallery.prototype.reflow = function() {
        return this
    }, OM.FullScreenGallery.prototype.disableScroll = function() {
        return c.addEventListener && c.addEventListener("DOMMouseScroll", this.callbacks.wheel, !1), c.onmousewheel = b.onmousewheel = this.callbacks.wheel, b.onkeydown = this.callbacks.keydown, this
    }, OM.FullScreenGallery.prototype.enableScroll = function() {
        return c.removeEventListener && c.removeEventListener("DOMMouseScroll", this.callbacks.wheel, !1), c.onmousewheel = b.onmousewheel = b.onkeydown = null, this
    }, OM.FullScreenGallery.prototype.wheel = function(a) {
        this.preventDefault(a)
    }, OM.FullScreenGallery.prototype.preventDefault = function(a) {
        a = a || c.event, a.preventDefault && a.preventDefault(), a.returnValue = !1
    }, OM.FullScreenGallery.prototype.keydown = function(a) {
        var b = this,
            c = this.keyCodes,
            d = c.length;
        for (d; d--;)
            if (a.keyCode === c[d]) return void b.preventDefault(a)
    }, OM.FullScreenGallery.prototype.destroy = function() {
        this.$windown.off("resize", this.reflow), this.$context.off("." + d), this.$context.find("*").off("." + d), this.$context.removeData(d), this.$context = null, this.$windown = null
    }, a.fn.OMFullScreenGallery = function(a) {
        return this.each(function() {
            new OM.FullScreenGallery(this, a)
        })
    }, a(b).ready(function() {
        a("[data-fsgallery]").OMFullScreenGallery()
    })
}(jQuery, document, window, "om-fullscreen-gallery"),
function(a, b) {
    OM.PurchaseModal = function(b, c) {
        this.$context = a(b), this.$spinner = this.$context.find("[data-spinner]"), this.$forms = this.$context.find("[data-buy-modal-form]"), this.$purchaseForm = this.$context.find("[data-buy-modal-form=new-customer]"), this.$purchaseFormSubmit = this.$purchaseForm.find('button[type="submit"]'), this.$redeemCouponCheckbox = this.$purchaseForm.find("input[name=redeem-coupon]"), this.$redeemCouponContainer = this.$purchaseForm.find(".redeem-coupon-container"), this.$redeemCouponInput = this.$redeemCouponContainer.find("input[name=coupon]"), this.$redeemCouponCheckButton = this.$redeemCouponContainer.find(".button.check-button"), this.$alertBox = this.$context.find(".alert-box"), this.$alertMessage = this.$alertBox.find(".alert-message"), this.context = b, this.options = a.extend({}, {
            redirectDelay: .7,
            removeFormsOnSuccess: !0
        }, c), this.init()
    }, OM.PurchaseModal.prototype.init = function() {
        var b = this;
        this.$context.on("opened", function() {
            a(this).foundation("section", "reflow")
        }), this.$forms.on("valid", function() {
            var c = a(this);
            b.post(c.attr("action"), a(this))
        }), this.$redeemCouponCheckbox.on("change", function() {
            b.toggleCouponInput()
        }), this.$redeemCouponCheckButton.on("click", function(a) {
            a.preventDefault(), b.checkCouponCode()
        })
    }, OM.PurchaseModal.prototype.showMessage = function(a, b) {
        this.$alertBox.removeClass("hide alert success").addClass(b), this.$alertMessage.text(a), this.hideSpinner()
    }, OM.PurchaseModal.prototype.hideMessage = function() {
        this.$alertBox.addClass("hide"), this.$alertMessage.empty(), this.hideSpinner()
    }, OM.PurchaseModal.prototype.showSpinner = function() {
        this.$spinner.removeClass("hide")
    }, OM.PurchaseModal.prototype.hideSpinner = function() {
        this.$spinner.addClass("hide")
    }, OM.PurchaseModal.prototype.post = function(b, c) {
        var d = this;
        d.hideMessage(), d.showSpinner(), a.post(b, c.serialize(), function(b, e) {
            if ("success" != e) return void showMessage("Service unavailable", "alert");
            if ("success" === b.status) {
                c.find(":input").not(":button,:hidden").each(function() {
                    a(this).val("")
                });
                var f = b.redirect;
                d.options.removeFormsOnSuccess && c.remove(), f ? (d.showMessage(b.msg, "success"), d.showSpinner()) : d.showMessage(b.msg, "success"), a.wait(d.options.redirectDelay, function() {
                    f ? window.location.replace(f) : (d.$context.foundation("reveal", "close"), d.hideMessage())
                })
            } else b.field ? (c.find("#" + b.field).addClass("error"), d.showMessage(b.msg, "alert")) : d.showMessage(b.msg, "alert")
        }, "json")
    }, OM.PurchaseModal.prototype.toggleCouponInput = function() {
        var a = this,
            b = a.$redeemCouponCheckbox.is(":checked");
        b ? a.$redeemCouponContainer.slideDown(function() {
            a.$redeemCouponInput.focus()
        }) : (a.$redeemCouponInput.val(""), a.$redeemCouponContainer.slideUp(), a.$purchaseFormSubmit.removeClass("success").find("strong").html("$" + a.$redeemCouponCheckButton.data("currentValue")).next("small").find("em").html(""), a.$redeemCouponCheckButton.removeClass("alert").html("Apply"))
    }, OM.PurchaseModal.prototype.checkCouponCode = function() {
        var b = this,
            c = b.$redeemCouponCheckButton.data(),
            d = b.$redeemCouponInput.val() || "000",
            e = {
                k: c.csrfKey
            };
        e[c.csrfKey] = c.csrfToken, a.getJSON(c.apiMethod + ":" + d, e).done(function(a) {
            "success" === a.status ? (b.$redeemCouponCheckButton.removeClass("alert").html("Ok"), b.$purchaseFormSubmit.addClass("success").find("strong").html("$" + (c.currentValue - c.currentValue * (a.discount / 100)).toFixed(2)).next("small").find("em").html(a.discount + "% Off")) : (b.$redeemCouponCheckButton.addClass("alert").html("Invalid"), b.$purchaseFormSubmit.removeClass("success").find("strong").html("$" + c.currentValue).next("small").find("em").html(""))
        }).fail(function(a, b, c) {
            var d = b + ", " + c;
            console.log("Request Failed: " + d)
        })
    }, a.fn.purchaseModal = function(a) {
        return this.each(function() {
            new OM.PurchaseModal(this, a)
        })
    }, a(b).ready(function() {
        a("[data-buy-modal]").purchaseModal({
            redirectDelay: .7,
            removeFormsOnSuccess: !1
        })
    })
}(jQuery, document),
function(a, b, c) {
    OM.SubscribeForm = function(b, c) {
        this.$context = a(b), this.$spinner = this.$context.find("[data-spinner]"), this.$form = this.$context.find("form"), this.$alertBox = this.$context.find(".alert-box"), this.$alertMessage = this.$alertBox.find(".alert-message"), this.options = a.extend({}, {
            redirectDelay: .7,
            removeFormsOnSuccess: !0
        }, c), this.context = b, this.action = this.$form.attr("action"), this.init()
    }, OM.SubscribeForm.prototype.init = function() {
        var a = this;
        this.$form.submit(function(b) {
            b.preventDefault(), a.post()
        })
    }, OM.SubscribeForm.prototype.showMessage = function(a, b) {
        this.$alertBox.removeClass("hide alert success").addClass(b), this.$alertMessage.text(a), this.hideSpinner()
    }, OM.SubscribeForm.prototype.hideMessage = function() {
        this.$alertBox.addClass("hide"), this.$alertMessage.empty(), this.hideSpinner()
    }, OM.SubscribeForm.prototype.showSpinner = function() {
        this.$spinner.removeClass("hide")
    }, OM.SubscribeForm.prototype.hideSpinner = function() {
        this.$spinner.addClass("hide")
    }, OM.SubscribeForm.prototype.post = function() {
        var b = this;
        b.hideMessage(), b.showSpinner(), a.post(this.action, this.$form.serialize(), function(d, e) {
            if ("success" != e) return void showMessage("Service unavailable", "alert");
            if ("success" === d.status) {
                b.$form.find(":input").not(":button,:hidden").each(function() {
                    a(this).val("")
                });
                var f = d.redirect;
                b.options.removeFormsOnSuccess && b.$form.remove(), f ? (b.showMessage(d.msg, "success"), b.showSpinner()) : b.showMessage(d.msg, "success"), a.wait(b.options.redirectDelay, function() {
                    f && c.location.replace(f)
                })
            } else d.field ? (b.$form.find("input[name=" + d.field + "]").addClass("error"), b.showMessage(d.msg, "alert")) : b.showMessage(d.msg, "alert")
        }, "json")
    }, a.fn.subscribeForm = function(a) {
        return this.each(function() {
            new OM.SubscribeForm(this, a)
        })
    }, a(b).ready(function() {
        a("[data-subscribe]").subscribeForm()
    })
}(jQuery, document, window),
function(a, b, c, d) {
    var e = a(b);
    a.fn.lazyload = function(f) {
        function g() {
            if (j.isEnabled()) {
                var b = 0;
                i.each(function() {
                    var c = a(this);
                    if (!j.skip_invisible || c.is(":visible"))
                        if (a.abovethetop(this, j) || a.leftofbegin(this, j));
                        else if (a.belowthefold(this, j) || a.rightoffold(this, j)) {
                        if (++b > j.failure_limit) return !1
                    } else c.trigger("appear"), b = 0
                })
            }
        }
        var h, i = this,
            j = {
                threshold: 0,
                failure_limit: 0,
                event: "scroll",
                effect: "show",
                container: b,
                data_attribute: "original",
                skip_invisible: !0,
                appear: null,
                load: null,
                placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC",
                isEnabled: function() {
                    return !0
                }
            };
        return f && (d !== f.failurelimit && (f.failure_limit = f.failurelimit, delete f.failurelimit), d !== f.effectspeed && (f.effect_speed = f.effectspeed, delete f.effectspeed), a.extend(j, f)), h = j.container === d || j.container === b ? e : a(j.container), 0 === j.event.indexOf("scroll") && h.bind(j.event, function() {
            return g()
        }), this.each(function() {
            var b = this,
                c = a(b);
            b.loaded = !1, (c.attr("src") === d || c.attr("src") === !1) && c.is("img") && c.attr("src", j.placeholder), c.one("appear", function() {
                if (!this.loaded) {
                    if (j.appear) {
                        var d = i.length;
                        j.appear.call(b, d, j)
                    }
                    a("<img />").bind("load", function() {
                        var d = c.attr("data-" + j.data_attribute);
                        c.hide(), c.is("img") ? c.attr("src", d) : c.css("background-image", "url('" + d + "')"), c[j.effect](j.effect_speed), b.loaded = !0;
                        var e = a.grep(i, function(a) {
                            return !a.loaded
                        });
                        if (i = a(e), j.load) {
                            var f = i.length;
                            j.load.call(b, f, j)
                        }
                    }).attr("src", c.attr("data-" + j.data_attribute))
                }
            }), 0 !== j.event.indexOf("scroll") && c.bind(j.event, function() {
                b.loaded || c.trigger("appear")
            })
        }), e.bind("resize", function() {
            g()
        }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && e.bind("pageshow", function(b) {
            b.originalEvent && b.originalEvent.persisted && i.each(function() {
                a(this).trigger("appear")
            })
        }), a(c).ready(function() {
            g()
        }), this
    }, a.belowthefold = function(c, f) {
        var g;
        return g = f.container === d || f.container === b ? (b.innerHeight ? b.innerHeight : e.height()) + e.scrollTop() : a(f.container).offset().top + a(f.container).height(), g <= a(c).offset().top - f.threshold
    }, a.rightoffold = function(c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.width() + e.scrollLeft() : a(f.container).offset().left + a(f.container).width(), g <= a(c).offset().left - f.threshold
    }, a.abovethetop = function(c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.scrollTop() : a(f.container).offset().top, g >= a(c).offset().top + f.threshold + a(c).height()
    }, a.leftofbegin = function(c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.scrollLeft() : a(f.container).offset().left, g >= a(c).offset().left + f.threshold + a(c).width()
    }, a.inviewport = function(b, c) {
        return !(a.rightoffold(b, c) || a.leftofbegin(b, c) || a.belowthefold(b, c) || a.abovethetop(b, c))
    }, a.extend(a.expr[":"], {
        "below-the-fold": function(b) {
            return a.belowthefold(b, {
                threshold: 0
            })
        },
        "above-the-top": function(b) {
            return !a.belowthefold(b, {
                threshold: 0
            })
        },
        "right-of-screen": function(b) {
            return a.rightoffold(b, {
                threshold: 0
            })
        },
        "left-of-screen": function(b) {
            return !a.rightoffold(b, {
                threshold: 0
            })
        },
        "in-viewport": function(b) {
            return a.inviewport(b, {
                threshold: 0
            })
        },
        "above-the-fold": function(b) {
            return !a.belowthefold(b, {
                threshold: 0
            })
        },
        "right-of-fold": function(b) {
            return a.rightoffold(b, {
                threshold: 0
            })
        },
        "left-of-fold": function(b) {
            return !a.rightoffold(b, {
                threshold: 0
            })
        }
    })
}(jQuery, window, document),
function(a) {
    var b = a(window);
    a.fn.visible = function(a, c, d) {
        if (!(this.length < 1)) {
            var e = this.length > 1 ? this.eq(0) : this,
                f = e.get(0),
                g = b.width(),
                h = b.height(),
                d = d ? d : "both",
                i = c === !0 ? f.offsetWidth * f.offsetHeight : !0;
            if ("function" == typeof f.getBoundingClientRect) {
                var j = f.getBoundingClientRect(),
                    k = j.top >= 0 && j.top < h,
                    l = j.bottom > 0 && j.bottom <= h,
                    m = j.left >= 0 && j.left < g,
                    n = j.right > 0 && j.right <= g,
                    o = a ? k || l : k && l,
                    p = a ? m || n : m && n;
                if ("both" === d) return i && o && p;
                if ("vertical" === d) return i && o;
                if ("horizontal" === d) return i && p
            } else {
                var q = b.scrollTop(),
                    r = q + h,
                    s = b.scrollLeft(),
                    t = s + g,
                    u = e.offset(),
                    v = u.top,
                    w = v + e.height(),
                    x = u.left,
                    y = x + e.width(),
                    z = a === !0 ? w : v,
                    A = a === !0 ? v : w,
                    B = a === !0 ? y : x,
                    C = a === !0 ? x : y;
                if ("both" === d) return !!i && r >= A && z >= q && t >= C && B >= s;
                if ("vertical" === d) return !!i && r >= A && z >= q;
                if ("horizontal" === d) return !!i && t >= C && B >= s
            }
        }
    }
}(jQuery),
function(a) {
    function b() {
        f = !1;
        for (var b = 0, e = d.length; e > b; b++) {
            var g = a(d[b]).filter(function() {
                return a(this).is(":appeared")
            });
            if (g.trigger("appear", [g]), c) {
                var h = c.not(g);
                h.trigger("disappear", [h])
            }
            c = g
        }
    }
    var c, d = [],
        e = !1,
        f = !1,
        g = {
            interval: 250,
            force_process: !1
        },
        h = a(window);
    a.expr[":"].appeared = function(b) {
        var c = a(b);
        if (!c.is(":visible")) return !1;
        var d = h.scrollLeft(),
            e = h.scrollTop(),
            f = c.offset(),
            g = f.left,
            i = f.top;
        return i + c.height() >= e && i - (c.data("appear-top-offset") || 0) <= e + h.height() && g + c.width() >= d && g - (c.data("appear-left-offset") || 0) <= d + h.width() ? !0 : !1
    }, a.fn.extend({
        appear: function(c) {
            var h = a.extend({}, g, c || {}),
                i = this.selector || this;
            if (!e) {
                var j = function() {
                    f || (f = !0, setTimeout(b, h.interval))
                };
                a(window).scroll(j).resize(j), e = !0
            }
            return h.force_process && setTimeout(b, h.interval), d.push(i), a(i)
        }
    }), a.extend({
        force_appear: function() {
            return e ? (b(), !0) : !1
        }
    })
}(jQuery),
function(a, b, c) {
    Modernizr.svg || a('img[src*="svg"]').attr("src", function() {
        return a(this).attr("src").replace(".svg", ".png")
    }), a(b).foundation("topbar interchange abide alerts forms reveal section tooltips"), OM.startField = function(d) {
        function e() {
            var a = b.documentElement.clientWidth,
                c = b.documentElement.clientHeight;
            return Array(a, c)
        }

        function f() {
            for (var a = 0; o > a; a++) x[a] = new Array(5), x[a][0] = Math.random() * p * 2 - 2 * r, x[a][1] = Math.random() * q * 2 - 2 * s, x[a][2] = Math.round(Math.random() * t), x[a][3] = 0, x[a][4] = 0;
            var b = C[0];
            b.width = p, b.height = q, l = b.getContext("2d"), l.fillStyle = "rgba(0,0,0,0)", l.strokeStyle = "rgb(255,255,255)"
        }

        function g() {
            A = y - r, B = z - s, l.fillRect(0, 0, p, q), l.clearRect(0, 0, p, q);
            for (var a = 0; o > a; a++) n = !0, j = x[a][3], k = x[a][4], x[a][0] += A >> 4, x[a][0] > r << 1 && (x[a][0] -= p << 1, n = !1), x[a][0] < -r << 1 && (x[a][0] += p << 1, n = !1), x[a][1] += B >> 4, x[a][1] > s << 1 && (x[a][1] -= q << 1, n = !1), x[a][1] < -s << 1 && (x[a][1] += q << 1, n = !1), x[a][2] -= w, x[a][2] > t && (x[a][2] -= t, n = !1), x[a][2] < 0 && (x[a][2] += t, n = !1), x[a][3] = r + x[a][0] / x[a][2] * v, x[a][4] = s + x[a][1] / x[a][2] * v, j > 0 && p > j && k > 0 && q > k && n && (l.lineWidth = 2 * (1 - u * x[a][2]), l.beginPath(), l.moveTo(j, k), l.lineTo(x[a][3], x[a][4]), l.stroke(), l.closePath());
            m = setTimeout(g, D)
        }

        function h() {
            i(), g()
        }

        function i() {
            p = e()[0], q = e()[1], r = .75 * p, s = Math.round(q / 2), t = (p + q) / 2, u = 1 / t, y = r, z = s, f()
        }
        var j, k, l, m, n = (b.location.href, !0),
            o = 800,
            p = 0,
            q = 0,
            r = 0,
            s = 0,
            t = 0,
            u = 0,
            v = 115,
            w = .1,
            x = new Array(o),
            y = 0,
            z = 0,
            A = 0,
            B = 0,
            C = a(d),
            D = 0,
            E = a("#cover"),
            F = !1;
        h(), a(c).on("resize", function() {
            i()
        }), a(c).scroll(function() {
            E.visible(!0) ? F || (F = !0, clearTimeout(m), g()) : F && (F = !1, clearTimeout(m))
        })
    }, a.fn.OMStartField = function(a) {
        return this.each(function() {
            OM.startField(this, a)
        })
    }, a(document).ready(function() {
        a(".cover--with-startfield canvas.cover__starfield").OMStartField(), a(".disqus-comments-button").on("click", function(b) {
            b.preventDefault();
            var c = a(this);
            a(this).fadeOut("fast", function() {
                a.ajax({
                    type: "GET",
                    url: "http://" + c.data("disqusShortname") + ".disqus.com/embed.js",
                    dataType: "script",
                    cache: !0
                })
            })
        }), $topBarRow = a("#cover .top-bar-row"), $topBar = $topBarRow.find("nav.top-bar"), $topBarToggle = $topBar.find(".toggle-topbar"), $topBarToggle.on("click", function() {
            $topBarRow.toggleClass("top-bar-row--expanded", !$topBar.hasClass("expanded"))
        }), a("[data-scrollto]").on("click", function(b) {
            b.preventDefault();
            var c = a(this).data("scrollto"),
                d = a(c).offset().top;
            TweenMax.to(window, 1.5, {
                scrollTo: {
                    y: d,
                    autoKill: !1
                },
                ease: Power2.easeInOut,
                onComplete: function() {
                    a(window).scroll()
                }
            })
        }), a(".block-gallery img.lazy").lazyload({
            load: function() {
                var b = a(this);
                b.closest("figure").addClass("fade-in"), b.tobg()
            },
            isEnabled: function() {
                return !TweenMax.isTweening(window)
            }
        }), a(".section").find(".covered.image-holder").find(".lazy-load").lazyload({
            load: function() {
                var b = a(this);
                b.closest(".image-holder").addClass("fade-in"), b.tobg()
            },
            threshold: 500,
            isEnabled: function() {
                return !TweenMax.isTweening(window)
            }
        });
        var b = {};
        a("#toc").find(".block-gallery__item").hover(function() {
            var c = a(this).find("[data-count]"),
                d = c.data("count-from") || 0,
                e = c.data("count-to") || 99;
            b = {
                val: d
            }, TweenMax.to(b, 1, {
                val: e,
                roundProps: "val",
                ease: Power2.easeOut,
                onUpdate: function() {
                    c.text(b.val < 10 ? "0" + b.val : b.val)
                }
            })
        }, function() {
            TweenMax.killTweensOf(b)
        });
        var c = a("#buy").find("[data-count]"),
            d = !1;
        c.appear(), c.on("appear", function() {
            if (!d) {
                d = !0;
                var a = c.data("count-from") || 0,
                    e = c.data("count-to") || 99;
                b = {
                    val: a
                }, TweenMax.to(b, 4, {
                    immediateRender: !0,
                    delay: 1,
                    val: e,
                    roundProps: "val",
                    ease: Expo.easeInOut,
                    onUpdate: function() {
                        c.text(b.val)
                    },
                    onComplete: function() {
                        c.off("appear").off("disappear")
                    }
                })
            }
        }).on("disappear", function() {
            d = !1, c.text(c.data("count-from")), TweenMax.killTweensOf(b)
        })
    })
}(jQuery, document, window);