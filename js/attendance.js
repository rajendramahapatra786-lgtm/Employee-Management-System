function calculateAttendancePercentage(present, absent) {

    present = Number(present) || 0;
    absent = Number(absent) || 0;

    let total = present + absent;

    if (total === 0) return 0;

    return ((present / total) * 100).toFixed(1);
}