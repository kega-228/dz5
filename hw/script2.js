
const LogLevel = Object.freeze({
    DEBUG: "DEBUG",
    INFO: "INFO",
    ERROR: "ERROR"
})
class LogMessage extends String{
    level
    #message
    #date

    constructor(message, level) {
        super();
        this.#message = message;
        this.level = level;
        this.#date = new Date()
    }

    static debug(text) {
        return new LogMessage(text, LogLevel.DEBUG);
    }
    static info(text) {
        return new LogMessage(text, LogLevel.INFO);
    }
    static error(text) {
        return new LogMessage(text, LogLevel.ERROR);
    }

    toString() {
        const d = this.date.toISOString().replace("T", " ").replace(/\..+/, "");
        return `${d} [${this.level}] ${this.#message}`;
    }
}

class LogList extends Array{

    push(...items) {
        for (const item of items) {
            if (!(item instanceof LogMessage)) {
                throw new Error("LogList can contain only LogMessage instances");
            }
        }
        return super.push(...items);
    }

    errorsCount(){
        let count = 0;
        this.forEach(log=>{
            if(log.level === LogLevel.ERROR){
                count++;
            }
        })
        return count;
    }

    errorsList(){
        return this.filter(log => log.level === LogLevel.ERROR);
    }
}

const error = LogMessage.error("немає з'єднання");
console.log(error.toString());

const logs = new LogList();
logs.push(error);
logs.push(LogMessage.info("ok"));
logs.push(LogMessage.debug("debug"));
logs.push(LogMessage.error("error"));
logs.push(LogMessage.debug("debug2"));
logs.push(LogMessage.info("ok2"));
console.log(logs.errorsCount());
console.log(logs.errorsList());


