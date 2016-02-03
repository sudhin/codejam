Template.Section.Confirm = function() {
    Template.Section.call(this);
    this.id = "section-vehicles";
    this.label = "Great!<br>Let’s make it official.";

    // Intro
    var subsection = new Template.Subsection();
    subsection.label = "Confirm &amp Pay";
    subsection.summary = "Policy and payment terms";
    subsection.fragments = { };

    var fieldset1 = new Template.Fieldset();
    fieldset1.label = "Please Read Carefully";
    fieldset1.fields = (function() {
        /*Field 1*/
        var accurateField1 = new Template.Field();
        accurateField1.label = "Accurate &amp; Complete Information is Important";
        accurateField1.extra = (function(){
            var legalese = new Template.Legalese();
            return [legalese];
        })();
        accurateField1.input = new Template.YesNoSelect();
        accurateField1.input.choices = ["Make Payment"];
        accurateField1.name  = "makepayment";

        return [accurateField1];
    })();

    var fieldset2 = new Template.Fieldset();
    fieldset2.label = "Payment Summary"
    fieldset2.fields = (function(){
        var summaryField = new Template.Field();
        summaryField.label = "Payment Terms";
        // summaryField.extra = (function(){
        //
        //     var radioSelect = new Template.RadioSelect();
        //     radioSelect.name = "howToPay";
        //     radioSelect.placeholder = "";
        //     radioSelect.choices = ["Pay in Full", "Pay in Monthly Installments"];
        //
        //     var paymentSummary = new Template.PaymentSummary();
        //     return [radioSelect, paymentSummary];
        // })();
        summaryField.input = (function(){

            var radioSelect = new Template.RadioSelect();
            radioSelect.name = "howToPay";
            radioSelect.placeholder = "";
            radioSelect.choices = ["Pay in Full", "Pay in Monthly Installments"];
            radioSelect.stacked = true;

            var paymentSummary = new Template.PaymentSummary();
            paymentSummary.name = "paymentsummary";
            paymentSummary.choices = ["Finish and Pay"];
            paymentSummary.placeholder = "Finish and Pay";
            paymentSummary.width = "onehalf";
            paymentSummary.style = "special";

            return [radioSelect, paymentSummary];
        })();

        return [summaryField];
    })();

    var fieldset3 = new Template.Fieldset();
    fieldset3.label = "Credit Card Details"
    fieldset3.fields = (function(){
        var willwork = new Template.Field();
        willwork.label = "";
        willwork.input = (function(){
            var creditcard = new Template.CreditCard();
            creditcard.name = "thingsarentworking";
            creditcard.placeholder = "Details";

            var checkboxThing = new Template.Checkbox();
            checkboxThing.label = "I acknowledge these statements above to be true.";
            checkboxThing.name = "acknowledgetruth";

            var buynow = new Template.YesNoSelect();
            buynow.name = "completepurchase";
            buynow.choices = ["Complete Purchase"];
            buynow.placeholder = "Complete Purchase";
            buynow.width = "onehalf";
            buynow.style = "special";

            return [creditcard, checkboxThing, buynow];
        })();

      return [willwork];
    })();

    subsection.fieldsets.push(fieldset1);
    subsection.fieldsets.push(fieldset2);
    subsection.fieldsets.push(fieldset3);
    this.subsections.push(subsection);
}

//
// var garageField = new Template.Field();
// garageField.label = "Where are your vehicles kept overnight?";
// garageField.input = (function() {
//     var postcodeInput = new Template.TextInput();
//     postcodeInput.name = "garagepostcode";
//     postcodeInput.placeholder = "Postcode";
//     postcodeInput.width = "onethird";
//
//     var stateSelect = new Template.Select();
//     stateSelect.name = "garagestate";
//     stateSelect.choices = ["New South Wales", "Victoria", "Queensland"];
//     stateSelect.placeholder = "State/Territory";
//     stateSelect.width = "twothirds";
//
//     var suburbSelect = new Template.Select();
//     suburbSelect.name = "garagesuburb";
//     suburbSelect.choices = ["Brisbane", "Petrie Terrace", "Spring Hill"];
//     suburbSelect.placeholder = "Suburb";
//
//     return [postcodeInput, stateSelect, suburbSelect];
// })();
