document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("optional2").addEventListener("change", function() {
        var optional2Label = document.getElementById("optional2Label");
        if (this.value === "computer") {
            optional2Label.textContent = "Computer:";
        } else {
            optional2Label.textContent = "Accountancy:";
        }
    });

    let inputs = document.querySelectorAll("input[type='number']");
    inputs.forEach(input => {
        input.addEventListener("input", function() {
            if (this.value < 0) {
                this.value = 0;
            }
        });
    });
});

const creditHours = {
    'english': { 'theory': 3.75, 'practical': 1.25 },
    'nepali': { 'theory': 3.75, 'practical': 1.25 },
    'social': { 'theory': 3, 'practical': 1 },
    'maths': { 'theory': 3.75, 'practical': 1.25 },
    'science': { 'theory': 3.75, 'practical': 1.25 },
    'computer': { 'theory': 2, 'practical': 2 },
    'account': { 'theory': 3, 'practical': 1 },
    'optional1': { 'theory': 3, 'practical': 1 }
};

let newSummation = 0;

function getGradePoint(marks, subject) {
    let grade;
    if (subject === "computer" || subject === "account") {
        grade = fifty(marks);
    } else {
        grade = seventyFive(marks);
    }
    return grade;
}

function fifty(marks) {
    if (marks >= 45 && marks <= 50) return 4.0;
    if (marks >= 40 && marks < 45) return 3.6;
    if (marks >= 35 && marks < 40) return 3.2;
    if (marks >= 30 && marks < 35) return 2.8;
    if (marks >= 25 && marks < 30) return 2.4;
    if (marks >= 20 && marks < 25) return 2.0;
    if (marks >= 17.5 && marks < 20) return 1.6;
    return 0.0;
}

function seventyFive(marks) {
    if (marks >= 67.5 && marks <= 75) return 4.0;
    if (marks >= 60 && marks < 67.5) return 3.6;
    if (marks >= 52.5 && marks < 60) return 3.2;
    if (marks >= 45 && marks < 52.5) return 2.8;
    if (marks >= 37.5 && marks < 45) return 2.4;
    if (marks >= 30 && marks < 37.5) return 2.0;
    if (marks >= 26.5 && marks < 30) return 1.6;
    return 0.0;
}

function numerator(gradePoint, subject) {
    let theoryPart = creditHours[subject].theory * gradePoint;
    let practicalPart = creditHours[subject].practical * 4; // Assuming practical part weight is max grade point (4.0)
    let summation = theoryPart + practicalPart;
    newSummation += summation;
    return newSummation;
}

function calculateGPA() {
    newSummation = 0; // Reset the summation for each calculation
    let subjects = ["english", "nepali", "social", "maths", "science", "optional1"];
    let totalCreditHours = 0;

    for (let subject of subjects) {
        let marks = parseFloat(document.getElementById(subject).value);
        if (isNaN(marks) || marks < 0 || (subject === "computer" || subject === "account" ? marks > 50 : marks > 75)) {
            alert("Please enter valid marks for " + subject.charAt(0).toUpperCase() + subject.slice(1));
            return;
        }
        let gradePoint = getGradePoint(marks, subject);
        numerator(gradePoint, subject);
        totalCreditHours += creditHours[subject].theory + creditHours[subject].practical;
    }

    let optional2 = document.getElementById("optional2").value;
    let optional2Marks = parseFloat(document.getElementById("optional2Marks").value);
    if (isNaN(optional2Marks) || optional2Marks < 0 || (optional2 === "computer" ? optional2Marks > 50 : optional2Marks > 75)) {
        alert("Please enter valid marks for " + optional2);
        return;
    }
    let optional2GradePoint = getGradePoint(optional2Marks, optional2);
    numerator(optional2GradePoint, optional2);
    totalCreditHours += creditHours[optional2].theory + creditHours[optional2].practical;

    let gpa = (newSummation / totalCreditHours).toFixed(2);
    document.getElementById("gpa").value = gpa;
    document.getElementById("grade").value = calculateGrade(gpa);
}

function calculateGrade(gpa) {
    if (gpa > 3.6) return "A+";
    if (gpa > 3.2) return "A";
    if (gpa > 2.8) return "B+";
    if (gpa > 2.4) return "B";
    if (gpa > 2.0) return "C+";
    if (gpa > 1.6) return "C";
    if (gpa > 1.2) return "D";
    return "NG";
}
