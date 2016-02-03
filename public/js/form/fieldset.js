Fieldset.prototype = new FormComponent;
Fieldset.prototype.constructor = Fieldset;
Fieldset.selector = ".fieldset";
function Fieldset() {
    this.lowerRank = Field;
    this.init = function(element) {
        Fieldset.prototype.init.call(this, element);
        this.html.label = $(element).find(".fieldset-label")[0];
        return this;
    }
    this.updateLabel = function() {
        this.html.label.style.opacity = "0";
        var labelHtml = this.html.label.innerHTML;
        this.section.updateFieldsetLabel(labelHtml);
    }
    this.afterScroll = function() {
        if (this.hidden || this.disabled) {
            return;
        }

        if (!this.focused() && this.offscreen() && this.finished()) {
            $(this.section.html.element).addClass("answered");
            $(this.subsection.html.element).addClass("answered");
            $(this.html.element).addClass("answered");
        }
    }
}

