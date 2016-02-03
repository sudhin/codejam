Template.Section.Drivers = function() {
    Template.Section.call(this);
    this.id = "section-drivers";
    this.label = "Now let’s talk<br> about you.";

    // Policyholder
    var subsection = new Template.Subsection();
    subsection.label = "Policyholder";
    subsection.summary = "(Firstname) (Lastname)";
    subsection.fragments = {
        "(Firstname)": 0,
        "(Lastname)": 1
    };

    // About
    var fieldset = new Template.Fieldset();
    fieldset.label = "About You";
    fieldset.fields = (function() {
        var nameField = new Template.Field();
        nameField.label = "Name";
        nameField.input = (function() {
            var firstInput = new Template.TextInput();
            firstInput.name = "firstname";
            firstInput.placeholder = "First Name";
            firstInput.width = "onehalf";

            var lastInput = new Template.TextInput();
            lastInput.name = "lastname";
            lastInput.placeholder = "Last Name";
            lastInput.width = "onehalf";

            return [firstInput, lastInput];
        })();

        var dobField = new Template.Field();
        dobField.label = "Date of Birth";
        dobField.input = new Template.TextInput();
        dobField.input.name = "dob";
        dobField.input.placeholder = "DD/MM/YYYY";

        var genderField = new Template.Field();
        genderField.label = "Gender";
        genderField.input = new Template.RadioSelect();
        genderField.input.name = "gender";
        genderField.input.choices = ["Male", "Female"];

        var maritalField = new Template.Field();
        maritalField.label = "Marital Status";
        maritalField.input = new Template.RadioSelect();
        maritalField.input.name = "maritalstatus";
        maritalField.input.choices = ["Single", "Married", "Widowed", "Other"];

        var educationField = new Template.Field();
        educationField.label = "Highest Level of Education Completed";
        educationField.input = new Template.Select();
        educationField.input.name = "education";
        educationField.input.choices = [
            "Less than Year 10",
            "Year 10 or Year 11",
            "Year 12",
            "Certificate I/II",
            "Certificate III/IV",
            "Advanced Diploma/Diploma",
            "Some University",
            "Currently at University",
            "University Degree",
            "Post-Graduate or Honours Degree"
        ];
        educationField.input.placeholder = "Select Level of Education";

        var residenceField = new Template.Field();
        residenceField.label = "Primary Residence";
        residenceField.input = new Template.RadioSelect();
        residenceField.input.name = "residence";
        residenceField.input.choices = ["Own", "Rent", "Other"];

        var residenceTimeField = new Template.Field();
        residenceTimeField.label = "How many years have you lived at this residence?";
        residenceTimeField.input = new Template.Select();
        residenceTimeField.input.name = "howlonglived";
        residenceTimeField.input.choices = [
            "Less than 1 year",
            "1 Year",
            "2 Years",
            "3 Years",
            "4 Years",
            "5 Years or more"
        ];
        residenceTimeField.input.placeholder = "Select Number of Years";

    return [nameField, dobField, genderField, maritalField, educationField, residenceField, residenceTimeField];
    })();
    subsection.fieldsets.push(fieldset);

    // Driving History
    fieldset = new Template.Fieldset();
    fieldset.label = "Driving History";
    fieldset.fields = (function() {
        var yearLicensedField = new Template.Field();
        yearLicensedField.label = "Year first licenced in Australia";
        yearLicensedField.input = new Template.TextInput();
        yearLicensedField.input.name = "yearlicenced";
        yearLicensedField.input.placeholder = "Enter Year";

        var licenseTypeField = new Template.Field();
        licenseTypeField.label = "Driver Licence Type";
        licenseTypeField.input = new Template.Select();
        licenseTypeField.input.name = "licencetype";
        licenseTypeField.input.choices = ["Full or Open", "Provisional or Probationary", "Foreign", "Learner"];
        licenseTypeField.input.placeholder = "Select Licence Type";

        var numClaimsField = new Template.Field();
        numClaimsField.label = "In the past 5 years, how many motor insurance claims have you had? Please include all claims regardless of fault.";
        numClaimsField.input = new Template.TextInput();
        numClaimsField.input.name = "numclaims";
        numClaimsField.input.placeholder = "Enter Number of Claims";

        /*
        var ordinal = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];
        var claimFields = [];
        for (var j = 1; j <= 3; j++) {
            var ordinalSuffix = ["st","nd","rd"][j-1] || "th";
            // handle > 10: var ordinalSuffix = ["st","nd","rd"][(j > 10 && j < 20) ? -1 : j%10-1] || "th";
            // handle > 100: var ordinalSuffix = ["st","nd","rd"][(j%100 > 10 && j%100 < 20) ? -1 : j%10-1] || "th";

            var claimField = new Template.Field();
            claimField.label = "When was the " + j + "<sup style='vertical-align:top'>" + ordinalSuffix + "</sup> claim and what type of claim was it?";
            claimField.input = (function() {
                var yearInput = new Template.TextInput();
                yearInput.placeholder = "Year";

                var typeInput = new Template.Select();
                typeInput.choices = [
                    "Accident Damage – Insured At-Fault",
                    "Accident Damage – Other Party At-Fault",
                    "Theft",
                    "Fire",
                    "Storm/Hail/Flood",
                    "Windscreen Damage",
                    "Other",
                ];
                typeInput.placeholder = "Type of Claim";

                return [yearInput, typeInput];
            })();
            claimFields.push(claimField);
        }
        */

        return [yearLicensedField, licenseTypeField, numClaimsField]/*.concat(claimFields)*/;
    })();
    subsection.fieldsets.push(fieldset);

    fieldset = new Template.Fieldset();
    fieldset.label = "Insurance History";
    fieldset.fields = (function() {
        var heldInsuranceField = new Template.Field();
        heldInsuranceField.label = "Have you held car insurance recently?";
        heldInsuranceField.input = new Template.Select();
        heldInsuranceField.input.choices = [
            "Yes, I have a current Policy",
            "Yes, the Policy expired less than 30 days ago",
            "Yes, the Policy expired 30 or more days ago",
            "No, I have never held a car insurance policy"
        ];
        heldInsuranceField.input.placeholder = "Select Policy Status";

        var insurerField = new Template.Field();
        insurerField.label = "Name of Insurer";
        insurerField.input = new Template.Select();
        insurerField.input.choices = ["Long", "List", "of", "Insurance", "Companies"];
        insurerField.input.placeholder = "Select Insurer";

        var policyExpiryField = new Template.Field();
        policyExpiryField.label = "When does the policy expire?";
        policyExpiryField.input = new Template.TextInput();
        policyExpiryField.input.placeholder = "DD/MM/YYYY";

        var timeWithInsurerField = new Template.Field();
        timeWithInsurerField.label = "Length of Time with Insurer";
        timeWithInsurerField.input = new Template.Select();
        timeWithInsurerField.input.choices = ["Less than 1 year", "1 Year", "2 Years", "3 Years", "4 Years", "5 Years or more"];
        timeWithInsurerField.input.placeholder = "Select Length of Time";

        var coverLevelField = new Template.Field();
        coverLevelField.label = "Level of Cover";
        coverLevelField.input = new Template.Select();
        coverLevelField.input.choices = ["Comprehensive", "Third Party Fire &amp; Theft", "Third Party Property Damage"];
        coverLevelField.input.placeholder = "Select Level of Cover";

        var noClaimsBonusField = new Template.Field();
        noClaimsBonusField.label = "Current No-Claims Bonus";
        noClaimsBonusField.input = new Template.Select();
        noClaimsBonusField.input.choices = [
            "5 Years (Rating 1)",
            "4 Years (Rating 2)",
            "3 Years (Rating 3)",
            "2 Years (Rating 4)",
            "1 Years (Rating 5)",
            "None (Rating 6)"
        ];
        noClaimsBonusField.input.placeholder = "Select Bonus";

        return [heldInsuranceField, insurerField, policyExpiryField, timeWithInsurerField, coverLevelField, noClaimsBonusField];
    })();
    subsection.fieldsets.push(fieldset);

    this.subsections.push(subsection);


    // Drivers
    for (var i = 2; i <= 2; i++) {
        var subsection = new Template.Subsection();
        subsection.label = "Driver";
        subsection.labelNumber = "0" + i;
        subsection.summary = "(Firstname) (Lastname)";
        subsection.fragments = {
            "(Firstname)": 0,
            "(Lastname)": 1
        };

        // About
        var fieldset = new Template.Fieldset();
        fieldset.label = "About This Driver";
        fieldset.fields = (function() {
            var nameField = new Template.Field();
            nameField.label = "Name";
            nameField.input = (function() {
                var firstInput = new Template.TextInput();
                firstInput.name = "firstname" + i;
                firstInput.placeholder = "First Name";
                firstInput.width = "onehalf";

                var lastInput = new Template.TextInput();
                lastInput.name = "lastname" + i;
                lastInput.placeholder = "Last Name";
                lastInput.width = "onehalf";

                return [firstInput, lastInput];
            })();

            var dobField = new Template.Field();
            dobField.label = "Date of Birth";
            dobField.input = new Template.TextInput();
            dobField.input.name = "dob" + i;
            dobField.input.placeholder = "DD/MM/YYYY";

            var genderField = new Template.Field();
            genderField.label = "Gender";
            genderField.input = new Template.RadioSelect();
            genderField.input.name = "gender" + i;
            genderField.input.choices = ["Male", "Female"];

            var maritalField = new Template.Field();
            maritalField.label = "Marital Status";
            maritalField.input = new Template.RadioSelect();
            maritalField.input.name = "maritalstatus" + i;
            maritalField.input.choices = ["Single", "Married", "Widowed", "Other"];

            return [nameField, dobField, genderField, maritalField];
        })();
        subsection.fieldsets.push(fieldset);

        // Driving History
        fieldset = new Template.Fieldset();
        fieldset.label = "Driving History";
        fieldset.fields = (function() {
            var yearLicensedField = new Template.Field();
            yearLicensedField.label = "Year first licenced in Australia";
            yearLicensedField.input = new Template.TextInput();
            yearLicensedField.input.name = "yearlicenced" + i;
            yearLicensedField.input.placeholder = "Enter Year";

            var licenseTypeField = new Template.Field();
            licenseTypeField.label = "Driver Licence Type";
            licenseTypeField.input = new Template.Select();
            licenseTypeField.input.name = "licencetype" + i;
            licenseTypeField.input.choices = ["Full or Open", "Provisional or Probationary", "Foreign", "Learner"];
            licenseTypeField.input.placeholder = "Select Licence Type";

            var numClaimsField = new Template.Field();
            numClaimsField.label = "In the past 5 years, how many motor insurance claims have you had? Please include all claims regardless of fault.";
            numClaimsField.input = new Template.TextInput();
            numClaimsField.input.name = "numclaims" + i;
            numClaimsField.input.placeholder = "Enter Number of Claims";

            /*
            var ordinal = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];
            var claimFields = [];
            for (var j = 1; j <= 3; j++) {
                var ordinalSuffix = ["st","nd","rd"][j-1] || "th";
                // handle > 10: var ordinalSuffix = ["st","nd","rd"][(j > 10 && j < 20) ? -1 : j%10-1] || "th";
                // handle > 100: var ordinalSuffix = ["st","nd","rd"][(j%100 > 10 && j%100 < 20) ? -1 : j%10-1] || "th";

                var claimField = new Template.Field();
                claimField.label = "When was the " + j + "<sup style='vertical-align:top'>" + ordinalSuffix + "</sup> claim and what type of claim was it?";
                claimField.input = (function() {
                    var yearInput = new Template.TextInput();
                    yearInput.placeholder = "Year";

                    var typeInput = new Template.Select();
                    typeInput.choices = [
                        "Accident Damage – Insured At-Fault",
                        "Accident Damage – Other Party At-Fault",
                        "Theft",
                        "Fire",
                        "Storm/Hail/Flood",
                        "Windscreen Damage",
                        "Other",
                    ];
                    typeInput.placeholder = "Type of Claim";

                    return [yearInput, typeInput];
                })();
                claimFields.push(claimField);
            }
            */

            return [yearLicensedField, licenseTypeField, numClaimsField];//.concat(claimFields);
        })();
        subsection.fieldsets.push(fieldset);

        this.subsections.push(subsection);
    }

    // Policy Start Date
    var subsection = new Template.Subsection();
    subsection.label = "Policy Start Date";
    subsection.summary = "DD/MM/YYYY";
    subsection.fragments = {}

    var fieldset = new Template.Fieldset();
    fieldset.label = "One Last Thing";
    fieldset.fields = (function() {
        var dateField = new Template.Field();
        dateField.label = "When would you like the policy to begin?";
        dateField.input = new Template.RadioSelect();
        dateField.input.name = "startdate";
        dateField.input.placeholder = "Select Date";
        dateField.input.choices = ["DD/MM/YYYY"];

        return [dateField];
    })();
    subsection.fieldsets.push(fieldset);

    this.subsections.push(subsection);
}
