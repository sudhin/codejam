function Site() {
    this.init = function() {
        this.nav = new Nav().init(this);
        this.form = new Form().init(this);
        this.html = {};
        this.html.main = $("#main")[0];
        this.html.loader = $("#loaderbackground")[0];
        this.addHandlers();
        this.form.start();
        this.foo();
        return this;
    }
    this.updateProgress = function() {
        var section = this.form.progress.section;
        var percent = this.form.progress.percent;
        this.nav.updateProgress(section, percent);
    }
    this.setMainHeight = function(height) {
        this.html.main.style.height = height + "px";
    }
    this.showLoader = function() {
        this.html.loader.style.display = "block";
        this.html.loader.className = "loading";
        $('body').css('overflow', 'hidden');
    }
    this.hideLoader = function() {
        this.html.loader.className = "";
        $('body').css('overflow', '');
    }
    this.addHandlers = function() {
        window.addEventListener("mousewheel", this.form.onMouseWheel);
        window.addEventListener("scroll", this.form.onScroll);
        window.addEventListener("resize", this.form.onResize);
    }
    this.foo = function() {
        var numCarsInput = $("#id-numcars")[0];
        if (numCarsInput) {
            var numCarsWidget = $(numCarsInput).closest(".widget")[0].component;
            numCarsWidget.addListener("input", function() {
                numCarsWidget.section.updateDenominator(numCarsWidget.value());
                numCarsWidget.subsection.updateLabel();
            });
        }

        var nameInput = $("#id-firstname2")[0];
        if (nameInput) {
            var nameWidget = $(nameInput).closest(".widget")[0].component;
            nameWidget.addListener("focus", function() {
                nameWidget.section.updateDenominator(2);
            });
        }
    }
}
