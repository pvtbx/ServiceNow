// move last weeks records (QA Weeklies) to QA Archive
function moveLastWeeksQAWeekliesToQAArchives() {
    var qaWeeklyGr = new GlideRecord('u_qa_weekly');
    qaWeeklyGr.query();
    while (qaWeeklyGr.next()) {
        var qaArchiveGr = new GlideRecord('u_qa_archive');
        var journalEntries = qaWeeklyGr.work_notes.getJournalEntry(-1);
        var additionalComments = qaWeeklyGr.comments.getJournalEntry(-1);
        qaArchiveGr.number = qaWeeklyGr.number;
        qaArchiveGr.caller_id = qaWeeklyGr.caller_id;
        qaArchiveGr.category = qaWeeklyGr.category;
        qaArchiveGr.subcategory = qaWeeklyGr.subcategory;
        qaArchiveGr.business_service = qaWeeklyGr.business_service;
        qaArchiveGr.service_offering = qaWeeklyGr.service_offering;
        qaArchiveGr.cmdb_ci = qaWeeklyGr.cmdb_ci;
        qaArchiveGr.universal_request = qaWeeklyGr.universal_request;
        qaArchiveGr.route_reason = qaWeeklyGr.route_reason;
        qaArchiveGr.contact_type = qaWeeklyGr.contact_type;
        qaArchiveGr.state = qaWeeklyGr.state;
        qaArchiveGr.hold_reason = qaWeeklyGr.hold_reason;
        qaArchiveGr.impact = qaWeeklyGr.impact;
        qaArchiveGr.urgency = qaWeeklyGr.urgency;
        qaArchiveGr.priority = qaWeeklyGr.priority;
        qaArchiveGr.assignment_group = qaWeeklyGr.assignment_group;
        qaArchiveGr.assigned_to = qaWeeklyGr.assigned_to;
        qaArchiveGr.description = qaWeeklyGr.description;
        qaArchiveGr.short_description = qaWeeklyGr.short_description;
        qaArchiveGr.comments = additionalComments;
        qaArchiveGr.work_notes = journalEntries;
        qaArchiveGr.insertWithReferences();
        qaWeeklyGr.deleteRecord();
        //deleteAnyDuplicates();
    }
}

// deletes any duplicates from QA Archives
// this is used just in case a ticket becomes resolved, unresolved,
// and then resolved again
function deleteAnyDuplicates() {
    var grAggregate = new GlideAggregate('u_qa_archive');
    grAggregate.groupBy('number');
    grAggregate.query();
    while (grAggregate.next()) {
        var grRecord = new GlideRecord('u_qa_archive');
        grRecord.addQuery('number', grAggregate.number);
        grRecord.query();
        grRecord.next();
        while (grRecord.next()) {
            grRecord.deleteRecord();
        }
    }
}


moveLastWeeksQAWeekliesToQAArchives();
