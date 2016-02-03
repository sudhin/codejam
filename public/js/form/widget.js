Widget.prototype = new FormComponent;
Widget.prototype.constructor = Widget;
Widget.selector = ".widget";
function Widget() {
    this.lowerRank = null;
    this.init = function(element) {
        Widget.prototype.init.call(this, element);
        this.type = (this.html.element.className.match(/(\w*)-widget/)||[])[1];
        this.inputs = $(this.html.element).find(".input").get();
        this.addHandlers();
        return this;
    }

    this.updateProgress = function() {
        var sections = this.form.sections;
        var widgets = this.section.widgets;
        this.form.progress = {
            section: sections.indexOf(this.section),
            percent: (widgets.indexOf(this) + 1) / widgets.length * 100
         }
        this.form.site.updateProgress();
    }
    this.value = function() {
        if (this.type == "number") {
            return parseInt(this.inputs[0].value) || 0;
        }
        if (this.type == "radioselect" || this.type == "yesnoselect") {
            // Radio or Yes/No
            for (var i = 0; i < this.inputs.length; i++) {
                if (this.inputs[i].checked) {
                    return this.inputs[i].value;
                }
            }
            return "";
        }
        if (this.type == 'creditcard') {
            // return the number appended by the date.
            return this.inputs[0].value + "-" + this.inputs[1].value;
        }
        return this.inputs[0].value;
    }

    // State management
    this.hide = function() {
        return; // Widgets don't hide
    }
    this.disable = function() {
        Widget.prototype.disable.call(this);
        $(this.inputs).attr("disabled", "disabled");
    }
    this.enable = function() {
        Widget.prototype.enable.call(this);
        $(this.inputs).removeAttr("disabled");
    }
    this.answered = function() {
        return !!this.value();
    }
    this.finished = function() {
        return this.answered();
    }

    // Handlers
    this.addListener = function(evt, handler) {
        for (var i = 0; i < this.inputs.length; i++) {
            var input = this.inputs[i];
            input.addEventListener(evt, handler);
        }
    }
    this.removeListener = function(evt, handler) {
        for (var i = 0; i < this.inputs.length; i++) {
            var input = this.inputs[i];
            input.removeEventListener(evt, handler);
        }
    }
    this.addHandlers = function() {
        this.addListener("mousedown", this.onMouseDown);
        this.addListener("focus", this.onFocus);
        this.addListener("keydown", this.onKeyDown);
        this.addListener("keypress", this.onKeyPress);
        this.addListener("input", this.onInput);
        this.addListener("change", this.onInput);
        this.addListener("blur", this.onBlur);

        this.addListener("focus", function() {
            $(this).closest(".subwidget, .widget").addClass("focus");
            //$(this.html.element).addClass("focus");
        });
        this.addListener("blur", function() {
            $(this).closest(".subwidget, .widget").removeClass("focus");
            //$(this.html.element).removeClass("focus");
        });
        this.addListener("change", function() {
            if (this.type == "radioselect" || this.type == "yesnoselect" || this.type == 'checkbox') {
                $(this.html.element).find(".subwidget").removeClass("checked");
                $(this.html.element).find(".input:checked").closest(".subwidget").addClass("checked");
            }
        }.bind(this));
        if (this.type == "number") {
            var increase = $(this.html.element).find(".number-widget-increase")[0];
            var decrease = $(this.html.element).find(".number-widget-decrease")[0];
            increase.addEventListener("click", function() {
                var input = this.inputs[0];
                var val = parseInt(input.value) || 0;
                if (val < 2) {
                    val += 1;
                }
                input.value = val + " Vehicle" + ((val == 1) ? "" : "s");
                input.dispatchEvent(new Event("input", {"bubbles": true}));
            }.bind(this));
            decrease.addEventListener("click", function() {
                var input = this.inputs[0];
                var val = parseInt(input.value) || 0;
                if (!val) return;
                if (val > 1) {
                    val -= 1;
                }
                input.value = val + " Vehicle" + ((val == 1) ? "" : "s");
                input.dispatchEvent(new Event("input", {"bubbles": true}));
            }.bind(this));
            var input = this.inputs[0];
        }
    }
    this.onMouseDown = function(e) {
        if (this.type != "text") {
            // Don't scroll on focus
            this.removeListener("focus", this.onFocus);
            // Focus next on input (dragons)
            this.addListener("input", this.onPick);
            this.addListener("change", this.onPick);
        }
        this.removeListener("mousedown", this.onMouseDown);
    }
    this.onFocus = function() {
        // Update callout label
        this.fieldset.updateLabel();
        this.section.scrollToWidget(this);

        this.removeListener("focus", this.onFocus);
    }
    this.onKeyDown = function(e) {
        // Prevent tabbing away accidentally
        var next = this.next();
        if (e.keyCode == 9 && !e.shiftKey && next && next.disabled) {
            e.preventDefault();
        }
        // Enter acts like tab on text fields
        if (this.type == "text" && e.keyCode == 13 && next && !next.disabled) {
            e.preventDefault();
            next.inputs[0].focus();
        }

        if (this.type != "text") {
            var space = (e.keyCode == 32);
            var arrow = (e.keyCode == 38 || e.keyCode == 40);
            if (space || (this.type == "select" && arrow)) {
                // Focus next on input (dragons)
                this.addListener("input", this.onPick);
                this.addListener("change", this.onPick);
            } else {
                // Don't focus next on input after all (dragons)
                this.removeListener("input", this.onPick);
                this.removeListener("change", this.onPick);
            }
        }
    }
    this.onKeyPress = function(e) {
        /*
        if (e.keyCode != 32 && this.type != "text") {
            // Don't focus next on input after all (dragons)
            this.removeListener("input", this.onPick);
            this.removeListener("change", this.onPick);
        }
        */
    }
    this.onInput = function() {
        // Enable next thing
        var next = this.next(this.field);
        if (!next) next = this.field.next(this.fieldset);
        if (!next) next = this.fieldset.next(this.subsection);
        if (!next) next = this.subsection.next(this.section);
        if (!next) next = this.section.next();
        if (next) {
            next.reveal();
            next.enable();
        }

        // Reveal next after
        var nextWidget = this.next(this.section);
        var nextAfter = this.section.next(); // Usually overwritten
        if (nextWidget) {
            nextAfter = nextWidget.field.next(this.section) || nextAfter;
        }
        if (nextAfter) {
            nextAfter.reveal();
        }

        $(this.html.element).addClass("answered");

        // Show progress
        this.updateProgress();

        this.removeListener("input", this.onInput);
        this.removeListener("change", this.onInput);
    }
    this.onBlur = function() {
        var n = this.next();
        if (n && (n.section == this.section || n.section == this.section.next())) {
            if (!n.answered()) {
                n.inputs[0].focus();
            }
        }
        this.removeListener("blur", this.onBlur);
    }
    this.onPick = function() {
        var next = this.next(this.section);
        if (next) {
            next.inputs[0].focus();
        }
        else {
            var nextSection = this.section.next();
            if (nextSection.widgets) {
                var scrollTop = document.body.scrollTop;
                nextSection.widgets[0].inputs[0].focus();
                document.body.scrollTop = scrollTop;
            } else {
                this.onBlur();
                this.onFocus();
                nextSection.enable();
            }
        }
        this.removeListener("input", this.onPick);
        this.removeListener("change", this.onPick);
    }

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onPick = this.onPick.bind(this);
}
