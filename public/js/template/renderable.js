var Template = Template || {};

/* Attributes */
Template.Attributes = function() {
    this.toString = function() {
        var str = "";
        for (var name in this) {
            if (name != "toString") {
                str += " " + name + '="' + this[name] + '"';
            }
        }
        return str;
    }
}

/* Pretty much everything */
Template.Renderable = function() {
    this.attrs = new Template.Attributes();
    this.render = function(context) {
        return tmpl("TMPL" + this.template, context || this);
    }
    this.toString = this.render;
}

Template.Test = function() {
    Template.Renderable.call(this);
    this.template = "Test";
}

/* Text inputs */
Template.Input = function() {
    Template.Renderable.call(this);
    this.template = "Input";
    this.attrs.type = "text";
    this.width = "";
}

Template.RawHTML = function(){
    Template.Renderable.call(this);
    this.template = "RawHTML";
    this.markup = "";
}

Template.UnorderedList = function(){
    Template.Renderable.call(this);
    this.template = "UnorderedList";
}

Template.Legalese = function(){
    Template.Renderable.call(this);
    this.template = "Legalese";
}

Template.PaymentSummary = function(){
    Template.Renderable.call(this);
    this.template = "PaymentSummary";
    this.choices = ["myButton"];
}

Template.CreditCard = function(){
    Template.Renderable.call(this);
    this.template = "CreditCard";
}

Template.TextInput = function() {
    Template.Input.call(this);
    this.attrs.onautocomplete = "off";
    this.attrs.autocomplete = "off";
    this.attrs.autocorrect = "off";
    this.attrs.autocapitalize = "off";
    this.attrs.spellcheck = "false";
}

Template.NumberInput = function() {
    Template.Renderable.call(this);
    this.template = "NumberInput";
}

Template.Checkbox = function() {
    Template.Renderable.call(this);
    this.template = "Checkbox";
    this.style = "normal";
}

Template.DateInput = function() {
    Template.TextInput.call(this);
}

/* Select */
Template.Select = function() {
    Template.Renderable.call(this);
    this.template = "Select";
    this.choices = [];
    this.width = "";
}

/* Radio select */
Template.RadioSelect = function() {
    Template.Select.call(this);
    this.template = "RadioSelect";
    this.stacked = false;
}

/* Yes/No select */
Template.YesNoSelect = function() {
    Template.RadioSelect.call(this);
    this.template = "YesNoSelect";
    this.choices = ["Yes", "No"];
    this.style = "normal";
}

/* Specific inputs *
Template.PostcodeInput = function() {
    Template.NumberInput.call(this);
}
*/

/* Field */
Template.Field = function() {
    Template.Renderable.call(this);
    this.template = "Field";
    this.label = "";
    this.input = null;
    this.extra = [];
}

Template.Fieldset = function() {
    Template.Renderable.call(this);
    this.template = "Fieldset";
    this.fields = [];
}

Template.Subsection = function() {
    Template.Renderable.call(this);
    this.template = "Subsection";
    this.fieldsets = [];
    this.label = "";
    this.labelNumber = "";
}

Template.Section = function() {
    Template.Renderable.call(this);
    this.template = "Section";
    this.subsections = [];
}

Template.Quote = function() {
    Template.Renderable.call(this);
    this.template = "Quote";
}

Template.TheEnd = function() {
    Template.Renderable.call(this);
    this.template = "TheEnd";
}

Template.Form = function() {
    Template.Renderable.call(this);
    this.template = "Form";
    this.sections = [];
}
