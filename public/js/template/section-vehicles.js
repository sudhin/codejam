Template.Section.Vehicles = function() {
    Template.Section.call(this);
    this.id = "section-vehicles";
    this.label = "Let’s get your<br>cars insured.";

    // Intro
    var subsection = new Template.Subsection();
    subsection.label = "Vehicles";
    subsection.labelNumber = " ";
    subsection.summary = "(2) cars in (Adelaide), (South Australia)";
    subsection.fragments = {
        "(2)": 0,
        "(Adelaide)": 3,
        "(South Australia)": 2
    };

    var fieldset = new Template.Fieldset();
    fieldset.label = "Location";
    fieldset.fields = (function() {
        var numCarsField = new Template.Field();
        numCarsField.label = "How many cars would you like to insure?";
        numCarsField.input = new Template.NumberInput();
        numCarsField.input.name = "numcars";
        numCarsField.input.placeholder = "0 Vehicles";
        numCarsField.input.width = "twothirds";
        numCarsField.input.attrs.readonly = "readonly";

        var garageField = new Template.Field();
        garageField.label = "Where are your vehicles kept overnight?";
        garageField.input = (function() {
            var postcodeInput = new Template.TextInput();
            postcodeInput.name = "garagepostcode";
            postcodeInput.placeholder = "Postcode";
            postcodeInput.width = "onethird";

            var stateSelect = new Template.Select();
            stateSelect.name = "garagestate";
            stateSelect.choices = ["New South Wales", "Victoria", "Queensland"];
            stateSelect.placeholder = "State/Territory";
            stateSelect.width = "twothirds";

            var suburbSelect = new Template.Select();
            suburbSelect.name = "garagesuburb";
            suburbSelect.choices = ["Brisbane", "Petrie Terrace", "Spring Hill"];
            suburbSelect.placeholder = "Suburb";

            return [postcodeInput, stateSelect, suburbSelect];
        })();

        return [numCarsField, garageField];
    })();
    subsection.fieldsets.push(fieldset);

    this.subsections.push(subsection);

    // Vehicles
    for (var i = 1; i <= 2; i++) {
        var subsection = new Template.Subsection();
        subsection.label = "Vehicle";
        subsection.labelNumber = "0" + i;
        subsection.summary = "(2015) (Holden) (Commodore)";
        subsection.fragments = {
            "(2015)": 0,
            "(Holden)": 1,
            "(Commodore)": 2
        };

        // Car Type
        fieldset = new Template.Fieldset();
        fieldset.label = "Car Type";
        fieldset.fields = (function() {
            var carTypeField = new Template.Field();
            carTypeField.label = "What kind of car is it?";
            carTypeField.input = (function() {
                var yearSelect = new Template.Select();
                yearSelect.name = "caryear" + i;
                yearSelect.choices = ["2015", "2014", "2013"];
                yearSelect.placeholder = "Year";
                yearSelect.width = "onethird";

                var makeSelect = new Template.Select();
                makeSelect.name = "carmake" + i;
                makeSelect.choices = ["Holden", "Toyota"];
                makeSelect.placeholder = "Make";
                makeSelect.width = "twothirds";

                var modelSelect = new Template.Select();
                modelSelect.name = "carmodel" + i;
                modelSelect.choices = ["Commodore"];
                modelSelect.placeholder = "Model";

                var descSelect = new Template.Select();
                descSelect.name = "cardesc" + i;
                descSelect.choices = ["Car description"];
                descSelect.placeholder = "Description";

                return [yearSelect, makeSelect, modelSelect, descSelect];
            })();
            return [carTypeField];
        })();
        subsection.fieldsets.push(fieldset);

        // Cover
        fieldset = new Template.Fieldset();
        fieldset.label = "Cover";
        fieldset.fields = (function() {
            var coverField = new Template.Field();
            coverField.label = "What level of cover do you want for this car?";
            coverField.input = new Template.RadioSelect();
            coverField.input.name = "cover" + i;
            coverField.input.choices = ["Comprehensive", "Third Party Property Damage", "Third Party Fire &amp; Theft"];
            coverField.input.captions = ["The most complete cover we offer.", "The narrowest cover we offer.", "Third Party Fire &amp; Theft"];
            coverField.input.stacked = true;

            var agreedValueField = new Template.Field();
            agreedValueField.label = "Enter an agreed value for this car";
            agreedValueField.input = new Template.TextInput();
            agreedValueField.input.name = "agreed" + i;
            agreedValueField.input.placeholder = "Enter Agreed Value";

            return [coverField, agreedValueField];
        })();
        subsection.fieldsets.push(fieldset);

        // Additional Details
        fieldset = new Template.Fieldset();
        fieldset.label = "Additional Details";
        fieldset.fields = (function() {
            var yearAcquiredField = new Template.Field();
            yearAcquiredField.label = "What year did you get it?";
            yearAcquiredField.input = new Template.TextInput();
            yearAcquiredField.input.name = "yeargot" + i;
            yearAcquiredField.input.placeholder = "Enter Year";

            var financeField = new Template.Field();
            financeField.label = "How is/was the car financed?";
            financeField.input = new Template.Select();
            financeField.input.name = "financed" + i;
            financeField.input.choices = [
                "Cash/No Finance",
                "Loan",
                "Lease",
                "Novated Lease",
                "Line of Credit/Home Equity",
                "Other"
            ];
            financeField.input.placeholder = "Select Finance Type";

            var primaryUseField = new Template.Field();
            primaryUseField.label = "How is the car used?";
            primaryUseField.input = new Template.RadioSelect();
            primaryUseField.input.name = "primaryuse" + i;
            primaryUseField.input.choices = [
                "Personal – Not driving to/from work or school",
                "Personal – Driving to/from work or school",
                "Business – For some work duties"
            ];
            primaryUseField.input.stacked = true;

            var businessTypeField = new Template.Field();
            businessTypeField.label = "Please select type of work";
            businessTypeField.input = new Template.Select();
            businessTypeField.input.name = "businesstype" + i;
            businessTypeField.input.choices = [
                "Courier",
                "Courtesy or Demonstration car",
                "Racing",
                "Paid Driving Instruction",
                "Carrying persons or property for; compensation or a fee; hire car; limousine; taxi",
                "Delivery of food; magazines; newspapers; any other products",
                "Emergency Services",
                "Transportation of dangerous goods",
                "None of the above"
            ];
            businessTypeField.input.placeholder = "Select Type of Work";

            var registeredField = new Template.Field();
            registeredField.label = "Is the vehicle registered, roadworthy and in safe driving condition?";
            registeredField.input = new Template.YesNoSelect();
            registeredField.input.name = "registered" + i;

            var damageField = new Template.Field();
            damageField.label = "Does this vehicle have any unrepaired body or windscreen damage due to rust, hail, accident, or vandalism?";
            damageField.input = new Template.YesNoSelect();
            damageField.input.name = "damaged" + i;

            return [yearAcquiredField, financeField, primaryUseField, businessTypeField, registeredField, damageField];
        })();
        subsection.fieldsets.push(fieldset);

        this.subsections.push(subsection);
    }
}
