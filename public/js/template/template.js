var Template = Template || {};

Template.templates = [
    "Form",
    "Section",
    "Quote",
    "Subsection",
    "Fieldset",
    "Field",
    "Input",
    "NumberInput",
    "Select",
    "RadioSelect",
    "YesNoSelect",
    "RawHTML",
    "UnorderedList",
    "Legalese",
    "CreditCard",
    "Checkbox",
    "PaymentSummary",
    "TheEnd"
];

Template.load = function(callback) {
    Template.loaded = 0;

    for (var i = 0; i < Template.templates.length; i++) {
        (function(template) {
            var filename = "html/" + template + ".html";
            $.get(filename, function(html) {
                // Add template to document in script tag
                var script = $("<script>").appendTo("head");
                script.attr("type", "text/html");
                script.attr("id", "TMPL" + template);
                script.html(html);
                // Done?
                Template.loaded += 1;
                if (Template.loaded == Template.templates.length) {
                    Template.render(callback);
                }
            });
        })(Template.templates[i]);
    }
}

Template.render = function(callback) {
    var form = new Template.Form();
    form.sections.push(new Template.Section.Vehicles());
    form.sections.push(new Template.Section.Drivers());
    form.sections.push(new Template.Section.Quote());
    form.sections.push(new Template.Section.PolicyDetails());
    form.sections.push(new Template.Section.Confirm());
    form.sections.push(new Template.Section.TheEnd());

    document.getElementById("main").innerHTML = form;

    setTimeout(callback, 100);
}
