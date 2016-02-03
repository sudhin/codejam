Template.Section.PolicyDetails = function() {
    Template.Section.call(this);
    this.id = "section-policydetails";
    this.label = "Just a few<br>more questions.";

    // Intro
    var subsection = new Template.Subsection();
    subsection.label = "Policy Details";
    subsection.summary = "Your contact info, online account, and more";
    subsection.fragments = {};

    // Policy questions
    var fieldset = new Template.Fieldset();
    fieldset.label = "Required Questions";
    fieldset.fields = (function() {
        var knockoutField1 = new Template.Field();
        knockoutField1.label = "In the last 10 years, have you or any "
            + "covered driver been charged with, or convicted of fraud, "
            + "theft or arson?";
        knockoutField1.input = new Template.YesNoSelect();
        knockoutField1.name = "theftarson";

        var knockoutField2 = new Template.Field();
        knockoutField2.label = "In the last 10 years, have you or any "
            + "covered driver been refused a renewal of insurance or "
            + "had an insurance policy cancelled due to fraud?";
        knockoutField2.input = new Template.YesNoSelect();
        knockoutField2.name = "insurancefraud";

        var knockoutField3 = new Template.Field();
        knockoutField3.label = "In the last 5 years, have you or any "
            + "covered driver had any license suspensions, "
            + "cancellations or disqualifications?";
        knockoutField3.input = new Template.YesNoSelect();
        knockoutField3.name = "licensesuspensions";

        var knockoutField4 = new Template.Field();
        knockoutField4.label = "In the last 5 years, have you or any "
            + "covered driver declared bankruptcy or defaulted on a "
            + "loan or credit card?";
        knockoutField4.input = new Template.YesNoSelect();
        knockoutField4.name = "bankruptcy";

        return [knockoutField1, knockoutField2, knockoutField3, knockoutField4];
    })();
    subsection.fieldsets.push(fieldset);

    //this.subsections.push(subsection);

    // Policy Holder Contact Info
    fieldset = new Template.Fieldset();
    fieldset.label = "Contact Information";
    fieldset.fields = (function() {
        var residenceField = new Template.Field();
        residenceField.label = "Residence Address";
        residenceField.input = new Template.RadioSelect();
        residenceField.input.name = "residence";
        residenceField.input.choices = ["Street Address", "Other"];
        residenceField.input.stacked = true;

        var contactField = new Template.Field();
        contactField.label = "Where are your vehicles kept overnight?";
        contactField.input = (function() {
            var postcodeInput = new Template.TextInput();
            postcodeInput.name = "contactpostcode";
            postcodeInput.placeholder = "Postcode";
            postcodeInput.width = "onethird";

            var stateSelect = new Template.Select();
            stateSelect.name = "contactstate";
            stateSelect.choices = ["New South Wales", "Victoria", "Queensland"];
            stateSelect.placeholder = "State/Territory";
            stateSelect.width = "twothirds";

            var suburbSelect = new Template.Select();
            suburbSelect.name = "contactsuburb";
            suburbSelect.choices = ["Brisbane", "Petrie Terrace", "Spring Hill"];
            suburbSelect.placeholder = "Suburb";

            var addressInput = new Template.TextInput();
            addressInput.name = "address";
            addressInput.placeholder = "Street Address";

            var unitInput = new Template.TextInput();
            unitInput.name = "contactunit";
            unitInput.placeholder = "Unit No. (if applicable)";
            unitInput.width = "onehalf";

            var levelInput = new Template.TextInput();
            levelInput.name = "contactlevel";
            levelInput.placeholder = "Level (if applicable)";
            levelInput.width = "onehalf";

            return [postcodeInput, stateSelect, suburbSelect, addressInput, unitInput, levelInput];
        })();

        var mailingField = new Template.Field();
        mailingField.label = "Is this also your mailing address?";
        mailingField.input = new Template.YesNoSelect();
        mailingField.name = "mailingconfirm";

        var phoneField = new Template.Field();
        phoneField.label = "Mobile Phone Number";
        phoneField.input = new Template.TextInput();
        phoneField.input.name = "mobilephone";
        phoneField.input.placeholder = "Enter Phone #";

        return [residenceField, contactField, mailingField, phoneField];
    })();
    subsection.fieldsets.push(fieldset);

    // Setup Online Account
    fieldset = new Template.Fieldset();
    fieldset.label = "Your Online Account";
    fieldset.fields = (function() {
        var emailField = new Template.Field();
        emailField.label = "Email Address";
        emailField.input = new Template.TextInput();
        emailField.input.name = "emailaddress";
        emailField.input.placeholder = "Enter Your Email Address";

        var emailConfirmField = new Template.Field();
        emailConfirmField.label = "Confirm Email Address";
        emailConfirmField.input = new Template.TextInput();
        emailConfirmField.input.name = "emailconfirmaddress";
        emailConfirmField.input.placeholder = "Re-enter Your Email Address";

        var passwordField = new Template.Field();
        passwordField.label = "Passwords must contain a minimum of 8 characters "
            + "and at least 1 number.";
        passwordField.input = new Template.TextInput();
        passwordField.input.name = "password";
        passwordField.input.placeholder = "Enter Password";

        var passwordConfirmField = new Template.Field();
        passwordConfirmField.label = "Confirm Password";
        passwordConfirmField.input = new Template.TextInput();
        passwordConfirmField.input.name = "passwordconfirm";
        passwordConfirmField.input.placeholder = "Re-enter Password";

        var promoField = new Template.Field();
        promoField.label = "Would you like to receive occasional "
           + "email updates about our products and services?";
        promoField.input = new Template.YesNoSelect();
        promoField.input.name = "promo";

        return [emailField, emailConfirmField, passwordField, passwordConfirmField, promoField];
    })();
    subsection.fieldsets.push(fieldset);

    // Setup Online Account
    fieldset = new Template.Fieldset();
    fieldset.label = "Additional Details";
    fieldset.fields = (function() {
        var driverOneField = new Template.Field();
        driverOneField.label = "Simon Smith’s License Number and State/Territory";
        driverOneField.input = (function() {
            var licenseInput = new Template.TextInput();
            licenseInput.name = "driveronelicense";
            licenseInput.placeholder = "License #";
            licenseInput.width = "onehalf";

            var stateSelect = new Template.Select();
            stateSelect.name = "driveronestate";
            stateSelect.placeholder = "State";
            stateSelect.choices = ["New South Wales", "Victoria", "Queensland"];
            stateSelect.width = "onehalf";

            return [licenseInput, stateSelect];
        })();

        var driverTwoField = new Template.Field();
        driverTwoField.label = "Jane Smith’s License Number and State/Territory";
        driverTwoField.input = (function() {
            var licenseInput = new Template.TextInput();
            licenseInput.name = "drivertwolicense";
            licenseInput.placeholder = "License #";
            licenseInput.width = "onehalf";

            var stateSelect = new Template.Select();
            stateSelect.name = "drivertwostate";
            stateSelect.placeholder = "State";
            stateSelect.choices = ["New South Wales", "Victoria", "Queensland"];
            stateSelect.width = "onehalf";

            return [licenseInput, stateSelect];
        })();

        var carOneField = new Template.Field();
        carOneField.label = "2011 Toyota Corolla Registration Number and VIN";
        carOneField.input = (function() {
            var registrationInput = new Template.TextInput();
            registrationInput.name = "caroneregistration";
            registrationInput.placeholder = "Registration #";
            registrationInput.width = "onehalf";

            var vinInput = new Template.TextInput();
            vinInput.name = "caronevin";
            vinInput.placeholder = "VIN (Optional)";
            vinInput.width = "onehalf";

            return [registrationInput, vinInput];
        })();

        var carTwoField = new Template.Field();
        carTwoField.label = "2015 Holden Commodore Registration Number and VIN";
        carTwoField.input = (function() {
            var registrationInput = new Template.TextInput();
            registrationInput.name = "cartworegistration";
            registrationInput.placeholder = "Registration #";
            registrationInput.width = "onehalf";

            var vinInput = new Template.TextInput();
            vinInput.name = "cartwovin";
            vinInput.placeholder = "VIN (Optional)";
            vinInput.width = "onehalf";

            return [registrationInput, vinInput];
        })();

        return [driverOneField, driverTwoField, carOneField, carTwoField];
    })();
    subsection.fieldsets.push(fieldset);

    this.subsections.push(subsection);
}
