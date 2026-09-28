console.log('Happy developing ✨')


class Event{
    constructor(name, description, date){
        if (!name || !description || !date){
            throw new Error('Event must have a name, description, and date');
        }
        this.name = name;
        this.description = description;

        if(typeof date == "string" || date instanceof String){
            this.date = new Date(date);
        }else if(date instanceof Date){
            this.date = date;
        }else{
            throw new Error('Event date must be a string or a Date object');
        }
    }

    showInfo(){
        console.log(this.name, this.description, this.date.toLocaleString());
    }

    getTimeDifference(otherEvent, unit){
        if (!(otherEvent instanceof Event)){
            throw new Error('otherEvent must be an instance of Event');
        }
        if (unit !== 'days' && unit !== 'hours'){
            throw new Error('unit must be "days", "hours"');
        }
        const diff = Math.abs(this.date - otherEvent.date);
        if (unit === 'days'){
            return Math.floor(diff / (1000 * 60 * 60 * 24));
        }else if (unit === 'hours'){
            return Math.floor(diff / (1000 * 60 * 60));
        }
    }
}


const events =[
    new Event("Concert", "fsdfsgsdg", "2024-07-05T06:07:00"),
    new Event("Piska", "fsdfsgsdg", "2025-12-05T06:07:00")
];

events.forEach(event => event.showInfo());

const event1 = events[0];

console.log(event1.getTimeDifference(events[1], 'days'));

const Importance = Object.freeze({
    usual: "usual",
    important: "important",
})

class ImportantEvent extends Event{
    constructor(name, description, date, importance){

        if(!Object.values(Importance).includes(importance)){
            const allImportanceValues = Object.values(Importance).join('", "');
            throw new Error(`Invalid importance value. Must be one of: ${allImportanceValues}`);
        }

        super(name, description, date);
        this.importance = importance || Importance.usual;
    }

    showInfo() {
        super.showInfo();
        console.log(`Importance ${this.importance}`);
    }
}

const ImportantEvents = [
    new ImportantEvent("Concert", "fsdfsgsdg", "2024-07-05T06:07:00", Importance.important),
    new ImportantEvent("Concert2", "fsdfsgsdg", "2025-12-05T06:07:00", Importance.important),
    new ImportantEvent("Concert5", "fsdfsgsdg", "2023-09-29T06:07:00", Importance.usual),
]

ImportantEvents.forEach(event => event.showInfo());
