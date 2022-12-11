import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{`${props.meetupData.title} | React Meetups`}</title>
        <meta name="description" content={props.meetupData.details} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        details={props.meetupData.details}
      />
    </>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://SamTheMathlete:wAE83EDVKxWdl9Mg@cluster0.nbip8pj.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupID: meetup._id.toString(),
      },
    })),
  };
};

export const getStaticProps = async (context) => {
  const meetupID = context.params.meetupID;
  const client = await MongoClient.connect(
    "mongodb+srv://SamTheMathlete:wAE83EDVKxWdl9Mg@cluster0.nbip8pj.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const selectedMeetup = await meetupCollection.findOne({
    _id: ObjectId(meetupID),
  });
  client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        details: selectedMeetup.description,
        image: selectedMeetup.image,
      },
    },
  };
};

export default MeetupDetails;
