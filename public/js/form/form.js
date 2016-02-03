Form.prototype = new FormComponent;
Form.prototype.constructor = Form;
function Form() {
    this.lowerRank = Section;
    this.init = function(site) {
        Form.prototype.init.call(this);
        this.site = site;
        // Get quote section
        var quote = new Quote().init($(Quote.selector)[0]);
        quote.form = quote.supercomponent = this;
        this.sections.splice(2, 0, quote);

        // includes a new one.
        var theEnd = new TheEnd().init($(TheEnd.selector)[0]);
        theEnd.form = theEnd.supercomponent = this;
        this.sections.push(theEnd);

        return this;
    }
    this.start = function() {
        document.body.scrollTop = 0;
        this.disable();
        this.hide();
        this.fieldsets[0].enable();
        this.fieldsets[0].reveal();
        this.fieldsets[0].updateLabel();
        this.sections[0].scrollToWidget(this.widgets[0]);
        //this.fields[0].enable();
        //this.fields[0].reveal();
        setTimeout(function() {
            this.fields[1].reveal();
        }.bind(this), 250);
    }
    this.setMainHeight = function() {
        // Make sure there's enough space to scroll
        // where we want, and no more.
        var h = 0;
        for (var i = 0; i < this.sections.length; i++) {
            if (this.sections[i].disabled) break;
            var section = this.sections[i];
            h += section.height();
        }
        if (section) {
            h += section.extraHeight();
        }
        this.site.setMainHeight(h);
    }
    this.onMouseWheel = function() {
        $("body").stop();
    }
    this.onScroll = function() {
        for (var i = 0; i < this.sections.length; i++) {
            this.sections[i].onScroll();
        }
        var focusedWidget = $(document.activeElement).closest(".widget")[0];
        if (focusedWidget) {
            var widgetTop = $(focusedWidget).offset().top - 132;
            var almostOffscreen = document.body.scrollTop > widgetTop;
            var w = focusedWidget.component;
            var n = w.next();
            if (almostOffscreen && w.answered() && n && !n.answered()) {
                if (n.section == w.section || n.section == w.section.next()) {
                    n.inputs[0].focus();
                }
            }
        }
    }
    this.onResize = function() {
        this.setMainHeight();
    }

    this.onMouseWheel = this.onMouseWheel.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onResize = debounce(this.onResize, 250);
}
