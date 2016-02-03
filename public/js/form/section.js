Section.prototype = new FormComponent;
Section.prototype.constructor = Section;
Section.selector = ".section";
function Section() {
    this.lowerRank = Subsection;
    this.init = function(element) {
        Section.prototype.init.call(this, element);
        this.html.background = $(element).find(".section-background")[0];
        this.html.callout = $(element).find(".section-callout")[0];
        this.html.subsectionLabel = $(element).find(".callout-subsection-label")[0];
        this.html.fieldsetLabel = $(element).find(".callout-fieldset-label")[0];

        this.subsections[0].updateLabel();
        return this;
    }
    this.enable = function() {
        Section.prototype.enable.call(this);

        if (this.fields && this.fields[1]) {
            this.fields[1].reveal();
        }
    }
    this.updateDenominator = function(value) {
        if (value && value < 10) value = "0" + value;
        var denominators = $(this.html.element).find(".label-denominator").get();
        for (var i = 0; i < denominators.length; i++) {
            denominators[i].innerHTML = value;
        }
    }
    this.updateSubsectionLabel = function(html) {
        if (!this.html.subsectionLabel.children.length) {
            this.html.subsectionLabel.innerHTML = html;
            return;
        }

        var oldLabel = $(this.html.subsectionLabel);
        var oldName = oldLabel.find(".label-name");
        var oldNumerator = oldLabel.find(".label-numerator");
        var newLabel = $("<div>" + html + "</div>");
        var newName = newLabel.find(".label-name");
        var newNumerator = newLabel.find(".label-numerator");

        oldName.html(newName.html());
        if (newNumerator.html()) {
            if (newNumerator.html().trim()) {
                oldNumerator.html(newNumerator.html());
                oldLabel.addClass("show-numerator");
            }
        } else {
            oldLabel.removeClass("show-numerator");
            this.updateDenominator("");
        }
    }
    this.updateFieldsetLabel = function(html) {
        var oldLabel = this.html.fieldsetLabel;
        if (!oldLabel.innerHTML) {
            oldLabel.innerHTML = html;
            return;
        }
        if (oldLabel.innerHTML == html) {
            return;
        }

        var newLabel = $(oldLabel.outerHTML)[0];
        $(newLabel).insertAfter(oldLabel).addClass("enter");
        newLabel.innerHTML = html;
        newLabel.offsetHeight;
        $(oldLabel).addClass("leave");
        $(newLabel).removeClass("enter");
        this.html.fieldsetLabel = newLabel;
        setTimeout(function() {
            $(oldLabel).remove();
        }, 500);
    }
    this.height = function() {
        return this.html.element.offsetHeight;
    }
    this.extraHeight = function() {
        return (window.innerHeight - 132 - 275);
    }
    this.answeredHeight = function() {
        //var h = 50;
        var h = 0;
        for (var i = 0; i < this.subsections.length; i++) {
            var subsection = this.subsections[i];
            if ($(subsection.html.element).hasClass("answered")) {
                h += subsection.html.summary.offsetHeight;
            }
            if (!$(subsection.html.element).hasClass("collapsed")) {
                for (var j = 0; j < subsection.fieldsets.length; j++) {
                    var fieldset = subsection.fieldsets[j];
                    if ($(fieldset.html.element).hasClass("answered")) {
                        h += fieldset.html.element.offsetHeight;
                    }
                }
            }
        }
        return h;
    }
    this.scrollToWidget = function(widget) {

        var callout = this.html.callout;
        var offset = parseInt(getComputedStyle(callout).marginTop);
        // Scroll to widget? (or section??)
        var y = $(widget.field.html.element).offset().top - 132 - offset - 25;
        if (widget == this.widgets[0]) {

            // Scroll to section instead of widget
            y = $(this.html.element).offset().top - 132;

            // Fix for first section
            if (!widget.prev()) {
                y = 0;
            }

            // Callout stuff
            $(".section-callout").css("display", "");
            callout.style.display = "block";
            if (this.prev()) {
                var foo = document.body.scrollTop - this.html.element.offsetTop - this.html.background.offsetHeight + 50;
                foo = Math.min(foo, window.innerHeight * 0.5);
                this.html.callout.style.marginTop = foo + "px";
            }
            // Animate callout into place
            $(callout).animate({marginTop: "50px"}, 1000, "easeOutExpo", function() {
                $(this).css({marginTop: ""});
            });
        }
        var dy = window.innerHeight - (document.body.scrollHeight - y);
        if (dy > 0) {
            // Scroll less far
            y -= dy;
        }
        // Scroll into position
        if (y > document.body.scrollTop) {
            $("body").stop().animate({scrollTop: y}, 750, "easeOutExpo");
        }
    }
    this.setBackgroundHeight = function(animated) {
        var bg = this.html.background;
        if (!animated) {
            bg.style.WebkitTransition = "none";
            bg.offsetWidth;
        }
        bg.style.height = this.answeredHeight() + "px";
        if (!animated) {
            bg.offsetWidth;
            bg.style.WebkitTransition = "";
        }
    }
    this.onScroll = function() {
        // Only callout-related things should happen onScroll.
        // Most other things should wait until afterScroll

        if (this.hidden || this.disabled) {
            // Hidden sections do nothing
            return;
        }

        var scrollTop = document.body.scrollTop;
        var sectionTop = this.html.element.offsetTop;
        var sectionHeight = this.html.element.offsetHeight;
        var backgroundHeight = this.html.background.offsetHeight;

        if (scrollTop >= sectionTop + backgroundHeight) {
            $(this.html.callout).addClass("fixed");
        } else {
            $(this.html.callout).removeClass("fixed");
        }

        this.form.setMainHeight();
        this.afterScroll();
    }
    this.afterScroll = function() {
        var scrollTop = document.body.scrollTop;
        var oldHeight = this.html.element.offsetHeight;

        // Do things?
        for (var i = 0; i < this.subsections.length; i++) {
            this.subsections[i].afterScroll();
        }
        var newHeight = this.html.element.offsetHeight;

        if (newHeight != oldHeight) {
            this.setBackgroundHeight();
            document.body.scrollTop = scrollTop + (newHeight - oldHeight);
        }
    }
    this.afterScroll = debounce(this.afterScroll, 250);
}

Quote.prototype = new FormComponent;
Quote.prototype.constructor = Quote;
Quote.selector = ".quote-section";
function Quote() {
    this.init = function(element) {
        Quote.prototype.init.call(this, element);
        this.html.buyButtons = $(element).find(".action-button.primary").get();
        this.addHandlers();
        return this;
    }
    this.addHandlers = function() {
        for (var i = 0; i < this.html.buyButtons.length; i++) {
            var button = this.html.buyButtons[i];
            button.addEventListener("click", this.onClick);
        }
    }
    this.onClick = function(e) {
        e.preventDefault();

        var nextSection = this.form.sections[3];
        nextSection.reveal();
        nextSection.enable();
        setTimeout(function() {
            nextSection.widgets[0].inputs[0].focus();
        }.bind(this), 300);

        this.done = true;
        this.form.progress = {
            section: 2,
            percent: 100
        }
        this.form.site.updateProgress();

        var y = nextSection.html.element.offsetTop;
        $("body").stop().animate({scrollTop: y}, 750, "easeOutExpo");
    }
    this.reveal = function() {
        // Don't reveal until enabled
        return;
    }
    this.enable = function() {
        // Fake a request
        this.form.site.showLoader();
        setTimeout(this.onLoad, 5000);
    }
    this.height = function() {
        return this.html.element.offsetHeight;
    }
    this.extraHeight = function() {
        return 0;
    }
    this.onLoad = function() {
        document.activeElement.blur();
        $(".section-callout").css("display", "none");

        this.form.site.hideLoader();
        Quote.prototype.enable.call(this);
        Quote.prototype.reveal.call(this);

        this.form.progress.section = 2;
        this.form.progress.percent = 0;
        this.form.site.updateProgress();

        var y = $(this.html.element).offset().top - 132 - 50;
        $("body").stop().animate({scrollTop: y}, 750, "easeOutExpo");
    }
    this.onScroll = function() {
        if (this.hidden) return;
        if (this.done) return;

        var scrollTop = document.body.scrollTop;
        var sectionTop = this.html.element.offsetTop;
        var sectionHeight = this.html.element.offsetHeight;
        var sectionMax = sectionTop + sectionHeight - window.innerHeight;

        var progress = ((scrollTop - sectionTop) / (sectionMax - sectionTop));
        var percent = progress * 75;
        this.form.progress.section = 2;
        this.form.progress.percent = Math.max(this.form.progress.percent, percent);
        this.form.site.updateProgress();
    }
    this.onLoad = this.onLoad.bind(this);
    this.onClick = this.onClick.bind(this);
}

/* TheEnd */
TheEnd.prototype = new FormComponent;
TheEnd.prototype.constructor = TheEnd;
TheEnd.selector = ".theend-section";
function TheEnd() {
    this.init = function(element) {
        TheEnd.prototype.init.call(this, element);
        return this;
    }
    this.reveal = function() {
        // Don't reveal until enabled
        return;
    }
    this.enable = function() {
        // Fake a request
        this.form.site.showLoader();
        setTimeout(this.onLoad, 5000);
    }
    this.height = function() {
        return this.html.element.offsetHeight;
    }
    this.extraHeight = function() {
        return 0;
    }
    this.onLoad = function() {
        document.activeElement.blur();
        $(".section-callout").css("display", "none");

        this.form.site.hideLoader();
        TheEnd.prototype.enable.call(this);
        TheEnd.prototype.reveal.call(this);

        var y = $(this.html.element).offset().top - 132 - 50;
        $("body").stop().animate({scrollTop: y}, 750, "easeOutExpo");
    }
    this.onScroll = function() {
        if (this.hidden) return;
        if (this.done) return;
    }
    this.onLoad = this.onLoad.bind(this);
}
