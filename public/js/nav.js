function Nav() {
    this.init = function(site) {
        this.site = site;
        this.html = {};
        this.html.element = $("#nav")[0];
        this.html.bar = $("#nav-progress-bar")[0];
        this.html.links = $("#nav-progress-links a").get();
        return this;
    }

    // Section is an index. Percent is per that section.
    this.updateProgress = function(section, percent) {
        var links = this.html.links;
        var bar = this.html.bar;
        var progress = percent / 100;
        // Normalize
        if (progress == 1) {
            section += 1;
            progress = 0;
        }
        // Update bar
        bar.style.display = "block";
        if (section == links.length) {
            bar.style.width = bar.parentNode.offsetWidth + "px";
        }
        else {
            var sectionLink = links[section];
            var nextLink = links[section + 1];
            var width = sectionLink.offsetLeft;
            if (nextLink) {
                width += progress * (nextLink.offsetLeft - sectionLink.offsetLeft);
            }
            else {
                width += progress * (bar.parentNode.offsetWidth - sectionLink.offsetLeft);
            }
            bar.style.width = width + "px";
        }
        // Update links
        for (var i = 0; i < links.length; i++) {
            if (i < section) {
                links[i].className = "section-done";
            } else if (i == section) {
                links[i].className = "section-current";
            } else {
                links[i].className = "";
            }
        }
    }
}

