function calculateAppraisal(basicSalary, appraisalPercent) {

    basicSalary = Number(basicSalary) || 0;
    appraisalPercent = Number(appraisalPercent) || 0;

    let increaseAmount = basicSalary * (appraisalPercent / 100);

    return increaseAmount;
}