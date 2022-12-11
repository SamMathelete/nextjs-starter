import { MongoClient } from "mongodb";

const handler = async (request, response) => {
  console.log("start");
  if (request.method === "POST") {
    const data = request.body;
    const client = await MongoClient.connect(
      "mongodb+srv://SamTheMathlete:wAE83EDVKxWdl9Mg@cluster0.nbip8pj.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupCollection = db.collection("meetups");
    const result = await meetupCollection.insertOne(data);
    client.close();
    response.status(201).json({
      message: "Meetup Inserted Successfully!",
    });
  }
};

export default handler;
