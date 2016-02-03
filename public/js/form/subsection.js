Subsection.prototype = new FormComponent;
Subsection.prototype.constructor = Subsection;
Subsection.selector = ".subsection";
function Subsection() {
    this.lowerRank = Fieldset;
    this.init = function(element) {
        Subsection.prototype.init.call(this, element);
        this.html.label = $(element).find(".subsection-label")[0];
        this.html.summary = $(element).find(".subsection-summary")[0];
        this.html.fragments = $(element).find(".summary-fragment").get();
        this.html.details = $(element).find(".subsection-details")[0];
        this.initSummary();
        this.addHandlers();
        return this;
    }
    this.addHandlers = function() {
        this.widgets[0].addListener("focus", function() {
            this.updateLabel();
        }.bind(this));
    }
    this.answered = function() {
        for (var i = 0; i < this.fieldsets.length; i++) {
            if (this.fieldsets[i].finished()) {
                return true;
            }
        }
        return false;
    }
    this.updateLabel = function() {
        var labelHtml = this.html.label.innerHTML;
        this.section.updateSubsectionLabel(labelHtml);
    }
    this.afterScroll = function() {
        if (this.hidden || this.disabled) {
            return;
        }

        for (var i = 0; i < this.fieldsets.length; i++) {
            this.fieldsets[i].afterScroll();
        }

        if (!this.focused() && this.offscreen() && this.finished()) {
            if (this.form.sections.indexOf(this.section) <= 1) {
                if (!$(this.html.element).hasClass("finished")) {
                    $(this.html.element).addClass("finished");
                    this.toggleCollapse();
                }
            }
        }
    }
    this.initSummary = function() {
        this.html.summary.addEventListener("click", function() {
            this.toggleCollapse();
        }.bind(this));

        for (var i = 0; i < this.html.fragments.length; i++) {
            var fragment = this.html.fragments[i];
            var widget = this.widgets[fragment.getAttribute("data-index")];
            widget.summaryFragment = fragment;
            widget.html.element.addEventListener("input", function() {
                var widget = this.component;
                widget.summaryFragment.textContent = widget.value();
            });
        }
    }
    this.toggleCollapse = function() {
        var details = this.html.details;
        var firstCollapse = !details.style.height;
        var h = 0;
        $(this.html.element).find(".fieldset.answered").each(function() {
            h += $(this).height();
        });
        details.style.height = h + "px";
        $(this.html.element).toggleClass("collapsed");
        this.section.setBackgroundHeight(!firstCollapse);
    }
}
