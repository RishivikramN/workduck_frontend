import React from 'react'

// Weekday Component displays the train's weekly
// schedule on the train card.
export default function WeekDayContainer({weekdays}) {
    return (
        <div style={{display:"flex",flexDirection: "row"}}>
            {
                weekdays.map( (weekday,index) => (<p className="mr-2" key={index}>{weekday}</p>))
            }
        </div>
    )
}
