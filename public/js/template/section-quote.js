Template.Section.Quote = function() {
    Template.Quote.call(this);

    this.tempField = new Template.Field();
    this.tempField.label = "Temp";
    this.tempField.input = new Template.TextInput();
    this.tempField.input.name = "temp";
    this.tempField.input.placeholder = "Temp";
}

