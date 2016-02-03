function FormComponent() {

    this.init = function(element) {
        this.html = {};
        this.name = this.constructor.name.toLowerCase();
        if (element instanceof HTMLElement) {
            this.html.element = element;
            this.html.element.component = this;
        }
        this.hierarchize();
        return this;
    }

    // Hierarchy creation

    this.hierarchize = function() {
        this.subcomponents = [];
        if (!this.lowerRank) return;

        // Find subcomponents
        var root = this.html.element || document.body;
        var subselector = this.lowerRank.selector;

        var subelements = $(root).find(subselector).get();
        for (var i = 0; i < subelements.length; i++) {
            var subcomponent = (new this.lowerRank).init(subelements[i]);
            // Generic relationships
            subcomponent.supercomponent = this;
            this.subcomponents.push(subcomponent);
        }
        // Specific relationships
        var descendants = this.descendants();
        for (var i = 0; i < descendants.length; i++) {
            var descendant = descendants[i];
            // Specific ancestor
            descendant[this.name] = this;
            // Specific descendants
            var rel = descendant.name + "s";
            if (descendant instanceof this.lowerRank) {
                this[rel] = this[rel] || this.subcomponents;
            } else {
                this[rel] = this[rel] || [];
                this[rel].push(descendant);
            }
        }
    }

    // Hierarchy traversal

    this.ancestors = function() {
        if (!this.supercomponent) return [];
        return [this.supercomponent].concat(this.supercomponent.ancestors());
    }

    this.descendants = function() {
        if (!this.subcomponents.length) return [];
        var all = this.subcomponents.slice();
        for (var i = 0; i < this.subcomponents.length; i++) {
            all.push.apply(all, this.subcomponents[i].descendants());
        }
        return all;
    }

    this.next = function(rel) {
        rel = rel || this.form;
        var all = this[rel.name][this.name + "s"];
        var i = all.indexOf(this);
        return all[i+1];
    }

    this.prev = function(rel) {
        rel = rel || this.form;
        var all = this[rel.name][this.name + "s"];
        var i = all.indexOf(this);
        return all[i-1];
    }

    // State management

    this.hide = function() {
        // Hide all subcomponents
        for (var i = 0; i < this.subcomponents.length; i++) {
            this.subcomponents[i].hide();
        }
        // Hide self
        this.hidden = true;
        $(this.html.element).addClass("hidden");
    }

    this.reveal = function() {
        // Start from deepest hidden descendant
        if (this.subcomponents.length && this.subcomponents[0].hidden) {
            return this.subcomponents[0].reveal();
        }
        // Reveal ancestors
        var components = this.ancestors().reverse().concat(this);
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            if (!component.html.element || !component.hidden) continue;

            var events = "transitionend webkitTransitionEnd";
            var onReveal = function(e) {
                var oe = e.originalEvent;
                var srcElement = oe.srcElement || oe.originalTarget;
                if (srcElement != this) return;
                if (!/transform/i.test(oe.propertyName)) return;
                $(this).off(events, onReveal).removeClass("revealed");
            };
            var element = $(component.html.element);
            element.on(events, onReveal);
            element.addClass("revealed");
            element[0].offsetWidth;
            component.hidden = false;
            element.removeClass("hidden");
        }
        this.form.setMainHeight();
    }

    this.disable = function() {
        // Disable all subcomponents
        for (var i = 0; i < this.subcomponents.length; i++) {
            this.subcomponents[i].disable();
        }
        // Disable self
        this.disabled = true;
        $(this.html.element).addClass("disabled");
    }

    this.enable = function() {
        // Start from deepest disabled descendant
        if (this.subcomponents.length && this.subcomponents[0].disabled) {
            return this.subcomponents[0].enable();
        }
        // Enable ancestors
        var components = this.ancestors().reverse().concat(this);
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            component.disabled = false;
            $(component.html.element).removeClass("disabled");
        }
        this.form.setMainHeight();
    }

    this.answered = function() {
        for (var i = 0; i < this.subcomponents.length; i++) {
            if (this.subcomponents[i].answered()) {
                return true;
            }
        }
        return false;
    }

    this.finished = function() {
        if (this._finished) return true;
        for (var i = 0; i < this.subcomponents.length; i++) {
            if (!this.subcomponents[i].finished()) {
                return false;
            }
        }
        this._finished = true;
        return true;
    }

    this.offscreen = function() {
        var element = this.html.element;
        var y = element.offsetHeight;
        while (element.offsetParent != document.body) {
            y += element.offsetTop;
            element = element.offsetParent;
        }
        return (document.body.scrollTop >= y);
    }

    this.focused = function() {
        return ($(this.html.element).find(":focus").length > 0);
    }
}
