(function(e, t, n, r) {
    function s(t, n) {
        this.obj = e(t);
        this.o = e.extend({}, e.fn[i].defaults, n);
        this.init()
    }
    var i = "powerTour";
    s.prototype = {
        init: function() {
            var t = this;
            bd = e("body");
            clickEvent = "click";
            screenPos = new Array("sc", "stl", "stm", "str", "srm", "sbr", "sbm", "sbl", "slm");
            cdInterval = "";
            d_pwac = "data-powertour-action";
            d_pwcs = "data-powertour-currentstep";
            d_pwfx = "data-powertour-fx";
            d_pwid = "data-powertour-id";
            d_pwpa = "data-powertour-pause";
            d_pwph = "data-powertour-placeholder";
            d_pwps = "data-powertour-previousstep";
            d_pwrn = "data-powertour-run";
            d_pwst = "data-powertour-step";
            d_pwsw = "data-powertour-startwith";
            d_pwtg = "data-powertour-trigger";
            d_pwtm = "data-powertour-timer";
            c_pwsw = "powertour-show";
            c_pwhd = "powertour-hide";
            c_pwhl = "powertour-highlight";
            c_pwhk = "powertour-hook";
            c_pwdc = "powertour-disable-cancel";
            c_pwst = "powertour-step";
            c_pwmk = "powertour-mask";
            var r = function() {
                var e = n.createElement("p").style,
                    t = ["ms", "O", "Moz", "Webkit"];
                if (e["transition"] == "") return true;
                while (t.length)
                    if (t.pop() + "Transition" in e) return true;
                return false
            }();
            if (!r) {
                bd.attr(d_pwfx, false)
            }
            if (e("#" + c_pwmk).length < 1) {
                bd.append('<div id="' + c_pwmk + '"></div>')
            }
            t._build();
            t._clickEvents();
            t._keyboardEvents();
            t._runOnStart()
        },
        _build: function() {
            var t = this;
            e.each(t.o.tours, function(n, i) {
                var s = i.stepDefaults[0];
                var o = e(i.trigger).attr(d_pwsw);
                if (isNaN(o)) {
                    var u = i.startWith !== r && e.trim(i.startWith) != "" && i.startWith != "0" ? i.startWith - 1 : 0
                } else {
                    var u = parseInt(o) - 1
                }
                e(i.trigger).attr({
                    "data-powertour-startwith": u,
                    "data-powertour-trigger": n
                }).addClass(c_pwdc);
                e.each(i.steps, function(e, r) {
                    t._setPosition(r, n, e, true)
                })
            })
        },
        _setPosition: function(t, n, i, s) {
            var o = this;
            var u = "[" + d_pwid + '="' + n + '"][' + d_pwst + '="' + i + '"]';
            var a = t.width !== r && e.trim(t.width) != "" ? t.width : def.width;
            var f = t.position !== r && e.trim(t.position) != "" ? t.position : def.position;
            var l = t.offsetY !== r && e.trim(t.offsetY) != "" ? t.offsetY : def.offsetY;
            var c = t.offsetX !== r && e.trim(t.offsetX) != "" ? t.offsetX : def.offsetX;
            if (e.inArray(f, screenPos) == -1) {
                var h = e(t.hookTo);
                h.addClass(c_pwhk)
            } else {
                var h = bd
            }
            if (s === true) {
                var p = '<div class="' + c_pwst + " " + c_pwdc + '" ' + d_pwid + '="' + n + '" ' + d_pwst + '="' + i + '" id="pw-' + n + "-" + i + '" tabindex="-1" role="dialog" aria-hidden="true"></div>';
                h.append(p).children(u).width(a).html(e(t.content)).children().show()
            }
            var d = e(u);
            var v = h.outerWidth();
            var m = h.outerHeight();
            var g = d.outerWidth();
            var y = d.outerHeight();
            switch (f) {
                case "tl":
                    d.css({
                        left: c,
                        top: -y - offsetY
                    });
                    break;
                case "tm":
                    d.css({
                        left: "50%",
                        marginLeft: -(g / 2) - c,
                        top: -y - l
                    });
                    break;
                case "tr":
                    d.css({
                        right: c,
                        top: -y - l
                    });
                    break;
                case "rt":
                    d.css({
                        left: v + c,
                        top: l
                    });
                    break;
                case "rm":
                    d.css({
                        left: v + c,
                        top: "50%",
                        marginTop: -(y / 2) - l
                    });
                    break;
                case "rb":
                    d.css({
                        left: v + c,
                        bottom: l
                    });
                    break;
                case "bl":
                    d.css({
                        left: c,
                        bottom: -y - l
                    });
                    break;
                case "bm":
                    d.css({
                        left: "50%",
                        marginLeft: -(g / 2) - c,
                        bottom: -y - l
                    });
                    break;
                case "br":
                    d.css({
                        right: c,
                        bottom: -y - l
                    });
                    break;
                case "lt":
                    d.css({
                        right: v + c,
                        top: l
                    });
                    break;
                case "lm":
                    d.css({
                        right: v + c,
                        top: "50%",
                        marginTop: -(y / 2) - l
                    });
                    break;
                case "lb":
                    d.css({
                        right: v + c,
                        bottom: l
                    });
                    break;
                case "sc":
                    d.css({
                        left: "50%",
                        top: "50%",
                        marginLeft: -(a / 2) - c,
                        marginTop: -(y / 2) - l,
                        position: "fixed"
                    });
                    break;
                case "stl":
                    d.css({
                        left: 20 - c,
                        top: 20 - l,
                        position: "fixed"
                    });
                    break;
                case "stm":
                    d.css({
                        left: "50%",
                        marginLeft: -(a / 2) - c,
                        top: 20 - l,
                        position: "fixed"
                    });
                    break;
                case "str":
                    d.css({
                        right: 20 - c,
                        top: 20 - l,
                        position: "fixed"
                    });
                    break;
                case "srm":
                    d.css({
                        right: 20 - c,
                        top: "50%",
                        marginTop: -(y / 2) - l,
                        position: "fixed"
                    });
                    break;
                case "sbr":
                    d.css({
                        right: 20 - c,
                        bottom: 20 - l,
                        position: "fixed"
                    });
                    break;
                case "sbm":
                    d.css({
                        left: "50%",
                        bottom: 20 - l,
                        marginLeft: -(a / 2) - c,
                        position: "fixed"
                    });
                    break;
                case "sbl":
                    d.css({
                        left: 20 - c,
                        bottom: 20 - l,
                        position: "fixed"
                    });
                    break;
                case "slm":
                    d.css({
                        left: 20 - c,
                        top: "50%",
                        marginTop: -(y / 2) - l,
                        position: "fixed"
                    });
                    break;
                case false:
                    break;
                default:
                    d.css({
                        right: v + c,
                        top: l
                    });
                    break
            }
        },
        _tourDataVars: function() {
            var t = this;
            id = bd.attr(d_pwid);
            if (!isNaN(id)) {
                cs = bd.attr(d_pwcs);
                ps = bd.attr(d_pwps);
                tour = t.o.tours[id];
                step = tour.steps[cs];
                def = tour.stepDefaults[0];
                hook = tour.steps[cs].hookTo;
                scrollHorizontal = tour.scrollHorizontal;
                loopTour = tour.loopTour;
                countSteps = tour.steps.length;
                psObj = e("[" + d_pwst + "=" + ps + "][" + d_pwid + "=" + id + "]");
                csObj = e("[" + d_pwst + "=" + cs + "][" + d_pwid + "=" + id + "]");
                position = step.position !== r && e.trim(step.position) != "" ? step.position : def.position;
                center = step.center !== r && e.trim(step.center) != "" ? step.center : def.center;
                scrollSpeed = step.scrollSpeed !== r && e.trim(step.scrollSpeed) != "" ? step.scrollSpeed : def.scrollSpeed;
                scrollEasing = step.scrollEasing !== r && e.trim(step.scrollEasing) != "" ? step.scrollEasing : def.scrollEasing;
                scrollDelay = step.scrollDelay !== r && e.trim(step.scrollDelay) != "" ? step.scrollDelay : def.scrollDelay;
                highlight = step.highlight !== r && e.trim(step.highlight) != "" ? step.highlight : def.highlight;
                fxIn = step.fxIn !== r && e.trim(step.fxIn) != "" ? step.fxIn : def.fxIn;
                fxOut = step.fxOut !== r && e.trim(step.fxOut) != "" ? step.fxOut : def.fxOut;
                showStepDelay = step.showStepDelay !== r && e.trim(step.showStepDelay) != "" ? step.showStepDelay : def.showStepDelay;
                delay = step.delay !== r && e.trim(step.delay) != "" ? step.delay : def.delay;
                timer = step.timer !== r && e.trim(step.timer) != "" ? step.timer : def.timer;
                if (ps !== r) {
                    prevStep = tour.steps[ps];
                    prevFxOut = prevStep.fxOut !== r && e.trim(prevStep.fxOut) != "" ? prevStep.fxOut : def.fxOut;
                    keepHighlighted = prevStep.keepHighlighted !== r && e.trim(prevStep.keepHighlighted) != "" ? prevStep.keepHighlighted : def.keepHighlighted
                } else {
                    keepHighlighted = false
                }
            }
        },
        _fxIn: function(t, n) {
            if (bd.attr(d_pwid) !== r) {
                var n = e.trim(n);
                if (bd.attr(d_pwfx) == "false") {
                    var i = c_pwsw
                } else if (n == "" || n == "none") {
                    var i = c_pwsw
                } else {
                    var i = n + " animated"
                }
                t.attr("class", c_pwst + " " + c_pwdc + " " + i)
            }
        },
        _fxOut: function(t, n) {
            if (bd.attr(d_pwid) !== r) {
                var i = e.trim(n);
                if (bd.attr(d_pwfx) == "false" || n == "" || n == "none") {
                    var s = ""
                } else {
                    var s = n + " animated"
                }
                t.attr("class", c_pwst + " " + c_pwhd + " " + s)
            }
        },
        _goTo: function(n, i, s, o, u, a, f, l, c) {
            function p() {
                var t = e("." + c_pwhl).removeClass(c_pwhl);
                if (f === true && l === true) {
                    t
                } else {
                    e("#" + c_pwmk).fadeOut(200, function() {
                        t
                    })
                }
            }
            var h = this;
            p();
            i.attr("class", c_pwst);
            e("." + c_pwhk + "." + c_pwdc).removeClass(c_pwdc);
            if (e.inArray(o, screenPos) == -1) {
                var d = e(t).height();
                var v = e(t).width();
                if (c === true) {
                    if (s == "step" || e(n).outerWidth() >= v) {
                        var m = i.show().offset().left - v / 2 + i.outerWidth() / 2
                    } else {
                        var m = e(n).offset().left - v / 2 + e(n).outerWidth() / 2
                    }
                    var g = {
                        scrollLeft: m
                    }
                } else {
                    if (s == "step" || e(n).outerHeight() >= d) {
                        var m = i.show().offset().top - d / 2 + i.outerHeight() / 2
                    } else {
                        var m = e(n).offset().top - d / 2 + e(n).outerHeight() / 2
                    }
                    var g = {
                        scrollTop: m
                    }
                }
                var y = false;
                e("html, body").stop(true, true).animate(g, u, a, function() {
                    if (y) {
                        if (f === true && bd.attr(d_pwid) !== r) {
                            e(n).addClass(c_pwhl + " " + c_pwdc);
                            e("#" + c_pwmk).fadeIn()
                        }
                    } else {
                        y = true;
                        p()
                    }
                })
            } else {
                if (f === true && bd.attr(d_pwid) !== r) {
                    e(n).addClass(c_pwhl + " " + c_pwdc);
                    e("#" + c_pwmk).fadeIn()
                }
            }
        },
        _runTour: function() {
            var n = this;
            e("[" + d_pwph + '="timer"]').html("");
            clearInterval(t.cdInterval);
            bd.attr(d_pwtm, false);
            bd.removeAttr(d_pwpa);
            n._tourDataVars();
            if (bd.attr(d_pwrn) != "true") {
                if (typeof tour.onStartTour == "function") {
                    tour.onStartTour.call(this, {
                        currentStep: csObj
                    })
                }
            } else {
                bd.attr(d_pwrn, true)
            }
            if (ps !== r) {
                n._fxOut(psObj, prevFxOut);
                if (prevStep.onHideStep !== r && typeof prevStep.onHideStep == "function") {
                    prevStep.onHideStep.call(this, {
                        currentStep: csObj,
                        previousStep: psObj
                    })
                } else if (typeof def.onHideStep == "function") {
                    def.onHideStep.call(this, {
                        currentStep: csObj,
                        previousStep: psObj
                    })
                }
            }
            setTimeout(function() {
                n._goTo(hook, csObj, center, position, scrollSpeed, scrollEasing, highlight, keepHighlighted, scrollHorizontal);
                if (cs !== r) {
                    setTimeout(function() {
                        n._fxIn(csObj, fxIn);
                        n._timer(timer);
                        if (step.onShowStep !== r && typeof step.onShowStep == "function") {
                            step.onShowStep.call(this, {
                                currentStep: csObj,
                                previousStep: psObj
                            })
                        } else if (typeof def.onShowStep == "function") {
                            def.onShowStep.call(this, {
                                currentStep: csObj,
                                previousStep: psObj
                            })
                        }
                        if (typeof n.o.tours[id].onProgress == "function") {
                            n.o.tours[id].onProgress.call(this, {
                                stepIndex: parseInt(cs),
                                totalSteps: parseInt(countSteps),
                                tourIndex: parseInt(id)
                            })
                        }
                    }, showStepDelay)
                }
            }, scrollDelay)
        },
        _endTour: function(n) {
            var i = this;
            clearInterval(t.cdInterval);
            i._tourDataVars();
            i._fxOut(csObj, fxOut);
            if (step.onHideStep !== r && typeof step.onHideStep == "function") {
                step.onHideStep.call(this, {
                    currentStep: csObj,
                    previousStep: psObj
                })
            } else if (typeof def.onHideStep == "function") {
                def.onHideStep.call(this, {
                    currentStep: csObj,
                    previousStep: psObj
                })
            }
            if (typeof tour.onEndTour == "function") {
                tour.onEndTour.call(this, {
                    currentStep: csObj,
                    previousStep: psObj,
                    endType: n
                })
            }
            bd.removeAttr(d_pwid + " " + d_pwcs + " " + d_pwps + " " + d_pwtm + " " + d_pwrn + " " + d_pwpa);
            e("#" + c_pwmk).hide();
            setTimeout(function() {
                e("." + c_pwst).removeClass("animated")
            }, 1200)
        },
        _actionButtons: function(e, n) {
            var i = this;
            i._tourDataVars();
            if (id !== r) {
                total = parseInt(countSteps - 1);
                cs = parseInt(cs);
                var s = bd.attr("data-powertour-disable-all");
                switch (e) {
                    case "first":
                        if (s === r && bd.attr("data-powertour-disable-first") === r) {
                            var o = 0
                        } else {
                            return false
                        }
                        break;
                    case "last":
                        if (s === r && bd.attr("data-powertour-disable-last") === r) {
                            var o = total
                        } else {
                            return false
                        }
                        break;
                    case "prev":
                        if (s === r && bd.attr("data-powertour-disable-prev") === r) {
                            if (cs <= 0) {
                                if (loopTour === true) {
                                    var o = total
                                } else {
                                    var o = 0
                                }
                            } else {
                                var o = cs - 1
                            }
                        } else {
                            return false
                        }
                        break;
                    case "next":
                    case "timer":
                        if (s === r && bd.attr("data-powertour-timer") != "false" || bd.attr("data-powertour-disable-next") === r) {
                            if (cs >= total) {
                                if (loopTour === true) {
                                    var o = 0
                                } else {
                                    if (bd.attr("data-powertour-timer") == "false") {
                                        var o = total
                                    } else if (e != "next") {
                                        i._endTour("stop")
                                    }
                                }
                            } else {
                                var o = cs + 1
                            }
                        } else {
                            return false
                        }
                        break;
                    case "pause":
                    case "play":
                    case "toggleplay":
                        if (bd.attr(d_pwtm) != "false") {
                            clearInterval(t.cdInterval);
                            if (e == "play") {
                                i._timer(bd.attr(d_pwtm));
                                bd.removeAttr(d_pwpa)
                            }
                            if (e == "pause") {
                                bd.attr(d_pwpa, true)
                            }
                            if (e == "toggleplay") {
                                if (e == "toggleplay" && bd.attr(d_pwpa) == "true") {
                                    i._timer(bd.attr(d_pwtm));
                                    bd.removeAttr(d_pwpa)
                                } else {
                                    bd.attr(d_pwpa, true)
                                }
                            }
                        }
                        break;
                    case "stop":
                        if (s === r && bd.attr("data-powertour-disable-stop") === r) {
                            i._endTour("stop");
                            var o = "stop"
                        } else {
                            return false
                        }
                        break;
                    case "goto":
                        if (s === r && bd.attr("data-powertour-disable-goto") === r) {
                            var o = n - 1
                        } else {
                            return false
                        }
                        break
                }
                if (!isNaN(o) && o != cs) {
                    bd.attr({
                        "data-powertour-currentstep": o,
                        "data-powertour-previousstep": cs
                    });
                    i._runTour()
                }
            }
        },
        _timer: function(n) {
            var r = this;
            var i = e("[" + d_pwph + '="timer"]');
            if (n !== false && n != "00:00" && n.match("^(60:00|[0-5][0-9]:[0-5][0-9])$")) {
                var s = n.split(":").reverse();
                var o = parseInt(s[0] * 1e3 + s[1] * 6e4);
                i.html(n);
                bd.attr(d_pwtm, n);

                function u() {
                    function e(e, t, n) {
                        var r = (Math.floor(e / t) % n).toString();
                        if (r.length < 2) {
                            var r = "0" + r
                        }
                        return r
                    }
                    mins = e(o, 6e4, 60);
                    secs = e(o, 1e3, 60);
                    i.html(mins + ":" + secs);
                    bd.attr(d_pwtm, mins + ":" + secs)
                }
                t.cdInterval = setInterval(function() {
                    if (o != 0) {
                        o -= 1e3;
                        u()
                    } else {
                        r._actionButtons("timer", false)
                    }
                }, 1e3)
            }
        },
        _clickEvents: function() {
            var t = this;
            bd.on(clickEvent, "[" + d_pwtg + "]", function(n) {
                if (bd.attr(d_pwid)) {
                    t._endTour("end")
                }
                var i = e(this).attr(d_pwtg);
                var s = e(this).attr(d_pwsw);
                if (i !== r) {
                    bd.attr({
                        "data-powertour-id": i,
                        "data-powertour-currentstep": s,
                        "data-powertour-timer": false
                    });
                    t._runTour()
                }
                if (e(this).is("a") || e(this).parents().is("a")) {
                    n.preventDefault()
                }
            });
            bd.on(clickEvent, "[" + d_pwac + "]:not(.powertour-disable-action)", function(n) {
                t._actionButtons(e(this).attr(d_pwac), e(this).attr("data-powertour-goto"));
                n.preventDefault()
            });
            e(n).on(clickEvent, this, function(n) {
                var i = bd.attr(d_pwid);
                if (i !== r && t.o.tours[i].easyCancel && !e(n.target).is(e("." + c_pwdc)) && !e(n.target).is(e("." + c_pwdc + " *")) && !e(n.target).is(e("[" + d_pwac + "]")) && !e(n.target).is(e("[" + d_pwac + "] *"))) {
                    t._endTour("cancel")
                }
            })
        },
        _keyboardEvents: function() {
            var t = this;
            e(n).keyup(function(e) {
                var n = bd.attr(d_pwid);
                if (n !== r && t.o.tours[n].escKeyCancel === true && e.keyCode == 27) {
                    t._endTour("cancel")
                }
            });
            e(n).on("keydown", this, function(e) {
                var n = bd.attr(d_pwid);
                if (n !== r && t.o.tours[n].keyboardNavigation === true) {
                    if (e.keyCode == 32) {
                        e.preventDefault();
                        t._actionButtons("toggleplay", false)
                    }
                    if (e.keyCode == 37) {
                        t._actionButtons("prev", false)
                    }
                    if (e.keyCode == 39) {
                        t._actionButtons("next", false)
                    }
                }
            })
        },
        _runOnStart: function() {
            function n(e) {
                var n = t.location.search.substring(1);
                var r = n.split("&");
                for (var i = 0; i < r.length; i++) {
                    var s = r[i].split("=");
                    if (s[0] == e) {
                        return s[1]
                    }
                }
                return false
            }
            var e = this;
            var i = n("powertour");
            var s = n("startwith");
            if (!isNaN(i) && i !== false && i !== r) {
                if (i != 0) {
                    var o = i - 1
                } else {
                    var o = 0
                }
                if (!isNaN(s) && s !== false && s !== r) {
                    var u = s - 1
                } else {
                    var u = 0
                }
                bd.attr({
                    "data-powertour-id": o,
                    "data-powertour-currentstep": u,
                    "data-powertour-timer": false
                });
                e._runTour()
            }
        },
        update: function(t) {
            var n = this;
            if (!e.isArray(t)) {
                var t = [t]
            }
            e.each(t, function(t, r) {
                var i = e(r).parent().attr(d_pwid);
                var s = e(r).parent().attr(d_pwst);
                var o = n.o.tours[i].steps[s];
                n._setPosition(o, i, s, false)
            })
        },
        run: function(e) {
            var t = this;
            if (!isNaN(e)) {
                bd.attr({
                    "data-powertour-id": e,
                    "data-powertour-currentstep": t.o.tours[e].startWith,
                    "data-powertour-timer": false
                });
                t._runTour()
            }
        },
        destroy: function() {
            var t = this;
            if (!isNaN(bd.attr(d_pwid))) {
                t._endTour("end")
            }
            e("." + c_pwst).children().hide().unwrap();
            e("#" + c_pwmk).remove();
            e("[" + d_pwtg + "]").removeAttr(d_pwtg + " " + d_pwsw).removeClass(c_pwdc);
            e("." + c_pwhk).removeClass(c_pwhk);
            bd.removeData(i)
        }
    };
    e.fn[i] = function(t, n) {
        return this.each(function() {
            var r = e(this);
            var o = r.data(i);
            var u = typeof t == "object" && t;
            if (!o) {
                r.data(i, o = new s(this, u))
            }
            if (typeof t == "string") {
                o[t](n)
            }
        })
    };
    e.fn[i].defaults = {
        tours: [{
            trigger: "",
            startWith: "",
            easyCancel: "",
            escKeyCancel: "",
            scrollHorizontal: "",
            keyboardNavigation: "",
            loopTour: "",
            onStartTour: function(e) {},
            onEndTour: function(e) {},
            onProgress: function(e) {},
            steps: [{
                hookTo: "",
                content: "",
                width: "",
                position: "",
                offsetY: "",
                offsetX: "",
                fxIn: "",
                fxOut: "",
                showStepDelay: "",
                center: "",
                scrollSpeed: "",
                scrollEasing: "",
                scrollDelay: "",
                highlight: "",
                keepHighlighted: "",
                timer: "",
                onShowStep: function(e) {},
                onHideStep: function(e) {}
            }],
            stepDefaults: [{
                width: "",
                position: "",
                offsetY: "",
                offsetX: "",
                showStepDelay: "",
                fxIn: "",
                fxOut: "",
                center: "",
                scrollSpeed: "",
                scrollEasing: "",
                scrollDelay: "",
                highlight: "",
                keepHighlighted: "",
                timer: "",
                onShowStep: function(e) {},
                onHideStep: function(e) {}
            }]
        }]
    }
})(jQuery, window, document);
$(document).ready(function(e) {
    e("body").powerTour({
        tours: [{
            trigger: "#starttour-1",
            startWith: 1,
            easyCancel: true,
            escKeyCancel: true,
            scrollHorizontal: false,
            keyboardNavigation: true,
            loopTour: false,
            onStartTour: function(t) {
                e("#demo-bar-footer").animate({
                    bottom: 0
                }, 1e3)
            },
            onEndTour: function(t) {
                e("html, body").animate({
                    scrollTop: 0
                }, 1e3, "swing");
                e("#progressmeter").children("#progressmeter-bar").width(0).next().text();
                e("#demo-bar-footer").animate({
                    bottom: "-70px"
                }, 1e3)
            },
            onProgress: function(t) {
                var n = t.stepIndex + 1;
                var r = t.totalSteps;
                var i = 100 / r * n + "%";
                e("#progressmeter-text").html("<span>" + n + "</span> / " + r + "").prev("#progressmeter-bar").animate({
                    width: i
                }, 400)
            },
            steps: [{
                hookTo: "",
                content: "#step-one",
                width: 350,
                position: "str",
                offsetY: -80,
                offsetX: -50,
                fxIn: "lightSpeedIn",
                fxOut: "bounceOutLeft",
                showStepDelay: 0,
                center: "step",
                scrollSpeed: 400,
                scrollEasing: "swing",
                scrollDelay: 0,
                timer: "00:20",
                highlight: false,
                keepHighlighted: false,
                onShowStep: function(e) {},
                onHideStep: function(e) {}
            }, {
                hookTo: "#hook-two",
                content: "#step-two",
                width: 435,
                position: "bm",
                offsetY: 30,
                offsetX: 0,
                fxIn: "flipInX",
                fxOut: "flipOutY",
                showStepDelay: 1e3,
                center: "step",
                scrollSpeed: 400,
                scrollEasing: "swing",
                scrollDelay: 0,
                timer: "00:00",
                highlight: false,
                keepHighlighted: false,
                onShowStep: function(t) {
                    e("#hook-two > .btn").addClass("colorfadingbutton")
                },
                onHideStep: function(t) {
                    e("#hook-two > .btn").removeClass("colorfadingbutton")
                }
            }, {
                hookTo: ".tres",
                content: "#step-three",
               	width: 435,
                position: "rt",
                offsetY: 80,
                offsetX: 0,
                fxIn: "flipInX",
                fxOut: "flipOutY",
                showStepDelay: 1e3,
                center: "step",
                scrollSpeed: 400,
                scrollEasing: "swing",
                scrollDelay: 0,
                timer: "00:00",
                highlight: false,
                keepHighlighted: false,
                onShowStep: function(t) {
                    e("#hook-two > .btn").addClass("colorfadingbutton")
                },
                onHideStep: function(t) {
                    e("#hook-two > .btn").removeClass("colorfadingbutton")
                }
            }],
            stepDefaults: [{
                width: 300,
                position: "tr",
                offsetY: 0,
                offsetX: 0,
                fxIn: "fadeIn",
                fxOut: "fadeOut",
                showStepDelay: 0,
                center: "step",
                scrollSpeed: 400,
                scrollEasing: "swing",
                scrollDelay: 0,
                timer: "00:00",
                highlight: true,
                keepHighlighted: false,
                onShowStep: function(e) {},
                onHideStep: function(e) {}
            }]
        }, {
            trigger: "#starttour-2",
            startWith: 1,
            easyCancel: true,
            escKeyCancel: true,
            scrollHorizontal: false,
            keyboardNavigation: true,
            loopTour: false,
            onStartTour: function(e) {},
            onEndTour: function() {
                e("html, body").animate({
                    scrollTop: 0
                }, 1e3, "swing")
            },
            onProgress: function(e) {},
            steps: [{
                hookTo: "",
                content: "#step-1",
                width: 400,
                position: "sc",
                offsetY: 0,
                offsetX: 0,
                fxIn: "fadeIn",
                fxOut: "bounceOutUp",
                showStepDelay: 500,
                center: "step",
                scrollSpeed: 400,
                scrollEasing: "swing",
                scrollDelay: 0,
                timer: "00:00",
                highlight: true,
                keepHighlighted: true,
                onShowStep: function(e) {},
                onHideStep: function(e) {}
            }, {
                hookTo: "",
                content: "#step-2",
                width: 400,
                position: "sc",
                offsetY: 0,
                offsetX: 0,
                fxIn: "fadeIn",
                fxOut: "bounceOutLeft",
                showStepDelay: 1e3,
                center: "step",
                scrollSpeed: 400,
                scrollEasing: "swing",
                scrollDelay: 0,
                timer: "00:00",
                highlight: true,
                keepHighlighted: true,
                onShowStep: function(e) {},
                onHideStep: function(e) {}
            }, {
                hookTo: "",
                content: "#step-3",
                width: 400,
                position: "sc",
                offsetY: 0,
                offsetX: 0,
                fxIn: "fadeIn",
                fxOut: "bounceOutRight",
                showStepDelay: 1e3,
                center: "step",
                scrollSpeed: 400,
                scrollEasing: "swing",
                scrollDelay: 0,
                timer: "00:00",
                highlight: true,
                keepHighlighted: true,
                onShowStep: function(e) {},
                onHideStep: function(e) {}
            }],
            stepDefaults: [{
                width: 500,
                position: "tr",
                offsetY: 0,
                offsetX: 0,
                fxIn: "",
                fxOut: "",
                showStepDelay: 0,
                center: "step",
                scrollSpeed: 200,
                scrollEasing: "swing",
                scrollDelay: 0,
                timer: "00:00",
                highlight: true,
                keepHighlighted: false,
                onShowStep: function() {},
                onHideStep: function() {}
            }]
        }]
    })
})