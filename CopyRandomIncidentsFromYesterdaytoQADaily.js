var incidentArray = []; // Create empty array
var randomRecordArray = []; // Create random empty array
var recordCount = 0; // Used to count the number of inserted records

//The first thing this script does is check if there's any records in QA Daily,
// and if so, copies them over into QA Weekly and deletes them from QA Daily.
function moveYesterdaysQADailysToQAWeekly() {
    var qaDailyGr = new GlideRecord('u_qa_daily');
    qaDailyGr.query();
    while (qaDailyGr.next()) {
        var qaWeeklyGr = new GlideRecord('u_qa_weekly');
        var journalEntries = qaDailyGr.work_notes.getJournalEntry(-1);
        var additionalComments = qaDailyGr.comments.getJournalEntry(-1);
        qaWeeklyGr.number = qaDailyGr.number;
        qaWeeklyGr.caller_id = qaDailyGr.caller_id;
        qaWeeklyGr.category = qaDailyGr.category;
        qaWeeklyGr.subcategory = qaDailyGr.subcategory;
        qaWeeklyGr.business_service = qaDailyGr.business_service;
        qaWeeklyGr.service_offering = qaDailyGr.service_offering;
        qaWeeklyGr.cmdb_ci = qaDailyGr.cmdb_ci;
        qaWeeklyGr.universal_request = qaDailyGr.universal_request;
        qaWeeklyGr.route_reason = qaDailyGr.route_reason;
        qaWeeklyGr.contact_type = qaDailyGr.contact_type;
        qaWeeklyGr.state = qaDailyGr.state;
        qaWeeklyGr.hold_reason = qaDailyGr.hold_reason;
        qaWeeklyGr.impact = qaDailyGr.impact;
        qaWeeklyGr.urgency = qaDailyGr.urgency;
        qaWeeklyGr.priority = qaDailyGr.priority;
        qaWeeklyGr.assignment_group = qaDailyGr.assignment_group;
        qaWeeklyGr.assigned_to = qaDailyGr.assigned_to;
        qaWeeklyGr.description = qaDailyGr.description;
        qaWeeklyGr.short_description = qaDailyGr.short_description;
        qaWeeklyGr.comments = additionalComments;
        qaWeeklyGr.work_notes = journalEntries;
        qaWeeklyGr.insertWithReferences();
        qaDailyGr.deleteRecord();
    }
}

// takes 10% of incident records and put them into incidentArray
function fillIncidentArray() {
    var incidentGr = new GlideRecord('incident');
    //gr.addEncodedQuery('resolved_atONYesterday@javascript:gs.beginningOfYesterday()@javascript:gs.endOfYesterday()');
    incidentGr.query();
    //var calculatedPercentage = Math.floor(gr.getRowCount() / 10);
    while (incidentGr.next() && incidentGr.caller_id != "") {
        // GlideRecords must be encapsulated into an object in order to be
        // added to an array.
        var incidentObj = {};
        incidentObj.number = incidentGr.number.toString();
        incidentObj.caller_id = incidentGr.caller_id.toString();
        incidentObj.category = incidentGr.category.toString();
        incidentObj.subcategory = incidentGr.subcategory.toString();
        incidentObj.business_service = incidentGr.business_service.toString();
        incidentObj.service_offering = incidentGr.service_offering.toString();
        incidentObj.cmdb_ci = incidentGr.cmdb_ci.toString();
        incidentObj.universal_request = incidentGr.universal_request.toString();
        incidentObj.route_reason = incidentGr.route_reason.toString();
        incidentObj.contact_type = incidentGr.contact_type.toString();
        incidentObj.state = incidentGr.state.toString();
        incidentObj.hold_reason = incidentGr.hold_reason.toString();
        incidentObj.impact = incidentGr.impact.toString();
        incidentObj.urgency = incidentGr.urgency.toString();
        incidentObj.priority = incidentGr.priority.toString();
        incidentObj.assignment_group = incidentGr.assignment_group.toString();
        incidentObj.assigned_to = incidentGr.assigned_to.toString();
        incidentObj.description = incidentGr.description.toString();
        incidentObj.short_description = incidentGr.short_description.toString();
        incidentObj.comments = incidentGr.comments.toString();
        incidentObj.work_notes = incidentGr.work_notes.toString();
        incidentArray.push(incidentObj);
    }
}

// fills randomRecordArray with random values from incidentArray
function fillRandomArray() {
    var lastIndex = incidentArray.length;
    var randomIndex = 0;
    while (lastIndex--) {
        randomIndex = Math.floor(Math.random() * (lastIndex + 1));
        randomRecordArray.push(incidentArray[randomIndex]);
        incidentArray.splice(randomIndex, 1);
    }
    randomRecordArray.next().value;
}

// inserts a record from randomRecordArray into QA Weekly table and removes
// index from randomRecordArray
function insertRecord() {
    var randomRecord = new GlideRecord('u_qa_daily');
    var lastRecord = randomRecordArray[randomRecordArray.length - 1];
    randomRecord.number = lastRecord.number.toString();
    randomRecord.caller_id = lastRecord.caller_id.toString();
    randomRecord.number = lastRecord.number.toString();
    randomRecord.caller_id = lastRecord.caller_id.toString();
    randomRecord.category = lastRecord.category.toString();
    randomRecord.subcategory = lastRecord.subcategory.toString();
    randomRecord.business_service = lastRecord.business_service.toString();
    randomRecord.service_offering = lastRecord.service_offering.toString();
    randomRecord.cmdb_ci = lastRecord.cmdb_ci.toString();
    randomRecord.universal_request = lastRecord.universal_request.toString();
    randomRecord.route_reason = lastRecord.route_reason.toString();
    randomRecord.contact_type = lastRecord.contact_type.toString();
    randomRecord.state = lastRecord.state.toString();
    randomRecord.hold_reason = lastRecord.hold_reason.toString();
    randomRecord.impact = lastRecord.impact.toString();
    randomRecord.urgency = lastRecord.urgency.toString();
    randomRecord.priority = lastRecord.priority.toString();
    randomRecord.assignment_group = lastRecord.assignment_group.toString();
    randomRecord.assigned_to = lastRecord.assigned_to.toString();
    randomRecord.description = lastRecord.description.toString();
    randomRecord.short_description = lastRecord.short_description.toString();
    randomRecord.comments = lastRecord.comments.toString();
    randomRecord.work_notes = lastRecord.work_notes.toString();
    randomRecord.insertWithReferences();
    randomRecordArray.pop();
    recordCount++;
}

// The main function. Fills the incidentArray, the randomRecordArray,
// then inserts the records into the QA Weekly table.
function runDailyScript() {
    moveYesterdaysQADailysToQAWeekly();
    fillIncidentArray();
    fillRandomArray();

    while (randomRecordArray.length > 0 && recordCount < 5) {
        insertRecord();
    }
}

runDailyScript();
