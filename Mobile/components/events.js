import {EventEmitter} from 'events';

let mobileEvents = new EventEmitter();

const EVENT_APPEND = "EventAppend";
const EVENT_EDIT = "EventEdit";
const EVENT_SAVE = "EventSave";
const EVENT_CANCEL = "EventCancel";
const EVENT_DELETE = "EventDelete";

export {mobileEvents, EVENT_APPEND, EVENT_EDIT, EVENT_SAVE, EVENT_CANCEL, EVENT_DELETE};
