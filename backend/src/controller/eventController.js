const pool=require('pg').Pool
const fs= require('fs');


function getPool() {
    try {
      const dbConfig = fs.readFileSync("./backend/config/db.json", "utf8");
      return new pool(JSON.parse(dbConfig));
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  const Pool = getPool();

const registerEvent= async (request,response)=>{
    const event= request.body;
    if (!event.title || !event.description || !event.venu || !event.date || !event.user_id) {
        return response.status(400).send({ 'Error': 'Missing required fields' });
    }
    try {
       const result= await Pool.query("insert into events (title,description,venu,date,user_id) values($1,$2,$3,$4,$5) returning *",
        [
            event.title,
            event.description,
            event.venu,
            event.date,
            event.user_id
        ]
       );
       if (result.rows && result.rows.length > 0) 
        {
        return response.status(201).send({ 'eventCreated': result.rows[0] });
        }
        else 
        {
            return response.status(500).send({ 'Error': 'Unable to create event' });
        }

    } catch (error) {
        console.error('Error while registering event:', error.message, error.stack);
        return response.status(500).send({ 'Error': 'Internal server error' });
    }
}

const getAllEvents= async (request,response)=>{
    try {
       const result= await Pool.query("select *from events");
        return response.status(200).send(result.rows);
    } catch (error) {
        console.error('Error while retrieving events:', error.message, error.stack);
        return response.status(500).send({ 'Error': 'Internal server error' });
    }
}
 
const getEventByUserId = async (request,response)=>{
    const user_id= request.params.user_id;
    if (!user_id) {
        return response.status(400).send({ 'Error': 'Missing required fields: user_id' });
    }
    try {
       const result= await Pool.query("select *from events where user_id=$1 ",[user_id]);
       if (result.rows && result.rows.length > 0) {
         return response.status(200).send(result.rows);
       }else {
        return response.status(404).send({ 'Error': 'Event not found' });
    }
       
    } catch (error) {
        console.error('Error while retrieving events:', error.message, error.stack);
        return response.status(500).send({ 'Error': 'Internal server error' });
    }
}

const updateEvent = async (request, response) => {
    const eventId = request.params.id;
    const event = request.body;

    if (!eventId || !event.title || !event.description || !event.venu || !event.date || !event.user_id) {
        return response.status(400).send({ 'Error': 'Missing required fields or event ID' });
    }

    try {
        const result = await Pool.query('UPDATE events SET title = $1, description = $2, venu = $3, date = $4, user_id = $5 where id = $6 returning *',
            [event.title, event.description, event.venu, event.date, event.user_id, eventId]
        );

        if (result.rows && result.rows.length > 0) {
            return response.status(200).send({ 'eventUpdated': result.rows[0] });
        } else {
            return response.status(404).send({ 'Error': 'Event not found' });
        }
    } catch (error) {
        console.error('Error while updating event:', error.message, error.stack);
        return response.status(500).send({ 'Error': 'Internal server error' });
    }
};

const deleteEvent= async (request,response)=>{
    const eventId=request.params.id
    if(!eventId)
    {
        return response.status(400).send({ 'Error': 'Missing  event ID' }); 
        
    }
    try {
        const result= await Pool.query("select *from events where id=$1 ",[eventId]);

        if (result.rows && result.rows.length > 0) {
            const deleteResult=  await Pool.query("delete from events where id=$1 ",[eventId]);
            if(deleteResult.rowCount>0){
                     return response.status(200).send({ 'Message': 'Event deleted successfully', 'EventId': eventId });
            } 
            else{
                 return response.status(500).send({ 'Error': 'Failed to delete event' });

            }
           
        } else {
            return response.status(404).send({ 'Error': 'Event does not exist' });
        }
     } catch (error) {
         console.error('Error while retrieving events:', error.message, error.stack);
         return response.status(500).send({ 'Error': 'Internal server error' });
     }

}

module.exports.registerEvent=registerEvent;
module.exports.getAllEvents=getAllEvents;
module.exports.getEventByUserId=getEventByUserId;
module.exports.updateEvent=updateEvent;
module.exports.deleteEvent=deleteEvent;
 
